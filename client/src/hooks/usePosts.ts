import React from "react";
import { useDispatch } from "react-redux";
import { ICreatePost, IPost, IUpdatePost } from "../interfaces/IPost";
import { IPostEnum } from "../store/reducer/Post.reducer";
import { base_url, postsOnPage } from "../utils/constants";
import { useTypeSelector } from "./useTypeSelector";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, currentPage, totalPages, totalPosts } = useTypeSelector(
    (state) => state.posts
  );

  const setPost = React.useCallback(
    (payload: IPost) => {
      dispatch({ type: IPostEnum.setPost, payload });
    },
    [dispatch]
  );
  const setPosts = React.useCallback(
    (payload: IPost[]) => {
      dispatch({ type: IPostEnum.setPosts, payload });
    },
    [dispatch]
  );
  const setCurrentPage = React.useCallback(
    (payload: number) => {
      dispatch({ type: IPostEnum.setCurrentPage, payload });
    },
    [dispatch]
  );
  const setTotalPages = React.useCallback(
    (payload: number) => {
      dispatch({ type: IPostEnum.setTotalPages, payload });
    },
    [dispatch]
  );
  const setTotalPosts = React.useCallback(
    (payload: number) => {
      dispatch({ type: IPostEnum.setTotalPosts, payload });
    },
    [dispatch]
  );

  const replacePost = React.useCallback(
    (post: IPost): void => {
      const index = posts.findIndex((p) => p.id === post.id);
      if (index) posts[index] = post;
      setPosts(posts);
    },
    [posts, setPosts]
  );

  const getPostsByPage = React.useCallback(
    async (currentPage: number): Promise<void> => {
      try {
        const responce = await fetch(`${base_url}/post/page/${currentPage}`);
        const { result, page, totalPages, total } = await responce.json();
        const posts = result as IPost[];
        posts.sort((a, b) => +b.date - +a.date);
        setPosts(posts);
        setCurrentPage(page);
        setTotalPages(totalPages);
        setTotalPosts(total);
      } catch (error) {
        console.error(error);
      }
    },
    [setCurrentPage, setPosts, setTotalPages, setTotalPosts]
  );

  const filterPosts = React.useCallback(
    async (keyWord?: string): Promise<void> => {
      if (keyWord) {
        const responce = await fetch(
          `${base_url}/post/search/${keyWord.toLowerCase()}`
        );
        const { result } = await responce.json();
        setPosts(result);
      }
    },
    [setPosts]
  );

  const createPost = React.useCallback(
    async function ({
      title,
      username,
    }: ICreatePost): Promise<number | undefined> {
      try {
        const responce = await fetch(`${base_url}/post/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, username }),
        });
        const { result } = await responce.json();
        posts.unshift(result);
        setTotalPosts(totalPosts + 1);
        if (posts.length > postsOnPage) {
          posts.pop();
        }
        if (totalPosts % postsOnPage === 0) {
          setTotalPages(totalPages + 1);
        }
        setPosts(posts);
        return result.id;
      } catch (error) {
        console.error(error);
      }
    },
    [posts, setPosts, setTotalPages, totalPages, setTotalPosts, totalPosts]
  );

  const updatePost = React.useCallback(
    async ({ title, like, dislike, post }: IUpdatePost): Promise<void> => {
      try {
        const res = {
          title: post.title,
          likes: post.likes,
          dislikes: post.dislikes,
        };
        if (like && !post.likes.includes(like)) {
          const dislike = post.dislikes.indexOf(like);
          if (dislike !== -1) {
            post.dislikes.splice(dislike, 1);
            res.dislikes = post.dislikes;
          }
          res.likes = [...post.likes, like];
        }
        if (dislike && !post.dislikes.includes(dislike)) {
          const like = post.dislikes.indexOf(dislike);
          if (like !== -1) {
            post.likes.splice(like, 1);
            res.likes = post.likes;
          }
          res.dislikes = [...post.dislikes, dislike];
        }
        if (title) {
          res.title = title;
        }
        const responce = await fetch(`${base_url}/post/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        });
        const data = await responce.json();
        const result = data.result as IPost;
        result.comments = post.comments;
        // const index = posts.findIndex((p) => p.id === post.id);
        // posts[index] = result;
        // setPosts(posts);
        replacePost(result);
      } catch (error) {
        console.error(error);
      }
    },
    [replacePost]
  );

  const deletePost = React.useCallback(
    async (id: number) => {
      await fetch(`${base_url}/post/${id}`, {
        method: "DELETE",
      });
      if (totalPosts === 1) {
        setCurrentPage(1);
        setPosts([]);
      } else if (posts.length === 1) {
        getPostsByPage(currentPage - 1);
        setTotalPages(totalPages - 1);
      } else {
        getPostsByPage(currentPage);
        setTotalPosts(totalPosts - 1);
      }
    },
    [
      getPostsByPage,
      currentPage,
      posts,
      setTotalPages,
      totalPosts,
      setCurrentPage,
      setPosts,
      setTotalPosts,
      totalPages
    ]
  );

  const uploadPicture = React.useCallback(
    async (id: number, picture: File): Promise<void> => {
      try {
        const formData = new FormData();
        formData.append("picture", picture);
        const responce = await fetch(`${base_url}/post/${id}/picture`, {
          method: "POST",
          body: formData,
        });
        const { result } = await responce.json();
        replacePost(result);
      } catch (error) {
        console.error(error);
      }
    },
    [replacePost]
  );

  return {
    setPost,
    setPosts,
    setCurrentPage,
    setTotalPages,
    getPostsByPage,
    createPost,
    deletePost,
    updatePost,
    filterPosts,
    uploadPicture,
  };
};
