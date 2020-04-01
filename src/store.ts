import {createStoreon} from 'storeon'
import {
  popularMovies,
  PopularMovieState,
  PopularMovieEvents,
  SearchMovieState,
  SearchMovieEvents,
  searchMovies,
} from '~/components'
import {storeonDevtools} from 'storeon/devtools'

type StoreState = PopularMovieState & SearchMovieState

type StoreEvents = PopularMovieEvents & SearchMovieEvents

export const store = createStoreon<StoreState, StoreEvents>([
  popularMovies,
  searchMovies,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])
