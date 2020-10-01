"use strict";


let game = {
	//присваиваем свойствам значения null, чтобы в будущем присвоить объекты
	canvas: null,
	ctx: null,
	board: null,
	width: 640,
	height: 360,
	sprites: {
		background: null,
		cell: null,
	},
	start() {
		this.init();
		//По факту предзагрузки запускается игра
		this.preload(() => {
			this.run();
		});
	},

	init() {
		//Инициализация переменных
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
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
		/*указываем браузеру на то, что нужно произвести анимацию, и просим его
			запланировать перерисовку на следующем кадре анимации*/
		window.requestAnimationFrame(() => {
			/*Передаем картинку в контекст с координатами х=0 и у=0
			началом оси координат считается верхний левый угол канваса.
			*/
			this.ctx.drawImage(this.sprites.background, 0, 0);
			this.board.render();
		});
	}
};
game.start();