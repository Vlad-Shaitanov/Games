"use strict";


let game = {
	//присваиваем свойствам значения null, чтобы в будущем присвоить объекты
	canvas: null,
	ctx: null,
	board: null,
	width: 0,
	height: 0,
	score: 0,//Счетчик очков
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
		//Название своуства соответствует названию файла .png
		background: null,
		cell: null,
		head: null,
		body: null,
		food: null,
		bomb: null,
	},

	sounds: {
		bomb: null,
		food: null,
		theme: null,
	},

	random(min, max) {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
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
		this.setTextFont();
	},

	setTextFont() {//Настройка поля очков игрока
		this.ctx.font = "20px SuperMario";
		this.ctx.fillStyle = "#ffffff";
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

		if (data.realWidth / data.realHeight > data.maxWidth / data.minHeight) {
			this.fitWidth(data);
		} else {
			this.fitHeight(data);
		}


		//Динамическое определение размера канваса
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},

	fitWidth(data) {

		this.height = Math.round(this.width * data.realHeight / data.realWidth);
		this.height = Math.min(this.height, data.maxHeight);
		this.height = Math.max(this.height, data.minHeight);
		this.width = Math.round(data.realWidth * this.height / data.realHeight);
		this.canvas.style.width = "100%";
	},

	fitHeight(data) {//Растягивание по высоте

		/*Соотношение сторон
		realWidth / realHeight так же как и resultWidth / maxHeight*/
		this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
		this.width = Math.min(this.width, data.maxWidth);
		//Выберет мин. значение между подсчитанной шириной и data.maxWidth
		this.width = Math.max(this.width, data.minWidth);

		this.height = Math.round(this.width * data.realHeight / data.realWidth);
		this.canvas.style.height = "100%";
		console.log(this.width, this.height);

	},

	preload(callback) {
		let loaded = 0;//счетчик загруженных спрайтов
		//сколько спрайтов нужно загрузить всего
		let required = Object.keys(this.sprites).length +
			Object.keys(this.sounds).length;

		//функция выполняется каждый раз при загрузке нового спрайта
		let onAssetLoad = () => {
			++loaded;
			if (loaded >= required) {
				//запускаем игру, если условие выполняется
				callback();
			}
		};
		this.preloadSprites(onAssetLoad);
		this.preloadSounds(onAssetLoad);

	},

	preloadSprites(onAssetLoad) {
		for (let key in this.sprites) {
			//Динамически создаем аналог тега <img>
			this.sprites[key] = new Image();
			//Используя свойство, подключаем нужную картинку
			this.sprites[key].src = `IMG/${key}.png`;

			//При полной загрузке картинок будет выполнена отрисовка на странице
			this.sprites[key].addEventListener("load", onAssetLoad);
		}
	},
	preloadSounds(onAssetLoad) {
		for (let key in this.sounds) {
			//Динамически создаем аналог тега <audio>
			this.sounds[key] = new Audio();
			//Используя свойство, подключаем нужный звук
			this.sounds[key].src = `SOUNDS/${key}.mp3`;

			//Событие отработает только при полной готовности звуков к воспроизведению
			this.sounds[key].addEventListener("canplaythrough",
				onAssetLoad, { once: true });
		}
	},

	create() {
		//создание игровых объектов
		this.board.create();
		this.snake.create();
		this.board.createFood();
		this.board.createBomb();

		//Установка игровых событий
		window.addEventListener("keydown", (event) => {
			this.snake.start(event.keyCode);
		});
	},

	render() {
		/*указываем браузеру на то, что нужно произвести анимацию, и просим его
					запланировать перерисовку на следующем кадре анимации*/
		window.requestAnimationFrame(() => {
			/*Передаем картинку в контекст с координатами х=0 и у=0
			началом оси координат считается верхний левый угол канваса.
			*/
			//Перед тем, как отрисовать новый кадр, нужно очистить предыдущий
			//Очистка игрового поля в новом кадре
			this.ctx.clearRect(0, 0, this.width, this.height);
			//Рисуем кадр с учетом обновленного состояния
			this.ctx.drawImage(this.sprites.background,
				(this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
			this.board.render();
			this.snake.render();

			//Вывод панели с очками игрока
			this.ctx.fillText("Score: " + this.score, 30, 30);
		});
	},

	update() {
		//Двигать змею
		this.snake.move();
		//Отрисовывать новый кадр
		this.render();
	},

	run() {
		this.create();

		this.gameInterval = setInterval(() => {//каждые 150милисек.
			this.update();
		}, 150);

		this.bombInterval = setInterval(() => {
			//каждые 5с бомба меняет местоположение на доске
			if (this.snake.moving) {
				//Отстчет начинается только если змейка начала движение
				this.board.createBomb();
			}
		}, 5000);

		this.render();
	},

	stop() {
		this.sounds.bomb.play();
		clearInterval(this.gameInterval);//Сброс интервала
		clearInterval(this.bombInterval);//Сброс интервала бомбы
		alert("ИГРА ОКОНЧЕНА");
		window.location.reload();//Обновление окна после проигрыша
	},

	onSnakeStart() {//Действия при начале движения змеи
		this.sounds.theme.loop = true;//Зациклили звук
		this.sounds.theme.play();
	},
	onSnakeEat() {//Действия при поедании яблока
		++this.score;
		this.sounds.food.play();
		this.board.createFood();
	},

};

window.addEventListener("load", () => {
	//Старт игры только при полной загрузке структуры HTML
	game.start();
});