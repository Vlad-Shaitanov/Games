"use strict";
@@include("webp.js")



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
