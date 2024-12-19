import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../levels/levelData05.json"

export class LevelScene05 extends BaseLevelScene {
    constructor() {
        super('LevelScene05',levelData, null);
    }

    loadAssets() {
        this.load.image('lvl05Bg', 'assets/images/levelBg05.jpg');

    }

    createAssets() {
        this.add.image(this.scale.width / 2,  this.scale.height / 2, 'lvl05Bg').setOrigin(0.5);
        this.addBackgroundFilter()
    }
}