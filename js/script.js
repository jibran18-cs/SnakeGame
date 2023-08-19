let inputdir= {x:0,y:0}
const foodMusic= new Audio('food.mp3')
const gameover= new Audio('gameover.mp3')
const moveMusic= new Audio('move.mp3')
const backgroundMusic= new Audio('music.mp3')

let speed= 9;
let lastmoveTime= 0;
let snakeArr= [{x:13, y:15}]
let food= {x:10, y:12}
let score =0;

// This is the main func
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime-lastmoveTime)/1000<1/speed){
        return;
    }
    lastmoveTime= ctime;
    gameEngine()
}
function isCollide(snake){
    // collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
       if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
        return true;
       }
        
    }
    // collide with wall 
    if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0) {
        return true;
    }
}

function gameEngine(){
       //  3 Now we will make our snake to increase its self as it eats the food
       if(isCollide(snakeArr)){
        gameover.play()
        backgroundMusic.pause()
        alert("Game Over : Press any key to restart")
        inputdir= {x:0, y:0}
        snakeArr= [{x:13, y:15}]
        backgroundMusic.play()
        score =0;
    }
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodMusic.play()
        snakeArr.unshift({x:snakeArr[0].x+inputdir.x,y:snakeArr[0].y+inputdir.y})
        let a= 2;
        let b= 16;
        food= {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }
//   To move snake
    for (let i =snakeArr.length-2; i >=0; i--) {
        // const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]}
        
    }
    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;
    // 1 Diplay snake using array becuase snake will incease it's size after eating the food 
    playground.innerHTML= ""
    snakeArr.forEach((e, index)=>{
         snakeElement= document.createElement("div");
         snakeElement.style.gridRowStart=e.y
         snakeElement.style.gridColumnStart=e.x
         if(index==0){
             snakeElement.classList.add('head')
            }
            else{

                snakeElement.classList.add('snake')
            }

         playground.appendChild(snakeElement)
    })
        // 2 Diplay food without using array becuase food will only change it's position not size 

         foodElement= document.createElement("div");
         foodElement.style.gridRowStart=food.y
         foodElement.style.gridColumnStart=food.x
         foodElement.classList.add('food')
         playground.appendChild(foodElement)

     
}



// Here we will write logic
 window.requestAnimationFrame(main)
 window.addEventListener("keydown", e=>{
     inputdir={x:0, y:1}
     backgroundMusic.play()
     moveMusic.play()
    switch (e.key) {
        
        case "ArrowUp":
            console.log('ArrowUp')
            inputdir.x=0;
            inputdir.y=-1;

            break;
            
        case "ArrowDown":
            console.log('ArrowDown')
            inputdir.x=0;
            inputdir.y=1;

            break;
            
        case "ArrowRight":
            console.log('ArrowRight')
            inputdir.x=1;
            inputdir.y=0;

            break;
            
        case "ArrowLeft":
            console.log('ArrowLeft')
            inputdir.x=-1;
            inputdir.y=0;

            break;
            
        default:
            break;
    }
 })