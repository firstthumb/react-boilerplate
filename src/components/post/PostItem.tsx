import React from 'react'
import {PostModel} from './postModel'
import {CardContent, Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card'

interface PostModelProps extends PostModel {}

export const PostItem: React.FC<PostModelProps> = ({id, userId, title, body}: PostModelProps) => {
  return (
    <Card>
      <CardContent>
        <Typography component="h1">
          {id}-{userId}
        </Typography>
        <Typography color="textSecondary">{title}</Typography>
        <Typography component="p">{body}</Typography>
      </CardContent>
    </Card>
  )
}
