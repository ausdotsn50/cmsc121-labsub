/*
    Solution to CMSC 121 Assignment 3
    Purpose: Practicing DOM manipulation skills in Javascript to create a simple sliding puzzle game
    Written by: Angela Denise Almazan
*/
"use strict";

(function() {
    window.addEventListener('load', init);

    function init() {
        const rows = 4, cols = 4;
        const puzzleArea = document.getElementById('puzzlearea');
        const pieceList = Array.from(puzzleArea.children);
        
        // Initially, empty slot is in row4, col4
        let emptySlot = { row: 4, col: 4 };
        
        setToGrid(puzzleArea);
        initTiles();

        // Abstracted away funcs
        function setToGrid(container) {
            container.style.display = 'grid';
            container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
            container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            container.style.gap = '2px';
        }
        
        // Initialize tiles w/ fixed bg + row/col coords
        function initTiles() {
            pieceList.forEach((tile, index) => {
                tile.classList.add('puzzlepiece');
                
                let r = Math.floor(index / cols) + 1; // Grid starts frm idx=1
                let c = (index % cols) + 1;

                // Ref to tile dataset (will be used for move tile logic)
                tile.dataset.origin = `${r}-${c}`; //?
                tile.dataset.row = r;
                tile.dataset.col = c;
                tile.style.gridRow = r; // Style purposes
                tile.style.gridColumn = c;

                // Background positioning using perc: (0, 25, 50, 75%)
                // Uses background.jpg
                let bgX = (index % cols) * 25;
                let bgY = Math.floor(index / cols) * 25;
                tile.style.backgroundPosition = `${bgX}% ${bgY}%`;
                
                // Hover effect on mouseenter/mouseleave
                tile.addEventListener('click', moveTile); // Add event listener for tiles (move tile logic)
                tile.addEventListener('mouseenter', () => {
                    if (isMovable(tile)) {
                        tile.classList.add('movablepiece'); 
                    }
                });

                tile.addEventListener('mouseleave', () => {
                    tile.classList.remove('movablepiece');
                });
            });
        }

        function isMovable(tile) {
            const tileRow = parseInt(tile.dataset.row);
            const tileCol = parseInt(tile.dataset.col);

            // use of Manhattan Distance formula
            // target tile row & empty slot
            const distance = Math.abs(tileRow - emptySlot.row) + Math.abs(tileCol - emptySlot.col);
            
            return distance === 1 ? true : false;
        }
        
        // Move tile logic
        function moveTile(e) {
            const tile = e.target;
            const tileRow = parseInt(tile.dataset.row);
            const tileCol = parseInt(tile.dataset.col);
            
            if (isMovable(tile)) {
                const oldRow = tileRow;
                const oldCol = tileCol;

                // Move tile visually to the empty slot
                tile.style.gridRow = emptySlot.row;
                tile.style.gridColumn = emptySlot.col;

                // Update tile's coords
                tile.dataset.row = emptySlot.row;
                tile.dataset.col = emptySlot.col;

                // Tile's OLD position is now the NEW empty slot
                emptySlot.row = oldRow;
                emptySlot.col = oldCol;

                setTimeout(() => {
                    checkWinCondition(); // Delay to let browser paint full puzzle
                }, 10);
            }
        }

        // Altering positions set in initTile()
        function shuffle() {
            let positions = [];
            for (let r = 1; r <= rows; r++) {
                for (let c = 1; c <= cols; c++) {
                    positions.push({ r, c });
                }
            }

            // Fisher-Yates Shuffle
            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }

            // Assign the first 15 shuffled positions to actual tiles
            pieceList.forEach((tile, index) => {
                const pos = positions[index];
                
                tile.dataset.row = pos.r;
                tile.dataset.col = pos.c;
                tile.style.gridRow = pos.r;
                tile.style.gridColumn = pos.c;
            });

            // index 15 as the new emptySlot
            const lastPos = positions[(rows*cols)-1];
            emptySlot.row = lastPos.r;
            emptySlot.col = lastPos.c;
        }

        function checkWinCondition() {
            // Check if every tile is back to original pos
            const gameWon = pieceList.every(tile => {
                const currentPos = `${tile.dataset.row}-${tile.dataset.col}`;
                return currentPos === tile.dataset.origin;
            });

            if (gameWon) {
                alert("Congratulations! You solved the puzzle!");
            }
        }

        const shuffleBtn = document.getElementById('shufflebutton');
        shuffleBtn.addEventListener('click', shuffle);
    }
})();