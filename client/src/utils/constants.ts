export const base_url = "http://localhost:8080";
export enum ModalInputEnum {
  addPost = "ADD_POST",
  editPost = "EDIT_POST",
  addComment = "ADD_COMMENT",
  editComment = "EDIT_COMMENT",
}

export enum DeleteModalEnum {
  deletePost = "POST",
  deleteComment = "COMMENT",
}
export enum CardEnum {
  comment = "COMMENT",
  post = "POST",
}

export const postsOnPage = 9