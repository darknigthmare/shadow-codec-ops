import type { ReactNode } from 'react';
import type { CodecState, EraId } from '../../types/codec.types';
import type { CodecVisualIdentity } from '../../systems/codecVisualIdentity';
import { formatFrequency } from '../../systems/frequencyEngine';

interface CodecVisualStageProps {
  era: EraId;
  identity: CodecVisualIdentity;
  contextName: string;
  chapterLabel: string;
  playerName: string;
  contactName: string;
  contactRole?: string;
  contactAccess?: string;
  frequency: number;
  signalStrength: number;
  codecState: CodecState;
  leftPortrait: ReactNode;
  rightPortrait: ReactNode;
  topicSelector?: ReactNode;
  dialogue: ReactNode;
  utilityActions: ReactNode;
  onTune: (delta: number) => void;
  onFrequencyInput: (value: string) => void;
  onCall: () => void;
}

const waveform = [22, 54, 34, 76, 46, 86, 28, 62, 92, 38, 70, 48, 82, 30, 58, 74, 44, 88, 36, 66, 52, 80, 26, 60];

function SignalBars({ strength }: { strength: number }) {
  return (
    <div className="visual-signal-bars" aria-label={`Signal strength ${strength}%`}>
      {[20, 40, 60, 80, 100].map((threshold) => (
        <span key={threshold} className={strength >= threshold ? 'is-active' : ''} />
      ))}
    </div>
  );
}

function Waveform({ strength }: { strength: number }) {
  return (
    <div className="codec-waveform" aria-hidden="true">
      {waveform.map((height, index) => (
        <span key={`${height}-${index}`} style={{ height: `${Math.max(8, Math.round(height * (0.38 + strength / 155)))}%` }} />
      ))}
    </div>
  );
}

function Tuner({ identity, frequency, signalStrength, onTune, onFrequencyInput, onCall }: Pick<CodecVisualStageProps, 'identity' | 'frequency' | 'signalStrength' | 'onTune' | 'onFrequencyInput' | 'onCall'>) {
  const largeStep = identity.supportsClassicTuning ? 0.1 : 1;
  const smallStep = identity.supportsClassicTuning ? 0.01 : 0.1;
  return (
    <div className={`visual-tuner tuner-${identity.controlStyle}`}>
      <div className="visual-tuner-heading">
        <span>{identity.frequencyLabel}</span>
        <strong>{identity.shellLabel}</strong>
      </div>
      <div className="visual-frequency-row">
        <button type="button" aria-label="Tune down fast" onClick={() => onTune(-largeStep)}>−−</button>
        <button type="button" aria-label="Tune down" onClick={() => onTune(-smallStep)}>−</button>
        <input
          className="visual-frequency-display"
          value={formatFrequency(frequency)}
          onChange={(event) => onFrequencyInput(event.target.value)}
          inputMode="decimal"
          aria-label={identity.frequencyLabel}
        />
        <button type="button" aria-label="Tune up" onClick={() => onTune(smallStep)}>+</button>
        <button type="button" aria-label="Tune up fast" onClick={() => onTune(largeStep)}>++</button>
      </div>
      {identity.controlStyle === 'analog' ? (
        <div className="analog-tuner-scale">
          <span>LOW</span>
          <div className="analog-tuner-track"><i style={{ left: `${signalStrength}%` }} /></div>
          <span>HIGH</span>
        </div>
      ) : identity.controlStyle === 'idroid' || identity.controlStyle === 'briefing' ? (
        <Waveform strength={signalStrength} />
      ) : (
        <div className="visual-signal-track"><span style={{ width: `${signalStrength}%` }} /></div>
      )}
      <button type="button" className="visual-call-button" onClick={onCall}>{identity.callLabel}</button>
    </div>
  );
}

