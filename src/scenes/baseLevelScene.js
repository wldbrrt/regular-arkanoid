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
    }

    create() {
        this.physics.world.checkCollision.down = false

        this.#paddle = new Paddle(this, 400, 550, 'paddle');
        this.#ball = new Ball(this, 400, 530, 'ball');
        this.#bricks = new BricksGroup(this.#levelData, this).createBricksGroup()
        this.#unbrokenBricksAmount = this.#bricks.getChildren().length;

        this.physics.add.collider(this.#ball, this.#paddle, this.hitPaddle, undefined, this);
        this.physics.add.collider(this.#ball, this.#bricks, this.hitBrick, undefined, this);

        new Controls(this, this.#ball, this.#paddle).initControls()
    }

    update() {
        this.#paddle.update();
        this.#ball.update(this.#paddle);

        this.testUpdate()
    }

    hitBrick(ball, brick) {
        brick.processHit(ball.getDamage(), this.decreaseUnbrokenBricksAmount.bind(this))
    }

    hitPaddle(ball, paddle) {
        ball.hitPaddle(paddle)
    }

    showLevelCompletePopup() {
        this.physics.pause();

        const popup = this.add.rectangle(400, 300, 400, 200, 0x000000, 0.8);
        popup.setStrokeStyle(4, 0xffffff);

        this.add.text(400, 250, 'LEVEL COMPLETE', {
            fontSize: '24px',
            color: '#ffffff',
        }).setOrigin(0.5);

        const nextLevelButton = this.add.text(400, 320, this.#nextLevelKey ? 'TO THE NEXT LEVEL' : 'TO MAIN MENU', {
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
    }

    testUpdate() {

    }

    destroyAllBricks() {
        this.#bricks.getChildren().forEach(child => this.decreaseUnbrokenBricksAmount());

    }
}
