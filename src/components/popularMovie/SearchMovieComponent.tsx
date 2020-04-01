import React from 'react'
import {GridList, GridListTile, CircularProgress} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import {search} from './searchApi'
import {MovieCard} from '~/common/view'
import {useSearchMovies, SearchResult} from './searchModule'

export const SearchMovieComponent: React.FC = () => {
  const {dispatch, searchMovies} = useSearchMovies()

  const loadMore = async (page: number) => {
    const searchTerm = searchMovies && searchMovies.filter && searchMovies.filter.searchTerm
    if (searchTerm) {
      const searchResult = await search(searchTerm, page)
      const movies = searchResult.results
      const hasMore = searchResult.page < searchResult.total_pages
      dispatch('search_movies/next_page', {movies, hasMore} as SearchResult)
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      threshold={1000}
      hasMore={searchMovies.hasMore}
      useWindow={true}
      loader={<CircularProgress key={Math.random()} color="secondary" />}
    >
      <GridList cols={4} spacing={20}>
        {searchMovies.movies &&
          searchMovies.movies.map(movie => (
            <GridListTile key={Math.random()}>
              <MovieCard title={movie.title} posterPath={movie.poster_path} />
            </GridListTile>
          ))}
      </GridList>
    </InfiniteScroll>
  )
}
