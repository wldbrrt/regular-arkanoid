import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../levels/levelData01.json"

export class LevelScene01 extends BaseLevelScene {
    constructor() {
        super('LevelScene01',levelData, 'LevelScene02');
    }

    loadAssets() {
        this.load.image('lvl01Bg', 'assets/images/levelBg01.jpg');

    }

    createAssets() {
        this.add.image(this.scale.width / 2,  this.scale.height / 2, 'lvl01Bg').setOrigin(0.5);
        this.addBackgroundFilter()
    }
}