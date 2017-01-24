/**
 * Created by Dmitry Bezugly <bezugly.ru> on 24.01.2017.
 */

import './lib/createjs';

import * as image from './images';
import * as audio from './audio';

const TILE_WIDTH = 100;
const TILE_HEIGHT = 83;
const TILE_OFFSET_Y = 9;
const ACTIONS = {
    37: 'left',
    38: 'top',
    39: 'right',
    40: 'down',
};

let level = 0;
let levelText = null;
let timerText = null;
let counter = 10;

const stage = new createjs.Stage('game');
const queue = new createjs.LoadQueue(false);
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

const rocks = [];

let hero = null;

function resetHero() {
    hero.x = TILE_WIDTH * 3;
    hero.y = TILE_HEIGHT * 5;
}

function resetRock(rock) {
    rock.x = Math.floor(Math.random() * 8) * TILE_HEIGHT;
    rock.y = -TILE_HEIGHT;
    rock.speed = (Math.random() * 3) + 1;
}

function createRock() {
    const rock = new createjs.Bitmap(queue.getResult('rock'));
    stage.addChild(rock);

    rocks.push(rock);

    resetRock(rock);
}

function createHero() {
    hero = new createjs.Bitmap(queue.getResult('hero'));
    resetHero();

    hero.regY = 15;

    stage.addChild(hero);
}

function createTile(type, i, j) {
    const tile = new createjs.Bitmap(queue.getResult(type));

    tile.x = j * TILE_WIDTH;
    tile.y = (i * TILE_HEIGHT) - TILE_OFFSET_Y;

    stage.addChild(tile);
}

function createBackground() {
    for (let i = 0; i < 6; i += 1) {
        let type = 'stone';

        if (i === 5) type = 'grass';

        for (let j = 0; j < 7; j += 1) {
            createTile(type, i, j);
        }
    }
}

function setTimer() {
    const id = setInterval(() => {
        counter -= 1;

        timerText.text = `Осталось ${counter}`;

        if (counter === 0) {
            level += 1;
            clearInterval(id);
            setTimer();
        }
    }, 1000);
}

function setLevelText(level) {
    levelText.text = `Уровень ${level}`;
}

function isColision() {
    return rocks.some(rock => {
        return rock.y > hero.y - TILE_HEIGHT &&
            hero.x < rock.x + (TILE_WIDTH * 0.75) &&
            rock.y < hero.y &&
            rock.x < hero.x + (TILE_WIDTH * 0.75);
    });
}

function moveRocks() {
    rocks.forEach(rock => {
        rock.y += rock.speed * (1 + (level * 0.1));

        if (rock.y > TILE_HEIGHT * 6) resetRock(rock);
    });
}

function onTick() {
    moveRocks();

    if (isColision()) {
        rocks.forEach(rock => resetRock(rock));
        resetHero();

        level = 0;
        setLevelText(level);
    }

    if (hero.y === 0) {
        setLevelText(level += 1);
    }

    stage.update();
}

function init() {
    createBackground();
    createHero();

    for (let i = 0; i < 4; i += 1) {
        createRock();
    }
    levelText = new createjs.Text(`Уровень: ${level}`, '35px Georgia', '#000');

    stage.addChild(levelText);

    timerText = new createjs.Text(`Таймер: ${counter}`, '35px Georgia', '#000');
    timerText.x = TILE_WIDTH * 2;
    stage.addChild(timerText);
    setTimer();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;

    createjs.Ticker.addEventListener('tick', onTick);

    createjs.Sound.play('background', { loop: -1 });
}

const onKeyDown = (e) => {
    let newX = hero.x;

    switch (ACTIONS[e.keyCode]) {
        case 'left': {
            newX -= TILE_WIDTH;
            break;
        }
        case 'right': {
            newX += TILE_WIDTH;
            break;
        }
        default: {
            break;
        }
    }

    if (newX < 0 || newX > TILE_WIDTH * 6) return;

    hero.x = newX;
};

window.addEventListener('keydown', onKeyDown);
