import * as LightsOut from './LightsOut.js'

const ROW_LEN = 5
const COL_LEN = ROW_LEN
const board = LightsOut.createBoard(ROW_LEN , COL_LEN,2,0)
// document.getElementById("reset-button").onclick = "createBoard(4, 4, 3, 0)"

function startGame() {
    console.log(board)

    const boardElem = document.querySelector('.board')
    const colours = []

    boardElem.style.setProperty("--num-cols", COL_LEN)
    boardElem.style.setProperty("--num-rows", ROW_LEN)

    LightsOut.displayBoard(board, boardElem)

    console.log(boardElem)
}

startGame()