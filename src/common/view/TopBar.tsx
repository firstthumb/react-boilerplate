import React, {useState, useEffect} from 'react'
import {AppBar, Toolbar, IconButton, Typography, makeStyles, fade} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Home from '@material-ui/icons/Home'
import {NavLink} from 'react-router-dom'
import {useDebounce} from 'use-debounce'
import {searchMovies} from '~/services'
import {useSearchMovies, SearchFilter, SearchResult} from '~/components/popularMovie'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const TopBar = () => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState<string>()
  const [latestSearchTerm] = useDebounce(searchTerm, 1000)

  const {dispatch} = useSearchMovies()

  useEffect(() => {
    const doSearch = async () => {
      try {
        if (latestSearchTerm) {
          dispatch('search_movies/search', {searchTerm: latestSearchTerm} as SearchFilter)
          const searchResult = await searchMovies(latestSearchTerm)
          const movies = searchResult.results
          if (movies) {
            const hasMore = searchResult.page < searchResult.total_pages
            dispatch('search_movies/results', {movies, hasMore} as SearchResult)
          } else {
            dispatch('search_movies/clear')
          }
        } else {
          dispatch('search_movies/clear')
        }
      } catch {
        dispatch('search_movies/failed')
      }
    }

    doSearch()
  }, [latestSearchTerm, dispatch])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Movies
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </div>
        <NavLink to="/">
          <IconButton aria-label="Popular">
            <Home />
          </IconButton>
        </NavLink>
        <NavLink to="/favorite">
          <IconButton aria-label="Favorites">
            <FavoriteIcon />
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  )
}
