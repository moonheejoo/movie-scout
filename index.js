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

/**
 * Initiates calls to the three unique APIs in our app.
 * @param {string} query
 */
function initiateGetRequests(query) {
  getFromApi(IMDB, query, function(data) {
  renderImdb(data);
    console.log(data);
  });
  getFromApi(NYT, query, function(data) {
  renderNyt(data);
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
  $.getJSON(apiConfig.BASE_URL, queryObj, handleData);
}

function cleanMovieData(data) {
  const cleanedMovies = [data[0]];
  return cleanedMovies;
}

function renderImdb(data) {
  console.log(data);
  const imdbResults = `<div class="render-results-imdb">
    <h2>${data[0].title}</h2>
    <h3>${data[0].content_rating}</h3>
    <img src="${data[0].poster.thumb}">
    </div>
  `;
  $('.js-search-results-imdb').html(imdbResults);
}

function renderNyt(data) {
  console.log(data.results);
  const nytResults = `<div class="js-search-results-nyt">
  <h2>${data.results[0].display_title}</h2></div>
 `
  console.log($("js-search-results-nyt"));
  $('.js-search-results-nyt').html(nytResults);
}


$('.js-search-form').on('submit', event => {
  event.preventDefault();

  const queryTarget = $(event.currentTarget).find('.js-query');
  const query = queryTarget.val();
  queryTarget.val('');
  initiateGetRequests(query);
});
