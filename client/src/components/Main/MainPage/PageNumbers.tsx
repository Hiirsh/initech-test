import React from "react";
import { Pagination } from "react-bootstrap";
import { usePosts } from "../../../hooks/usePosts";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

export const PageNumbers = () => {
  const { getPostsByPage } = usePosts();
  
  const [pageNums, setPageNums] = React.useState<JSX.Element[]>([]);
  const { currentPage, totalPages } = useTypeSelector((state) => state.posts);
  
  const getPosts = React.useCallback(
    async (currentPage: number) => await getPostsByPage(currentPage),
    [getPostsByPage]
  );

  const getPage = React.useCallback(
    (page: number) => {
      getPosts(page);
    },
    [getPosts]
  );

  const getPageByClick = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) =>
      //@ts-ignore
      getPage(+e.target.firstChild.data),
    [getPage]
  );

  const setPages = React.useCallback(() => {
    let temp = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage)
        temp.push(
          <Pagination.Item key={i} active onPointerDown={getPageByClick}>
            {i}
          </Pagination.Item>
        );
      else
        temp.push(
          <Pagination.Item key={i} onPointerDown={getPageByClick}>
            {i}
          </Pagination.Item>
        );
    }
    setPageNums(temp);
  }, [totalPages, currentPage, getPageByClick]);

  React.useEffect(() => {
    console.log("React.useEffect - PageNumbers")
    setPages();
  }, [setPages]);

  return (
    <Pagination>
      {currentPage !== 1 && (
        <>
          <Pagination.First onPointerDown={() => getPage(1)} />
          <Pagination.Prev onPointerDown={() => getPage(currentPage - 1)} />
        </>
      )}
      {pageNums}
      {currentPage !== totalPages && (
        <>
          <Pagination.Next onPointerDown={() => getPage(currentPage + 1)} />
          <Pagination.Last onPointerDown={() => getPage(totalPages)} />
        </>
      )}
    </Pagination>
  );
};
