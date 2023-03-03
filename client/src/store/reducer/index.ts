import { combineReducers } from 'redux'
import { LoginReducer } from '../reducer/Auth.reducer'
import { PostReducer } from './Post.reducer'

export const RootReducer = combineReducers({
  login: LoginReducer,
  posts: PostReducer
})

export type RootState = ReturnType<typeof RootReducer>
