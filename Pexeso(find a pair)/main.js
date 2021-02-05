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

const banner = document.createElement("img");
banner.setAttribute("src", "img/background.jpg");

const gameHeader = document.querySelector(".game-header");
gameHeader.after(banner);

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click",()=>{})
