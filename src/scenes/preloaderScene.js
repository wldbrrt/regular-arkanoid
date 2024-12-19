import Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;

        const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            fontSize: '18px',
            fill: '#ffffff',
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            percentText.setText(`${Math.round(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        this.load.image('background', 'assets/images/mainMenu.png');
        this.load.image('gameName', 'assets/images/gameName.png');
        this.load.image('volumeOn', 'assets/images/volumeOn.svg');
        this.load.image('volumeOff', 'assets/images/volumeOff.svg');

        this.load.audio('menu-music', 'assets/audio/mainMenuSoundtrack.mp3');

        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('brick', 'assets/images/brick.png');
        this.load.image('strongBrick', 'assets/images/strongBrick.png');
        this.load.image('strongBrickDamaged', 'assets/images/strongBrickDamaged.png');
        this.load.image('unbreakableBrick', 'assets/images/unbreakableBrick.png');
        this.load.image('lifePowerUp', 'assets/images/heart.png')
        this.load.image('damagePowerUp', 'assets/images/power.png')
        this.load.image('x3PowerUp', 'assets/images/x3.png')
        this.load.image('x2PowerUp', 'assets/images/x2.png')
        this.load.image('slowerPowerUp', 'assets/images/slow.png')
        this.load.image('fasterPowerUp', 'assets/images/fast.png')
        this.load.image('winPopup', 'assets/images/winPopup.png')
        this.load.image('gameOverPopup', 'assets/images/gameOverPopup.png')
        this.load.image('homeIcon', 'assets/images/homeIcon.svg')
        this.load.image('replayIcon', 'assets/images/replayIcon.svg')

        this.load.audio('brickBreakSound', 'assets/audio/explosion.mp3');
        this.load.audio('metalSound', 'assets/audio/metalSound.mp3');
        this.load.audio('hitPaddle', 'assets/audio/hit.mp3');
        this.load.audio('hitBrick', 'assets/audio/hitBrick.mp3');
        this.load.audio('powerUpCollect', 'assets/audio/powerUp.mp3');
        this.load.audio('levelComplete', 'assets/audio/levelComplete.mp3');
        this.load.audio('gameOver', 'assets/audio/gameOver.mp3');

        this.load.spritesheet('brickExplosion', 'assets/sprites/explosion.png', {
            frameWidth: 95,
            frameHeight: 95,
        });
        this.load.spritesheet('strongBrickSprite', 'assets/sprites/strongBrick.png', {
            frameWidth: 61,
            frameHeight: 25,
        });
        this.load.spritesheet('engineFire', 'assets/sprites/fire.png', {
            frameWidth: 40,
            frameHeight: 62,
        });
        this.load.spritesheet('ballSprite', 'assets/sprites/ball.png', {
            frameWidth: 31,
            frameHeight: 31
        });
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}