"use strict";

let game = {
	ctx: null,
	platform: null,
	ball: null,
	sprites: {
		background: null,
		ball: null,
		platform: null,
	},

	init() {
		//Инициализация
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
	},

	preload(callback) {
		//Предзагрузка файлов
		let loaded = 0;
		let required = Object.keys(this.sprites).length;
		for (let key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = `img/${key}.png`;
			this.sprites[key].addEventListener("load", () => {
				++loaded;
				if (loaded >= required) {
					callback();
				}
			});
		}
	},

	run() {
		window.requestAnimationFrame(() => {
			this.render();
		});
	},

	render() {
		this.ctx.drawImage(this.sprites.background, 0, 0);
		this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width,
			this.ball.height, this.ball.x, this.ball.y,
			this.ball.width, this.ball.height);//Отрисовка 1 кадра из спрайта
		this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
	},

	start() {
		this.init();
		this.preload(() => {
			//По факту загрузки preload, будет запущен метод run
			this.run();
		});
	},
};

game.ball = {
	x: 310,
	y: 280,
	width: 20,
	height: 20,
};

game.platform = {
	x: 270,
	y: 300,
};

window.addEventListener("load", () => {
	game.start();
});
