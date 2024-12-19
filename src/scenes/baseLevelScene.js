import Phaser from "phaser";
import {Paddle} from '../objects/Paddle.js';
import {Ball} from '../objects/Ball.js';
import {Controls} from "../utils/controlls";
import {BricksGroup} from "../objects/bricksGroup";
import {ButtonsBuilder} from "../utils/buttonsBuilder";
import {ScoreController} from "../utils/scoreController";
import {HpController} from "../utils/hpController";
import {VolumeController} from "../utils/volumeController";

export class BaseLevelScene extends Phaser.Scene {
    #ball
    #ballsGroup = []
    #paddle
    #bricks
    #levelData
    #nextLevelKey
    #unbrokenBricksAmount
    #centerPosition
    #scoreController
    #hpController
    #controlls

    constructor(levelKey, levelData, nextLevelKey) {
        super({key: levelKey});

        this.#levelData = levelData;
        this.#nextLevelKey = nextLevelKey
    }

    decreaseUnbrokenBricksAmount() {
        this.#unbrokenBricksAmount -= 1;

        if (this.#unbrokenBricksAmount <= 0) {
            this.showLevelCompletePopup(false);
        }
    }

    preload() {

        this.loadAssets()
    }

    create() {
        this.createAnimations()
        this.createAssets()
        this.#centerPosition = this.scale.height / 2

        this.physics.world.checkCollision.down = false

        this.#paddle = new Paddle(this, 400, 1280, 'paddle');
        this.#ball = new Ball(this, 400, 530, 'ball');
        this.#ballsGroup = []
        this.addBallToGroup(this.#ball)
        this.#bricks = new BricksGroup(this.#levelData, this,).createBricksGroup()
        this.#unbrokenBricksAmount = this.#bricks.getChildren().length;

        this.physics.add.collider(this.#ball, this.#paddle, this.hitPaddle, undefined, this);
        this.physics.add.collider(this.#ball, this.#bricks, this.hitBrick, undefined, this);

        HpController.getInstance(this).createHpInfo(this);
        this.#scoreController = new ScoreController(this);
        this.#controlls = new Controls(this, this.#ball, this.#paddle).initControls()
        VolumeController.getInstance(this).createControlButton(this);


        //////////////////////
        const killBricks = this.add.text(100, 100, 'kill', {
            fontSize: '20px',
            color: '#00ff00',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive();

        killBricks.on('pointerdown', (pointer, localX, localY, event) => {
            event.stopPropagation()
            this.destroyAllBricks()
        });
        /////////////////////
    }

    createAnimations() {
        if (!this.anims.exists('brickDestroyEffect')) {
            this.anims.create({
                key: 'brickDestroyEffect',
                frames: this.anims.generateFrameNumbers('brickExplosion', {start: 0, end: 5}),
                frameRate: 20,
                hideOnComplete: true,
            });
        }

        if (!this.anims.exists('strongBrickNormal')) {
            this.anims.create({
                key: 'strongBrickNormal',
                frames: [{key: 'strongBrickSprite', frame: 0}],
            });
        }

        if (!this.anims.exists('strongBrickDamaged')) {
            this.anims.create({
                key: 'strongBrickDamaged',
                frames: this.anims.generateFrameNumbers('strongBrickSprite', {start: 0, end: 3}),
                frameRate: 10
            });
        }

        if (!this.anims.exists('engineFire')) {
            this.anims.create({
                key: 'engineFire',
                frames: this.anims.generateFrameNumbers('engineFire', {start: 0, end: 3}),
                frameRate: 20,
                repeat: -1
            });
        }

        if (!this.anims.exists('ballNormal')) {
            this.anims.create({
                key: 'ballNormal',
                frames: [{key: 'ballSprite', frame: 0}],
            });
        }
        if (!this.anims.exists('ballStrong')) {
            this.anims.create({
                key: 'ballStrong',
                frames: [{key: 'ballSprite', frame: 1}],
            });
        }
    }

    update() {
        this.#paddle.update();
        this.#ballsGroup.forEach(ball => ball.update(this.#paddle))
    }

    hitBrick(ball, brick) {
        brick.processHit(ball.getDamage(), this.decreaseUnbrokenBricksAmount.bind(this), this.#scoreController.addPoints.bind(this.#scoreController))
    }

    hitPaddle(ball, paddle) {
        ball.processPaddleHit(paddle)
    }

    onBallFallingOff(ball) {
        const index = this.#ballsGroup.indexOf(ball);
        if (index > -1) {
            this.#ballsGroup.splice(index, 1);
        }

        if (this.#ballsGroup.length > 0) {
            ball.clearBallTimeout()
            ball.destroy();
            this.#ball = this.#ballsGroup[0];
        } else {
            this.addBallToGroup(ball);
            ball.resetBall(this.#paddle);
            this.#ball = ball;
        }
    }

    restartScene() {
        this.#ballsGroup.forEach(ball => ball.destroy());
        this.#paddle.destroy();
        this.#bricks.clear(true, true);
        this.#ballsGroup = [];
        this.#paddle = null;
        this.#bricks = null;

        this.scene.restart();
    }

    showLevelCompletePopup(isGameOver) {
        this.physics.pause();
        this.#ballsGroup.forEach(ball => ball.destroy())
        this.#paddle.destroy()

        this.#controlls.removeControls()

        if(isGameOver) {
            this.sound.play('gameOver', {
                volume: 0.5
            });
        } else {
            this.sound.play('levelComplete', {
                volume: 0.5
            });
        }

        const popupYStart = this.scale.height + 300;

        const popup = isGameOver
            ? this.add.image(this.scale.width / 2,  popupYStart, 'gameOverPopup').setOrigin(0.5)
            : this.add.image(this.scale.width / 2,  popupYStart, 'winPopup').setOrigin(0.5);

        const nextLevelButton = ButtonsBuilder.createButton(
            this.scale.width / 2,
            popupYStart + 50,
            502,
            120,
            'Next Level',
            0x149DF2,
            0x149DF2,
            this
        );

        nextLevelButton.on('pointerdown', () => {
             this.scene.start(this.#nextLevelKey);
        });

        if(isGameOver || !this.#nextLevelKey) {
            nextLevelButton.destroy()
        }

        const homeButton = ButtonsBuilder.createIconButton(
            this.scale.width / 2 - 100,
            popupYStart +200,
            120,
            'homeIcon',
            0x149DF2,
            0x149DF2,
            this
        );

        homeButton.on('pointerdown', () => {
            HpController.getInstance(this).resetHp()
            this.restartScene()
            this.scene.start('MainMenuScene');
        });

        const replayButton = ButtonsBuilder.createIconButton(
            this.scale.width / 2 + 100,
            popupYStart +200,
            120,
            'replayIcon',
            0x149DF2,
            0x149DF2,
            this
        );

        replayButton.on('pointerdown', (pointer, localX, localY, event) => {
            event.stopPropagation();
            HpController.getInstance(this).resetHp()
            this.restartScene()
        });

        this.tweens.add({
            targets: [popup, homeButton, nextLevelButton, replayButton],
            y: `-=${this.#centerPosition + 300}`,
            ease: 'Power2',
            duration: 500,
        });
    }

    addBackgroundFilter() {
        const blackOverlay = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.5
        );
    }

    addBallToGroup(ball) {
        this.#ballsGroup.push(ball);
        return this
    }

    destroyAllBricks() {
        this.#bricks.getChildren().forEach(child => this.decreaseUnbrokenBricksAmount());

    }

    getPaddle() {
        return this.#paddle;
    }

    getBall() {
        return this.#ball;
    }

    getBricks() {
        return this.#bricks
    }

    getBallsGroup() {
        return this.#ballsGroup
    }

    getHpController() {
        return this.#hpController
    }

    loadAssets() {
    }

    createAssets() {
    }
}
