import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useComments } from "../../hooks/useComments";
import { usePosts } from "../../hooks/usePosts";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { IComment } from "../../interfaces/IComment";
import { IPost } from "../../interfaces/IPost";
import { ModalInputEnum } from "../../utils/constants";
import { FileUpload } from "./FileUpload";
interface IAddEditModal {
  show: boolean;
  setShow: (cond: boolean) => void;
  type: ModalInputEnum;
  data?: IPost | IComment;
}
export const ModalInput = ({ show, setShow, type, data }: IAddEditModal) => {
  const username = useTypeSelector((state) => state.login.login);
  let initialInput: string = "";

  if (type === ModalInputEnum.editPost && data && "title" in data) {
    initialInput = data.title;
  }
  if (type === ModalInputEnum.editComment && data && "text" in data) {
    initialInput = data.text;
  }
  const { updateComment, createComment } = useComments();
  const { createPost, updatePost } = usePosts();

  const [input, setInput] = React.useState(initialInput);

  const handleClose = () => {
    setShow(false);
    setInput(initialInput);
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === ModalInputEnum.addPost && "Add post"}
          {type === ModalInputEnum.editPost && "Edit post"}
          {type === ModalInputEnum.addComment && "Add comment"}
          {type === ModalInputEnum.editComment && "Edit comment"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>
            {type === ModalInputEnum.addPost && "Enter title"}
            {type === ModalInputEnum.editPost && "Edit title"}
            {type === ModalInputEnum.addComment && "Write your comment"}
            {type === ModalInputEnum.editComment && "Edit comment"}
          </Form.Label>
          <Form.Control type="text" value={input} onChange={handleInput} />
        </Form.Group>
        {(type === ModalInputEnum.addPost ||
          type === ModalInputEnum.editPost) && (
          // <Form.Group className="mt-1">
          //   <Form.Label>Upload the picture</Form.Label>
          //   <Form.Control type="file" />
          // </Form.Group>
          <FileUpload />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onPointerDown={handleClose}>
          Close
        </Button>
        {type === ModalInputEnum.addPost && (
          <Button
            variant="primary"
            onPointerDown={() => {
              createPost({ title: input, username });
              setInput("");
              setShow(false);
            }}
          >
            Publish
          </Button>
        )}
        {type === ModalInputEnum.editPost && (
          <Button
            variant="primary"
            onPointerDown={() => {
              const post = data as IPost;
              updatePost({ title: input, post });
              initialInput = input;
              handleClose();
            }}
          >
            Change post
          </Button>
        )}
        {type === ModalInputEnum.addComment && data?.id && (
          <Button
            variant="primary"
            onPointerDown={() => {
              createComment({ text: input, postId: data.id, username });
              setShow(false);
            }}
          >
            Add Comment
          </Button>
        )}
        {type === ModalInputEnum.editComment && data && (
          <Button
            variant="primary"
            onPointerDown={() => {
              updateComment({
                text: input,
                likes: data.likes,
                dislikes: data.dislikes,
                id: data.id,
              });
              handleClose();
            }}
          >
            Change Comment
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
