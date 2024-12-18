import Phaser from "phaser";
import {Paddle} from '../objects/Paddle.js';
import {Ball} from '../objects/Ball.js';
import {Controls} from "../utils/controlls";
import {BricksGroup} from "../objects/bricksGroup";
import levelData from "../../assets/data/levels/levelData01.json"

export class Level1Scene extends Phaser.Scene {
    #ball
    #paddle
    #bricks
    #levelData

    constructor() {
        super({key: 'Level1Scene'});

        this.#levelData = levelData
    }

    preload() {
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('brick', 'assets/images/brick.png');
    }

    create() {
        this.physics.world.checkCollision.down = false

        this.#paddle = new Paddle(this, 400, 550, 'paddle');
        this.#ball = new Ball(this, 400, 530, 'ball');
        this.#bricks = new BricksGroup(this.#levelData, this).createBricksGroup()


        this.physics.add.collider(this.#ball, this.#paddle, this.hitPaddle, undefined, this);
        this.physics.add.collider(this.#ball, this.#bricks, this.hitBrick, undefined, this);

        new Controls(this, this.#ball, this.#paddle).initControls()
    }

    update() {
        this.#paddle.update();
        this.#ball.update(this.#paddle);
    }

    hitBrick(ball, brick) {
        brick.processHit(ball.getDamage())
    }

    hitPaddle(ball, paddle) {
        ball.hitPaddle(paddle)
    }
}
