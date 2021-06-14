let body = document.querySelector('body')
let asteroidArr =[]
let playerArr =[]
let player;
let timer = 0
let repeater;
let counter=0;
let points = 0;

class Player{
    constructor(x,y) {
        this.x = x;
        this.y = y
        
        playerArr.push(this)
    }
    render(){
        let tmp = document.createElement('div')
        tmp.classList.add('ship');
        body.appendChild(tmp),
        tmp.style.left = `${this.x}px`;
        tmp.style.top = `${this.y}px`;
    }
    
    move(e){
        let tmp = body.querySelector('.ship')
        switch(e.which){
            case 65:
                this.x -= 8;
                tmp.style.left = `${this.x}px`;
                console.log(asteroidArr[0].y, tmp.y)
                break;
            case 68:
                this.x += 8;
                tmp.style.left = `${this.x}px`;
                break;  
            case 87:
                this.y -= 8;
                tmp.style.top = `${this.y}px`;
                break
            case 83:
                this.y += 8;
                tmp.style.top = `${this.y}px`;
                break
        }
        
    }
}

class Asteroid{
    constructor(x,y,counter,movingX=-6,movingY=0){
        this.x = x;
        this.y = y;
        this.id = counter
        this.movingX = movingX;
        this.movingY = movingY
        asteroidArr.push(this)
    }

    create(){
        let tmp = document.createElement('div');
        tmp.classList.add(`asteroid`,`id_${this.id}`)
        tmp.style.left = `${this.x}px`;
        tmp.style.top =`${this.y}px`;
        body.appendChild(tmp)
    }

    move() {
        let tmp = body.querySelector(`.id_${this.id}`)
        if (this.x >= 0){
            this.x += this.movingX;
            tmp.style.left = `${this.x}px`;
        }
    } 

    remove(){
        let tmp = body.querySelector(`.id_${this.id}`)
        tmp.parentNode.removeChild(tmp)
        points += 1
        asteroidArr.shift()
       }


}


function setup(){

    if (playerArr.length === 0){
        player = new Player(150,150)
        player.render()
    }
    if (points < 6){
        if (asteroidArr.length < 4){
            counter++
            let asteroid = new Asteroid(document.body.clientWidth,Math.floor(Math.random()*(document.body.clientHeight)),counter)
            asteroid.create()
        }    
    }
    if (points > 6){
        if (asteroidArr.length < 8){
            counter++
            let asteroid = new Asteroid(document.body.clientWidth,Math.floor(Math.random()*(document.body.clientHeight)),counter,-10)
            asteroid.create()
        }    
    }

}



function game() {
timer++
 if(timer===300) {
        timer=0
        setup()
 }
 asteroidArr.forEach(element => {
    element.move()
        if (element.x <= 0) {
            element.remove()
            setup()
            }
        if (element.x <= (player.x+150) && element.x >= player.x){
            if (element.y <= (player.y+100) && element.y+100 >=(player.y) ){
            cancelAnimationFrame(repeater)
            repeater = false;
            body.querySelector('.over').textContent = `GAME OVER - you passed ${points} asteroids`
            body.querySelector('.over').style.visibility = 'visible'
            
            }
           }
     })
//start the animation again
if (repeater != false){
    repeater = requestAnimationFrame(game)
}
     
}
setup()
game()
// let start = setInterval(game,1300)
body.addEventListener('keydown',(e) => {player.move(e)})
