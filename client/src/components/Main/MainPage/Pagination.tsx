import React from "react";
import { Pagination } from "react-bootstrap";
import { useTypeSelector } from "../../../hooks/useTypeSelector";

interface IPageNumbers {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export const PageNumbers = ({ currentPage, setCurrentPage }: IPageNumbers) => {
  const { posts } = useTypeSelector((state) => state.posts);
  const totalPagesNumber = React.useRef(Math.ceil(posts.length / 9));
  const [pageNums, setPageNums] = React.useState([]);
  React.useEffect(() => {
    let pages = [];

    for (let i = 1; i <= totalPagesNumber.current; i++) {
      if (currentPage === i)
        setPageNums(
          pageNums.push(
            <Pagination.Item
              active
              value={i}
              onPointerDown={() => setCurrentPage(i)}
            >
              {i}
            </Pagination.Item>
          )
        );
      else pages.push(<Pagination.Item>{i}</Pagination.Item>);
    }
    setPageNums(pages);
  }, [currentPage, setCurrentPage]);

  // for (let i = 1; i <= totalPagesNumber.current; i++) {
  //   if (currentPage === i)
  //     pages.push(
  //       <Pagination.Item
  //         active
  //         value={i}
  //         onPointerDown={() => setCurrentPage(i)}
  //       >
  //         {i}
  //       </Pagination.Item>
  //     );
  //   else pages.push(<Pagination.Item>{i}</Pagination.Item>);
  // }
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
