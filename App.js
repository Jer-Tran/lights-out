import * as LightsOut from './LightsOut.js'

const DEFAULT_LEN = 5
let board = null

export function startGame() {
    // Do nothing if input params aren't valid
    if (document.getElementById("width-in").value == "" ||
        document.getElementById("height-in").value == "") {
        console.log("invalid")
        document.getElementById("input-warning").style.display = "block"
        return
    }
    console.log(document.getElementById("color").value)
    document.getElementById("input-warning").style.display = "none"
    
    let rows = document.getElementById("height-in").valueAsNumber;
    let cols = document.getElementById("width-in").valueAsNumber;
    
    const colours = ["#c8c8c8", "#ffffff"]
    board = LightsOut.createBoard(rows, cols, colours.length, 0)

    const boardElem = document.querySelector('.board')

    boardElem.style.setProperty("--num-cols", cols)
    boardElem.style.setProperty("--num-rows", rows)

    LightsOut.displayBoard(board, boardElem, colours)

}

startGame()

document.getElementById("restart").onclick = startGame;
