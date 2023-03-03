export interface IComment {
  id: number;
  text: string;
  postId: number;
  username: string;
  likes: string[];
  dislikes: string[];
  date: string;
}
