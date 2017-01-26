/**
 * Created by Dmitry Bezugly <bezugly.ru> on 26.01.2017.
 */

export default class Background {
    constructor(queue) {
        this.TILE_WIDTH = 100;
        this.TILE_HEIGHT = 83;
        this.TILE_OFFSET_Y = 9;

        this.queue = queue;
    }

    createBackground(stage) {
        for (let i = 0; i < 6; i += 1) {
            let type = 'stone';

            if (i === 5) type = 'grass';

            for (let j = 0; j < 7; j += 1) {
                stage.addChild(this.createTile(type, i, j));
            }
        }
    }

    createTile(type, i, j) {
        const tile = new createjs.Bitmap(this.queue.getResult(type));

        tile.x = j * this.TILE_WIDTH;
        tile.y = (i * this.TILE_HEIGHT) - this.TILE_OFFSET_Y;

        return tile;
    }
}
