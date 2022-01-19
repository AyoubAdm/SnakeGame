import {snake,addTail} from "./snake.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
export var score=0;
var r1 = Math.floor(Math.random()*canvas.width); //nombre aleatoire pour le x de la pomme
var r2=Math.floor(Math.random()*canvas.height); //nombre aleatoire pour le y de la pomme

var xApple = r1-(r1%20); //pour forcer la pomme a etre sur des coordonnées "mangeable" par le serpent
var yApple = r2-(r2%20);

export function updateApple(){
    if (snake[0].x == xApple && snake[0].y == yApple){ //si pomme mangé on refait des x et y aleatoire 
        addTail(snake[0])
        r1 = Math.floor(Math.random()*canvas.width);
        r2=Math.floor(Math.random()*canvas.height);

        xApple = r1-(r1%20);
        yApple = r2-(r2%20);
        score++;
    }

}

export function drawApple(){ // on dessine la pomme en fonction de ses coordoonées
    ctx.fillStyle="red";
    ctx.fillRect(xApple,yApple,20,20);
}

export function setupScore(){
    score=0;
}