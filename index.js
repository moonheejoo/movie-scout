
const IMDB = {
  NAME: 'imdb',
  BASE_URL: 'http://www.theimdbapi.org/api/find/movie?'
}
const NYT = {
  NAME: 'nyt',
  API_KEY: "9b85bd3d754d4f91a251f25992575fdf",
  BASE_URL: "https://api.nytimes.com/svc/movies/v2/reviews/search.json?"
}


// $.getJSON(NYT_SEARCH_URL, options);

function getDataFromApi(search, callback) {
  console.log("hello");
  const query = {
    title: `${search}`
  }
// getFromApi (IMDB, query, function (res) {
//   console.log(res);
// });

  $.getJSON(IMDB.BASE_URL, query)
    .done(callback)
    .done(renderMovies)
    .fail(function(error) {
      console.log(error);
    });
  $.getJSON(NYT.BASE_URL, query)
    .done(callback)
    .done(renderMovies)
    .fail(function(error) {
      console.log(error);
    })
}
/**
* @param {Object} api - the object of the API whose data we'll request
* @param {string} api.NAME - A simple string which indicates the name of the api
* @param {string} api.API_KEY - key to access an api
* @param {string} api.BASE_URL - the base url onto which a query will be appended
* @param {string} q - A query for the desired api
* @param {function} cb - function to run after the initial get request
*/
function getFromApi(api, q, cb) {
  let query;
  console.log(api);
  alert("getFromApi works")
  if (api.NAME === 'nyt') {
    console.log('talking to the nyt!!');
     query = {
      'api-key': api.API_KEY,
      'query': q,
    }
  if (api.NAME === 'imdb'){
    console.log('talking to imdb');
     query = {
       'query': q,
     }
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
  const imdbResults = `<div class="render-results-imdb">
    <h2>${data[0].title}</h2>
    <h3>${data[0].content_rating}</h3>
    <img src="${data[0].poster.thumb}">
    </div>
  `
  $(".js-search-results-imdb").html(imdbResults);
}
  $(".js-search-results-nyt").html()


$('.js-search-form').on('submit', event => {
  event.preventDefault();

  const queryTarget = $(event.currentTarget).find('.js-query');
  const query = queryTarget.val();
  queryTarget.val("");
  getDataFromApi(query, cleanMovieData);
});

//getFromApi(NYT, 'coco', function(data){
//  console.log(data);
// })
