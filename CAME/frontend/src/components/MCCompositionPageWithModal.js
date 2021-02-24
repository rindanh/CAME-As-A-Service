import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import { Row, Card, Form, Spinner, Table, ToggleButton, ToggleButtonGroup, Button, Col, Fade } from "react-bootstrap";

import { projectActions } from '../_actions'

import Modal from './Modal';
import "./modal.css";
import "./ChooseMCCard.css"

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

function ChooseMCCard(props) {
    return (
        <Row className="d-block">
            <Card className="choose-card" onClick={props.onClick}>
                <Card.Header as="h5">Title: Element name</Card.Header>
                <Card.Body>
                        <Card.Text>
                            <Row className="d-flex">
                                <Col xs={5} sm={12} md={5}>
                                Details of the element
                                </Col>
                                <Col xs={7} sm={12} md={7}>
                                <span className="tooltiptext">Choose this element</span> 
                                </Col>
                            </Row>
                        Detail
                        </Card.Text>
                        <Card.Text>
                        Detail
                        </Card.Text>
                        <Card.Text>
                        Detail
                        </Card.Text>
                        <Card.Text>
                        Detail
                        </Card.Text>
                        <Card.Text>
                        Detail
                        </Card.Text>
                        <Card.Text>
                        Detail
                        </Card.Text>
                        
                </Card.Body>
            </Card>
        </Row>
    )
    
}


class MCCompositionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            TemporaryEntryCriterionAlphas: [],
            TemporaryEntryCriterionWorkProducts: [],
            TemporaryCompletionCriterionAlphas: [],
            TemporaryCompletionCriterionWorkProducts: [],
            TemporaryActivity: [],
            TemporaryCompetency: [],
            TemporarySubAlphaWorkProduct: [],
            TemporarySubAlphaState: [],
            TemporaryWorkProduct: [],
            TemporarySubAlpha: [],
            TemporarySubAlphaWorkProduct: [],
            TemporarySubAlphaState: [],
            TemporaryPatterns: [],
            TemporaryPattern: [],

            extensionElementsToBeMerged: [],

            activitySpacesToBeMerged: [],
            competenciesToBeMerged: [],
            alphasToBeMerged: [],
            patternsToBeMerged: [],
            intentionsToBeMerged: [],
            characteristicsToBeMerged: [],

            activitySpacesConflicts: [],
            competenciesConflicts: [],
            alphasConflicts: [],
            patternsConflicts: [],
            characteristicsConflicts: [],

            createdChunk: {},
            created: false,

            modal: false,

            name: '',
            description: ''
        }

        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project;
        let data = {
            project_id: pid
        }
        this.props.getDetail(pid)

        this.composeMC = this.composeMC.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleChooseMCClick = this.handleChooseMCClick.bind(this)
    }

    isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key))
            return false;
        }
        return true;
    }

    isEqual(firstArray, secondArray) {
        console.log(firstArray);
        console.log(secondArray);
        if (firstArray.length !== secondArray.length) {
          console.log("Different size");
          return false;
        }

        for (var firstArrayIterator = 0; firstArrayIterator < firstArray.length; firstArrayIterator++) {
          if (secondArray.indexOf(firstArray[firstArrayIterator]) === -1) {
            console.log("Missing element")
            return false;
          }
        }
        console.log("Equal");

        return true;
    }

    delId(obj) {
        var keys = Object.keys(obj)

        for (var k of keys) {
            if (k == '_id') {
                delete obj['_id']
            }

            if (typeof obj[k] === 'object' || obj[k] instanceof Object) {   
                if (Array.isArray(obj[k])) {
                    for (var i=0; i<obj[k].length; i++) {
                        this.delId(obj[k][i])
                    }
                } else {
                    this.delId(obj[k])
                }
            }
        }
    }

    async composeMC() {
        console.log("yuk mulai compose")

        var taskToBeComposed = this.props.project.method_chunks
        this.delId(taskToBeComposed)
        var numberOfChunkToBeMerge = taskToBeComposed.length

        if (numberOfChunkToBeMerge >= 2) {
         
            let initChunk = taskToBeComposed[0]
            for (var i=1; i<taskToBeComposed.length;i++) {

                await new Promise(next => {
                    console.log("i", i)
                    let currentChunksToBeMerged = [initChunk, taskToBeComposed[i]]
                    console.log("currentChunksToBeMerged", currentChunksToBeMerged)

                    var promiseBeforeCompose = new Promise((resolve, reject) => {

                        for (let task of taskToBeComposed) {
                            this.applyExtension(task)
                        }

                        resolve()
                        
                    })

                    promiseBeforeCompose.then(() => {

                        var promise1 = new Promise((resolve, reject) => {
                            // this.composeTaskAlternative(currentChunksToBeMerged);
                            console.log("after applied", currentChunksToBeMerged)
                            this.composeActivitySpaces(currentChunksToBeMerged)
                            this.composeCompetencies(currentChunksToBeMerged);
                            this.composeAlphas(currentChunksToBeMerged);
                            this.composePatterns(currentChunksToBeMerged);
                            this.composeIntention(currentChunksToBeMerged);
                            this.composeCharacteristics(currentChunksToBeMerged);
                            resolve()
                        })

                        promise1.then(() => {
                            console.log("semua state", this.state)
                            var promise2 = new Promise((resolve, reject) => {
                                this.mergeAll()
                                resolve()
                            })
                            promise2.then(() => {
                                // initChunk = this.state.createdChunk
                                console.log("this.state.createdChunk", this.state.createdChunk)
                                next()
                            })
                            
                        })
                    })

                    
                })
            }

            if (this.isConflictsSolved()) {
                this.setState({
                    created: true
                })
                alert("Method is successfully created. Please fill the form to complete the method's information")
            } else {
                this.setState({
                    modal: true
                })
            }
            
            
        } else {
            alert("Cannot compose method chunks because it is less than 2")
        }
    }

    isConflictsSolved() {
        return !(
            this.state.activitySpacesConflicts.length > 0 ||
            this.state.characteristicsConflicts.length > 0 ||
            this.state.alphasConflicts.length > 0 ||
            this.state.competenciesConflicts.length > 0 ||
            this.state.patternsConflicts.length > 0
        )
    }

    handleConflicts() {
        console.log("masuk handleConflicts kak")
        var promise2 = new Promise((resolve, reject) => {
            var activitySpaces = this.state.activitySpacesToBeMerged.slice()
            var competencies = this.state.competenciesToBeMerged.slice()
            var alphas = this.state.alphasToBeMerged.slice()
            var patterns = this.state.patternsToBeMerged.slice()
            var intentions = this.state.intentionsToBeMerged.slice()
            var characteristics = this.state.characteristicsToBeMerged.slice()

            this.setState({
                createdChunk: {
                    intention: intentions,
                    characteristics: characteristics,
                    activitySpaces: activitySpaces,
                    alphas: alphas,
                    competencies: competencies,
                    patterns: patterns,
                    extensionElements: []
                }
            })
            resolve()
        })
        
        promise2.then(() => {
            console.log("CREATED CHUNK", this.state.createdChunk)
        })
        
    }

    mergeAll() {
        this.handleConflicts()
    }

    composeTaskAlternative(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var conflictedTasks = [];

        var firstChunkActivitySpaces = firstChunk.activitySpaces;
        var secondChunkActivitySpaces = secondChunk.activitySpaces;

        var firstChunkExtensionElements = JSON.parse(JSON.stringify(firstChunk.extensionElements));
        var secondChunkExtensionElements = JSON.parse(JSON.stringify(secondChunk.extensionElements));

        var activitySpaceToBeMerged = [];
        var firstChunkActivitySpacesTemp = JSON.parse(JSON.stringify(firstChunkActivitySpaces));
        var secondChunkActivitySpacesTemp = JSON.parse(JSON.stringify(secondChunkActivitySpaces));

        // UTK EXTENSION ELEMENT YG TYPENYA ACTIVITY

        // untuk first extension elements, bakal iterate kalo extension typenya activity (di MC rinda gada yg gitu)
        for (var firstChunkExtensionElementsIterator = 0; firstChunkExtensionElementsIterator < firstChunkExtensionElements.length; firstChunkExtensionElementsIterator++) {
            let currentExtension = firstChunkExtensionElements[firstChunkExtensionElementsIterator];
            let isCurrentExtensionUsed = false;
            if (currentExtension.type === "activity") {
                for (var activitySpaceIterator = 0; activitySpaceIterator < firstChunkActivitySpacesTemp.length; activitySpaceIterator++) {
                    for (var activityIterator = 0; activityIterator < firstChunkActivitySpacesTemp[activitySpaceIterator].activities.length; activityIterator++) {
                        if (firstChunkActivitySpacesTemp[activitySpaceIterator].activities[activityIterator].nameId === currentExtension.targetElement) {
                            firstChunkActivitySpacesTemp[activitySpaceIterator].activities[activityIterator][currentExtension.targetAttribute] = currentExtension.value;
                            isCurrentExtensionUsed = true;
                            break;
                        }
                    }
                    if (isCurrentExtensionUsed) {
                        break;
                    }
                }
            }
        }
        // end

        // change current first activity in activity spaces
        let currentFirstWorkProductExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "workProduct" && extensionElement.targetAttribute === "name");
        let currentFirstSubAlphaWorkProductExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.workProduct" && extensionElement.targetAttribute === "name");
        let currentFirstSubAlphaStateExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.state" && extensionElement.targetAttribute === "name");
        let currentFirstSubAlphaExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetAttribute === "name");


        for (var replaceFirstActivitySpaceIterator = 0; replaceFirstActivitySpaceIterator < firstChunkActivitySpacesTemp.length; replaceFirstActivitySpaceIterator++) {
          for (var replaceFirstActivityIterator = 0; replaceFirstActivityIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities.length; replaceFirstActivityIterator++) {
            let newNameId = JSON.parse(JSON.stringify(firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].name));
            firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].nameId = newNameId.replace(/\s/g,'');

            // Replace WorkProduct nameId reference in completion criterion and entry criterion
            // di MC rinda gada sih kasus yg ini
            if (currentFirstWorkProductExtensionElements.length !== 0) {
              for (var workProductExtensionIterator = 0; workProductExtensionIterator < currentFirstWorkProductExtensionElements.length; workProductExtensionIterator++) {
                let newWorkProductNameId = JSON.parse(JSON.stringify(currentFirstWorkProductExtensionElements[workProductExtensionIterator].value));

                for (var completionWorkProductIterator = 0; completionWorkProductIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts.length; completionWorkProductIterator++) {
                  let currentCompletionWorkProduct = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].split(".");
                  if (currentCompletionWorkProduct[0] === currentFirstWorkProductExtensionElements[workProductExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].replace(currentFirstWorkProductExtensionElements[workProductExtensionIterator].targetElement, newWorkProductNameId.replace(/\s/g,''));
                  }
                }

                for (var entryWorkProductIterator = 0; entryWorkProductIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts.length; entryWorkProductIterator++) {
                  let currentEntryWorkProduct = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].split(".");
                  if (currentEntryWorkProduct[0] === currentFirstWorkProductExtensionElements[workProductExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].replace(currentFirstWorkProductExtensionElements[workProductExtensionIterator].targetElement, newWorkProductNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            // Replace SubAlpha Work Product nameId reference
            if (currentFirstSubAlphaWorkProductExtensionElements.length !== 0) {
              for (var subAlphaWorkProductExtensionIterator = 0; subAlphaWorkProductExtensionIterator < currentFirstSubAlphaWorkProductExtensionElements.length; subAlphaWorkProductExtensionIterator++) {
                let newSubAlphaWorkProductNameId = JSON.parse(JSON.stringify(currentFirstSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].value));
                
                for (var completionWorkProductIterator = 0; completionWorkProductIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts.length; completionWorkProductIterator++) {
                  let currentSubAlphaWorkProduct = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].split(".");
                  if (currentSubAlphaWorkProduct[0] === currentFirstSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].replace(currentFirstSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement, newSubAlphaWorkProductNameId.replace(/\s/g,''));
                  }
                }

                for (var entryWorkProductIterator = 0; entryWorkProductIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts.length; entryWorkProductIterator++) {
                  let currentSubAlphaWorkProduct = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].split(".");
                  if (currentSubAlphaWorkProduct[0] === currentFirstSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].replace(currentFirstSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement, newSubAlphaWorkProductNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            if (currentFirstSubAlphaExtensionElements.length !== 0) {
              for (var subAlphaExtensionIterator = 0; subAlphaExtensionIterator < currentFirstSubAlphaExtensionElements.length; subAlphaExtensionIterator++) {
                let newSubAlphaNameId = JSON.parse(JSON.stringify(currentFirstSubAlphaExtensionElements[subAlphaExtensionIterator].value));

                for (var completionSubAlphaIterator = 0; completionSubAlphaIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas.length; completionSubAlphaIterator++) {
                  let currentCompletionSubAlpha = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionSubAlphaIterator].split(".");
                  if (currentCompletionSubAlpha[0] === currentFirstSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionSubAlphaIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionSubAlphaIterator].replace(currentFirstSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement, newSubAlphaNameId.replace(/\s/g,''));
                  }
                }

                for (var entrySubAlphaIterator = 0; entrySubAlphaIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas.length; entrySubAlphaIterator++) {
                  let currentEntrySubAlpha = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entrySubAlphaIterator].split(".");
                  if (currentEntrySubAlpha[0] === currentFirstSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement) {
                    firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entrySubAlphaIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entrySubAlphaIterator].replace(currentFirstSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement, newSubAlphaNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            if (currentFirstSubAlphaStateExtensionElements.length !== 0) {
              for (var subAlphaStateExtensionIterator = 0; subAlphaStateExtensionIterator < currentFirstSubAlphaStateExtensionElements.length; subAlphaStateExtensionIterator++) {
                let newSubAlphaStateNameId = JSON.parse(JSON.stringify(currentFirstSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].value));

                for (var completionStateIterator = 0; completionStateIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas.length; completionStateIterator++) {
                  let currentCompletionState = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionStateIterator].split(".");
                  if (currentCompletionState[1] !== null && typeof currentCompletionState[1] !== 'undefined') {
                    if (currentCompletionState[1] === currentFirstSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement) {
                      firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionStateIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].completionCriterions.alphas[completionStateIterator].replace(currentFirstSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement, newSubAlphaStateNameId.replace(/\s/g,''));
                    }
                  }
                }

                for (var entryStateIterator = 0; entryStateIterator < firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas.length; entryStateIterator++) {
                  let currentEntryState = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entryStateIterator].split(".");
                  if (currentEntryState[1] !== null && typeof currentEntryState[1] !== 'undefined') {
                    if (currentEntryState[1] === currentFirstSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement) {
                      firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entryStateIterator] = firstChunkActivitySpacesTemp[replaceFirstActivitySpaceIterator].activities[replaceFirstActivityIterator].entryCriterions.alphas[entryStateIterator].replace(currentFirstSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement, newSubAlphaStateNameId.replace(/\s/g,''));
                    }
                  }
                }
              }
            }
          }
        }

        // untuk second extension elements, bakal iterate kalo extension typenya activity (di MC rinda gada yg gitu)
        for (var secondChunkExtensionElementsIterator = 0; secondChunkExtensionElementsIterator < secondChunkExtensionElements.length; secondChunkExtensionElementsIterator++) {
          let currentExtension = secondChunkExtensionElements[secondChunkExtensionElementsIterator];
          let isCurrentExtensionUsed = false;
          if (currentExtension.type === "activity") {
            for (var activitySpaceIterator = 0; activitySpaceIterator < secondChunkActivitySpacesTemp.length; activitySpaceIterator++) {
              for (var activityIterator = 0; activityIterator < secondChunkActivitySpacesTemp[activitySpaceIterator].activities.length; activityIterator++) {
                if (secondChunkActivitySpacesTemp[activitySpaceIterator].activities[activityIterator].nameId === currentExtension.targetElement) {
                  secondChunkActivitySpacesTemp[activitySpaceIterator].activities[activityIterator][currentExtension.targetAttribute] = currentExtension.value;
                  isCurrentExtensionUsed = true;
                  break;
                }
              }
              if (isCurrentExtensionUsed) {
                break;
              }
            }
          }
        }

        // change current second activity in activity spaces
        let currentSecondWorkProductExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "workProduct" && extensionElement.targetAttribute === "name");
        let currentSecondSubAlphaWorkProductExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.workProduct" && extensionElement.targetAttribute === "name");
        let currentSecondSubAlphaStateExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.state" && extensionElement.targetAttribute === "name");
        let currentSecondSubAlphaExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetAttribute === "name");

        // Change current second activity
        for (var replaceSecondActivitySpaceIterator = 0; replaceSecondActivitySpaceIterator < secondChunkActivitySpacesTemp.length; replaceSecondActivitySpaceIterator++) {
          for (var replaceSecondActivityIterator = 0; replaceSecondActivityIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities.length; replaceSecondActivityIterator++) {
            let newNameId = JSON.parse(JSON.stringify(secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].name));
            secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].nameId = newNameId.replace(/\s/g,'');

            // Replace WorkProduct nameId reference in completion criterion and entry criterion
            if (currentSecondWorkProductExtensionElements.length !== 0) {
              for (var workProductExtensionIterator = 0; workProductExtensionIterator < currentSecondWorkProductExtensionElements.length; workProductExtensionIterator++) {
                let newWorkProductNameId = JSON.parse(JSON.stringify(currentSecondWorkProductExtensionElements[workProductExtensionIterator].value));

                for (var completionWorkProductIterator = 0; completionWorkProductIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts.length; completionWorkProductIterator++) {
                  let completionWorkProduct = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].split(".");
                  if (completionWorkProduct[0] === currentSecondWorkProductExtensionElements[workProductExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].replace(currentSecondWorkProductExtensionElements[workProductExtensionIterator].targetElement, newWorkProductNameId.replace(/\s/g,''));
                  }
                }

                for (var entryWorkProductIterator = 0; entryWorkProductIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts.length; entryWorkProductIterator++) {
                  let entryWorkProduct = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].split(".");
                  if (entryWorkProduct[0] === currentSecondWorkProductExtensionElements[workProductExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].replace(currentSecondWorkProductExtensionElements[workProductExtensionIterator].targetElement, newWorkProductNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            // Replace SubAlpha Work Product nameId reference
            if (currentSecondSubAlphaWorkProductExtensionElements.length !== 0) {
              for (var subAlphaWorkProductExtensionIterator = 0; subAlphaWorkProductExtensionIterator < currentSecondSubAlphaWorkProductExtensionElements.length; subAlphaWorkProductExtensionIterator++) {
                let newSubAlphaWorkProductNameId = JSON.parse(JSON.stringify(currentSecondSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].value));
                
                for (var completionWorkProductIterator = 0; completionWorkProductIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts.length; completionWorkProductIterator++) {
                  let completionSubAlphaWorkProduct = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].split(".");
                  if (completionSubAlphaWorkProduct[0] === currentSecondSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.workProducts[completionWorkProductIterator].replace(currentSecondSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement, newSubAlphaWorkProductNameId.replace(/\s/g,''));
                  }
                }

                for (var entryWorkProductIterator = 0; entryWorkProductIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts.length; entryWorkProductIterator++) {
                  let entrySubAlphaWorkProduct = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].split(".");
                  if (entrySubAlphaWorkProduct[0] === currentSecondSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.workProducts[entryWorkProductIterator].replace(currentSecondSubAlphaWorkProductExtensionElements[subAlphaWorkProductExtensionIterator].targetElement, newSubAlphaWorkProductNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            if (currentSecondSubAlphaExtensionElements.length !== 0) {
              for (var subAlphaExtensionIterator = 0; subAlphaExtensionIterator < currentSecondSubAlphaExtensionElements.length; subAlphaExtensionIterator++) {
                let newSubAlphaNameId = JSON.parse(JSON.stringify(currentSecondSubAlphaExtensionElements[subAlphaExtensionIterator].value));

                for (var completionSubAlphaIterator = 0; completionSubAlphaIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas.length; completionSubAlphaIterator++) {
                  let currentSubAlpha = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionSubAlphaIterator].split(".");
                  if (currentSubAlpha[0] === currentSecondSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionSubAlphaIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionSubAlphaIterator].replace(currentSecondSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement, newSubAlphaNameId.replace(/\s/g,''));
                  }
                }

                for (var entrySubAlphaIterator = 0; entrySubAlphaIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas.length; entrySubAlphaIterator++) {
                  let entrySubAlpha = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entrySubAlphaIterator].split(".");
                  if (entrySubAlpha[0] === currentSecondSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement) {
                    secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entrySubAlphaIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entrySubAlphaIterator].replace(currentSecondSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement, newSubAlphaNameId.replace(/\s/g,''));
                  }
                }
              }
            }

            if (currentSecondSubAlphaStateExtensionElements.length !== 0) {
              for (var subAlphaStateExtensionIterator = 0; subAlphaStateExtensionIterator < currentSecondSubAlphaStateExtensionElements.length; subAlphaStateExtensionIterator++) {
                let newSubAlphaStateNameId = JSON.parse(JSON.stringify(currentSecondSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].value));

                for (var completionStateIterator = 0; completionStateIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas.length; completionStateIterator++) {
                  let completionState = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionStateIterator].split(".");
                  if (completionState[1] !== null && typeof completionState[1] !== 'undefined') {
                    if (completionState[1] === currentSecondSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement) {
                      secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionStateIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].completionCriterions.alphas[completionStateIterator].replace(currentSecondSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement, newSubAlphaStateNameId.replace(/\s/g,''));
                    }
                  }
                }

                for (var entryStateIterator = 0; entryStateIterator < secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas.length; entryStateIterator++) {
                  let entryState = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entryStateIterator].split(".");
                  if (entryState[1] !== null && typeof entryState[1] !== 'undefined') {
                    if (entryState[1] === currentSecondSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement) {
                      secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entryStateIterator] = secondChunkActivitySpacesTemp[replaceSecondActivitySpaceIterator].activities[replaceSecondActivityIterator].entryCriterions.alphas[entryStateIterator].replace(currentSecondSubAlphaStateExtensionElements[subAlphaStateExtensionIterator].targetElement, newSubAlphaStateNameId.replace(/\s/g,''));
                    }
                  }
                }
              }
            }
          }
        }

        // END OF EXTENSION ELEMENT YG TYPENYA ACTIVITY

        let firstChunkActivitySpacesTempt = JSON.parse(JSON.stringify(firstChunkActivitySpacesTemp));
        let secondChunkActivitySpacesTempt = JSON.parse(JSON.stringify(secondChunkActivitySpacesTemp));

        for (var i = 0; i < firstChunkActivitySpacesTemp.length; i++) {
          var firstCurrentActivitySpace = firstChunkActivitySpacesTemp[i];

          activitySpaceToBeMerged[i] = firstCurrentActivitySpace;
        }

        var activitySpacesToBeAdded = [];
        var activitySpaceTempt = activitySpaceToBeMerged.slice(0);
        for (var i = 0; i < secondChunkActivitySpacesTemp.length; i++) {
          var firstCurrentActivitySpace = secondChunkActivitySpacesTemp[i];
          var isContained = false;

          for (var j = 0; j < activitySpaceTempt.length; j++) {
            var secondCurrentActivitySpace = activitySpaceTempt[j];

            if (firstCurrentActivitySpace.name === secondCurrentActivitySpace.name) {
              // Isi pakai yang dua, terus nanti pas looping masukin yang pertama yang ga ada
              // di chunk yang kedua activitynya
              activitySpaceToBeMerged[j].activities = firstCurrentActivitySpace.activities;
              isContained = true;
              break;
            }
          }

          if (!isContained) {
            activitySpacesToBeAdded.push(firstCurrentActivitySpace);
          }
        }

        for (var i = 0; i < activitySpacesToBeAdded.length; i++) {
          var currentActivitySpace = activitySpacesToBeAdded[i];
          activitySpaceToBeMerged.push(currentActivitySpace);
        }

        //Kasus 1
        // this.state.activitySpaceToBeMerged = activitySpaceToBeMerged;
        for (var i = 0; i < firstChunkActivitySpacesTempt.length; i++) {
          var firstCurrentActivitySpace = firstChunkActivitySpacesTempt[i];

          for (var j = 0; j < secondChunkActivitySpacesTempt.length; j++) {
            var secondCurrentActivitySpace = secondChunkActivitySpacesTempt[j];

            // Activity Space sama, berarti harus ngecek activitynya pada sama atau enggak
            if (firstCurrentActivitySpace.name === secondCurrentActivitySpace.name) {

              for (var firstActivityIterator = 0; firstActivityIterator < firstCurrentActivitySpace.activities.length; firstActivityIterator++) {
                var currentFirstActivity = firstCurrentActivitySpace.activities[firstActivityIterator];
                var isCurrentActivityConflict = false;
                var isCurrentExtensionActivityConflict = false;
                var firstActivityExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "activity" && extensionElement.targetElement === currentFirstActivity.nameId);
                var firstActivityName = firstActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
                var currentFirstActivityEntryAlphas = currentFirstActivity.entryCriterions.alphas;
                var currentFirstActivityEntryAlphasList = [];
                var currentFirstActivityEntryWorkProducts = currentFirstActivity.entryCriterions.workProducts;
                var currentFirstActivityEntryWorkProductsList = [];
                var currentFirstActivityCompletionAlphas = currentFirstActivity.completionCriterions.alphas;
                var currentFirstActivityCompletionAlphasList = [];
                var currentFirstActivityCompletionWorkProducts = currentFirstActivity.completionCriterions.workProducts;
                var currentFirstActivityCompletionWorkProductsList = [];

                for (var entryAlphasIterator = 0; entryAlphasIterator < currentFirstActivityEntryAlphas.length; entryAlphasIterator++) {
                  let currentEntryAlphasItems = currentFirstActivityEntryAlphas[entryAlphasIterator].split(".");
                  let currentEntryAlphas = {
                    "alpha_name_id" : currentEntryAlphasItems[0],
                    "alpha_state_name_id" : currentEntryAlphasItems[1] || ''
                  };
                  currentFirstActivityEntryAlphasList.push(currentEntryAlphas);
                }

                for (var entryWorkProductIterator = 0; entryWorkProductIterator < currentFirstActivityEntryWorkProducts.length; entryWorkProductIterator++) {
                  let currentEntryWorkProductItems = currentFirstActivityEntryWorkProducts[entryWorkProductIterator].split(".");
                  let currentEntryWorkProducts = {
                    "workProduct_name_id" : currentEntryWorkProductItems[0],
                    "workProduct_level_of_detail" : currentEntryWorkProductItems[1] || ''
                  };
                  currentFirstActivityEntryWorkProductsList.push(currentEntryWorkProducts);
                }

                for (var completionAlphasIterator = 0; completionAlphasIterator < currentFirstActivityCompletionAlphas.length; completionAlphasIterator++) {
                  let currentCompletionAlphasItems = currentFirstActivityCompletionAlphas[completionAlphasIterator].split(".");
                  let currentCompletionAlphas = {
                    "alpha_name_id" : currentCompletionAlphasItems[0],
                    "alpha_state_name_id" : currentCompletionAlphasItems[1] || ''
                  };
                  currentFirstActivityCompletionAlphasList.push(currentCompletionAlphas);
                }

                for (var completionWorkProductIterator = 0; completionWorkProductIterator < currentFirstActivityCompletionWorkProducts.length; completionWorkProductIterator++) {
                  let currentCompletionWorkProductItems = currentFirstActivityCompletionWorkProducts[completionWorkProductIterator].split(".");
                  let currentCompletionWorkProducts = {
                    "workProduct_name_id" : currentCompletionWorkProductItems[0],
                    "workProduct_level_of_detail" : currentCompletionWorkProductItems[1] || ''
                  };
                  currentFirstActivityCompletionWorkProductsList.push(currentCompletionWorkProducts);
                }
                
                for (var secondActivityIterator = 0; secondActivityIterator < secondCurrentActivitySpace.activities.length; secondActivityIterator++) {
                  var currentSecondActivity = secondCurrentActivitySpace.activities[secondActivityIterator];
                  var secondActivityExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "activity" && extensionElement.targetElement === currentSecondActivity.nameId);
                  var secondActivityName = secondActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
                  var currentSecondActivityEntryAlphas = currentSecondActivity.entryCriterions.alphas;
                  var currentSecondActivityEntryAlphasList = [];
                  var currentSecondActivityEntryWorkProducts = currentSecondActivity.entryCriterions.workProducts;
                  var currentSecondActivityEntryWorkProductsList = [];
                  var currentSecondActivityCompletionAlphas = currentSecondActivity.completionCriterions.alphas;
                  var currentSecondActivityCompletionAlphasList = [];
                  var currentSecondActivityCompletionWorkProducts = currentSecondActivity.completionCriterions.workProducts;
                  var currentSecondActivityCompletionWorkProductsList = [];

                  for (var entryAlphasIterator = 0; entryAlphasIterator < currentSecondActivityEntryAlphas.length; entryAlphasIterator++) {
                    let currentEntryAlphasItems = currentSecondActivityEntryAlphas[entryAlphasIterator].split(".");
                    let currentEntryAlphas = {
                      "alpha_name_id" : currentEntryAlphasItems[0],
                      "alpha_state_name_id" : currentEntryAlphasItems[1] || ''
                    };
                    currentSecondActivityEntryAlphasList.push(currentEntryAlphas);
                  }

                  for (var entryWorkProductIterator = 0; entryWorkProductIterator < currentSecondActivityEntryWorkProducts.length; entryWorkProductIterator++) {
                    let currentEntryWorkProductItems = currentSecondActivityEntryWorkProducts[entryWorkProductIterator].split(".");
                    let currentEntryWorkProducts = {
                      "workProduct_name_id" : currentEntryWorkProductItems[0],
                      "workProduct_level_of_detail" : currentEntryWorkProductItems[1] || ''
                    };
                    currentSecondActivityEntryWorkProductsList.push(currentEntryWorkProducts);
                  }

                  for (var completionAlphasIterator = 0; completionAlphasIterator < currentSecondActivityCompletionAlphas.length; completionAlphasIterator++) {
                    let currentCompletionAlphasItems = currentSecondActivityCompletionAlphas[completionAlphasIterator].split(".");
                    let currentCompletionAlphas = {
                      "alpha_name_id" : currentCompletionAlphasItems[0],
                      "alpha_state_name_id" : currentCompletionAlphasItems[1] || ''
                    };
                    currentSecondActivityCompletionAlphasList.push(currentCompletionAlphas);
                  }

                  for (var completionWorkProductIterator = 0; completionWorkProductIterator < currentSecondActivityCompletionWorkProducts.length; completionWorkProductIterator++) {
                    let currentCompletionWorkProductItems = currentSecondActivityCompletionWorkProducts[completionWorkProductIterator].split(".");
                    let currentCompletionWorkProducts = {
                      "workProduct_name_id" : currentCompletionWorkProductItems[0],
                      "workProduct_level_of_detail" : currentCompletionWorkProductItems[1] || ''
                    };
                    currentSecondActivityCompletionWorkProductsList.push(currentCompletionWorkProducts);
                  }
                  
                  var isConflictResolved = false;

                  if (!this.isEmpty(firstActivityName[0])) {
                    if (!this.isEmpty(secondActivityName[0])) {
                      if (firstActivityName[0].value === secondActivityName[0].value) {
                        isCurrentExtensionActivityConflict = true;
                      }
                    } else {
                      if (firstActivityName[0].value === currentSecondActivity.name) {
                        isCurrentExtensionActivityConflict = true;
                      }
                    }
                  } else {
                    if (!this.isEmpty(secondActivityName[0])) {
                      if (currentFirstActivity.name === secondActivityName[0].value) {
                        isCurrentExtensionActivityConflict = true;
                      }
                    } else {
                      if (currentFirstActivity.name === currentSecondActivity.name) {
                        isCurrentExtensionActivityConflict = true;
                      }
                    }
                  }

                  // Cek Sama atau tidak activitynya
                  if (isCurrentExtensionActivityConflict) {
                    // Harus pop dari activity yang ada di activitySpaceToBeMerged
                    if (!this.isEmpty(firstActivityName[0]) || !this.isEmpty(secondActivityName[0])) {
                      var nameToBeRemoved = "";
                      if (!this.isEmpty(firstActivityName[0])) {
                        nameToBeRemoved = firstActivityName[0].value;
                      } else {
                        nameToBeRemoved = secondActivityName[0].value;
                      }
                      for (var currentActivitySpaceIterator = 0; currentActivitySpaceIterator < activitySpaceToBeMerged.length; currentActivitySpaceIterator++) {
                        if (activitySpaceToBeMerged[currentActivitySpaceIterator].name === firstCurrentActivitySpace.name) {
                          for (var currentActivityIterator = 0; currentActivityIterator < activitySpaceToBeMerged[currentActivitySpaceIterator].activities.length; currentActivityIterator++) {
                            if (activitySpaceToBeMerged[currentActivitySpaceIterator].activities[currentActivityIterator].name == nameToBeRemoved) {
                              activitySpaceToBeMerged[currentActivitySpaceIterator].activities.splice(currentActivityIterator, 1);
                              break;
                            }
                          }
                          break;
                        }
                      }
                    } else {
                      for (var currentActivitySpaceIterator = 0; currentActivitySpaceIterator < activitySpaceToBeMerged.length; currentActivitySpaceIterator++) {
                        if (activitySpaceToBeMerged[currentActivitySpaceIterator].name === firstCurrentActivitySpace.name) {
                          for (var currentActivityIterator = 0; currentActivityIterator < activitySpaceToBeMerged[currentActivitySpaceIterator].activities.length; currentActivityIterator++) {
                            if (activitySpaceToBeMerged[currentActivitySpaceIterator].activities[currentActivityIterator].name == currentFirstActivity.name) {
                              activitySpaceToBeMerged[currentActivitySpaceIterator].activities.splice(currentActivityIterator, 1);
                              break;
                            }
                          }
                          break;
                        }
                      }
                    }
                    isCurrentActivityConflict = true;

                    var conflictedAttributes = 0;
                    var isCompetenciesConflict = false;
                    // Handle EntryCriterion
                    for (var secondEntryCriterionAlphasIterator = 0; secondEntryCriterionAlphasIterator < currentSecondActivityEntryAlphasList.length; secondEntryCriterionAlphasIterator++) {
                      let currentEntryCriterionAlphas = currentSecondActivityEntryAlphasList[secondEntryCriterionAlphasIterator];

                      // Extension already applied to language
                      let tempEntryCriterionAlphas = this.state.TemporaryEntryCriterionAlphas
                      tempEntryCriterionAlphas.push({
                        activitySpaceName: secondCurrentActivitySpace.name,
                        activityName: currentSecondActivity.name,
                        alphaNameId: currentEntryCriterionAlphas.alpha_name_id,
                        entryCriterionAlphas: currentEntryCriterionAlphas
                      })

                      this.setState({
                        TemporaryEntryCriterionAlphas: tempEntryCriterionAlphas
                      })
                      
                    }

                    for (var secondEntryCriterionWorkProductsIterator = 0; secondEntryCriterionWorkProductsIterator < currentSecondActivityEntryWorkProductsList.length; secondEntryCriterionWorkProductsIterator++) {
                      let currentEntryCriterionWorkProducts = currentSecondActivityEntryWorkProductsList[secondEntryCriterionWorkProductsIterator];

                      // Extension already applied to language

                      let tempEntryCriterionWorkProducts = this.state.TemporaryEntryCriterionWorkProducts
                      tempEntryCriterionWorkProducts.push({
                        activitySpaceName: secondCurrentActivitySpace.name,
                        activityName: currentSecondActivity.name,
                        workProductNameId: currentEntryCriterionWorkProducts.workProduct_name_id,
                        entryCriterionWorkProducts: currentEntryCriterionWorkProducts
                      })

                      this.setState({
                        TemporaryEntryCriterionWorkProducts: tempEntryCriterionWorkProducts
                      })
                      
                    }

                    for (var firstEntryCriterionAlphasIterator = 0; firstEntryCriterionAlphasIterator < currentFirstActivityEntryAlphasList.length; firstEntryCriterionAlphasIterator++) {
                      let firstEntryCriterionAlpha = currentFirstActivityEntryAlphasList[firstEntryCriterionAlphasIterator];
                      let isCurrentEntryCriterionAlphaFound = false;
                      for (var secondEntryCriterionAlphasIterator = 0; secondEntryCriterionAlphasIterator < currentSecondActivityEntryAlphasList.length; secondEntryCriterionAlphasIterator++) {
                        let secondEntryCriterionAlpha = currentSecondActivityEntryAlphasList[secondEntryCriterionAlphasIterator];
                        
                        // Target Alpha nya sama, harus cek target statenya
                        if (firstEntryCriterionAlpha.alpha_name_id === secondEntryCriterionAlpha.alpha_name_id) {
                          isCurrentEntryCriterionAlphaFound = true;
                          if (firstEntryCriterionAlpha.alpha_state_name_id !== secondEntryCriterionAlpha.alpha_state_name_id) {
                            // Resolve conflict untuk pilih, ga usah remove, langsung update aja sepertinya bisa,
                            // dengan cara cari yang alpha_name_idnya sama dengan yang kedua di TemporaryEntryCriterionAlphas
                            // else nya, berarti dia sama persis, jadi ga perlu diremove atau diapa"in lagi, cukup nanti langsung
                            // di merge di onTapMerge
                            this.resolveConflictEntryCriterionAlphas(firstEntryCriterionAlpha, secondEntryCriterionAlpha, secondCurrentActivitySpace.name, currentSecondActivity.name);
                          }
                          break;
                        }
                      }
                      if (!isCurrentEntryCriterionAlphaFound) {

                        let tempEntryCriterionAlphas = this.state.TemporaryEntryCriterionAlphas
                        tempEntryCriterionAlphas.push({
                            activitySpaceName: secondCurrentActivitySpace.name,
                            activityName: currentSecondActivity.name,
                            alphaNameId: firstEntryCriterionAlpha.alpha_name_id,
                            entryCriterionAlphas: firstEntryCriterionAlpha
                        })

                        this.setState({
                            TemporaryEntryCriterionAlphas: tempEntryCriterionAlphas
                        })
                        
                      }
                    }

                    for (var firstEntryCriterionWorkProductsIterator = 0; firstEntryCriterionWorkProductsIterator < currentFirstActivityEntryWorkProductsList.length; firstEntryCriterionWorkProductsIterator++) {
                      let firstEntryCriterionWorkProduct = currentFirstActivityEntryWorkProductsList[firstEntryCriterionWorkProductsIterator];
                      let isCurrentEntryCriterionWorkProductFound = false;
                      for (var secondEntryCriterionWorkProductsIterator = 0; secondEntryCriterionWorkProductsIterator < currentSecondActivityEntryWorkProductsList.length; secondEntryCriterionWorkProductsIterator++) {
                        let secondEntryCriterionWorkProduct = currentSecondActivityEntryWorkProductsList[secondEntryCriterionWorkProductsIterator];
                        
                        // Target Work Productnya sama, harus cek target level of detail
                        if (firstEntryCriterionWorkProduct.workProduct_name_id === secondEntryCriterionWorkProduct.workProduct_name_id) {
                          isCurrentEntryCriterionWorkProductFound = true;
                          if (firstEntryCriterionWorkProduct.workProduct_level_of_detail !== secondEntryCriterionWorkProduct.workProduct_level_of_detail) {
                            // Resolve conflict untuk pilih level_of_detailnya, langsung update di TemporaryEntryCriterionWorkProductsnya
                            
                            this.resolveConflictEntryCriterionWorkProducts(firstEntryCriterionWorkProduct, secondEntryCriterionWorkProduct, secondCurrentActivitySpace.name, currentSecondActivity.name);
                          }
                          break;
                        }
                      }
                      if (!isCurrentEntryCriterionWorkProductFound) {
                        
                        let tempEntryCriterionWorkProducts = this.state.TemporaryEntryCriterionWorkProducts
                        tempEntryCriterionWorkProducts.push({
                            activitySpaceName: secondCurrentActivitySpace.name,
                            activityName: currentSecondActivity.name,
                            workProductNameId: firstEntryCriterionWorkProduct.workProduct_name_id,
                            entryCriterionWorkProducts: firstEntryCriterionWorkProduct
                        })

                        this.setState({
                            TemporaryEntryCriterionWorkProducts: tempEntryCriterionWorkProducts
                        })

                      }
                    }

                    // Handle CompletionCriterion
                    for (var secondCompletionCriterionAlphasIterator = 0; secondCompletionCriterionAlphasIterator < currentSecondActivityCompletionAlphasList.length; secondCompletionCriterionAlphasIterator++) {
                      let currentCompletionCriterionAlphas = currentSecondActivityCompletionAlphasList[secondCompletionCriterionAlphasIterator];

                      let tempCompletionCriterionAlphas = this.state.TemporaryCompletionCriterionAlphas
                      tempCompletionCriterionAlphas.push({
                        activitySpaceName: secondCurrentActivitySpace.name,
                        activityName: currentSecondActivity.name,
                        alphaNameId: currentCompletionCriterionAlphas.alpha_name_id,
                        completionCriterionAlphas: currentCompletionCriterionAlphas
                      })

                      this.setState({
                        TemporaryCompletionCriterionAlphas: tempCompletionCriterionAlphas
                      })
                      
                    }

                    for (var secondCompletionCriterionWorkProductsIterator = 0; secondCompletionCriterionWorkProductsIterator < currentSecondActivityCompletionWorkProductsList.length; secondCompletionCriterionWorkProductsIterator++) {
                      let currentCompletionCriterionWorkProducts = currentSecondActivityCompletionWorkProductsList[secondCompletionCriterionWorkProductsIterator];

                      let tempCompletionCriterionWorkProducts = this.state.TemporaryCompletionCriterionWorkProducts
                      tempCompletionCriterionWorkProducts.push({
                        activitySpaceName: secondCurrentActivitySpace.name,
                        activityName: currentSecondActivity.name,
                        workProductNameId: currentCompletionCriterionWorkProducts.workProduct_name_id,
                        completionCriterionWorkProducts: currentCompletionCriterionWorkProducts
                      })

                      this.setState({
                        TemporaryCompletionCriterionWorkProducts: tempCompletionCriterionWorkProducts
                      })
                      
                    }

                    for (var firstCompletionCriterionAlphasIterator = 0; firstCompletionCriterionAlphasIterator < currentFirstActivityCompletionAlphasList.length; firstCompletionCriterionAlphasIterator++) {
                      let firstCompletionCriterionAlpha = currentFirstActivityCompletionAlphasList[firstCompletionCriterionAlphasIterator];
                      let isCurrentCompletionCriterionAlphaFound = false;
                      for (var secondCompletionCriterionAlphasIterator = 0; secondCompletionCriterionAlphasIterator < currentSecondActivityCompletionAlphasList.length; secondCompletionCriterionAlphasIterator++) {
                        let secondCompletionCriterionAlpha = currentSecondActivityCompletionAlphasList[secondCompletionCriterionAlphasIterator];

                        // Target Alpha nya sama, harus cek statenya
                        if (firstCompletionCriterionAlpha.alpha_name_id === secondCompletionCriterionAlpha.alpha_name_id) {
                          isCurrentCompletionCriterionAlphaFound = true;
                          if (firstCompletionCriterionAlpha.alpha_state_name_id !== secondCompletionCriterionAlpha.alpha_state_name_id) {
                            // Resolve conflict untuk pilih target statenya, langsung update di TemporaryCompletionCriterionAlphas
                            
                            this.resolveConflictCompletionCriterionAlphas(firstCompletionCriterionAlpha, secondCompletionCriterionAlpha, secondCurrentActivitySpace.name, currentSecondActivity.name);
                          }
                          break;
                        }
                      }
                      if (!isCurrentCompletionCriterionAlphaFound) {

                        let tempCompletionCriterionAlphas = this.state.TemporaryCompletionCriterionAlphas
                        tempCompletionCriterionAlphas.push({
                            activitySpaceName: secondCurrentActivitySpace.name,
                            activityName: currentSecondActivity.name,
                            alphaNameId: firstCompletionCriterionAlpha.alpha_name_id,
                            completionCriterionAlphas: firstCompletionCriterionAlpha
                        })

                        this.setState({
                            TemporaryCompletionCriterionAlphas: tempCompletionCriterionAlphas
                        })
                        
                      }
                    }

                    for (var firstCompletionCriterionWorkProductsIterator = 0; firstCompletionCriterionWorkProductsIterator < currentFirstActivityCompletionWorkProductsList.length; firstCompletionCriterionWorkProductsIterator++) {
                      let firstCompletionCriterionWorkProduct = currentFirstActivityCompletionWorkProductsList[firstCompletionCriterionWorkProductsIterator];
                      let isCurrentCompletionCriterionWorkProductFound = false;
                      for (var secondCompletionCriterionWorkProductsIterator = 0; secondCompletionCriterionWorkProductsIterator < currentSecondActivityCompletionWorkProductsList.length; secondCompletionCriterionWorkProductsIterator++) {
                        let secondCompletionCriterionWorkProduct = currentSecondActivityCompletionWorkProductsList[secondCompletionCriterionWorkProductsIterator];

                        // Target Work Product sama, harus cek target level of detail
                        if (firstCompletionCriterionWorkProduct.workProduct_name_id === secondCompletionCriterionWorkProduct.workProduct_name_id) {
                          isCurrentCompletionCriterionWorkProductFound = true;
                          if (firstCompletionCriterionWorkProduct.workProduct_level_of_detail !== secondCompletionCriterionWorkProduct.workProduct_level_of_detail) {
                            // Resolve conflict untuk pilih level_of_detail, langsung update di TemporaryCompletionCriterionWorkProducts
                            
                            this.resolveConflictCompletionCriterionWorkProducts(firstCompletionCriterionWorkProduct, secondCompletionCriterionWorkProduct, secondCurrentActivitySpace.name, currentSecondActivity.name);
                          }
                          break;
                        }
                      }
                      if (!isCurrentCompletionCriterionWorkProductFound) {

                        let tempCompletionCriterionWorkProducts = this.state.TemporaryCompletionCriterionWorkProducts
                        tempCompletionCriterionWorkProducts.push({
                            activitySpaceName: secondCurrentActivitySpace.name,
                            activityName: currentSecondActivity.name,
                            workProductNameId: firstCompletionCriterionWorkProduct.workProduct_name_id,
                            completionCriterionWorkProducts: firstCompletionCriterionWorkProduct
                        })

                        this.setState({
                            TemporaryCompletionCriterionWorkProducts: tempCompletionCriterionWorkProducts
                        })
                        
                      }
                    }

                    for (var attribute in currentFirstActivity) {
                      // Kasus 3 dengan threshold 2
                      if (conflictedAttributes > 0) {
                        // Resolve konfliknya harus dibikin khusus, ga bisa generik, trus tambahin parameter
                        // activity spacenya apa atau aspeknya apa buat dimasukin nantinya trus taruh ke statenya kapan

                        // this.resolveConflict(currentFirstActivity, currentSecondActivity);
                        
                        this.resolveConflictActivity(currentFirstActivity, currentSecondActivity, firstCurrentActivitySpace.name, firstActivityExtensionElements, secondActivityExtensionElements);
                        isConflictResolved = true;
                        console.log("resolve gan");
                        break;
                      }
                      // Tidak ngebandingin entry sama completion criterion, karena ASUMSI:
                      // katanya method engineer sudah mengkondisikan hal tersebut. Kalau enggak
                      // digabungin aja biarin.
                      if (attribute === "entryCriterions") {
                        // Asumsi: untuk target alpha atau work product selalu unik untuk setiap instance
                        // Populate both TemporaryEntryCriterionAlphas and TemporaryEntryCriterionWorkProducts
                        continue;
                      }

                      if (attribute === "completionCriterions") {
                        // Asumsi: untuk target alpha atau work product selalu unik untuk setiap instance
                        // Populate both TemporaryCompletionCriterionAlphas and TemporaryCompletionCriterionWorkProducts
                        // with the second completion criterion
                        continue;
                      }

                      // Digabungin langsung, karena cuman punya satu atribut untuk setiap objeknya
                      if (attribute === "competencies") {
                        continue;
                      }

                      var currentFirstExtensionAttribute = firstActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                      var currentSecondExtensionAttribute = secondActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                      if (attribute === "name") {
                        continue;
                      }
                      if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
                        if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
                          if (currentFirstExtensionAttribute[0].value !== currentSecondExtensionAttribute[0].value) {
                            conflictedAttributes += 1;
                          }
                        } else {
                          if (currentFirstExtensionAttribute[0].value !== currentSecondActivity[attribute]) {
                            conflictedAttributes += 1;
                          }
                        }
                      } else {
                        if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
                          if (currentFirstActivity[attribute] !== currentSecondExtensionAttribute[0].value) {
                            conflictedAttributes += 1;
                          }
                        } else {
                          if (JSON.stringify(currentFirstActivity[attribute]) !== JSON.stringify(currentSecondActivity[attribute])) {
                            conflictedAttributes += 1;
                          }
                        }
                      }
                    }
                    console.log(conflictedAttributes);
                    // Kasus 2
                    if (conflictedAttributes === 0) {
                      console.log("masuk sini ga gan");
                      var activityToBeMerged = currentFirstActivity;
                      var firstActivityAttributes = Object.keys(activityToBeMerged);

                      for (var secondActivityProperty in currentSecondActivity) {
                        if (firstActivityAttributes.indexOf(secondActivityProperty) === -1) {
                          activityToBeMerged[secondActivityProperty] = currentSecondActivity[secondActivityProperty];
                        }
                      }

                      // Change value to extension values if possible
                      for (var firstActivityExtensionIterator = 0; firstActivityExtensionIterator < firstActivityExtensionElements.length; firstActivityExtensionIterator++) {
                        activityToBeMerged[firstActivityExtensionElements[firstActivityExtensionIterator].targetAttribute] = firstActivityExtensionElements[firstActivityExtensionIterator].value;
                      }

                      for (var secondActivityExtensionIterator = 0; secondActivityExtensionIterator < secondActivityExtensionElements.length; secondActivityExtensionIterator++) {
                        activityToBeMerged[secondActivityExtensionElements[secondActivityExtensionIterator].targetAttribute] = secondActivityExtensionElements[secondActivityExtensionIterator].value;
                      }

                      // Masukin entryCriterion, completionCriterion sama competencies manual
                      // if (activityToBeMerged.entryCriterions.alphas !== currentSecondActivity.entryCriterions.alphas) {
                      //   var missingAlphasEntryCriterion = currentSecondActivity.entryCriterions.alphas.slice().filter(alphaEntryCriterion => activityToBeMerged.entryCriterions.alphas.indexOf(alphaEntryCriterion) === -1);
                      //   activityToBeMerged.entryCriterions.alphas = activityToBeMerged.entryCriterions.alphas.concat(missingAlphasEntryCriterion);
                      // }

                      // if (activityToBeMerged.entryCriterions.workProducts !== currentSecondActivity.entryCriterions.workProducts) {
                      //   var missingWorkProductEntryCriterion = currentSecondActivity.entryCriterions.workProducts.slice().filter(workProductEntryCriterion => activityToBeMerged.entryCriterions.workProducts.indexOf(workProductEntryCriterion) === -1);
                      //   activityToBeMerged.entryCriterions.workProducts = activityToBeMerged.entryCriterions.workProducts.concat(missingWorkProductEntryCriterion);
                      // }

                      // if (activityToBeMerged.completionCriterions.alphas !== currentSecondActivity.completionCriterions.alphas) {
                      //   var missingAlphasCompletionCriterion = currentSecondActivity.completionCriterions.alphas.slice().filter(alphaCompletionCriterion => activityToBeMerged.completionCriterions.alphas.indexOf(alphaCompletionCriterion) === -1);
                      //   activityToBeMerged.completionCriterions.alphas = activityToBeMerged.completionCriterions.alphas.concat(missingAlphasCompletionCriterion);
                      // }

                      // if (activityToBeMerged.completionCriterions.workProducts !== currentSecondActivity.completionCriterions.workProducts) {
                      //   var missingWorkProductCompletionCriterion = currentSecondActivity.completionCriterions.workProducts.slice().filter(workProductCompletionCriterion => activityToBeMerged.completionCriterions.workProducts.indexOf(workProductCompletionCriterion) === -1);
                      //   activityToBeMerged.completionCriterions.workProducts = activityToBeMerged.completionCriterions.workProducts.concat(missingWorkProductCompletionCriterion);
                      // }

                      // Tetep digabungin, karena ga mungkin konflik (nama sama), dimana pasti sama persis
                      // karena cuman punya satu atribut, yaitu namanya sendiri
                      if (activityToBeMerged.competencies !== currentSecondActivity.competencies) {
                        var missingCompetencies = currentSecondActivity.competencies.slice().filter(competency => activityToBeMerged.competencies.indexOf(competency) === -1);
                        activityToBeMerged.competencies = activityToBeMerged.competencies.concat(missingCompetencies);
                      }

                      // Kosongin terlebih dahulu, untuk nanti diisi waktu onTapMerge, jadi di onTapMerge
                      // ga perlu iterasi tambahan untuk ngosongin terlebih dahulu
                      activityToBeMerged.entryCriterions.alphas = [];
                      activityToBeMerged.entryCriterions.workProducts = [];
                      activityToBeMerged.completionCriterions.alphas = [];
                      activityToBeMerged.completionCriterions.workProducts = [];

                      // Cari activity spacenya buat masukin si activity baru
                      for (var currentActivitySpaceIterator = 0; currentActivitySpaceIterator < activitySpaceToBeMerged.length; currentActivitySpaceIterator++) {
                        if (activitySpaceToBeMerged[currentActivitySpaceIterator].name === firstCurrentActivitySpace.name) {
                          activitySpaceToBeMerged[currentActivitySpaceIterator].activities.push(activityToBeMerged);
                          break;
                        }
                      }
                    } else {
                      if (!isConflictResolved) {
                        
                        this.resolveConflictActivity(currentFirstActivity, currentSecondActivity, firstCurrentActivitySpace.name, firstActivityExtensionElements, secondActivityExtensionElements);
                      }
                    }
                    break;
                  }
                }
                // Kalau ga konflik, masukin ke daftar activitynya yang ada di state atau di activitySpaceToBeMerged cukup kayaknya
                if (!isCurrentActivityConflict) {
                  for (var currentActivitySpaceIterator = 0; currentActivitySpaceIterator < activitySpaceToBeMerged.length; currentActivitySpaceIterator++) {
                    if (activitySpaceToBeMerged[currentActivitySpaceIterator].name === firstCurrentActivitySpace.name) {
                      activitySpaceToBeMerged[currentActivitySpaceIterator].activities.push(currentFirstActivity);
                      // this.state.extensionElementsToBeMerged.push(firstChunkExtensionElements.filter(extensionElement => extensionElement.targetElement === currentFirstActivity))
                      // Testing reference
                      // this.state.activitySpaceToBeMerged = activitySpaceToBeMerged;
                      break;
                    }
                  }
                }
              }
            }
          }
        }

        this.setState({
            activitySpacesToBeMerged: activitySpaceToBeMerged
        })
        console.log("composeTaskAlternative SELESAI KAK")
        console.log("activitySpaceToBeMerged", activitySpaceToBeMerged)
    }

    resolveConflictEntryCriterionAlphas(firstEntryCriterionAlpha, secondEntryCriterionAlpha, activitySpaceName, activityName) {
        console.log("masuk resolveConflictEntryCriterionAlphas")
        let firstEntryCriterionAlphaTemp = JSON.parse(JSON.stringify(firstEntryCriterionAlpha));
        let secondEntryCriterionAlphaTemp = JSON.parse(JSON.stringify(secondEntryCriterionAlpha));

        let currentEntryCriterionAlphas = this.state.TemporaryEntryCriterionAlphas.filter((el, idx) => {
            return (
                el.activitySpaceName === activitySpaceName && 
                el.activityName === activityName &&
                el.alphaNameId === firstEntryCriterionAlphaTemp.alpha_name_id
            )
        })

        let currentEntryCriterionAlpha = currentEntryCriterionAlphas[0];
        console.log("currentEntryCriterionAlpha", currentEntryCriterionAlpha)
        
        // Fix conflict, karena sudah diperiksa sebelumnya
        // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, onPickValue) {
        //   Popup.create({
        //     title: 'Merge Resolution Entry Criterion Alpha',
        //     content: <MergeConflictPrompt firstTask={firstTask.alpha_state_name_id} secondTask={secondTask.alpha_state_name_id} property={property} currentTask={currentTask} />,
        //     buttons: {
        //       left: [{
        //         text: 'First',
        //         className: 'firstTask',
        //         action: function () {
        //           onPickValue(property, firstTask.alpha_state_name_id, currentTask._id);
        //           Popup.close();
        //         }
        //       }],
        //       right: [{
        //         text: 'Second',
        //         className: 'secondTask',
        //         action: function () {
        //           onPickValue(property, secondTask.alpha_state_name_id, currentTask._id);
        //           Popup.close();
        //         }
        //       }]
        //     }
        //   });
        // });
        // Popup.plugins().prompt(
        //   firstEntryCriterionAlphaTemp,
        //   secondEntryCriterionAlphaTemp,
        //   activitySpaceName + ":" + activityName + ":alpha_state_name_id",
        //   currentEntryCriterionAlpha,
        //   function (property, value, taskId) {
        //     console.log(property);
        //     property = "entryCriterionAlphas.alpha_state_name_id";
        //     TemporaryEntryCriterionAlphas.update(taskId, {
        //       $set: { [property]: value }
        //     });
        //   }
        // );
        // ReactDOM.render(
        //   <Popup />,
        //   document.getElementById('popupContainer')
        // );
    }

    resolveConflictEntryCriterionWorkProducts(firstEntryCriterionWorkProduct, secondEntryCriterionWorkProduct, activitySpaceName, activityName) {
        console.log("masuk resolveConflictEntryCriterionWorkProducts")

        let firstEntryCriterionWorkProductTemp = JSON.parse(JSON.stringify(firstEntryCriterionWorkProduct));
        let secondEntryCriteironWorkProductTemp = JSON.parse(JSON.stringify(secondEntryCriterionWorkProduct));

        console.log(activitySpaceName);
        console.log(activityName);

        let currentEntryCriterionWorkProducts = this.state.TemporaryEntryCriterionWorkProducts.filter((el, idx) => {
            return (
                el.activitySpaceName === activitySpaceName && 
                el.activityName === activityName &&
                el.workProductNameId === firstEntryCriterionWorkProductTemp.workProduct_name_id
            )
        })

        let currentEntryCriterionWorkProduct = currentEntryCriterionWorkProducts[0];

        // Fix conflict, karena sudah diperiksa sebelumnya
        // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, onPickValue) {
        //   Popup.create({
        //     title: 'Merge Resolution Entry Criterion Work Product',
        //     content: <MergeConflictPrompt firstTask={firstTask.workProduct_level_of_detail} secondTask={secondTask.workProduct_level_of_detail} property={property} currentTask={currentTask} />,
        //     buttons: {
        //       left: [{
        //         text: 'First',
        //         className: 'firstTask',
        //         action: function () {
        //           onPickValue(property, firstTask.workProduct_level_of_detail, currentTask._id);
        //           Popup.close();
        //         }
        //       }],
        //       right: [{
        //         text: 'Second',
        //         className: 'secondTask',
        //         action: function () {
        //           onPickValue(property, secondTask.workProduct_level_of_detail, currentTask._id);
        //           Popup.close();
        //         }
        //       }]
        //     }
        //   });
        // });
        // Popup.plugins().prompt(
        //   firstEntryCriterionWorkProductTemp,
        //   secondEntryCriteironWorkProductTemp,
        //   activitySpaceName + ":" + activityName + ":workProduct_level_of_detail",
        //   currentEntryCriterionWorkProduct,
        //   function (property, value, taskId) {
        //     console.log(property);
        //     property = "entryCriterionWorkProducts.workProduct_level_of_detail"
        //     TemporaryEntryCriterionWorkProducts.update(taskId, {
        //       $set: { [property]: value }
        //     });
        //   }
        // );
        // ReactDOM.render(
        //   <Popup />,
        //   document.getElementById('popupContainer')
        // );
    }

    resolveConflictCompletionCriterionAlphas(firstCompletionCriterionAlpha, secondCompletionCriterionAlpha, activitySpaceName, activityName) {
        console.log("masuk resolveConflictCompletionCriterionAlphas")

        let firstCompletionCriterionAlphaTemp = JSON.parse(JSON.stringify(firstCompletionCriterionAlpha));
        let secondCompletionCriterionAlphaTemp = JSON.parse(JSON.stringify(secondCompletionCriterionAlpha));

        let currentCompletionCriterionAlphas = this.state.TemporaryCompletionCriterionAlphas.filter((el, idx) => {
            return (
                el.activitySpaceName === activitySpaceName && 
                el.activityName === activityName &&
                el.alphaNameId === firstCompletionCriterionAlphaTemp.alpha_name_id
            )
        })

        let currentCompletionCriterionAlpha = currentCompletionCriterionAlphas[0];

        // Fix conflict, karena sudah diperiksa sebelumnya
        // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, onPickValue) {
        //   Popup.create({
        //     title: 'Merge Resolution Completion Criterion Alpha',
        //     content: <MergeConflictPrompt firstTask={firstTask.alpha_state_name_id} secondTask={secondTask.alpha_state_name_id} property={property} currentTask={currentTask} />,
        //     buttons: {
        //       left: [{
        //         text: 'First',
        //         className: 'firstTask',
        //         action: function () {
        //           onPickValue(property, firstTask.alpha_state_name_id, currentTask._id);
        //           Popup.close();
        //         }
        //       }],
        //       right: [{
        //         text: 'Second',
        //         className: 'secondTask',
        //         action: function () {
        //           onPickValue(property, secondTask.alpha_state_name_id, currentTask._id);
        //           Popup.close();
        //         }
        //       }]
        //     }
        //   });
        // });
        // Popup.plugins().prompt(
        //   firstCompletionCriterionAlphaTemp,
        //   secondCompletionCriterionAlphaTemp,
        //   activitySpaceName + ":" + activityName + ":alpha_state_name_id",
        //   currentCompletionCriterionAlpha,
        //   function (property, value, taskId) {
        //     console.log(property);
        //     property = "completionCriterionAlphas.alpha_state_name_id"
        //     TemporaryCompletionCriterionAlphas.update(taskId, {
        //       $set: { [property]: value }
        //     });
        //   }
        // );
        // ReactDOM.render(
        //   <Popup />,
        //   document.getElementById('popupContainer')
        // );
    }

    resolveConflictCompletionCriterionWorkProducts(firstCompletionCriterionWorkProduct, secondCompletionCriterionWorkProduct, activitySpaceName, activityName) {
        console.log("masuk resolveConflictCompletionCriterionWorkProducts")

        let firstCompletionCriterionWorkProductTemp = JSON.parse(JSON.stringify(firstCompletionCriterionWorkProduct));
        let secondCompletionCriterionWorkProductTemp = JSON.parse(JSON.stringify(secondCompletionCriterionWorkProduct));

        let currentCompletionCriterionWorkProducts = this.state.TemporaryCompletionCriterionWorkProducts.filter((el, idx) => {
            return (
                el.activitySpaceName === activitySpaceName && 
                el.activityName === activityName &&
                el.workProductNameId === firstCompletionCriterionWorkProductTemp.workProduct_name_id
            )
        })

        let currentCompletionCriterionWorkProduct = currentCompletionCriterionWorkProducts[0];

        // Fix conflict, karena sudah diperiksa sebelumnya
        // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, onPickValue) {
        //   Popup.create({
        //     title: 'Merge Resolution Completion Criterion Work Product',
        //     content: <MergeConflictPrompt firstTask={firstTask.workProduct_level_of_detail} secondTask={secondTask.workProduct_level_of_detail} property={property} currentTask={currentTask} />,
        //     buttons: {
        //       left: [{
        //         text: 'First',
        //         className: 'firstTask',
        //         action: function () {
        //           onPickValue(property, firstTask.workProduct_level_of_detail, currentTask._id);
        //           Popup.close();
        //         }
        //       }],
        //       right: [{
        //         text: 'Second',
        //         className: 'secondTask',
        //         action: function () {
        //           onPickValue(property, secondTask.workProduct_level_of_detail, currentTask._id);
        //           Popup.close();
        //         }
        //       }]
        //     }
        //   });
        // });
        // Popup.plugins().prompt(
        //   firstCompletionCriterionWorkProductTemp,
        //   secondCompletionCriterionWorkProductTemp,
        //   activitySpaceName + ":" + activityName + ":workProduct_level_of_detail",
        //   currentCompletionCriterionWorkProduct,
        //   function (property, value, taskId) {
        //     console.log(property);
        //     property = "completionCriterionWorkProducts.workProduct_level_of_detail"
        //     TemporaryCompletionCriterionWorkProducts.update(taskId, {
        //       $set: { [property]: value }
        //     });
        //   }
        // );
        // ReactDOM.render(
        //   <Popup />,
        //   document.getElementById('popupContainer')
        // );
    }

    resolveConflictActivity(firstActivity, secondActivity, currentActivitySpaceName, firstActivityExtensionElements, secondActivityExtensionElements) {
    
        console.log("masuk resolveConflictActivity")

        var firstActivityTemp = JSON.parse(JSON.stringify(firstActivity));
        var firstActivityToBeInserted = JSON.parse(JSON.stringify(firstActivity));
        var secondActivityTemp = JSON.parse(JSON.stringify(secondActivity));
        var activityName = firstActivityTemp.name;
        var firstActivityExtensionName = firstActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstActivityExtensionName[0])) {
          activityName = firstActivityExtensionName[0].value;
        }

        // Fill missing attribute from the second one to the first one
        var currentActivityKeys = Object.keys(firstActivityTemp);
        for (var secondActivityProperty in secondActivityTemp) {
          if (currentActivityKeys.indexOf(secondActivityProperty) === -1) {
            firstActivityToBeInserted[secondActivityProperty] = secondActivityTemp[secondActivityProperty];
          }
        }

        // Kosongin terlebih dahulu untuk nanti diisi waktu onTapMerge
        firstActivityToBeInserted.entryCriterions.alphas = [];
        firstActivityToBeInserted.entryCriterions.workProducts = [];
        firstActivityToBeInserted.completionCriterions.alphas = [];
        firstActivityToBeInserted.completionCriterions.workProducts = [];

        let temporaryActivities = this.state.TemporaryActivity

        let insertedActivity = {
            activityName: activityName,
            activitySpaceName: currentActivitySpaceName,
            activity: firstActivityToBeInserted
        }

        temporaryActivities.push({
            insertedActivity
        })


        this.setState({
            TemporaryActivity: temporaryActivities
        })

        var currentInsertedIdx = temporaryActivities.length - 1

        for (var conflictedAttribute in firstActivity) {
          if (!firstActivity.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondActivity.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          if (conflictedAttribute === "competencies") {
            if (firstActivityTemp.competencies !== secondActivityTemp.competencies) {
              var missingCompetencies = secondActivityTemp.competencies.slice().filter(competency => firstActivityTemp.competencies.indexOf(competency) === -1);
              firstActivityTemp.competencies = firstActivityTemp.competencies.concat(missingCompetencies);
            }
            var currentInsertedIdx = temporaryActivities.length - 1
            let currentActivity = this.state.TemporaryActivity
            currentActivity[currentInsertedIdx].activities.competencies = firstActivityTemp.competencies

            this.setState({
                TemporaryActivity: currentActivity
            })

            continue;
          }


          var isCurrentAttributeConflict = true;

          var currentFirstExtensionAttribute = firstActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondExtensionAttribute = secondActivityExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;

          if (conflictedAttribute === "entryCriterions"
            || conflictedAttribute === "completionCriterions") {
            continue;
          }
          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(secondActivity[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          } else {
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(firstActivity[conflictedAttribute]) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(firstActivity[conflictedAttribute]) === JSON.stringify(secondActivity[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          }

          // Berarti udah sama, tidak perlu di bikin prompt lagi untuk pilih nilai
          if (!isCurrentAttributeConflict) {
            continue;
          }

        //   Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
        //     Popup.create({
        //       title: 'Merge Resolution Activity - ' + activityName,
        //       content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
        //       buttons: {
        //         left: [{
        //           text: 'First',
        //           className: 'firstTask',
        //           action: function () {
        //             if (firstExtensionAvailable) {
        //               onPickValue(property, firstExtension.value, currentTask._id);
        //             } else {
        //               onPickValue(property, firstTask[property], currentTask._id);
        //             }
        //             if (secondExtensionAvailable) {
        //               insertIdentifierCallback(secondExtension.identifier);
        //             }
        //             Popup.close();
        //           }
        //         }],
        //         right: [{
        //           text: 'Second',
        //           className: 'secondTask',
        //           action: function () {
        //             if (secondExtensionAvailable) {
        //               onPickValue(property, secondExtension.value, currentTask._id);
        //             } else {
        //               onPickValue(property, secondTask[property], currentTask._id);
        //             }
        //             if (firstExtensionAvailable) {
        //               insertIdentifierCallback(firstExtension.identifier);
        //             }
        //             Popup.close();
        //           }
        //         }]
        //       }
        //     });
        //   });
        //   Popup.plugins().prompt(
        //     firstActivity,
        //     secondActivity,
        //     conflictedAttribute,
        //     currentInsertedTask,
        //     isCurrentFirstExtensionAvailable,
        //     currentFirstExtensionAttribute[0],
        //     isCurrentSecondExtensionAvailable,
        //     currentSecondExtensionAttribute[0],
        //     this.insertIdentifierToState.bind(this),
        //     function (property, value, taskId) {
        //       // var obj = {};
        //       // obj[field] = target;
        //       console.log(property);
        //       var property = 'activity.' + property;
        //       TemporaryActivity.update(taskId, {
        //         $set: { [property]: value }
        //       });
        //     }
        //   );
        //   ReactDOM.render(
        //     <Popup />,
        //     document.getElementById('popupContainer')
        //   );
        }
    }

    composeCharacteristics(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkCharacteristics = firstChunk.characteristics;
        var secondChunkCharacteristics = secondChunk.characteristics;

        if (firstChunkCharacteristics && secondChunkCharacteristics) {
            firstChunkCharacteristics = JSON.parse(JSON.stringify(firstChunkCharacteristics));
            secondChunkCharacteristics = JSON.parse(JSON.stringify(secondChunkCharacteristics));

            var charToBeMerged = firstChunkCharacteristics
            var conflicts = []

            var charTemp = charToBeMerged.slice();
            for (var i = 0; i < secondChunkCharacteristics.length; i++) {
              var firstCurrentChar = secondChunkCharacteristics[i];
              var isContained = false;

              for (var j = 0; j < charTemp.length; j++) {
                var secondCurrentChar = charTemp[j];

                if (firstCurrentChar.characteristic === secondCurrentChar.characteristic) {

                    if (firstCurrentChar.value !== secondCurrentChar.value) {
                        let newObj = {
                            'idxFixedList': j,
                            'detail': firstCurrentChar
                        }

                        conflicts.push(newObj)
                    }
                    
                    isContained = true;
                    break;
                }

              }

              if (!isContained) {
                charToBeMerged.push(firstCurrentChar);
              }
            }

            this.setState({
                characteristicsToBeMerged: charToBeMerged,
                characteristicsConflicts: conflicts
            })
            console.log("composeCharacteristics SELESAI")
            console.log("characteristicsToBeMerged", charToBeMerged)
            console.log("conflicts", conflicts)
        
        } else {
            if (firstChunkCharacteristics) {
                this.setState({
                    characteristicsToBeMerged: firstChunkCharacteristics
                })
                console.log("composeCharacteristics SELESAI")
                console.log("characteristicsToBeMerged", firstChunkCharacteristics)
            } else
            if (secondChunkCharacteristics) {
                this.setState({
                    characteristicsToBeMerged: secondChunkCharacteristics
                })
                console.log("composeCharacteristics SELESAI")
                console.log("characteristicsToBeMerged", secondChunkCharacteristics)
            }
        }

    }

    composeActivitySpaces(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkAS = firstChunk.activitySpaces;
        var secondChunkAS = secondChunk.activitySpaces;

        if (firstChunkAS && secondChunkAS) {
            firstChunkAS = JSON.parse(JSON.stringify(firstChunkAS));
            secondChunkAS = JSON.parse(JSON.stringify(secondChunkAS));

            var aSToBeMerged = firstChunkAS.slice();
            var conflicts = [];

            var aSTemp = aSToBeMerged.slice();
            for (var i = 0; i < secondChunkAS.length; i++) {
              var firstCurrentAS = secondChunkAS[i];
              var isContained = false;

              for (var j = 0; j < aSTemp.length; j++) {
                var secondCurrentAS = aSTemp[j];

                if (firstCurrentAS.name === secondCurrentAS.name || firstCurrentAS.nameId === secondCurrentAS.nameId) {

                    let conflictAt = this.getConflict(firstCurrentAS, secondCurrentAS)

                    if (conflictAt.length > 0) {
                        // semantik ga sama, jadinya harus bikin object merge resolution
                        let newRes = this.conflictResolution(firstCurrentAS, j, conflictAt)
                        conflicts.push(newRes)
                        
                    }

                    isContained = true;
                    break;
                  
                }
              }

              if (!isContained) {
                aSToBeMerged.push(firstCurrentAS);
              }
            }

            this.setState({
                activitySpacesToBeMerged: aSToBeMerged,
                activitySpacesConflicts: conflicts
            })
            console.log("composeActivitySpaces SELESAI")
            console.log("activitySpacesToBeMerged", aSToBeMerged)
            console.log("conflicts", conflicts)

        } else {
            if (firstChunkAS) {
                this.setState({
                    activitySpacesToBeMerged: firstChunkAS
                })
                console.log("composeActivitySpaces SELESAI")
                console.log("activitySpacesToBeMerged", firstChunkAS)
            } else
            if (secondChunkAS) {
                this.setState({
                    activitySpacesToBeMerged: secondChunkAS
                })
                console.log("composeActivitySpaces SELESAI")
                console.log("activitySpacesToBeMerged", secondChunkAS)
            }
        }

        
    }

    composeCompetencies(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkCompetencies = firstChunk.competencies;
        var secondChunkCompetencies = secondChunk.competencies;

        if (firstChunkCompetencies && secondChunkCompetencies) {
            firstChunkCompetencies = JSON.parse(JSON.stringify(firstChunkCompetencies));
            secondChunkCompetencies = JSON.parse(JSON.stringify(secondChunkCompetencies));

            var competenciesToBeMerged = firstChunkCompetencies.slice();
            var conflicts = [];

            var competenciesTemp = competenciesToBeMerged.slice();
            for (var i = 0; i < secondChunkCompetencies.length; i++) {
              var firstCurrentCompetency = secondChunkCompetencies[i];
              var isContained = false;

              for (var j = 0; j < competenciesTemp.length; j++) {
                var secondCurrentCompetency = competenciesTemp[j];

                if (firstCurrentCompetency.name === secondCurrentCompetency.name || firstCurrentCompetency.nameId === secondCurrentCompetency.nameId) {

                    let conflictAt = this.getConflict(firstCurrentCompetency, secondCurrentCompetency)

                    if (conflictAt.length > 0) {
                        // semantik ga sama, jadinya harus bikin object merge resolution
                        let newRes = this.conflictResolution(firstCurrentCompetency, j, conflictAt)
                        conflicts.push(newRes)
                        
                    }

                    isContained = true;
                    break;
                  
                }
              }

              if (!isContained) {
                competenciesToBeMerged.push(firstCurrentCompetency);
              }
            }

            this.setState({
                competenciesToBeMerged: competenciesToBeMerged,
                competenciesConflicts: conflicts
            })
            console.log("composeCompetencies SELESAI")
            console.log("competenciesToBeMerged", competenciesToBeMerged)
            console.log("conflicts", conflicts)

        } else {
            if (firstChunkCompetencies) {
                this.setState({
                    competenciesToBeMerged: firstChunkCompetencies
                })
                console.log("composeCompetencies SELESAI")
                console.log("competenciesToBeMerged", firstChunkCompetencies)
            } else
            if (secondChunkCompetencies) {
                this.setState({
                    competenciesToBeMerged: secondChunkCompetencies
                })
                console.log("composeCompetencies SELESAI")
                console.log("competenciesToBeMerged", secondChunkCompetencies)
            }
        }

        
    }

    // isCompletelyDifferent(a, b) {
    //     return JSON.stringify(a) !== JSON.stringify(b)
    // }

    // equalsIgnoreOrder(a, b) {
    //     if (a.length !== b.length) return false;
    //     const uniqueValues = new Set([...a, ...b]);
    //     console.log("uniqueValues", uniqueValues)
    //     for (const v of uniqueValues) {
    //         const aCount = a.filter(e => e === v).length;
    //         const bCount = b.filter(e => e === v).length;
    //         if (aCount !== bCount) return false;
    //     }
    //     return true;
    // }

    // isSemanticallySame(a, b) {

    //     var keys = new Set([...Object.keys(a), ...Object.keys(b)])

    //     for (var k of keys) {
    //         if (a[k] && b[k]) {
    //             // console.log("apa hayoo")
    //             // console.log(typeof a[k])
    //             // console.log(a[k] instanceof String)
    //             if (Array.isArray(a[k])) {
    //                 if (a[k].length != b[k].length) {
    //                     return false
    //                 } else {
    //                     this.isSemanticallySame(a[k], b[k])
    //                 }
    //             } else {
    //                 if (typeof a[k] === 'object' || a[k] instanceof Object) {
    //                     this.isSemanticallySame(a[k], b[k])
    //                 } else {
    //                     if (a[k] !== b[k]) {
    //                         return false
    //                     }
    //                 }
                    
    //             }
    //         }
             
    //     }

    //     return true
    // }

    // getConflict(a, b) {

    //     var keys = new Set([...Object.keys(a), ...Object.keys(b)])
    //     var arr = []

    //     for (var k of keys) {
    //         if (a[k] && b[k]) {
    //             if (typeof a[k] === 'object' || a[k] instanceof Object) {
    //                 if (Array.isArray(a[k])) {
    //                     if (a[k].length != b[k].length) {
    //                         arr.push(k)
    //                     } else {
    //                         let tempA = a[k]
    //                         let tempB = b[k]
    //                         for (var i=0; i<a[k].length; i++) {
    //                             var found = false
    //                             for (var j=i; j<b[k].length; j++) {
    //                                 if (JSON.stringify(tempA[i]) === JSON.stringify(tempB[j])) {
    //                                     found = true
    //                                     break
    //                                 }
    //                             }
    //                             if (!found) {
    //                                 arr.push(k)
    //                                 break
    //                             }
    //                         }
    //                     }
                        
    //                 } else {
    //                     if (JSON.stringify(a[k]) === JSON.stringify(b[k])) {
    //                         arr.push(k)
    //                     }
    //                 }
    //             }
                
    //         } 
            
    //     }

    //     return arr
    // }

    applyExtension(chunk) {
        let extElmt = chunk.extensionElements

        if (extElmt) {
            let len = extElmt.length
            for (var i=0; i<len; i++) {
                let elmt = extElmt.shift()

                if (elmt.elementGroup === chunk.nameId) {
                    let kernelElmt = chunk[elmt.type]

                    if (kernelElmt) {
                        for (let el of kernelElmt) {
                            if (el[elmt.targetAttribute] === elmt.targetElement) {
                                el[elmt.targetAttribute] = elmt.value
                            }
                        }
                    } else {
                        let keys = Object.keys(chunk)
                        console.log(elmt.type)
                        for (let k of keys) {

                            let found = false

                            if (Array.isArray(chunk[k]) && chunk[k].length > 0) {
                                
                                if (chunk[k][0][elmt.type]) {
                                    found = true
                                    for (let idx=0; idx < chunk[k].length; idx++) {
                                        for (let idx_type=0; idx_type < chunk[k][idx][elmt.type].length; idx_type++) {
                                            if (chunk[k][idx][elmt.type][idx_type][elmt.targetAttribute] === elmt.targetElement) {
                                                chunk[k][idx][elmt.type][idx_type][elmt.targetAttribute] = elmt.value
                                            }
                                        }
                                    }
                                }
                                
                            }
                            if (found) {
                                break
                            }
                        }
                    }

                    
                }
            }
        }


    }

    isString(x) {
        return (typeof x == 'string' || x instanceof String)
    }

    // kalo berhasil merge juga, ganti nama jd getconflictandmerge
    getConflict(a, b) {

        var keys = new Set([...Object.keys(a), ...Object.keys(b)])
        var arr = []

        var x

        for (var k of keys) {
            if (a[k] && b[k]) {
                if (typeof a[k] === 'object' || a[k] instanceof Object) {
                    
                    if (Array.isArray(a[k])) {

                        if ((a[k].length > 0 && this.isString(a[k][0])) || (b[k].length > 0 && this.isString(b[k][0]))) {
                            if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
                                arr.push({'attribute': k})
                            }
                        } else {
                            let tempA = a[k]
                            let tempB = b[k]
                            for (var i=0; i<a[k].length; i++) {
                                let found = false
                                for (var j=0; j<b[k].length; j++) {
                                    if (tempA[i].name === tempB[j].name || tempA[i].nameId === tempB[j].nameId) {
                                        found = true
                                        if (JSON.stringify(tempA[i]) !== JSON.stringify(tempB[j])) {
                                            let newObj = {
                                                'idxFixedList': j,
                                                'idxConflictList': i,
                                                'attribute': k
                                            }
                                            arr.push(newObj)
                                        }
                                        break
                                    }
                                    
                                }
                                if (!found) {
                                    b[k].push(tempA[i])
                                }
                            }
                        }
                        
                    } else {
                        if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
                            arr.push({'attribute': k})
                        }
                    }
                } else {
                    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) {
                        arr.push({'attribute': k})
                    }
                }
                
            } else {
                if (a[k]) {
                    b[k] = a[k].slice()
                }
            }
            
        }

        return arr
    }

    // combineComponents(a, b) {
    //     let keys = new Set([...Object.keys(a), ...Object.keys(b)])

    //     for (var k of keys) {

    //     }
    // }


    conflictResolution(conflictedObject, idxOnConflict, conflictAt) {

        let conflict = {
            'idx': idxOnConflict,
            'at': conflictAt,
            'detail': conflictedObject
        }
        return conflict
    }

    composeAlphas(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkAlphas = firstChunk.alphas;
        var secondChunkAlphas = secondChunk.alphas;

        // console.log("TESTTTINGGG")
        // let arr = [1,2,3,4]
        // let x = arr.shift()
        // console.log("x", x)
        // console.log("arr", arr)


        if (firstChunkAlphas && secondChunkAlphas) {
            firstChunkAlphas = JSON.parse(JSON.stringify(firstChunkAlphas));
            secondChunkAlphas = JSON.parse(JSON.stringify(secondChunkAlphas));

            var alphasToBeMerged = firstChunkAlphas.slice();

            var conflicts = []

            var alphasTemp = alphasToBeMerged.slice();
            for (var i = 0; i < secondChunkAlphas.length; i++) {
              var firstCurrentAlpha = secondChunkAlphas[i];
              var isContained = false;

              for (var j = 0; j < alphasTemp.length; j++) {
                var secondCurrentAlpha = alphasTemp[j];

                if (firstCurrentAlpha.name === secondCurrentAlpha.name || firstCurrentAlpha.nameId === secondCurrentAlpha.nameId) {
                    // penanganan 3 kasus dimulai disini

                    let conflictAt = this.getConflict(firstCurrentAlpha, secondCurrentAlpha)

                    if (conflictAt.length > 0) {
                        // semantik ga sama, jadinya harus bikin object merge resolution
                        let newRes = this.conflictResolution(firstCurrentAlpha, j, conflictAt)
                        conflicts.push(newRes)
                        
                    }
                    isContained = true;
                    break;
                }
              }

              if (!isContained) {
                alphasToBeMerged.push(firstCurrentAlpha);
              }
            }

            this.setState({
                alphasToBeMerged: alphasToBeMerged,
                alphasConflicts: conflicts
            })

            console.log("composeAlphas SELESAI KAK")
            console.log("alphasToBeMerged", alphasToBeMerged)
            console.log("conflicts", conflicts)

        } else {
            if (firstChunkAlphas) {
                this.setState({
                    alphasToBeMerged: firstChunkAlphas
                })

                console.log("composeAlphas SELESAI KAK")
                console.log("alphasToBeMerged", firstChunkAlphas)
            } else
            if (secondChunkAlphas) {
                this.setState({
                    alphasToBeMerged: secondChunkAlphas
                })

                console.log("composeAlphas SELESAI KAK")
                console.log("alphasToBeMerged", secondChunkAlphas)
            }
        }
        
        
    }

    resolveConflictWorkProduct(firstWorkProduct, secondWorkProduct, currentAlphaName, firstWorkProductExtensionElements, secondWorkProductExtensionElements) {
        console.log("masuk resolveConflictWorkProduct")

        var firstWorkProductTemp = JSON.parse(JSON.stringify(firstWorkProduct));
        var firstWorkProductToBeInserted = JSON.parse(JSON.stringify(firstWorkProduct));
        var secondWorkProductTemp = JSON.parse(JSON.stringify(secondWorkProduct));
        var workProductName = firstWorkProductTemp.name;
        var firstWorkProductExtensionName = firstWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstWorkProductExtensionName[0])) {
          workProductName = firstWorkProductExtensionName[0].value;
          firstWorkProductTemp.name = firstWorkProductExtensionName[0].value;
          firstWorkProductToBeInserted.name = firstWorkProductExtensionName[0].value;
        }

        // Fill missing property from the second one to the first one
        var currentWorkProductKeys = Object.keys(firstWorkProductTemp);
        for (var secondWorkProductProperty in secondWorkProductTemp) {
          if (currentWorkProductKeys.indexOf(secondWorkProductProperty) === -1) {
            firstWorkProductToBeInserted[secondWorkProductProperty] = secondWorkProductTemp[secondWorkProductProperty];
          }
        }

        let tempWorkProduct = this.state.TemporaryWorkProduct.slice()
        tempWorkProduct.push({
            currentAlphaName: currentAlphaName,
            workProductName: workProductName,
            workProduct: firstWorkProductToBeInserted
        })

        this.setState({
            TemporaryWorkProduct: tempWorkProduct
        })

        var currentWorkProductIdx = tempWorkProduct.length - 1

        for (var conflictedAttribute in firstWorkProductTemp) {
          if (!firstWorkProductTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondWorkProductTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          if (conflictedAttribute === "levelOfDetails") {
            if (!this.isEqual(firstWorkProductTemp.levelOfDetails, secondWorkProductTemp.levelOfDetails)) {
              let missingLevelOfDetail = secondWorkProductTemp.levelOfDetails.filter(levelOfDetail => firstWorkProductTemp.levelOfDetails.indexOf(levelOfDetail) === -1);
              firstWorkProductTemp.levelOfDetails = firstWorkProductTemp.levelOfDetails.concat(missingLevelOfDetail);

              let property = "workProducts.levelOfDetails";

              let tempWorkProducts = this.state.TemporaryWorkProduct.slice()

              tempWorkProducts[currentWorkProductIdx].workProduct.levelOfDetails = firstWorkProductTemp.levelOfDetails

              this.setState({
                TemporaryWorkProduct: tempWorkProducts
              })
            }
            continue;
          }

          var isCurrentAttributeConflict = true;

          var currentFirstExtensionAttribute = firstWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondExtensionAttribute = secondWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;
          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(secondWorkProductTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          } else {
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(firstWorkProductTemp[conflictedAttribute]) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(firstWorkProductTemp[conflictedAttribute]) === JSON.stringify(secondWorkProductTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          }

          // Berarti udah sama, tidak perlu di bikin prompt lagi untuk pilih nilai
          if (!isCurrentAttributeConflict) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Work Product',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstWorkProductTemp,
          //   secondWorkProductTemp,
          //   conflictedAttribute,
          //   currentWorkProduct,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     console.log(property);
          //     var property = 'workProduct.' + property;
          //     TemporaryWorkProduct.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }

    resolveConflictSubAlpha(firstSubAlpha, secondSubAlpha, currentAlphaName, firstSubAlphaExtensionElements, secondSubAlphaExtensionElements) {
        console.log("masuk resolveConflictSubAlpha")

        var firstSubAlphaTemp = JSON.parse(JSON.stringify(firstSubAlpha));
        var firstSubAlphaToBeInserted = JSON.parse(JSON.stringify(firstSubAlpha));
        var secondSubAlphaTemp = JSON.parse(JSON.stringify(secondSubAlpha));
        var subAlphaName = firstSubAlphaTemp.name;
        var firstSubAlphaExtensionName = firstSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
        if (!this.isEmpty(firstSubAlphaExtensionName[0])) {
          subAlphaName = firstSubAlphaExtensionName[0].value;
          firstSubAlphaTemp.name = firstSubAlphaExtensionName[0].value;
          firstSubAlphaToBeInserted.name = firstSubAlphaExtensionName[0].value;
        }

        // Fill missing attribute from the second one to the first one
        var currentSubAlphaKeys = Object.keys(firstSubAlphaTemp);
        for (var secondSubAlphaProperty in secondSubAlphaTemp) {
          if (currentSubAlphaKeys.indexOf(secondSubAlphaProperty) === -1) {
            firstSubAlphaToBeInserted[secondSubAlphaProperty] = secondSubAlphaTemp[secondSubAlphaProperty];
          }
        }

        let tempSubAlpha = this.state.TemporarySubAlpha.slice()
        tempSubAlpha.push({
            currentAlphaName: currentAlphaName,
            subAlphaName: subAlphaName,
            subAlpha: firstSubAlphaToBeInserted
        })

        this.setState({
            TemporarySubAlpha: tempSubAlpha
        })

        var currentSubAlphaIdx = tempSubAlpha.length - 1

        for (var conflictedAttribute in firstSubAlphaTemp) {
          if (!firstSubAlphaTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondSubAlphaTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          // Kalau ketemu workProduct atau state, diskip dulu, karena di handle terpisah
          if (conflictedAttribute === "workProducts" || conflictedAttribute === "states") {
            continue;
          }

          var isCurrentAttributeConflict = true;

          var currentFirstExtensionAttribute = firstSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondExtensionAttribute = secondSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;
          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(secondSubAlphaTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          } else {
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(firstSubAlphaTemp[conflictedAttribute]) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(firstSubAlphaTemp[conflictedAttribute]) === JSON.stringify(secondSubAlphaTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          }

          // Berarti udah sama, tidak perlu di bikin prompt lagi untuk pilih nilai
          if (!isCurrentAttributeConflict) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Sub Alpha',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstSubAlphaTemp,
          //   secondSubAlphaTemp,
          //   conflictedAttribute,
          //   currentSubAlpha,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     console.log(property);
          //     var property = 'subAlpha.' + property;
          //     TemporarySubAlpha.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }

    resolveConflictSubAlphaWorkProduct(firstSubAlphaWorkProduct, secondSubAlphaWorkProduct, currentAlphaName, currentSubAlphaName, firstSubAlphaWorkProductExtensionElements, secondSubAlphaWorkProductExtensionElements) {
        console.log("masuk resolveConflictSubAlphaWorkProduct")

        var firstSubAlphaWorkProductTemp = JSON.parse(JSON.stringify(firstSubAlphaWorkProduct));
        var firstSubAlphaWorkProductToBeInserted = JSON.parse(JSON.stringify(firstSubAlphaWorkProduct));
        var secondSubAlphaWorkProductTemp = JSON.parse(JSON.stringify(secondSubAlphaWorkProduct));
        var subAlphaWorkProductName = firstSubAlphaWorkProductTemp.name;
        var firstSubAlphaWorkProductExtensionName = firstSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstSubAlphaWorkProductExtensionName[0])) {
          subAlphaWorkProductName = firstSubAlphaWorkProductExtensionName[0].value;
          firstSubAlphaWorkProductTemp.name = firstSubAlphaWorkProductExtensionName[0].value;
          firstSubAlphaWorkProductToBeInserted.name = firstSubAlphaWorkProductExtensionName[0].value;
        }

        // Find missing attribute of the second one to the first one
        var currentSubAlphaWorkProductKeys = Object.keys(firstSubAlphaWorkProductTemp);
        for (var secondSubAlphaWorkProductProperty in secondSubAlphaWorkProductTemp) {
          if (currentSubAlphaWorkProductKeys.indexOf(secondSubAlphaWorkProductProperty) === -1) {
            firstSubAlphaWorkProductToBeInserted[secondSubAlphaWorkProductProperty] = secondSubAlphaWorkProductTemp[secondSubAlphaWorkProductProperty];
          }
        }

        let tempSubAlphaWorkProduct = this.state.TemporarySubAlphaWorkProduct.slice()
        tempSubAlphaWorkProduct.push({
            alphaName: currentAlphaName,
            subAlphaName: currentSubAlphaName,
            subAlphaWorkProductName: subAlphaWorkProductName,
            subAlphaWorkProduct: firstSubAlphaWorkProductToBeInserted
        })

        this.setState({
            TemporarySubAlphaWorkProduct: tempSubAlphaWorkProduct
        })

        var currentSubAlphaWorkProductIdx = tempSubAlphaWorkProduct.length - 1

        for (var conflictedAttribute in firstSubAlphaWorkProductTemp) {
          if (!firstSubAlphaWorkProductTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondSubAlphaWorkProductTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          if (conflictedAttribute === "levelOfDetails") {
            if (!this.isEqual(firstSubAlphaWorkProductTemp.levelOfDetails, secondSubAlphaWorkProductTemp.levelOfDetails)) {
              let missingLevelOfDetail = secondSubAlphaWorkProductTemp.levelOfDetails.filter(levelOfDetail => firstSubAlphaWorkProductTemp.levelOfDetails.indexOf(levelOfDetail) === -1);
              firstSubAlphaWorkProductTemp.levelOfDetails = firstSubAlphaWorkProductTemp.levelOfDetails.concat(missingLevelOfDetail);

              let tempSubAlphaWorkProducts = this.state.TemporarySubAlphaWorkProduct.slice()
              tempSubAlphaWorkProducts[currentSubAlphaWorkProductIdx].subAlphaWorkProduct.levelOfDetails = firstSubAlphaWorkProductTemp.levelOfDetails

              this.setState({
                TemporarySubAlphaWorkProduct: tempSubAlphaWorkProducts
              })
            }
            continue;
          }

          var currentFirstSubAlphaWorkProductAttributeValue = firstSubAlphaWorkProductTemp[conflictedAttribute];
          var currentFirstExtensionAttribute = firstSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondSubAlphaWorkProductAttributeValue = secondSubAlphaWorkProductTemp[conflictedAttribute];
          var currentSecondExtensionAttribute = secondSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;

          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            currentFirstSubAlphaWorkProductAttributeValue = currentFirstExtensionAttribute[0].value;
          }

          if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
            isCurrentSecondExtensionAvailable = true;
            currentSecondSubAlphaWorkProductAttributeValue = currentSecondExtensionAttribute[0].value;
          }

          // Nilainya sama ga perlu bikin prompt
          if (JSON.stringify(currentFirstSubAlphaWorkProductAttributeValue) === JSON.stringify(currentSecondSubAlphaWorkProductAttributeValue)) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Sub-Alpha Work Product',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstSubAlphaWorkProductTemp,
          //   secondSubAlphaWorkProductTemp,
          //   conflictedAttribute,
          //   currentSubAlphaWorkProduct,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     console.log(property);
          //     var property = 'subAlphaWorkProduct.' + property;
          //     TemporarySubAlphaWorkProduct.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }

    resolveConflictSubAlphaState(firstSubAlphaState, secondSubAlphaState, currentAlphaName, currentSubAlphaName, firstSubAlphaStateExtensionElements, secondSubAlphaStateExtensionElements) {
        console.log("masuk resolveConflictSubAlphaState")

        var firstSubAlphaStateTemp = JSON.parse(JSON.stringify(firstSubAlphaState));
        var firstSubAlphaStateToBeInserted = JSON.parse(JSON.stringify(firstSubAlphaState));
        var secondSubAlphaStateTemp = JSON.parse(JSON.stringify(secondSubAlphaState));
        var subAlphaStateName = firstSubAlphaStateTemp.name;
        var firstSubAlphaStateExtensionName = firstSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstSubAlphaStateExtensionName[0])) {
          subAlphaStateName = firstSubAlphaStateExtensionName[0].value;
        }

        // Find missing attribute of second one in the first one
        var currentSubAlphaStateKeys = Object.keys(firstSubAlphaStateTemp);
        for (var secondSubAlphaStateProperty in secondSubAlphaStateTemp) {
          if (currentSubAlphaStateKeys.indexOf(secondSubAlphaStateProperty) === -1) {
            firstSubAlphaStateToBeInserted[secondSubAlphaStateProperty] = secondSubAlphaStateTemp[secondSubAlphaStateProperty]
          }
        }

        let tempSubAlphaStates = this.state.TemporarySubAlphaState.slice()

        tempSubAlphaStates.push({
            alphaName: currentAlphaName,
            subAlphaName: currentSubAlphaName,
            subAlphaStateName: subAlphaStateName,
            subAlphaState: firstSubAlphaStateToBeInserted
        })

        this.setState({
            TemporarySubAlphaState: tempSubAlphaStates
        })

        var currentSubAlphaStateIdx = tempSubAlphaStates.length - 1

        for (var conflictedAttribute in firstSubAlphaStateTemp) {
          if (!firstSubAlphaStateTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          if (!secondSubAlphaStateTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          if (conflictedAttribute === "checklists") {
            if (!this.isEqual(firstSubAlphaStateTemp[conflictedAttribute], secondSubAlphaStateTemp[conflictedAttribute])) {
              let missingChecklist = secondSubAlphaStateTemp.checklists.filter(checklist => firstSubAlphaStateTemp.checklists.indexOf(checklist) === -1);
              firstSubAlphaStateTemp.checklists = firstSubAlphaStateTemp.checklists.concat(missingChecklist);

              let tempSubAlphaStates = this.state.TemporarySubAlphaState.slice()

              tempSubAlphaStates[currentSubAlphaStateIdx].subAlphaState.checklists = firstSubAlphaStateTemp.checklists

              this.setState({
                TemporarySubAlphaState: tempSubAlphaStates
              })
            }
            continue;
          }

          var currentFirstSubAlphaStateAttributeValue = firstSubAlphaStateTemp[conflictedAttribute];
          var currentFirstExtensionAttribute = firstSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondSubAlphaStateAttributeValue = secondSubAlphaStateTemp[conflictedAttribute];
          var currentSecondExtensionAttribute = secondSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;

          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            currentFirstSubAlphaStateAttributeValue = currentFirstExtensionAttribute[0].value;
          }

          if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
            isCurrentSecondExtensionAvailable = true;
            currentSecondSubAlphaStateAttributeValue = currentSecondExtensionAttribute[0].value;
          }

          if (JSON.stringify(currentFirstSubAlphaStateAttributeValue) === JSON.stringify(currentSecondSubAlphaStateAttributeValue)) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Sub-Alpha State',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstSubAlphaStateTemp,
          //   secondSubAlphaStateTemp,
          //   conflictedAttribute,
          //   currentSubAlphaState,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     console.log(property);
          //     var property = 'subAlphaState.' + property;
          //     TemporarySubAlphaState.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }


    composePatterns(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkPatterns = firstChunk.patterns;
        var secondChunkPatterns = secondChunk.patterns;

        if (firstChunkPatterns && secondChunkPatterns) {
            firstChunkPatterns = JSON.parse(JSON.stringify(firstChunkPatterns));
            secondChunkPatterns = JSON.parse(JSON.stringify(secondChunkPatterns));

            var patternsToBeMerged = firstChunkPatterns.slice();
            var conflicts = []

            var patternsTemp = patternsToBeMerged.slice();

            for (var i = 0; i < secondChunkPatterns.length; i++) {
              var firstCurrentPatterns = secondChunkPatterns[i];
              var isContained = false;

              for (var j = 0; j < patternsTemp.length; j++) {
                var secondCurrentPatterns = patternsTemp[j];

                if (firstCurrentPatterns.name === secondCurrentPatterns.name || firstCurrentPatterns.nameId === secondCurrentPatterns.nameId) {

                    let conflictAt = this.getConflict(firstCurrentPatterns, secondCurrentPatterns)

                    if (conflictAt.length > 0) {
                        // semantik ga sama, jadinya harus bikin object merge resolution
                        let newRes = this.conflictResolution(firstCurrentPatterns, j, conflictAt)
                        conflicts.push(newRes)
                        
                    }

                    isContained = true;
                    break;
                  
                }
              }

              if (!isContained) {
                patternsToBeMerged.push(firstCurrentPatterns);
              }
            }


            this.setState({
                patternsToBeMerged: patternsToBeMerged,
                patternsConflicts: conflicts
            })

            console.log("composePatterns SELESAI KAK")
            console.log("patternsToBeMerged", patternsToBeMerged)
            console.log("conflicts", conflicts)
        } else {
            if (firstChunkPatterns) {
                this.setState({
                    patternsToBeMerged: firstChunkPatterns
                })

                console.log("composePatterns SELESAI KAK")
                console.log("patternsToBeMerged", firstChunkPatterns)
            } else 
            if (secondChunkPatterns) {
                this.setState({
                    patternsToBeMerged: secondChunkPatterns
                })

                console.log("composePatterns SELESAI KAK")
                console.log("patternsToBeMerged", secondChunkPatterns)
            }
        }

        
    }

    resolveConflictPatterns(firstPatterns, secondPatterns, firstPatternsExtensionElements, secondPatternsExtensionElements) {
        console.log("masuk resolveConflictPatterns")

        var firstPatternsTemp = JSON.parse(JSON.stringify(firstPatterns));
        var firstPatternsToBeInserted = JSON.parse(JSON.stringify(firstPatterns));
        var secondPatternsTemp = JSON.parse(JSON.stringify(secondPatterns));
        var patternsName = firstPatternsTemp.name;
        var firstPatternsExtensionName = firstPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstPatternsExtensionName[0])) {
          patternsName = firstPatternsExtensionName[0].value;
          firstPatternsTemp.name = firstPatternsExtensionName[0].value;
          firstPatternsToBeInserted.name = firstPatternsExtensionName[0].value;
        }

        // Fill missing attribute from the second one to the first one
        var currentPatternsKeys = Object.keys(firstPatternsTemp);
        for (var secondPatternsProperty in secondPatternsTemp) {
          if (currentPatternsKeys.indexOf(secondPatternsProperty) === -1) {
            firstPatternsToBeInserted[secondPatternsProperty] = secondPatternsTemp[secondPatternsProperty];
          }
        }

        firstPatternsToBeInserted.pattern = [];

        let tempPatterns = this.state.TemporaryPatterns.slice()
        tempPatterns.push({
            patternsName: patternsName,
            patterns: firstPatternsToBeInserted
        })

        this.setState({
            TemporaryPatterns: tempPatterns
        })

        var currentPatternsIdx = tempPatterns.length - 1

        for (var conflictedAttribute in firstPatternsTemp) {
          if (!firstPatternsTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondPatternsTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          // Kalau ketemu pattern, diskip dulu, karena di handle terpisah
          if (conflictedAttribute === "pattern") {
            continue;
          }

          var isCurrentAttributeConflict = true;
          var currentFirstExtensionAttribute = firstPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondExtensionAttribute = secondPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;

          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(secondPatternsTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          } else {
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(firstPatternsTemp[conflictedAttribute]) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(firstPatternsTemp[conflictedAttribute]) === JSON.stringify(secondPatternsTemp[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          }

          // Sudah sama, tidak perlu dibuat prompt lagi
          if (!isCurrentAttributeConflict) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Patterns',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstPatternsTemp,
          //   secondPatternsTemp,
          //   conflictedAttribute,
          //   currentPatterns,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     console.log(property);
          //     var property = 'patterns.' + property;
          //     TemporaryPatterns.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }

    resolveConflictPattern(firstPattern, secondPattern, patternsName, firstPatternExtensionElements, secondPatternExtensionElements) {
        console.log("masuk resolveConflictPattern")

        var firstPatternTemp = JSON.parse(JSON.stringify(firstPattern));
        var firstPatternToBeInserted = JSON.parse(JSON.stringify(firstPattern));
        var secondPatternTemp = JSON.parse(JSON.stringify(secondPattern));
        var patternName = firstPatternTemp.name;
        var firstPatternExtensionName = firstPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

        if (!this.isEmpty(firstPatternExtensionName[0])) {
          patternName = firstPatternExtensionName[0].value;
          firstPatternTemp.name = firstPatternExtensionName[0].value;
          firstPatternToBeInserted.name = firstPatternExtensionName[0].value;
        }

        // Fill missing attribute from the second one to the first one
        var currentPatternKeys = Object.keys(firstPatternTemp);
        for (var secondPatternProperty in secondPatternTemp) {
          if (currentPatternKeys.indexOf(secondPatternProperty) === -1) {
            firstPatternToBeInserted[secondPatternProperty] = secondPatternTemp[secondPatternProperty];
          }
        }

        let tempPattern = this.state.TemporaryPattern.slice()
        tempPattern.push({
            patternName: patternName,
            patternsName: patternsName,
            pattern: firstPatternToBeInserted
        })

        this.setState({
            TemporaryPattern: tempPattern
        })

        var currentPatternIdx = tempPattern.length - 1

        // var currentInsertedPattern = currentInsertedPatterns[0];

        for (var conflictedAttribute in firstPatternTemp) {
          if (!firstPatternTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }
          if (!secondPatternTemp.hasOwnProperty(conflictedAttribute)) {
            continue;
          }

          // Gabungin competencies, alpha sama activity, dengan kasus konflikpun, tetap digabungin
          // karena dari atribut" tersebut ga bisa konflik.
          if (conflictedAttribute === "alphas") {
            if (firstPatternTemp.alphas !== secondPatternTemp.alphas) {
              var missingAlpha = secondPatternTemp.alphas.slice().filter(currentAlpha => firstPatternTemp.alphas.indexOf(currentAlpha) === -1);
              firstPatternTemp.alphas = firstPatternTemp.alphas.concat(missingAlpha);
            }

            let tempPatterns = this.state.TemporaryPattern.slice()
            tempPatterns[currentPatternIdx].pattern.alphas = firstPatternTemp.alphas

            this.setState({
                TemporaryPattern: tempPatterns
            })
            continue;
          } else if (conflictedAttribute === "activities") {
            if (firstPatternTemp.activities !== secondPatternTemp.activities) {
              var missingActivity = secondPatternTemp.activities.slice().filter(currentActivity => firstPatternTemp.activities.indexOf(currentActivity) === -1);
              firstPatternTemp.activities = firstPatternTemp.activities.concat(missingActivity);
            }

            let tempPatterns = this.state.TemporaryPattern.slice()
            tempPatterns[currentPatternIdx].pattern.activities = firstPatternTemp.activities

            this.setState({
                TemporaryPattern: tempPatterns
            })

            continue;
          } else if (conflictedAttribute === "competencies") {
            if (firstPatternTemp.competencies !== secondPatternTemp.competencies) {
              var missingCompetency = secondPatternTemp.competencies.slice().filter(currentCompetency => firstPatternTemp.competencies.indexOf(currentCompetency) === -1);
              firstPatternTemp.competencies = firstPatternTemp.competencies.concat(missingCompetency);
            }

            let tempPatterns = this.state.TemporaryPattern.slice()
            tempPatterns[currentPatternIdx].pattern.competencies = firstPatternTemp.competencies

            this.setState({
                TemporaryPattern: tempPatterns
            })

            continue;
          }

          // Normalnya harusnya konflik(beda nilainya)
          var isCurrentAttributeConflict = true;

          var currentFirstExtensionAttribute = firstPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var currentSecondExtensionAttribute = secondPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === conflictedAttribute);
          var isCurrentFirstExtensionAvailable = false;
          var isCurrentSecondExtensionAvailable = false;
          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
            isCurrentFirstExtensionAvailable = true;
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(currentFirstExtensionAttribute[0].value) === JSON.stringify(secondPattern[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          } else {
            if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
              isCurrentSecondExtensionAvailable = true;
              if (JSON.stringify(firstPattern[conflictedAttribute]) === JSON.stringify(currentSecondExtensionAttribute[0].value)) {
                isCurrentAttributeConflict = false;
              }
            } else {
              if (JSON.stringify(firstPattern[conflictedAttribute]) === JSON.stringify(secondPattern[conflictedAttribute])) {
                isCurrentAttributeConflict = false;
              }
            }
          }

          // Berarti udah sama, tidak perlu di bikin prompt lagi untuk pilih nilai
          if (!isCurrentAttributeConflict) {
            continue;
          }

          // Popup.registerPlugin('prompt', function (firstTask, secondTask, property, currentTask, firstExtensionAvailable, firstExtension, secondExtensionAvailable, secondExtension, insertIdentifierCallback, onPickValue) {
          //   Popup.create({
          //     title: 'Merge Resolution Pattern',
          //     content: <MergeConflictPrompt firstTask={firstTask[property]} secondTask={secondTask[property]} property={property} currentTask={currentTask} />,
          //     buttons: {
          //       left: [{
          //         text: 'First',
          //         className: 'firstTask',
          //         action: function () {
          //           if (firstExtensionAvailable) {
          //             onPickValue(property, firstExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, firstTask[property], currentTask._id);
          //           }
          //           if (secondExtensionAvailable) {
          //             insertIdentifierCallback(secondExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }],
          //       right: [{
          //         text: 'Second',
          //         className: 'secondTask',
          //         action: function () {
          //           if (secondExtensionAvailable) {
          //             onPickValue(property, secondExtension.value, currentTask._id);
          //           } else {
          //             onPickValue(property, secondTask[property], currentTask._id);
          //           }
          //           if (firstExtensionAvailable) {
          //             insertIdentifierCallback(firstExtension.identifier);
          //           }
          //           Popup.close();
          //         }
          //       }]
          //     }
          //   });
          // });
          // Popup.plugins().prompt(
          //   firstPatternTemp,
          //   secondPatternTemp,
          //   conflictedAttribute,
          //   currentInsertedPattern,
          //   isCurrentFirstExtensionAvailable,
          //   currentFirstExtensionAttribute[0],
          //   isCurrentSecondExtensionAvailable,
          //   currentSecondExtensionAttribute[0],
          //   this.insertIdentifierToState.bind(this),
          //   function (property, value, taskId) {
          //     property = "pattern." + property;
          //     TemporaryPattern.update(taskId, {
          //       $set: { [property]: value }
          //     });
          //   }
          // );
          // ReactDOM.render(
          //   <Popup />,
          //   document.getElementById('popupContainer')
          // );
        }
    }


    composeIntention(chunkToBeComposed) {
        // Empty state if needed
        let firstChunkIntention = JSON.parse(JSON.stringify(chunkToBeComposed[0].intention));
        let secondChunkIntention = JSON.parse(JSON.stringify(chunkToBeComposed[1].intention));

        if (firstChunkIntention && secondChunkIntention) {
            let newIntentions = firstChunkIntention;

            if (JSON.stringify(newIntentions) !== JSON.stringify(secondChunkIntention)) {
              let missingIntentions = secondChunkIntention.slice().filter(intention => newIntentions.indexOf(intention) === -1);
              newIntentions = newIntentions.concat(missingIntentions);
            }

            this.setState({
                intentionsToBeMerged: newIntentions
            })
            console.log("composeIntention SELESAI KAK")
            console.log(newIntentions)
        } else {
            if (firstChunkIntention) {
                this.setState({
                    intentionsToBeMerged: firstChunkIntention
                })
                console.log("composeIntention SELESAI KAK", firstChunkIntention)
            } else
            if (secondChunkIntention) {
                this.setState({
                    intentionsToBeMerged: secondChunkIntention
                })
                console.log("composeIntention SELESAI KAK", secondChunkIntention)
            }
        }

        
    }

    saveCreatedMethod() {
        let user = this.props.match.params.user;
        let project = this.props.match.params.project;
        let pid = user + '/' + project
        let data = {
            project_id: pid,
            method: {
                name: this.state.name,
                description: this.state.description,
                ...this.state.createdChunk
            }
        }

        console.log("data", data)
        this.props.saveMethod(data)


        alert("method saved!")
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false
        });
    }

    handleChooseMCClick() {
        console.log("choose MC clicked")
    }

    render() {
        
        const project = this.props.project
        const createdChunk = this.state.createdChunk
        return (
            <div>
                <h1>Method Chunk Composition Page</h1>
                <br />
                { project ? 
                    <div>
                        <Row className="d-flex">
                            <Col xs={10} sm={12} md={10}>
                                <h2>Project: { project.name }</h2>
                            </Col>
                            <Col xs={2} sm={12} md={2}>
                                <p>Owner: {project.user}</p>
                            </Col>
                        </Row>
                        <br/>
                        <p>
                        Description: <br/>
                        {project.description}
                        </p>
                        <br />
                        <h3>Method Chunk List</h3>
                        <br />
                        {
                            project.method_chunks.map((el, idx) => (
                                <MCCard mc={el}/>
                            ))
                        }
                        <br />
                        <Row className="d-flex justify-content-center">
                            <Button
                                onClick={() => this.composeMC()}
                            >
                                Compose MC
                            </Button>
                        </Row>

                        { this.state.created ?
                            <div>
                                <br />
                                <MCCard mc={this.state.createdChunk} />
                                <br/>
                                <Row className="d-block">
                                    <h3>Add Method's details</h3>
                                    <Form>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                              type="name"
                                              name="name"
                                              placeholder="Enter method name"
                                              value={this.state.name || ""}
                                              onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                              as="textarea"
                                              rows="5"
                                              name="description"
                                              placeholder="Enter method description..."
                                              value={this.state.description || ""}
                                              onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Button
                                        variant="success"
                                        className="float-right"
                                        onClick={() => this.saveCreatedMethod()}
                                    >
                                        Save Method
                                    </Button>
                                </Row>
                            </div>
                        : null}
                    </div>

                : null}

                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                  <h2>There are some conflicts</h2>
                  <Row>
                    <Col>
                      <ChooseMCCard
                        onClick={() => this.handleChooseMCClick()}
                      />
                    </Col>
                    <Col>
                      <ChooseMCCard
                        onClick={() => this.handleChooseMCClick()}
                      />
                    </Col>
                  </Row>
                </Modal>
                
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return ({
        project: state.projects.item
    })
};

const mapDispatchToProps = {
    getDetail: projectActions.getOneByPid,
    saveMethod: projectActions.saveMethod
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MCCompositionPage);