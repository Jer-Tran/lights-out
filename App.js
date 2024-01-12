import * as LightsOut from './LightsOut.js'

const DEFAULT_LEN = 5
let board = null
const DEFAULT_DARK = 0x7f7f7f
const DEFAULT_LIGHT = 0xffffff

export function startGame() {
    // Do nothing if input params aren't valid
    if (document.getElementById("width-in").value == "" ||
        document.getElementById("height-in").value == ""||
        document.getElementById("states-in").value == "") {
        console.log("invalid input")
        document.getElementById("input-warning").style.display = "block"
        return
    }
    // var col = document.getElementById("color").value
    // console.log(parseInt(col.replace(/^#/, ''), 16))
    document.getElementById("input-warning").style.display = "none"
    
    const rows = document.getElementById("height-in").valueAsNumber;
    const cols = document.getElementById("width-in").valueAsNumber;
    const states = document.getElementById("states-in").valueAsNumber;

    // const colours = ["#c8c8c8", "#ffffff"]
    const colours = []
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    for (let i = 0; i < states; i++) {
        // Very broken, I want it by default to give greyscale but some values result in weird colours
        let val = Math.floor(lerp(DEFAULT_LIGHT, DEFAULT_DARK, i / (states - 1))).toString(16)
        while (val.length < 6) {
            val = "0" + val
        }
        colours.push("#" + val)
    }
    board = LightsOut.createBoard(rows, cols, colours.length, 0)

    const boardElem = document.querySelector('.board')

    boardElem.style.setProperty("--num-cols", cols)
    boardElem.style.setProperty("--num-rows", rows)

    LightsOut.displayBoard(board, boardElem, colours)

}

startGame()

document.getElementById("restart").onclick = startGame;
