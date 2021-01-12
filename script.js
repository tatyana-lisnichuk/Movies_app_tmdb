"use strict";
const apiKey = '46fc595d017e09e4226ce08880c734d3';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const apiImg = 'https://image.tmdb.org/t/p/w500';
const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const main = document.querySelector('main');
const form = document.querySelector('#form');
const footer = document.querySelector('footer');

let searchBtn = document.getElementById('search-by-title-btn');
let resetBtn = document.getElementById('search-by-title-reset');
let userTitleInput = document.getElementById('title-input');


searchBtn.addEventListener('click', searchMovie);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  searchMovie();

});

resetBtn.addEventListener('click', searchReset);

getMovies(apiUrl);

function getMovies(url) {
  fetch(url)
    .then(function (resp) { return resp.json(); })
    .then(function (data) {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(movies) {
  //удаляю вывод всех фильмов
  main.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement('div');
    const img = apiImg + movie.poster_path;
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${img}" alt="${movie.title}">
      <div class="movie-info">
      <h3>${movie.title}</h3>
      <span>${movie.vote_average}</span>
      </div>
      <button type="button" class="btn btn-primary btn-sm movie-btn about-btn">About</button>
      `;
    main.appendChild(movieEl);
  });
  const aboutBtn = document.getElementsByClassName('about-btn');

  for (let movie = 0; movie < movies.length; movie++){
    aboutBtn[movie].addEventListener('click', function (movie) {
      // console.log(`movie info`);
      footer.innerHTML = "";
      const movieInfo = document.createElement('div');
      movieInfo.innerHTML = `
    
      <p>${movie.title}</p>
    
      `;
      footer.appendChild(movieInfo);
      console.log(movieInfo.value);
    });
    // }
  }
 
    // .catch(function () {
    //   //catch any errors
    // });
}


function searchReset() {
  main.innerHTML = ``;
  getMovies(apiUrl);
  
}
function searchMovie(event) {
  event.preventDefault();
  console.log('search');
  let title = userTitleInput.value;
  if (title) {
    getMovies(apiSearch + title);
//очищаем инпут после поиска
    userTitleInput.value = " ";
  }

}