import { Panel } from './Panel';
import { StatusBadge } from './StatusBadge';

interface PlaceholderScreenProps {
  title: string;
  subtitle: string;
}

export function PlaceholderScreen({ title, subtitle }: PlaceholderScreenProps) {
  return (
    <Panel className="placeholder-screen">
      <StatusBadge label="MODULE RESERVED" tone="warning" />
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="placeholder-grid">
        <div>DATA MODEL: READY</div>
        <div>UI SLOT: READY</div>
        <div>ENGINE HOOK: PENDING</div>
      </div>
    </Panel>
  );
}
