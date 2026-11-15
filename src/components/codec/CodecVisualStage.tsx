import { useEffect, useState, type ReactNode } from 'react';
import type { CodecState, EraId } from '../../types/codec.types';
import type { CodecVisualIdentity } from '../../systems/codecVisualIdentity';
import { formatFrequency } from '../../systems/frequencyEngine';
import '../../styles/codec-fidelity-pass17.css';

interface ContextualCodecVisualIdentity extends CodecVisualIdentity {
  organizationLabel?: string;
}

export function resolveCodecVisualStageIdentity(
  identity: CodecVisualIdentity,
  contextId: string
): ContextualCodecVisualIdentity {
  if (identity.era !== 'mgsv') return identity;
  const groundZeroes = contextId === 'mgsv_ground_zeroes';
  return {
    ...identity,
    organizationLabel: groundZeroes ? 'MSF' : 'DIAMOND DOGS',
    shellLabel: groundZeroes ? 'iDROID / MSF COMMS' : identity.shellLabel
  };
}

interface CodecVisualStageProps {
  era: EraId;
  identity: ContextualCodecVisualIdentity;
  contextName: string;
  chapterLabel: string;
  playerName: string;
  contactName: string;
  playerId?: string;
  contactId?: string;
  contactRole?: string;
  contactAccess?: string;
  frequency: number;
  signalStrength: number;
  codecState: CodecState;
  leftPortrait: ReactNode;
  rightPortrait: ReactNode;
  topicSelector?: ReactNode;
  briefingTopics?: Array<{ id: string; label: string }>;
  selectedTopicId?: string;
  onTopicSelect?: (id: string) => void;
  dialogue: ReactNode;
  utilityActions: ReactNode;
  onTune: (delta: number) => void;
  onFrequencyInput: (value: string) => void;
  onCall: () => void;
  onMemory?: () => void;
  onStop?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  callStartedAt?: number | null;
}

