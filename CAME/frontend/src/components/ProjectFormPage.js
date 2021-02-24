import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import { history } from '../_helpers'
import { projectActions, characteristicActions, dimensionActions } from '../_actions'
import './ProjectFormPage.css'

const CharacteristicCard = props => (
    <Col xs={6} sm={12} md={4} className="mb-3 px-2">
        <Card
            className={
                "characteristic-card cursor-pointer shadow-sm d-flex justify-content-end text-center " +
                (props.checked && "checked")
            }
            onClick={props.onClick}
        >
            <p>{props.characteristic.name}</p>
        </Card>
    </Col>
)


class ProjectFormPage extends React.Component {

	constructor(props) {
    super(props)

    this.props.getAllCharacteristics()
    this.props.getAllDimensions()

    this.handleChange = this.handleChange.bind(this);

    let url = this.props.match.url
    let edit = false
    let pid
    let loading = false
    if (url.indexOf("/edit-project") !== -1) {
      edit = true
      pid = this.initEditProject(this.props.match)
      loading = true
    }

    this.state = {
      name: "",
      description: "",
      characteristics: [],
      new: !edit,
      loading: loading,
      pid: pid
    };
        
  }


  initEditProject(match) {
    let params = match.params

    let user = params.user;
    let project = params.project;
    let pid = user + '/' + project

    this.props.getProjectDetail(pid)
    return pid
  }

  createRequest() {
    if (this.state.new) {
      let chars= this.state.characteristics
      let arrC = []
      chars.forEach((c, i) => {
        delete c.idx
        arrC.push(c)
      })

      let body = { ...this.state };
      delete body["new"]
      delete body["loading"]
      delete body["pid"]
      body.characteristics = arrC
      body._id = undefined;
      this.props.createProject(body)
    } else {
      let pid = this.state.pid
      let chars= this.state.characteristics
      let arrC = []
      chars.forEach((c, i) => {
        delete c.idx
        arrC.push(c)
      })

      let body = {...this.props.currentProject}
      body.name = this.state.name
      body.description = this.state.description
      body.characteristics = arrC.slice()

      this.props.updateProject(body, pid)

    }
    // if (method === "PUT") {
    //   console.log("PUT", this.state);
      /// axios
      //   .put("/projects/" + pid, this.state)
      //   .then(res => {
      //     console.log("res", res);
      //     console.log(`Item - ${res.data.name} added successfully`);
      //     this.props.updateProject(res.data);
      //     alert(res.status + " " + res.statusText);
      //     if (saveOnly) {
      //       this.props.history.push("/projects#" + res.data.id);
      //     } else {
      //       this.props.history.push("/find/" + res.data.id);
      //     }
      //   })
      //   .catch(e => {
      //     alert("Failed");
      //     console.log("Update failed , Error ", e);
      //   });
    // } else {
      // let chars= this.state.characteristics
      // let arrC = []
      // chars.forEach((c, i) => {
      //   delete c.idx
      //   arrC.push(c)
      // })

      // let body = { ...this.state };
      // body.characteristics = arrC
      // body._id = undefined;
      // this.props.createProject(body)

      // let project_id = body.name.replace(/\s/g,'-').toLowerCase()

      // history.push('/find/' + this.props.user.username + '/' + project_id)
      /// axios
      // .post("/projects", body)
      // .then(res => {
      //   console.log("res", res);
      //   console.log(`Item - ${res.data.name} added successfully`);
      //   this.props.addProject(res.data);
      //   alert(res.status + " " + res.statusText);
      //   // if (saveOnly) {
      //   //   this.props.history.push("/projects#" + res.data.id);
      //   // } else {
      //   history.push("/find/" + res.data.id);
      //   // }
      // })
      // .catch(e => {
      //   alert("Failed");
      //   console.log("Addition failed , Error ", e);
      // });
      
    // }
  };

  handleChange(e){
    let split = e.currentTarget.name.split(".");
    let key = null;
    let idx = null;
    let item = null;
    switch (split.length) {
      case 2:
        key = split[0];
        idx = split[1];
        item = this.state[key];
        item[idx] = e.currentTarget.value;
        this.setState({ [key]: item });
        break;
      case 3:
        key = split[0];
        idx = split[1];
        let prop = split[2];
        item = this.state[key][idx];
        item[prop] = e.currentTarget.value;
        if (prop === "value") {
          item[prop] = e.currentTarget.value.replace(/\s*,\s*/g, ",").split(",");
        }
        this.setState({ [key[idx]]: item });
        break;
      default:
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        break;
    }
  };

