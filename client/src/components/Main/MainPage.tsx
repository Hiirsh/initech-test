import React from "react";
import { Button, Card } from "react-bootstrap";
import { Posts } from "./MainPage/Posts";
import { PageNumbers } from "./MainPage/PageNumbers";
import { ModalInputEnum } from "../../utils/constants";
import { usePosts } from "../../hooks/usePosts";
import { ModalInput } from "../Modals/ModalInput";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { Search } from "./MainPage/Search";

export default function MainPage() {
  const { getPostsByPage } = usePosts();
  const [showAddPost, setShowAddPost] = React.useState(false);
  const { currentPage } = useTypeSelector((state) => state.posts);
  const [isSearching, setIsSearching] = React.useState(false);

  const getPosts = React.useCallback(
    async (currentPage: number) => await getPostsByPage(currentPage),
    [getPostsByPage]
  );

  const handleAddPostModalShow = () => {
    setShowAddPost(!showAddPost);
  };

  React.useEffect(() => {
    console.log("React.useEffect - MainPage");
    getPosts(currentPage);
  }, [getPosts, currentPage]);

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
          <Card.Footer>{!isSearching && <PageNumbers />}</Card.Footer>
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
