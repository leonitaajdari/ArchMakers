import './MakerTypes.css';

// The three maker categories from docs/rules-and-flows.md (Flow A, step 1)
const types = [
  {
    title: '3D printing',
    text: 'Resin and FDM printers for massing and detail models, from 1:50 to 1:1000.',
    icon: (
      <>
        <path d="M6 4h12v4H6z" />
        <path d="M12 8v3" />
        <path d="M10 11h4l-2 2z" />
        <path d="M4 20h16" />
        <path d="M7 20v-3h10v3" />
      </>
    ),
  },
  {
    title: 'Laser cutting',
    text: 'Walls, facades, bases and site models in board, wood and acrylic.',
    icon: (
      <>
        <path d="M12 3v7" />
        <path d="M9 10h6l-3 3z" />
        <path d="M3 17h18" strokeDasharray="2 2" />
        <path d="M3 21h18" />
      </>
    ),
  },
  {
    title: 'Model-making studios',
    text: 'Complete presentation models for competitions, juries and client meetings.',
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V10l5-3v14" />
        <path d="M10 21V4l9 4v13" />
        <path d="M13 11h3M13 15h3" />
      </>
    ),
  },
];

export default function MakerTypes() {
  return (
    <section id="maker-types" className="section" aria-labelledby="maker-types-title">
      <div className="container">
        <p className="section-label">01 · Maker types</p>
        <h2 id="maker-types-title" className="section-title">
          Makers who do architecture work
        </h2>
        <p className="section-intro">
          Not figurines or engineering parts: only companies that build models for
          architects.
        </p>

        <ul className="maker-types">
          {types.map((type) => (
            <li key={type.title} className="maker-type">
              <span className="maker-type-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {type.icon}
                </svg>
              </span>
              <h3>{type.title}</h3>
              <p>{type.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
