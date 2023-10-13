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
let birdImg
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

// game physics
let velocityX = -2


window.addEventListener('load', function() {
    board = document.getElementById('board')
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext('2d') // drawing on page 

    // load image
    birdImg = new Image()
    birdImg.src = "../img/flappybird.png"
    birdImg.addEventListener('load', function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    })

    topPipeImg = new Image()
    topPipeImg.src = "../img/toppipe.png"

    bottomPipeImg = new Image()
    bottomPipeImg.src = "../img/bottompipe.png"

    requestAnimationFrame(update)
    setInterval(placePipes, 1500)
})

function update() {
    requestAnimationFrame(update)
    context.clearRect(0,0, board.width, board.height)

    // bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    
    // pipes.forEach((pipe) => {
    //     pipe.x += velocityX
    //     context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
    // })

    // pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i]
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
    }
}

function placePipes() {
    
    let randomPipeY = pipeY - pipeHeight/4

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipes.push(topPipe)
}