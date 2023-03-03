import { IPosts, IPost } from "../../interfaces/IPost";

const IS: IPosts = {
  posts: []
}

export enum IPostEnum {
  setPosts = "SET_POSTS",
  setPost = "SET_POST",
}

interface IPostReducerPosts {
  type: IPostEnum.setPosts,
  payload: IPost[]
}

interface IPostReducerPost {
  type: IPostEnum.setPost,
  payload: IPost
}

export type IPostsReducerActionsTypes = IPostReducerPosts | IPostReducerPost

export const PostReducer = (state = IS, action: IPostsReducerActionsTypes): IPosts => {
  switch (action.type) {
    case IPostEnum.setPosts:
      return {...state, posts: action.payload}
    case IPostEnum.setPost:
      return {...state, posts: [...state.posts, action.payload]}
    default:
      return state
  }
}
