const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

const getTypes = {
    'tracks': {
        'type': 'track',
        'limit': '5',
        'sectionID': 'tracks',
        'template': (track) => {
            return `<section class="track-item preview">
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h2>${track.name}</h2>
                    <p>
                        ${track.artist.name}
                    </p>
                </div>
            </section>`
        },
    },
    'albums': {
        'type': 'album',
        'limit': '10',
        'sectionID': 'albums',
        'template': (album) => {
            return `<section class="album-card" id="${album.id}">
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
        },
    },
    'artist': {
        'type': 'artist',
        'limit': '1',
        'sectionID': 'artist',
        'template': (artist) => {
            return `<section class="artist-card" id="${artist.id}">
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
        },
    }
}

function search(ev) {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    get(getTypes.tracks, term,);
    get(getTypes.albums, term);
    get(getTypes.artist, term);
    if (ev) {
        ev.preventDefault();
    }
}

async function get(getType, term) {
    const url = `${baseURL}?q=${term}&type=${getType.type}&limit=${getType.limit}`
    const data = await fetch(url)
    const section = document.getElementById(getType.sectionID)

    data.json().then(
        function (values) {
            console.log(values)
            section.innerHTML = ""

            if (values.length == 0) {
                section.innerHTML = `No ${getType.type}s found that match your search.`
                return
            }
          
            if (getType.type == 'artist' && !('image_url' in values[0])) {
                values[0].image_url = ""
            }
        
            for (v of values) {
                const template = getType.template(v)

                section.innerHTML += template
            }
        },
        function (error) { section.innerHTML = `Error: ${error}` }
    )
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};