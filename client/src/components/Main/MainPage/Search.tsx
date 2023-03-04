import React from "react";
import { Form, Button } from "react-bootstrap";
import { usePosts } from "../../../hooks/usePosts";

interface ISearch {
  setIsSearching: (isSearching: boolean) => void;
}
export const Search = ({ setIsSearching }: ISearch) => {
  const [keyWord, setKeyWord] = React.useState("");
  const { filterPosts, getPostsByPage } = usePosts();

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setKeyWord(e.target.value);
    },
    [setKeyWord]
  );

  const handleReset = React.useCallback(() => {
    getPostsByPage(1);
    setKeyWord("");
  }, [getPostsByPage]);

  const handleButtonSearch = React.useCallback(() => {
    if (keyWord) filterPosts(keyWord);
    if (!keyWord) handleReset();
  }, [filterPosts, keyWord, handleReset]);

  React.useEffect(() => {
    const getFilteredPosts = setTimeout(() => {
      if (keyWord) filterPosts(keyWord);
      if (!keyWord) getPostsByPage(1);
    }, 1000);
    return () => clearTimeout(getFilteredPosts);
  }, [keyWord, filterPosts, getPostsByPage]);

  React.useEffect(() => {
    if (keyWord) setIsSearching(true);
    else setIsSearching(false);
  }, [keyWord, setIsSearching]);

  return (
    <Form.Group>
      <Form.Control
        type="text"
        placeholder="Enter key word"
        value={keyWord}
        onChange={(e) => handleSearch(e)}
        className="mb-1 mt-1"
      />
      <Button className="m-1" type="button" onPointerDown={handleButtonSearch}>
        Search
      </Button>
      <Button className="m-1" type="button" onPointerDown={handleReset}>
        Reset
      </Button>
    </Form.Group>
  );
};
