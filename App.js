import * as LightsOut from './LightsOut.js'

const ROW_LEN = 5
const COL_LEN = ROW_LEN

export function startGame() {
    const board = LightsOut.createBoard(ROW_LEN , COL_LEN,2,0)
    console.log(board)

    const boardElem = document.querySelector('.board')
    const colours = []

    boardElem.style.setProperty("--num-cols", COL_LEN)
    boardElem.style.setProperty("--num-rows", ROW_LEN)

    LightsOut.displayBoard(board, boardElem)

    console.log(boardElem)
}

startGame()

document.getElementById("restart").onclick = startGame;
