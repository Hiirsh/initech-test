import React, { memo } from "react";
import { IComment } from "../../../../interfaces/IComment";
import { Button, Card } from "react-bootstrap";
import { timeConvert } from "../../../../utils/timeConvert";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { ModalInput } from "../../../Modals/ModalInput";
import { DeleteModal } from "../../../Modals/DeleteModal";
import { DeleteModalEnum, ModalInputEnum } from "../../../../utils/constants";

export interface ICommentProps {
  comment: IComment;
}

export const Comment = memo(function CommentMemo({ comment }: ICommentProps) {
  const login = useTypeSelector((state) => state.login.login);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEdidModal, setShowEdidModal] = React.useState(false);
  const editPostHandler = () => {
    setShowEdidModal(true);
  };

  const deletePostHandler = () => {
    setShowDeleteModal(true);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{comment.username}</Card.Title>
          <Card.Subtitle className="text-muted">
            {timeConvert(+comment.date)}
          </Card.Subtitle>
          <Card.Text>{comment.text}</Card.Text>
        </Card.Body>
        {login === comment.username && (
          <Card.Footer>
            <Button className="m-1" onPointerDown={editPostHandler}>
              Edit comment
            </Button>
            <Button className="m-1" onPointerDown={deletePostHandler}>
              Delete comment
            </Button>
          </Card.Footer>
        )}
      </Card>
      {/* Delete post */}
      <DeleteModal
        type={DeleteModalEnum.deleteComment}
        id={comment.id}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      {/* Edit post */}
      <ModalInput
        show={showEdidModal}
        setShow={setShowEdidModal}
        type={ModalInputEnum.editComment}
      />
    </>
  );
});
