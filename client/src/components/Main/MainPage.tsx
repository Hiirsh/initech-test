import React from "react";
import { Button, Card } from "react-bootstrap";
import Posts from "./MainPage/Posts";
import { PageNumbers } from "./MainPage/PageNumbers";
import { ModalInputEnum, base_url } from "../../utils/constants";
import { usePosts } from "../../hooks/usePosts";
import { ModalInput } from "../Modals/ModalInput";

export default function MainPage() {
  const { setPosts, setCurrentPage, setTotalPages } = usePosts();
  const [showAddPost, setShowAddPost] = React.useState(false);

  const getPosts = async (currentPage = 1) => {
    const responce = await fetch(`${base_url}/post/page/${currentPage}`);
    const data = await responce.json();
    setPosts(data.result);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
  };

  const handleAddPostModalShow = () => {
    setShowAddPost(!showAddPost);
  };
  React.useEffect(() => {
    getPosts();
  });

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Main Page</Card.Title>
          <Card.Text>
            <Button onPointerDown={handleAddPostModalShow}>Add post</Button>
          </Card.Text>
            <Posts getPosts={getPosts} />
          <Card.Footer>
            <PageNumbers updatePages={getPosts} />
          </Card.Footer>
        </Card.Body>
      </Card>
      <ModalInput show={showAddPost} setShow={handleAddPostModalShow} type={ModalInputEnum.addPost}/>
    </div>
  );
}
