import Phaser from 'phaser';
import {MainMenuScene} from './scenes/mainMenuScene';
import {LevelScene01} from "./scenes/levelScene01";
import {LevelScene02} from "./scenes/levelScene02";
import {LevelScene03} from "./scenes/levelScene03";
import {LevelScene04} from "./scenes/levelScene04";
import {LevelScene05} from "./scenes/levelScene05";

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
    scene: [MainMenuScene, LevelScene01, LevelScene02, LevelScene03, LevelScene04, LevelScene05],
};

const game = new Phaser.Game(config);

