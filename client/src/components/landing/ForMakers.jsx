import './ForMakers.css';

// Maker offer from docs/business.md (part 4) and docs/rules-and-flows.md (Flow B and C)
const points = [
  'A free company page with photos of your architecture work',
  'Quote requests that match your categories, scales and materials',
  'Pro free for the first 3 months',
];

export default function ForMakers() {
  return (
    <section id="for-makers" className="section makers" aria-labelledby="makers-title">
      <div className="container makers-inner">
        <div>
          <p className="section-label makers-label">03 · For makers</p>
          <h2 id="makers-title" className="section-title">
            Do you print, cut or build models?
          </h2>
          <p className="section-intro makers-intro">
            List your company for free and receive quote requests from architects.
          </p>
        </div>

        <ul className="makers-points">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
