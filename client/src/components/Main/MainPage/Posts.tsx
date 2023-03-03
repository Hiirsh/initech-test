import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { Post } from "./Posts/Post";

interface Props {
  getPosts: (value: number) => void;
}
export default function Posts({ getPosts }: Props) {
  const { posts } = useTypeSelector((state) => state.posts);

  return (
    <div>
      <Container>
        <Row xs={1} md={2} lg={3} className='justify-content-md-center'>
          {posts.map((post, key) => (
            <Col key={key}>
              <Post post={post} key={key} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
