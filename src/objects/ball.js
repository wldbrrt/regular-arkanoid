import Phaser from "phaser";
import {BaseLevelScene} from "../scenes/baseLevelScene";
import {HpController} from "../utils/hpController";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    #initialVelocity = 600
    #maxVelocity = 1400
    #isLaunched = false
    #damage = 1
    #defaultDamage = 1
    #damageResetTimeout = null
    #scene
    #isDamageBoonOn = false

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.body.allowGravity = false;
        this.setMaxBallVelocity(this.#maxVelocity)
        this.play('ballNormal');

        this.#scene = scene;
    }

    isDamageBoonOn() {
        return this.#isDamageBoonOn;
    }

    setIsDamageBoonOn(value){
        this.#isDamageBoonOn = value;
    }

    resetDamageResetTimeout() {
        this.#damageResetTimeout = null;
    }

    clearBallTimeout() {
        if (this.#damageResetTimeout) {
            clearTimeout(this.#damageResetTimeout);
            this.#damageResetTimeout = null;
        }
    }

    applyDamageBoon(damage, timer) {
        this.clearBallTimeout()

        this.#damage = damage;
        try {
            this.play('ballStrong');
        } catch (e) {}
        this.#isDamageBoonOn = true

        this.#damageResetTimeout = setTimeout(() => this.resetBallToNormal(), timer);
    }

    resetBallToNormal() {
        this.#scene.getBallsGroup().forEach(ball => {
            ball.setDamage(this.#defaultDamage);
            try{
                ball.play('ballNormal');
            } catch(err) {}
            ball.setIsDamageBoonOn(false)
            ball.resetDamageResetTimeout()
        })
    }

    getDamage(){
        return this.#damage;
    }

    setDamage(value) {
        this.#damage = value;
        return this
    }

    getIsLaunched() {
        return this.#isLaunched
    }

    setIsLaunched(boolean) {
        this.#isLaunched = boolean

        return this
    }

    setMaxBallVelocity(maxVelocity) {
        return this.setMaxVelocity(maxVelocity, maxVelocity);
    }

    launch() {
        if (!this.#isLaunched) {
            this.#isLaunched = true;
            const randomX = Phaser.Math.Between(-200, 200);
            this.setVelocity(randomX, -this.#initialVelocity);
        }
    }

    update(paddle) {
        if (!this.#isLaunched) {
            this.x = paddle.x;
            this.y = paddle.y - paddle.height - 20;
        }

        if (this.y > this.#scene.scale.height) {
            this.handleFallingOff()
        }
    }

    handleFallingOff() {
        this.#scene.onBallFallingOff(this);
    }

    resetBall(paddle) {
        this.#isLaunched = false;
        this.setVelocity(0, 0);
        this.x = paddle.x;
        this.y = paddle.y - paddle.height - 20;

        this.resetBallToNormal()
        HpController.getInstance(this.#scene).decreaseHp(1, this.#scene)
    }

    processPaddleHit(paddle) {
        let diff = 0;

        if (this.x < paddle.x) {
            diff = paddle.x - this.x;
            this.setVelocityX(-5 * diff);
        } else if (this.x > paddle.x) {
            diff = this.x - paddle.x;
            this.setVelocityX(5 * diff);
        } else {
            this.setVelocityX(2 + Math.random() * 8);
        }
        this.setVelocityY(this.body.velocity.y - 30)

        this.#scene.sound.play('hitPaddle', {
            rate: 2
        });
    }
}
