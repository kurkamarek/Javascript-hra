let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

/* Určení proměnných pro obrázky */
let rocket = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

/*Přiřazení souborů(obrázky) k jednotlivým proměnným*/
rocket.src = "img/rocket.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

/*Určení hodnot k jednotlivým proměnným*/
let gap = 85;
let constant;

let rX = 10;
let rY = 150;

let gravity = 1.5;

let score = 0;

document.addEventListener("keydown",moveUp);

/*Pohyb rakety směrem nahoru*/
function moveUp(){
    rY -= 25;
}

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

/* Funcke pro vykreslení*/
function draw(){
    
     /*Vykreslení pozadí*/
    ctx.drawImage(bg,0,0);
    
    for(let i = 0; i < pipe.length; i++){
        
        /*konstanta je počítána z výšky + mezery mezi trubkami*/
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        
        /*Dekrementace x zajistí pohyb trubky zleva do prava*/
        pipe[i].x--;
        
        /*Jakmile se okraj trubky dostane na hodnotu x == 125, vybere se náhodná pozice výšky trubky*/
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
        
        /*Detekce jednotlivých kolizí způsobující konec hry - Náraz rakety do trubky (zepředu, zevnitř...)*/
        if( rX + rocket.width >= pipe[i].x && rX <= pipe[i].x + pipeNorth.width && (rY <= pipe[i].y + pipeNorth.height || rY+rocket.height >= pipe[i].y+constant) || rY + rocket.height >=  cvs.height - fg.height){
            location.reload(); 
        }
        
        if(pipe[i].x == 5){
            score++;
        }     
    }
    
    /*Vykreslení spodní části, která má nulovou pozici. "cvs.height - fg.height je celá výška canvasu mínus výška spodní části.*/
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    
    ctx.drawImage(rocket,rX,rY);
    
    rY += gravity;
    
    /*Vypsání skóre*/
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    /*Zajistí, aby se po kolizi znovu spustila funkce draw od začátku*/
    requestAnimationFrame(draw);
    
}

draw();
