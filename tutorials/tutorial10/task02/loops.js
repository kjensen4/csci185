const containerEl = document.querySelector("#output_container");

function drawImagesDifferent() {
    if (containerEl.innerHTML != "") {
        return
    }
    
    for (let i = 0; i < 50; i++) {
        const myTemplate = `<img src="https://picsum.photos/200/200?random=${i+1}">`;
        containerEl.insertAdjacentHTML("beforeend", myTemplate);
    }
}

function clearContainer() {
    containerEl.innerHTML = "";
}
