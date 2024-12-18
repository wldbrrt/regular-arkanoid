import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData03.json"

export class LevelScene03 extends BaseLevelScene {
    constructor() {
        super('LevelScene03',levelData, 'LevelScene04');
    }
}