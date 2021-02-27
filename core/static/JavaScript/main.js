const url = 'https://itunes.apple.com/search?term='
const form = document.querySelector('#search-form')
const searchResults = document.querySelector('.search-results')
const player = document.querySelector('audio-player')


form.addEventListener('submit', (event) => {
    event.preventDefault()
    clearSearch()
    let searchInput = document.querySelector('.search-bar').value
    console.log('searchInput is', searchInput)



    function search() {
        // fetch ('nonsense') to verify error catch
        fetch ('https://itunes.apple.com/search?term=' + searchInput + '&wrapperType="song"')
        .then(resp => resp.json())
        .then (data => {
            console.log(data.results)
            if (data.results.length > 0) {
                for (let music of data.results) {
                    renderMusicItem(music);
                }
            } else {
                console.log('no results')
                const noResultsEl = document.createElement('div');
                noResultsEl.innerText = 'Sorry! No results.';
                searchResults.appendChild(noResultsEl);
            } 
        })
        .catch(error => {
            console.log('error is', error)
            catchError() })
    }
    search()

})



function renderMusicItem(music) {
    const musicEl = document.createElement('div')
    musicEl.className = 'music-card'


    let title = music.trackName
    const trackEl = document.createElement('h4')
    trackEl.innerText = title
    musicEl.appendChild(trackEl)

    
    
    let artist = music.artistName
    const artistEl = document.createElement('h4')
    artistEl.innerText = artist
    musicEl.appendChild(artistEl)

    
    
    let album = music.collectionName
    const albumEl = document.createElement('p')
    albumEl.innerText = album
    musicEl.appendChild(albumEl)

    
    
    let albumArt = music.artworkUrl100
    const albumArtEl = document.createElement('img')
    albumArtEl.src = albumArt
    musicEl.appendChild(albumArtEl)


    const playButton = document.createElement('button')
    playButton.innerText = 'Preview'



    let playAudio = document.createElement('div')
    playAudio.className = 'play-button'
    playAudio.dataset.previewUrl = music.previewUrl // save attribute in the data set
    playAudio.appendChild(playButton)
    musicEl.appendChild(playAudio)
    
    
    searchResults.appendChild(musicEl)

    playButton.addEventListener('click', (event) => {
        playSong(event.target)        
    })
}



function playSong(button){
    let audio = document.querySelector('audio')
    console.log(audio)
        audio.src = button.parentElement.dataset.previewUrl
        console.log(button.parentElement.dataset.previewUrl)
    } 



function clearSearch () {
    let musics = document.querySelectorAll('.music-card')
    console.log(document.querySelectorAll('.music-card'))
    for (let song of musics) {
        song.remove();
    }
}    


function catchError() {
    const errorEl = document.createElement('div')
    errorEl.innerText = 'Error! Try your request again.'
    searchResults.appendChild(errorEl)

}