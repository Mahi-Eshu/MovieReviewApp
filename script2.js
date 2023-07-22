const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const WATCH_API = 'https://moviesdatabase.p.rapidapi.com/titles/series/%7BseriesId%7D'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
// const btn = document.getElementById('btn')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div> 
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `
        // movieEl.addEventListener('click', () => {
        //     openModal(movie);
        // });

        main.appendChild(movieEl)
    })
}

// function openModal(movie) {
//     const modalContent = document.getElementById('modal-content');
//     modalContent.innerHTML = `
//       <a href="https://www.youtube.com/watch?v=${movie.trailer_id}" target="_blank">Watch Trailer</a>
//       <button class="close-btn" onclick="closeModal()">Close</button>
//     `;
  
//     // Show the modal
//     const modal = document.getElementById('modal');
//     modal.style.display = 'block';
// }

// function closeModal() {
//     const modal = document.getElementById('modal');
//     modal.style.display = 'none';
// }

function getClassByRate(vote){
    if(vote>=8){
        return 'green' 
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }else{
        window.location.reload()
    }
})



