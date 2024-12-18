import Phaser from 'phaser';
import {MainMenuScene} from './scenes/mainMenuScene';
import {Level1Scene} from "./scenes/level1Scene";

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
    scene: [MainMenuScene, Level1Scene], // Add scenes here
};

const game = new Phaser.Game(config);