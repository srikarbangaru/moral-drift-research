import { modelInfo } from '../data/researchData';

const base = import.meta.env.BASE_URL; // '/moral-drift-research/' in prod, '/' locally

export default function ModelLogo({ model, size = 22, className = '' }) {
  const info = modelInfo[model];
  if (!info) return null;

  // Strip leading slash from logo path then prepend the correct base URL
  const src = base.replace(/\/$/, '') + info.logo;

  if (info.logoType === 'icon') {
    return (
      <img
        src={src}
        alt={`${model} logo`}
        width={size}
        height={size}
        className={`object-contain flex-shrink-0 ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <img
      src={src}
      alt={`${model} logo`}
      height={size}
      className={`object-contain flex-shrink-0 ${className}`}
      style={{ maxWidth: size * 4, height: size }}
      draggable={false}
    />
  );
}
