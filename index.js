'use strict';

const IMDB = {
  NAME: 'imdb',
  BASE_URL: 'http://www.theimdbapi.org/api/find/movie?'
};
const NYT = {
  NAME: 'nyt',
  BASE_URL: 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?',
  KEY: '9b85bd3d754d4f91a251f25992575fdf'
};
const METACRITIC = {
  NAME: 'metacritic',
  BASE_URL: 'https://api-marcalencc-metacritic-v1.p.mashape.com/search',
};

// const FANDANGO = {
//    NAME: 'fangdango',
//    BASE_URL:
//    KEY:
// }

/**
 * Initiates calls to the three unique APIs in our app.
 * @param {string} query
 */
function initiateGetRequests(query) {
  renderLoading();
  getFromApi(IMDB, query).then(function(data) {
  renderImdb(data);
    console.log(data);
  }).fail(function (err) {
    const errorMsg = `<div class="imdb-results">
      <h3>Zzzzz! The IMDB is sleeping right now.<br> Check back later.</h3>
      </div>
    `;
  $('.js-search-results-imdb').html(errorMsg);
    console.log(err.statusText);
  });
  getFromApi(NYT, query).then(function(data) {
  console.log(data);
  renderNyt(data);
}).fail(function(err) {
  const errorMsgNyt = `<div class="nyt-results">
    <h3>Opps! The New York Times is sleeping right now. Check back later.</h3>
    </div>
  `;
$('.js-search-results-imdb').html(errorMsgNyt);
});
}
/**
 * Makes a call to a single API.
 * @param {Object} apiConfig - Information about an API
 * @param {string} apiConfig.NAME
 * @param {string} apiConfig.BASE_URL
 * @param {string} [apiConfig.KEY] - Optional. Necessary for accessing some APIs.
 * @param {string} query - A film or TV show title.
 * @param {getJSONCb} handleData - Callback which processes the API data if the request is successful.
 *
 *
 * @callback getJSONCb - Processes sussessful get requests.
 * @param {Object} data - The data returned by the API.
 */
function getFromApi(apiConfig, query, handleData) {
  let queryObj;
  console.log(apiConfig);
  if (apiConfig.NAME === 'nyt') {
    console.log('talking to the nyt!!');
    queryObj = {
      'api-key': apiConfig.KEY,
      query: query
    };
  }
  if (apiConfig.NAME === 'imdb') {
    console.log('talking to imdb');
    queryObj = {
      title: query
    };
  }
  if (apiConfig.NAME === 'metacritic') {
    console.log('talking to metacritic');
    queryObj = {
      "dash-separated-search-string": query,
      mediatype: "movie",
    };
  }
  return $.getJSON(apiConfig.BASE_URL, queryObj);
}

function cleanMovieData(data) {
  const cleanedMovies = [data[0]];
  return cleanedMovies;
}

function renderLoading() {
  $('.js-search-results-imdb, .js-search-results-nyt').html(`<div class="imdb-results">
  <div class="loading-container">
  <div class="dot dot-1"></div>
  <div class="dot dot-2"></div>
  <div class="dot dot-3"></div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
    </filter>
  </defs>
</svg>`)
};

function renderImdb(data) {
  console.log(data);
  const imdbResults = `<div class="imdb-results">
    <h2>${data[0].title}</h2>
    <h3>Rating: ${data[0].content_rating}</h3>
    <img src="${data[0].poster.thumb}"><a href="${data[0].url}"></a>
    <p>${data[0].description}</p>
    </div>
    <p>Rating: ${data[0].rating}</p><p>Rating Count: ${data[0].rating_count}</p>
    <p>Director: ${data[0].director}</p>
    <p>Writer: ${data[0].writers}</p>
  `;
  $('.js-search-results-imdb').html(imdbResults);
}

function renderNyt(data) {
  const first = data.results[0];
  console.log(data.results);
  const nytResults = `<div class="nyt-results">
  <h2>${first.display_title}</h2>
  <h3><a href="${first.link.url}">${first.headline}</a></h3>
  <h3>Rating: ${first.mpaa_rating}</h3>
  <img src="${first.multimedia.src}">
  <p>${first.summary_short}</p>
  </div>
 `
  console.log($("js-search-results-nyt"));
  $('.js-search-results-nyt').html(nytResults);
}
  $(".js-search-results-nyt").html()


$('.js-search-form').on('submit', event => {
  event.preventDefault();

  const queryTarget = $(event.currentTarget).find('.js-query');
  const query = queryTarget.val();
  queryTarget.val('');
  initiateGetRequests(query);
});

//getFromApi(NYT, 'coco', function(data){
//  console.log(data);
// })
