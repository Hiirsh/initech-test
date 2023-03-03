import React from "react";
import { Button, Modal } from "react-bootstrap";
import { DeleteModalEnum } from "../../utils/constants";

interface IDeleteModal {
  id: number;
  show: boolean;
  setShow: (show: boolean) => void;
  type: DeleteModalEnum;
}
export const DeleteModal = ({ id, show, setShow, type }: IDeleteModal) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete {type === DeleteModalEnum.deletePost && "post"}
          {type === DeleteModalEnum.deleteComment && "comment"}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>You cannot cancel this action</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};
