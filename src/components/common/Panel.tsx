import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  className?: string;
  children: ReactNode;
}

export function Panel({ title, className = '', children }: PanelProps) {
  return (
    <section className={`panel ${className}`.trim()}>
      {title && <h3 className="panel-title">{title}</h3>}
      {children}
    </section>
  );
}
