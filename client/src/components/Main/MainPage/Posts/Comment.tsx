import React, { memo, CSSProperties } from "react";
import { IComment } from "../../../../interfaces/IComment";

export interface ICommentProps {
  style?: CSSProperties;
  className?: string;
  comment: IComment;
}

export const Comment = memo(function CommentMemo({
  style,
  className,
  comment,
}: ICommentProps) {
  return <div style={style} className={`${className ? className : ""}`}>
    <p>{comment.date}</p>
    <p>{comment.username}</p>
    <p>{comment.text}</p>
  </div>;
});
