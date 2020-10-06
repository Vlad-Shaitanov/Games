
let projectFolder = "dist";//Папка для выгрузки(готовый проект)
let sourceFolder = "#src";//Папка с исходниками

let path = {//Содержит пути к файлам и папкам

	build: {//Пути вывода уже обработанных файлов
		html: projectFolder + "/",
		css: projectFolder + "/css/",
		js: projectFolder + "/js/",
		img: projectFolder + "/img/",
		fonts: projectFolder + "/fonts/",
	},

	src: {//Исходные файлы
		html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
		css: sourceFolder + "/scss/style.scss",
		js: sourceFolder + "/js/main.js",
		img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webpp}",
		/*Папка img будет "слушать" все подпапки внутри нее, с указанными
		расширениями*/
		fonts: sourceFolder + "/fonts/*ttf",
	},

	watch: {//Заэтими файлами Gulp будет следить постоянно
		html: sourceFolder + "/**/*.html",
		css: sourceFolder + "/scss/**/*.scss",
		js: sourceFolder + "/js/**/*.js",
		img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webpp}",
		/*Папка img будет "слушать" все подпапки внутри нее, с указанными
		расширениями*/
	},

	clean: "./" + projectFolder + "/",//Очистка директории с готовым проектом
};

let { src, dest } = require("gulp"),
	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include");

function browserSync(param) {//Работа браузера
	browsersync.init({//Инициализация обновления браузера
		//Настройки плагина
		server: {
			//Базовая папка
			baseDir: "./" + projectFolder + "/",
			//Настройка порта
			port: 3000,
			//Отключение уведомления об обновл.браузера
			notify: false,
		},

	});
}

function html() {//Обработка htmll
	return src(path.src.html)
		.pipe(fileinclude())//Объединение файлов в один
		/*Создает поток для записи объектов в файловую систему.*/
		.pipe(dest(path.build.html))//Путь к папке с результатом
		.pipe(browsersync.stream());//Обновление страницы
}

function watchFiles(param) {//Следит за обновление файлов
	gulp.watch([path.watch.html], html);//Слежка за html
}

/*Объединяет функции задач и/или составные операции в более крупные, которые
выполняются последовательно. Нет никаких ограничений на глубину вложенности
составных операций*/
let build = gulp.series(html);

/*Объединяет функции задач и/или составные операции в более крупные,
которые выполняются одновременно (параллельно).
Нет никаких ограничений на глубину вложенности составных операций*/
let watch = gulp.parallel(build, watchFiles, browserSync);

//При запуске Gulp будут выполняться эти переменные по умолчанию
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