export function CodecVisualStage(props: CodecVisualStageProps) {
  const {
    era,
    identity,
    contextName,
    chapterLabel,
    playerName,
    contactName,
    contactRole,
    contactAccess,
    signalStrength,
    codecState,
    leftPortrait,
    rightPortrait,
    topicSelector,
    dialogue,
    utilityActions
  } = props;

  const tuner = <Tuner {...props} />;
  const state = codecState.replace(/_/g, ' ').toUpperCase();
  const access = contactAccess?.replace(/_/g, ' ').toUpperCase() ?? 'NO ROUTE';
  const role = contactRole?.replace(/_/g, ' ').toUpperCase() ?? 'UNKNOWN';

  if (identity.layoutId === 'msx_terminal') {
    return (
      <div className="codec-visual-stage layout-msx" data-era={era} data-state={codecState}>
        <header className="msx-radio-header">
          <span>FOXHOUND COMM SYSTEM</span><strong>RADIO</strong><span>{state}</span>
        </header>
        <div className="msx-terminal-window">
          <div className="msx-operator-line">OPERATIVE: {playerName} / LOCATION: {contextName}</div>
          <div className="msx-terminal-columns">
            <div className="msx-character-block">{leftPortrait}</div>
            {tuner}
            <div className="msx-character-block">{rightPortrait}</div>
          </div>
          <div className="msx-route-line">CONTACT: {contactName} / CLASS: {role} / ACCESS: {access}</div>
          {topicSelector}
          <div className="msx-text-buffer"><span>{identity.dialogueLabel}</span>{dialogue}</div>
          <footer className="msx-function-rail">{utilityActions}</footer>
        </div>
      </div>
    );
  }

  if (identity.layoutId === 'mgs1_twin_codec') {
    return (
      <div className="codec-visual-stage layout-mgs1" data-era={era} data-state={codecState}>
        <div className="mgs1-title-rail"><span>CODEC</span><strong>{contextName}</strong><SignalBars strength={signalStrength} /></div>
        <div className="mgs1-codec-frame">{leftPortrait}<div className="mgs1-core">{tuner}{topicSelector}</div>{rightPortrait}</div>
        <div className="mgs1-dialogue">{dialogue}</div>
        <div className="mgs1-command-rail">{utilityActions}</div>
      </div>
    );
  }

  if (identity.layoutId === 'mgs2_digital_codec') {
    return (
      <div className="codec-visual-stage layout-mgs2" data-era={era} data-state={codecState}>
        <header className="mgs2-header"><span>TACTICAL ESPIONAGE LINK</span><strong>{chapterLabel}</strong><span>{state}</span></header>
        <div className="mgs2-digital-grid">
          <section className="mgs2-feed feed-player"><i>OPERATIVE FEED</i>{leftPortrait}<small>{playerName}</small></section>
          <section className="mgs2-center-deck">{tuner}<div className="mgs2-channel-meta"><span>ROUTE</span><strong>{contactName}</strong><small>{access}</small></div>{topicSelector}</section>
          <section className="mgs2-feed feed-contact"><i>SUPPORT FEED</i>{rightPortrait}<small>{role}</small></section>
        </div>
        <div className="mgs2-transcript"><span>{identity.dialogueLabel}</span>{dialogue}</div>
        <div className="mgs2-utility-rail">{utilityActions}</div>
      </div>
    );
  }

  if (identity.layoutId === 'mgs3_field_radio') {
    return (
      <div className="codec-visual-stage layout-mgs3" data-era={era} data-state={codecState}>
        <div className="mgs3-radio-casing">
          <header><span>US ARMY FIELD RADIO</span><strong>{contextName}</strong><b>{state}</b></header>
          <div className="mgs3-hardware-row">
            <div className="mgs3-lcd portrait-lcd">{leftPortrait}</div>
            <div className="mgs3-control-bank">
              <div className="mgs3-meter-bank"><span>BATTERY</span><i /><i /><i /><span>SIGNAL</span><SignalBars strength={signalStrength} /></div>
              {tuner}
              <div className="mgs3-knob-row"><span>VOL</span><i /><span>SQUELCH</span><i /><span>BAND</span><i /></div>
              {topicSelector}
            </div>
            <div className="mgs3-lcd portrait-lcd">{rightPortrait}</div>
          </div>
          <div className="mgs3-field-labels"><span>SURVIVAL SUPPORT</span><strong>{contactName}</strong><span>{role}</span></div>
          <div className="mgs3-radio-transcript">{dialogue}</div>
          <div className="mgs3-radio-buttons">{utilityActions}</div>
        </div>
      </div>
    );
  }

  if (identity.layoutId === 'mgs4_cinematic_codec') {
    return (
      <div className="codec-visual-stage layout-mgs4" data-era={era} data-state={codecState}>
        <header className="mgs4-secure-header"><span>NOMAD // ENCRYPTED</span><strong>{contextName}</strong><SignalBars strength={signalStrength} /></header>
        <div className="mgs4-video-wall">
          <section className="mgs4-video-pane player-video">{leftPortrait}<div><span>FIELD UNIT</span><strong>{playerName}</strong></div></section>
          <section className="mgs4-video-pane contact-video">{rightPortrait}<div><span>{role}</span><strong>{contactName}</strong></div></section>
          <aside className="mgs4-tactical-sidebar"><span>SOP STATUS</span><b>{state}</b><span>CHANNEL</span><strong>{access}</strong><span>THEATER</span><small>{chapterLabel}</small></aside>
        </div>
        <div className="mgs4-channel-strip">{tuner}{topicSelector}</div>
        <div className="mgs4-lower-third">{dialogue}</div>
        <div className="mgs4-command-strip">{utilityActions}</div>
      </div>
    );
  }

  if (identity.layoutId === 'peace_walker_briefing') {
    return (
      <div className="codec-visual-stage layout-peace-walker" data-era={era} data-state={codecState}>
        <div className="pw-file-cover">
          <header><span>MILITAIRES SANS FRONTIÈRES</span><strong>OPERATIONS FILE</strong><b>{chapterLabel}</b></header>
          <div className="pw-folder-tabs"><span>BRIEFING</span><span>STAFF</span><span>INTEL</span><span>MISSION LOG</span></div>
          <div className="pw-dossier-grid">
            <section className="pw-photo-card">{leftPortrait}<small>FIELD COMMANDER</small></section>
            <section className="pw-file-body">
              <div className="pw-file-meta"><span>FILE</span><strong>{contextName}</strong><span>CONTACT</span><strong>{contactName}</strong><span>STATUS</span><strong>{access}</strong></div>
              {tuner}
              {topicSelector}
            </section>
            <section className="pw-photo-card">{rightPortrait}<small>{role}</small></section>
          </div>
          <div className="pw-transcript-sheet"><span>{identity.dialogueLabel}</span>{dialogue}</div>
          <div className="pw-file-actions">{utilityActions}</div>
        </div>
      </div>
    );
  }

  if (identity.layoutId === 'mgsv_idroid') {
    return (
      <div className="codec-visual-stage layout-mgsv" data-era={era} data-state={codecState}>
        <header className="idroid-header"><span>DIAMOND DOGS</span><strong>iDROID COMMUNICATIONS</strong><b>{state}</b></header>
        <div className="idroid-grid">
          <nav className="idroid-nav"><span className="active">COMMS</span><span>MAP</span><span>MISSIONS</span><span>CASSETTES</span><span>STAFF</span></nav>
          <main className="idroid-main">
            <div className="idroid-hologram-row">{leftPortrait}<div className="idroid-wave-panel"><Waveform strength={signalStrength} /><span>{contextName}</span><strong>{contactName}</strong></div>{rightPortrait}</div>
            {tuner}
            {topicSelector}
            <div className="idroid-transcript">{dialogue}</div>
          </main>
          <aside className="idroid-intel-card"><span>INTEL SOURCE</span><strong>{contactName}</strong><span>ROLE</span><b>{role}</b><span>ACCESS</span><b>{access}</b><span>AO</span><small>{chapterLabel}</small></aside>
        </div>
        <div className="idroid-command-dock">{utilityActions}</div>
      </div>
    );
  }

  if (identity.layoutId === 'patriots_corrupt') {
    return (
      <div className="codec-visual-stage layout-patriots" data-era={era} data-state={codecState}>
        <header><span>GW NODE 0xDEAD</span><strong>{identity.shellLabel}</strong><b>{state}</b></header>
        <div className="patriots-broken-grid"><div>{leftPortrait}</div><main>{tuner}{topicSelector}<div className="patriots-command">{dialogue}</div></main><div>{rightPortrait}</div></div>
        <div className="patriots-false-readouts"><span>MEMORY CORRECT</span><span>MISSION FAILED SUCCESSFULLY</span><span>TURN OFF THE CONSOLE</span></div>
        <div className="patriots-utility">{utilityActions}</div>
      </div>
    );
  }

  return (
    <div className="codec-visual-stage layout-vr" data-era={era} data-state={codecState}>
      <header><span>VR COMM NODE</span><strong>{contextName}</strong><b>{state}</b></header>
      <div className="vr-codec-grid">{leftPortrait}<main>{tuner}{topicSelector}</main>{rightPortrait}</div>
      <div className="vr-sim-dialogue">{dialogue}</div>
      <div className="vr-utility">{utilityActions}</div>
    </div>
  );
}
