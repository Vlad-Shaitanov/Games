"use strict";


let game = {
	//присваиваем свойствам значения null, чтобы в будущем присвоить объекты
	canvas: null,
	ctx: null,
	sprites: {
		background: null,
		cell: null,
	},

	start() {
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");

		this.preload(() => {
			this.run();
		});
	},

	preload(callback) {
		//Динамически создаем аналог тега <img>
		this.sprites.background = new Image();
		//Используя свойство, подключаем нужную картинку
		this.sprites.background.src = "IMG/background.png";

		this.sprites.cell = new Image();
		this.sprites.cell.src = "IMG/cell.png";
		//При полной загрузке картинки будет выполнена отрисовка на странице
		this.background.addEventListener("load", () => {
			/*такая запись сработает только со стрелочными функциями(ES6)
			При передаче обычной функции контекст this будет другим
			и вызов метода не сработает*/
			this.run();
		});
		callback();
	},

	run() {
		/*указываем браузеру на то, что нужно произвести анимацию, и просим его
			запланировать перерисовку на следующем кадре анимации*/
		window.requestAnimationFrame(() => {
			/*Передаем картинку в контекст с координатами х=0 и у=0
			началом оси координат считается верхний левый угол канваса.
			*/
			this.ctx.drawImage(this.background, 0, 0);
		});
	}
};
game.start();