  toggleCharacteristic(char_id, idx) {
    let found = false;
    this.state.characteristics.forEach((c, idx) => {
      if (c.id === char_id) {
        found = true;
        this.setState(prevState => {
          let characteristics = [...prevState.characteristics];
          characteristics.splice(idx, 1);
          return { characteristics };
        });
      }
    });
    if (!found) {
      this.setState(prevState => {
        return {
          characteristics: [
            ...prevState.characteristics,
            { idx:idx, id: char_id, weight: "", ref: "", rule: "", value: "" }
          ]
        }
      });
    }
  };


//  to-do: masih belom kepanggil
  initCharacteristics(project, chars) {
    console.log("masokkk")
    let chars_project = project.characteristics

    for (let idx_char_p in chars_project) {
      for (let idx_char in chars) {
        if (chars_project[idx_char_p].id === chars[idx_char].id) {
          chars_project[idx_char_p]['idx'] = parseInt(idx_char)
          break
        }
      }
    }

    this.setState({
      name: project.name,
      description: project.description,
      characteristics: project.characteristics.slice(),
      loading: false
    })
    return
  }

  componentDidUpdate(prevprops) {
    if (this.props.currentProject !== prevprops.currentProject && this.props.characteristics) {
      this.initCharacteristics(this.props.currentProject, this.props.characteristics)
    }
  }

