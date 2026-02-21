/*
 * CSE 154 Section Exercise - Whack a Bug
 * Handles whacking bugs.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    // Vars used in init overall
    let totalSpawned = 0; 
    let timer;

    const bugsAtATime = 20;
    const row = 4, col = 5;
    const takenPositions = [];
    const sizes = ['5em', '10em', '15em'];

    const bugContainer = id('bug-container');
    bugContainer.innerHTML = '';

    // Change display
    setGridDisplay(bugContainer, row, col);
    initBugs();

    /**
     * Spawns the initial set of bugs and starts the infinite game interval.
     */
    function initBugs() {
      // Spawn initial 5 bugs
      for (let i = 0; i < 5; i++) {
        spawnBug();
      }

      // Check every second: if under 20, spawn a new one
      timer = setInterval(() => {
        if (totalSpawned < 20 && timer) {
          spawnBug();
        }
      }, 1000);
    }

    /**
     * Creates a new bug, finds an empty spot, and adds it to the DOM.
     */
    function spawnBug() {
      let bug = ce('img');
      bug.src = 'bug.png';
      
      const dim = sizes[getRandom(sizes.length)];
      bug.style.width = dim;
      bug.style.height = dim;

      /* Avoid duplicate positioning */
      let posKey;
      let randRow, randCol;
      do {
        randRow = getRandom(row) + 1;
        randCol = getRandom(col) + 1;
        posKey = `${randRow}-${randCol}`;
      } while (takenPositions.includes(posKey));

      // Update state
      takenPositions.push(posKey);
      bug.dataset.pos = posKey; 
      totalSpawned++;

      // Style and event listener
      bug.style.gridRow = randRow;
      bug.style.gridColumn = randCol;
      bug.addEventListener('click', whackBug);

      bugContainer.appendChild(bug);
    }

    /**
     * Handles the click event on a bug.
     * @param {Event} event - the click event object.
     */
    function whackBug(event) {
      const clickedBug = event.currentTarget; // Assigned currentTarget to a const var instead

      if (!clickedBug.classList.contains("whacked")) {
        clickedBug.classList.add("whacked");
        clickedBug.src = "bug-whacked.png";

        // Remove position from tracking so a new bug can spawn
        const posIndex = takenPositions.indexOf(clickedBug.dataset.pos);
        if (posIndex > -1) {
          takenPositions.splice(posIndex, 1);
        }
        
        // Remove the bug from the DOM after 250ms
        setTimeout(() => {
          clickedBug.remove();
          totalSpawned--;
        }, 250);

        // Changed score update 
        let score = id("score");
        let currentScore = parseInt(score.textContent) || 0;
        score.textContent = currentScore + 1;

        if(currentScore + 1 === bugsAtATime) {
          clearInterval(timer);
          timer = null;
          removeBugListeners();
          qs("#game p").textContent = "~ You win ~";
        }
      }
    }

    function removeBugListeners() {
      let bugs = bugContainer.querySelectorAll('img'); 
      
      bugs.forEach(bug => {
        bug.removeEventListener('click', whackBug);
        bug.style.cursor = "default";
      });
    }

    /**
     * Configures the container to use CSS Grid instead of def. Flex
     */
    function setGridDisplay(container, r, c) {
      container.style.display = 'grid';
      container.style.gridTemplateRows = `repeat(${r}, 1fr)`;
      container.style.gridTemplateColumns = `repeat(${c}, 1fr)`;
    }

    /**
     * Helper to get a random integer.
     * Used in randrow, randcol, randsize
     */
    function getRandom(limit) {
      return Math.floor(Math.random() * limit);
    }
  }
  
  // Reduced helper functions to only the ones used
  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Creates element given the tag
   * @param {string} name - HTML tag
   * @returns {object} - DOM object created
   */
  function ce(tag) {
    return document.createElement(tag);
  }
})();