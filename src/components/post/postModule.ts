import {Module} from 'storeon'
import useStoreon from 'storeon/react'
import {PostModel} from './postModel'

export interface PostState {
  posts: PostModel[]
  loading: boolean
}

export interface PostEvents {
  'post/set': PostModel[]
  'post/set/loading': undefined
  'post/set/failed': undefined
}

const initialState: PostState = {
  posts: [],
  loading: false,
}

export const post: Module<PostState, PostEvents> = store => {
  store.on('@init', () => initialState)
  store.on('post/set', (state, posts) => {
    return {
      posts,
      loading: false,
    }
  })
  store.on('post/set/loading', ({posts}) => ({posts, loading: true}))
  store.on('post/set/failed', () => initialState)
}

export const usePost = () => useStoreon<PostState, PostEvents>('posts')
