"use strict";

let game = {

	ctx: null,
	background: null,
	ball: null,
	platform: null,

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
		this.platform = new Image();
		this.platform.src = "img/platform.png";

		console.log(this.background);
		console.log(this.ball);
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
		this.ctx.drawImage(this.platform, 50, 50);
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
