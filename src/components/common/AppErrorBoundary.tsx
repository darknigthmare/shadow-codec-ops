import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
  resetKey?: string;
  onReset?: () => void;
}

interface AppErrorBoundaryState {
  error: Error | null;
  componentStack: string;
  incidentId: string;
}

const CRASH_LOG_KEY = 'shadow-codec-ops:crash-reports';

function createIncidentId(): string {
  return `SCO-${Date.now().toString(36).toUpperCase()}`;
}

function storeCrashReport(error: Error, info: ErrorInfo, incidentId: string): void {
  try {
    const previous = JSON.parse(window.localStorage.getItem(CRASH_LOG_KEY) ?? '[]') as unknown[];
    const next = [
      {
        incidentId,
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack ?? '',
        componentStack: info.componentStack ?? ''
      },
      ...previous
    ].slice(0, 5);
    window.localStorage.setItem(CRASH_LOG_KEY, JSON.stringify(next));
  } catch {
    // Recovery UI must remain available even when persistence is unavailable.
  }
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    error: null,
    componentStack: '',
    incidentId: ''
  };

  static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
    return { error, incidentId: createIncidentId() };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const incidentId = this.state.incidentId || createIncidentId();
    this.setState({ componentStack: info.componentStack ?? '', incidentId });
    storeCrashReport(error, info, incidentId);
    console.error('[Shadow Codec Ops] React module failure', error, info);
  }

  componentDidUpdate(previousProps: AppErrorBoundaryProps): void {
    if (this.state.error && previousProps.resetKey !== this.props.resetKey) {
      this.reset();
    }
  }

  private reset = (): void => {
    this.setState({ error: null, componentStack: '', incidentId: '' });
    this.props.onReset?.();
  };

  private reload = (): void => {
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <section className="error-boundary panel" role="alert">
        <span className="brand-kicker">TACTICAL MODULE FAILURE</span>
        <h2>Communication subsystem interrupted</h2>
        <p>
          The active module failed safely. Local saves were left intact and a compact diagnostic report was stored on this device.
        </p>
        <div className="error-boundary-meta">
          <span>Incident</span><strong>{this.state.incidentId}</strong>
          <span>Message</span><strong>{this.state.error.message || 'Unknown runtime error'}</strong>
        </div>
        <details>
          <summary>Technical diagnostic</summary>
          <pre>{this.state.error.stack ?? this.state.error.message}{this.state.componentStack}</pre>
        </details>
        <div className="error-boundary-actions">
          <button className="primary-action" type="button" onClick={this.reset}>Return to Home</button>
          <button type="button" onClick={this.reload}>Reload Application</button>
        </div>
      </section>
    );
  }
}
