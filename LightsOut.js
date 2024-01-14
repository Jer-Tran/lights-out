import { playMove } from './App.js'

var colours = []

export function createBoard(rows, cols, states, seed) {
    const board = []
    for (let y = 0; y < rows; y++) {
        const row = []
        for (let x = 0; x < cols; x++) {
            const elem = document.createElement("div")
            elem.className = "tile"

            // elem.dataset.status = Math.floor(Math.random() * states)
            elem.dataset.status = "0"

            const tile = {
                elem,
                x,
                y,
                get status() {
                    return this.elem.dataset.status
                },
                set status(value) {
                    this.elem.dataset.status = value
                },
            }  
            row.push(tile)
            
        }
        board.push(row)
    }
    return board
}

export function isComplete(board) {
    var lastState = null
    // forEach won't work here, as the return doesn't return for the function
    for (let i = 0; i < board.length; i++) {
        let row = board[i]
        for (let j = 0; j < row.length; j++) {
            let tile = row[j]
            if (tile.elem.dataset.status != lastState && lastState != null) {
                return false
            }
            lastState = tile.elem.dataset.status
        }
    }
    return true
}

export function isClearable(board) {
    return true
}

function getTilePos(tile) {
    return tile.x + " " + tile.y
}

export function selectTile(board, tile) {
    // Band-aid solution, better it there was some verification somewhere
    if (tile != undefined && board != undefined) {
        let tiles = getAdjacentTiles(board, tile)
        tiles.forEach(t => {
            toggleTile(t)
        })
        playMove(getTilePos(tile))
    }
}

function getAdjacentTiles(board, tile) {
    const tiles = []
    board.forEach(row => {
        row.forEach(t => {
            // If the coords make the cross shape (+)
            if ( (t.x == tile.x && Math.abs(t.y - tile.y) <= 1) ||
                 (Math.abs(t.x - tile.x) <= 1 && t.y == tile.y)) 
            {
                tiles.push(t)
            }
        })
    })
    return tiles
}

function toggleTile(tile) {
    const states = colours.length
    tile.status = ((parseInt(tile.status) + 1) % states).toString()
    adjustTileColour(tile)
}

function adjustTileColour(tile) {
    const index = parseInt(tile.elem.dataset.status)
    tile.elem.style.backgroundColor = colours[index]
    // tile.elem.innerHTML = tile.elem.dataset.status // Useful debug
}

export function displayBoard(board, div, _colours) {
    // Clear board
    let child = div.lastElementChild;
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }
    colours = _colours

    // Display tiles
    board.forEach(row => {
        const rowElem = document.createElement("div")
        rowElem.className = "row"
        row.forEach(tile => {
            rowElem.append(tile.elem)
            tile.elem.onclick = selectTile
            tile.elem.addEventListener("click", () => {
                selectTile(board, tile)
            })
            adjustTileColour(tile)
        })
        div.append(rowElem)
    });
}
