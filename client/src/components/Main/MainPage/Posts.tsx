import React from "react";
import { base_url } from "../../../utils/constants";
import { usePosts } from "../../../hooks/usePosts";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { Post } from "./Posts/Post";

interface Props {
  page: number;
}
export default function Posts({ page }: Props) {
  const { setPosts } = usePosts();
  const { posts } = useTypeSelector((state) => state.posts);

  const getPosts = async () => {
    const responce = await fetch(`${base_url}/post/page/${page}`);
    const data = await responce.json();
    setPosts(data.result);
  };

  React.useEffect(() => {
    getPosts();
  });

  return (
    <div>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
