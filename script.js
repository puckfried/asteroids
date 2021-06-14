let body = document.querySelector('body')
let asteroidArr =[]
let playerArr =[]
let player;
let asteroid;
let timer = 0
let repeater;

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
    constructor(x,y,movingX=-6,movingY=0){
        this.x = x;
        this.y = y;
        this.movingX = movingX;
        this.movingY = movingY
        asteroidArr.push(this)
    }

    create(){
        let tmp = document.createElement('div');
        tmp.classList.add('asteroid')
        tmp.style.left = `${this.x}px`;
        tmp.style.top =`${this.y}px`;
        body.appendChild(tmp)
    }

    move() {
        let tmp = body.querySelector('.asteroid')
        if (this.x >= 0){
            this.x += this.movingX;
            tmp.style.left = `${this.x}px`;
        }
    } 

    remove(){
        let tmp = body.querySelector('.asteroid')
        tmp.parentNode.removeChild(tmp)
        asteroidArr.length=0;
       }


}


function setup(){
    if (playerArr.length === 0){
        player = new Player(150,150)
        player.render()
    }
    if (asteroidArr.length === 0){
        asteroid = null;
        asteroid = new Asteroid(1400,Math.floor(Math.random()*(document.body.clientHeight)))
        asteroid.create()
    }    
}



function game() {

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
            body.querySelector('.over').style.visibility = 'visible'
            }
           }
     })
if (repeater != false){
    repeater = requestAnimationFrame(game)
}
     
}
setup()
game()
// let start = setInterval(game,1300)
body.addEventListener('keydown',(e) => {player.move(e)})
