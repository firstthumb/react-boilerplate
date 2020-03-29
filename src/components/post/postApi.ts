import {client} from '~/http'
import {PostModel} from './postModel'

export const getPosts = (): Promise<PostModel[]> =>
  client
    .get<PostModel[]>('/posts')
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
