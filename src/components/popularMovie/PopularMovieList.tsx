import React, {useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {usePopularMovies} from './popularModule'
import {getPopular} from './popularApi'
import {MovieCard} from '~/common/view'
import {GridList, GridListTile, makeStyles, Typography, Grid} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'

const useStyle = makeStyles(theme => ({
  gridlayout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    margin: theme.spacing(2),
  },
  heading: {
    margin: theme.spacing(3),
  },
}))

export const PopularMovieList: React.FC = () => {
  const classes = useStyle()

  const {dispatch, popularMovies} = usePopularMovies()

  useEffect(() => {
    const fetchPopularMovies = async () => {
      dispatch('load_popular_movies/set/loading')
      try {
        const movies = await getPopular(popularMovies.page)
        dispatch('load_popular_movies/set', movies)
      } catch (error) {
        console.log(`ERROR: ${error}`)
        dispatch('load_popular_movies/set/failed')
      }
    }

    fetchPopularMovies()
  }, [dispatch])

  const loadMore = async (page: number) => {
    dispatch('load_popular_movies/next_page', await getPopular(page))
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography className={classes.heading} variant="h4" color="primary">
        Popular Movies
      </Typography>

      {!popularMovies.loading ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          threshold={100}
          hasMore={true || false}
          loader={<CircularProgress key="z" color="secondary" />}
        >
          <GridList cols={4} spacing={20}>
            {popularMovies.movies.map(movie => (
              <GridListTile key={movie.id}>
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  subtitle={movie.overview}
                  posterPath={movie.poster_path}
                />
              </GridListTile>
            ))}
          </GridList>
        </InfiniteScroll>
      ) : (
        <Grid item>
          <CircularProgress size={50} color="secondary" />
        </Grid>
      )}
    </Grid>
  )
}
