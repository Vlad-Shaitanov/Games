"use strict";

const LOGOs = [
    "сlojure.jpg",
    "android.jpg",
    "c_plus-logo.jpg",
    "c_sharp.jpg",
    "devops.jpg",
    "golang.jpg",
    "groovy.jpg",
    "html.jpg",
    "java.jpg",
    "js.jpg",
    "jsp.jpg",
    "objective.jpg",
    "php.jpg",
    "python.jpg",
    "ruby.jpg",
    "sql.jpg",
    "swift.jpg",
    "ui.jpg",
];

const BACKGROUND = "background.jpg";
let gameSettings = { //Начальные игровые настройки
    width: 4,
    height: 3,
}

let checkedCard = null; //Карточка, по которой кникнул игрок
let cardsCount = null; //Счетчик карточек
let isBlocked = false;
let timer = null;//Сообщение о победе
let timerReload = null;//Таймер обновления страницы при выигрыше

const selectSettings = document.querySelector("#select-table");
selectSettings.addEventListener("change", (event) => {
    const target = event.target.value;

    //Установка размеров игрового поля
    switch (target) {
        case "12":
            gameSettings = {
                width: 4,
                height: 3,
            }
            break;
        case "16":
            gameSettings = {
                width: 4,
                height: 4,
            }
            break;
        case "20":
            gameSettings = {
                width: 4,
                height: 5,
            }
            break;
       case "24":
            gameSettings = {
                width: 4,
                height: 6,
            }
    }
});

const gameField = document.querySelector("#game-field");

const banner = document.createElement("img");
banner.setAttribute("src", "img/background.jpg");
banner.classList.add(".banner");

const gameHeader = document.querySelector(".game-header");
gameHeader.after(banner);

const handleCardClick = (event) => {
    window.clearTimeout(timer, timerReload); //Сброс таймера
    if (!isBlocked) {
        const target = event.target;
        const bg = target.dataset.bg;

        target.style.backgroundImage = `url(img/${bg})`;
        target.classList.toggle("open");

        if (!checkedCard) {
            checkedCard = {
                card: target,
                background: bg
            }
        } else {
            if (checkedCard.background === bg) {
                cardsCount -= 2; //Из общего числа карточек вычитаем 2
                checkedCard = null;
            } else {
                isBlocked = true;

                setTimeout(() => {
                    target.classList.toggle("open");
                    checkedCard.card.classList.toggle("open");
                    target.style.backgroundImage = "";
                    checkedCard.card.style.backgroundImage = "";
                    isBlocked = false;

                    checkedCard = null;
                }, 600);
            }
        }
        timer = setTimeout(() => {
            if (cardsCount === 0) {
                gameField.innerHTML = "<h2>Вы выиграли!</h2>";
                
                timerReload = setTimeout(()=>{
                    window.location.reload();
                }, 3000);
            }
        }, 600);
    }
}

const startButtonClick = () => {
    //Очищаем поле
    gameField.innerHTML = "";

    //Счетчик карточек
    cardsCount = gameSettings.width * gameSettings.height;
    //Используемые фоны
    const usedBackgrounds = [];
    //Фоны для отрисовки карточек
    const cardsBackgrounds = [];

    //Создаем массивы с картинками, на основе которых отрисуем карты
    for (let i = 0; i < cardsCount; i++) {
        let selectedBackgrounds;

        if (i < cardsCount / 2) {
            //Случайный индекс картинки
            const cardBgIndex = Math.floor(Math.random() * LOGOs.length);

            selectedBackgrounds = LOGOs[cardBgIndex];

            usedBackgrounds.push(selectedBackgrounds);

        } else {
            selectedBackgrounds = usedBackgrounds.pop();
        }

        cardsBackgrounds.push(selectedBackgrounds);
    }

    cardsBackgrounds.sort(() => Math.random() - 0.5); //Сортировка случайным образом


    let iterator = 0;
    //Создаем сетку из карточек на поле
    for (let i = 0; i < gameSettings.height; i++) {
        const row = document.createElement("div");
        row.classList.add("row");


        for (let k = 0; k < gameSettings.width; k++) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.bg = cardsBackgrounds[iterator];

            card.addEventListener("click", handleCardClick);

            row.appendChild(card);

            iterator++;
        }

        gameField.appendChild(row);
    }
};

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startButtonClick);
