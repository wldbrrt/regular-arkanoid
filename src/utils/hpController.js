export class HpController {
    #hp;
    #maxHp;
    #hpText;
    #scene;

    static instance

    constructor(scene, initialHp = 3, maxHp = 3) {
        if (HpController.instance) {
            return HpController.instance;
        }

        this.#scene = scene;
        this.#hp = initialHp;
        this.#maxHp = maxHp;

        HpController.instance = this;
    }

    static getInstance(scene) {
        if (!HpController.instance) {
            HpController.instance = new HpController(scene);
        }
        return HpController.instance;
    }

    createHpInfo(scene) {
        this.#hpText = scene.add.text(
            20, 60,
            `Lives: ${this.#hp}`,
            { fontSize: '32px', color: '#FFFFFF' }
        ).setOrigin(0, 0);
    }

    decreaseHp(amount = 1, scene) {
        this.#hp -= amount;
        if (this.#hp < 0) this.#hp = 0;
        this.updateHpText();

        if (this.#hp === 0) {
            scene.showLevelCompletePopup(true);
        }
    }

    increaseHp(amount = 1, scene) {
        this.#hp += amount;
        if (this.#hp > this.#maxHp) this.#hp = this.#maxHp;
        this.updateHpText();
    }

    resetHp() {
        this.#hp = this.#maxHp;
        this.updateHpText();
    }

    updateHpText() {
        this.#hpText.setText(`HP: ${this.#hp}`);
    }

    getHp() {
        return this.#hp;
    }

}