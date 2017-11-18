const IMDB_SEARCH_URL = 'http://www.theimdbapi.org/api/find/movie?title={title}&year={year}';

function getDataFromApi (search, callback) {
  const query = {
    q: `${search} in:name`,
    per_page: 5
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);search
}

function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="${title}" target="_blank">$result.name}</a> by <a class="js-user-name" href="${result.owner.html.url}" target="_blank">${result.owner.login}</a></h2>
      `;
      function displayImdbSearchData(data) {
        const results = data.items.map((item, index) => renderResult(item));
        $('.js-search-form').submit(event => {
        event.preventDefault()'
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val("");
        getDataFromApi(query,displayImdbSearchData);
      });
  }
