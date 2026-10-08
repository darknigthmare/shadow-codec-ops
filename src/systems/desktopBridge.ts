import { initializeDesktopStorage, mirrorStorageToDesktop } from './desktopEngine';

export async function initializeDesktopEnvironment(): Promise<void> {
  await initializeDesktopStorage();
}

export async function mirrorDesktopSaveNamespace(): Promise<void> {
  await mirrorStorageToDesktop();
}
