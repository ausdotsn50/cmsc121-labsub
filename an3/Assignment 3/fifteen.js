/*
    Solution to CMSC 121 Assignment 3
    Purpose: Practicing DOM manipulation skills in Javascript to create a simple sliding puzzle game
    Written by: Angela Denise Almazan
*/
"use strict";

(function() {
    // Init
    window.addEventListener('load', init);

    // Create a function that could be easily remembered etc.
    function init() {
        const puzzleArea = document.getElementById('puzzlearea');

        // Modifying inline style of the puzzlearea with a 
        // display flex + wrap to force next line
        puzzleArea.style.display = 'flex';
        puzzleArea.style.flexWrap = 'wrap';
        puzzleArea.style.rowGap = '2px'; // Added rowgap for better look

        // To do: Add classlist puzzle piece to each div in puzzle area
        const pieceList = puzzleArea.children;
        const ppClass = 'puzzlepiece';

        let hCtr = 0, vCtr = 0;
        Array.from(pieceList).forEach(element => {
            if(!element.classList.contains(ppClass)) {
                element.classList.add(ppClass);
            }
            element.style.position = 'relative'; // Breaks the steady position of each tile
            // Value: horizontal px vertical px
            // To do: dynamic x & y positioning of background image for tiles
            element.style.backgroundPosition = `${hCtr*25}% ${vCtr*25}%`
            hCtr++;

            if(hCtr == 4) { hCtr = 0; vCtr++; }
        });

        // To do: shuffling mechanism
        const shuffleBtn = document.getElementById('shufflebutton');
        shuffleBtn.addEventListener('click', function(event) {
            for (let i = pieceList.length; i >= 0; i--) {
                puzzleArea.appendChild(pieceList[Math.floor(Math.random() * i)]);
            }
        });

        
    }
})();

