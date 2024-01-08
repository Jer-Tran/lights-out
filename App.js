import * as LightsOut from './LightsOut.js'

const ROW_LEN = 5
const COL_LEN = ROW_LEN
const board = LightsOut.createBoard(ROW_LEN , COL_LEN,2,0)
// document.getElementById("reset-button").onclick = "createBoard(4, 4, 3, 0)"

console.log(board)

const boardElem = document.querySelector('.board')
const colours = []

boardElem.style.setProperty("--num-cols", COL_LEN)
boardElem.style.setProperty("--num-rows", ROW_LEN)

board.forEach(row => {
    const rowElem = document.createElement("div")
    rowElem.className = "row"
    row.forEach(tile => {

        const elem = document.createElement("div")
        // elem.innerHTML = tile
        elem.className = "tile"
        elem.dataset.status = tile

        // Can't figure out how to make this function work
        elem.onclick = console.log(5)

        rowElem.append(elem)
    })
    boardElem.append(rowElem)
});

console.log(boardElem)