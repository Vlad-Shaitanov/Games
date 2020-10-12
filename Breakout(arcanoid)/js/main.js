"use strict";

const KEYS = {
	LEFT: 37,
	RIGHT: 39,
	SPACE: 32,
};

let game = {
	ctx: null,
	platform: null,
	ball: null,
	blocks: [],
	rows: 4,//Кол-во рядов с блоками
	cols: 8,//Кол-во колонок с блоками
	width: 640,//Ширина игрового поля
	height: 360,//Высота игрового поля
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
		this.setEvents();
	},

	setEvents() {
		window.addEventListener("keydown", (event) => {
			if (event.keyCode === KEYS.SPACE) {
				this.platform.shot();//"Выстрел мяча"
			} else if (event.keyCode === KEYS.LEFT || event.keyCode === KEYS.RIGHT) {
				this.platform.start(event.keyCode);
			}
		});

		window.addEventListener("keyup", (event) => {
			//При отпускании клавиши прекращаем движение платформы
			this.platform.stop();
		});
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

	update() {//Текущее состояние объектов
		this.platform.move();
		this.ball.move();
	},

	run() {//Запуск игры
		window.requestAnimationFrame(() => {
			this.update();
			this.render();
			this.run();//Рекурсия для динамической отрисовки платформы
		});
	},

	render() {
		//Очищаем канвас перед отрисовкой нового кадра
		this.ctx.clearRect(0, 0, this.width, this.height);

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

	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

};

game.ball = {
	speed: 3,//Возможная скорость движения мяча
	dx: 0,//Смещение по оси x в данный момент времени
	dy: 0,//Смещение по оси у в данный момент времени
	x: 310,
	y: 280,
	width: 20,
	height: 20,

	start() {
		this.dy = -this.speed;
		this.dx = game.random(-this.speed, this.speed);
	},

	move() {
		if (this.dy) {
			this.y += this.dy;
		}
		if (this.dx) {
			this.x += this.dx;
		}
	},
};

game.platform = {
	speed: 6,//Возможная скорость движения платформы
	dx: 0,//Смещение по оси х в данный момент времени
	x: 270,
	y: 300,
	ball: game.ball,

	start(direction) {
		if (direction === KEYS.LEFT) {
			this.dx = -this.speed;
		} else if (direction === KEYS.RIGHT) {
			this.dx = this.speed;
		}
	},

	stop() {
		this.dx = 0;
	},

	move() {
		if (this.dx) {//Если платформа движется
			this.x += this.dx;
			if (this.ball) {
				this.ball.x += this.dx;
			}
		}
	},

	shot() {
		if (this.ball) {//Запуск только если мяч на платформе
			this.ball.start();//Начало движения мяча
			this.ball = null;//После выстрела движение мяча и платформы независимо
		}
	},
};

window.addEventListener("load", () => {
	game.start();
});
