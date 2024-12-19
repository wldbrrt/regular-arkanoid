import Phaser from "phaser";

export class Controls {
    #scene;
    #ball;
    #paddle;
    #isMobile;

    constructor(scene, ball, paddle) {
        this.#scene = scene;
        this.#ball = ball;
        this.#paddle = paddle;
        this.#isMobile = !this.#scene.sys.game.device.os.desktop;
    }

    initControls() {
        if (this.#isMobile) {
            this.initMobileControls();
        } else {
            this.initDesktopControls();
        }
        return this;
    }

    removeControls() {
        if (this.#isMobile) {
            this.removeMobileControls();
        } else {
            this.removeDesktopControls();
        }
    }

    initDesktopControls() {
        this.#scene.input.on('pointerdown', this.onPointerDown, this);
        this.#scene.input.on('pointermove', this.onPointerMove, this);
    }

    removeDesktopControls() {
        this.#scene.input.off('pointerdown', this.onPointerDown, this);
        this.#scene.input.off('pointermove', this.onPointerMove, this);
    }

    onPointerDown(event) {
        this.#scene.getBall().launch();
    }

    onPointerMove(pointer) {
        if (this.#paddle) {
            this.#paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
        }

        if (this.#ball.getData('onPaddle')) {
            this.#ball.x = this.#paddle.x;
        }
    }

    initMobileControls() {
        this.#scene.input.on('pointerdown', this.onMobilePointerDown, this);
        this.#scene.input.on('pointerup', this.onMobilePointerUp, this);
    }

    removeMobileControls() {
        this.#scene.input.off('pointerdown', this.onMobilePointerDown, this);
        this.#scene.input.off('pointerup', this.onMobilePointerUp, this);
    }

    onMobilePointerDown(pointer) {
        const screenCenter = this.#scene.scale.width / 2;

        if(this.#scene.getBall() && !this.#scene.getBall().getIsLaunched()) {
            this.#scene.getBall().launch()
        }

        if (pointer.x < screenCenter) {
            this.#paddle.setVelocityX(-500)
        } else {
            this.#paddle.setVelocityX(500)
        }
    }

    onMobilePointerUp() {
        this.#paddle.setVelocityX(0)
    }
}

