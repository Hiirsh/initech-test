import React, { memo, CSSProperties } from "react";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { IPost } from "../../../../interfaces/IPost";
import { Button, Card } from "react-bootstrap";
import { Comment } from "./Comment";
import { DeleteModal } from "../../../Modals/DeleteModal";
import { ModalInput } from "../../../Modals/ModalInput";
import { DeleteModalEnum, ModalInputEnum } from "../../../../utils/constants";
import { Like } from "../../../../utils/icons/Like";
import { DislikeFilled } from "../../../../utils/icons/DislikeFilled";
import { Dislike } from "../../../../utils/icons/Dislike";
import { LikeFilled } from "../../../../utils/icons/LikeFilled";
import { IComment } from "../../../../interfaces/IComment";

export interface ICardScheme {
  style?: CSSProperties;
  className?: string;
  data: IPost | IComment;
}

export const CardScheme = memo(function CardMemo({
  data,
}: ICardScheme) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEdidModal, setShowEdidModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);

  const login = useTypeSelector((state) => state.login.login);
  const [isCommentOpened, setIsCommentOpened] = React.useState(false);

  const changeVisionComment = React.useCallback(() => {
    setIsCommentOpened(!isCommentOpened);
  }, [isCommentOpened]);

  const addComment = () => {
    setShowCommentModal(true);
  };

  const editPostHandler = () => {
    setShowEdidModal(true);
  };

  const deletePostHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <Card key={data.id} className="mb-2">
        <Card.Header>{data.username}</Card.Header>
        <Card.Body>
          {"title" in data && <Card.Title>{data.title}</Card.Title>}
          {login === data.username && (
            <div>
              <Button className="m-1" onPointerDown={editPostHandler}>
                Edit post
              </Button>
              <Button className="m-1" onPointerDown={deletePostHandler}>
                Delete post
              </Button>
            </div>
          )}
          <Card.Text>Author - {data.username}</Card.Text>
          {"comments" in data && (
            <>
              {"comments" in data && !!data.comments.length && (
                <Button className="m-1" onPointerDown={changeVisionComment}>
                  {isCommentOpened ? "Hide" : "Show"} comments
                </Button>
              )}
              <Button className="m-1" onPointerDown={addComment}>
                Add comment
              </Button>
              {isCommentOpened && (
                <Card.Footer>
                  {data.comments.map((comment, key) => (
                    <Card.Body key={key}>
                      <CardScheme data={comment} key={key} />
                    </Card.Body>
                  ))}
                </Card.Footer>
              )}
            </>
          )}
        </Card.Body>
        <Card.Footer>
          {data.likes.includes(login) ? <LikeFilled /> : <Like />}
          {data.dislikes.includes(login) ? <DislikeFilled /> : <Dislike />}
          <span className="ms-4">
            Votes number: {data.likes.length - data.dislikes.length}
          </span>
        </Card.Footer>
      </Card>
      {/* Delete post */}
      <DeleteModal
        type={DeleteModalEnum.deletePost}
        id={data.id}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      {/* Edit post */}
      <ModalInput
        show={showEdidModal}
        setShow={setShowEdidModal}
        type={
          "title" in data ? ModalInputEnum.editPost : ModalInputEnum.editComment
        }
        data={data}
      />
      {/* Add comment */}
      <ModalInput
        show={showCommentModal}
        setShow={setShowCommentModal}
        type={ModalInputEnum.addComment}
        data={data}
      />
    </>
  );
});
