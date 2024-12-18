import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.audio('menu-music', 'assets/audio/background-music.mp3');
  }

  create() {
    this.add.image(400, 300, 'background').setOrigin(0.5);
    const title = this.add.text(400, 200, 'Arkanoid Game', {
      fontSize: '48px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const startButton = this.add.text(400, 400, 'Start Game', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('LevelScene01');
    });
  }
}