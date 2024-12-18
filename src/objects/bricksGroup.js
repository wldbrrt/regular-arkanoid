import {Brick} from "./brick";

export class BricksGroup {
    #levelData
    #scene

    constructor(levelData, scene) {
        this.#levelData = levelData
        this.#scene = scene
    }

    /*createBricksGroup() {
        const bricksArray = []
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 10; col++) {
                const brickX = 80 + col * 70;
                const brickY = 100 + row * 40;
                const brick = new Brick(this.#scene, brickX, brickY, 'brick');
                bricksArray.push(brick)
            }
        }
        this.bricks = this.#scene.physics.add.staticGroup(bricksArray);

        return this.bricks
    }*/

    createBricksGroup() {
        const { startX, startY, brickWidth, brickHeight, schema, brickTypes } = this.#levelData;

        const bricksArray = schema.flatMap((row, rowIndex) => {
            return row.map((brickType, colIndex) => {
                if (brickType !== null) {
                    const x = startX + colIndex * brickWidth;
                    const y = startY + rowIndex * brickHeight;

                    const brickConfig = brickTypes[brickType];
                    if (brickConfig) {
                        return new Brick(this.#scene, x, y, brickConfig.texture, brickConfig.hp, brickConfig.score);
                    }
                }
                return null;
            })/*.filter(brick => brick !== null);*/
        });

        // Add bricks to a static group
        this.bricks = this.#scene.physics.add.staticGroup(bricksArray);
        return this.bricks;
    }
}