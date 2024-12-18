import Phaser from 'phaser';
import {MainMenuScene} from './scenes/mainMenuScene';
import {LevelScene01} from "./scenes/levelScene01";
import {LevelScene02} from "./scenes/levelScene02";


// Import other scenes as needed

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: { debug: false },
    },
    scene: [MainMenuScene, LevelScene01, LevelScene02],
};

const game = new Phaser.Game(config);