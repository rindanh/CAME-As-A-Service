import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Row, Card, Form, Col, Table, Button, Fade } from "react-bootstrap";

import { history } from '../_helpers'

import { projectActions } from '../_actions'

function MCCard(props) {
  const [open, setOpen] = useState(false);

  const mc = props.mc

  let chunkString = JSON.stringify(mc, null, 2)

  return (
    <>
        {
            !open ? 
            <Card>
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                >
                    {mc.name ? mc.name : "Created chunk"}
                </Card.Header>
            </Card>
            : 
            <Card id="example-fade-text">
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                >
                    {mc.name ? mc.name : "Created chunk"}
                </Card.Header>
                <Fade in={open}>
                    <Card.Body>
                        <code>
                            <pre>
                                {chunkString}
                            </pre>
                        </code>
                    </Card.Body>
                </Fade>
            </Card>
        }
        
    </>
  );
}


class ProjectDetailPage extends React.Component {

	constructor(props) {
        super(props);
        
        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project

        this.props.getDetail(pid)

        this.editProject = this.editProject.bind(this)
        this.recommendMC = this.recommendMC.bind(this)
        this.composeMC = this.composeMC.bind(this)

    }

    editProject() {
        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project
        let endpoint = '/edit-project/' + pid
        history.push(endpoint)
    }

    recommendMC() {
        let id = "/find/" + this.props.project.id
        history.push(id)
    }

    composeMC() {
        if (this.props.project.method_chunks.length < 2) {
            alert('Cannot compose. please select method chunks first.')
        } else {
            let endpoint = '/compose/' + this.props.project.id
            history.push(endpoint)
        }
    }

	render() {
        const project = this.props.project
        return (
            <div>
                <h1>Project Detail Page</h1>
                <br />
                {
                    project ? 
                    <div>
                        <Row className="d-flex">
                            <Col xs={10} sm={12} md={10}>
                                <h2>Project: { project.name }</h2>
                            </Col>
                            <Col xs={2} sm={12} md={2}>
                                <p>Owner: { project.user }</p>
                            </Col>
                        </Row>
                        
                        <br/>
                        <p>
                        Description: <br/>
                        {project.description}
                        </p>
                        <h5>Characteristics</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>weight</th>
                                    <th>rule</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    project.characteristics.map((el, idx) => (
                                        <tr key={idx}>
                                            <td>{el.id}</td>
                                            <td>{el.weight || "N/A"}</td>
                                            <td>
                                                {el.rule}{" "}
                                                {el.rule === "maximum" || el.rule === "minimum"
                                                  ? ""
                                                  : " (" + el.value.join(",") + ") "}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                        <h5>Method Chunks</h5>
                        {
                            project.method_chunks ? 
                            project.method_chunks.map((el, idx) => (
                                <MCCard mc={el}/>
                            ))
                            : <h6>No method chunk has been added to this project</h6>
                        }
                        <br/>
                        <h5>Created Method</h5>
                        {
                            project.method ?
                            <MCCard mc={project.method}/>
                            : <h6>No method has been created for this project</h6>
                        }

                        <Row className="d-flex justify-content-center">
                            <Button
                                onClick={() => this.props.deleteProject(project._id)}
                                variant="danger"
                            >
                                Delete this Project
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                onClick={() => this.editProject()}
                            >
                                Edit this Project
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                onClick={() => this.recommendMC()}
                            >
                                Get Method Chunk Recommendation
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                onClick={() => this.composeMC()}
                            >
                                Compose Method Chunk
                            </Button>
                        </Row>
                    </div>
                    :
                    null
                }
                
            </div>
        );
	}
}

const mapStateToProps = state => { 
    return({
        project: state.projects.item
    })
};

const mapDispatchToProps = {
    getDetail: projectActions.getOneByPid,
    deleteProject: projectActions.delete
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectDetailPage);