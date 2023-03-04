import React from "react";
import { useDispatch } from "react-redux";
import {
  IComment,
  ICommentCreate,
  ICommentUpdate,
} from "../interfaces/IComment";
import { ICommentsEnum } from "../store/reducer/Comment.reducer";
import { base_url } from "../utils/constants";
import { usePosts } from "./usePosts";
import { useTypeSelector } from "./useTypeSelector";

export const useComments = () => {
  const dispatch = useDispatch();
  const { getPostsByPage } = usePosts();
  const { currentPage } = useTypeSelector((state) => state.posts);

  const setComment = React.useCallback(
    (payload: IComment) => {
      dispatch({ type: ICommentsEnum.setComment, payload });
    },
    [dispatch]
  );
  const createComment = React.useCallback(
    async (res: ICommentCreate) => {
      const data = await fetch(`${base_url}/comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });
      const { result } = await data.json();
      getPostsByPage(currentPage);
      setComment(result);
    },
    [getPostsByPage, setComment, currentPage]
  );

  const updateComment = React.useCallback(
    async (res: ICommentUpdate) => {
      const data = await fetch(`${base_url}/comment/${res.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });
      const { result } = await data.json();
      getPostsByPage(currentPage);
      setComment(result);
    },
    [getPostsByPage, setComment, currentPage]
  );

  const deleteComment = React.useCallback(
    async (id: number) => {
      await fetch(`${base_url}/comment/${id}`, {
        method: "DELETE",
      });
      getPostsByPage(currentPage);
    },
    [getPostsByPage , currentPage]
  );

  return { setComment, updateComment, createComment, deleteComment };
};
