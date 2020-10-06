
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
		css: sourceFolder + "",
		js: sourceFolder + "/js/",
		img: sourceFolder + "/img/",
		fonts: sourceFolder + "/fonts/",
	},
};