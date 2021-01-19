let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let rocket = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();


rocket.src = "img/rocket.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";


let gap = 85;
let constant;

let rX = 10;
let rY = 150;

let gravity = 1.5;

let score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    rY -= 25;
}

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    for(let i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        if( rX + rocket.width >= pipe[i].x && rX <= pipe[i].x + pipeNorth.width && (rY <= pipe[i].y + pipeNorth.height || rY+rocket.height >= pipe[i].y+constant) || rY + rocket.height >=  cvs.height - fg.height){
            location.reload(); 
        }
        
        if(pipe[i].x == 5){
            score++;
        }     
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(rocket,rX,rY);
    
    rY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();