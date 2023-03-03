import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IComment } from "../../interfaces/IComment";
import { IPost } from "../../interfaces/IPost";
import { ModalInputEnum } from "../../utils/constants";

interface IAddEditModal {
  show: boolean;
  setShow: (cond: boolean) => void;
  type: ModalInputEnum;
  data?: IPost | IComment;
}
export const ModalInput = ({ show, setShow, type, data }: IAddEditModal) => {
  // const initialInput = !data? "": "title" in data? data.title;
  let initialInput: string = "";
  if (data && "title" in data) {
    initialInput = data.title;
  }
  if (data && "text" in data) {
    initialInput = data.text;
  }

  const [input, setInput] = React.useState(initialInput);

  const handleClose = () => {
    setShow(false);
    setInput(initialInput);
  };
  const handleTitleInput = (
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
          <Form.Control type="text" value={input} onChange={handleTitleInput} />
        </Form.Group>
        {(type === ModalInputEnum.addPost ||
          type === ModalInputEnum.editPost) && (
          <Form.Group className="mt-1">
            <Form.Label>Upload the picture</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onPointerDown={handleClose}>
          Close
        </Button>
        {type === ModalInputEnum.addPost && (
          <Button variant="primary">Publish</Button>
        )}
        {type === ModalInputEnum.editPost && (
          <Button variant="primary">Change</Button>
        )}
        {type === ModalInputEnum.addComment && (
          <Button variant="primary">Add Comment</Button>
        )}
        {type === ModalInputEnum.editComment && (
          <Button variant="primary">Change Comment</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
