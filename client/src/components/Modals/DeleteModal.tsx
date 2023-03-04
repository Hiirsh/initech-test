import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useComments } from "../../hooks/useComments";
import { usePosts } from "../../hooks/usePosts";
import { DeleteModalEnum } from "../../utils/constants";

interface IDeleteModal {
  id: number;
  show: boolean;
  setShow: (show: boolean) => void;
  type: DeleteModalEnum;
}
export const DeleteModal = ({ id, show, setShow, type }: IDeleteModal) => {
  const { deleteComment } = useComments();
  const { deletePost } = usePosts();
  // const { deletePost } = usePosts();
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    if (type === DeleteModalEnum.deleteComment) deleteComment(id);
    if (type === DeleteModalEnum.deletePost) deletePost(id);
    handleClose();
  };

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
        <Button variant="danger" onPointerDown={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
