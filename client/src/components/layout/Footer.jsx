import Logo from '../ui/Logo.jsx';
import { TAGLINE } from '../../content/brand.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <Logo variant="dark" width={150} />
          <p>{TAGLINE}</p>
        </div>
        <p className="site-footer-note">
          © {new Date().getFullYear()} ArchMakers · Launching in Germany first
        </p>
      </div>
    </footer>
  );
}
