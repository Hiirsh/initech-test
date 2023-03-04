import { combineReducers } from 'redux'
import { LoginReducer } from '../reducer/Auth.reducer'
import { PostReducer } from './Post.reducer'
import { CommentReducer } from './Comment.reducer'

export const RootReducer = combineReducers({
  login: LoginReducer,
  posts: PostReducer,
  comments: CommentReducer
})

export type RootState = ReturnType<typeof RootReducer>
