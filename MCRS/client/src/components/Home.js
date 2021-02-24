import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Card, Jumbotron, Button, CardDeck } from "react-bootstrap";
import "./pages.css";

const Home = () => (
  <Container fluid className="pt-3 pb-5 home">
    <Jumbotron>
      <h1>Welcome to MCRS!</h1>
      <p>Method Chunk Registry System</p>
      <p>
        <a target="_blank" href="https://github.com/audrynyonata/mcrs" rel="noopener noreferrer">
          <Button variant="primary">Learn more</Button>
        </a>
      </p>
    </Jumbotron>
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title>Providers</Card.Title>
          <Card.Text>
            Browse through list of all registered method chunk providers to find more information
            about the company.
          </Card.Text>
          <NavLink to="/providers">List providers</NavLink>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Method Chunks</Card.Title>
          <Card.Text>
            Browse through list of all available method chunks that can be selected in situational
            method assembly.
          </Card.Text>
          <NavLink to="/method-chunks">List method chunks</NavLink>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Characteristics</Card.Title>
          <Card.Text>
            See list of all available characteristics that can be used to define project or method
            chunk.
          </Card.Text>
          <NavLink to="/characteristics">List characteristics</NavLink>
        </Card.Body>
      </Card>
    </CardDeck>
    <br />
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title>Projects</Card.Title>
          <Card.Text>
            See list of registered projects as reference or to start getting method chunk
            recommendations.
          </Card.Text>
          <NavLink to="/projects">List projects</NavLink>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Publish</Card.Title>
          <Card.Text>
            Publish external method chunk enabling it to be searched and reused in other projects.
          </Card.Text>
          <NavLink to="/publish">Publish method chunk</NavLink>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Find</Card.Title>
          <Card.Text>
            Find suitable method chunks according to project characteristics using various matching
            algorithm.
          </Card.Text>
          <NavLink to="/find">Find method chunk</NavLink>
        </Card.Body>
      </Card>
    </CardDeck>
  </Container>
);

export default Home;
