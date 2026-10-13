import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CODEC_INCOMING_EVENT, consumeCodecIncomingInbox, queueCodecIncomingCall } from './codecCallBus';

describe('Codec incoming call bus', () => {
  beforeEach(() => window.localStorage.clear());

  it('persists calls until the Codec consumes them', () => {
    queueCodecIncomingCall('campbell_mgs1', { priority: 'urgent', required: true });
    const inbox = consumeCodecIncomingInbox();
    expect(inbox).toHaveLength(1);
    expect(inbox[0].priority).toBe('urgent');
    expect(consumeCodecIncomingInbox()).toEqual([]);
  });

  it('dispatches a live browser event', () => {
    const listener = vi.fn();
    window.addEventListener(CODEC_INCOMING_EVENT, listener);
    queueCodecIncomingCall('campbell_mgs1');
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(CODEC_INCOMING_EVENT, listener);
  });
});
