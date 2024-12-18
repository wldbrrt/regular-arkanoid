import Phaser from "phaser";
import {Paddle} from '../objects/Paddle.js';
import {Ball} from '../objects/Ball.js';
import {Controls} from "../utils/controlls";
import {BricksGroup} from "../objects/bricksGroup";

export class BaseLevelScene extends Phaser.Scene {
    #ball
    #paddle
    #bricks
    #levelData
    #nextLevelKey
    #unbrokenBricksAmount
    #centerPosition

    constructor(levelKey, levelData, nextLevelKey) {
        super({key: levelKey});

        this.#levelData = levelData;
        this.#nextLevelKey = nextLevelKey
    }

    decreaseUnbrokenBricksAmount() {
        this.#unbrokenBricksAmount -= 1;

        if (this.#unbrokenBricksAmount <= 0) {
            this.showLevelCompletePopup();
        }
    }

    preload() {
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('brick', 'assets/images/brick.png');
        this.load.image('strongBrick', 'assets/images/strongBrick.png');
        this.load.image('strongBrickDamaged', 'assets/images/strongBrickDamaged.png');
        this.load.image('unbreakableBrick', 'assets/images/unbreakableBrick.png');

        this.load.audio('brickBreakSound', 'assets/audio/explosion.mp3');
        this.load.audio('metalSound', 'assets/audio/metalSound.mp3');

        this.load.spritesheet('brickExplosion', 'assets/sprites/explosion.png', {
            frameWidth: 95,
            frameHeight: 95,
        });
        this.load.spritesheet('strongBrickSprite', 'assets/sprites/strongBrick.png', {
            frameWidth: 61,
            frameHeight: 25,
        });

    }

    create() {
        this.createAnimations()
        this.#centerPosition = this.scale.height / 2

        this.physics.world.checkCollision.down = false

        this.#paddle = new Paddle(this, 400, 1280, 'paddle');
        this.#ball = new Ball(this, 400, 530, 'ball');
        this.#bricks = new BricksGroup(this.#levelData, this).createBricksGroup()
        this.#unbrokenBricksAmount = this.#bricks.getChildren().length;

        this.physics.add.collider(this.#ball, this.#paddle, this.hitPaddle, undefined, this);
        this.physics.add.collider(this.#ball, this.#bricks, this.hitBrick, undefined, this);


        new Controls(this, this.#ball, this.#paddle).initControls()


        //////////////////////
        const killBricks = this.add.text(100, 100, 'kill', {
            fontSize: '20px',
            color: '#00ff00',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive();

        killBricks.on('pointerdown', () => {
            this.destroyAllBricks()
        });
        /////////////////////
    }

    createAnimations() {
        this.anims.create({
            key: 'brickDestroyEffect',
            frames: this.anims.generateFrameNumbers('brickExplosion', { start: 0, end: 5 }),
            frameRate: 10,
            hideOnComplete: true,
        });

        this.anims.create({
            key: 'strongBrickNormal',
            frames: [{ key: 'strongBrickSprite', frame: 0 }],
        });

        this.anims.create({
            key: 'strongBrickDamaged',
            frames: this.anims.generateFrameNumbers('strongBrickSprite', { start: 0, end: 3 }),
            frameRate: 10
        });
    }

    update() {
        this.#paddle.update();
        this.#ball.update(this.#paddle);
    }

    hitBrick(ball, brick) {
        brick.processHit(ball.getDamage(), this.decreaseUnbrokenBricksAmount.bind(this))
    }

    hitPaddle(ball, paddle) {
        ball.hitPaddle(paddle)
    }

    showLevelCompletePopup() {
        this.physics.pause();

        const popupYStart = this.scale.height + 300;

        const popup = this.add.rectangle(400, popupYStart, 600, 400, 0x000000, 0.8);
        popup.setStrokeStyle(4, 0xffffff);

        const popupText = this.add.text(400, popupYStart - 50, 'LEVEL COMPLETE', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5);

        const nextLevelButton = this.add.text(400, popupYStart + 50, this.#nextLevelKey ? 'TO THE NEXT LEVEL' : 'TO MAIN MENU', {
            fontSize: '20px',
            color: '#00ff00',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive();

        nextLevelButton.on('pointerdown', () => {
            if(this.#nextLevelKey) {
             this.scene.start(this.#nextLevelKey);
            } else {
                this.scene.start('MainMenuScene');
            }
        });

        this.tweens.add({
            targets: [popup, popupText, nextLevelButton],
            y: `-=${this.#centerPosition + 300}`,
            ease: 'Power2',
            duration: 500,
        });
    }

    destroyAllBricks() {
        this.#bricks.getChildren().forEach(child => this.decreaseUnbrokenBricksAmount());

    }
}
