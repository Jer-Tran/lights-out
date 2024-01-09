
export function createBoard(rows, cols, states, seed) {
    const board = []
    for (let y = 0; y < rows; y++) {
        const row = []
        for (let x = 0; x < cols; x++) {
            const elem = document.createElement("div")
            elem.className = "tile"

            // Can't figure out how to make this function work
            // elem.onclick = console.log(5)

            elem.dataset.status = Math.floor(Math.random() * states)

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
    return false
}

export function isClearable(board) {
    return true
}

export function selectTile(board, tile) {
    // Band-aid solution, better it there was some verification somewhere
    if (tile != undefined && board != undefined) {
        console.log(tile.x)
        console.log(board)
        toggleTile(board[tile.y][tile.x])
    }
}

function toggleTile(tile) {
    if (tile.status == "0") {
        tile.status = "1"
    } else {
        tile.status = "0"
    }
}

export function displayBoard(board, div) {
    // Clear board
    let child = div.lastElementChild;
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }

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
        })
        div.append(rowElem)
    });
}
