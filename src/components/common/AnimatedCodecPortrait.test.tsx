import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnimatedCodecPortrait } from './AnimatedCodecPortrait';

const baseProps = {
  label: 'CONTACT',
  initials: 'BB',
  name: 'Big Boss',
  side: 'right' as const
};

describe('AnimatedCodecPortrait', () => {
  it('marks MG1 MSX portrait paths as character art', () => {
    const markup = renderToStaticMarkup(
      <AnimatedCodecPortrait
        {...baseProps}
        image="/portraits/msx/mg1/big_boss/neutral.webp"
      />
    );

    expect(markup).toContain('data-character-portrait="true"');
    expect(markup).not.toContain('data-system-portrait="true"');
  });

  it('keeps the MSX system fallback marked as a system portrait', () => {
    const markup = renderToStaticMarkup(
      <AnimatedCodecPortrait
        {...baseProps}
        image="/portraits/system/msx-contact.svg"
      />
    );

    expect(markup).toContain('data-system-portrait="true"');
    expect(markup).not.toContain('data-character-portrait="true"');
  });
});
