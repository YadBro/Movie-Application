// d128c81d MY Api key
// $('.search-button').on('click', function (params) {
//     $.ajax({
//         url: "http://www.omdbapi.com/?apikey=d128c81d&s=" + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';

//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards);

//             // If button  click
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: "http://www.omdbapi.com/?apikey=d128c81d&i=" + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });


//         },
//         error: (e) => console.log(e.responseText)
//     });

// });


const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    /* Input keyword (await) to variable movies. untuk bilang ke javascriptnya jangan dulu masukin hasil function getMovies ke dalam variable movies
    .
    Karena di dalamnya berupa promise pending. Apabila promise sudah siap maka masukkan ke dalam variable movies.
    */
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);

});

// Asyncronous Function 
/*
    Because this function is asyncronous function. We are tell javascript this function is asyncronous function with input keyword name (async)
*/
function getMovies(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=d128c81d&s=" + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m =>
        cards += showCards(m)
    );
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}






// Menampilkan element yang belum ada tapi ketika ada akan ditampilkan
// Event Binding
document.addEventListener('click', function (e) {
    // Cek jika ketemu element modal dengan kelas modal-detail-button
    if (e.target.classList.contains('modal-detail-button')) {
        // ambil data dari attribute html data terus nama datanya apa, lalu masukkan kedalam variable imdbID
        const imdbID = e.target.dataset.imdbid;
        const getMovieDetail = showMovieDetail(imdbID);

        updateUIDetail(getMovieDetail);
    }
})

// Asyncronous function
async function showMovieDetail(imdbID) {
    const response = await fetch("http://www.omdbapi.com/?apikey=d128c81d&i=" + imdbID);
    const movieData = await response.json();
    return movieData;
}

function updateUIDetail(movieData) {
    // Simpan ke dalam card
    const movieDetailCards = showMovieDetailCard(movieData)
    // Dapatkan modal body yang nantinya card showMovieDetail dimasukkan.
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetailCards;
}




function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${(m.Poster == 'N/A' ? 'https://www.kindpng.com/picc/m/383-3830611_transparent-clap-png-clip-art-movie-clapper-board.png' : m.Poster)}" class="card-img-top">
                    <div class="card-body">
                        <h5 id="title" class="card-title">${m.Title}</h5>
                        <h6 id="year" class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}


function showMovieDetailCard(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${(m.Poster == 'N/A' ? 'https://www.kindpng.com/picc/m/383-3830611_transparent-clap-png-clip-art-movie-clapper-board.png' : m.Poster)}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} (${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}