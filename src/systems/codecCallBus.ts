import type { CodecCallPriority, IncomingCallRequest } from '../types/codec.types';
import { loadJson, saveJson } from './saveEngine';

const INBOX_KEY = 'codec-incoming-inbox';
export const CODEC_INCOMING_EVENT = 'shadow-codec:incoming-call';

export interface QueueIncomingCallOptions {
  conversationId?: string;
  priority?: CodecCallPriority;
  required?: boolean;
  expiresInMs?: number;
  sourceLabel?: string;
}

export function createIncomingCallRequest(
  contactId: string,
  options: QueueIncomingCallOptions = {}
): IncomingCallRequest {
  const createdAt = new Date();
  const expiresInMs = Math.max(3_000, options.expiresInMs ?? 12_000);
  return {
    id: `incoming_${createdAt.getTime()}_${Math.random().toString(36).slice(2, 8)}`,
    contactId,
    conversationId: options.conversationId,
    priority: options.priority ?? 'routine',
    required: options.required ?? false,
    createdAt: createdAt.toISOString(),
    expiresAt: new Date(createdAt.getTime() + expiresInMs).toISOString(),
    sourceLabel: options.sourceLabel
  };
}

export function queueCodecIncomingCall(
  contactId: string,
  options: QueueIncomingCallOptions = {}
): IncomingCallRequest {
  const request = createIncomingCallRequest(contactId, options);
  const inbox = loadJson<IncomingCallRequest[]>(INBOX_KEY, []);
  saveJson(INBOX_KEY, [...inbox, request].slice(-20));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<IncomingCallRequest>(CODEC_INCOMING_EVENT, { detail: request }));
  }
  return request;
}

export function consumeCodecIncomingInbox(): IncomingCallRequest[] {
  const inbox = loadJson<IncomingCallRequest[]>(INBOX_KEY, []);
  saveJson(INBOX_KEY, []);
  return inbox;
}

export function removeIncomingCallFromInbox(requestId: string): void {
  const inbox = loadJson<IncomingCallRequest[]>(INBOX_KEY, []);
  saveJson(INBOX_KEY, inbox.filter((request) => request.id !== requestId));
}
