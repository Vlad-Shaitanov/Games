"use strict";

let game = {
	ctx: null,
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
		this.ctx.drawImage(this.sprites.ball, 0, 0);
		this.ctx.drawImage(this.sprites.platform, 0, 0);
	},

	start() {
		this.init();
		this.preload(() => {
			//По факту загрузки preload, будет запущен метод run
			this.run();
		});
	},
};

window.addEventListener("load", () => {
	game.start();
});
