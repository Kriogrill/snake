/* Задание
 *
 * 1. Добавить управление
 * 2. Каждая из сторон при пресечении должна перемещать на противоположенную
 * 3. Добавить рандомное появление еды (подсказка: надо навешивать на ячейки класс food)
 * 4. Размер змейки должен увеличиваться
 * 5*. Научиться увеличивать сокрость игры при увеличении количества очков
 * 6**. Придумать новую фичу и реализовать
 * 
 */

var snakeGame = (function () {
    //Константы оформляются в особом стиле
    const WIDTH = 10;
    const HEIGHT = 10;

    let headX = 0;
    let headY = 0;
    let dx = 1;
    let dy = 0;
    let currentStep = 1;
    let foodCounter = 0;


    let playStep = (direction) => {
        dx = (direction - 38) % 2;
        dy = (direction - 39) % 2;
        headX = (WIDTH - 1) * (WIDTH - (headX + dx)) % WIDTH;
        headY = (HEIGHT - 1) * (HEIGHT - (headY + dy)) % HEIGHT;
        let newHeadCell = getCell(headX, headY);
        let newFoodCell = getCell(Math.ceil(Math.random() * WIDTH), Math.ceil(Math.random() * HEIGHT));

        removeSnakeCells();
        addSnakeToCell(newHeadCell);
        removeFoodCells();
        addFoodToCell(newFoodCell);
        setCellStep(newHeadCell, currentStep);

        currentStep++;
        return true;
    }

    let removeFoodCells = () => {
        for (let foodCell of document.getElementsByClassName('food snake')) {
            removeFoodFromCell(foodCell);
            foodCounter--;
        }
    }

    let getCellClass = (cell) => {
        return cell.className;
    }

    let removeFoodFromCell = cell => {
        cell.className = cell.className.replace('food', '');
    }

    let getFoodCells = () => {
        // Можно находить элементы DOM по классу
        return document.getElementsByClassName('food');
    }

    let addFoodToCell = cell => {
        if (foodCounter == 0 && cell.className == '') {
            cell.className += ' food';
            foodCounter++;
        }
    }

    let removeSnakeCells = () => {
        for (let snakeCell of getSnakeCells())
            removeSnakeFromCell(snakeCell);
    }

    let getCell = (x, y) => {
        // Можно находить элементы DOM по id
        return document.getElementById(y + '_' + x);
    }

    let getSnakeCells = () => {
        // Можно находить элементы DOM по классу
        return document.getElementsByClassName('snake');
    }

    let addSnakeToCell = cell => {
        // Строчка className может включать несколько классов, например "class1 class2".
        // Поэтому добавляем пробел.
        cell.className += ' snake';
    }

    let removeSnakeFromCell = cell => {
        cell.className = cell.className.replace('snake', '');
    }

    let setCellStep = (cell, step) => {
        // Есть соглашение, что пользовательские атрибуты называются с префикса "data-".
        cell.setAttribute('data-step', step);
    }

    let getCellStep = cell => {
        // Явное преобразование строки к числу через объект-обертку.
        return new Number(cell.getAttribute('data-step'));
    }

    // Только этот объект будет доступен извне.
    return {
        getScore: 0,
        playStep: playStep
    }
})(); // Используем IIFE (Immediately Invoked Function Expression) для изоляции.

// Главный цикл игры.
let timer = setInterval(function () {
    if (!snakeGame.playStep(direction)) {
        // Игра закончена - останавливаем цикл.
        clearInterval(timer);
        alert('Game Over! Score: ' + snakeGame.getScore());
    }
}, 500);

var direction = 39;
// Обработка действий пользователя.
document.onkeydown = e => {
    if (e.keyCode < 41 && e.keyCode > 36) {
        direction = e.keyCode;
    }
}