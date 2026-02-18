"use strict";

(function() {
    // js code
    window.addEventListener('load', init);

    function init() {
        // this code executes only after the entire DOM is loaded by the browser

        // Text in the main text area will get larger
        // alert("hello world");

        // Changes to 24pt
        const biggerBtn = document.getElementById('bigger-btn');
        biggerBtn.addEventListener('click', makeBig);

        // Reference to the main text area
        const mainTextArea = document.getElementById('main-ta');
        function makeBig() {
            mainTextArea.style.fontSize = "24pt";
        }

        // The text in the text area becomes bold + other properties
        // When the box is unchecked, the style should go back to normal
        const blingBtn = document.getElementById('bling');
        blingBtn.addEventListener('change', applyBling);
        
        let blingED = false;
        let animation;
        function applyBling() {
            if(!blingED) {
                mainTextArea.classList.add('bling');

                animation = setInterval(function() {
                    mainTextArea.style.visibility = (mainTextArea.style.visibility == 'hidden' ? '' : 'hidden');
                }, 500); 
                blingED = true;
            } else {
                // Reset here
                clearInterval(animation);
                mainTextArea.classList.remove('bling');
                blingED = false;
            }
        }

        const snoopBtn = document.getElementById('snoopify');
        snoopBtn.addEventListener('click', applySnoopify);

        // Breakdown the words
        // Print with -izzle
        function applySnoopify() {
            const valOfTextArea = mainTextArea.value;
            const wordArr = valOfTextArea.split(".");

            console.log(wordArr);
            for(let i = 0; i < wordArr.length - 1; i++) {
                wordArr[i] = wordArr[i].toUpperCase() + '-izzle';
            }

            console.log(wordArr);
            mainTextArea.value = wordArr.join("") + "!";
        }
    }
})();

