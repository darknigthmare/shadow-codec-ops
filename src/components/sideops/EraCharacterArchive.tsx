import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import '../../styles/era-character-archive.css';
import {
  ERA_CHARACTER_ARCHIVE, getArchiveAnimationClips, getArchiveCoverage, getArchiveFrameRect,
  getArchivePortraitAsset, getArchivePortraitExpressions, getArchiveRequiredAssets,
  validateArchiveImageDimensions, type ArchiveAssetState, type ArchiveImageAsset,
  type EraCharacterArchiveEntry
} from '../../systems/eraCharacterArchive';

interface Props {
  onClose: () => void;
  onInspect?: (entry: EraCharacterArchiveEntry) => void;
  onClearInspection?: () => void;
}
const statusLabels = { loading: 'Vérification…', ready: 'Chargé', missing: 'Manquant', invalid: 'Dimensions invalides' };
const categoryLabels = { human: 'Personnage', machine: 'Machine', companion: 'Compagnon', enemy: 'Ennemi' };
const requiredAssets = [...new Map(ERA_CHARACTER_ARCHIVE.flatMap(getArchiveRequiredAssets).map(asset => [asset.path, asset])).values()];

function probeImage(asset: ArchiveImageAsset, done: (state: ArchiveAssetState) => void): () => void {
  const image = new Image();
  let settled = false;
  const finish = (state: ArchiveAssetState) => {
    if (settled) return;
    settled = true; window.clearTimeout(timer); image.onload = null; image.onerror = null; done(state);
  };
  const timer = window.setTimeout(() => finish({ status: 'missing' }), 15000);
  image.onload = () => finish(validateArchiveImageDimensions(asset, image.naturalWidth, image.naturalHeight));
  image.onerror = () => finish({ status: 'missing' });
  image.src = asset.path;
  return () => { settled = true; window.clearTimeout(timer); image.onload = null; image.onerror = null; image.src = ''; };
}
function imageStyle(asset: ArchiveImageAsset, displaySize: number): CSSProperties {
  if (!asset.frame) return {};
  const scale = displaySize / asset.frame.size;
  return {
    width: displaySize, height: displaySize,
    backgroundImage: `url("${asset.path}")`,
    backgroundSize: `${asset.frame.size * asset.frame.columns * scale}px auto`,
    backgroundPosition: `${-(asset.frame.index % asset.frame.columns) * displaySize}px ${-Math.floor(asset.frame.index / asset.frame.columns) * displaySize}px`
  };
}

