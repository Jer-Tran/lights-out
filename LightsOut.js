
export function createBoard(rows, cols, states, seed) {
    const board = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            const elem = document.createElement("div")
            elem.className = "tile"

            // Can't figure out how to make this function work
            elem.onclick = console.log(5)

            elem.dataset.status = Math.floor(Math.random() * states)

            const tile = {
                elem,
                get status() {
                    return this.element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
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

export function selectTile(board, row, col) {
    return board
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
        })
        div.append(rowElem)
    });
}
