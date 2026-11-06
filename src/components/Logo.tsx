import React from 'react';

// The Tessel mark: a 3×3 grid of tiles, filling in from the top left.
const TILES: React.CSSProperties[] = [
  { background: 'var(--color-accent)' },
  { background: 'var(--color-accent)' },
  { background: 'var(--color-accent-600)' },
  { background: 'var(--color-accent-700)' },
  { background: 'var(--color-accent)' },
  { background: 'var(--color-accent-700)' },
  { background: 'var(--color-accent-600)' },
  { background: 'var(--color-neutral-700)' },
  { boxShadow: 'inset 0 0 0 1px var(--color-neutral-600)' },
];

export const Logo: React.FC<{ size: 'sm' | 'lg' }> = ({ size }) => (
  <span className={`logo logo--${size}${size === 'lg' ? ' logo-big' : ''}`} aria-hidden="true">
    {TILES.map((style, i) => (
      <i key={i} style={style} />
    ))}
  </span>
);
