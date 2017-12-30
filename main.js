const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];

const prom = fetch(endpoint)
  .then(stream => stream.json())
  .then(data => {
    cities.push(...data);
  });

function findMatches(searchTerm, data) {
  const regex = new RegExp(searchTerm, 'gi');

  const matches = cities.filter(place => place.city.match(regex) || place.state.match(regex));
  return matches;
}
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  const matches = findMatches(this.value, cities);
  const html = matches
    .map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
      return `
    <li>
      <span class='name'>${cityName}, ${stateName}</span>
      <span class='population'>${numberWithCommas(place.population)}</span>

    </li>
  `;
    })
    .join('');
  suggestions.innerHTML = html;
}

search.addEventListener('keyup', displayMatches);
