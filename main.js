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

const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  const matches = findMatches(this.value, cities);
  const html = matches.map(
    place => `
    <li>
      <span class='name'>${place.city}, ${place.state}</span>
    </li>
  `,
  );
  suggestions.innerHTML = html;
}

search.addEventListener('keyup', displayMatches);
