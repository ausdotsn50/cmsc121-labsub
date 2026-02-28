document.addEventListener("DOMContentLoaded", function() {
    const BASE_URL = "http://localhost:8080/babynames/babynames.php?type"
    const allNamesContainer = id('allnames');
    const disabledOpt = allNamesContainer.firstElementChild;
    disabledOpt.setAttribute('disabled', true);

    const meaning = id('meaning'); // Inject the meaning of the word here
    const resultsArea = id('resultsarea');
    const search = id('search');
    const graph = id('graph');
    const celebs = id('celebs');
    const nrd = id('norankdata');
    const errors = id('errors');

    const loadingNames = id('loadingnames'); const loadingMeaning = id('loadingmeaning');
    const loadingGraph = id('loadinggraph'); const loadingCelebs = id('loadingcelebs');

    const radioM = id('genderm'); const radioF = id('genderf');

    let allNames = [];
    let gender = radioM.checked && !radioF.checked ? 'male' : 'female';
    let currBaby = allNamesContainer.value;
    
    // Change event listener for search value
    allNamesContainer.addEventListener('change', ()=> {
        currBaby = allNamesContainer.value;
    });

    [radioM, radioF].forEach(radio => {
        radio.addEventListener('change', () => {
            gender = radioM.checked ? 'male' : 'female';
        });
    });

    // Putting the loading functionality buffer for every 'search'
    search.addEventListener('click', ()=> {
        if(currBaby === '') { return; }

        resultsArea.show();
        getNameMeaning();
        getPopularity(); // To do: getPopularity & celebrities with the first name function
        celebFromDB();
    });

    async function getNameMeaning() {
        meaning.innerHTML = '';
        loadingMeaning.show();

        const response = await makeRequest(`=meaning&name=${currBaby}`);
        const text = await response.text();
        
        loadingMeaning.hide();
        meaning.innerHTML = text;
    }

    // Parsing XML data
    async function getPopularity() {
        graph.innerHTML = ''; 
        nrd.hide();
        loadingGraph.show();
        const response = await makeRequest(`=rank&name=${currBaby}&gender=${gender}`);

        if(response?.error) {
            loadingGraph.hide();
            switch(response.error) {
                case '410':
                    nrd.show();
                    break;
            }
            return; 
        }

        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        let ranks = xmlDoc.getElementsByTagName('rank');
        let ranksObj = Array.from(ranks).map(node => ({
            year: node.getAttribute('year'),
            rankVal: node.textContent
        }));

        loadingGraph.hide();
        displayGraph(ranksObj);
    }

    // display graph in table style id(graph)
    function displayGraph(ranksObj) {
        // If graph is non-empty, clear it first
        const headerRow = ce('tr');
        const bodyRow = ce('tr');
        
        ranksObj.forEach(rank => {
            const yearHeader = ce('th'); yearHeader.textContent = rank.year;
            
            const rData = ce('td'); const rDiv = ce('div');
            rDiv.classList.add('bar');
            
            if(rank.rankVal >= 1 && rank.rankVal <= 10) { rDiv.style.color = 'red'; }
            let height = rank.rankVal > 0 ? parseInt((1000 - rank.rankVal) / 4) : 0;
            rDiv.style.height = `${height}px`;

            rDiv.textContent = rank.rankVal;
            rData.appendChild(rDiv);      

            headerRow.appendChild(yearHeader);
            bodyRow.appendChild(rData);
        });

        graph.appendChild(headerRow);
        graph.appendChild(bodyRow);        
    }

    // Done extracting celebs from database
    // Listing celeb names, and film#
    async function celebFromDB() {
        celebs.innerHTML = '';  loadingCelebs.show();
        
        const response = await makeRequest(`=celebs&name=${currBaby}&gender=${gender}`);
        const celebJson = await response.json();

        for(c of celebJson.actors) {
            const celebLI = ce('li');
            celebLI.textContent = `${c.firstName} ${c.lastName} (${c.filmCount} films)`;
            celebs.appendChild(celebLI);
        }
        loadingCelebs.hide();
    }
    
    async function listBabyNames() {
        const response = await makeRequest("=list");
        const text = await response.text();

        allNames = text.split("\n").filter(name => name.trim() !== "");
        allNames.forEach(name => {
            let opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            allNamesContainer.appendChild(opt);
        });

        loadingNames.hide();
        allNamesContainer.removeAttribute('disabled');
    }

    async function makeRequest(type) {
        let url = "http://localhost:8080/babynames/babynames.php?type=" + type;
        let result;
        errors.innerHTML = '';
        try {
            result = await fetch(url); result = await statusCheck(result);
        } catch(err) {
            errors.textContent = `An error with HTTP status code ${err.message} has occurred.`;
            return { error: err.message }
        } return result;
    }

    async function statusCheck(res) {
        if(!res.ok) {
            throw new Error(res.status);
        } return res;
    }

    // Create an init() function here
    listBabyNames();
});

// Helper functions
function id(str) { return document.getElementById(str); }
function qsa(str) { return document.querySelectorAll(str); }
function ce(str) { return document.createElement(str); }