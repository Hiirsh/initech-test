import { IComment } from "./IComment";

export interface IPosts {
  posts: IPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export interface IPost {
  comments: IComment[];
  date: string;
  dislikes: string[];
  id: number;
  likes: string[];
  title: string;
  username: string;
  imageSrc?: string;
}

export interface ICreatePost {
  title: string;
  username: string;
}

export interface IUpdatePost {
  title?: string;
  like?: string;
  dislike?: string;
  post: IPost;
}

export interface IEditTitle {
  title: string;
  post: IPost;
}

export interface IAddLike {
  username: string;
  post: IPost;
}

export interface IAddDislike {
  username: string;
  post: IPost;
}
