import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Row, Card, Col } from "react-bootstrap";
import { history } from '../_helpers'

import { projectActions } from '../_actions'

import './ProjectListPage.css'

function ProjectCard(props) {
    return (
        <Row className="d-block">
            <Card className="project-card" onClick={props.onClick}>
                <Card.Header as="h5">{props.project.name}</Card.Header>
                <Card.Body>
                        <Card.Text>
                            <Row className="d-flex">
                                <Col xs={5} sm={12} md={5}>
                                Description:
                                </Col>
                                <Col xs={7} sm={12} md={7}>
                                <span className="tooltiptext">Click to see the detail</span> 
                                </Col>
                            </Row>
                        {props.project.description}
                        </Card.Text>
                        <Card.Text>
                        Owner: {props.project.user}
                        </Card.Text>
                        
                </Card.Body>
            </Card>
        </Row>
    )
    
}

class ProjectListPage extends React.Component {

	constructor(props) {
        super(props);

        this.props.getAll(this.props.user.tenantId)

        this.handleProjectClick = this.handleProjectClick.bind(this)

    }

    handleProjectClick(project) {
        console.log("clicked", project)
        let id = '/projects/' + project.id
        history.push(id)
    }


	render() {
		const projects = this.props.projects.items
        return (
            <div>
                <h1>List Project Page</h1>
                <br />
                {projects ? projects.length>0 ? projects.map((p, idx) => (
                    <div>
                        <ProjectCard
                            project={p}
                            onClick={() => this.handleProjectClick(p)}
                        />
                        <br />
                    </div>
                )): <p>No Projects</p>
                : null}
            </div>
        );
	}
}

const mapStateToProps = state => { 
    return ({
        projects: state.projects,
        user: state.authentication.user
    })
};

const mapDispatchToProps = {
  getAll: projectActions.getAll,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectListPage);