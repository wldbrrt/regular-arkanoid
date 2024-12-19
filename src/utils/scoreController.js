export class ScoreController {
    #score = 0;
    #scoreText;

    constructor(scene) {
        this.#scoreText = scene.add.text(
            20, 20,
            `Score: ${this.#score}`,
            { fontSize: '32px', color: '#FFFFFF' }
        ).setOrigin(0, 0);
    }

    addPoints(points) {
        this.#score += points;
        this.updateScoreText();
    }

    updateScoreText() {
        this.#scoreText.setText(`Score: ${this.#score}`);
    }

    getScore() {
        return this.#score;
    }
}