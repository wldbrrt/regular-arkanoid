import Phaser from "phaser";
import {Ball} from "./ball";
import {HpController} from "../utils/hpController";

export class PowerUp extends Phaser.Physics.Arcade.Sprite {
    #texture
    #scene
    #paddle
    #initialVelocity = 400

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#texture = texture
        this.#scene = scene
        this.#paddle = scene.getPaddle()

        scene.physics.add.existing(this);
    }

    dropPowerUp() {
        this.#scene.add.existing(this);
        this.#scene.physics.add.collider(this, this.#paddle, this.collect, undefined, this);
        this.setVelocity(0, this.#initialVelocity);
    }

    collect() {
        this.applyEffect()
        this.destroy()
        this.#scene.sound.play('powerUpCollect');
    }


    applyEffect() {
    }
}

export class LifePowerUp extends PowerUp {
    #scene

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        HpController.getInstance(this.#scene).increaseHp()
    }
}

export class X2PowerUp extends PowerUp {
    #scene

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        this.createAdditionalBall(100)
    }

    createAdditionalBall(additionalVelocity) {
        const originalBall = this.#scene.getBall()
        if(!originalBall.getIsLaunched()){
            originalBall.launch()
        }

        let velocityX = originalBall.body.velocity.x
        let velocityY = originalBall.body.velocity.y

        const newBall = new Ball(this.#scene, originalBall.x, originalBall.y, originalBall.texture).setIsLaunched(true)
        if(originalBall.isDamageBoonOn()){
            newBall.applyDamageBoon(2, 15000)
        }
        velocityX += additionalVelocity
        newBall.setVelocity(velocityX, velocityY)
        this.#scene.addBallToGroup(newBall)

        this.#scene.physics.add.collider(newBall, this.#scene.getPaddle(), this.#scene.hitPaddle.bind(this.#scene), undefined, this);
        this.#scene.physics.add.collider(newBall, this.#scene.getBricks(), this.#scene.hitBrick.bind(this.#scene), undefined, this);
    }
}

export class X3PowerUp extends X2PowerUp {
    #scene

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        this.createAdditionalBall(-100)
        this.createAdditionalBall(100)
    }
}

export class FasterPowerUp extends PowerUp {
    #scene
    #velocityModifier = 1400

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        this.#scene.getBallsGroup().forEach(ball => {
            if(ball.body.velocity.y < 0){
                ball.setVelocityY(-this.#velocityModifier)
            }
            if(ball.body.velocity.y > 0){
                ball.setVelocityY(this.#velocityModifier)
            }

        })
    }
}

export class SlowerPowerUp extends PowerUp {
    #scene
    #velocityModifier = 400

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        this.#scene.getBallsGroup().forEach(ball => {
            if(ball.body.velocity.y < 0){
                ball.setVelocityY(-this.#velocityModifier)
            }
            if(ball.body.velocity.y > 0){
                ball.setVelocityY(this.#velocityModifier)
            }

        })
    }
}

export class DamagePowerUp extends PowerUp {
    #scene
    #damageAmount = 2
    #boonTime = 15000

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.#scene = scene
    }

    applyEffect() {
        this.#scene.getBallsGroup().forEach(ball => ball.applyDamageBoon(this.#damageAmount, this.#boonTime))
    }
}