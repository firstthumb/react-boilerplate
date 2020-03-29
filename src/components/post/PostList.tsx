import React, {useEffect, useState} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {usePost} from './postModule'
import {getPosts} from './postApi'
import {PostItem} from './PostItem'
import {getGenres} from '~/services/tmdbService'

export const PostList: React.FC = () => {
  const {dispatch, posts} = usePost()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch('post/set/loading')
      setLoading(true)
      try {
        const posts = await getPosts()
        const genres = await getGenres()
        dispatch('post/set', posts)
        setLoading(false)
      } catch (error) {
        dispatch('post/set/failed')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [dispatch])

  return (
    <div>
      {loading ? <CircularProgress /> : posts.map(post => <PostItem key={post.id} {...post} />)}
    </div>
  )
}
