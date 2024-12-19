export class HpController {
    #hp;
    #maxHp;
    #hpText;
    #scene;

    constructor(scene, initialHp = 3, maxHp = 3) {
        this.#scene = scene;
        this.#hp = initialHp;
        this.#maxHp = maxHp;

        this.#hpText = this.#scene.add.text(
            this.#scene.scale.width -20, 20,
            `HP: ${this.#hp}`,
            { fontSize: '32px', color: '#FFFFFF' }
        ).setOrigin(1, 0);
    }

    decreaseHp(amount = 1) {
        this.#hp -= amount;
        if (this.#hp < 0) this.#hp = 0;
        this.updateHpText();

        if (this.#hp === 0) {
            this.#scene.showLevelCompletePopup(true);
        }
    }

    increaseHp(amount = 1) {
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