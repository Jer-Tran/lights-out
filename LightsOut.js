
export function createBoard(rows, cols, states, seed) {
    const board = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            const tile = {i, j}

            if ((j + i) % 2 == 0) {
                row.push(1)
            } else {
                row.push(0)
            }
            
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

export function displayBoard(board) {
    console.log(board)
}
