const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

const trackslimit = 5
const getTypes = {
    'tracks': {
        'url': (term)=>{return `${baseURL}?q=${term}&type=track&limit=${trackslimit}`},
        'type': 'track',
        'sectionID': 'tracks',
        'template': trackTemplate,
        'ifEmpty': "No tracks found that match your search."
    },
    'albums': {
        'url': (term)=>{return `${baseURL}?q=${term}&type=album&limit=10`},
        'type': 'album',
        'sectionID': 'albums',
        'template': albumTemplate,
        'ifEmpty': "No albums found that match your search."
    },
    'artist': {
        'url': (term)=>{return `${baseURL}?q=${term}&type=artist&limit=1`},
        'type': 'artist',
        'sectionID': 'artist',
        'template': artistTemplate,
        'ifEmpty': "No artists found that match your search."
    },
    'albumtracks': {
        'url': (album)=>{return `https://www.apitutor.org/spotify/v1/albums/${album.id}/tracks?limit=${trackslimit}`},
        'type': 'specialtrack',
        'limit': 5,
        'sectionID': 'tracks',
        'template': trackTemplate,
        'ifEmpty': "No tracks found in that album."
    },
    'artisttracks': {
        'url': (artist)=>{return `https://www.apitutor.org/spotify/v1/artists/${artist.id}/top-tracks?country=us&limit=${trackslimit}`},
        'type': 'specialtrack',
        'limit': 5,
        'sectionID': 'tracks',
        'template': trackTemplate,
        'ifEmpty': "No tracks found by that artist."
    }
}

function search(ev) {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    get(getTypes.tracks, term);
    get(getTypes.albums, term);
    get(getTypes.artist, term);
    if (ev) {
        ev.preventDefault();
    }
}

async function get(getType, input) {
    const url = getType.url(input)
    const data = await fetch(url)
    const section = document.getElementById(getType.sectionID)

    data.json().then(
        function (values) {
            console.log(values) // remove this later
            section.innerHTML = ""

            if (values.length == 0) {
                section.innerHTML = getType.ifEmpty
                return
            }
          
            if (getType.type == 'artist' && !('image_url' in values[0])) {
                values[0].image_url = ""
            }
            if (getType.type == 'track') {
                document.querySelector('#artist-section>h1').innerText = "Top Result"
            }
            if (getType.type == 'specialtrack') {
                values = values.items
            }
        
            for (v of values) {
                const template = getType.template(v)

                section.insertAdjacentElement("beforeend", template)
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

// Load default
get(getTypes.tracks, "");
get(getTypes.albums, "");
get(getTypes.artist, "");