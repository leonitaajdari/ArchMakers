import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

/**
 * The official ArchMakers logo (docs/brand/).
 * variant="auto" swaps to the dark-mode file when the system is in dark mode.
 * variant="dark" always uses the dark-background version (e.g. on Ink).
 */
export default function Logo({ variant = 'auto', width = 180 }) {
  // Logo files are 320 × 64, so height = width / 5
  const size = { width, height: width / 5 };

  if (variant === 'dark') {
    return <img src={logoDark} alt="ArchMakers" {...size} />;
  }

  return (
    <picture>
      <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
      <img src={logoLight} alt="ArchMakers" {...size} />
    </picture>
  );
}
