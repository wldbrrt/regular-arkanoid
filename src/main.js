import Phaser from 'phaser';
import {MainMenuScene} from './scenes/mainMenuScene';
import {LevelScene01} from "./scenes/levelScene01";
import {LevelScene02} from "./scenes/levelScene02";

const config = {
    type: Phaser.AUTO,
    width: 768,
    height: 1366,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: [MainMenuScene, LevelScene01, LevelScene02],
};

const game = new Phaser.Game(config);

