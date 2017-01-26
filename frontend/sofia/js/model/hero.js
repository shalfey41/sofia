/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

export default class Hero {
    constructor(imageId) {
        this.hero = new createjs.Bitmap(queue.getResult(imageId));
        this.hero.regY = 15;
    }
}
