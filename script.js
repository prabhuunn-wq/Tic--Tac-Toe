let xScore = 0
let oScore = 0

document.getElementById("xScore").innerText = xScore
document.getElementById("oScore").innerText = oScore

const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

const WINNING_COMBINATIONS = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restartButton")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")

let circleTurn = false
let startWithCircle = false

startGame()

restartButton.addEventListener("click", startGame)

function startGame(){

circleTurn = startWithCircle
startWithCircle = !startWithCircle

cellElements.forEach(cell => {

cell.classList.remove(X_CLASS)
cell.classList.remove(CIRCLE_CLASS)
cell.classList.remove("win")

cell.removeEventListener("click", handleClick)
cell.addEventListener("click", handleClick,{once:true})

})

winningMessageElement.classList.remove("show")

}

function handleClick(e){

const cell = e.target
const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

placeMark(cell,currentClass)

if(checkWin(currentClass)){
endGame(false)
}
else if(isDraw()){
endGame(true)
}
else{
swapTurns()
}

}

function endGame(draw){

if(draw){
winningMessageTextElement.innerText = "Draw!"
}
else{

winningMessageTextElement.innerText =
`${circleTurn ? "⭕" : "❌"} Player Wins!`

celebrateWin()

if(circleTurn){
oScore++
document.getElementById("oScore").innerText = oScore
}
else{
xScore++
document.getElementById("xScore").innerText = xScore
}

}

winningMessageElement.classList.add("show")

}

function isDraw(){

return [...cellElements].every(cell=>{
return cell.classList.contains(X_CLASS) ||
cell.classList.contains(CIRCLE_CLASS)
})

}

function placeMark(cell,currentClass){

cell.classList.add(currentClass)

}

function swapTurns(){

circleTurn = !circleTurn

}

function checkWin(currentClass){

return WINNING_COMBINATIONS.some(combination=>{

const win = combination.every(index=>{
return cellElements[index].classList.contains(currentClass)
})

if(win){
combination.forEach(index=>{
cellElements[index].classList.add("win")
})
}

return win

})

}

const resetBtn = document.getElementById("resetScore")

resetBtn.addEventListener("click",()=>{

xScore = 0
oScore = 0

document.getElementById("xScore").innerText = xScore
document.getElementById("oScore").innerText = oScore

})

function celebrateWin(){
confetti({
particleCount:150,
spread:90,
origin:{y:0.6}
})
}