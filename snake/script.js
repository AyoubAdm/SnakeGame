import{update,draw, setupSnake, checkLose} from "./snake.js";
import { updateApple,drawApple,score,setupScore } from "./apple.js";

const titre = document.querySelector("h1");
const canvas = document.querySelector("canvas");
const h2 = document.querySelector("h2");
const p = document.createElement("p");
const div= document.querySelector("div")
const label = document.querySelector("label")
const vitesse = document.getElementById("speed");
var best = 0;
var lastRenderTime;
var updateSpeed;


var SPEED = 10 //Definit la vitesse d'update du jeu (1= une update/sec)


function main (currentTime){
    
    if (lastRenderTime==null){  //ligne 21 à 32 sert à appeler fonction main tout les x temps (x depend de la variable SPEED)
        lastRenderTime = currentTime;
        window.requestAnimationFrame(main);
        return;
    }
    const deltaSec = (currentTime - lastRenderTime); 
   
    window.requestAnimationFrame(main);
    
    if(deltaSec<(1/SPEED)*1000) return; //si deltaSec plus petit que notre vitesse d'update voulu, on ne fait rien
    
    lastRenderTime = currentTime;


    if(checkLose()){ //si on a perdu on affiche le meilleur score et on arrete de mettre a jour le jeu
        draw();
        titre.classList.remove("hide")
        titre.innerText="press spacebar to restart";
        if (score>best){best=score;}
        p.innerText=`best score : ${best}`;
        titre.appendChild(p);
        document.addEventListener("keypress",start,{once:true})
    }
    else{ //si pas perdu, le jeu se met a jour à la vitesse definit
        h2.innerText=`score : ${score}`;
        draw();
        update();
        drawApple();
        updateApple();
    }
}

function start(){ //fonction qui demarre le jeu en initialisant score à 0 et position du serpent
    setupScore();
    setupSnake();
    div.classList.remove("hide")
    h2.classList.remove("hide");
    titre.classList.add("hide");
    canvas.classList.remove("hide");
    window.requestAnimationFrame(main)
}

function speedUpdate (){
   updateSpeed = setInterval(()=>{    label.innerText=`vitesse du serpent (10 par defaut) : ${vitesse.value}`;},75)
}

function stopSpeedUpdate(){
    clearInterval(updateSpeed);
}

vitesse.addEventListener("change",()=>SPEED=vitesse.value);
document.addEventListener("keydown",start,{once:true}) //demarre le jeu
vitesse.addEventListener("focus",speedUpdate) //Lorsqu'on est entrain de changer la vitesse, on met a jour le label
vitesse.addEventListener("focusout",stopSpeedUpdate); //Lorsqu'on est plus entrain de changer la vitesse, on arrete de mettre a jour le label
