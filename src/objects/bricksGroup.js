import {Brick, StrongBrick, UnbreakableBrick} from "./brick";

export class BricksGroup {
    #levelData
    #scene
    #bricksClasses = {
        normal: Brick,
        strong: StrongBrick,
        unbreakable: UnbreakableBrick,
    }

    constructor(levelData, scene) {
        this.#levelData = levelData
        this.#scene = scene
    }

    createBricksGroup() {
        const { startX, startY, brickWidth, brickHeight, schema, brickTypes } = this.#levelData;

        const bricksArray = schema.flatMap((row, rowIndex) => {
            return row.map((brickType, colIndex) => {
                if (brickType !== null) {
                    const x = startX + colIndex * brickWidth;
                    const y = startY + rowIndex * brickHeight;

                    const brickConfig = brickTypes[brickType];
                    if (brickConfig) {
                        // return new Brick(this.#scene, x, y, brickConfig.texture, brickConfig.hp, brickConfig.score);
                        return new this.#bricksClasses[brickType](this.#scene, x, y, brickConfig.texture, brickConfig.hp, brickConfig.score);
                    }
                }
                return null;
            })
        });

        this.bricks = this.#scene.physics.add.staticGroup(bricksArray);
        return this.bricks;
    }
}