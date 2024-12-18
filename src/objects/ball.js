import Phaser from "phaser";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    #initialVelocity = 400
    #maxVelocity = 1200
    #isLaunched = false
    #damage = 1

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.body.allowGravity = false;
        this.setMaxBallVelocity(this.#maxVelocity)

        this.scene = scene;
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
            // Launch the ball in a random upward direction
            const randomX = Phaser.Math.Between(-200, 200);
            this.setVelocity(randomX, -this.#initialVelocity);
        }
    }

    update(paddle) {
        if (!this.#isLaunched) {
            this.x = paddle.x;
            this.y = paddle.y - paddle.height;
        }

        if (this.y > this.scene.scale.height) {
            this.resetBall(paddle);
        }
    }

    resetBall(paddle) {
        this.#isLaunched = false;
        this.setVelocity(0, 0);
        this.x = paddle.x;
        this.y = paddle.y - paddle.height;
    }

    hitPaddle(paddle) {
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
    }
}
