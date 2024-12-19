import Phaser from "phaser";

export class Controls {
    #scene
    #ball
    #paddle

    constructor(scene, ball, paddle) {
        this.#scene = scene
        this.#ball = ball
        this.#paddle = paddle
    }

    initControls() {
        this.#scene.input.on('pointerdown', () => {
            // this.#ball.launch();
            this.#scene.getBall().launch();
        });
        this.#scene.input.on('pointermove',  pointer => {

            this.#paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.#ball.getData('onPaddle')) {
                this.#ball.x = this.#paddle.x;
            }

        }, this);

        return this
    }
}