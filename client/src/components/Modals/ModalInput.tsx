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
  // let initialInput: string = "";
  const initialInput = React.useRef("");
  if (type === ModalInputEnum.editPost && data && "title" in data) {
    initialInput.current = data.title;
  }
  if (type === ModalInputEnum.editComment && data && "text" in data) {
    initialInput.current = data.text;
  }
  const { updateComment, createComment } = useComments();
  const { createPost, updatePost, uploadPicture } = usePosts();

  const [input, setInput] = React.useState(initialInput.current);
  const [selectedFile, setSelectedFile] = React.useState<File|null>(null);
  const [isFilePicked, setIsFilePicked] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setShow(false);
    setInput(initialInput.current);
  }, [setShow, setInput]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handlePublish = React.useCallback(async () => {
    const postId = await createPost({ title: input, username });
    if (isFilePicked && postId && selectedFile) {
      uploadPicture(postId, selectedFile);
    }
    setInput("");
    setSelectedFile(null)
    setShow(false);
  }, [
    input,
    username,
    isFilePicked,
    createPost,
    setInput,
    setShow,
    selectedFile,
    uploadPicture,
  ]);

  const handleChangePost = React.useCallback(() => {
    const post = data as IPost;
    updatePost({ title: input, post });
    initialInput.current = input;
    handleClose();
  }, [data, handleClose, input, updatePost]);

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
          <FileUpload
            setSelectedFile={setSelectedFile}
            setIsFilePicked={setIsFilePicked}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onPointerDown={handleClose}>
          Close
        </Button>
        {type === ModalInputEnum.addPost && (
          <Button variant="primary" onPointerDown={handlePublish}>
            Publish
          </Button>
        )}
        {type === ModalInputEnum.editPost && (
          <Button variant="primary" onPointerDown={handleChangePost}>
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
