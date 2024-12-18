import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData05.json"

export class LevelScene05 extends BaseLevelScene {
    constructor() {
        super('LevelScene05',levelData, null);
    }
}