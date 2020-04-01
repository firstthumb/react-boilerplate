import {StoreonModule} from 'storeon'
import {useStoreon} from 'storeon/react'
import {IMovie} from '~/common/types'

export interface SearchFilter {
  searchTerm: string
}

export interface SearchMovieState {
  searchMovies: {
    movies?: IMovie[]
    hasMore: boolean
    page: number
    loading: boolean
    failed: boolean
    filter?: SearchFilter
  }
}

export interface SearchResult {
  movies: IMovie[]
  hasMore: boolean
}

export interface SearchMovieEvents {
  'search_movies/results': SearchResult
  'search_movies/search': SearchFilter
  'search_movies/failed': undefined
  'search_movies/clear': undefined
  'search_movies/next_page': SearchResult
}

const initialState: SearchMovieState = {
  searchMovies: {
    movies: undefined,
    hasMore: false,
    page: 1,
    loading: false,
    failed: false,
  },
}

export const searchMovies: StoreonModule<SearchMovieState, SearchMovieEvents> = (store) => {
  store.on('@init', () => initialState)
  store.on('search_movies/results', (state, {movies, hasMore}) => {
    return {
      ...state,
      searchMovies: {
        movies,
        hasMore,
        page: 2,
        loading: false,
        failed: false,
        filter: state.searchMovies.filter,
      },
    }
  })
  store.on('search_movies/search', (state, filter) => ({
    ...state,
    searchMovies: {
      movies: state.searchMovies.movies,
      hasMore: false,
      page: state.searchMovies.page,
      loading: true,
      failed: false,
      filter,
    },
  }))
  store.on('search_movies/failed', (state) => ({
    ...state,
    searchMovies: {
      movies: state.searchMovies.movies,
      hasMore: false,
      page: state.searchMovies.page,
      loading: false,
      failed: true,
      filter: state.searchMovies.filter,
    },
  }))
  store.on('search_movies/clear', () => initialState)
  store.on('search_movies/next_page', (state, {movies, hasMore}) => ({
    ...state,
    searchMovies: {
      movies: [...(state.searchMovies.movies || []), ...movies],
      hasMore,
      page: state.searchMovies.page + 1,
      loading: false,
      failed: false,
      filter: state.searchMovies.filter,
    },
  }))
}

export const useSearchMovies = () => useStoreon<SearchMovieState, SearchMovieEvents>('searchMovies')
