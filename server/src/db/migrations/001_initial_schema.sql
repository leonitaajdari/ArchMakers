-- ArchMakers — migration 001: initial schema
-- Based on docs/rules-and-flows.md and docs/business.md.
-- Conventions:
--   * every table is STRICT (SQLite checks the column types)
--   * ids are INTEGER PRIMARY KEY
--   * dates and times are TEXT in ISO 8601 (UTC), e.g. '2026-11-17 18:00:00'
--   * true/false is INTEGER 0 or 1
--   * money is INTEGER in euro cents
-- No data is inserted.

-- ---------------------------------------------------------------
-- users: everyone with an account (architects, makers, admins)
-- ---------------------------------------------------------------
CREATE TABLE users (
  id                INTEGER PRIMARY KEY,
  email             TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  name              TEXT,
  role              TEXT    NOT NULL CHECK (role IN ('architect', 'maker', 'admin')),
  email_verified_at TEXT,
  created_at        TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

-- ---------------------------------------------------------------
-- makers: a company listing (unclaimed, claimed or hidden)
-- owner_user_id is empty until the listing is claimed.
-- ---------------------------------------------------------------
CREATE TABLE makers (
  id                     INTEGER PRIMARY KEY,
  owner_user_id          INTEGER UNIQUE REFERENCES users (id) ON DELETE SET NULL,
  name                   TEXT    NOT NULL,
  slug                   TEXT    NOT NULL UNIQUE,
  description            TEXT,
  city                   TEXT    NOT NULL,
  country                TEXT    NOT NULL DEFAULT 'DE' CHECK (country IN ('DE', 'MK', 'XK')),
  website                TEXT,
  public_email           TEXT,
  phone                  TEXT,
  listing_status         TEXT    NOT NULL DEFAULT 'unclaimed'
                                 CHECK (listing_status IN ('unclaimed', 'claimed', 'hidden')),
  scale_from             INTEGER CHECK (scale_from > 0),  -- e.g. 50 for 1:50
  scale_to               INTEGER CHECK (scale_to > 0),    -- e.g. 1000 for 1:1000
  typical_lead_time_days INTEGER CHECK (typical_lead_time_days > 0),
  offers_express         INTEGER NOT NULL DEFAULT 0 CHECK (offers_express IN (0, 1)),
  price_level            TEXT    CHECK (price_level IN ('low', 'medium', 'high')),
  min_order_cents        INTEGER CHECK (min_order_cents >= 0),
  languages              TEXT,                            -- e.g. 'de,en'
  is_verified            INTEGER NOT NULL DEFAULT 0 CHECK (is_verified IN (0, 1)),
  claimed_at             TEXT,
  created_at             TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at             TEXT    NOT NULL DEFAULT (datetime('now')),
  CHECK (scale_from IS NULL OR scale_to IS NULL OR scale_from <= scale_to)
) STRICT;

CREATE INDEX idx_makers_city ON makers (city);

-- ---------------------------------------------------------------
-- maker_categories: which of the three categories a maker offers
-- ---------------------------------------------------------------
CREATE TABLE maker_categories (
  maker_id INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  category TEXT    NOT NULL CHECK (category IN ('3d_printing', 'laser_cutting', 'model_studio')),
  PRIMARY KEY (maker_id, category)
) STRICT;

-- ---------------------------------------------------------------
-- maker_materials: materials a maker works with
-- ---------------------------------------------------------------
CREATE TABLE maker_materials (
  maker_id INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  material TEXT    NOT NULL,                              -- e.g. 'White resin', 'Greyboard'
  PRIMARY KEY (maker_id, material)
) STRICT;

-- ---------------------------------------------------------------
-- maker_photos: gallery of real architecture models
-- (Free: max 3, Pro: unlimited — checked by the app)
-- ---------------------------------------------------------------
CREATE TABLE maker_photos (
  id         INTEGER PRIMARY KEY,
  maker_id   INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  file_path  TEXT    NOT NULL,
  caption    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

CREATE INDEX idx_maker_photos_maker ON maker_photos (maker_id);

-- ---------------------------------------------------------------
-- quote_requests: one request from an architect (Flow A)
-- Required by rule 2: file, scale, deadline, budget range.
-- ---------------------------------------------------------------
CREATE TABLE quote_requests (
  id                INTEGER PRIMARY KEY,
  architect_id      INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  category          TEXT    NOT NULL CHECK (category IN ('3d_printing', 'laser_cutting', 'model_studio')),
  file_path         TEXT    NOT NULL,
  file_name         TEXT    NOT NULL,
  file_deleted_at   TEXT,                                 -- files are deleted after 60 days (rule 10)
  scale             INTEGER NOT NULL CHECK (scale > 0),   -- e.g. 200 for 1:200
  material_colour   TEXT,
  approximate_size  TEXT,
  deadline          TEXT    NOT NULL,                     -- date, at least 3 working days ahead (rule 3)
  budget_range      TEXT    NOT NULL
                            CHECK (budget_range IN ('under_100', '100_250', '250_500', 'over_500')),
  delivery_method   TEXT    NOT NULL DEFAULT 'ship' CHECK (delivery_method IN ('ship', 'pickup')),
  notes             TEXT,
  follow_up_sent_at TEXT,                                 -- "Did you order?" email after 7 days
  ordered_maker_id  INTEGER REFERENCES makers (id) ON DELETE SET NULL,  -- answer to the follow-up
  created_at        TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

CREATE INDEX idx_quote_requests_architect ON quote_requests (architect_id);

-- ---------------------------------------------------------------
-- quote_request_recipients: which makers got a request, and their reply
-- (junction table: quote_requests <-> makers, max 5 per request — rule 4, checked by the app)
-- ---------------------------------------------------------------
CREATE TABLE quote_request_recipients (
  quote_request_id INTEGER NOT NULL REFERENCES quote_requests (id) ON DELETE CASCADE,
  maker_id         INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  status           TEXT    NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'replied', 'declined')),
  sent_at          TEXT    NOT NULL DEFAULT (datetime('now')),
  responded_at     TEXT,
  price_cents      INTEGER CHECK (price_cents >= 0),
  delivery_date    TEXT,
  message          TEXT,
  decline_reason   TEXT    CHECK (decline_reason IN ('too_busy', 'outside_scales', 'budget_too_low', 'other')),
  PRIMARY KEY (quote_request_id, maker_id)
) STRICT;

CREATE INDEX idx_recipients_maker ON quote_request_recipients (maker_id);

-- ---------------------------------------------------------------
-- claims: a user proving a listing is their company (Flow B)
-- ---------------------------------------------------------------
CREATE TABLE claims (
  id         INTEGER PRIMARY KEY,
  maker_id   INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  method     TEXT    NOT NULL CHECK (method IN ('domain_email', 'phone_code', 'manual')),
  status     TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  decided_at TEXT
) STRICT;

CREATE INDEX idx_claims_maker ON claims (maker_id);

-- ---------------------------------------------------------------
-- subscriptions: a maker's Pro plan periods (Flow C)
-- A maker with no active or trialing subscription is on Free.
-- ---------------------------------------------------------------
CREATE TABLE subscriptions (
  id                   INTEGER PRIMARY KEY,
  maker_id             INTEGER NOT NULL REFERENCES makers (id) ON DELETE CASCADE,
  billing_period       TEXT    NOT NULL CHECK (billing_period IN ('trial', 'monthly', 'yearly')),
  price_cents          INTEGER NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  status               TEXT    NOT NULL
                               CHECK (status IN ('trialing', 'active', 'past_due', 'cancelled', 'expired')),
  current_period_start TEXT    NOT NULL,
  current_period_end   TEXT    NOT NULL,
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0 CHECK (cancel_at_period_end IN (0, 1)),
  payment_failed_at    TEXT,                              -- 7 days to fix before falling back to Free
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
) STRICT;

CREATE INDEX idx_subscriptions_maker ON subscriptions (maker_id);

-- ---------------------------------------------------------------
-- complaints: an architect reports a maker after a reply (rule 13)
-- Points to the recipient row, so it can only exist for a maker
-- that actually received that request.
-- ---------------------------------------------------------------
CREATE TABLE complaints (
  id               INTEGER PRIMARY KEY,
  architect_id     INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  quote_request_id INTEGER NOT NULL,
  maker_id         INTEGER NOT NULL,
  reason           TEXT    NOT NULL,
  status           TEXT    NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'confirmed', 'dismissed')),
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  resolved_at      TEXT,
  FOREIGN KEY (quote_request_id, maker_id)
    REFERENCES quote_request_recipients (quote_request_id, maker_id) ON DELETE CASCADE
) STRICT;

CREATE INDEX idx_complaints_maker ON complaints (maker_id);