interface CanonicalPortraitArea {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Original manual or documented final-game capture pixels (MG2: later release redraws). The full source stays unchanged; only CSS clips its face area.
// These are fixed source frames, not recreated expression sheets or live game model animation.
const canonicalPortraitAreas: Record<string, CanonicalPortraitArea> = {
  "campbell_msx": {
    "src": "/portraits/canon-pass17/mg2-icon1.png",
    "width": 60,
    "height": 90,
    "x": 0,
    "y": 0,
    "w": 60,
    "h": 90
  },
  "miller_msx": {
    "src": "/portraits/canon-pass17/mg2-icon2.png",
    "width": 60,
    "height": 90,
    "x": 0,
    "y": 0,
    "w": 60,
    "h": 90
  },
  "kasler_msx": {
    "src": "/portraits/canon-pass17/mg2-icon3.png",
    "width": 60,
    "height": 90,
    "x": 0,
    "y": 0,
    "w": 60,
    "h": 90
  },
  "holly_msx": {
    "src": "/portraits/canon-pass17/mg2-icon4.png",
    "width": 60,
    "height": 90,
    "x": 0,
    "y": 0,
    "w": 60,
    "h": 90
  },
  "jacobsen_msx": {
    "src": "/portraits/canon-pass17/mg2-icon5.png",
    "width": 58,
    "height": 87,
    "x": 0,
    "y": 0,
    "w": 58,
    "h": 87
  },
  "campbell_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-05-1.png",
    "width": 480,
    "height": 336,
    "x": 48,
    "y": 47,
    "w": 76,
    "h": 130
  },
  "mei_ling_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-05-3.png",
    "width": 480,
    "height": 336,
    "x": 48,
    "y": 47,
    "w": 76,
    "h": 130
  },
  "solid_snake_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-05-3.png",
    "width": 480,
    "height": 336,
    "x": 359,
    "y": 47,
    "w": 71,
    "h": 130
  },
  "otacon_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-07-1.png",
    "width": 600,
    "height": 338,
    "x": 66,
    "y": 17,
    "w": 102,
    "h": 151
  },
  "solid_snake_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-07-1.png",
    "width": 600,
    "height": 338,
    "x": 428,
    "y": 17,
    "w": 102,
    "h": 151
  },
  "rose_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-07-3.png",
    "width": 600,
    "height": 338,
    "x": 66,
    "y": 17,
    "w": 102,
    "h": 151
  },
  "raiden_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-07-3.png",
    "width": 600,
    "height": 338,
    "x": 428,
    "y": 17,
    "w": 102,
    "h": 151
  },
  "major_mgs3": {
    "src": "/portraits/canon-pass17/mgs3-07-1.png",
    "width": 600,
    "height": 338,
    "x": 72,
    "y": 43,
    "w": 67,
    "h": 97
  },
  "para_medic_save_mgs3": {
    "src": "/portraits/canon-pass17/mgs3-07-3.png",
    "width": 600,
    "height": 338,
    "x": 72,
    "y": 43,
    "w": 67,
    "h": 97
  },
  "para_medic_mgs3": {
    "src": "/portraits/canon-pass17/mgs3-07-3.png",
    "width": 600,
    "height": 338,
    "x": 72,
    "y": 43,
    "w": 67,
    "h": 97
  },
  "solid_snake_mg2": {
    "src": "/portraits/canon-pass17/mg2-screen.png",
    "width": 480,
    "height": 420,
    "x": 33,
    "y": 59,
    "w": 60,
    "h": 89
  },
  "solid_snake_zanzibar": {
    "src": "/portraits/canon-pass17/mg2-screen.png",
    "width": 480,
    "height": 420,
    "x": 33,
    "y": 59,
    "w": 60,
    "h": 89
  },
  "colonel_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-codec-colonel7.jpg",
    "width": 640,
    "height": 480,
    "x": 55,
    "y": 24,
    "w": 145,
    "h": 218
  },
  "mr_x_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-codec-mrx12.jpg",
    "width": 640,
    "height": 480,
    "x": 55,
    "y": 24,
    "w": 145,
    "h": 218
  },
  "stillman_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-u12-mgs2_26_7df.jpg",
    "width": 640,
    "height": 480,
    "x": 55,
    "y": 24,
    "w": 145,
    "h": 218
  },
  "pliskin_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-u27-mgs2_133_61b.jpg",
    "width": 640,
    "height": 480,
    "x": 55,
    "y": 24,
    "w": 145,
    "h": 218
  },
  "emma_mgs2": {
    "src": "/portraits/canon-pass17/mgs2-u27-mgs2_49_158.jpg",
    "width": 640,
    "height": 480,
    "x": 55,
    "y": 24,
    "w": 145,
    "h": 218
  },
  "naomi_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-native-mantis1-01500s.png",
    "width": 640,
    "height": 480,
    "x": 60,
    "y": 63,
    "w": 108,
    "h": 191
  },
  "miller_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-native-heliport-01260s.png",
    "width": 640,
    "height": 480,
    "x": 60,
    "y": 63,
    "w": 108,
    "h": 191
  },
  "houseman_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-native-liquid-00780s.png",
    "width": 640,
    "height": 480,
    "x": 60,
    "y": 63,
    "w": 108,
    "h": 191
  },
  "otacon_mgs1": {
    "src": "/portraits/canon-pass17/mgs1-native-liquid-01260s.png",
    "width": 640,
    "height": 480,
    "x": 60,
    "y": 63,
    "w": 108,
    "h": 191
  },
  "solid_snake_msx": {
    "src": "/portraits/canon-pass17/mg1-screen.png",
    "width": 600,
    "height": 420,
    "x": 428,
    "y": 95,
    "w": 54,
    "h": 57
  },
  "solid_snake_mg1": {
    "src": "/portraits/canon-pass17/mg1-screen.png",
    "width": 600,
    "height": 420,
    "x": 428,
    "y": 95,
    "w": 54,
    "h": 57
  },
  "paz_pw": {
    "src": "/portraits/canon-pass17/pw-guide-leaf-27.jpg",
    "width": 2644,
    "height": 1482,
    "x": 2325,
    "y": 965,
    "w": 155,
    "h": 263
  }
};

