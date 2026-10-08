import type { DirectorContext, DirectorLaunchRequest, DirectorRuntimeEvent, DirectorValue } from '../types/director.types';

export const DIRECTOR_REQUEST_EVENT = 'shadow-codec:director-launch';
export const DIRECTOR_RUNTIME_EVENT = 'shadow-codec:director-runtime-event';

export function requestDirectorSequence(sequenceId: string, context: DirectorContext, sourceLabel?: string, inheritedVariables?: Record<string, DirectorValue>): void {
  const request: DirectorLaunchRequest = { sequenceId, context, sourceLabel, inheritedVariables };
  window.dispatchEvent(new CustomEvent<DirectorLaunchRequest>(DIRECTOR_REQUEST_EVENT, { detail: request }));
}

export function subscribeDirectorRequests(handler: (request: DirectorLaunchRequest) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<DirectorLaunchRequest>).detail);
  window.addEventListener(DIRECTOR_REQUEST_EVENT, listener);
  return () => window.removeEventListener(DIRECTOR_REQUEST_EVENT, listener);
}

export function dispatchDirectorRuntimeEvent(event: DirectorRuntimeEvent): void {
  window.dispatchEvent(new CustomEvent<DirectorRuntimeEvent>(DIRECTOR_RUNTIME_EVENT, { detail: event }));
}

export function subscribeDirectorRuntimeEvents(handler: (event: DirectorRuntimeEvent) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<DirectorRuntimeEvent>).detail);
  window.addEventListener(DIRECTOR_RUNTIME_EVENT, listener);
  return () => window.removeEventListener(DIRECTOR_RUNTIME_EVENT, listener);
}
