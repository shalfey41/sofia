/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

import * as image from '../../images';
import * as audio from '../../audio';

import Background from '../model/background';
import Hero from '../model/hero';
import Enemy from '../model/enemy';
import GameCounter from '../model/game-counter';

/**
 * Сцена игры
 */
export default class Stage {
    /**
     * Создание сцены
     * Когда файлы загрузятся, сработает функция render
     */
    initialize() {
        this.stage = new createjs.Stage('game');
        this.queue = new createjs.LoadQueue(false);
        this.queue.addEventListener('complete', this.render.bind(this));
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

    /**
     * Рендер элементов на сцене
     */
    render() {
        this.background = new Background(this.queue);
        this.background.createBackground(this.stage);

        this.hero = new Hero(this.queue, this.background.tileSize);
        this.stage.addChild(this.hero.player);

        this.rocks = new Enemy(4, this.stage, this.queue);
        this.rocks.resetAll(this.background.tileSize);

        this.gameCounter = new GameCounter();
        this.stage.addChild(this.gameCounter.levelPosition);
        this.stage.addChild(this.gameCounter.timerPosition);

        createjs.Sound.play('background', { loop: -1 });

        this.setEvents();
    }

    /**
     * Подписка на события
     */
    setEvents() {
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', this.onTick.bind(this));

        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    /**
     * Обновляет сцену
     */
    onTick() {
        this.rocks.move(this.background.tileSize, this.gameCounter.levelNumber);

        this.checkCollision();

        this.stage.update();
    }

    /**
     * Обработчик клавиатуры
     *
     * @param e - нажатый элемент
     */
    onKeyDown(e) {
        this.hero.move(e.keyCode, this.background.tileSize);
    }

    /**
     * Перезапуск игры, если герой столкнулся с препятсвием
     */
    checkCollision() {
        if (this.isCollision()) {
            this.rocks.resetAll(this.background.tileSize);
            this.hero.reset();
            this.gameCounter.resetLevel();
        }
    }

    /**
     * Проверка на столкновение героя и препятствий
     */
    isCollision() {
        const heroX = this.hero.positionX;
        const heroY = this.hero.positionY;
        const tile = this.background.tileSize;

        return this.rocks.enemies.some((rock) => {
            return rock.y > heroY - tile.height &&
                heroX < rock.x + (tile.width * 0.75) &&
                rock.y < heroY &&
                rock.x < heroX + (tile.width * 0.75);
        });
    }
}
