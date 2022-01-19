export var snake;
var dy=0;
var dx=0;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


function direction(e){
    switch (e.key) {
        case ("ArrowLeft"):if (dx!=20){ dx=-20;dy=0; }break;
        case ("ArrowRight"):if (dx!=-20){ dx=20;dy=0; }break;
        case ("ArrowUp"):if (dy!=20){ dx=0;dy=-20; }break;
        case ("ArrowDown"):if (dy!=-20){ dx=0;dy=20; }
    }
    document.removeEventListener("keydown",direction); /*si le joueur appuie tres rapidement sur haut et gauche, la tete du serpent va 
                                                         vers la gauche sans monter (et donc le joueur perd) donc on evite ça*/
}






export function update(){
    document.addEventListener("keydown",direction); //pour deplacer le serpent
    for(var i = snake.length-2; i>=0; i--){
        snake[i+1].x=snake[i].x;
        snake[i+1].y=snake[i].y;
    }
    snake[0].x+=dx;
    snake[0].y+=dy;
    
    
    if(snake[0].x<0){ //si serpent sort par la gauche, il se retrouve à droite
        snake[0].x=canvas.width-20;
    }
    if(snake[0].x >= canvas.width){ //si serpent sort par la droite, il se retrouve à gauche
        snake[0].x=0
    }
    if(snake[0].y<0){ //si serpent sort par le haut il se retrouve en bas
        snake[0].y=canvas.height-20
    }
    if(snake[0].y>=canvas.height){ //si serpent sort par le bas il se retrouve en haut
        snake[0].y=0
    }
}
export function draw(){ //fonction qui dessine le serpent

    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i<snake.length;i++){
        if(i==0){ //on met une petite bordure autour de la tete du serpent
            ctx.fillStyle="green";
            ctx.strokeStyle="black";
            ctx.lineWidth=3;
            ctx.strokeRect(snake[i].x,snake[i].y,20,20);
        }
        else if (i%2==0){ //partie du corps vert
            ctx.lineWidth=1;
            ctx.fillStyle="green";
        }

        else{ //partie du corps orange
            ctx.lineWidth=1;
            ctx.fillStyle="orange"

        }
        ctx.fillRect(snake[i].x,snake[i].y,20,20);
    }
    
}

export function addTail(){ //ajoute une "queue" au serpent
    snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y});
}

export function setupSnake(){ //on fait demarrer le serpent avec une longueur de 3 et il avance vers la droite
    snake = [{x:100,y:200},{x:80,y:200},{x:60,y:200}];
    dx=20;
    dy=0;
    
}

export function checkLose(){ 
    let duplicate = snake.slice(1); //list du corps du serpend sans sa tete
    if (duplicate.filter(e => (e.x === snake[0].x)&&(e.y===snake[0].y)).length > 0) { //si une partie du corps a les meme x et y que la tete, alors on a perdu (collision)
        return true
      }
    return false
}

