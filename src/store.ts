import {createStoreon} from 'storeon'
import {popularMovies, PopularMovieState, PopularMovieEvents} from '~/components'
import {storeonDevtools} from 'storeon/devtools'

type StoreState = PopularMovieState

type StoreEvents = PopularMovieEvents

export const store = createStoreon<StoreState, StoreEvents>([
  popularMovies,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])
