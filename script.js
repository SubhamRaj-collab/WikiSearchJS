const submitBtn = document.querySelector("#submit");
const input = document.querySelector("#input");
const errorSpan = document.querySelector("#error");
const resultsContainer = document.querySelector("#results");

const endpoint = 'https://en.wikipedia.org/w/api.php';

const params = {
    origin: '*',
    action: 'query',
    prop: 'extracts',
    format: 'json',
    exchars: 250,
    exintro: true,
    explaintext: true,
    generator: 'search',
    gsrlimit: 20
};

const disable = () => {
    input.disabled = true
    submitBtn.disabled = true
};

const enable = () => {
    input.disabled = false
    submitBtn.disabled = false
};

const clearPreviousResults = () => {
    resultsContainer.innerHTML = ''
    errorSpan.innerHTML = ''
};

const isInputEmpty = (input) => {
    if(!input || input == '')
    {
        return true;
    }
    else return false;
};

const showError = (error) => {
    errorSpan.innerHTML = `🚨${error}🚨`
};

const handleKeyEvent = (e) => {

    if(e.key === 'Enter')
    {
        getData()
    }

};

const showResults = (results) => {
    results.forEach(result => {
        resultsContainer.innerHTML += `
        <div class="results__item">
            <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp">
                <h2 class="results__item__title">${result.title}</h2>
                <p class="results__item__intro">${result.intro}</p>
            </a>
        </div>
    `;
    });
};

const gatherData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract
    }));

    showResults(results);
};

const getData = async () => {
    const userInput = input.value

    if(isInputEmpty(userInput))return 

    params.gsrsearch = userInput
    clearPreviousResults();
    disable();

    try{
        const { data } = await axios.get(endpoint, { params });
        // console.log(data);

        if(data.error) throw new Error(data.error.info)

        gatherData(data.query.pages);
    }
    catch(error)
    {
        showError(error)
    }
    finally{
        enable()
    }

}

const registerEventHandlers = () => {
    input.addEventListener('keydown', handleKeyEvent)
    submitBtn.addEventListener('click', getData)
}

registerEventHandlers()