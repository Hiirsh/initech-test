import { IPosts, IPost } from "../../interfaces/IPost";

const IS: IPosts = {
  posts: [],
  totalPages: 1, 
  currentPage: 1,
};

export enum IPostEnum {
  setPosts = "SET_POSTS",
  setPost = "SET_POST",
  setTotalPages = "SET_TOTAL_PAGES",
  setCurrentPage = "SET_CURRENT_PAGE",
}

interface IPostReducerPosts {
  type: IPostEnum.setPosts;
  payload: IPost[];
}

interface IPostReducerPost {
  type: IPostEnum.setPost;
  payload: IPost;
}
interface IPostReducerTotalPages {
  type: IPostEnum.setTotalPages;
  payload: number;
}
interface IPostReducerCurrentPage {
  type: IPostEnum.setCurrentPage;
  payload: number;
}

export type IPostsReducerActionsTypes = IPostReducerPosts | IPostReducerPost | IPostReducerTotalPages | IPostReducerCurrentPage;

export const PostReducer = (
  state = IS,
  action: IPostsReducerActionsTypes
): IPosts => {
  switch (action.type) {
    case IPostEnum.setPosts:
      return { ...state, posts: action.payload };
    case IPostEnum.setPost:
      return { ...state, posts: [...state.posts, action.payload] };
    case IPostEnum.setCurrentPage:
      return {...state, currentPage: action.payload}
    case IPostEnum.setTotalPages:
      return {...state, totalPages: action.payload}
    default:
      return state;
  }
};
