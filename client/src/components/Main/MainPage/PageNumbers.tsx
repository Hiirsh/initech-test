import React, { useCallback } from "react";
import { Pagination } from "react-bootstrap";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

interface IPageNumbers {
  updatePages: (value: number) => void;
}
export const PageNumbers = ({ updatePages }: IPageNumbers) => {
  const [pageNums, setPageNums] = React.useState<JSX.Element[]>([]);
  const currentPage = useTypeSelector((state) => state.posts.currentPage);
  const totalPages = useTypeSelector((state) => state.posts.totalPages);

  const getNextPage = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      //@ts-ignore
      updatePages(+e.target.firstChild.data);
    },
    [updatePages]
  );

  const setPages = useCallback(() => {
    let temp = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage)
        temp.push(
          <Pagination.Item key={i} active onPointerDown={getNextPage}>
            {i}
          </Pagination.Item>
        );
      else
        temp.push(
          <Pagination.Item key={i} onPointerDown={getNextPage}>
            {i}
          </Pagination.Item>
        );
    }
    setPageNums(temp);
  }, [totalPages, currentPage, getNextPage]);

  React.useEffect(() => {
    setPages();
  }, [setPages]);

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {pageNums}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};