function CanonicalPortrait({ actorId, name, fallback }: { actorId?: string; name: string; fallback: ReactNode }) {
  const area = actorId ? canonicalPortraitAreas[actorId] : undefined;
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (!area || failedSource === area.src) return fallback;
  return (
    <div className="canonical-codec-portrait" data-canonical-id={actorId} data-source-frame="fixed" aria-label={name}>
      <img src={area.src} alt="" decoding="async" draggable={false}
        onError={() => setFailedSource(area.src)}
        style={{ width: `${100 * area.width / area.w}%`, height: `${100 * area.height / area.h}%`, left: `${-100 * area.x / area.w}%`, top: `${-100 * area.y / area.h}%` }} />
    </div>
  );
}

const waveform = [22, 54, 34, 76, 46, 86, 28, 62, 92, 38, 70, 48, 82, 30, 58, 74, 44, 88, 36, 66, 52, 80, 26, 60];

function Waveform({ strength }: { strength: number }) {
  return (
    <div className="codec-waveform" aria-hidden="true">
      {waveform.map((height, index) => (
        <span key={index} style={{ height: `${Math.max(8, Math.round(height * (0.38 + strength / 155)))}%` }} />
      ))}
    </div>
  );
}

const digitSegments: Record<string, number[]> = {
  '0': [0, 1, 2, 3, 4, 5], '1': [1, 2], '2': [0, 1, 6, 4, 3],
  '3': [0, 1, 6, 2, 3], '4': [5, 6, 1, 2], '5': [0, 5, 6, 2, 3],
  '6': [0, 5, 6, 4, 2, 3], '7': [0, 1, 2], '8': [0, 1, 2, 3, 4, 5, 6],
  '9': [0, 1, 2, 3, 5, 6]
};
const segmentPaths = [
  'M3 1H14L12 3H5Z', 'M14 2L16 4V13L14 15L13 13V4Z',
  'M14 16L16 18V27L14 29L13 27V18Z', 'M3 30H14L12 28H5Z',
  'M2 16L4 18V27L2 29L1 27V18Z', 'M2 2L4 4V13L2 15L1 13V4Z',
  'M3 14H14L12 16H5Z'
];

function FrequencyInput({ frequency, onFrequencyInput }: Pick<CodecVisualStageProps, 'frequency' | 'onFrequencyInput'>) {
  const value = formatFrequency(frequency);
  let offset = 0;
  const glyphs = value.split('').map((char, index) => {
    const x = offset;offset += char === '.' ? 7 : 20;
    return char === '.'
      ? <rect key={index} x={x + 1} y="27" width="3" height="3" />
      : <g key={index} transform={`translate(${x} 0)`}>{(digitSegments[char] ?? []).map(segment => <path key={segment} d={segmentPaths[segment]} />)}</g>;
  });
  return (
    <span className="original-frequency-input">
      <svg className="original-frequency-digits" viewBox={`0 0 ${offset} 32`} aria-hidden="true" preserveAspectRatio="xMaxYMid meet">{glyphs}</svg>
      <input
        className="visual-frequency-display"
        value={value}
        onChange={(event) => onFrequencyInput(event.target.value)}
        inputMode="decimal"
        aria-label="Fréquence radio"
      />
    </span>
  );
}

// The original PTT scale is a stepped, curved receiver meter, not a phone signal icon.
function ReceiverMeter({ strength }: { strength: number }) {
  const widths = [182, 140, 111, 86, 69, 56, 48, 42, 37, 34, 32, 31];
  return (
    <svg className="original-ptt-meter" viewBox="0 0 210 145" aria-hidden="true">
      {widths.map((width, index) => (
        <rect key={index} x="7" y={10 + index * 10} width={width} height="7"
          opacity={strength >= (12 - index) * 100 / 12 ? 1 : 0.22} />
      ))}
      <text x="9" y="139">0</text><text x="174" y="18">MAX</text>
    </svg>
  );
}

