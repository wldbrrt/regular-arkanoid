import Phaser from "phaser";

export class Brick extends Phaser.Physics.Arcade.Sprite {
    #hp
    #score

    constructor(scene, x, y, texture, hp, score) {
        super(scene, x, y, texture);

        this.#hp = hp
        this.#score = score

        // Add the brick to the scene and enable physics
        scene.add.existing(this);
        // scene.physics.add.existing(this);

        // Brick settings
        // this.setImmovable(true); // Bricks don't move
        // this.body.allowGravity = false; // Ignore gravity
    }

    getScore() {
        return this.#score
    }

    processHit(damage) {
        this.#hp -= damage;
        if(this.#hp <= 0) {
            this.destroy();
        }
    }

    destroyBrick() {
        this.destroy(); // Remove the brick from the scene
    }
}
