"use strict";

let canvas = document.querySelector("#canvas"),
	ctx = canvas.getContext("2d"),
	background,
	cell;

let game = {
	start() {
		//Динамически создаем аналог тега <img>
		background = new Image();
		//Используя свойство, подключаем нужную картинку
		background.src = "IMG/bg.png";

		cell = new Image();
		cell.src = "IMG/cell.png";
		//При полной загрузке картинки будет выполнена отрисовка на странице
		background.addEventListener("load", function () {
			this.run();
		});
	},
	run() {
		/*указываем браузеру на то, что нужно произвести анимацию, и просим его
			запланировать перерисовку на следующем кадре анимации*/
		window.requestAnimationFrame(function () {
			/*Передаем картинку в контекст с координатами х=0 и у=0
			началом оси координат считается верхний левый угол канваса.
			*/
			ctx.drawImage(background, 0, 0);
		});
	}
};
game.start();