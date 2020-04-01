import React from 'react'
import {GridList, GridListTile, CircularProgress} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import {MovieCard} from '~/common/view'
import {getPopular} from './popularApi'
import {usePopularMovies} from './popularModule'

export const PopularMovieComponent: React.FC = () => {
  const {dispatch, popularMovies} = usePopularMovies()

  const loadMore = async (page: number) =>
    dispatch('load_popular_movies/next_page', await getPopular(page))

  return (
    popularMovies &&
    popularMovies.movies && (
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        threshold={100}
        hasMore={true || false}
        useWindow={true}
        loader={<CircularProgress key={Math.random()} color="secondary" />}
      >
        <GridList cols={4} spacing={20}>
          {popularMovies.movies.map((movie) => (
            <GridListTile key={Math.random()}>
              <MovieCard title={movie.title} posterPath={movie.poster_path} />
            </GridListTile>
          ))}
        </GridList>
      </InfiniteScroll>
    )
  )
}
