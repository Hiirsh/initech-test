import React, { memo, CSSProperties } from "react";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { IPost } from "../../../../interfaces/IPost";
import { Button } from "react-bootstrap";
import { Comment } from "./Comment";
export interface IPostProps {
  style?: CSSProperties;
  className?: string;
  post: IPost;
}

export const Post = memo(function PostMemo({
  style,
  className,
  post,
}: IPostProps) {
  const login = useTypeSelector((state) => state.login.login);
  const [isCommentOpened, setIsCommentOpened] = React.useState(false);

  const changeVisionComment = React.useCallback(() => {
    setIsCommentOpened(!isCommentOpened);
  }, [isCommentOpened]);

  const editPostHandler = () => {};
  const deletePostHandler = () => {};
  return (
    <div style={style} className={`${className ? className : ""}`}>
      <p>{post.id}</p>
      <p>Title: {post.title}</p>
      <p>Author: {post.username}</p>
      <p>Votes number: {post.likes.length - post.dislikes.length}</p>
      {!!post.comments.length && (
        <Button onPointerDown={changeVisionComment}>
          {isCommentOpened ? "Hide" : "Show"} comments
        </Button>
      )}
      {isCommentOpened &&
        post.comments.map((comment) => <Comment comment={comment} />)}

      {login === post.username && (
        <div>
          <Button onPointerDown={editPostHandler}>Edit post</Button>
          <Button onPointerDown={deletePostHandler}>Delete post</Button>
        </div>
      )}
    </div>
  );
});
