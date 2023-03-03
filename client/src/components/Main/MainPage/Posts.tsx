import React from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { Post } from "./Posts/Post";

interface Props {
  getPosts: (value: number) => void;
}
export default function Posts({ getPosts }: Props) {
  const { posts } = useTypeSelector((state) => state.posts);

  return (
    <div>
      {posts.map((post, key) => (
        <Post post={post} key={key} />
      ))}
    </div>
  );
}
