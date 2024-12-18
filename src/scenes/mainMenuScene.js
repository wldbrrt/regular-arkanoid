import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  #centerPosition

  constructor() {
    super('MainMenuScene');
  }

  preload() {
    this.load.image('background', 'assets/images/mainMenu.png');
    // this.load.audio('menu-music', 'assets/audio/background-music.mp3');
  }

  create() {
    this.#centerPosition = this.scale.height / 2

    this.add.image(this.scale.width / 2,  this.#centerPosition, 'background').setOrigin(0.5);
    const title = this.add.text(400, this.#centerPosition - 200, 'REGULAR ARKANOID', {
      fontSize: '48px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const startButton = this.add.text(400, this.#centerPosition, 'Start Game', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('LevelScene01');
    });
  }
}