function ClassicReceiver(props: CodecVisualStageProps) {
  return (
    <div className="original-classic-receiver">
      <button type="button" className="original-ptt-button" onClick={props.onCall} aria-label="PTT · appeler">PTT</button>
      <div className="original-receiver-display">
        <ReceiverMeter strength={props.signalStrength} />
        <FrequencyInput {...props} />
      </div>
      <button type="button" className="original-tune-left" aria-label="Tune down" onClick={() => props.onTune(-0.01)}>◀</button>
      <button type="button" className="original-tune-right" aria-label="Tune up" onClick={() => props.onTune(0.01)}>▶</button>
      <div className="original-receiver-bottom">
        <button type="button" onClick={props.onMemory}>▼ {props.era === 'mgs1' ? 'MEMORY' : 'mem.'}</button>
        {props.era !== 'mgs1' && <span aria-hidden="true">◀ TUNE ▶</span>}
      </div>
    </div>
  );
}

function ExtensionTools({ topicSelector, utilityActions, leftPortrait, rightPortrait, showPortraits = false }: Pick<CodecVisualStageProps, 'topicSelector' | 'utilityActions' | 'leftPortrait' | 'rightPortrait'> & { showPortraits?: boolean }) {
  return (
    <details className="codec-extension-tools">
      <summary>Sujets, dossiers et outils</summary>
      {topicSelector}
      {showPortraits && <div className="codec-personnel-files">{leftPortrait}{rightPortrait}</div>}
      {utilityActions}
    </details>
  );
}

function TapeCounter({ callStartedAt, codecState }: Pick<CodecVisualStageProps, 'callStartedAt' | 'codecState'>) {
  const [now, setNow] = useState(() => Date.now());
  const playing = codecState === 'dialogue_playing';
  useEffect(() => {
    if (!playing || !callStartedAt) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [callStartedAt, playing]);
  const seconds = playing && callStartedAt ? Math.max(0, Math.floor((now - callStartedAt) / 1000)) : 0;
  const elapsed = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  return <span className="original-tape-counter">{elapsed} / --:--</span>;
}

function CassetteTransport(props: CodecVisualStageProps) {
  const playing = props.codecState === 'dialogue_playing';
  return (
    <div className="original-cassette-transport">
      <div className="original-cassette-level"><span aria-hidden="true">◖))</span><div aria-hidden="true" /><TapeCounter {...props} /></div>
      <div className="original-cassette-buttons">
        <button type="button" disabled={!playing || !props.onPrevious} onClick={props.onPrevious} aria-label="Séquence précédente">◀◀</button>
        <button type="button" onClick={props.onCall} aria-label="Lire la cassette">▶</button>
        <button type="button" disabled={!playing || !props.onStop} onClick={props.onStop} aria-label="Arrêter la cassette">■</button>
        <button type="button" disabled={!playing || !props.onNext} onClick={props.onNext} aria-label="Séquence suivante">▶▶</button>
        <button type="button" onClick={props.onMemory} aria-label="Bibliothèque de cassettes">▣</button>
      </div>
    </div>
  );
}

function ModernRoute({ identity, signalStrength, onCall }: Pick<CodecVisualStageProps, 'identity' | 'signalStrength' | 'onCall'>) {
  return (
    <div className="original-modern-transport">
      <Waveform strength={signalStrength} />
      <button type="button" onClick={onCall}>{identity.callLabel}</button>
    </div>
  );
}

