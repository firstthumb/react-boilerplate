import React from 'react'
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'

const TMDB_IMAGE_URL = process.env.REACT_APP_TMDB_IMAGE_URL

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

interface MovieCardProps {
  title: string
  posterPath: string
}

export const MovieCard: React.FC<MovieCardProps> = ({title, posterPath}) => {
  const classes = useStyles()

  const getPosterPath = () => {
    if (posterPath) {
      return `${TMDB_IMAGE_URL}/w500${posterPath}`
    }

    return ''
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={getPosterPath()} title={title}>
          <CardActions disableSpacing>
            <FavoriteIcon color="action" aria-label="add to favorites" />
          </CardActions>
        </CardMedia>
        <CardContent style={{width: '400px', height: '30px'}}>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
