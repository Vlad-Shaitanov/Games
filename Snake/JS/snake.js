"use strict";

//создаем объект board, который будет свойством объекта game
game.snake = {
	game: game,
	cells: [],//массив ячеек


	create() {
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
};
