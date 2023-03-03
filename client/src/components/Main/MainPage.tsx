import React from "react";
import { Button } from "react-bootstrap";
import { useLogin } from "../../hooks/useLogin";
import Posts from "./MainPage/Posts";
import { PageNumbers } from "./MainPage/PageNumbers";
import { base_url } from "../../utils/constants";
import { usePosts } from "../../hooks/usePosts";

export default function MainPage() {
  const { setAuth, setLogin } = useLogin();
  const logout = (): void => {
    setAuth(false);
    setLogin("");
  };
  const { setPosts, setCurrentPage, setTotalPages } = usePosts();

  const getPosts = async (currentPage = 1) => {
    const responce = await fetch(`${base_url}/post/page/${currentPage}`);
    const data = await responce.json();
    setPosts(data.result);
    setCurrentPage(data.page)
    setTotalPages(data.totalPages)
  };
  return (
    <div>
      <h1>MainPage</h1>
      <Button>Add post</Button>
      <Posts getPosts={getPosts}/>
      <div>
        <Button variant="primary" onPointerDown={logout}>
          Logout
        </Button>
      </div>
      <PageNumbers updatePages={getPosts}/>
    </div>
  );
}
