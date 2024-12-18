import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData04.json"

export class LevelScene04 extends BaseLevelScene {
    constructor() {
        super('LevelScene04',levelData, 'LevelScene05');
    }
}