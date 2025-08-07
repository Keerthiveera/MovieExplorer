const API_KEY = '959174c1'; // Replace with your OMDb API key
const searchBtn = document.getElementById('searchBtn');
const queryInput = document.getElementById('query');
const moviesDiv = document.getElementById('movies');

// Modal elements
const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modalDetails');
const closeModalBtn = document.getElementById('closeModal');

// Search button click event
searchBtn.addEventListener('click', () => {
  const searchTerm = queryInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});

/**
 * Fetch movies from OMDb by title
 */
function fetchMovies(title) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}`;
  moviesDiv.innerHTML = ''; // Clear old results

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        moviesDiv.innerHTML = `<p style="text-align:center; color: #fff;">${data.Error}</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      moviesDiv.innerHTML = `<p style="text-align:center; color: red;">Error fetching data.</p>`;
    });
}

/**
 * Render movie cards with animation and click handler
 */
function displayMovies(movies) {
  movies.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.setProperty('--delay', `${index * 0.1}s`);

    const poster =
      movie.Poster !== 'N/A'
        ? movie.Poster
        : 'https://via.placeholder.com/300x445?text=No+Image';

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}" class="movie-poster">
      <div class="movie-info">
        <div class="movie-title">${movie.Title}</div>
        <div class="movie-year">${movie.Year}</div>
      </div>
    `;

    // Add click listener to show details modal
    card.addEventListener('click', () => {
      fetchMovieDetails(movie.imdbID);
    });

    moviesDiv.appendChild(card);
  });
}

/**
 * Fetch and display movie details in modal
 */
function fetchMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.Response === 'True') {
        const poster =
          data.Poster !== 'N/A'
            ? data.Poster
            : 'https://via.placeholder.com/150x225?text=No+Image';

        modalDetails.innerHTML = `
          <img src="${poster}" alt="${data.Title}" />
          <div>
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Runtime:</strong> ${data.Runtime}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
          </div>
        `;

        modal.classList.remove('hidden');
      } else {
        alert('Failed to load movie details.');
      }
    })
    .catch(err => {
      console.error('Details fetch error:', err);
      alert('Error fetching movie details.');
    });
}

// Close modal on X button click
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Optional: close modal when clicking outside content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
