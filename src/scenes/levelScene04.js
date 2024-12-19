import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../levels/levelData04.json"

export class LevelScene04 extends BaseLevelScene {
    constructor() {
        super('LevelScene04',levelData, 'LevelScene05');
    }

    loadAssets() {
        this.load.image('lvl04Bg', 'assets/images/levelBg04.jpg');

    }

    createAssets() {
        this.add.image(this.scale.width / 2,  this.scale.height / 2, 'lvl04Bg').setOrigin(0.5);
        this.addBackgroundFilter()
    }
}