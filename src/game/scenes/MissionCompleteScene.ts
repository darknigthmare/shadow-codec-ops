import Phaser from 'phaser';
import type { MissionCompletePayload } from '../core/GameEvents';

export class MissionCompleteScene extends Phaser.Scene {
  constructor() {
    super('MissionCompleteScene');
  }

  create(data: Partial<MissionCompletePayload>): void {
    const success = data.success ?? true;
    const rank = data.rankPreview ?? (success ? 'HOUND' : 'MISSION FAILED');
    const title = success ? 'MISSION CLEAR' : 'MISSION FAILED';
    const titleColor = success ? '#7cff6b' : '#ff6b6b';

    this.add.rectangle(480, 270, 960, 540, 0x020703, 0.96);
    this.add.rectangle(480, 270, 760, 430, 0x06140c, 0.88).setStrokeStyle(2, success ? 0x7cff6b : 0xff6b6b, 0.8);

    this.add.text(280, 58, title, {
      fontFamily: 'monospace',
      fontSize: '42px',
      color: titleColor
    });
    this.add.text(250, 112, data.outcome ?? 'Simulation result locked.', {
      fontFamily: 'monospace',
      fontSize: '15px',
      color: '#caffbd',
      wordWrap: { width: 470 }
    });
    this.add.text(330, 148, `RANK: ${rank}`, {
      fontFamily: 'monospace',
      fontSize: '26px',
      color: success ? '#f8f49a' : '#ff9f6b'
    });

    const rows = [
      `STEALTH SCORE: ${data.stealthScore ?? 0}`,
      `OBJECTIVES: ${data.objectivesCompleted ?? 0}/5`,
      `SECRETS: ${data.secretsFound ?? 0}/${data.totalSecrets ?? 0}`,
      `BOSS DEFEATED: ${data.bossDefeated ? 'YES' : 'NO'}`,
      `TIME: ${data.timeSeconds ?? 0}s`,
      `ALERTS: ${data.alerts ?? 0} ${data.noAlert ? '// NO ALERT BONUS' : ''}`,
      `REINFORCEMENTS: ${data.reinforcementCount ?? 0}`,
      `KILLS: ${data.kills ?? 0} ${data.noKill ? '// NO KILL BONUS' : ''}`,
      `NEUTRALIZATIONS: ${data.neutralizations ?? 0}`,
      `SHOTS FIRED: ${data.shotsFired ?? 0}`,
      `DAMAGE TAKEN: ${data.damageTaken ?? 0}`,
      `RATIONS USED: ${data.rationsUsed ?? 0}`,
      `CAMERAS DISABLED: ${data.camerasDisabled ?? 0}`
    ];

    rows.forEach((row, index) => {
      this.add.text(300, 196 + index * 21, row, {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: index <= 5 ? '#caffbd' : '#8ac985'
      });
    });

    this.add.text(240, 488, 'Press ENTER to replay. Press ESC to restart instantly.', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#7cff6b'
    });

    this.input.keyboard?.once('keydown-ENTER', () => {
      this.scene.start('SideOpsScene');
    });
    this.input.keyboard?.once('keydown-ESC', () => {
      this.scene.start('SideOpsScene');
    });
  }
}
