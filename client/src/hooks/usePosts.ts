import { useDispatch } from "react-redux"
import { IPost } from "../interfaces/IPost"
import { IPostEnum } from "../store/reducer/Post.reducer"

export const usePosts = () => {
  const dispatch = useDispatch()
  return {
    setPost: (payload: IPost) => {
      dispatch({type: IPostEnum.setPost, payload})
    },
    setPosts: (payload: IPost[]) =>{
      dispatch({type: IPostEnum.setPosts, payload})
    },
    setCurrentPage: (payload: number) =>{
      dispatch({type: IPostEnum.setCurrentPage, payload})
    },
    setTotalPages: (payload: number) =>{
      dispatch({type: IPostEnum.setTotalPages, payload})
    },
  }
}