/** A visual dossier is not a callable contact, a transcript or an earned mission result. */
export function EraCharacterArchive({ onClose, onInspect, onClearInspection }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState<'all' | 'peace_walker' | 'mgsv_phantom_pain'>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(ERA_CHARACTER_ARCHIVE[0].id);
  const [expression, setExpression] = useState('neutral');
  const [action, setAction] = useState('idle');
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(() => typeof window.matchMedia !== 'function' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [revision, setRevision] = useState(0);
  const [assetStates, setAssetStates] = useState<Record<string, ArchiveAssetState>>({});
  const selected = ERA_CHARACTER_ARCHIVE.find(entry => entry.id === selectedId) ?? ERA_CHARACTER_ARCHIVE[0];
  const clips = getArchiveAnimationClips(selected);
  const clip = clips.find(candidate => candidate.state === action) ?? clips[0];
  const portrait = getArchivePortraitAsset(selected, expression);
  const coverage = getArchiveCoverage(selected, assetStates);
  const entries = useMemo(() => ERA_CHARACTER_ARCHIVE.filter(entry =>
    (filter === 'all' || entry.visualPackId === filter)
    && `${entry.name} ${entry.id}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  ), [filter, query]);
  const ready2D = ERA_CHARACTER_ARCHIVE.filter(entry => getArchiveCoverage(entry, assetStates).animationReady).length;
  const portraitReady = ERA_CHARACTER_ARCHIVE.filter(entry => getArchiveCoverage(entry, assetStates).portraitReady).length;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    return () => { dialog?.close(); previousFocus?.focus(); };
  }, []);
  useEffect(() => {
    setAssetStates(Object.fromEntries(requiredAssets.map(asset => [asset.path, { status: 'loading' as const }])));
    const stop = requiredAssets.map(asset => probeImage(asset, state => setAssetStates(current => ({ ...current, [asset.path]: state }))));
    return () => stop.forEach(cancel => cancel());
  }, [revision]);
  const portraitPath = portrait?.path;
  useEffect(() => {
    if (!portraitPath || requiredAssets.some(asset => asset.path === portraitPath)) return;
    setAssetStates(current => ({ ...current, [portraitPath]: { status: 'loading' } }));
    return probeImage({ path: portraitPath }, state => setAssetStates(current => ({ ...current, [portraitPath]: state })));
  }, [portraitPath, revision]);
  useEffect(() => {
    if (!playing || !clip || assetStates[clip.path]?.status !== 'ready') return;
    const count = clip.end - clip.start + 1;
    const timer = window.setInterval(() => setPhase(current => (current + 1) % count), 1000 / clip.frameRate);
    return () => window.clearInterval(timer);
  }, [playing, clip?.path, clip?.start, clip?.end, clip?.frameRate, assetStates[clip?.path ?? '']?.status]);

  function selectEntry(entry: EraCharacterArchiveEntry) {
    setSelectedId(entry.id); setExpression('neutral'); setAction('idle'); setPhase(0);
  }
  const frame = clip ? getArchiveFrameRect(clip, phase) : undefined;
  const spriteReady = Boolean(clip && assetStates[clip.path]?.status === 'ready');
  const portraitState = portrait ? assetStates[portrait.path] : undefined;

  return (
    <dialog ref={dialogRef} className="era-character-archive" aria-labelledby="era-archive-title" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDownCapture={event => {
      // Phaser listens on window even while paused; keep archive keys inside the modal.
      event.stopPropagation();
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    }} onKeyUpCapture={event => event.stopPropagation()}>
      <header className="era-archive-header">
        <div><span>ARCHIVES VISUELLES / SIMULATION</span><h2 id="era-archive-title">Peace Walker & The Phantom Pain</h2></div>
        <button type="button" onClick={onClose} autoFocus aria-label="Fermer les archives">Fermer</button>
      </header>
      <p className="era-archive-disclaimer">Dossiers consultables, pas de nouveaux appels radio. Les poses montrées sont des adaptations 2D fan-made ; une animation disponible ne signifie pas qu’une mission ou une IA dédiée est terminée.</p>
      <div className="era-archive-toolbar">
        <label>Époque<select aria-label="Époque des archives" value={filter} onChange={event => setFilter(event.target.value as typeof filter)}><option value="all">Les deux époques</option><option value="peace_walker">Peace Walker — 1974</option><option value="mgsv_phantom_pain">The Phantom Pain — 1984</option></select></label>
        <label>Rechercher<input aria-label="Rechercher une identité" value={query} onChange={event => setQuery(event.target.value)} placeholder="Nom ou identité…" /></label>
        <button type="button" onClick={() => setRevision(value => value + 1)}>Revérifier les fichiers</button>
      </div>
      <p className="era-archive-summary" role="status">{ready2D}/{ERA_CHARACTER_ARCHIVE.length} ensembles 2D chargés · {portraitReady}/{ERA_CHARACTER_ARCHIVE.length} portraits neutres/cartes source chargés</p>
      <div className="era-archive-layout">
        <nav className="era-archive-list" aria-label="Identités PW et TPP">
          {entries.map(entry => {
            const state = getArchiveCoverage(entry, assetStates);
            return <button type="button" key={entry.id} data-archive-id={entry.id} aria-pressed={entry.id === selected.id} onClick={() => selectEntry(entry)}><strong>{entry.name}</strong><span>{entry.visualPackId === 'peace_walker' ? 'PW' : 'TPP'} · {categoryLabels[entry.category]}</span><small>{state.animationReady ? `${state.loadedPoses} poses chargées` : state.missingPaths.length ? 'Visuel incomplet / manquant' : 'Visuels non vérifiés'}</small></button>;
          })}
          {entries.length === 0 ? <p>Aucune identité correspondante.</p> : null}
        </nav>
        <article className="era-archive-detail" data-selected-archive-id={selected.id}>
          <h3>{selected.name}</h3>
          <p>{selected.note}</p>
          <div className="era-archive-visuals">
            <section><h4>{selected.portrait.kind === 'character' ? 'Portrait' : 'Carte de la source 2D'}</h4>
              <div className="era-archive-portrait">
                {portrait && portraitState?.status === 'ready'
                  ? portrait.frame ? <div className="era-archive-frame" role="img" aria-label={`Carte source de ${selected.name}`} style={imageStyle(portrait, 192)} />
                    : <img src={portrait.path} alt={`${selected.name} — ${expression}`} />
                  : <span>{portraitState ? statusLabels[portraitState.status] : 'Non vérifié'}</span>}
              </div>
              {selected.portrait.kind === 'character' ? <label>Expression<select aria-label="Expression du portrait" value={expression} onChange={event => setExpression(event.target.value)}>{getArchivePortraitExpressions(selected).map(value => <option key={value} value={value}>{value}</option>)}</select></label> : <p>Pose source réelle, aucune émotion artificielle.</p>}
            </section>
            <section><h4>Animation 2D</h4>
              <div className="era-archive-stage">
                {clip && frame && spriteReady ? <div className="era-archive-frame" role="img" aria-label={`${selected.name} — ${clip.state} — pose ${phase + 1}`} data-sheet={clip.path} data-frame={frame.index} style={imageStyle({ path: clip.path, frame: { size: clip.frameSize, index: frame.index, columns: 4 } }, 256)} />
                  : <span>{clip && assetStates[clip.path] ? statusLabels[assetStates[clip.path].status] : 'Aucune feuille disponible'}</span>}
              </div>
              <label>Action<select aria-label="Action 2D" value={clip?.state ?? ''} onChange={event => { setAction(event.target.value); setPhase(0); }}>{clips.map(item => <option key={item.state} value={item.state}>{item.state}</option>)}</select></label>
              <div className="era-archive-playback"><button type="button" onClick={() => setPlaying(value => !value)} disabled={!spriteReady}>{playing ? 'Pause animation' : 'Lire animation'}</button><label>Pose<input aria-label="Pose de l’animation" type="range" min={0} max={clip ? clip.end - clip.start : 0} value={phase} disabled={!spriteReady} onChange={event => { setPlaying(false); setPhase(Number(event.target.value)); }} /></label><span>{phase + 1}/4</span></div>
            </section>
          </div>
          <p>{coverage.loadedBoards}/{coverage.expectedBoards} planches chargées · {coverage.loadedPoses}/{coverage.expectedPoses} poses. Identité : <code>{selected.id}</code></p>
          <ul className="era-archive-files">{getArchiveRequiredAssets(selected).map(asset => <li key={asset.path}><span>{assetStates[asset.path] ? statusLabels[assetStates[asset.path].status] : 'Non vérifié'}</span><code>{asset.path}</code></li>)}</ul>
          <div className="era-archive-actions">
            {onInspect ? <button type="button" disabled={!coverage.animationReady} onClick={() => onInspect(selected)}>Inspecter en 2D</button> : null}
            {onClearInspection ? <button type="button" onClick={onClearInspection}>Quitter l’inspection 2D</button> : null}
          </div>
          <p className="era-archive-disclaimer">L’inspection est une mise en scène non hostile séparée du récit. Fermer ce dossier ne reprend pas automatiquement une mission mise en pause.</p>
        </article>
      </div>
    </dialog>
  );
}
