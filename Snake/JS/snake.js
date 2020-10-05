"use strict";

//создаем объект board, который будет свойством объекта game
game.snake = {
	game: game,
	cells: [],//массив ячеек
	moving: false,//движение змейки
	direction: false,
	directions: {//Направления движения
		up: {
			row: -1,
			col: 0,
			angle: 0,
		},
		down: {
			row: 1,
			col: 0,
			angle: 180,
		},
		left: {
			row: 0,
			col: -1,
			angle: 270,
		},
		right: {
			row: 0,
			col: 1,
			angle: 90,
		},
	},

	create() {//создание змейки
		//стартовая позиция змейки
		let startCells = [
			{ row: 7, col: 7 }, { row: 8, col: 7 }
		];

		this.direction = this.directions.up;//Направление

		for (let startCell of startCells) {
			/*ищем в массиве cells ячейки, соответствующие
			нашим стартовым координатам */
			//Если ячейки найдены, то добавляем их в массив cells нашего объекта snake
			this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
		}
	},

	renderHead() {//Отрисовка и поворот головы
		//Получить голову
		let head = this.cells[0];
		let halfSize = this.game.sprites.head.width / 2;
		//Отрисовать голову

		//Сохранить исходное состояние контекста
		this.game.ctx.save();
		//Перемещаем точку начала координат в координаты головы
		this.game.ctx.translate(head.x, head.y);
		//Перемещаем точку начала координат в центр головы
		this.game.ctx.translate(halfSize, halfSize);
		//Вращаем контекст относительно центра спрайта головы
		this.game.ctx.rotate(this.direction.angle * Math.PI / 180);
		//Отрисовываем голову с учетом поворота контекста
		this.game.ctx.drawImage(this.game.sprites.head, -halfSize, -halfSize);
		//Вернуть исходное состояние контекста
		this.game.ctx.restore();
	},

	renderBody() {
		for (let i = 1; i < this.cells.length; i++) {
			//Проходим цикл, начиная с 1, чтобы избежать ячейки с головой
			this.game.ctx.drawImage(this.game.sprites.body,
				this.cells[i].x, this.cells[i].y);
		}
	},

	render() {//Рисуем поле
		this.renderHead();
		this.renderBody();

	},

	start(keyCode) {//старт движения змейки
		console.log(keyCode);
		switch (keyCode) {
			case 38:
				this.direction = this.directions.up;
				break;
			case 40:
				this.direction = this.directions.down;
				break;
			case 37:
				this.direction = this.directions.left;
				break;
			case 39:
				this.direction = this.directions.right;
				break;
		}
		this.moving = true;
	},

	move() {
		if (!this.moving) {
			return;
		}
		//Получаем следующую ячейку
		let cell = this.getNextCell();
		/*Если след. ячейка выходит за пределы доски или
		является частью змейки или является бомбой*/
		if (!cell || this.hasCell(cell) || this.game.board.isBombCell(cell)) {
			//Необходимо остановить игру
			this.game.stop();
		} else {//Если такая ячейка есть
			//Добавить новую ячейку в snake.cells
			this.cells.unshift(cell);
			//this.cells[0] - голова змеи(первый элемент массива)

			if (!this.game.board.isFoodCell(cell)) {
				//Если новая ячейка НЕ является яблоком
				//Удалить последнюю ячейку из snake.cells, если она не food
				this.cells.pop(cell);
			} else {
				//Если новая ячейка является яблоком
				this.game.board.createFood();
			}
		}

	},

	hasCell(cell) {
		//Проверяем, находится ли нужная нам ячейка в массиве с ячейками для змейки
		return this.cells.find(part => part === cell);
	},

	getNextCell() {
		let head = this.cells[0];//Координаты головы

		let row = head.row + this.direction.row;//Координаты новой строки
		let col = head.col + this.direction.col;//Координаты нового столбца

		return this.game.board.getCell(row, col);
		/*Координаты новвой ячейки для следующего шага*/
	}
};
