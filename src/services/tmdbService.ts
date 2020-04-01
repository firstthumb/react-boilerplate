import {tmdbApiClient} from '~/http'
import {IGenre, IMovie, ISearch} from '~/common/types'

interface GenreResponse {
  genres: IGenre[]
}

export const getGenres = async () =>
  tmdbApiClient.get<GenreResponse>('genre/movie/list').then(response => response.data.genres)

export const getPopularMovies = async (page = 1) =>
  tmdbApiClient
    .get<ISearch<IMovie>>('movie/popular', {params: {page}})
    .then(response => response.data.results)

export const searchMovies = async (searchTerm: string, page = 1): Promise<ISearch<IMovie>> =>
  tmdbApiClient
    .get<ISearch<IMovie>>('search/movie', {params: {query: searchTerm, page}})
    .then(response => response.data)
