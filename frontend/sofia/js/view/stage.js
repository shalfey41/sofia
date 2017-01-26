/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

import * as image from '../../images';
import * as audio from '../../audio';

import Background from '../model/background';
import Hero from '../model/hero';
import Game from '../controller/game';

export default class Stage {
    render() {
        this.stage = new createjs.Stage('game');
        this.queue = new createjs.LoadQueue(false);
        this.queue.addEventListener('complete', this.init.bind(this));
        this.queue.loadManifest([
            { id: 'hero', src: image.boy },
            { id: 'stone', src: image.stone },
            { id: 'grass', src: image.grass },
            { id: 'rock', src: image.rock },
            { id: 'scream', src: audio.scream },
            { id: 'background', src: audio.background },
            { id: 'waterSplash', src: audio.splash },
        ]);
    }

    init() {
        const background = new Background(this.queue);
        background.createBackground(this.stage);

        const hero = new Hero(this.queue);
        hero.setReg();
        hero.reset(background.TILE_WIDTH * 3, background.TILE_HEIGHT * 5);
        this.stage.addChild(hero.player);

        const game = new Game(this.stage, hero, background);
        game.play();
    }
}
