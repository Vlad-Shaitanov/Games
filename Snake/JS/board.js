"use strict";

//создаем объект board, который будет свойством объекта game
game.board = {
	game: game,
	size: 15,//Размер доски
	cells: [],//массив ячеек


	create() {
		this.createCells();
	},

	createCells() {//Создаем массив ячеек
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				this.cells.push(this.createCell(row, col));
			}
		}
	},

	createCell(row, col) {//Создаем ячейки с координатами
		let cellSize = this.game.sprites.cell.width + 1;
		//Задали ширину ячейки с отступом 1 пиксель

		//Задаем отступы по краям (в данном случае центрируем по канвасу)
		let offSetX = (this.game.width - cellSize * this.size) / 2;
		let offSetY = (this.game.height - cellSize * this.size) / 2;

		return {
			row: row,
			col: col,
			x: offSetX + cellSize * col,
			y: offSetY + cellSize * row
		};
	},

	getRandomAvailableCell() {//Получение рандомной ячейки для яблока
		//Проверяем, не занята ли ячейка змейкой
		let pool = this.cells.filter(cell => !this.game.snake.hasCell(cell));
		let index = this.game.random(0, pool.length - 1);
		return pool[index];
	},

	createFood() {//Получение ячейки для яблока
		//Получить случайную доступную ячейку

		let cell = this.getRandomAvailableCell();
		//Установить флаг hasFood
		cell.hasFood = true;
		console.log("Food");
	},

	getCell(row, col) {
		return this.cells.find(cell => cell.row === row && cell.col === col);
	},

	render() {//Рисуем поле
		this.cells.forEach(cell => {
			this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
			if (cell.hasFood) {
				this.game.ctx.drawImage(this.game.sprites.food, cell.x, cell.y);
			}
		});
	},
};