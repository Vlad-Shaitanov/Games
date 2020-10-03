"use strict";

//создаем объект board, который будет свойством объекта game
game.snake = {
	game: game,
	cells: [],//массив ячеек
	moving: false,//движение змейки

	create() {//создание змейки
		//стартовая позиция змейки
		let startCells = [
			{ row: 7, col: 7 }, { row: 8, col: 7 }
		];

		for (let startCell of startCells) {
			/*ищем в массиве cells ячейки, соответствующие
			нашим стартовым координатам */
			//Если ячейки найдены, то добавляем их в массив cells нашего объекта snake
			this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
		}
	},

	render() {//Рисуем поле
		this.cells.forEach(cell => {
			this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y);
		});
	},

	start() {//старт движения змейки
		this.moving = true;
	},

	move() {
		if (!this.moving) {
			return;
		}
		//Получаем следующую ячейку
		let cell = this.getNextCell();
		//Если такая ячейка есть
		if (cell) {
			//Добавить новую ячейку в snake.cells
			this.cells.unshift(cell);
			//this.cells[0] - голова змеи(первый элемент массива)
			//Удалить последнюю ячейку из snake.cells
			this.cells.pop(cell);
		}

	},

	getNextCell() {
		let head = this.cells[0];//Координаты головы
		let row = head.row - 1;//Координаты новой строки
		let col = head.col;//Координаты нового столбца

		return this.game.board.getCell(row, col);
		/*Координаты новвой ячейки для следующего шага*/
	}
};
