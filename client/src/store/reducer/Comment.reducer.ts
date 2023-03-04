import { ICommentUpdateReducer, IComment } from "../../interfaces/IComment";
 
const IS: ICommentUpdateReducer = {
  currentComment: null,
};

export enum ICommentsEnum {
  setComment = "SET_COMMENT",
}

interface ICommentUpdateReducerComment {
  type: ICommentsEnum.setComment;
  payload: IComment;
}

export type ICommentReducerActionsTypes = ICommentUpdateReducerComment

export const CommentReducer = (
  state = IS,
  action: ICommentReducerActionsTypes
): ICommentUpdateReducer => {
  switch (action.type) {
    case ICommentsEnum.setComment:
      return { ...state, currentComment: action.payload };
    default:
      return state;
  }
};
