const submitBtn = document.querySelector("#submit")
const input = document.querySelector("#input")
const errorSpan = document.querySelector("#error")
const resultsContainer = document.querySelector("#results")

const disabled = () => {
    input.disabled = true
    submitBtn.disabled = true
}

const enabled = () => {
    input.disabled = false
    submitBtn.disabled = false
}

const clearPreviousResults = () => {
    resultsContainer.innerHTML = ''
    errorSpan.innerHTML = ''
}

const isInputEmpty = (input) => {
    if(!input || input == '')
    {
        return true;
    }
    else return false;
}

const showError = () => {
    errorSpan.innerHTML = `${error}`
}
