import axios from 'axios'

const TMDB_API_BASE = process.env.REACT_APP_TMDB_URL
const TMDB_READ_ACCESS_TOKEN = process.env.REACT_APP_TMDB_READ_ACCESS_TOKEN

export const client = axios.create({baseURL: 'https://jsonplaceholder.typicode.com/'})

export const tmdbApiClient = axios.create({baseURL: TMDB_API_BASE})

tmdbApiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${TMDB_READ_ACCESS_TOKEN}`

  return config
})
