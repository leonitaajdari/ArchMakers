import './HowItWorks.css';

// Flow A from docs/rules-and-flows.md, in three steps
const steps = [
  {
    title: 'Search and filter',
    text: 'Choose a category and city, then filter by scale, material and lead time. See photos of real architecture models.',
  },
  {
    title: 'Pick up to five',
    text: 'Tick the makers you like and send one request with your 3D file, scale, deadline and budget.',
  },
  {
    title: 'Compare the replies',
    text: 'Makers reply with a price and a delivery date. You choose one and agree the order with them directly.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section how" aria-labelledby="how-title">
      <div className="container">
        <p className="section-label">02 · How it works</p>
        <h2 id="how-title" className="section-title">
          One form instead of five emails
        </h2>

        <ol className="how-steps">
          {steps.map((step, index) => (
            <li key={step.title} className="how-step">
              <span className="how-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="how-note">
          Architects never pay. Payment and delivery are agreed between you and the maker.
        </p>
      </div>
    </section>
  );
}
