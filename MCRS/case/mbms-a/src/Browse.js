import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { METHOD_CHUNKS } from "./methodChunks";
import { NavLink } from "react-router-dom";
import axios from "axios";

export const post = x => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNvbXBhbnktYS1sdGQiLCJpYXQiOjE1NjUxMzc0MDh9.laBjjzdoRF3sni0h-XyqzrwQg8cFGR6cuvHcJfVN44M";
  const config = {
    headers: { Authorization: "Bearer " + token }
  };
  axios
    .post("http://localhost:4000/method-chunks/", METHOD_CHUNKS[x], config)
    .then(res => {
      alert(res.status + " " + res.statusText);
      console.log(res.data);
      return res;
    })
    .catch(err => {
      alert(err);
      console.log(err);
      return err;
    });
};
const Publish = () => (
  <Container>
    <h1 className="pt-5 pb-3">Method Chunks</h1>
    {METHOD_CHUNKS.all.map(e => (
      <Card className="mb-3" key={e}>
        <Card.Body>
          <Card.Title>{METHOD_CHUNKS[e].name}</Card.Title>
          <Card.Text>{METHOD_CHUNKS[e].description}</Card.Text>
          <NavLink
            className="mr-1 btn btn-primary"
            to={"/" + METHOD_CHUNKS[e].nameId}
          >
            Detail
          </NavLink>
          <Button
            variant="primary"
            onClick={() => {
              post(e);
            }}
          >
            Publish
          </Button>
        </Card.Body>
      </Card>
    ))}
  </Container>
);
export default Publish;
