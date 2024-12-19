import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData03.json"

export class LevelScene03 extends BaseLevelScene {
    constructor() {
        super('LevelScene03',levelData, 'LevelScene04');
    }

    loadAssets() {
        this.load.image('lvl03Bg', 'assets/images/levelBg03.jpg');

    }

    createAssets() {
        this.add.image(this.scale.width / 2,  this.scale.height / 2, 'lvl03Bg').setOrigin(0.5);
        this.addBackgroundFilter()
    }
}