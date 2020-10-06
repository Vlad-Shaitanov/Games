
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
		html: sourceFolder + "/",
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

let { src, dist } = require("gulp"),
	gulp = require("gulp");