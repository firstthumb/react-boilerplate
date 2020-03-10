import createStore from 'storeon'
import {post, PostState, PostEvents} from '~/components/post'

type StoreState = PostState

type StoreEvents = PostEvents

export const store = createStore<StoreState, StoreEvents>([post])
