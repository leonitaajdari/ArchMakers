import Logo from '../ui/Logo.jsx';
import './Header.css';

const links = [
  { href: '#maker-types', label: 'Maker types' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#for-makers', label: 'For makers' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="#top" className="site-header-logo" aria-label="ArchMakers, back to top">
          <Logo width={170} />
        </a>
        <nav aria-label="Main">
          <ul className="site-nav">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
