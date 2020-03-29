import {createStoreon} from 'storeon'
import {
  post,
  PostState,
  PostEvents,
  popularMovies,
  PopularMovieState,
  PopularMovieEvents,
} from '~/components'
import {storeonDevtools} from 'storeon/devtools'

type StoreState = PostState | PopularMovieState

type StoreEvents = PostEvents | PopularMovieEvents

export const store = createStoreon<StoreState, StoreEvents>([
  post,
  popularMovies,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])
