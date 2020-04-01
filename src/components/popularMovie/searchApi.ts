import {searchMovies} from '~/services'
import {IMovie, ISearch} from '~/common/types'

export const search = (searchTerm: string, page = 1): Promise<ISearch<IMovie>> =>
  searchMovies(searchTerm, page)
