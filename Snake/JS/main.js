"use strict";


let game = {
	//присваиваем свойствам значения null, чтобы в будущем присвоить объекты
	canvas: null,
	ctx: null,
	board: null,
	width: 0,
	height: 0,
	dimensions: {//Размеры игры
		//Максимальный размер отрисовки
		max: {
			width: 640,
			height: 360,
		},
		/*минимальный размер, при котором будет отрисовываться канвас.
		В данном случае размер ячейки (18рх ячейка +1 рх отступ) * на размер поля*/
		min: {
			width: 300,
			height: 300,
		}
	},
	sprites: {
		background: null,
		cell: null,
		body: null,
	},
	start() {
		this.init();
		//По факту предзагрузки запускается игра
		this.preload(() => {
			this.run();
		});
	},

	init() {
		//Предыгровая инициализация переменных
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.initDimensions();
	},

	initDimensions() {//Расчет одной из сторон
		let data = {//Парамметры для расчета
			maxWidth: this.dimensions.max.width,
			maxHeight: this.dimensions.max.height,
			minWidth: this.dimensions.min.width,
			minHeight: this.dimensions.min.height,
			//Реальные размеры экрана устройства
			realWidth: window.innerWidth,
			realHeight: window.innerHeight,
		};

		this.fitHeight(data);

		//Динамическое определение размера канваса
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},

	fitHeight(data) {//Растягивание по высоте

		/*Соотношение сторон
		realWidth / realHeight так же как и resultWidth / maxHeight*/
		this.width = Math.floor(data.realWidth * data.maxHeight / data.realHeight);
		this.width = Math.min(this.width, data.maxWidth);
		//Выберет мин. значение между подсчитанной шириной и data.maxWidth
		this.width = Math.max(this.width, data.minWidth);

		this.height = Math.floor(this.width * data.realHeight / data.realWidth);
		this.canvas.style.height = "100%";

	},

	preload(callback) {
		let loaded = 0;//счетчик загруженных картинок
		let required = Object.keys(this.sprites).length;//сколько картинок нужно загрузить всего

		//функция выполняется каждый раз при загрузке нового спрайта
		let onAssetLoad = () => {
			++loaded;
			if (loaded >= required) {
				//запускаем игру, если условие выполняется
				callback();
			}
		};
		for (let key in this.sprites) {
			//Динамически создаем аналог тега <img>
			this.sprites[key] = new Image();
			//Используя свойство, подключаем нужную картинку
			this.sprites[key].src = `IMG/${key}.png`;

			//При полной загрузке картинок будет выполнена отрисовка на странице
			this.sprites[key].addEventListener("load", onAssetLoad);
		}
	},

	run() {
		this.board.create();
		this.snake.create();
		/*указываем браузеру на то, что нужно произвести анимацию, и просим его
			запланировать перерисовку на следующем кадре анимации*/
		window.requestAnimationFrame(() => {
			/*Передаем картинку в контекст с координатами х=0 и у=0
			началом оси координат считается верхний левый угол канваса.
			*/
			this.ctx.drawImage(this.sprites.background,
				(this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
			this.board.render();
			this.snake.render();
		});
	}
};
game.start();