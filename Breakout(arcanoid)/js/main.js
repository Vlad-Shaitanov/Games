"use strict";

let game = {
	ctx: null,
	platform: null,
	ball: null,
	blocks: [],
	rows: 4,//Кол-во рядов с блоками
	cols: 8,//Кол-во колонок с блоками
	sprites: {
		background: null,
		ball: null,
		platform: null,
		block: null,
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

		let onImageLoad = () => {
			++loaded;
			if (loaded >= required) {
				callback();
			}
		};

		for (let key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = `img/${key}.png`;
			this.sprites[key].addEventListener("load", onImageLoad);
		}
	},

	create() {//Создание группы блоков
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				this.blocks.push({
					x: 64 * col + 65,
					y: 24 * row + 35,
				});
			}
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
		this.renderBlocks();
	},

	renderBlocks() {
		for (let block of this.blocks) {//Отрисовка группы блоков
			this.ctx.drawImage(this.sprites.block, block.x, block.y);
		}
	},

	start() {
		this.init();
		this.preload(() => {
			this.create();
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
