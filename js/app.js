const buttonEl = document.getElementById('start')

// playfield
let board
const boardWidth = 360
const boardHeight = 640
let context

// bird
const birdWidth = 34
const birdHeight = 24
const birdX = boardWidth / 8
const birdY = boardHeight / 2
let birdImg = new Image()
birdImg.src = "../img/flappybird.png"
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// pipes
let pipes = []
let pipeWidth = 64
let pipeHeight = 512
let pipeX = boardWidth
let pipeY = 0
let topPipeImg
let bottomPipeImg
topPipeImg = new Image()
topPipeImg.src = "../img/toppipe.png"
bottomPipeImg = new Image()
bottomPipeImg.src = "../img/bottompipe.png"

// game physics
let velocityX = -2
let velocityY = 0
let gravity = 0.2

let gameOver = false
let score = 0

function game() {
    board = document.getElementById('board')
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext('2d') // drawing on page 
    
    birdImg.addEventListener('load', function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    })

    requestAnimationFrame(update)
    setInterval(placePipes, 1500)
    this.document.addEventListener('keydown', moveBird)
}

buttonEl.addEventListener('click', game)

function update() {
    requestAnimationFrame(update)
    if (gameOver) {
        return
    }
    context.clearRect(0,0, board.width, board.height)

    // bird
    velocityY += gravity
    bird.y = Math.max(bird.y + velocityY, 0)
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    
    if (bird.y > board.height) {
        gameOver = true
    }

    // pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i]
        pipe.x += velocityX
        context.drawImage( pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 1
            pipe.passed = true
        }
        if (detectCollision(bird, pipe)) {
            gameOver = true
        }
    }

    while (pipes && pipes[0].x < -pipeWidth) {
        pipes.shift()
    }

    context.fillStyle = "white"
    context.font = "45px sans-serif"
    context.fillText(score, 5, 45)

    if (gameOver) {
        context.fillText("GAME OVER",5,90)
    }

}

function placePipes() {
    if (gameOver) {
        return
    }
    let randomPipeY =  - Math.floor((Math.random() * pipeHeight/2)) - pipeHeight/4
    let gap = board.height / 4

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        passed: true
    }

    pipes.push(topPipe)
    pipes.push(bottomPipe)
}

function moveBird(e) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
        velocityY = -6
    }
}

function detectCollision(a,b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}