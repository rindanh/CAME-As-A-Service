import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Row, Card, Form, Spinner, Table, ToggleButton, ToggleButtonGroup, Button } from "react-bootstrap";

import { methodchunkrecActions, projectActions } from '../_actions'

import './MethodChunkListPage.css'

function MethodChunkCard(props) {
    return (
        <Row className="d-block">
            <Card>
                <Card.Header as="h5">{props.project.name}</Card.Header>
                <Card.Body>
                        <Card.Text>
                        Description: <br/>
                        {props.project.description}
                        </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    )
    
}


// sementara nampilin dari model weightsum dulu
class MethodChunkListPage extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            selectedMC: []
        }
        
        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project
        let data = {
            project_id: pid
        }
        this.props.findRecommendation(data)

        this.setChecked = this.setChecked.bind(this)
    }
    

    setChecked(id) {

        let mc = id;

        if (Array.isArray(id)) {
            mc = id[0]
        }
        
        let mcs = this.state.selectedMC

        var index = mcs.indexOf(mc)
        if (index !== -1) {
            mcs.splice(index, 1)
        } else {
            mcs.push(mc)
        }
        this.setState({
            selectedMC: mcs
        })
    }

    saveMCtoProject() {
        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project
        let data = {
            project_id: pid
        }

        let method_chunks = []
        let mc_id, source_name, source_url, mc
        this.state.selectedMC.forEach((el, idx) => {
            mc_id = this.props.methodchunksrec.results[0].values[el].methodChunk.id
            source_name = this.props.methodchunksrec.results[0].values[el].methodChunk.provider
            source_url = this.props.methodchunksrec.results[0].values[el].methodChunk.url

            mc = {
                name_id: mc_id,
                source: {
                    name: source_name,
                    url: source_url
                }
            }

            method_chunks.push(mc)
        })

        console.log("method_chunks", method_chunks)

        data.method_chunks = method_chunks
        console.log(data)
        this.props.saveMC(data)
        // history.push
    }

	render() {
		var mcs = this.props.methodchunksrec ? this.props.methodchunksrec.results[0].values : null
        // console.log(this.state.selectedMC)
        return (
            <div>
                <h1>Method Chunk Recommendation Page</h1>
                <br />
                <div>
                    { mcs ?
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Method Chunk Name and Score</th>
                                    <th>Characteristics</th>
                                    <th>Selected</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mcs.map((el, idx) => (
                                        <tr key={idx} onClick={() => this.setChecked(idx)} className={this.state.selectedMC.indexOf(idx) !== -1 ? "row-selected" : ""}>
                                            <td>{el.rank}</td>
                                            <td>
                                                {el.methodChunk.name}
                                                <br />
                                                {el.score}
                                            </td>
                                            <td>
                                                <ul>
                                                    {el.methodChunk.characteristics.map((e, index) => (
                                                        <li key={e.id + "" + e.ref}>
                                                            {e.id}: {e.value} (ref: {e.ref})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <ToggleButtonGroup type="checkbox" onChange={this.setChecked}>
                                                    <ToggleButton
                                                      type="checkbox"
                                                      variant={this.state.selectedMC.indexOf(idx) !== -1 ? "secondary" : "primary"}
                                                      value={idx}
                                                    >
                                                      {this.state.selectedMC.indexOf(idx) !== -1 ? "Selected" : "Not Selected"}
                                                    </ToggleButton>
                                                </ToggleButtonGroup>  
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        : null
                    }
                         
                </div>
                <div>
                    {this.props.methodchunksrec ? "" : <Spinner animation="border" />}
                </div>

                {
                    mcs ?
                    <Row className="d-flex justify-content-center">
                        <Button
                            onClick={() => this.saveMCtoProject()}
                        >
                            Save Method Chunk and Compose
                        </Button>
                    </Row>
                    :
                    null
                }
                
            </div>
        );
	}
}

const mapStateToProps = state => { 
    return ({
        methodchunksrec: state.methodchunksrec.items
    })
};

const mapDispatchToProps = {
  findRecommendation: methodchunkrecActions.find,
  saveMC: projectActions.saveMCForProject
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MethodChunkListPage);