import React, { memo, CSSProperties } from "react";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { IPost } from "../../../../interfaces/IPost";
import { Button, Card } from "react-bootstrap";
import { DeleteModal } from "../../../Modals/DeleteModal";
import { ModalInput } from "../../../Modals/ModalInput";
import { DeleteModalEnum, ModalInputEnum } from "../../../../utils/constants";
import { IComment } from "../../../../interfaces/IComment";
import { timeConvert } from "../../../../utils/timeConvert";
import { LikePanel } from "./LikesPanel";

export interface ICardScheme {
  style?: CSSProperties;
  className?: string;
  data: IPost | IComment;
}

export const CardScheme = memo(function CardMemo({ data }: ICardScheme) {
  const type = "title" in data ? "post" : "comment";
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEdidModal, setShowEdidModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);

  const login = useTypeSelector((state) => state.login.login);
  const [isCommentOpened, setIsCommentOpened] = React.useState(false);

  const changeVisionComment = React.useCallback(() => {
    setIsCommentOpened(!isCommentOpened);
  }, [isCommentOpened]);

  const addCommentHandler = () => {
    setShowCommentModal(true);
  };

  const editHandler = () => {
    setShowEdidModal(true);
  };

  const deleteHandler = () => {
    setShowDeleteModal(true);
  };
  return (
    <>
      <Card key={data.id} className="mb-2">
        <Card.Header>Author - {data.username}</Card.Header>
        <Card.Body>
          {"title" in data && <Card.Title>{data.title}</Card.Title>}
          <Card.Subtitle className="text-muted">
            {timeConvert(+data.date)}
          </Card.Subtitle>
          {(data as IPost).imageSrc && (
            <Card.Body className="p-0" >
              <img
              className="mw-100"
                src={`${(data as IPost).imageSrc}`}
                alt={(data as IPost).title}
              />
            </Card.Body>
          )}

          {login === data.username && (
            <div>
              <Button className="m-1" onPointerDown={editHandler}>
                Edit {type}
              </Button>
              <Button className="m-1" onPointerDown={deleteHandler}>
                Delete {type}
              </Button>
            </div>
          )}
          {"text" in data && <Card.Text>{data.text}</Card.Text>}
          {type === "post" && (
            <Button className="m-1" onPointerDown={addCommentHandler}>
              Add comment
            </Button>
          )}
          {"comments" in data && (
            <>
              {!!data.comments.length && (
                <Button className="m-1" onPointerDown={changeVisionComment}>
                  {isCommentOpened ? "Hide" : "Show"} comments
                </Button>
              )}
              {isCommentOpened && (
                <Card.Body className="p-0">
                  {data.comments.map((comment, key) => (
                    <Card.Body key={key}>
                      <CardScheme data={comment} key={key} />
                    </Card.Body>
                  ))}
                </Card.Body>
              )}
            </>
          )}
        </Card.Body>
        <Card.Footer>
          <LikePanel data={data} />
          <span className="ms-4">
            Votes number: {data.likes.length - data.dislikes.length}
          </span>
        </Card.Footer>
      </Card>
      {/* ==========================MODAL WINDOWS========================== */}
      {/* Delete modal */}
      <DeleteModal
        type={
          type === "post"
            ? DeleteModalEnum.deletePost
            : DeleteModalEnum.deleteComment
        }
        id={data.id}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      {/* Edit modal */}
      <ModalInput
        show={showEdidModal}
        setShow={setShowEdidModal}
        type={
          "title" in data ? ModalInputEnum.editPost : ModalInputEnum.editComment
        }
        data={data}
      />
      {/* Add modal */}
      <ModalInput
        show={showCommentModal}
        setShow={setShowCommentModal}
        type={ModalInputEnum.addComment}
        data={data}
      />
    </>
  );
});
