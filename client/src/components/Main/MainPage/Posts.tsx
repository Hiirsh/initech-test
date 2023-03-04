import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { CardScheme } from "./Posts/CardScheme";

export const Posts = () => {
  const { posts } = useTypeSelector((state) => state.posts);

  return (
    <div>
      <Container>
        <Row xs={1} md={2} lg={3} className="justify-content-md-center">
          {posts.map((post, key) => (
            <Col key={key}>
              <CardScheme data={post} key={key} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
