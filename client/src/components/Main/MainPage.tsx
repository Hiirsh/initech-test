import React from "react";
import { Button, Card } from "react-bootstrap";
import { Posts } from "./MainPage/Posts";
import { PageNumbers } from "./MainPage/PageNumbers";
import { ModalInputEnum } from "../../utils/constants";
import { ModalInput } from "../Modals/ModalInput";
import { Search } from "./MainPage/Search";

export default function MainPage() {
  const [showAddPost, setShowAddPost] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleAddPostModalShow = () => {
    setShowAddPost(!showAddPost);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Main Page</Card.Title>
          <Card.Body>
            <Search setIsSearching={setIsSearching} />
          </Card.Body>
          <Card.Text>
            <Button onPointerDown={handleAddPostModalShow}>Add post</Button>
          </Card.Text>
          <Posts />
          {!isSearching && (
            <Card.Footer>
              <div className="d-flex justify-content-center">
                <PageNumbers />
              </div>
            </Card.Footer>
          )}
        </Card.Body>
      </Card>
      <ModalInput
        show={showAddPost}
        setShow={handleAddPostModalShow}
        type={ModalInputEnum.addPost}
      />
    </div>
  );
}
