import React from 'react'
import {makeStyles, Typography, Grid} from '@material-ui/core'
import {useSearchMovies} from './searchModule'
import {SearchMovieComponent} from './SearchMovieComponent'
import {PopularMovieComponent} from './PopularMovieComponent'

const useStyle = makeStyles((theme) => ({
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

const PopularMovie = () => {
  const classes = useStyle()

  return (
    <>
      <Typography className={classes.heading} variant="h4" color="primary">
        Popular Movies
      </Typography>
      <PopularMovieComponent />
    </>
  )
}

const SearchMovie = () => {
  const classes = useStyle()

  return (
    <>
      <Typography className={classes.heading} variant="h4" color="primary">
        Search Results
      </Typography>
      <SearchMovieComponent />
    </>
  )
}

export const PopularMovieList = () => {
  const {searchMovies} = useSearchMovies()

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {searchMovies.movies ? <SearchMovie /> : <PopularMovie />}
    </Grid>
  )
}
