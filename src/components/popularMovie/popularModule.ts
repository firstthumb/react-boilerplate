import {StoreonModule} from 'storeon'
import {useStoreon} from 'storeon/react'
import {IMovie} from '~/common/types'

export interface PopularMovieState {
  popularMovies: {
    movies: IMovie[]
    page: number
    loading: boolean
    failed: boolean
  }
}

export interface PopularMovieEvents {
  'load_popular_movies/set': IMovie[]
  'load_popular_movies/set/loading': undefined
  'load_popular_movies/set/failed': undefined
  'load_popular_movies/next_page': IMovie[]
}

const initialState: PopularMovieState = {
  popularMovies: {
    movies: [],
    page: 1,
    loading: false,
    failed: false,
  },
}

export const popularMovies: StoreonModule<PopularMovieState, PopularMovieEvents> = (store) => {
  store.on('@init', () => initialState)
  store.on('load_popular_movies/set', (state, movies) => {
    return {
      ...state,
      popularMovies: {
        movies,
        page: 2,
        loading: false,
        failed: false,
      },
    }
  })
  store.on('load_popular_movies/set/loading', (state) => ({
    ...state,
    popularMovies: {
      movies: state.popularMovies.movies,
      page: state.popularMovies.page,
      loading: true,
      failed: false,
    },
  }))
  store.on('load_popular_movies/set/failed', (state) => ({
    ...state,
    popularMovies: {
      movies: state.popularMovies.movies,
      page: state.popularMovies.page,
      loading: false,
      failed: true,
    },
  }))
  store.on('load_popular_movies/next_page', (state, nextMovies) => ({
    ...state,
    popularMovies: {
      movies: [...state.popularMovies.movies, ...nextMovies],
      page: state.popularMovies.page + 1,
      loading: false,
      failed: false,
    },
  }))
}

export const usePopularMovies = () =>
  useStoreon<PopularMovieState, PopularMovieEvents>('popularMovies')
