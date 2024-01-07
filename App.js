import * as LightsOut from './LightsOut.js'

const board = LightsOut.createBoard(5,5,2,0)
// document.getElementById("reset-button").onclick = "createBoard(4, 4, 3, 0)"

console.log(board)

const boardElem = document.querySelector('.board')
console.log(boardElem)

board.forEach(row => {
    row.forEach(tile => {
        const elem = document.createElement("div")
        elem.innerHTML = "0"
        boardElem.append(elem)
    })
});