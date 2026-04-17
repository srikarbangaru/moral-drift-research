import { modelInfo } from '../data/researchData';

/**
 * Renders the real logo for a given model.
 * logoType='icon'     → square icon (ChatGPT) → render at size × size
 * logoType='wordmark' → wide text logo        → render at height=h, auto width
 */
export default function ModelLogo({ model, size = 22, className = '' }) {
  const info = modelInfo[model];
  if (!info) return null;

  if (info.logoType === 'icon') {
    return (
      <img
        src={info.logo}
        alt={`${model} logo`}
        width={size}
        height={size}
        className={`object-contain flex-shrink-0 ${className}`}
        draggable={false}
      />
    );
  }

  // Wordmark: fixed height, auto width, max-width capped so it doesn't overflow
  return (
    <img
      src={info.logo}
      alt={`${model} logo`}
      height={size}
      className={`object-contain flex-shrink-0 ${className}`}
      style={{ maxWidth: size * 4, height: size }}
      draggable={false}
    />
  );
}