export function CodecVisualStage(props: CodecVisualStageProps) {
  const { era, identity, contextName, chapterLabel, playerName, contactName, codecState, leftPortrait, rightPortrait, dialogue } = props;
  const playerPortrait = <CanonicalPortrait actorId={props.playerId} name={playerName} fallback={leftPortrait} />;
  const contactPortrait = <CanonicalPortrait actorId={props.contactId} name={contactName} fallback={rightPortrait} />;
  const tools = <ExtensionTools {...props} />;
  const state = codecState.replace(/_/g, ' ').toUpperCase();

  if (identity.layoutId === 'msx_terminal') {
    const isMg2 = chapterLabel.toLowerCase().includes('zanzibar');
    return (
      <div className={`codec-visual-stage codec-fidelity-stage layout-msx ${isMg2 ? 'msx-variant-mg2' : 'msx-variant-mg1'}`} data-era={era} data-state={codecState} data-presentation={isMg2 ? 'mg2' : 'mg1'}>
        <div className="original-msx-screen">
          {!isMg2 && <header className="msx-mg1-heading">TRANSCEIVER</header>}
          <div className="original-msx-radio-row">
            {isMg2 && <div className="original-msx-portrait">{playerPortrait}</div>}
            <div className="original-msx-transceiver">
              {isMg2 ? <><div className="original-msx-antenna" aria-hidden="true" /><div className="original-msx-speaker" aria-hidden="true" /></> : <div className="msx-mg1-level" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <span key={index} />)}</div>}
              <div className="original-msx-lcd">{isMg2 && <span>RECV</span>}<FrequencyInput {...props} /></div>
              {!isMg2 && <button type="button" className="msx-mg1-recv" onClick={props.onMemory}>RECV</button>}
              <div className="original-msx-tuning">
                <button type="button" aria-label="Tune down" onClick={() => props.onTune(-0.01)}>◀</button>
                <button type="button" onClick={props.onCall}>{isMg2 ? 'SEND' : 'CALL'}</button>
                <button type="button" aria-label="Tune up" onClick={() => props.onTune(0.01)}>▶</button>
              </div>
              {isMg2 && <div className="msx-mg2-keypad" aria-hidden="true">{'ABCDEFGHIJKL'.split('').map((key) => <span key={key}>{key}</span>)}</div>}
            </div>
            {isMg2 ? <div className="original-msx-portrait">{contactPortrait}</div> : <div className="msx-mg1-player">{playerPortrait}</div>}
          </div>
          <div className="original-msx-transcript">{dialogue}</div>
        </div>
        <ExtensionTools {...props} showPortraits={!isMg2} />
      </div>
    );
  }

  if (identity.layoutId === 'mgs1_twin_codec' || identity.layoutId === 'mgs2_digital_codec') {
    return (
      <div className={`codec-visual-stage codec-fidelity-stage layout-${era} layout-original-classic`} data-era={era} data-state={codecState}>
        <div className="original-classic-screen">
          <div className="original-classic-row">
            <div className="original-classic-portrait contact-feed" aria-label={contactName}>{contactPortrait}</div>
            <ClassicReceiver {...props} />
            <div className="original-classic-portrait player-feed" aria-label={playerName}>{playerPortrait}</div>
          </div>
          <div className="original-classic-transcript">{dialogue}</div>
        </div>
        {tools}
      </div>
    );
  }

  if (identity.layoutId === 'mgs3_field_radio') {
    return (
      <div className="codec-visual-stage codec-fidelity-stage layout-mgs3" data-era={era} data-state={codecState}>
        <div className="original-mgs3-overlay">
          <div className="original-mgs3-contact">{contactPortrait}<span className="original-photo-page">◀ 01/01 ▶</span></div>
          <div className="original-mgs3-band"><div className="original-mgs3-meter" aria-hidden="true" /><FrequencyInput {...props} /></div>
          <div className="original-mgs3-controls">
            <button type="button" onClick={props.onMemory}>▼ MEM</button>
            <button type="button" onClick={props.onCall}>○ SEND</button>
            <span><button type="button" aria-label="Tune down" onClick={() => props.onTune(-0.01)}>◀</button> TUNE <button type="button" aria-label="Tune up" onClick={() => props.onTune(0.01)}>▶</button></span>
          </div>
          <div className="original-mgs3-transcript">{dialogue}</div>
        </div>
        {tools}
      </div>
    );
  }

  if (identity.layoutId === 'mgs4_cinematic_codec') {
    return (
      <div className="codec-visual-stage codec-fidelity-stage layout-mgs4" data-era={era} data-state={codecState}>
        <div className="original-mgs4-link">
          <header>CODEC</header>
          <div className="original-mgs4-receiver-frame">
            <div className="original-mgs4-contact-feed">
              <div className="original-mgs4-video">{rightPortrait}</div>
              <strong>{contactName}</strong><span>{formatFrequency(props.frequency)}</span>
            </div>
            <div className="original-mgs4-reception" aria-hidden="true">
              <div className="original-mgs4-channel-lines" />
              {codecState === 'dialogue_playing' && <Waveform strength={props.signalStrength} />}
            </div>
          </div>
          <div className="original-mgs4-controls"><button type="button" onClick={props.onMemory}>CONTACTS</button><button type="button" onClick={props.onCall} aria-label="Appeler via le codec">CALL</button></div>
          <div className="original-mgs4-transcript">{dialogue}</div>
        </div>
        <ExtensionTools {...props} showPortraits />
      </div>
    );
  }

  if (identity.layoutId === 'peace_walker_briefing') {
    const playing = codecState === 'dialogue_playing';
    return (
      <div className="codec-visual-stage codec-fidelity-stage layout-peace-walker" data-era={era} data-state={codecState}>
        <div className="original-pw-files">
          <header className="original-pw-heading">BRIEFING FILES</header>
          <div className="original-pw-file-grid">
            <div className="original-pw-index">
              <div className="original-pw-mission">{contextName} · {contactName}</div>
              {props.briefingTopics?.length ? props.briefingTopics.map((topic, index) => <button type="button" key={topic.id} className={topic.id === props.selectedTopicId ? 'selected-briefing' : ''} aria-pressed={topic.id === props.selectedTopicId} disabled={playing} onClick={() => props.onTopicSelect?.(topic.id)}><span>{(index + 1).toString().padStart(2, '0')}</span>{topic.label}</button>) : <button type="button" className="selected-briefing" onClick={props.onCall}>{contactName}</button>}
            </div>
            <div className="original-pw-photo">{contactPortrait}</div>
          </div>
          <div className="original-pw-controls"><button type="button" onClick={props.onMemory}>CONTACTS</button><button type="button" onClick={props.onCall} aria-label="Lire le briefing">PLAY</button>{playing && props.onStop && <button type="button" onClick={props.onStop}>STOP</button>}</div>
          <div className="original-pw-transcript">{dialogue}</div>
        </div>
        <ExtensionTools {...props} showPortraits />
      </div>
    );
  }

  if (identity.layoutId === 'mgsv_idroid') {
    const isGroundZeroes = identity.organizationLabel === 'MSF';
    return (
      <div className={`codec-visual-stage codec-fidelity-stage layout-mgsv ${isGroundZeroes ? 'idroid-ground-zeroes' : 'idroid-phantom-pain'}`} data-era={era} data-state={codecState}>
        <div className="original-idroid-display">
          <div className="original-idroid-cassettes">
            <section className="original-idroid-library">
              <header><strong>{isGroundZeroes ? 'MSF' : 'DIAMOND DOGS'}</strong><span>Play intel tape.</span></header>
              <h2>CASSETTE TAPES</h2>
              <button type="button" className="original-tape-folder" onClick={props.onMemory}>Intel tapes</button>
              <button type="button" onClick={props.onCall}>{contactName}</button>
              <small>{contextName}</small>
            </section>
            <section className="original-idroid-selected">
              <div className="original-selected-tape-heading"><span>SELECTED CASSETTE TAPE</span><span>CONTROL PANEL</span></div>
              <div className="original-selected-tape-name">{codecState === 'dialogue_playing' ? contactName : '\u00a0'}</div>
              <CassetteTransport {...props} />
              <h2>TRACK</h2>
              <button type="button" className="original-idroid-current-track" onClick={props.onCall}>{contactName}</button>
              <div className="original-idroid-subtitles">{dialogue}</div>
            </section>
          </div>
        </div>
        <ExtensionTools {...props} showPortraits />
      </div>
    );
  }

  // These two eras are explicitly simulations, never presented as a released game's device.
  const corrupt = identity.layoutId === 'patriots_corrupt';
  return (
    <div className={`codec-visual-stage codec-fidelity-stage ${corrupt ? 'layout-patriots' : 'layout-vr'}`} data-era={era} data-state={codecState} data-presentation="simulation">
      <header><span>SIMULATION</span><strong>{contextName}</strong><b>{state}</b></header>
      <div className="vr-codec-grid">{leftPortrait}<main><ModernRoute {...props} /></main>{rightPortrait}</div>
      <div className="vr-sim-dialogue">{dialogue}</div>
      {tools}
    </div>
  );
}
