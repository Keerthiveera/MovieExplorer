# MovieExplorer
# 🎬 Movie Search App (OMDb API)

## Overview
This web app allows users to search for movies using the OMDb public API. It displays movie posters, titles, and release years, with detailed info available on click.

## OMDb Endpoints Used
- `?s={search_term}` — for searching movie titles
- `?i={imdb_id}` — for detailed info on a single movie

## Setup Instructions
1. Clone or download the repository
2. Open `index.html` in your browser
3. Insert your OMDb API key in `app.js`:
```js
const apiKey = 'your_api_key_here';
