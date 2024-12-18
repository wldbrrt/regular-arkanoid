import Phaser from "phaser";

export class Paddle extends Phaser.Physics.Arcade.Sprite {
    #paddleSpeed = 500

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.body.allowGravity = false;

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    setPaddleSpeed(speed){
        this.#paddleSpeed = speed

        return this
    }

    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.#paddleSpeed);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.#paddleSpeed);
        } else {
            this.setVelocityX(0);
        }

        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        } else if (this.x > this.scene.scale.width - this.width / 2) {
            this.x = this.scene.scale.width - this.width / 2;
        }
    }
}
