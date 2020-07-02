const canvas = document.getElementById("canvas")
const canvas2 = document.getElementById("canvas2")
const fruit = document.getElementById("fruit")

const ctx = canvas.getContext("2d")
const ctx2 = canvas2.getContext("2d")

ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
//properties
let box = 30
let score = 0
let model = true

// snake and food properties

const dead = new Audio()
const eat = new Audio()
const left = new Audio()
const right = new Audio()
const up = new Audio()
const down = new Audio()

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"
up.src = "audio/up.mp3"

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box,
}

let food = {
  x: Math.floor(Math.random() * 20) * 30,
  y: Math.floor(Math.random() * 20) * 30,
}

let d
let snakeX
let snakeY
document.addEventListener("keydown", direction)

function direction(e) {
  //  console.log(e.key)

  if (e.key === "ArrowLeft" && d != "RIGHT") {
    left.play()
    d = "LEFT"
  } else if (e.key === "ArrowRight" && d != "LEFT") {
    right.play()
    d = "RIGHT"
  } else if (e.key === "ArrowUp" && d != "DOWN") {
    up.play()
    d = "UP"
  } else if (e.key === "ArrowDown" && d != "UP") {
    down.play()
    d = "DOWN"
  }
}

function collison(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true
  }

  return false
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "yellow"
    ctx.fillRect(snake[i].x, snake[i].y, box, box)

    ctx.strokeStyle = "red"
    ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }
  ctx.drawImage(fruit, food.x, food.y, box, box)

  // console.log(food.x)

  snakeX = snake[0].x
  snakeY = snake[0].y

  // which direction
  if (d == "LEFT") snakeX -= box
  if (d == "UP") snakeY -= box
  if (d == "RIGHT") snakeX += box
  if (d == "DOWN") snakeY += box

  if (snakeX === food.x && snakeY === food.y) {
    score++
    console.log(score)

    eat.play()
    food = {
      x: Math.floor(Math.random() * 20) * 30,
      y: Math.floor(Math.random() * 20) * 30,
    }
  } else {
    snake.pop()
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  if (
    snakeX < 0 ||
    snakeX > box * 19 ||
    snakeY < 0 ||
    snakeY > box * 19 ||
    collison(newHead, snake)
  ) {
    dead.play()
    clearInterval(game)
    let result = confirm("game over!, Wanna play again?")
    if (result === true) {
      location.reload()
      // model = true
    }
  }

  // console.log(d)

  //game over

  // console.log(newHead.x, newHead.y)
  snake.unshift(newHead)

  //console.log(snake[0].x, snake[0].y)

  //requestAnimationFrame(draw)
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height)

  //Scorecard
  ctx2.font = "20px ariel"
  ctx2.fillStyle = "white"
  ctx2.fillText("Score", 20, 50)

  ctx2.font = "25px Verdana"
  ctx2.fillStyle = "white"
  ctx2.fillText(score, 90, 50, 20, 30)
}

game = setInterval(draw, 100)

const level1 = document.getElementById("level1")
const level2 = document.getElementById("level2")

level1.addEventListener("click", () => {
  model = false
  console.log(model)
  callAgain()
})

level2.addEventListener("click", () => {
  model = false
  console.log(model)
  callAgain()
})

console.log(model)

function callAgain() {
  if (!model) {
    level1.style.display = "none"
    level2.style.display = "none"
    console.log(level1)
  }
}
