const containerEl = document.querySelector("#output_container");

let lock = false

async function showSong() {
    if (lock == true) {return} 
    lock = true // it would be very difficult to click a second time before this runs on the first

    if (containerEl.innerHTML != "") {
        clearContainer()
    }

    const searchTerm = "Will Wood";
    const url = `https://www.apitutor.org/spotify/simple/one/v1/search?q=${searchTerm}&type=track`;
    const response = await fetch(url);
    const song = await response.json();

    let template = `<section class="song">
        <h2>${song.name}</h2>
        <img src=${song.album.image_url}>
        <p>${song.artist.name}</p>
        <audio controls src=${song.preview_url}></audio>
        </section>`
    containerEl.insertAdjacentHTML("beforeend", template)

    lock = false
}

function clearContainer() {
    containerEl.innerHTML = "";
}
