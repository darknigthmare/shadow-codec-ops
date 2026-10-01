import { useRef, useState } from 'react';
import '../../styles/cqc.css';

export const CQC_GAME_URL = `${import.meta.env.BASE_URL}cqc/index.html`;

export function CqcLauncher() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState('');

  async function openFullscreen() {
    setFullscreenMessage('');
    try {
      if (!frameRef.current?.requestFullscreen) {
        setFullscreenMessage('Le plein écran est disponible depuis les options du jeu.');
        return;
      }
      await frameRef.current.requestFullscreen();
      frameRef.current?.focus();
    } catch {
      setFullscreenMessage('Ouvre le jeu séparément si ton navigateur bloque le plein écran.');
    }
  }

  return (
    <section className="cqc-module" aria-labelledby="cqc-title">
      <header className="cqc-toolbar panel">
        <div>
          <h2 id="cqc-title">CQC Versus Legacy</h2>
          <p>Duels, chroniques et progression CQC. Retrouve la même sauvegarde en ouvrant le jeu séparément.</p>
        </div>
        <div className="cqc-actions">
          <button className="primary-action secondary" type="button" onClick={() => void openFullscreen()}>
            Plein écran
          </button>
          <a className="primary-action secondary" href={CQC_GAME_URL} target="_blank" rel="noopener noreferrer">
            Ouvrir le jeu séparément
          </a>
        </div>
      </header>
      <div className="cqc-frame-container" aria-busy={!loaded}>
        {!loaded && <p className="cqc-loading" role="status">Chargement de CQC…</p>}
        <iframe
          ref={frameRef}
          className="cqc-game-frame"
          src={CQC_GAME_URL}
          title="CQC Versus Legacy — jeu de combat et chroniques"
          loading="lazy"
          allow="fullscreen; gamepad"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
      {fullscreenMessage && <p className="cqc-status" role="status">{fullscreenMessage}</p>}
    </section>
  );
}
