import { TAGLINE, PITCH } from '../../content/brand.js';
import archieSearch from '../../assets/archie-search.svg';
import archieSearchDark from '../../assets/archie-search-dark.svg';
import './Hero.css';

const facts = ['Free for architects', 'Up to 5 makers, one form', 'Germany first'];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-name">ArchMakers</p>
          <h1 id="hero-title" className="hero-title">
            {TAGLINE}
          </h1>
          <p className="hero-pitch">{PITCH}</p>

          <div className="hero-actions">
            <a href="#how-it-works" className="button button-primary">
              See how it works
            </a>
            <a href="#for-makers" className="button button-secondary">
              I&apos;m a maker
            </a>
          </div>

          <ul className="hero-facts" aria-label="Key facts">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* A "drawing sheet": blueprint grid, Archie, a scale bar and printed layers */}
        <figure className="hero-sheet">
          <div className="hero-sheet-grid" aria-hidden="true"></div>
          <p className="hero-bubble">
            Hi, I&apos;m Archie. Tell me your scale and deadline and I&apos;ll find makers who
            can build it.
          </p>
          <picture className="hero-archie">
            <source srcSet={archieSearchDark} media="(prefers-color-scheme: dark)" />
            <img
              src={archieSearch}
              alt="Archie, the ArchMakers mascot, holding a magnifying glass"
              width="220"
              height="236"
            />
          </picture>
          <figcaption className="hero-scale" aria-hidden="true">
            <span className="hero-scale-bar"></span>
            <span>1:200</span>
          </figcaption>
          <div className="hero-layers" aria-hidden="true"></div>
        </figure>
      </div>
    </section>
  );
}
