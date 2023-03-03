import React from "react";
import { Button } from "react-bootstrap";
import { useLogin } from "../../hooks/useLogin";
import Posts from "./MainPage/Posts";
import { PageNumbers } from "./MainPage/Pagination";
export default function MainPage() {
  const { setAuth, setLogin } = useLogin();
  const [currentPage, setCurrentPage] = React.useState(1);
  const logout = (): void => {
    setAuth(false);
    setLogin("");
  };
  return (
    <div>
      <h1>MainPage</h1>
      <Button>Add post</Button>
      <Posts page={currentPage} />
      <div>
        <Button variant="primary" onPointerDown={logout}>
          Logout
        </Button>
      </div>
      <PageNumbers currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
