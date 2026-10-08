import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EraCharacterArchive } from './EraCharacterArchive';

describe('visual archive surface', () => {
  it('exposes an accessible game dossier with all 40 identities and no invented call control', () => {
    const markup = renderToStaticMarkup(<EraCharacterArchive onClose={() => {}} />);
    expect(markup).toContain('aria-labelledby="era-archive-title"');
    expect(markup.match(/data-archive-id=/g)).toHaveLength(40);
    expect(markup).toContain('coldman_pw');
    expect(markup).toContain('paz_1984_mgsv');
    expect(markup).toContain('sahelanthropus_mgsv');
    expect(markup).toContain('Dossiers consultables, pas de nouveaux appels radio.');
    expect(markup).not.toContain('manual_call');
    expect(markup).not.toContain('CALL NOW');
  });
  it('starts with unverified images, zero delivery claims and disabled inspection', () => {
    const markup = renderToStaticMarkup(<EraCharacterArchive onClose={() => {}} onInspect={() => {}} />);
    expect(markup).toContain('0/40 ensembles 2D chargés');
    expect(markup).toContain('Visuels non vérifiés');
    expect(markup).toContain('<button type="button" disabled="">Inspecter en 2D</button>');
    expect(markup).not.toContain('32 poses chargées');
  });
  it('provides selection, expression, playback, scrubbing, retry and exit controls', () => {
    const markup = renderToStaticMarkup(<EraCharacterArchive onClose={() => {}} onClearInspection={() => {}} />);
    for (const label of ['Époque des archives','Rechercher une identité','Expression du portrait','Action 2D','Pose de l’animation','Fermer les archives']) expect(markup).toContain(label);
    expect(markup).toContain('Revérifier les fichiers');
    expect(markup).toContain('Quitter l’inspection 2D');
    expect(markup).toContain('ne reprend pas automatiquement');
  });
});
