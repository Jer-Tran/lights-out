import * as LightsOut from './LightsOut.js'

const DEFAULT_LEN = 5
let board = null
const DEFAULT_DARK = 0x7f7f7f
const DEFAULT_LIGHT = 0xffffff

function createColorDiv(colour) {
    const elem = document.createElement("div")
    const inp = document.createElement("input")
    inp.type = 'color'
    inp.className = 'color'
    inp.value = colour
    elem.append(inp)
    return elem
}

function extractColours() {
    const colours = []
    let a = document.getElementsByClassName("color")
    for (let i = 0; i < a.length; i++) {
        colours.push(a[i].value)
    }
    return colours
}

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

    // const colours = extractColours()
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

function showColours() {
    const elem = document.getElementById("colours-div")
    if (elem.style.display == "none") {
        elem.style.display = "flex"
    }
    else {
        elem.style.display = "none"
    }
}

startGame()

document.getElementById("colours-div").style.display = "none" // To fix a small issue between css and applying the style here
document.getElementById("colours-toggle").onclick = showColours
document.getElementById("restart").onclick = startGame;
console.log(createColorDiv())
// document.getElementById("colours-div").append(createColorDiv("#c7c7c7"))