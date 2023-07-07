let links = []

const saveEL = document.getElementById("save-btn")
const deleteEl = document.getElementById("delete-btn")
const tabEl = document.getElementById("tab-btn")
const inputEl = document.getElementById("textfield")
const ulEl = document.getElementById("ul-el")

const dataFromLocalStorage = JSON.parse(localStorage.getItem("links"))

if(dataFromLocalStorage) {
    links = dataFromLocalStorage
    saveLink(links)
}

function saveLink(myLinks) {
    let list = ""
    for(let i = 0; i < links.length; i++) {
        list += `
        <li> 
            <a target = '_blank' href = '${myLinks[i]}'>
                ${myLinks[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = list
}

saveEL.addEventListener("click", function() {
    links.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("links", JSON.stringify(links))
    saveLink(links)
})

deleteEl.addEventListener("click", function() {
    localStorage.clear()
    links = []
    saveLink(links)
})

tabEl.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links))
        saveLink(links)   
    })
})

