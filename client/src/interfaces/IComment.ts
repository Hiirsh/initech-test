export interface IComment {
  id: number;
  text: string;
  postId: number;
  username: string;
  likes: string[];
  dislikes: string[];
  date: string;
}
export interface ICommentUpdate {
  text: string;
  likes: string[];
  dislikes: string[];
  id: number
}
export interface ICommentCreate {
  text: string;
  postId: number;
  username: string
}

export interface ICommentUpdateReducer {
  currentComment: IComment | null;
}
