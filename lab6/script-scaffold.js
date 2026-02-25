const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');
const loader = document.getElementById('loader');
const resultsDiv = document.getElementById('results');

// Only modify the JS file
// Minimal CSS
// HTML as is

const clear = document.createElement('button');
clear.textContent = 'Clear';
searchBtn.after(clear);

clear.addEventListener('click', () => {
    wordInput.value = '';
    resultsDiv.replaceChildren();
    wordInput.focus();
});

searchBtn.addEventListener('click', async () => {
    const word = wordInput.value.trim();
    if (!word) return;

    // Exercise 1. Reset UI & Show Spinner
    // add code below
    try {
        // Exercise 2. Fetch Data from https://unofficialurbandictionaryapi.com/api/search?term=search_key}

        const response = await fetch(`https://unofficialurbandictionaryapi.com/api/search/?term=${word}&`).then(
            loader.style.display = 'block' // Show the element
        );

        // 2.1 Manual error check (Fetch quirk!)
        // make sure to check if the response is ok before proceeding
        // otherwise throw an Error here, like throw new Error('Search failed');
        if (!response.ok) {
            throw new Error('Search failed');
        }

        // Exercise 3. Render Results
        // call and pass the definitions data to display results
        // displayResults(data);
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    } finally {
        // Hide the spinner no matter what
        loader.style.display = 'none';
    }
});

searchBtn.addEventListener('mouseenter', ()=> {
    
});

searchBtn.addEventListener('mouseleave', ()=> {

});

function displayResults(entries) {
    if (!entries || entries.length === 0) {
        resultsDiv.innerHTML = '<p>No definitions found.</p>';
        return;
    }

    for(entry of entries) {
        console.log(entry)

        let eDiv = document.createElement('div');
        eDiv.classList.add('entry');

        let word = document.createElement('h3');
        word.textContent = entry.word;

        let meaning = document.createElement('p');
        meaning.textContent = entry.meaning;

        let example = document.createElement('div');
        example.classList.add('example');
        example.textContent = entry.example;

        let contrib = document.createElement('p');
        contrib.textContent =  `Contributed by ${entry.contributor} on ${entry.date}`

        eDiv.append(word, meaning, example, contrib);
        resultsDiv.appendChild(eDiv);
    }

    // Exercise 4: Create the HTML of the results
    // use the following template
    // wrap each definition, inside the ff:
    //      <div class="entry">
        //      <h3>${word}</h3>
        //         <p>${meaning}</p>
        //         <div class="example">"${example}"</div>
        //         <p>Contributed by ${contributor} on ${date}</p>
    //      </div>
}