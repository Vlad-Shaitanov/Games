"use strict";
//JS-функция определения поддержки WebP
// function testWebP(callback) {

// 	var webP = new Image();
// 	webP.onload = webP.onerror = function () {
// 		callback(webP.height == 2);
// 	};
// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }

// testWebP(function (support) {

// 	if (support == true) {
// 		document.querySelector('body').classList.add('webp');
// 	} else {
// 		document.querySelector('body').classList.add('no-webp');
// 	}
// });



let game = {

	ctx: null,
	canvas: null,
	background: null,
	ball: null,

	init() {
		//Инициализация
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
	},

	preload() {
		//Предзагрузка спрайтов
		this.background = new Image();
		this.background.src = "img/background.png";
		this.ball = new Image();
		this.ball.src = "img/ball.png";
	},

	run() {
		//Запуск
		window.requestAnimationFrame(() => {
			this.render();
		});
	},

	render() {
		//Отрисовка
		console.log("render");
		this.ctx.drawImage(this.background, 0, 0);
		this.ctx.drawImage(this.ball, 0, 0);
	},

	start() {
		this.init();
		this.preload();
		this.run();
	},
};
window.addEventListener("load", () => {
	//Старт игры только при полной загрузке структуры HTML
	game.start();
});
