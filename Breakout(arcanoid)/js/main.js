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
					active: true,//По умолчанию блок существует
					width: 60,
					height: 20,
					x: 64 * col + 65,
					y: 24 * row + 35,
				});
			}
		}
	},

	update() {//Текущее состояние объектов
		this.platform.move();
		this.ball.move();
		this.collideBlocks();
		this.collidePlatform();
		this.ball.collideWorldBorders();
	},

	collideBlocks() {
		for (let block of this.blocks) {
			if (block.active && this.ball.collide(block)) {
				//Проверка на столкновение только если блок существует
				this.ball.bumpBlock(block);
			}
		}
	},

	collidePlatform() {
		if (this.ball.collide(this.platform)) {
			this.ball.bumpPlatform(this.platform);
		}
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
			if (block.active) {//Если блок существует, то он отрисуется
				this.ctx.drawImage(this.sprites.block, block.x, block.y);
			}
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

	collide(element) {//Проверка на столкновение мяча с блоками
		let x = this.x + this.dx;
		let y = this.y + this.dy;
		/*Столкновение будет true при выполнении всех 4 условий
		1) Начало координат по х + ширина шара > начала координат по х блока
		2) Начало координат х шара < начала координат х блока + ширина блока
		3) Начало координат по у + высота шара > начала координат по у блока
		4) Начало координат по у шара < начала координат по у блока + высота блока*/
		if (x + this.width > element.x &&
			x < element.x + element.width &&
			y + this.height > element.y &&
			y < element.y + element.height) {
			return true;
		} else {
			return false;
		}
	},

	collideWorldBorders() {//Проверка на столкновение мяча с границами мира
		let x = this.x + this.dx;
		let y = this.y + this.dy;

		let ballLeft = x,
			ballRight = ballLeft + this.width,
			ballTop = y,
			ballBottom = ballTop + this.height;

		let worldLeft = 0,
			worldRight = game.width,
			worldTop = 0,
			worldBottom = game.height;

		if (ballLeft < worldLeft) {
			this.x = 0;
			this.dx = this.speed;
		} else if (ballRight > worldRight) {
			this.x = worldRight - this.width;
			this.dx = -this.speed;
		} else if (ballTop < worldTop) {
			this.y = 0;
			this.dy = this.speed;
		} else if (ballBottom > worldBottom) {
			alert("game over");
		}
	},

	bumpBlock(block) {
		this.dy *= -1;//Сменили направление мяча на противоположное
		//После столкновения блок не будет отрисовываться на следующем кадре
		block.active = false;
	},

	bumpPlatform(platform) {
		if (this.dy < 0) {//Если вертикального смещения нет, прервать
			return;
		}
		/*Сменили направление мяча на противоположное. Принудительно ставим
		отрицательное значение speed, чтобы мяч отскакивал только вверх*/
		this.dy = -this.speed;
		let touchX = this.x + this.width / 2;//Точка касания мяча с платформой
		this.dx = this.speed * platform.getTouchOffset(touchX);
	},
};

game.platform = {
	speed: 6,//Возможная скорость движения платформы
	dx: 0,//Смещение по оси х в данный момент времени
	x: 270,
	y: 300,
	width: 100,
	height: 14,
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

	getTouchOffset(x) {
		/*Условно разделим платформу на 2 половины. Левая половина будет иметь
		значение от -1 (левый край платформы)до 0 (середина), а правая половина
		примет значение от 0 (середина) до 1 (правый край платформы)*/
		/*Координата правой стороны платформы минус координата касания мяча с
		платформой*/
		let diff = (this.x + this.width) - x;
		/*Вычтем полученную разницу из полной ширины платформы и получим
		точку касания мяча относительно левого края платформы*/
		let offset = this.width - diff;
		let result = 2 * offset / this.width;

		return result - 1;
	},
};

window.addEventListener("load", () => {
	game.start();
});
