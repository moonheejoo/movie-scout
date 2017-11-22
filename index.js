const IMDB_SEARCH_URL = 'http://www.theimdbapi.org/api/find/movie?';
const NYT_SEARCH_URL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?";
const NYT = {
  NAME: 'nyt',
  API_KEY: "9b85bd3d754d4f91a251f25992575fdf",
  BASE_URL: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?"
}


// $.getJSON(NYT_SEARCH_URL, options);

function getDataFromApi(search, callback) {
  const query = {
    title: `${search}`
  }
  $.getJSON(IMDB_SEARCH_URL, query)
    .done(callback)
    .done(renderMovies)
    .fail(function(error) {
      console.log(error);
    })
}
/**
* @param {Object} api - the name of the API whose data we'll request
* @param {string} api.NAME - A simple string which indicates the name of the api
* @param {string} api.API_KEY - key to access an api
* @param {string} api.BASE_URL - the base url onto which a query will be appended
* @param {string} q - A query for the desired api
* @param {function} cb - function to run after the initial get request
*/
function getFromApi(api, q, cb) {
  let query;
  if (api.NAME === 'nyt') {
    console.log('talking to the nyt!!');
     query = {
      'api-key': api.API_KEY,
      'query': q,
    }
  }


  $.getJSON(api.BASE_URL, query, cb);
}


function cleanMovieData(data) {
  const cleanedMovies = [data[0]]
  return cleanedMovies;
}

function renderMovies(data) {
  console.log(data);
  $(".js-search-results-imdb").html(data[0].title);
  `<div class="render-results-imdb">
   <img class="thumbnail" src="${snippet.poster}">
    </div>
  `
}


$('.js-search-form').on('submit', event => {
  event.preventDefault();

  const queryTarget = $(event.currentTarget).find('.js-query');
  const query = queryTarget.val();
  queryTarget.val("");
  getDataFromApi(query, cleanMovieData);
});

getFromApi(NYT, 'coco', function(data){
  console.log(data);
})
