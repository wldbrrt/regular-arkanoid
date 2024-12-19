import Phaser from "phaser";

/*
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
        this.#scene.input.on('pointerdown', (event) => {
            this.#scene.getBall().launch();
        });
        this.#scene.input.on('pointermove',  pointer => {

            if(this.#paddle){
                this.#paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            }

            if (this.#ball.getData('onPaddle')) {
                this.#ball.x = this.#paddle.x;
            }

        }, this);

        return this
    }
}*/

export class Controls {
    #scene;
    #ball;
    #paddle;

    constructor(scene, ball, paddle) {
        this.#scene = scene;
        this.#ball = ball;
        this.#paddle = paddle;
    }

    initControls() {
        this.#scene.input.on('pointerdown', this.#onPointerDown, this);
        this.#scene.input.on('pointermove', this.#onPointerMove, this);
        return this;
    }

    removeControls() {
        this.#scene.input.off('pointerdown', this.#onPointerDown, this);
        this.#scene.input.off('pointermove', this.#onPointerMove, this);
    }

    #onPointerDown(event) {
        this.#scene.getBall().launch();
    }

    #onPointerMove(pointer) {
        if (this.#paddle) {
            this.#paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
        }

        if (this.#ball.getData('onPaddle')) {
            this.#ball.x = this.#paddle.x;
        }
    }
}
