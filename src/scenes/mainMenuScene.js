import Phaser from "phaser";
import {ButtonsBuilder} from "../utils/buttonsBuilder";
import {VolumeController} from "../utils/volumeController";

export class MainMenuScene extends Phaser.Scene {
  #centerPosition

  constructor() {
    super('MainMenuScene');
  }

  preload() {

  }

  create() {
    this.#centerPosition = this.scale.height / 2
    this.sound.play('menu-music', {
      loop: true,
      volume: 0.1
    });

    this.add.image(this.scale.width / 2,  this.#centerPosition, 'background').setOrigin(0.5);
    const title = this.add.image(400,  -400, 'gameName').setOrigin(0.5);

    VolumeController.getInstance(this).createControlButton(this);

    const startButton = ButtonsBuilder.createButton(
        this.scale.width / 2,
        this.scale.height + 150,
        502,
        120,
        'Start',
        0x149DF2,
        0x149DF2,
        this
    );

    const levelSelectButton = ButtonsBuilder.createButton(
        this.scale.width / 2,
        this.scale.height + 350,
        502,
        120,
        'Select Level',
        0x149DF2,
        0x149DF2,
        this
    );

    startButton.on('pointerdown', () => {
      this.scene.start('LevelScene01');
    });

    this.tweens.add({
      targets: [title],
      y: this.#centerPosition - 400,
      ease: 'Power2',
      duration: 800,
    });

    this.tweens.add({
      targets: [startButton, levelSelectButton],
      y: `-=${this.#centerPosition + 100}`,
      ease: 'Bounce.easeOut',
      duration: 1000,
      delay: 500,
    });
  }
}