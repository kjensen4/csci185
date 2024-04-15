const nameList = [
    "Atlas",
    "Avery",
    "Cali",
    "Cameron",
    "Carol",
    "Dean",
    "Destiny",
    "Dylan",
    "Heather",
    "Jack",
    "Joe",
    "Keiran",
    "Kelly",
    "Maria",
    "Merlin",
    "Natasha",
    "Nicholas",
    "Olivia",
    "Rinta",
    "Trey",
];

const containerEl = document.querySelector('#output_container') 

function printNames() {
    if (containerEl.innerHTML != "") {
        return
    }
    
    for (const n of nameList) {
        let newP = `<p>${n}</p>`
        containerEl.insertAdjacentHTML("beforeend", newP)
    }
}

function clearNames() {
    containerEl.innerHTML = ''
}
