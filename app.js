const grid = document.querySelector(".grid")
const relutDisplay = document.querySelector('.result')
let currentShooterIndex = 202
const width = 15
let direction = 1
let InvadersId
let goingRight = true
let currentLaserIndex
let aliensRemove = []


for(let i = 0; i < 255; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}


const squares = Array.from(document.querySelectorAll(".grid div"))

const allinInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]



function draw(){
    for(let i = 0; i < allinInvaders.length; i++){
        if(!aliensRemove.includes(i)) {
            squares[allinInvaders[i]].classList.add('invaders')

        }
    }
}
draw()

function remove(){
    for(let i = 0; i < allinInvaders.length; i++){
        squares[allinInvaders[i]].classList.remove('invaders')
    }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e){

    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
            case 'ArrowRight':
                if(currentShooterIndex % width < width -1) currentShooterIndex +=1
                break
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener("keydown", moveShooter)



function moveIvaders(){
    const leftEdge = allinInvaders[0] % width === 0
  const rightEdge = allinInvaders[allinInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < allinInvaders.length; i++) {
      allinInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < allinInvaders.length; i++) {
      allinInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }


    for (let i = 0; i < allinInvaders.length; i++) {
        allinInvaders[i] += direction
    }

    draw()
    

if(squares[currentShooterIndex].classList.contains("invaders", "shooter")) {
    console.log("gameover")
    clearInterval(InvadersId)
    relutDisplay.innerHTML = "GAME OVER"
}


for(let i= 0; i < allinInvaders.length; i++ ) {
if(allinInvaders[i] > (squares.length)){
    relutDisplay.innerHTML = 'GAME OVER'
    clearInterval(InvadersId)
}
}

if(allinInvaders.length === aliensRemove.length) {
    relutDisplay.innerHTML = "You Won"
    clearInterval(InvadersId)
}

 
}

InvadersId = setInterval(moveIvaders, 500)


function shoot(e) {
    let  laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains("invaders")){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invaders')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=> squares[currentLaserIndex].classList.remove("boom"),300)
            clearInterval(laserId)

            const alienRemove = allinInvaders.indexOf(currentLaserIndex)
            aliensRemove.push(alienRemove)


        }

      
    }

    switch(e.key) {
        case"ArrowUp": 
        laserId = setInterval(moveLaser, 100)
    }

}
document.addEventListener('keydown', shoot)