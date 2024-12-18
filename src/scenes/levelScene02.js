import {BaseLevelScene} from "./baseLevelScene";
import levelData from "../../assets/data/levels/levelData02.json"

export class LevelScene02 extends BaseLevelScene {
    constructor() {
        super('LevelScene02', levelData, 'LevelScene03');
    }
}