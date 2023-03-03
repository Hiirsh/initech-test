import { IComment } from "./IComment";

export interface IPosts {
  posts: IPost[]
  currentPage: number,
  totalPages: number
}

export interface IPost {
  comments: IComment[];
  date: string;
  dislikes: string[];
  id: number;
  likes: string[];
  title: string;
  username: string;
  imageSrc?: string
}
