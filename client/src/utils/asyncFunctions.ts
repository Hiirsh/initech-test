import { IPost } from "../interfaces/IPost";
import { base_url } from "./constants";

interface ICreatePost {
  title: string;
  username: string;
}

interface IUpdatePost {
  title?: string;
  like?: string;
  dislike?: string;
  post: IPost;
}

interface IEditTitle {
  title: string;
  post: IPost;
}

interface IAddLike {
  username: string;
  post: IPost;
}

interface IAddDislike {
  username: string;
  post: IPost;
}
interface IGetPost {
  currentPage: number;
  setPosts: (payload: IPost[]) => void;
  setCurrentPage: (payload: number) => void;
  setTotalPages: (payload: number) => void;
}

export const createPost = async function ({
  title,
  username,
}: ICreatePost)/* : IPost */{
  const responce = await fetch(`${base_url}/post/`, {
    method: "POST",
    body: JSON.stringify({ title, username }),
  });
  const data = await responce.json();
  return data.result as IPost;
};

export const updatePost = async function ({
  title,
  like,
  dislike,
  post,
}: IUpdatePost) {
  const res = {
    title: post.title,
    likes: post.likes,
    dislike: post.dislikes,
  };
  if (like && !post.likes.includes(like)) {
    res.likes = [...post.likes, like];
  }
  if (dislike && !post.dislikes.includes(dislike)) {
    res.likes = [...post.dislikes, dislike];
  }
  if (title) {
    res.title = title;
  }
  const responce = await fetch(`${base_url}/post/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(res),
  });
  const data = await responce.json();
  return data.result as IPost;
};

export const editTitle = async ({ post, title }: IEditTitle) => {
  return await updatePost({ post, title });
};
export const addLike = async ({ post, username }: IAddLike) => {
  return await updatePost({ post, like: username });
};
export const addDislike = async ({ post, username }: IAddDislike) => {
  return await updatePost({ post, dislike: username });
};

export const getPostsByPage = async ({
  currentPage = 1,
  setPosts,
  setCurrentPage,
  setTotalPages,
}: IGetPost) => {
  const responce = await fetch(`${base_url}/post/page/${currentPage}`);
  const data = await responce.json();
  setPosts(data.result);
  setCurrentPage(data.page);
  setTotalPages(data.totalPages);
};
