import React from 'react';
import { Container, Button, Row, CardDeck, Card, Col, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";

import { configActions } from '../_actions'


class HomePage extends React.Component {

    constructor(props) {
        super(props)
    }


	render() {
		return (
                <div>
                    <Jumbotron>
                        <Row className="row">
                            <h1>Home</h1>
                        </Row>
                        <Row>
                            <h2>{this.props.user.tenantId == 'org1' ? "Organization 1" : "Organization 2"}</h2>
                        </Row>
                        <br/>
                        <Row className="row">
                            <h3>Hi <span>{this.props.user.username}!</span></h3>
                        </Row>
                    </Jumbotron>
                    <CardDeck>
                        <Card>
                            <Card.Header as="h3">Projects</Card.Header>
                            <Card.Body>
                                    <Card.Text>
                                    Browse through list of projects that has been created in this organization.
                                    </Card.Text>
                                    <Card.Link href="/projects">List projects</Card.Link>
                                    <br />
                                    <Card.Link href="/create-project">Create project</Card.Link>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header as="h3">Characteristics</Card.Header>
                            <Card.Body>
                                    <Card.Text>
                                    Browse through list of characteristics that has been defined.
                                    </Card.Text>
                                    <Card.Link href="/characteristics">List characteristics</Card.Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>

		)
	}
}

const mapStateToProps = state => {
    return ({
        user: state.authentication.user
    })
};

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);