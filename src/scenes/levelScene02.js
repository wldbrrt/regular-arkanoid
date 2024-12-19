import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData02.json"

export class LevelScene02 extends BaseLevelScene {
    constructor() {
        super('LevelScene02', levelData, 'LevelScene03');
    }

    loadAssets() {
        this.load.image('lvl02Bg', 'assets/images/levelBg02.jpg');

    }

    createAssets() {
        this.add.image(this.scale.width / 2,  this.scale.height / 2, 'lvl02Bg').setOrigin(0.5);
        this.addBackgroundFilter()
    }
}