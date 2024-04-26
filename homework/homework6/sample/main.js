const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

function search(ev) {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

async function getTracks(term) {
    const url = `${baseURL}?q=${term}&type=track&limit=5`
    const data = await fetch(url)
    const section = document.getElementById("tracks")

    data.json().then(
        function (value) {
            console.log(value)
            section.innerHTML = ""

            if (value.length == 0) {
                section.innerHTML = "No tracks found that match your search."
                return
            }
            for (track of value) {
                const template = `<section class="track-item preview">
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h2>${track.name}</h2>
                    <p>
                        ${track.artist.name}
                    </p>
                </div>
            </section>`

                section.innerHTML += template
            }
        },
        function (error) { section.innerHTML = `Error: ${error}` }
    )
}

async function getAlbums(term) {
    const url = `${baseURL}?q=${term}&type=album&limit=10`
    const data = await fetch(url)
    const section = document.getElementById("albums")

    data.json().then(
        function (value) {
            console.log(value)
            section.innerHTML = ""

            if (value.length == 0) {
                section.innerHTML = "No albums found that match your search."
                return
            }
            for (album of value) {
                const template = `<section class="album-card" id="${album.id}">
                    <div>
                        <img src="${album.image_url}">
                        <h2>${album.name}</h2>
                        <div class="footer">
                            <a href="${album.spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`

                section.innerHTML += template
            }
        },
        function (error) { section.innerHTML = `Error: ${error}` }
    )
}

async function getArtist(term) {
    const url = `${baseURL}?q=${term}&type=artist&limit=1`
    const data = await fetch(url)
    const section = document.getElementById("artist")

    data.json().then(
        function (value) {
            console.log(value)
            section.innerHTML = ""

            if (value.length == 0) {
                section.innerHTML = "No artists found that match your search."
                return
            }
            const artist = value[0]
            if (!('image_url' in artist)) {
                artist.image_url = ""
            }
            const template = `<section class="artist-card" id="${artist.id}">
                    <div>
                        <img src="${artist.image_url}">
                            <h2>${artist.name}</h2>
                            <div class="footer">
                                <a href="${artist.spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                    </div>
                </section>`
                
            section.innerHTML += template
        },
        function (error) { section.innerHTML = `Error: ${error}` }
    )
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};