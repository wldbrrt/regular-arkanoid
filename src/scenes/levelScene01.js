import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData01.json"

export class LevelScene01 extends BaseLevelScene {
    constructor() {
        super('LevelScene01',levelData, 'LevelScene02');
    }
}