import {getPopularMovies} from '~/services'
import {IMovie} from '~/common/types'

export const getPopular = (page: number = 1): Promise<IMovie[]> => getPopularMovies(page)
