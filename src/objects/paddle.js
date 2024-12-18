import Phaser from "phaser";

export class Paddle extends Phaser.Physics.Arcade.Sprite {
    #paddleSpeed = 500
    #leftEffect
    #centerEffect
    #rightEffect

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.body.allowGravity = false;

        this.playFireEffects()
    }

    setPaddleSpeed(speed){
        this.#paddleSpeed = speed

        return this
    }

    destroy() {
        super.destroy()
        this.#leftEffect.destroy()
        this.#centerEffect.destroy()
        this.#rightEffect.destroy()
    }

    update() {
        try{
            if (this.x < this.width / 2) {
                this.x = this.width / 2;
            } else if (this.x > this.scene.scale.width - this.width / 2) {
                this.x = this.scene.scale.width - this.width / 2;
            }

            this.updateFireEffects()
        } catch (err){}
    }

    playFireEffects() {
         this.#leftEffect = this.scene.add.sprite(this.x - 68, this.y + this.height + 0, 'engineFire');
        this.#centerEffect = this.scene.add.sprite(this.x, this.y + this.height + 5, 'engineFire');
        this.#rightEffect = this.scene.add.sprite(this.x + 68, this.y + this.height + 0, 'engineFire');

        this.#leftEffect.play('engineFire');
        this.#centerEffect.play('engineFire');
        this.#rightEffect.play('engineFire');

        this.#leftEffect.setAngle(35);
        this.#rightEffect.setAngle(-35);
    }

    updateFireEffects() {
        this.#leftEffect.setPosition(this.x - 68, this.y + this.height);
        this.#centerEffect.setPosition(this.x, this.y + this.height + 5);
        this.#rightEffect.setPosition(this.x + 68, this.y + this.height);
    }
}
