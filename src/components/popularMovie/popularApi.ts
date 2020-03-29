import {getPopularMovies} from '~/services'
import {IMovie} from '~/common/types'

export const getPopular = (page = 1): Promise<IMovie[]> => getPopularMovies(page)
