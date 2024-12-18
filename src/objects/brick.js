import Phaser from "phaser";

export class Brick extends Phaser.Physics.Arcade.Sprite {
    #hp
    #score
    #texture
    #powerUp

    constructor(scene, x, y, texture, hp, score, powerUp = null) {
        super(scene, x, y, texture);

        this.#hp = hp
        this.#score = score
        this.#texture = texture
        this.#powerUp = powerUp

        scene.add.existing(this);
    }

    getScore() {
        return this.#score
    }

    getHp() {
        return this.#hp
    }

    processHit(damage, decreaseBricksAmount, addPoints) {
        this.#hp -= damage;

        this.playEffects()

        if (this.#hp <= 0) {
            this.destroyBrick();
            decreaseBricksAmount()
            addPoints(this.#score)
        }

    }

    destroyBrick() {
        const effect = this.scene.add.sprite(this.x, this.y, 'brickExplosion');
        effect.play('brickDestroyEffect');

        this.scene.sound.play('brickBreakSound');

        this.destroy();

        if (this.#powerUp) {
            this.dropPowerUp()
        }
    }

    playEffects() {
        this.scene.sound.play('hitBrick', {
            rate: 1
        });
    }

    dropPowerUp() {
        this.#powerUp.dropPowerUp()
    }
}

export class StrongBrick extends Brick {
    #hp
    #score
    #texture

    constructor(scene, x, y, texture, hp, score) {
        super(scene, x, y, texture, hp, score);

        this.#hp = hp
        this.#score = score
        this.#texture = texture

        scene.add.existing(this);

        this.play('strongBrickNormal');
    }

    playEffects() {
        if (this.getHp() === 1) {
            this.play('strongBrickDamaged');
        }
        super.playEffects()
    }
}

export class UnbreakableBrick extends Brick {
    #hp
    #score
    #texture

    constructor(scene, x, y, texture, hp, score) {
        super(scene, x, y, texture, hp, score);

        this.#hp = hp
        this.#score = score
        this.#texture = texture

        scene.add.existing(this);
    }

    playEffects() {
        this.scene.sound.play('metalSound', {
            volume: 0.2,
            rate: 2
        });
    }
}
