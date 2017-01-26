/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

export default class Game {
    constructor() {
        this.TILE_WIDTH = 100;
        this.TILE_HEIGHT = 83;
        this.TILE_OFFSET_Y = 9;

        this.stage = new createjs.Stage('game');
        this.queue = new createjs.LoadQueue(false);
        queue.addEventListener('complete', init);
        queue.loadManifest([
            { id: 'hero', src: image.boy },
            { id: 'stone', src: image.stone },
            { id: 'grass', src: image.grass },
            { id: 'rock', src: image.rock },
            { id: 'scream', src: audio.scream },
            { id: 'background', src: audio.background },
            { id: 'waterSplash', src: audio.splash },
        ]);
    }
}
