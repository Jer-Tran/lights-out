import * as LightsOut from './LightsOut.js'

const DEFAULT_LEN = 5
const DEFAULT_DARK = 0x2e2e2e
const DEFAULT_LIGHT = 0xffffff


function ColourStrToHex(str) {
    return parseInt(str.replace(/^#/, ''), 16)
}

function ColourHexToStr(hex) {
    let str = hex.toString(16)
    // Not sure if this is correct or not in terms of how colour hexa works
    while (str.length < 6) {
        str = "0" + str
    }
    return "#" + str
}

// Takes in hexadecimal values
function interpColour(low, high, alpha) {
    const r1 = low >> 16
    const r2 = high >> 16
    const g1 = (low & 0xff00) >> 8
    const g2 = (high & 0xff00) >> 8
    const b1 = low & 0xff
    const b2 = high & 0xff

    const r3 = r1 * (1 - alpha) + r2 * alpha
    const g3 = g1 * (1 - alpha) + g2 * alpha
    const b3 = b1 * (1 - alpha) + b2 * alpha

    const res = r3 << 16 | g3 << 8 | b3
    return res
}

function createColorDiv(colour) {
    const elem = document.createElement("div")
    const inp = document.createElement("input")
    inp.type = 'color'
    inp.className = 'color'
    if (typeof(colour) == "string") {
        inp.value = colour
    }
    else {
        inp.value = ColourHexToStr(colour)
    }
    elem.append(inp)
    return elem
}

function insertColorDiv(div) {
    document.getElementById("colours-div").append(div)
}

function extractColours() {
    const colours = []
    let a = document.getElementsByClassName("color")
    for (let i = 0; i < a.length; i++) {
        colours.push(a[i].value)
    }
    return colours
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

function remakeColourDivs() {
    if (document.getElementById("states-in").value == "") {
        return
    }
    document.getElementById("colours-div").innerHTML = ""
    const states = document.getElementById("states-in").valueAsNumber
    console.log(states)
    for (let i = 0; i < states; i++) {
        const alpha = i / (states - 1)
        const colour = interpColour(DEFAULT_LIGHT, DEFAULT_DARK, alpha)
        const elem = createColorDiv(colour)
        insertColorDiv(elem)
    }
}

// A hacky fix for a problem of intervals becoming lost
// https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals
function stopTimers() {
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
    }
}

function resetTime() {
    stopTimers()
    startTime = new Date().getTime()
    setTime() // So it automatically updates
    timerInterval = setInterval(setTime, 1000)
}

function getTimeStr(time) {
    const min = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const sec = Math.floor((time % (1000 * 60)) / 1000);
    if (sec < 10) {
        return min + ":0" + sec
    } else {
        return min + ":" + sec
    }
    return ""
}

function setTime() {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown
    const diff = (new Date().getTime()) - startTime
    document.getElementById("timer").firstElementChild.innerHTML = "Time: " + getTimeStr(diff)
}

export function playMove(move) {
    // Check if move is repeat of the last
    if (move == lastMove) {
        moves -= 1
        lastMove = null
    }
    else {
        moves += 1
        lastMove = move
    }
    document.getElementById("moves").firstElementChild.innerHTML = "Moves: " + moves
    if (LightsOut.isComplete(board)) {
        win()
    }
    else {
        document.getElementById("win").style.display = "none"
    }
}

function resetMoves() {
    moves = 0
    document.getElementById("moves").firstElementChild.innerHTML = "Moves: " + moves
}

function startGame() {
    // Do nothing if input params aren't valid
    if (document.getElementById("width-in").value == "" ||
        document.getElementById("height-in").value == ""||
        document.getElementById("states-in").value == "") {
        console.log("invalid input")
        document.getElementById("input-warning").style.display = "block"
        return
    }

    document.getElementById("input-warning").style.display = "none"
    document.getElementById("win").style.display = "none"
    
    const rows = document.getElementById("height-in").valueAsNumber;
    const cols = document.getElementById("width-in").valueAsNumber;
    const states = document.getElementById("states-in").valueAsNumber;

    const colours = extractColours()
    board = LightsOut.createBoard(rows, cols, colours.length, 0)

    const boardElem = document.querySelector('.board')

    boardElem.style.setProperty("--num-cols", cols)
    boardElem.style.setProperty("--num-rows", rows)

    LightsOut.displayBoard(board, boardElem, colours)
    resetTime()
    resetMoves()
}

function createVictoryScreen() {
    const elem = document.getElementById("win")
    elem.innerHTML = ""
    const timeDiff = (new Date().getTime()) - startTime
    let winMessage = "Congratulations! Beaten in " + getTimeStr(timeDiff) + " using " + moves + " moves"
    elem.append(winMessage)
}

function win() {
    stopTimers()
    createVictoryScreen()
    document.getElementById("win").style.display = "block"
}

let board = null
var startTime
var timerInterval
let moves = 0
var lastMove = null
// prepareDefaults()
remakeColourDivs()
startGame()

document.getElementById("colours-div").style.display = "none" // To fix a small issue between css and applying the style here
document.getElementById("win").style.display = "none"
document.getElementById("states-in").onchange = remakeColourDivs
document.getElementById("colours-toggle").onclick = showColours
document.getElementById("restart").onclick = startGame;