// d128c81d MY Api key
$('.search-button').on('click', function (params) {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=d128c81d&s=" + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';

            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);

            // If button  click
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: "http://www.omdbapi.com/?apikey=d128c81d&i=" + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });


        },
        error: (e) => console.log(e.responseText)
    });

});



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


function showMovieDetail(m) {
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