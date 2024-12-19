import {Brick, StrongBrick, UnbreakableBrick} from "./brick";
import {DamagePowerUp, FasterPowerUp, LifePowerUp, SlowerPowerUp, X2PowerUp, X3PowerUp} from "./powerUp";

export class BricksGroup {
    #levelData
    #paddle
    #scene
    #bricksClasses = {
        normal: Brick,
        strong: StrongBrick,
        unbreakable: UnbreakableBrick,
    }
    #powerUpClasses = {
        life: LifePowerUp,
        x2: X2PowerUp,
        x3: X3PowerUp,
        faster: FasterPowerUp,
        slower: SlowerPowerUp,
        damage: DamagePowerUp,
    }

    constructor(levelData, scene) {
        this.#levelData = levelData
        this.#scene = scene
    }

    createBricksGroup() {
        const { startX, startY, powerUps, brickWidth, brickHeight, schema, brickTypes } = this.#levelData;

        const bricksArray = schema.flatMap((row, rowIndex) => {
            return row.map((schemaItem, colIndex) => {
                const [brickType, powerUpType] = schemaItem.split('+')
                if (brickType !== null) {
                    const x = startX + colIndex * brickWidth;
                    const y = startY + rowIndex * brickHeight;

                    const brickConfig = brickTypes[brickType];
                    if (brickConfig) {
                        const powerUp = this.#powerUpClasses[powerUpType] ? new this.#powerUpClasses[powerUpType](this.#scene, x, y, powerUps[powerUpType]) : null

                        return new this.#bricksClasses[brickType](this.#scene, x, y, brickConfig.texture, brickConfig.hp, brickConfig.score, powerUp);
                    }
                }
                return null;
            })
        });

        this.bricks = this.#scene.physics.add.staticGroup(bricksArray);
        return this.bricks;
    }
}