
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
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	groupmedia = require("gulp-group-css-media-queries"),
	cleancss = require("gulp-clean-css"),
	rename = require("gulp-rename");

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

function css(param) {//Обработка css
	return src(path.src.css)
		.pipe(
			scss({//Настройка обработки scss
				outputStyle: "expanded",//Расширенный файл
			})
		)
		.pipe(
			groupmedia()//группировка медиазапросов
		)
		.pipe(
			autoprefixer({//Настройки вендорных автопрефиксов
				//Последние 5 версий браузеров
				overrideBrowserslist: ["last 5 versions"],
				//Каскадный вывод
				cascade: true,
			})
		)
		.pipe(dest(path.build.css))//Выгрузка результата
		.pipe(cleancss())//Очистка и сжатие css
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		/*Создает поток для записи объектов в файловую систему.*/
		.pipe(dest(path.build.css))//Выгрузка минифицированного результата
		.pipe(browsersync.stream());//Обновление страницы
}

function watchFiles(param) {//Следит за обновление файлов
	gulp.watch([path.watch.html], html);//Слежка за html
	gulp.watch([path.watch.css], css);//Слежка за scss
}

function clean(param) {//Автоочистка директории с готовым проектом
	return del(path.clean);
}

/*Объединяет функции задач и/или составные операции в более крупные, которые
выполняются последовательно. Нет никаких ограничений на глубину вложенности
составных операций*/
let build = gulp.series(clean, gulp.parallel(css, html));

/*Объединяет функции задач и/или составные операции в более крупные,
которые выполняются одновременно (параллельно).
Нет никаких ограничений на глубину вложенности составных операций*/
let watch = gulp.parallel(build, watchFiles, browserSync);

//При запуске Gulp будут выполняться эти переменные по умолчанию
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
