"use strict";

//Игровая зона
const area = document.querySelector("#area");
//Какой ход
let move = 0;
let result = "";
const contentWrapper = document.querySelector("#content");
const modalResult = document.querySelector("#modal-result-wrapper");
const overlay = document.querySelector("#overlay");
const btnClose = document.querySelector("#btn-close");



area.addEventListener("click", event => {
	const target = event.target;
	console.log(target);

	if(target.classList.contains("box")){

		//Если ход четный, в клетке будет значение Х, в противном случае - О
		move % 2 === 0 ? target.innerHTML = "X" : target.innerHTML = "O";
		move++;

		check();
	}
});


const check = () => {//ПРоверка на наличие победителя
	//Хранилище клеток на поле
	const boxes = document.querySelectorAll(".box");
	
	//Массив с выигрышными комбинациями
	const arr = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	for(let i = 0; i < arr.length; i++){
		if(
			boxes[arr[i][0]].innerHTML == "X" &&
			boxes[arr[i][1]].innerHTML == "X" &&
			boxes[arr[i][2]].innerHTML == "X"
			){
			result = "крестики";
			prepareResult(result);
		}else if(
			boxes[arr[i][0]].innerHTML == "O" &&
			boxes[arr[i][1]].innerHTML == "O" &&
			boxes[arr[i][2]].innerHTML == "O"
			){
			result = "нолики";
			prepareResult(result);

		}
	}
};

const prepareResult = winner => {
	contentWrapper.innerHTML = `Победили ${winner}!`;
	//Показываем модалку
	modalResult.style.display = "block";
};

const closeModal = () => {
	//Скрываем модалку
	modalResult.style.display = "none";
	//Обновление страницы
	location.reload();
};

//Закрываем модалку при клике на оверлей
overlay.addEventListener("click", closeModal);
//Закрываем модалку при клике на кнопку
btnClose.addEventListener("click", closeModal);