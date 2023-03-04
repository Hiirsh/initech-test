import React from "react";
import { useComments } from "../../../../hooks/useComments";
import { usePosts } from "../../../../hooks/usePosts";
import { useTypeSelector } from "../../../../hooks/useTypeSelector";
import { IComment } from "../../../../interfaces/IComment";
import { IPost } from "../../../../interfaces/IPost";

interface ILike {
  data: IPost | IComment;
}
export const LikePanel = ({ data }: ILike) => {
  const element = "title" in data ? "post" : "comment";

  const { updatePost } = usePosts();
  const { updateComment } = useComments();
  const { login } = useTypeSelector((state) => state.login);
  const [isLiked, setIsLiked] = React.useState(data.likes.includes(login));
  const [isDisliked, setIsDisliked] = React.useState(
    data.dislikes.includes(login)
  );

  const handleClickLike = React.useCallback(() => {
    if (!isLiked) {
      if(isDisliked){
        const index = data.dislikes.findIndex((username) => username === login);
        data.dislikes.splice(index, 1);
        setIsDisliked(false)
      }
      data.likes.push(login)
      if (element === "post") {
        updatePost({ post: data as IPost, like: login });
      }
      if (element === "comment") {
        const { text } = data as IComment;
        updateComment({ id: data.id, likes: data.likes, dislikes:data.dislikes, text });
      }
      setIsLiked(true);
    }
    if (isLiked) {
      const index = data.likes.findIndex((username) => username === login);
      data.likes.splice(index, 1);
      if (element === "post") {
        updatePost({ post: data as IPost });
      }
      if (element === "comment") {
        const { likes, dislikes, text } = data as IComment;
        updateComment({ id: data.id, likes, dislikes, text });
      }
      setIsLiked(false);
    }
  }, [data, element, isLiked, login, updateComment, updatePost, isDisliked]);
  const handleClickDislike = React.useCallback(() => {
    if (!isDisliked) {
      if(isLiked){
        const index = data.likes.findIndex((username) => username === login);
        data.likes.splice(index, 1);
        setIsLiked(false)
      }
      if (element === "post") {
        updatePost({ post: data as IPost, dislike: login });
      }
      if (element === "comment") {
        const { likes, dislikes, text } = data as IComment;
        dislikes.push(login);
        updateComment({ id: data.id, likes, dislikes, text });
      }
      setIsDisliked(true);
    }
    if (isDisliked) {
      const index = data.likes.findIndex((username) => username === login);
      data.dislikes.splice(index, 1);
      if (element === "post") {
        updatePost({ post: data as IPost });
      }
      if (element === "comment") {
        const { likes, dislikes, text } = data as IComment;
        updateComment({ id: data.id, likes, dislikes, text });
      }
      setIsDisliked(false);
    }
  }, [data, element, login, updateComment, updatePost, isDisliked, isLiked]);

  return (
    <>
      <svg
        fill="#000000"
        width="20px"
        height="20px"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={handleClickLike}
      >
        {isLiked ? (
          <path
            d="M1863.059 1016.47c0-124.574-101.308-225.882-225.883-225.882H1203.37c-19.651 0-37.044-9.374-47.66-25.863-10.391-16.15-11.86-35.577-3.84-53.196 54.776-121.073 94.87-247.115 119.378-374.513 15.925-83.576-5.873-169.072-60.085-234.578C1157.29 37.384 1078.005 0 993.751 0H846.588v56.47c0 254.457-155.068 473.224-285.063 612.029-72.734 77.477-176.98 122.09-285.967 122.09H56v734.117C56 1742.682 233.318 1920 451.294 1920h960c124.574 0 225.882-101.308 225.882-225.882 0-46.42-14.117-89.676-38.174-125.59 87.869-30.947 151.116-114.862 151.116-213.234 0-46.419-14.118-89.675-38.174-125.59 87.868-30.946 151.115-114.862 151.115-213.233"
            fillRule="evenodd"
          />
        ) : (
          <path
            d="M1637.176 1129.412h-112.94v112.94c62.23 0 112.94 50.599 112.94 112.942 0 62.344-50.71 112.941-112.94 112.941h-112.942v112.941c62.23 0 112.941 50.598 112.941 112.942 0 62.343-50.71 112.94-112.94 112.94h-960c-155.634 0-282.354-126.606-282.354-282.352V903.529h106.617c140.16 0 274.334-57.6 368.3-157.778C778.486 602.089 937.28 379.256 957.385 112.94h36.367c50.484 0 98.033 22.363 130.334 61.44 32.64 39.53 45.854 91.144 36.14 141.515-22.7 118.589-60.197 236.048-111.246 349.102-23.83 52.517-19.313 112.602 11.746 160.94 31.397 48.566 84.706 77.591 142.644 77.591h433.807c62.231 0 112.942 50.598 112.942 112.942 0 62.343-50.71 112.94-112.942 112.94m225.883-112.94c0-124.575-101.308-225.883-225.883-225.883H1203.37c-19.651 0-37.044-9.374-47.66-25.863-10.391-16.15-11.86-35.577-3.84-53.196 54.663-121.073 94.87-247.115 119.378-374.513 15.925-83.576-5.873-169.072-60.085-234.578C1157.29 37.384 1078.005 0 993.751 0H846.588v56.47c0 254.457-155.068 473.224-285.063 612.029-72.734 77.477-176.98 122.09-285.967 122.09H56v734.117C56 1742.682 233.318 1920 451.294 1920h960c124.574 0 225.882-101.308 225.882-225.882 0-46.42-14.117-89.676-38.174-125.59 87.869-30.947 151.116-114.862 151.116-213.234 0-46.419-14.118-89.675-38.174-125.59 87.868-30.946 151.115-114.862 151.115-213.233"
            fillRule="evenodd"
          />
        )}
      </svg>
      <>
        {isDisliked ? (
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 52 52"
            enableBackground="new 0 0 52 52"
            xmlSpace="preserve"
            onPointerDown={handleClickDislike}
          >
            <g>
              <path
                d="M12,29.5V9c0-2.2-1.8-4-4-4H5.5C4.7,5,4,5.7,4,6.5v23C4,30.3,4.7,31,5.5,31h5C11.3,31,12,30.3,12,29.5z
       M48,26V13.5C48,4.8,41.1,4,33.6,4c-7.1,0-9.4,2.7-16.2,3C16.6,7,16,7.7,16,8.5v20c0,0.8,0.7,1.5,1.5,1.5c4.8,0,8.5,5.2,8.5,10.5v6
      c0,0.8,0.7,1.5,1.5,1.5H30c2.2,0,4-1.8,4-4V34c0-2.2,1.8-4,4-4h6C46.2,30,48,28.2,48,26z"
              />
            </g>
          </svg>
        ) : (
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onPointerDown={handleClickDislike}
          >
            <path
              d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </>
    </>
  );
};
