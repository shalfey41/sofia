/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

export default class Hero {
    constructor(queue) {
        this.player = new createjs.Bitmap(queue.getResult('hero'));
    }

    setReg() {
        this.player.regY = 15;
    }

    reset(posX, posY) {
        this.player.x = posX;
        this.player.y = posY;
    }
}
