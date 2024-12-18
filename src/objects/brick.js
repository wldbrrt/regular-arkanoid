import Phaser from "phaser";

export class Brick extends Phaser.Physics.Arcade.Sprite {
    #hp
    #score

    constructor(scene, x, y, texture, hp, score) {
        super(scene, x, y, texture);

        this.#hp = hp
        this.#score = score

        scene.add.existing(this);
    }

    getScore() {
        return this.#score
    }

    processHit(damage, decreaseBricksAmount) {
        this.#hp -= damage;
        if(this.#hp <= 0) {
            this.destroy();
            decreaseBricksAmount()
        }
    }

    destroyBrick() {
        this.destroy();
    }
}
