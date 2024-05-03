function trackTemplate(track) {
    let element = document.createElement('section')
    element.className = "track-item preview"
    element.innerHTML = `<img src="${track.album.image_url}" alt="Album art for ${track.name}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
            <h2>${track.name}</h2>
            <p>
                ${track.artist.name}
            </p>
        </div>`

    element.querySelector('img').addEventListener('click', () => {updateEmbeddable(track)})

    return element
}

function updateEmbeddable(track) {
    let section = document.getElementById("artist")
    document.querySelector("#artist-section>h1").innerText = "Now Playing"

    section.innerHTML = `<iframe style="border-radius:12px" 
    src="https://open.spotify.com/embed/track/${track.id}?utm_source=generator"
    width="100%" 
    height="352" 
    frameBorder="0" 
    allowfullscreen="" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
    loading="lazy"></iframe>`
}

function albumTemplate(album) {
    let element = document.createElement('section')
    element.className = 'album-card'
    element.id = album.id

    element.innerHTML = `<div>
        <img src="${album.image_url}" alt="Album art for ${album.name}">
        <h2>${album.name}</h2>
        <div class="footer">
            <a href="${album.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>`

    element.querySelector('img').addEventListener('click', () => {get(getTypes.albumtracks, album)})
    
    return element
}

function artistTemplate(artist) {
    let element = document.createElement('section')
    element.className = "artist-card"
    element.id = artist.id
    
    element.innerHTML = `<div>
        <img src="${artist.image_url}" alt="Image for ${artist.name}">
        <h2>${artist.name}</h2>
        <div class="footer">
            <a href="${artist.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>`

    element.querySelector('img').addEventListener('click', () => {get(getTypes.artisttracks, artist)})

    return element
}

function albumTrackTemplate(track, album) {
    let element = document.createElement('section')
    element.className = "track-item preview"

    let artistnames = ""
    for (const a of track.artists){
        artistnames += a.name + ", "
    }
    artistnames = artistnames.substring(0, artistnames.length-2)

    element.innerHTML = `<img src="${album.image_url}" alt="Album art for ${track.name}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
            <h2>${track.name}</h2>
            <p>
                ${artistnames}
            </p>
        </div>`

    element.querySelector('img').addEventListener('click', () => {updateEmbeddable(track)})

    console.log(element)

    return element
}

function artistTrackTemplate(track) {
    let element = document.createElement('section')
    element.className = "track-item preview"

    let artistnames = ""
    for (const a of track.artists){
        artistnames += a.name + ", "
    }
    artistnames = artistnames.substring(0, artistnames.length-2)

    element.innerHTML = `<img src="${track.album.images[2].url}" alt="Album art for ${track.name}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
            <h2>${track.name}</h2>
            <p>
                ${artistnames}
            </p>
        </div>`

    element.querySelector('img').addEventListener('click', () => {updateEmbeddable(track)})

    return element
}