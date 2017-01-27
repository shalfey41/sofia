/**
 * Created by Dmitry Bezugly on 26.01.2017.
 */

/**
 * Счет игры
 */
export default class Level {
    constructor() {
        this.levelNumber = 1;
        this.counter = 10;

        this.level = new createjs.Text(`Уровень: ${this.levelNumber}`, '30px Arial', '#000');
        this.timer = new createjs.Text(`Осталось: ${this.counter}`, '30px Arial', '#000');

        this.initializeTimer();
    }

    /**
     * Запуск таймера.
     * Когда таймер равен нулю, увеличивает уровень и перезапускает таймер
     */
    initializeTimer() {
        const timer = setInterval(() => {
            if (this.counter === 0) {
                clearInterval(timer);

                this.levelUp();

                this.initializeTimer();
            } else {
                this.time = this.counter - 1;
            }
        }, 1000);
    }

    /**
     * Увеличение уровня
     */
    levelUp() {
        this.levelNumber += 1;
        this.setLevelText();

        this.time = 10 + (this.levelNumber * 2);
    }

    /**
     * Установка уровня к нулю
     */
    resetLevel() {
        this.levelNumber = 1;
        this.setLevelText();

        this.time = 10;
    }

    /**
     * Запись текста таймера
     */
    setTimerText() {
        this.timer.text = `Осталось: ${this.counter}`;
    }

    /**
     * Запись текста уровня
     */
    setLevelText() {
        this.level.text = `Уровень: ${this.levelNumber}`;
    }

    /**
     * Устанавливает начальную позицию уровня
     * и возвращает объект
     *
     * @returns {createjs.Text}
     */
    get levelPosition() {
        this.level.x = 20;
        this.level.y = 20;

        return this.level;
    }

    /**
     * Устанавливает начальную позицию таймера
     * и возвращает объект
     *
     * @returns {createjs.Text}
     */
    get timerPosition() {
        this.timer.x = 200;
        this.timer.y = 20;

        return this.timer;
    }

    /**
     * Установка оставшегося времени
     * и обновление текста
     *
     * @param {Number} value - новое значение
     */
    set time(value) {
        this.counter = value;
        this.setTimerText();
    }
}