	render() {
		const dimensions = this.props.dimensions
    const characteristics = this.props.characteristics

    
    let chars = this.state.characteristics
    // console.log("chars", chars)
    return (
        <div>
            <Row>
              {
                this.state.new ?
                  <h2>Project Form Page</h2>
                :
                  <h2>Edit Project Form Page</h2>
              }
            </Row>
            {
              this.state.loading ?
                <Spinner animation="border" />
              :
                <Row className="d-block">
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="name"
                              name="name"
                              placeholder="Enter project name"
                              value={this.state.name || ""}
                              onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description (optional)</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="5"
                              name="description"
                              placeholder="Enter project description..."
                              value={this.state.description || ""}
                              onChange={this.handleChange}
                            />
                        </Form.Group>
                        <p><strong>Choose characteristics</strong></p>
                        <Row>
                            <Col xs={12} sm={6} lg={4} className="column-left">
                                <Row>
                                    <h5><strong>Organisational</strong></h5>
                                </Row>
                                <Row>
                                    {characteristics ? characteristics.map((c, idx) => (
                                        c.dimension === 'organisational' ?
                                        <CharacteristicCard
                                            checked={this.state.characteristics.map(e => e.id).includes(c.id)}
                                            characteristic={c}
                                            onClick={() => this.toggleCharacteristic(c.id, idx)}
                                        />
                                        : null
                                    )) : null}
                                </Row>
                                <Row>
                                    <h5><strong>Human</strong></h5>
                                </Row>
                                <Row>
                                    {characteristics ? characteristics.map((c, idx) => (
                                        c.dimension === 'human' ?
                                        <CharacteristicCard
                                            checked={this.state.characteristics.map(e => e.id).includes(c.id)}
                                            characteristic={c}
                                            onClick={() => this.toggleCharacteristic(c.id, idx)}
                                        />
                                        : null
                                    )) : null}
                                </Row>

                                <Row>
                                    <h5><strong>Application Domain</strong></h5>
                                </Row>
                                <Row>
                                    {characteristics ? characteristics.map((c, idx) => (
                                        c.dimension === 'application-domain' ?
                                        <CharacteristicCard
                                            checked={this.state.characteristics.map(e => e.id).includes(c.id)}
                                            characteristic={c}
                                            onClick={() => this.toggleCharacteristic(c.id, idx)}
                                        />
                                        : null
                                    )) : null}
                                </Row>

                                <Row>
                                    <h5><strong>Development Strategy</strong></h5>
                                </Row>
                                <Row>
                                    {characteristics ? characteristics.map((c, idx) => (
                                        c.dimension === 'development-strategy' ?
                                        <CharacteristicCard
                                            checked={this.state.characteristics.map(e => e.id).includes(c.id)}
                                            characteristic={c}
                                            onClick={() => this.toggleCharacteristic(c.id, idx)}
                                        />
                                        : null
                                    )) : null}
                                </Row>
                                <Row>
                                    <h5><strong>Others</strong></h5>
                                </Row>
                                <Row>
                                    {characteristics ? characteristics.map((c, idx) => (
                                        c.dimension !== 'development-strategy' && c.dimension !== 'application-domain' && c.dimension !== 'human' && c.dimension !== 'organisational' ?
                                        <CharacteristicCard
                                            checked={this.state.characteristics.map(e => e.id).includes(c.id)}
                                            characteristic={c}
                                            onClick={() => this.toggleCharacteristic(c.id, idx)}
                                        />
                                        : null
                                    )) : null}
                                </Row>

                            </Col>
                            <Col xs={12} sm={6} lg={8}>
                                {this.state.characteristics.map((e, index) => (
                                    <Form.Row key={e.id}>
                                      <Form.Group as={Col} md={2} controlId="cname">
                                        {characteristics[this.state.characteristics[index].idx].name}
                                        <Form.Control type="hidden" value={characteristics[e.idx].name} />
                                      </Form.Group>

                                      <Form.Group as={Col} md={2} controlId="cweight">
                                        <Form.Label>Weight (optional)</Form.Label>
                                        <Form.Control
                                          placeholder="Enter weight"
                                          value={this.state.characteristics[index].weight || ""}
                                          name={"characteristics." + index + ".weight"}
                                          onChange={this.handleChange}
                                        />
                                      </Form.Group>

                                      <Form.Group as={Col} md={2} controlId="cref">
                                        <Form.Label>Ref</Form.Label>
                                        <Form.Control
                                          as="select"
                                          value={this.state.characteristics[index].ref || ""}
                                          name={"characteristics." + index + ".ref"}
                                          onChange={this.handleChange}
                                        >
                                          <option value="">Choose ref</option>
                                          {characteristics[e.idx].characteristicValues.map(cv => (
                                            <option value={cv.ref} key={cv.ref}>
                                              {cv.ref}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </Form.Group>

                                      <Form.Group as={Col} md={2} controlId="crule">
                                        <Form.Label>Rule</Form.Label>
                                        <Form.Control
                                          as="select"
                                          value={this.state.characteristics[index].rule || ""}
                                          name={"characteristics." + index + ".rule"}
                                          onChange={this.handleChange}
                                        >
                                          <option value="">Choose rule</option>
                                          {this.state.characteristics[index].ref ? (
                                            characteristics[
                                              this.state.characteristics[index].idx
                                            ].characteristicValues.find(
                                              cv => cv.ref === this.state.characteristics[index].ref
                                            ).isQuantifiable ? (
                                              <React.Fragment>
                                                <option value="minimum">minimum</option>
                                                <option value="maximum">maximum</option>
                                                <option value="exact">exact</option>
                                                <option value="preference_list">preference_list</option>
                                              </React.Fragment>
                                            ) : (
                                              <React.Fragment>
                                                <option value="exact">exact</option>
                                                <option value="preference_list">preference_list</option>
                                              </React.Fragment>
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </Form.Control>
                                      </Form.Group>

                                      <Form.Group
                                        as={Col}
                                        controlId="cvalue"
                                        className={
                                          ["exact", "preference_list"].includes(this.state.characteristics[index].rule)
                                            ? ""
                                            : "invisible"
                                        }
                                      >
                                        <Form.Label>
                                          Value{" "}
                                          {this.state.characteristics[index].rule === "preference_list"
                                            ? "(ex. low,normal,high)"
                                            : "(ex. low)"}
                                        </Form.Label>
                                        <Form.Control
                                          placeholder="Enter value"
                                          value={this.state.characteristics[index].value}
                                          name={"characteristics." + index + ".value"}
                                          onChange={this.handleChange}
                                        />
                                      </Form.Group>
                                      <Form.Group>
                                        <Button variant="link" onClick={() => this.toggleCharacteristic(e.id, e.idx)}>
                                          Remove
                                        </Button>
                                      </Form.Group>
                                    </Form.Row>
                                ))}
                            </Col>
                        </Row>
                    </Form>
                    <br />
                      <Button
                        variant="success"
                        className="float-right"
                        onClick={() => this.createRequest()}
                      >
                        {
                          this.state.new ?
                            <div>&nbsp;&nbsp;Save & Find Method Chunk&nbsp;&nbsp;</div>
                          :
                            <div>&nbsp;&nbsp;Update project&nbsp;&nbsp;</div>
                        }
                        
                      </Button>
                </Row>

                


            }
            
        </div>
        
    );
	}
}

const mapStateToProps = state => {
    return ({
        characteristics: state.characteristics.items,
        dimensions: state.dimensions,
        user: state.authentication.user,
        currentProject: state.projects.item
    })
};

const mapDispatchToProps = {
    createProject: projectActions.create,
    getAllCharacteristics: characteristicActions.getAll,
    getAllDimensions: dimensionActions.getAll,
    getProjectDetail: projectActions.getOneByPid,
    updateProject: projectActions.update
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFormPage);