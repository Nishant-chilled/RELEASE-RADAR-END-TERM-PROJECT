import { sportsEvents } from '../data/sportsEvents';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/w92';
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function dedupeByExternalId(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.externalId)) return false;
    seen.add(item.externalId);
    return true;
  });
}

async function getTmdbProviders(contentType, id) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  try {
    const data = await fetchJson(
      `${TMDB_BASE_URL}/${contentType}/${id}/watch/providers?api_key=${apiKey}`
    );

    const indiaProviders = data.results?.IN?.flatrate || [];
    const providersToUse = indiaProviders.slice(0, 2);

    return {
      platform:
        providersToUse.map((provider) => provider.provider_name).join(', ') ||
        'Not available',
      platformLogos: providersToUse.map((provider) => ({
        name: provider.provider_name,
        logo: provider.logo_path ? `${TMDB_LOGO_BASE}${provider.logo_path}` : '',
      })),
    };
  } catch {
    return {
      platform: 'Not available',
      platformLogos: [],
    };
  }
}

async function mapTmdbMovie(item) {
  const providerData = await getTmdbProviders('movie', item.id);

  return {
    externalId: `movie-${item.id}`,
    title: item.title,
    category: 'movie',
    year: item.release_date?.slice(0, 4) || 'Unknown',
    releaseDate: item.release_date || 'TBA',
    platform: providerData.platform,
    platformLogos: providerData.platformLogos,
    genreIds: item.genre_ids || [],
    image: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : '',
    overview: item.overview || 'No description available.',
  };
}

async function mapTmdbTv(item) {
  const providerData = await getTmdbProviders('tv', item.id);

  return {
    externalId: `tv-${item.id}`,
    title: item.name,
    category: 'show',
    year: item.first_air_date?.slice(0, 4) || 'Unknown',
    releaseDate: item.first_air_date || 'TBA',
    platform: providerData.platform,
    platformLogos: providerData.platformLogos,
    genreIds: item.genre_ids || [],
    image: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : '',
    overview: item.overview || 'No description available.',
  };
}

function mapJikanAnime(item) {
  return {
    externalId: `anime-${item.mal_id}`,
    title: item.title,
    category: 'anime',
    year: item.year || item.aired?.from?.slice(0, 4) || 'Unknown',
    releaseDate: item.aired?.from?.slice(0, 10) || 'TBA',
    platform: 'Check official sources for streaming platform',
    platformLogos: [],
    image: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || '',
    overview: item.synopsis || 'No description available.',
  };
}

function mapRawgGame(item) {
  return {
    externalId: `game-${item.id}`,
    title: item.name,
    category: 'game',
    year: item.released?.slice(0, 4) || 'Unknown',
    releaseDate: item.released || 'TBA',
    platform: item.parent_platforms?.map((p) => p.platform.name).join(', ') || 'Multi-platform',
    platformLogos: [],
    image: item.background_image || '',
    overview: `Metacritic: ${item.metacritic ?? 'N/A'}`,
  };
}

async function fetchMovies(year, search = '') {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const url = search.trim()
    ? `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(search)}&page=1`
    : `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&primary_release_year=${year}&sort_by=popularity.desc&page=1`;

  const data = await fetchJson(url);
  const results = data.results || [];

  const filteredResults = results
    .filter((item) => !year || item.release_date?.slice(0, 4) === String(year))
    .slice(0, 12);

  return await Promise.all(filteredResults.map(mapTmdbMovie));
}

async function fetchShows(year, search = '') {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const url = search.trim()
    ? `${TMDB_BASE_URL}/search/tv?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(search)}&page=1`
    : `${TMDB_BASE_URL}/discover/tv?api_key=${apiKey}&language=en-US&first_air_date_year=${year}&sort_by=popularity.desc&page=1`;

  const data = await fetchJson(url);
  const results = data.results || [];

  const filteredResults = results
    .filter((item) => !year || item.first_air_date?.slice(0, 4) === String(year))
    .slice(0, 12);

  return await Promise.all(filteredResults.map(mapTmdbTv));
}

async function fetchAnime(year, search = '') {
  if (search.trim()) {
    const data = await fetchJson(
      `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(search)}&order_by=popularity&sort=asc&sfw=true`
    );

    return (data.data || [])
      .filter((item) => String(item.year || item.aired?.from?.slice(0, 4)) === String(year))
      .slice(0, 12)
      .map(mapJikanAnime);
  }

  const [popularData, upcomingData, airingData] = await Promise.all([
    fetchJson(
      `${JIKAN_BASE_URL}/anime?start_date=${year}-01-01&end_date=${year}-12-31&order_by=popularity&sort=asc&sfw=true`
    ),
    fetchJson(
      `${JIKAN_BASE_URL}/anime?status=upcoming&order_by=popularity&sort=asc&sfw=true`
    ),
    fetchJson(
      `${JIKAN_BASE_URL}/anime?status=airing&order_by=popularity&sort=asc&sfw=true`
    ),
  ]);

  const combined = [
    ...(popularData.data || []),
    ...(upcomingData.data || []).filter(
      (item) => String(item.year || item.aired?.from?.slice(0, 4)) === String(year)
    ),
    ...(airingData.data || []).filter(
      (item) => String(item.year || item.aired?.from?.slice(0, 4)) === String(year)
    ),
  ];

  return dedupeByExternalId(
    combined
      .filter((item) => {
        const type = item.type?.toLowerCase();
        return (
          item.title &&
          item.images?.jpg?.image_url &&
          (type === 'tv' || type === 'movie' || type === 'ona')
        );
      })
      .map(mapJikanAnime)
  ).slice(0, 18);
}

async function fetchGames(year, search = '') {
  const query = search.trim()
    ? `${RAWG_BASE_URL}/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${encodeURIComponent(search)}&dates=${year}-01-01,${year}-12-31&page_size=12`
    : `${RAWG_BASE_URL}/games?key=${import.meta.env.VITE_RAWG_API_KEY}&dates=${year}-01-01,${year}-12-31&ordering=-added&page_size=12`;

  const data = await fetchJson(query);
  return data.results?.map(mapRawgGame) ?? [];
}

export async function fetchReleasesByCategory(category, year, search = '') {
  switch (category) {
    case 'movie':
      return fetchMovies(year, search);
    case 'show':
      return fetchShows(year, search);
    case 'anime':
      return fetchAnime(year, search);
    case 'game':
      return fetchGames(year, search);
    case 'sports': {
      const sports = sportsEvents.filter((event) => String(event.year) === String(year));
      return search.trim()
        ? sports.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
        : sports;
    }
    default: {
      const [movies, shows, anime, games] = await Promise.all([
        fetchMovies(year, search),
        fetchShows(year, search),
        fetchAnime(year, search),
        fetchGames(year, search),
      ]);

      const sports = sportsEvents.filter((event) => String(event.year) === String(year));

      return dedupeByExternalId([...movies, ...shows, ...anime, ...games, ...sports]);
    }
  }
}