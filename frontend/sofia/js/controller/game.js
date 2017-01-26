/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

export default class Game {
    constructor(stage, hero, background) {
        this.stage = stage;
        this.hero = hero;
        this.background = background;
    }

    play() {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        createjs.Ticker.addEventListener('tick', this.onTick.bind(this));

        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onTick() {
        // moveRocks();

        // if (isColision()) {
        //     rocks.forEach(rock => resetRock(rock));
        //     resetHero();

        // level = 0;
        // setLevelText(level);
        // }

        // if (hero.y === 0) {
        //     setLevelText(level += 1);
        // }

        this.stage.update();
    }

    onKeyDown(e) {
        const key = e.keyCode;

        const ACTIONS = {
            37: 'left',
            38: 'top',
            39: 'right',
            40: 'down',
        };

        if (!Object.keys(ACTIONS).some(action => +action === key)) return;

        // getter x
        let newX = this.hero.player.x;

        switch (ACTIONS[key]) {
            case 'left': {
                newX -= this.background.TILE_WIDTH;
                break;
            }
            case 'right': {
                newX += this.background.TILE_WIDTH;
                break;
            }
            default: {
                break;
            }
        }

        if (newX < 0 || newX > this.background.TILE_WIDTH * 6) return;

        // setter x
        this.hero.player.x = newX;
    }
}
