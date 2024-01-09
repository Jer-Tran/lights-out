import * as LightsOut from './LightsOut.js'

const ROW_LEN = 5
const COL_LEN = ROW_LEN
let board = null

export function startGame() {
    board = LightsOut.createBoard(ROW_LEN , COL_LEN,2,0)

    const boardElem = document.querySelector('.board')
    const colours = []

    boardElem.style.setProperty("--num-cols", COL_LEN)
    boardElem.style.setProperty("--num-rows", ROW_LEN)

    LightsOut.displayBoard(board, boardElem)

    console.log(board)
}

startGame()

document.getElementById("restart").onclick = startGame;
