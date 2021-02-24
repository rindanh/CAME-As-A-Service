import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import { Row, Card, Form, Spinner, Table, ToggleButton, ToggleButtonGroup, Button, Col, Fade } from "react-bootstrap";

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

// function MCCard(props) {
//   const [open, setOpen] = useState(false);

//   const mc = props.mc

//   let chunkString = JSON.stringify(mc, null, 2)

//   return (
//     <>
//         {
//             !open ? 
//             <Card>
//                 <Card.Header
//                     onClick={() => setOpen(!open)}
//                     aria-controls="example-fade-text"
//                     aria-expanded={open}
//                 >
//                     {mc.name ? mc.name : "Created chunk"}
//                 </Card.Header>
//             </Card>
//             : 
//             <Card id="example-fade-text">
//                 <Card.Header
//                     onClick={() => setOpen(!open)}
//                     aria-controls="example-fade-text"
//                     aria-expanded={open}
//                 >
//                     {mc.name ? mc.name : "Created chunk"}
//                 </Card.Header>
//                 <Fade in={open}>
//                     <Card.Body>
//                         <Card.Text>
//                             Summary: <br/>
//                             Intention: {mc.intention} <br/>
//                             Activity Spaces({mc.activitySpaces.length}): { mc.activitySpaces.map((el) => (
//                                 <div>{el.nameId}, </div>
//                             )) }
//                             <br />
//                             Alphas({mc.alphas.length}): { mc.alphas.map((el) => (
//                                 <div>{el.nameId}</div>
//                             ))}
//                             <br/>
//                             Competencies({mc.competencies.length}): { mc.competencies.map((el) => (
//                                 <div>{el.nameId}</div>
//                             ))}
//                             <br/>
//                             Patterns({mc.patterns.length}): { mc.patterns.map((el) => (
//                                 <div>{el.nameId}</div>
//                             ))}
//                         </Card.Text>
//                         <code>
//                             <pre>
//                                 {chunkString}
//                             </pre>
//                         </code>
//                     </Card.Body>
//                 </Fade>
//             </Card>
//         }
        
//     </>
//   );
// }

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

            createdChunk: {},
            chunks: [],
            created: false,

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

    async composeMC() {
        console.log("yuk mulai compose")

        let taskToBeComposed = this.props.project.method_chunks
        let numberOfChunkToBeMerge = taskToBeComposed.length

        this.setState({
            chunks: taskToBeComposed
        })

        if (numberOfChunkToBeMerge >= 2) {
            // alert("lanjut kakakk")
            // if (numberOfChunkToBeMerge !== 2) {
            //     let currentChunksToBeMerged = taskToBeComposed

            //     let extensionElementsIdentifierToBeRemoved = []

            //     let extensionElementsToBeMerged = taskToBeComposed[0].extensionElements
            //     extensionElementsToBeMerged = extensionElementsToBeMerged.concat(taskToBeComposed[1].extensionElements)
            //     this.setState({
            //         extensionElementsToBeMerged: extensionElementsToBeMerged
            //     })

            //     var promise1 = new Promise((resolve, reject) => {
            //         this.composeTaskAlternative(taskToBeComposed);
            //         this.composeCompetencies(taskToBeComposed);
            //         this.composeAlphas(taskToBeComposed);
            //         this.composePatterns(taskToBeComposed);
            //         var intentionsToBeMerged = this.composeIntention(taskToBeComposed);
            //         resolve()
            //     })

            //     promise1.then(() => {
            //         console.log("semua state", this.state)
            //         this.mergeAll()
            //     })
                
            // } else {
                let initChunk = taskToBeComposed[0]
                for (var i=1; i<taskToBeComposed.length;i++) {

                    await new Promise(next => {
                        console.log("i", i)
                        let currentChunksToBeMerged = [initChunk, taskToBeComposed[i]]
                        console.log("currentChunksToBeMerged", currentChunksToBeMerged)

                        let extensionElementsIdentifierToBeRemoved = []

                        let extensionElementsToBeMerged = currentChunksToBeMerged[0].extensionElements
                        extensionElementsToBeMerged = extensionElementsToBeMerged.concat(currentChunksToBeMerged[1].extensionElements)
                        this.setState({
                            extensionElementsToBeMerged: extensionElementsToBeMerged
                        })

                        var promise1 = new Promise((resolve, reject) => {
                            this.composeTaskAlternative(currentChunksToBeMerged);
                            this.composeCompetencies(currentChunksToBeMerged);
                            this.composeAlphas(currentChunksToBeMerged);
                            this.composePatterns(currentChunksToBeMerged);
                            let intentionsToBeMerged = this.composeIntention(currentChunksToBeMerged);
                            resolve()
                        })

                        promise1.then(() => {
                            console.log("semua state", this.state)
                            var promise2 = new Promise((resolve, reject) => {
                                this.mergeAll()
                                resolve()
                            })
                            promise2.then(() => {
                                initChunk = this.state.createdChunk
                                console.log("this.state.createdChunk", this.state.createdChunk)
                                next()
                            })
                            
                        })
                    })
                }
                this.setState({
                    created: true
                })
                alert("Method is successfully created. Please fill the form to complete the method's information")
            // }
            
        } else {
            alert("Cannot compose method chunks because it is less than 2")
        }
    }

    handleConflicts() {
        console.log("masuk handleConflicts kak")
        var conflictedActivities = this.state.TemporaryActivity.slice()
        var conflictedCompetencies = this.state.TemporaryCompetency.slice()
        var conflictedPatterns = this.state.TemporaryPatterns.slice()
        var conflictedPattern = this.state.TemporaryPattern.slice()
        var conflictedWorkProducts = this.state.TemporaryWorkProduct.slice()
        var conflictedSubAlphas = this.state.TemporarySubAlpha.slice()
        var subAlphaWorkProducts = this.state.TemporarySubAlphaWorkProduct.slice()
        var subAlphaStates = this.state.TemporarySubAlphaState.slice()
        var conflictedEntryAlphas = this.state.TemporaryEntryCriterionAlphas.slice()
        var conflictedEntryWorkProducts = this.state.TemporaryEntryCriterionWorkProducts.slice()
        var conflictedCompletionAlphas = this.state.TemporaryCompletionCriterionAlphas.slice()
        var conflictedCompletionWorkProducts = this.state.TemporaryCompletionCriterionWorkProducts.slice()

        console.log(conflictedActivities)
        console.log(conflictedCompetencies)
        console.log(conflictedPatterns)
        console.log(conflictedPattern)
        console.log(conflictedWorkProducts)
        console.log(conflictedSubAlphas)
        console.log(subAlphaWorkProducts)
        console.log(subAlphaStates)
        console.log(conflictedEntryAlphas)
        console.log(conflictedEntryWorkProducts)
        console.log(conflictedCompletionAlphas)
        console.log(conflictedCompletionWorkProducts)

        var promise1 = new Promise((resolve, reject) => {
            if (conflictedActivities !== null) {

              for (var activityIterator = 0; activityIterator < conflictedActivities.length; activityIterator++) {
                for (var activitySpaceIterator = 0; activitySpaceIterator < this.state.activitySpacesToBeMerged.length; activitySpaceIterator++) {
                  if (conflictedActivities[activityIterator].activitySpaceName === this.state.activitySpacesToBeMerged[activitySpaceIterator].name) {
                    this.state.activitySpacesToBeMerged[activitySpaceIterator].activities.push(conflictedActivities[activityIterator].activities);
                  }
                }
                let tempActivity = this.state.TemporaryActivity.slice().filter((el, idx) => {
                    return el.activityName !== conflictedActivities[activityIterator].activityName
                })

                this.setState({
                    TemporaryActivity: tempActivity
                })

                // TemporaryActivity.find({ activityName: conflictedActivities[activityIterator].activityName }).forEach(function (doc) {
                //   TemporaryActivity.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedCompetencies !== null) {
              for (var competencyIterator = 0; competencyIterator < conflictedCompetencies.length; competencyIterator++) {
                // Delete current _id from object
                let currentCompetency = JSON.parse(JSON.stringify(conflictedCompetencies[competencyIterator]));
                
                let tempCompetencies = this.state.competenciesToBeMerged.slice()
                tempCompetencies.push(currentCompetency)

                let tempCompetency = this.state.TemporaryCompetency.slice().filter((el, idx) => {
                    return el.name !== conflictedCompetencies[competencyIterator].name
                })

                this.setState({
                    TemporaryCompetency: tempCompetency,
                    competenciesToBeMerged: tempCompetencies
                })

                
                // TemporaryCompetency.find({ name: conflictedCompetencies[competencyIterator].name }).forEach(function (doc) {
                //   TemporaryCompetency.remove({ _id: doc._id })
                // });
              }
            }

            if (conflictedPatterns !== null) {
              for (var patternsIterator = 0; patternsIterator < conflictedPatterns.length; patternsIterator++) {

                let tempPatternsToBeMerged = this.state.patternsToBeMerged.slice()
                tempPatternsToBeMerged.push(conflictedPatterns[patternsIterator].patterns)

                let tempPatterns = this.state.TemporaryPatterns.slice().filter((el, idx) => {
                    return el.patternsName !== conflictedPatterns[patternsIterator].patternsName
                })

                this.setState({
                    TemporaryPatterns: tempPatterns,
                    patternsToBeMerged: tempPatternsToBeMerged
                })

                // this.state.patternsToBeMerged.push(conflictedPatterns[patternsIterator].patterns);
                // TemporaryPatterns.find({ patternsName: conflictedPatterns[patternsIterator].patternsName }).forEach(function (doc) {
                //   TemporaryPatterns.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedPattern !== null) {
              // Tidak perlu mengkosongkan pattern terlebih dahulu, karena di composePatterns,
              // (untuk kasus 2) dan resolveConflictPatterns (untuk kasus 3), pattern dari sebuah patterns
              // sudah dikosongkan dengan []. Selain itu, untuk pengecekan nama tidak perlu mengambil
              // dari extension lagi, dikarenakan hasil patterns yang ada, sudah mengandung nilai
              // dari extension (kasus 2 di composePatterns) dan (kasus 3 di resolveConflictPatterns)
              for (var patternIterator = 0; patternIterator < conflictedPattern.length; patternIterator++) {

                let tempPatternsToBeMerged = this.state.patternsToBeMerged.slice()

                for (var currentPatternsIterator = 0; currentPatternsIterator < this.state.patternsToBeMerged.length; currentPatternsIterator++) {
                  if (this.state.patternsToBeMerged[currentPatternsIterator].name === conflictedPattern[patternIterator].patternsName) {
                    
                    tempPatternsToBeMerged[currentPatternsIterator].pattern.push(conflictedPattern[patternIterator].pattern)

                    // this.state.patternsToBeMerged[currentPatternsIterator].pattern.push(conflictedPattern[patternIterator].pattern);
                  }
                  
                }

                let tempPattern = this.state.TemporaryPattern.slice().filter((el, idx) => {
                    return el.patternName !== conflictedPattern[patternIterator].patternName
                })

                this.setState({
                    TemporaryPattern: tempPattern,
                    patternsToBeMerged: tempPatternsToBeMerged
                })

                // TemporaryPattern.find({ patternName: conflictedPattern[patternIterator].patternName }).forEach(function (doc) {
                //   TemporaryPattern.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedWorkProducts !== null) {
              for (var workProductIterator = 0; workProductIterator < conflictedWorkProducts.length; workProductIterator++) {

                let tempalphasToBeMerged = this.state.alphasToBeMerged.slice()

                for (var alphasIterator = 0; alphasIterator < this.state.alphasToBeMerged.length; alphasIterator++) {
                  if (conflictedWorkProducts[workProductIterator].currentAlphaName === this.state.alphasToBeMerged[alphasIterator].name) {
                    tempalphasToBeMerged[alphasIterator].workProducts.push(conflictedWorkProducts[workProductIterator].workProducts);
                  }
                }
                let tempWorkProduct = this.state.TemporaryWorkProduct.slice().filter((el, idx) => {
                    return el.workProductName !== conflictedWorkProducts[workProductIterator].workProductName
                })

                this.setState({
                    TemporaryWorkProduct: tempWorkProduct,
                    alphasToBeMerged: tempalphasToBeMerged
                })
              }
            }

            if (conflictedSubAlphas !== null) {
              for (var subAlphasIterator = 0; subAlphasIterator < conflictedSubAlphas.length; subAlphasIterator++) {

                let tempalphasToBeMerged = this.state.alphasToBeMerged.slice()

                for (var alphasIterator = 0; alphasIterator < this.state.alphasToBeMerged.length; alphasIterator++) {
                  if (conflictedSubAlphas[subAlphasIterator].currentAlphaName === this.state.alphasToBeMerged[alphasIterator].name) {
                    tempalphasToBeMerged[alphasIterator].subAlphas.push(conflictedSubAlphas[subAlphasIterator].subAlphas);
                  }
                }

                let tempSubAlpha = this.state.TemporarySubAlpha.slice().filter((el, idx) => {
                    return el.subAlphaName !== conflictedSubAlphas[subAlphasIterator].subAlphaName
                })

                this.setState({
                    TemporarySubAlpha: tempSubAlpha,
                    alphasToBeMerged: tempalphasToBeMerged
                })

                // TemporarySubAlpha.find({ subAlphaName: conflictedSubAlphas[subAlphasIterator].subAlphaName }).forEach(function (doc) {
                //   TemporarySubAlpha.remove({ _id: doc._id });
                // });
              }
            }

            if (subAlphaWorkProducts !== null) {
              // Empty the work products of each CONFLICTED sub-alpha
              let tempalphasToBeMerged = this.state.alphasToBeMerged.slice()
              for (var emptySubAlphaWorkProductsIterator = 0; emptySubAlphaWorkProductsIterator < subAlphaWorkProducts.length; emptySubAlphaWorkProductsIterator++) {
                for (var emptyAlphasIterator = 0; emptyAlphasIterator < this.state.alphasToBeMerged.length; emptyAlphasIterator++) {
                  if (this.state.alphasToBeMerged[emptyAlphasIterator].name === subAlphaWorkProducts[emptySubAlphaWorkProductsIterator].alphaName) {
                    for (var emptySubAlphasIterator = 0; emptySubAlphasIterator < this.state.alphasToBeMerged[emptyAlphasIterator].subAlphas.length; emptySubAlphasIterator++) {
                      var currentEmptySubAlphaName = this.state.alphasToBeMerged[emptyAlphasIterator].subAlphas[emptySubAlphasIterator].name;
                      var currentEmptySubAlphaExtensionElements = this.state.extensionElementsToBeMerged.slice().filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === this.state.alphasToBeMerged[emptyAlphasIterator].subAlphas[emptySubAlphasIterator].nameId);
                      var currentEmptySubAlphaExtensionName = currentEmptySubAlphaExtensionElements.slice().filter(extensionElement => extensionElement.targetAttribute === "name");

                      if (!this.isEmpty(currentEmptySubAlphaExtensionName[0])) {
                        currentEmptySubAlphaName = currentEmptySubAlphaExtensionName[0].value;
                      }

                      if (subAlphaWorkProducts[emptySubAlphaWorkProductsIterator].subAlphaName === currentEmptySubAlphaName) {
                        tempalphasToBeMerged[emptyAlphasIterator].subAlphas[emptySubAlphasIterator].workProducts = [];
                        break;
                      }
                    }
                    break;
                  }
                }
              }

              for (var subAlphaWorkProductsIterator = 0; subAlphaWorkProductsIterator < subAlphaWorkProducts.length; subAlphaWorkProductsIterator++) {
                for (var alphasIterator = 0; alphasIterator < this.state.alphasToBeMerged.length; alphasIterator++) {
                  var currentAlpha = tempalphasToBeMerged[alphasIterator];
                  for (var subAlphaIterator = 0; subAlphaIterator < tempalphasToBeMerged[alphasIterator].subAlphas.length; subAlphaIterator++) {
                    var currentSubAlphaName = tempalphasToBeMerged[alphasIterator].subAlphas[subAlphaIterator].name;
                    var currentSubAlphaExtensionElements = this.state.extensionElementsToBeMerged.slice().filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === tempalphasToBeMerged[alphasIterator].subAlphas[subAlphaIterator].nameId);
                    var currentSubAlphaExtensionName = currentSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                    if (!this.isEmpty(currentSubAlphaExtensionName[0])) {
                      currentSubAlphaName = currentSubAlphaExtensionName[0].value;
                    }

                    if (subAlphaWorkProducts[subAlphaWorkProductsIterator].alphaName === currentAlpha.name
                      && subAlphaWorkProducts[subAlphaWorkProductsIterator].subAlphaName === currentSubAlphaName) {
                      tempalphasToBeMerged[alphasIterator].subAlphas[subAlphaIterator].workProducts.push(subAlphaWorkProducts[subAlphaWorkProductsIterator].subAlphaWorkProduct);
                    }
                  }
                }

                let tempSubAlphaWorkProduct = this.state.TemporarySubAlphaWorkProduct.slice().filter((el, idx) => {
                    return el.subAlphaWorkProductName !== subAlphaWorkProducts[subAlphaWorkProductsIterator].subAlphaWorkProductName
                })

                this.setState({
                    TemporarySubAlphaWorkProduct: tempSubAlphaWorkProduct
                })


                // TemporarySubAlphaWorkProduct.find({ subAlphaWorkProductName: subAlphaWorkProducts[subAlphaWorkProductsIterator].subAlphaWorkProductName }).forEach(function (doc) {
                //   TemporarySubAlphaWorkProduct.remove({ _id: doc._id });
                // });
              }
              this.setState({
                alphasToBeMerged: tempalphasToBeMerged
              })
            }

            if (subAlphaStates !== null) {
              // Empty the states of each CONFLICTED sub-alpha
              let tempalphasToBeMerged = this.state.alphasToBeMerged.slice()
              for (var emptySubAlphaStateToBeInsertedIterator = 0; emptySubAlphaStateToBeInsertedIterator < subAlphaStates.length; emptySubAlphaStateToBeInsertedIterator++) {
                for (var emptyAlphaStateIterator = 0; emptyAlphaStateIterator < this.state.alphasToBeMerged.length; emptyAlphaStateIterator++) {
                  if (this.state.alphasToBeMerged[emptyAlphaStateIterator].name === subAlphaStates[emptySubAlphaStateToBeInsertedIterator].alphaName) {
                    if (this.state.alphasToBeMerged[emptyAlphaStateIterator].subAlphas.length) {
                        for (var emptySubAlphaStateIterator = 0; emptySubAlphaStateIterator < this.state.alphasToBeMerged[emptyAlphaStateIterator].subAlphas.length; emptySubAlphaStateIterator++) {
                          var currentEmptySubAlphaStateName
                          // var currentEmptySubAlphaStateName = this.state.alphasToBeMerged[emptyAlphaStateIterator].subAlphas[emptySubAlphaStateIterator].name;
                          var currentEmptySubAlphaExtensionElements = this.state.extensionElementsToBeMerged.slice().filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === this.state.alphasToBeMerged[emptyAlphaStateIterator].subAlphas[emptySubAlphaStateIterator].nameId);
                          var currentEmptySubAlphaExtensionName = currentEmptySubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                          if (!this.isEmpty(currentEmptySubAlphaExtensionName[0])) {
                            currentEmptySubAlphaStateName = currentEmptySubAlphaExtensionName[0].value;
                          }

                          if (subAlphaStates[emptySubAlphaStateToBeInsertedIterator].subAlphaName === currentEmptySubAlphaStateName) {
                            tempalphasToBeMerged[emptyAlphaStateIterator].subAlphas[emptySubAlphaStateIterator].states = [];
                            break;
                          }
                        }
                        break;
                    }
                    
                  }
                }
              }

              for (var subAlphaStateToBeInsertedIterator = 0; subAlphaStateToBeInsertedIterator < subAlphaStates.length; subAlphaStateToBeInsertedIterator++) {
                for (var alphaStateIterator = 0; alphaStateIterator < this.state.alphasToBeMerged.length; alphaStateIterator++) {
                  var currentStateAlpha = this.state.alphasToBeMerged[alphaStateIterator];
                  for (var subAlphaStateIterator = 0; subAlphaStateIterator < this.state.alphasToBeMerged[alphaStateIterator].subAlphas.length; subAlphaStateIterator++) {
                    var currentSubAlphaNameToBeInspected
                    if (this.state.alphasToBeMerged[emptyAlphaStateIterator].subAlphas[subAlphaStateIterator]) {
                        currentSubAlphaNameToBeInspected = this.state.alphasToBeMerged[alphaStateIterator].subAlphas[subAlphaStateIterator].name;    
                    }
                    
                    var currentSubAlphaStateExtensionElements = this.state.extensionElementsToBeMerged.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === this.state.alphasToBeMerged[alphaStateIterator].subAlphas[subAlphaStateIterator].nameId);
                    var currentSubAlphaStateExtensionName = currentSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                    if (!this.isEmpty(currentSubAlphaStateExtensionName[0])) {
                      currentSubAlphaNameToBeInspected = currentSubAlphaStateExtensionName[0].value;
                    }

                    if (subAlphaStates[subAlphaStateToBeInsertedIterator].alphaName === currentStateAlpha.name
                      && subAlphaStates[subAlphaStateToBeInsertedIterator].subAlphaName === currentSubAlphaNameToBeInspected) {
                      tempalphasToBeMerged[alphaStateIterator].subAlphas[subAlphaStateIterator].states.push(subAlphaStates[subAlphaStateToBeInsertedIterator].subAlphaState);
                    }
                  }
                }

                let tempSubAlphaState = this.state.TemporarySubAlphaState.slice().filter((el, idx) => {
                    return el.subAlphaStateName !== subAlphaStates[subAlphaStateToBeInsertedIterator].subAlphaStateName
                })

                this.setState({
                    TemporarySubAlphaState: tempSubAlphaState
                })

                // TemporarySubAlphaState.find({ subAlphaStateName: subAlphaStates[subAlphaStateToBeInsertedIterator].subAlphaStateName }).forEach(function (doc) {
                //   TemporarySubAlphaState.remove({ _id: doc._id });
                // })
              }
              this.setState({
                alphasToBeMerged: tempalphasToBeMerged
              })
            }

            if (conflictedEntryAlphas !== null) {
              for (var entryAlphasIterator = 0; entryAlphasIterator < conflictedEntryAlphas.length; entryAlphasIterator++) {
                let currentEntryAlphas = conflictedEntryAlphas[entryAlphasIterator];
                let tempactivitySpaceToBeMerged = this.state.activitySpacesToBeMerged.slice()
                for (var activitySpaceIterator = 0; activitySpaceIterator < this.state.activitySpacesToBeMerged.length; activitySpaceIterator++) {
                  if (this.state.activitySpacesToBeMerged[activitySpaceIterator].name === currentEntryAlphas.activitySpaceName) {
                    for (var activityIterator = 0; activityIterator < this.state.activitySpacesToBeMerged[activitySpaceIterator].activities.length; activityIterator++) {
                      if (this.state.activitySpacesToBeMerged[activitySpaceIterator].activities[activityIterator].name === currentEntryAlphas.activityName) {
                        let currentEntryAlphaString = currentEntryAlphas.entryCriterionAlphas.alpha_name_id;
                        if (currentEntryAlphas.entryCriterionAlphas.alpha_state_name_id !== '') {
                          currentEntryAlphaString = currentEntryAlphaString + "." + currentEntryAlphas.entryCriterionAlphas.alpha_state_name_id;
                        }
                        tempactivitySpaceToBeMerged[activitySpaceIterator].activities[activityIterator].entryCriterions.alphas.push(currentEntryAlphaString);
                      }
                    }
                  }
                }

                let tempEntryCriterionAlphas = this.state.TemporaryEntryCriterionAlphas.slice().filter((el, idx) => {
                    return el.alphaNameId !== currentEntryAlphas.alphaNameId
                })

                this.setState({
                    TemporaryEntryCriterionAlphas: tempEntryCriterionAlphas,
                    activitySpaceToBeMerged: tempactivitySpaceToBeMerged
                })
          
                // TemporaryEntryCriterionAlphas.find({ alphaNameId: currentEntryAlphas.alphaNameId }).forEach(function (doc) {
                //   TemporaryEntryCriterionAlphas.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedEntryWorkProducts !== null) {
              for (var entryWorkProductIterator = 0; entryWorkProductIterator < conflictedEntryWorkProducts.length; entryWorkProductIterator++) {
                let currentEntryWorkProduct = conflictedEntryWorkProducts[entryWorkProductIterator];
                let tempactivitySpaceToBeMerged = this.state.activitySpacesToBeMerged.slice()
                for (var activitySpaceIterator = 0; activitySpaceIterator < this.state.activitySpacesToBeMerged.length; activitySpaceIterator++) {
                  if (this.state.activitySpacesToBeMerged[activitySpaceIterator].name === currentEntryWorkProduct.activitySpaceName) {
                    for (var activityIterator = 0; activityIterator < this.state.activitySpacesToBeMerged[activitySpaceIterator].activities.length; activityIterator++) {
                      if (this.state.activitySpacesToBeMerged[activitySpaceIterator].activities[activityIterator].name === currentEntryWorkProduct.activityName) {
                        let currentEntryWorkProductString = currentEntryWorkProduct.entryCriterionWorkProducts.workProduct_name_id;
                        if (currentEntryWorkProduct.entryCriterionWorkProducts.workProduct_level_of_detail !== '') {
                          currentEntryWorkProductString = currentEntryWorkProductString + "." + currentEntryWorkProduct.entryCriterionWorkProducts.workProduct_level_of_detail
                        }
                        tempactivitySpaceToBeMerged[activitySpaceIterator].activities[activityIterator].entryCriterions.workProducts.push(currentEntryWorkProductString);
                      }
                    }
                  }
                }
          
                let tempEntryCriterionWorkProducts = this.state.TemporaryEntryCriterionWorkProducts.slice().filter((el, idx) => {
                    return el.workProductNameId !== currentEntryWorkProduct.workProductNameId
                })

                this.setState({
                    TemporaryEntryCriterionWorkProducts: tempEntryCriterionWorkProducts,
                    activitySpacesToBeMerged: tempactivitySpaceToBeMerged
                })

                // TemporaryEntryCriterionWorkProducts.find({ workProductNameId: currentEntryWorkProduct.workProductNameId }).forEach(function (doc) {
                //   TemporaryEntryCriterionWorkProducts.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedCompletionAlphas !== null) {
              for (var completionAlphasIterator = 0; completionAlphasIterator < conflictedCompletionAlphas.length; completionAlphasIterator++) {
                let tempactivitySpaceToBeMerged = this.state.activitySpacesToBeMerged.slice()
                let currentCompletionAlpha = conflictedCompletionAlphas[completionAlphasIterator];
                for (var activitySpaceIterator = 0; activitySpaceIterator < this.state.activitySpacesToBeMerged.length; activitySpaceIterator++) {
                  if (this.state.activitySpacesToBeMerged[activitySpaceIterator].name === currentCompletionAlpha.activitySpaceName) {
                    for (var activityIterator = 0; activityIterator < this.state.activitySpacesToBeMerged[activitySpaceIterator].activities.length; activityIterator++) {
                      if (this.state.activitySpacesToBeMerged[activitySpaceIterator].activities[activityIterator].name === currentCompletionAlpha.activityName) {
                        let currentCompletionAlphaString = currentCompletionAlpha.completionCriterionAlphas.alpha_name_id + "." + currentCompletionAlpha.completionCriterionAlphas.alpha_state_name_id;
                        tempactivitySpaceToBeMerged[activitySpaceIterator].activities[activityIterator].completionCriterions.alphas.push(currentCompletionAlphaString);
                      }
                    }
                  }
                }

                let tempCompletionCriterionAlphas = this.state.TemporaryCompletionCriterionAlphas.slice().filter((el, idx) => {
                    return el.alphaNameId !== currentCompletionAlpha.alphaNameId
                })

                this.setState({
                    TemporaryCompletionCriterionAlphas: tempCompletionCriterionAlphas,
                    activitySpacesToBeMerged: tempactivitySpaceToBeMerged
                })
          
                // TemporaryCompletionCriterionAlphas.find({ alphaNameId: currentCompletionAlpha.alphaNameId }).forEach(function (doc) {
                //   TemporaryCompletionCriterionAlphas.remove({ _id: doc._id });
                // });
              }
            }

            if (conflictedCompletionWorkProducts !== null) {
              for (var completionWorkProductIterator = 0; completionWorkProductIterator < conflictedCompletionWorkProducts.length; completionWorkProductIterator++) {
                let currentCompletionWorkProduct = conflictedCompletionWorkProducts[completionWorkProductIterator];
                let tempactivitySpaceToBeMerged = this.state.activitySpacesToBeMerged.slice()
                for (var activitySpaceIterator = 0; activitySpaceIterator < this.state.activitySpacesToBeMerged.length; activitySpaceIterator++) {
                  if (this.state.activitySpacesToBeMerged[activitySpaceIterator].name === currentCompletionWorkProduct.activitySpaceName) {
                    for (var activityIterator = 0; activityIterator < this.state.activitySpacesToBeMerged[activitySpaceIterator].activities.length; activityIterator++) {
                      if (this.state.activitySpacesToBeMerged[activitySpaceIterator].activities[activityIterator].name === currentCompletionWorkProduct.activityName) {
                        let currentCompletionWorkProductString = currentCompletionWorkProduct.completionCriterionWorkProducts.workProduct_name_id + "." + currentCompletionWorkProduct.completionCriterionWorkProducts.workProduct_level_of_detail;
                        tempactivitySpaceToBeMerged[activitySpaceIterator].activities[activityIterator].completionCriterions.workProducts.push(currentCompletionWorkProductString);
                      }
                    }
                  }
                }

                let tempCompletionCriterionWorkProducts = this.state.TemporaryCompletionCriterionWorkProducts.slice().filter((el, idx) => {
                    return el.workProductNameId !== currentCompletionWorkProduct.workProductNameId
                })

                this.setState({
                    TemporaryCompletionCriterionWorkProducts: tempCompletionCriterionWorkProducts,
                    activitySpacesToBeMerged: tempactivitySpaceToBeMerged
                })
          
                // TemporaryCompletionCriterionWorkProducts.find({ workProductNameId: currentCompletionWorkProduct.workProductNameId }).forEach(function (doc) {
                //   TemporaryCompletionCriterionWorkProducts.remove({ _id: doc._id });
                // });
              }
            }
            resolve()
        })
        promise1.then(() => {

            var promise2 = new Promise((resolve, reject) => {
                var activitySpaces = this.state.activitySpacesToBeMerged.slice()
                var competencies = this.state.competenciesToBeMerged.slice()
                var alphas = this.state.alphasToBeMerged.slice()
                var patterns = this.state.patternsToBeMerged.slice()
                var intentions = this.state.intentionsToBeMerged.slice()

                this.setState({
                    createdChunk: {
                        intention: intentions,     
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

    composeCompetencies(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var firstChunkCompetencies = firstChunk.competencies;
        var secondChunkCompetencies = secondChunk.competencies;

        var firstChunkExtensionElements = JSON.parse(JSON.stringify(firstChunk.extensionElements));
        var secondChunkExtensionElements = JSON.parse(JSON.stringify(secondChunk.extensionElements));

        var competenciesToBeMerged = [];
        var firstChunkCompetenciesTemp = JSON.parse(JSON.stringify(firstChunkCompetencies));
        var secondChunkCompetenciesTemp = JSON.parse(JSON.stringify(secondChunkCompetencies));

        // Apply the extension directly to each element that it corresponds
        for (var firstChunkExtensionElementsIterator = 0; firstChunkExtensionElementsIterator < firstChunkExtensionElements.length; firstChunkExtensionElementsIterator++) {
          let currentExtension = firstChunkExtensionElements[firstChunkExtensionElementsIterator];
          let isCurrentExtensionUsed = false
          if (currentExtension.type === "competency") {
            for (var competencyIterator = 0; competencyIterator < firstChunkCompetenciesTemp.length; competencyIterator++) {
              if (firstChunkCompetenciesTemp[competencyIterator].nameId === currentExtension.targetElement) {
                firstChunkCompetenciesTemp[competencyIterator][currentExtension.targetAttribute] = currentExtension.value;
                isCurrentExtensionUsed = true;
                break;
              }
            }
          }
        }

        for (var secondChunkExtensionElementsIterator = 0; secondChunkExtensionElementsIterator < secondChunkExtensionElements.length; secondChunkExtensionElementsIterator++) {
          let currentExtension = secondChunkExtensionElements[secondChunkExtensionElementsIterator];
          if (currentExtension.type === "competency") {
            for (var competencyIterator = 0; competencyIterator < secondChunkCompetenciesTemp.length; competencyIterator++) {
              if (secondChunkCompetenciesTemp[competencyIterator].nameId === currentExtension.targetElement) {
                secondChunkCompetenciesTemp[competencyIterator][currentExtension.targetAttribute] = currentExtension.value;
              }
            }
          }
        }

        // Isi pakai yang kedua dulu, karena nanti mau dihandle dibawah untuk masukin
        // kalau extensionnya ada, karena kalau kondisi normal tanpa extension, kalau
        // beda sebenernya udah dihandle dan udah masuk.
        for (var i = 0; i < secondChunkCompetenciesTemp.length; i++) {
          var firstCurrentCompetencies = secondChunkCompetenciesTemp[i];

          competenciesToBeMerged[i] = firstCurrentCompetencies;
        }

        // Kasus 1 kalau fine, harusnya dibawah ga berubah" lagi
        // this.state.competenciesToBeMerged = competenciesToBeMerged;
        // competenciesToBeMerged = secondChunkCompetenciesTemp

        // sampe akhir fungsi ini itu iterate first chunk competencies
        for (var i = 0; i < firstChunkCompetenciesTemp.length; i++) {
          var firstCurrentCompetency = firstChunkCompetenciesTemp[i];
          var isCurrentCompetencyConflict = false;
          var isCurrentExtensionCompetencyConflict = false;
          var firstCompetencyExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "competency" && extensionElement.targetElement === firstCurrentCompetency.nameId);
          var firstCompetencyName = firstCompetencyExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

          for (var j = 0; j < secondChunkCompetenciesTemp.length; j++) {
            var secondCurrentCompetency = secondChunkCompetenciesTemp[j];
            var secondCompetencyExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "competency" && extensionElement.targetElement === secondCurrentCompetency.nameId);
            var secondCompetencyName = secondCompetencyExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

            var isConflictResolved = false;

            if (!this.isEmpty(firstCompetencyName[0])) {
              if (!this.isEmpty(secondCompetencyName[0])) {
                if (firstCompetencyName[0].value === secondCompetencyName[0].value) {
                  isCurrentExtensionCompetencyConflict = true;
                }
              } else {
                if (firstCompetencyName[0].value === secondCurrentCompetency.name) {
                  isCurrentExtensionCompetencyConflict = true;
                }
              }
            } else {
              if (!this.isEmpty(secondCompetencyName[0])) {
                if (firstCurrentCompetency.name === secondCompetencyName[0].value) {
                  isCurrentExtensionCompetencyConflict = true;
                }
              } else {
                if (firstCurrentCompetency.name === secondCurrentCompetency.name) {
                  isCurrentExtensionCompetencyConflict = true;
                }
              }
            }

            // Competency sama, berarti harus ngecek level dan atribut pada sama atau enggak
            isCurrentCompetencyConflict = true // ini bikinan rinda. terus kode di bawah rinda yang komen
            // ini rinda jd bikinnya asumsinya kalo competencyy sama, level dan atributnya sama
            // if (isCurrentExtensionCompetencyConflict) {
            //  detailnya liat kodenya clement aja yah
            //   
            // }
          }
          // Kalau ga konflik, dan ini untuk kasus kalau extensionnya available, karena kalau emang
          // dari extensionnya ga available as in kondisi normal, udah di handle di atas.
          if (!isCurrentCompetencyConflict) {
            competenciesToBeMerged.push(firstCurrentCompetency);
          }
        }

        this.setState({
            competenciesToBeMerged: competenciesToBeMerged
        })
        console.log("composeCompetencies SELESAI")
        console.log("competenciesToBeMerged", competenciesToBeMerged)
    }

    composeAlphas(taskToBeComposed) {
        var firstChunk = taskToBeComposed[0];
        var secondChunk = taskToBeComposed[1];

        var conflictedTasks = [];
        var firstChunkAlphas = firstChunk.alphas;
        var secondChunkAlphas = secondChunk.alphas;

        var alphasToBeMerged = [];
        var firstChunkAlphasTemp = JSON.parse(JSON.stringify(firstChunkAlphas));
        var secondChunkAlphasTemp = JSON.parse(JSON.stringify(secondChunkAlphas));

        var firstChunkExtensionElements = JSON.parse(JSON.stringify(firstChunk.extensionElements));
        var secondChunkExtensionElements = JSON.parse(JSON.stringify(secondChunk.extensionElements));

        // Apply the extension directly to each element that it corresponds
        for (var firstChunkExtensionElementsIterator = 0; firstChunkExtensionElementsIterator < firstChunkExtensionElements.length; firstChunkExtensionElementsIterator++) {
          let currentExtension = firstChunkExtensionElements[firstChunkExtensionElementsIterator];
          if (currentExtension.type === "workProduct" || currentExtension.type === "subAlpha"
            || currentExtension.type === "subAlpha.workProduct" || currentExtension.type === "subAlpha.state") {
            for (var alphaIterator = 0; alphaIterator < firstChunkAlphasTemp.length; alphaIterator++) {
              let isCurrentExtensionFound = false;
              if (currentExtension.type === "workProduct") {
                for (var workProductIterator = 0; workProductIterator < firstChunkAlphasTemp[alphaIterator].workProducts.length; workProductIterator++) {
                  if (firstChunkAlphasTemp[alphaIterator].workProducts[workProductIterator].nameId === currentExtension.targetElement) {
                    firstChunkAlphasTemp[alphaIterator].workProducts[workProductIterator][currentExtension.targetAttribute] = currentExtension.value;
                    isCurrentExtensionFound = true;
                    break;
                  }
                }
              } else if (currentExtension.type === "subAlpha" || currentExtension.type === "subAlpha.workProduct" || currentExtension.type === "subAlpha.state") {
                for (var subAlphaIterator = 0; subAlphaIterator < firstChunkAlphasTemp[alphaIterator].subAlphas.length; subAlphaIterator++) {
                  if (currentExtension.type === "subAlpha" && firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].nameId === currentExtension.targetElement) {
                    if (currentExtension.targetAttribute === "name") {
                      let newNameId = JSON.parse(JSON.stringify(currentExtension.value));
                      firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].nameId = newNameId.replace(/\s/g,'')
                    }
                    firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator][currentExtension.targetAttribute] = currentExtension.value;
                    isCurrentExtensionFound = true;
                    break;
                  } else {
                    if (currentExtension.type === "subAlpha.workProduct") {
                      for (var subAlphaWorkProductIterator = 0; subAlphaWorkProductIterator < firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts.length; subAlphaWorkProductIterator++) {
                        if (firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts[subAlphaWorkProductIterator].nameId === currentExtension.targetElement) {
                          firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts[subAlphaWorkProductIterator][currentExtension.targetAttribute] = currentExtension.value;
                          isCurrentExtensionFound = true;
                          break;
                        }
                      }
                    } else {
                      for (var subAlphaStateIterator = 0; subAlphaStateIterator < firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states.length; subAlphaStateIterator++) {
                        if (firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator].nameId === currentExtension.targetElement) {
                          if (currentExtension.targetAttribute === "name") {
                            let newNameId = JSON.parse(JSON.stringify(currentExtension.value));
                            firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator].nameId = newNameId.replace(/\s/g,'')
                          }
                          firstChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator][currentExtension.targetAttribute] = currentExtension.value;
                          isCurrentExtensionFound = true;
                          break;
                        }
                      }
                    }
                  }
                  if (isCurrentExtensionFound) {
                    break;
                  }
                }
              }
              if (isCurrentExtensionFound) {
                break;
              }
            }
          }
        }

        for (var secondChunkExtensionElementsIterator = 0; secondChunkExtensionElementsIterator < secondChunkExtensionElements.length; secondChunkExtensionElementsIterator++) {
          let currentExtension = secondChunkExtensionElements[secondChunkExtensionElementsIterator];
          if (currentExtension.type === "workProduct" || currentExtension.type === "subAlpha"
            || currentExtension.type === "subAlpha.workProduct" || currentExtension.type === "subAlpha.state") {
            for (var alphaIterator = 0; alphaIterator < secondChunkAlphasTemp.length; alphaIterator++) {
              let isCurrentExtensionFound = false;
              if (currentExtension.type === "workProduct") {
                for (var workProductIterator = 0; workProductIterator < secondChunkAlphasTemp[alphaIterator].workProducts.length; workProductIterator++) {
                  if (secondChunkAlphasTemp[alphaIterator].workProducts[workProductIterator].nameId === currentExtension.targetElement) {
                    secondChunkAlphasTemp[alphaIterator].workProducts[workProductIterator][currentExtension.targetAttribute] = currentExtension.value;
                    isCurrentExtensionFound = true;
                    break;
                  }
                }
              } else if (currentExtension.type === "subAlpha" || currentExtension.type === "subAlpha.workProduct" || currentExtension.type === "subAlpha.state") {
                for (var subAlphaIterator = 0; subAlphaIterator < secondChunkAlphasTemp[alphaIterator].subAlphas.length; subAlphaIterator++) {
                  if (currentExtension.type === "subAlpha" && secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].nameId === currentExtension.targetElement) {
                    if (currentExtension.targetAttribute === "name") {
                      let newNameId = JSON.parse(JSON.stringify(currentExtension.value));
                      secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].nameId = newNameId.replace(/\s/g,'');
                    }
                    secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator][currentExtension.targetAttribute] = currentExtension.value;
                    isCurrentExtensionFound = true;
                    break;
                  } else {
                    if (currentExtension.type === "subAlpha.workProduct") {
                      for (var subAlphaWorkProductIterator = 0; subAlphaWorkProductIterator < secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts.length; subAlphaWorkProductIterator++) {
                        if (secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts[subAlphaWorkProductIterator].nameId === currentExtension.targetElement) {
                          secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].workProducts[subAlphaWorkProductIterator][currentExtension.targetAttribute] = currentExtension.value;
                          isCurrentExtensionFound = true;
                          break;
                        }
                      }
                    } else {
                      for (var subAlphaStateIterator = 0; subAlphaStateIterator < secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states.length; subAlphaStateIterator++) {
                        if (secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator].nameId === currentExtension.targetElement) {
                          if (currentExtension.targetAttribute === "name") {
                            let newNameId = JSON.parse(JSON.stringify(currentExtension.value));
                            secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator].nameId = newNameId.replace(/\s/g,'');
                          }
                          secondChunkAlphasTemp[alphaIterator].subAlphas[subAlphaIterator].states[subAlphaStateIterator][currentExtension.targetAttribute] = currentExtension.value;
                          isCurrentExtensionFound = true;
                          break;
                        }
                      }
                    }
                  }
                  if (isCurrentExtensionFound) {
                    break;
                  }
                }
              }
              if (isCurrentExtensionFound) {
                break;
              }
            }
          }
        }

        var firstChunkAlphasTempt = JSON.parse(JSON.stringify(firstChunkAlphasTemp));
        var secondChunkAlphasTempt = JSON.parse(JSON.stringify(secondChunkAlphasTemp));

        for (var i = 0; i < firstChunkAlphasTemp.length; i++) {
          var firstCurrentAlpha = firstChunkAlphasTemp[i];

          alphasToBeMerged[i] = firstCurrentAlpha;
        }

        var alphasToBeAdded = [];
        var alphasTemp = alphasToBeMerged.slice(0);
        for (var i = 0; i < secondChunkAlphasTemp.length; i++) {
          var firstCurrentAlpha = secondChunkAlphasTemp[i];
          var isContained = false;

          for (var j = 0; j < alphasTemp.length; j++) {
            var secondCurrentAlpha = alphasTemp[j];

            if (firstCurrentAlpha.name === secondCurrentAlpha.name) {
              // Asumsi state dari kernel ga mungkin di edit, jadi ga perlu dicek lagi
              alphasToBeMerged[j].workProducts = firstCurrentAlpha.workProducts;
              alphasToBeMerged[j].states = firstCurrentAlpha.states;
              alphasToBeMerged[j].subAlphas = firstCurrentAlpha.subAlphas;
              isContained = true;
              break;
            }
          }

          if (!isContained) {
            alphasToBeAdded.push(firstCurrentAlpha);
          }
        }

        for (var i = 0; i < alphasToBeAdded.length; i++) {
          var currentAlpha = alphasToBeAdded[i];
          alphasToBeMerged.push(currentAlpha);
        }

        //Kasus 1
        // this.state.alphasToBeMerged = alphasToBeMerged;
        for (var i = 0; i < firstChunkAlphasTempt.length; i++) {
          var firstCurrentAlpha = firstChunkAlphasTempt[i];

          for (var j = 0; j < secondChunkAlphasTempt.length; j++) {
            var secondCurrentAlpha = secondChunkAlphasTempt[j];

            // Alpha sama, berarti harus ngecek work product sama sub-alphanya pada sama atau enggak
            if (firstCurrentAlpha.name === secondCurrentAlpha.name) {

              // Cek Work Product
              for (var firstWorkProductIterator = 0; firstWorkProductIterator < firstCurrentAlpha.workProducts.length; firstWorkProductIterator++) {
                var currentFirstWorkProduct = firstCurrentAlpha.workProducts[firstWorkProductIterator];
                var isCurrentWorkProductConflict = false;
                var isCurrentExtensionWorkProductConflict = false;
                var firstWorkProductExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "workProduct" && extensionElement.targetElement === currentFirstWorkProduct.nameId);
                var firstWorkProductName = firstWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                for (var secondWorkProductIterator = 0; secondWorkProductIterator < secondCurrentAlpha.workProducts.length; secondWorkProductIterator++) {
                  var currentSecondWorkProduct = secondCurrentAlpha.workProducts[secondWorkProductIterator];
                  var secondWorkProductExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "workProduct" && extensionElement.targetElement === currentSecondWorkProduct.nameId);
                  var secondWorkProductName = secondWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                  var isConflictResolved = false;

                  if (!this.isEmpty(firstWorkProductName[0])) {
                    if (!this.isEmpty(secondWorkProductName[0])) {
                      if (firstWorkProductName[0].value === secondWorkProductName[0].value) {
                        isCurrentExtensionWorkProductConflict = true;
                      }
                    } else {
                      if (firstWorkProductName[0].value === currentSecondWorkProduct.name) {
                        isCurrentExtensionWorkProductConflict = true;
                      }
                    }
                  } else {
                    if (!this.isEmpty(secondWorkProductName[0])) {
                      if (currentFirstWorkProduct.name === secondWorkProductName[0].value) {
                        isCurrentExtensionWorkProductConflict = true;
                      }
                    } else {
                      if (currentFirstWorkProduct.name === currentSecondWorkProduct.name) {
                        isCurrentExtensionWorkProductConflict = true;
                      }
                    }
                  }

                  // Cek Sama atau tidak Work Productnya
                  if (isCurrentExtensionWorkProductConflict) {
                    // Harus pop dari activity yang ada di activitySpaceToBeMerged
                    if (!this.isEmpty(firstWorkProductName[0]) || !this.isEmpty(secondWorkProductName[0])) {
                      var nameToBeRemoved = "";
                      if (!this.isEmpty(firstWorkProductName[0])) {
                        nameToBeRemoved = firstWorkProductName[0].value;
                      } else {
                        nameToBeRemoved = secondWorkProductName[0].value;
                      }
                      for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                        if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                          for (var currentWorkProductIterator = 0; currentWorkProductIterator < alphasToBeMerged[currentAlphaIterator].workProducts.length; currentWorkProductIterator++) {
                            if (alphasToBeMerged[currentAlphaIterator].workProducts[currentWorkProductIterator].name == nameToBeRemoved) {
                              alphasToBeMerged[currentAlphaIterator].workProducts.splice(currentWorkProductIterator, 1);
                              break;
                            }
                          }
                          break;
                        }
                      }
                    } else {
                      for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                        if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                          for (var currentWorkProductIterator = 0; currentWorkProductIterator < alphasToBeMerged[currentAlphaIterator].workProducts.length; currentWorkProductIterator++) {
                            if (alphasToBeMerged[currentAlphaIterator].workProducts[currentWorkProductIterator].name == currentFirstWorkProduct.name) {
                              alphasToBeMerged[currentAlphaIterator].workProducts.splice(currentWorkProductIterator, 1);
                              break;
                            }
                          }
                          break;
                        }
                      }
                    }
                    isCurrentWorkProductConflict = true;

                    var conflictedAttributes = 0;
                    var isCompetenciesConflict = false;
                    for (var attribute in currentFirstWorkProduct) {
                      // Kasus 3 dengan threshold 1 belum nambahin kasus edge kalau dia kebetulan nemu bedanya di
                      // atribut" terakhir
                      if (conflictedAttributes > 0) {
                        // Resolve konfliknya harus dibikin khusus, ga bisa generik, trus tambahin parameter
                        // activity spacenya apa atau aspeknya apa buat dimasukin nantinya trus taruh ke statenya kapan

                        this.resolveConflictWorkProduct(currentFirstWorkProduct, currentSecondWorkProduct, firstCurrentAlpha.name, firstWorkProductExtensionElements, secondWorkProductExtensionElements);
                        isConflictResolved = true
                        console.log("resolve gan");
                        break;
                      }

                      // Tidak dimungkinkan untuk konflik, karena atributnya cuman satu, yaitu namanya sendiri.
                      // Jadi cuman mungkin untuk sama persis atau beda satu sama lain.
                      if (attribute === "levelOfDetails") {
                        continue;
                      }

                      var currentFirstExtensionAttribute = firstWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                      var currentSecondExtensionAttribute = secondWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                      if (attribute === "name") {
                        continue;
                      }
                      if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
                        if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
                          if (currentFirstExtensionAttribute[0].value !== currentSecondExtensionAttribute[0].value) {
                            conflictedAttributes += 1;
                          }
                        } else {
                          if (currentFirstExtensionAttribute[0].value !== currentSecondWorkProduct[attribute]) {
                            conflictedAttributes += 1;
                          }
                        }
                      } else {
                        if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
                          if (currentFirstWorkProduct[attribute] !== currentSecondExtensionAttribute[0].value) {
                            conflictedAttributes += 1;
                          }
                        } else {
                          if (JSON.stringify(currentFirstWorkProduct[attribute]) !== JSON.stringify(currentSecondWorkProduct[attribute])) {
                            conflictedAttributes += 1;
                          }
                        }
                      }
                    }
                    console.log(conflictedAttributes);
                    // Kasus 2
                    if (conflictedAttributes === 0) {
                      console.log("masuk sini ga gan");
                      var workProductToBeMerged = JSON.parse(JSON.stringify(currentFirstWorkProduct));
                      var firstWorkProductAttributes = Object.keys(workProductToBeMerged);

                      for (var secondWorkProductProperty in currentSecondWorkProduct) {
                        if (firstWorkProductAttributes.indexOf(secondWorkProductProperty) === -1) {
                          workProductToBeMerged[secondWorkProductProperty] = currentSecondWorkProduct[secondWorkProductProperty];
                        }
                      }

                      // Change value to extension values if possible
                      for (var firstWorkProductExtensionIterator = 0; firstWorkProductExtensionIterator < firstWorkProductExtensionElements.length; firstWorkProductExtensionIterator++) {
                        workProductToBeMerged[firstWorkProductExtensionElements[firstWorkProductExtensionIterator].targetAttribute] = firstWorkProductExtensionElements[firstWorkProductExtensionIterator].value;
                      }

                      for (var secondWorkProductExtensionIterator = 0; secondWorkProductExtensionIterator < secondWorkProductExtensionElements.length; secondWorkProductExtensionIterator++) {
                        workProductToBeMerged[secondWorkProductExtensionElements[secondWorkProductExtensionIterator].targetAttribute] = secondWorkProductExtensionElements[secondWorkProductExtensionIterator].value;
                      }

                      // Merge missing level_of_detail
                      if (workProductToBeMerged.levelOfDetails !== currentSecondWorkProduct.levelOfDetails) {
                        var missingLevelOfDetail = currentSecondWorkProduct.levelOfDetails.filter(levelOfDetail => workProductToBeMerged.levelOfDetails.indexOf(levelOfDetail) === -1);
                        workProductToBeMerged.levelOfDetails = workProductToBeMerged.levelOfDetails.concat(missingLevelOfDetail);
                      }

                      // Cari alpha buat masukin si work product baru
                      for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                        if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                          alphasToBeMerged[currentAlphaIterator].workProducts.push(workProductToBeMerged);
                          // Maybe ga perlu, karena sempat di assign diatas juga, will check
                          // this.state.alphasToBeMerged = alphasToBeMerged;
                          break;
                        }
                      }
                    } else {
                      if (!isConflictResolved) {
                        this.resolveConflictWorkProduct(currentFirstWorkProduct, currentSecondWorkProduct, firstCurrentAlpha.name, firstWorkProductExtensionElements, secondWorkProductExtensionElements);
                      }
                    }
                    break;
                  }
                }
                // Kalau belum ada workProduct ini untuk Alpha yang sudah ada, berarti masukin
                if (!isCurrentWorkProductConflict) {
                  for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                    if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                      alphasToBeMerged[currentAlphaIterator].workProducts.push(currentFirstWorkProduct);
                      break;
                    }
                  }
                }
              }
              // Cek kasus untuk State -- Dari kernel asumsi udah bener

              // Cek kasus untuk SubAlpha
              for (var firstSubAlphaIterator = 0; firstSubAlphaIterator < firstCurrentAlpha.subAlphas.length; firstSubAlphaIterator++) {
                var currentFirstSubAlpha = firstCurrentAlpha.subAlphas[firstSubAlphaIterator];
                var isCurrentSubAlphaConflict = false;
                var isCurrentExtensionSubAlphaConflict = false;
                var firstSubAlphaExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === currentFirstSubAlpha.nameId);
                var firstSubAlphaName = currentFirstSubAlpha.name;
                var firstSubAlphaExtensionName = firstSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
                var firstSubAlphaParentName = currentFirstSubAlpha.parent_name_id;
                var firstSubAlphaParentExtensionName = firstSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "parent_name_id");

                if (!this.isEmpty(firstSubAlphaExtensionName[0])) {
                  firstSubAlphaName = firstSubAlphaExtensionName[0].value;
                }

                if (!this.isEmpty(firstSubAlphaParentExtensionName[0])) {
                  firstSubAlphaParentName = firstSubAlphaParentExtensionName[0].value;
                }

                for (var secondSubAlphaIterator = 0; secondSubAlphaIterator < secondCurrentAlpha.subAlphas.length; secondSubAlphaIterator++) {
                  var currentSecondSubAlpha = secondCurrentAlpha.subAlphas[secondSubAlphaIterator];
                  var secondSubAlphaExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetElement === currentSecondSubAlpha.nameId);
                  var secondSubAlphaName = currentSecondSubAlpha.name;
                  var secondSubAlphaExtensionName = secondSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
                  var secondSubAlphaParentName = currentSecondSubAlpha.parent_name_id;
                  var secondSubAlphaParentExtensionName = secondSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "parent_name_id");

                  if (!this.isEmpty(secondSubAlphaExtensionName[0])) {
                    secondSubAlphaName = secondSubAlphaExtensionName[0].value;
                  }

                  if (!this.isEmpty(secondSubAlphaParentExtensionName[0])) {
                    secondSubAlphaParentName = secondSubAlphaParentExtensionName[0].value;
                  }

                  var isConflictResolved = false;
                  // Cek Sama atau tidak keduanya sebagai subAlpha
                  if (firstSubAlphaName === secondSubAlphaName &&
                    firstSubAlphaParentName === secondSubAlphaParentName) {
                    // Remove duplicated subAlpha from state
                    console.log(currentFirstSubAlpha);
                    console.log(currentSecondSubAlpha);
                    isCurrentSubAlphaConflict = true;
                    for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                      if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                        for (var currentSubAlphaIterator = 0; currentSubAlphaIterator < alphasToBeMerged[currentAlphaIterator].subAlphas.length; currentSubAlphaIterator++) {
                          // Edit previous firstSubAlphaName, because firstSubAlphaName might have extension value, while
                          // alphasToBeMerged does not. So change comparison with currentSecondSubAlpha.name, because by
                          // default it is filled with the currentSecondSubAlpha.
                          if (alphasToBeMerged[currentAlphaIterator].subAlphas[currentSubAlphaIterator].name == currentSecondSubAlpha.name) {
                            alphasToBeMerged[currentAlphaIterator].subAlphas.splice(currentSubAlphaIterator, 1);
                            break;
                          }
                        }
                        break;
                      }
                    }

                    var conflictedAttributes = 0;
                    var isCompetenciesConflict = false;
                    for (var attribute in currentFirstSubAlpha) {
                      // Kasus 3 dengan threshold 1 belum nambahin kasus edge kalau dia kebetulan nemu bedanya di
                      // atribut" terakhir
                      if (conflictedAttributes > 0 && !isConflictResolved) {
                        // Resolve konfliknya harus dibikin khusus, ga bisa generik, trus tambahin parameter
                        // activity spacenya apa atau aspeknya apa buat dimasukin nantinya trus taruh ke statenya kapan

                        // this.resolveConflict(currentFirstActivity, currentSecondActivity);
                        this.resolveConflictSubAlpha(currentFirstSubAlpha, currentSecondSubAlpha, firstCurrentAlpha.name, firstSubAlphaExtensionElements, secondSubAlphaExtensionElements);
                        isConflictResolved = true
                        console.log("resolve gan");
                      }

                      if (attribute === "name") {
                        continue;
                      }

                      if (attribute == "workProducts") {
                        var currentFirstSubAlphaWorkProductToBeInspected = JSON.parse(JSON.stringify(currentFirstSubAlpha));
                        var currentSecondSubAlphaWorkProductToBeInspected = JSON.parse(JSON.stringify(currentSecondSubAlpha));
                        // Populate temporarySubAlphaWorkProduct with second SubAlpha workProduct
                        for (var secondSubAlphaWorkProductIterator = 0; secondSubAlphaWorkProductIterator < currentSecondSubAlphaWorkProductToBeInspected.workProducts.length; secondSubAlphaWorkProductIterator++) {
                          var currentSecondSubAlphaWorkProduct = currentSecondSubAlphaWorkProductToBeInspected.workProducts[secondSubAlphaWorkProductIterator];
                          var secondSubAlphaWorkProductExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.workProduct" && extensionElement.type.targetElement === currentSecondSubAlphaWorkProduct.nameId);
                          var secondSubAlphaWorkProductNameToBeInserted = currentSecondSubAlphaWorkProduct.name;
                          var secondSubAlphaWorkProductExtensionNameToBeInserted = secondSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                          if (!this.isEmpty(secondSubAlphaWorkProductExtensionNameToBeInserted[0])) {
                            secondSubAlphaWorkProductNameToBeInserted = secondSubAlphaWorkProductExtensionNameToBeInserted[0].value;
                          }

                          let subAlphaWorkProducts = this.state.TemporarySubAlphaWorkProduct
                          subAlphaWorkProducts.push({
                            alphaName: firstCurrentAlpha.name,
                            subAlphaName: secondSubAlphaName,
                            subAlphaWorkProductName: secondSubAlphaWorkProductNameToBeInserted,
                            subAlphaWorkProduct: currentSecondSubAlphaWorkProduct
                          })

                          this.setState({
                            TemporarySubAlphaWorkProduct: subAlphaWorkProducts
                          })

                        }

                        for (var firstSubAlphaWorkProductIterator = 0; firstSubAlphaWorkProductIterator < currentFirstSubAlphaWorkProductToBeInspected.workProducts.length; firstSubAlphaWorkProductIterator++) {
                          var currentFirstSubAlphaWorkProduct = currentFirstSubAlphaWorkProductToBeInspected.workProducts[firstSubAlphaWorkProductIterator];
                          var isCurrentSubAlphaWorkProductConflict = false;
                          var firstSubAlphaWorkProductExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.workProduct" && extensionElement.targetElement === currentFirstSubAlphaWorkProduct.nameId);
                          var firstSubAlphaWorkProductName = currentFirstSubAlphaWorkProduct.name;
                          var firstSubAlphaWorkProductExtensionName = firstSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                          if (!this.isEmpty(firstSubAlphaWorkProductExtensionName[0])) {
                            firstSubAlphaWorkProductName = firstSubAlphaWorkProductExtensionName[0].value;
                          }

                          for (var secondSubAlphaWorkProductIterator = 0; secondSubAlphaWorkProductIterator < currentSecondSubAlphaWorkProductToBeInspected.workProducts.length; secondSubAlphaWorkProductIterator++) {
                            var currentSecondSubAlphaWorkProduct = currentSecondSubAlphaWorkProductToBeInspected.workProducts[secondSubAlphaWorkProductIterator];
                            var secondSubAlphaWorkProductExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.workProduct" && extensionElement.targetElement === currentSecondSubAlphaWorkProduct.nameId);
                            var secondSubAlphaWorkProductName = currentSecondSubAlphaWorkProduct.name;
                            var secondSubAlphaWorkProductExtensionName = secondSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                            if (!this.isEmpty(secondSubAlphaWorkProductExtensionName[0])) {
                              secondSubAlphaWorkProductName = secondSubAlphaWorkProductExtensionName[0].value;
                            }

                            var isSubAlphaWorkProductConflictResolved = false;

                            if (firstSubAlphaWorkProductName === secondSubAlphaWorkProductName) {
                              isCurrentSubAlphaWorkProductConflict = true;
                              // Delete yang ada di temporarySubAlphaWorkProduct dengan extensionName yang sama
                              let tempSubAlphaWorkProductRemoved = this.state.TemporarySubAlphaWorkProduct.slice().filter((el, idx) => {
                                return el.subAlphaWorkProductName !== firstSubAlphaWorkProductName
                              })

                              this.setState({
                                TemporarySubAlphaWorkProduct: tempSubAlphaWorkProductRemoved
                              })

                              // TemporarySubAlphaWorkProduct.find({ subAlphaWorkProductName: firstSubAlphaWorkProductName }).forEach(function (doc) {
                              //   TemporarySubAlphaWorkProduct.remove({ _id: doc._id });
                              // });

                              var conflictedSubAlphaWorkProductAttributes = 0;
                              for (var subAlphaWorkProductAttribute in currentFirstSubAlphaWorkProduct) {
                                // Kasus 3, threshold 1 (tidak termasuk name)
                                if (conflictedSubAlphaWorkProductAttributes > 0) {
                                  // Resolve conflict
                                  console.log("RESOLVE CONFLICT")
                                  // this.resolveConflictSubAlphaWorkProduct(currentFirstSubAlphaWorkProduct, currentSecondSubAlphaWorkProduct, firstCurrentAlpha.name, firstSubAlphaName, firstSubAlphaWorkProductExtensionElements, secondSubAlphaWorkProductExtensionElements);
                                  isSubAlphaWorkProductConflictResolved = true
                                  break;
                                }

                                if (subAlphaWorkProductAttribute === "name") {
                                  continue;
                                }

                                // Harusnya tidak konflik juga, karena hanya memiliki satu atribut namanya sendiri.
                                // Yang dimungkinkan hanya kalau beda sama sekali atau sama persis.
                                if (subAlphaWorkProductAttribute === "levelOfDetails") {
                                  continue;
                                }

                                var currentFirstSubAlphaWorkProductAttributeValue = currentFirstSubAlphaWorkProduct[subAlphaWorkProductAttribute];
                                var currentFirstExtensionAttributeValue = firstSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === subAlphaWorkProductAttribute);
                                var currentSecondSubAlphaWorkProductAttributeValue = currentSecondSubAlphaWorkProduct[subAlphaWorkProductAttribute];
                                var currentSecondExtensionAttributeValue = secondSubAlphaWorkProductExtensionElements.filter(extensionElement => extensionElement.targetAttribute === subAlphaWorkProductAttribute);

                                if (!this.isEmpty(currentFirstExtensionAttributeValue[0])) {
                                  currentFirstSubAlphaWorkProductAttributeValue = currentFirstExtensionAttributeValue[0].value;
                                }

                                if (!this.isEmpty(currentSecondExtensionAttributeValue[0])) {
                                  currentSecondSubAlphaWorkProductAttributeValue = currentSecondExtensionAttributeValue[0].value;
                                }

                                if (JSON.stringify(currentFirstSubAlphaWorkProductAttributeValue) !== JSON.stringify(currentSecondSubAlphaWorkProductAttributeValue)) {
                                  conflictedSubAlphaWorkProductAttributes += 1;
                                }
                              }
                              // Kasus 2
                              if (conflictedSubAlphaWorkProductAttributes === 0) {
                                var subAlphaWorkProductToBeMerged = JSON.parse(JSON.stringify(currentFirstSubAlphaWorkProduct));
                                var firstSubAlphaWorkProductAttributes = Object.keys(subAlphaWorkProductToBeMerged);

                                for (var secondSubAlphaWorkProductProperty in currentSecondSubAlphaWorkProduct) {
                                  // Kasus kalau atribut di kedua tidak ada di pertama
                                  if (firstSubAlphaWorkProductAttributes.indexOf(secondSubAlphaWorkProductProperty) === -1) {
                                    subAlphaWorkProductToBeMerged[secondSubAlphaWorkProductProperty] = currentSecondSubAlphaWorkProduct[secondSubAlphaWorkProductProperty];
                                  }
                                }

                                // Change value to extension if possible
                                for (var firstSubAlphaWorkProductExtensionIterator = 0; firstSubAlphaWorkProductExtensionIterator < firstSubAlphaWorkProductExtensionElements.length; firstSubAlphaWorkProductExtensionIterator++) {
                                  subAlphaWorkProductToBeMerged[firstSubAlphaWorkProductExtensionElements[firstSubAlphaWorkProductExtensionIterator].targetAttribute] = firstSubAlphaWorkProductExtensionElements[firstSubAlphaWorkProductExtensionIterator].value;
                                }

                                for (var secondSubAlphaWorkProductExtensionIterator = 0; secondSubAlphaWorkProductExtensionIterator < secondSubAlphaWorkProductExtensionElements.length; secondSubAlphaWorkProductExtensionIterator++) {
                                  subAlphaWorkProductToBeMerged[secondSubAlphaWorkProductExtensionElements[secondSubAlphaWorkProductExtensionIterator].targetAttribute] = secondSubAlphaWorkProductExtensionElements[secondSubAlphaWorkProductExtensionIterator].value;
                                }

                                // Merge level of detail
                                if (subAlphaWorkProductToBeMerged.levelOfDetails !== currentSecondSubAlphaWorkProduct.levelOfDetails) {
                                  var missingLevelOfDetail = currentSecondSubAlphaWorkProduct.levelOfDetails.slice().filter(levelOfDetail => subAlphaWorkProductToBeMerged.levelOfDetails.indexOf(levelOfDetail) === -1);
                                  subAlphaWorkProductToBeMerged.levelOfDetails = subAlphaWorkProductToBeMerged.levelOfDetails.concat(missingLevelOfDetail);
                                }
                                //  Masukin ke temporarySubAlphaWorkProduct

                                let tempSubAlphaWorkProduct = this.state.TemporarySubAlphaWorkProduct.slice()
                                tempSubAlphaWorkProduct.push({
                                    alphaName: firstCurrentAlpha.name,
                                    subAlphaName: firstSubAlphaName,
                                    subAlphaWorkProductName: subAlphaWorkProductToBeMerged.name,
                                    subAlphaWorkProduct: subAlphaWorkProductToBeMerged
                                })

                                this.setState({
                                    TemporarySubAlphaWorkProduct: tempSubAlphaWorkProduct
                                })

                              } else {
                                if (!isSubAlphaWorkProductConflictResolved) {
                                  // Resolve conflict
                                  console.log("RESOLVE CONFLICT")
                                  // this.resolveConflictSubAlphaWorkProduct(currentFirstSubAlphaWorkProduct, currentSecondSubAlphaWorkProduct, firstCurrentAlpha.name, firstSubAlphaName, firstSubAlphaWorkProductExtensionElements, secondSubAlphaWorkProductExtensionElements);
                                }
                              }
                              break;
                            }
                          }
                          // Kasus 1
                          if (!isCurrentSubAlphaWorkProductConflict) {
                            // Isi ke temporarySubAlphaWorkProduct dari work product pertama

                            let tempSubAlphaWorkProduct = this.state.TemporarySubAlphaWorkProduct.slice()
                            tempSubAlphaWorkProduct.push({
                                alphaName: firstCurrentAlpha.name,
                                subAlphaName: firstSubAlphaName,
                                subAlphaWorkProductName: firstSubAlphaWorkProductName,
                                subAlphaWorkProduct: currentFirstSubAlphaWorkProduct
                            })

                            this.setState({
                                TemporarySubAlphaWorkProduct: tempSubAlphaWorkProduct
                            })

                          }
                        }
                        continue;
                      }

                      if (attribute == "states") {
                        var firstSubAlphasStateToBeInspected = JSON.parse(JSON.stringify(currentFirstSubAlpha));
                        var secondSubAlphasStateToBeInspected = JSON.parse(JSON.stringify(currentSecondSubAlpha));
                        // Populate temporarySubAlphaState with second Sub-Alpha State and extensionName
                        for (var secondSubAlphaStateIterator = 0; secondSubAlphaStateIterator < secondSubAlphasStateToBeInspected.states.length; secondSubAlphaStateIterator++) {
                          var currentSecondSubAlphaState = secondSubAlphasStateToBeInspected.states[secondSubAlphaStateIterator];
                          var secondSubAlphaStateExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.state" && extensionElement.targetElement === currentSecondSubAlphaState.nameId);
                          var secondSubAlphaStateNameToBeInserted = currentSecondSubAlphaState.name;
                          var secondSubAlphaStateExtensionNameToBeInserted = secondSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                          if (!this.isEmpty(secondSubAlphaStateExtensionNameToBeInserted[0])) {
                            secondSubAlphaStateNameToBeInserted = secondSubAlphaStateExtensionNameToBeInserted[0].value;
                          }
                          // Isi ke temporarySubAlphaState

                          let tempSubAlphaState = this.state.TemporarySubAlphaState.slice()
                          tempSubAlphaState.push({
                            alphaName: firstCurrentAlpha.name,
                            subAlphaName: secondSubAlphaName,
                            subAlphaStateName: secondSubAlphaStateNameToBeInserted,
                            subAlphaState: currentSecondSubAlphaState
                          })

                          this.setState({
                            TemporarySubAlphaState: tempSubAlphaState
                          })
                        }

                        for (var firstSubAlphaStateIterator = 0; firstSubAlphaStateIterator < firstSubAlphasStateToBeInspected.states.length; firstSubAlphaStateIterator++) {
                          var currentFirstSubAlphaState = firstSubAlphasStateToBeInspected.states[firstSubAlphaStateIterator];
                          var isCurrentSubAlphaStateConflict = false;
                          var firstSubAlphaStateExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.state" && extensionElement.targetElement === currentFirstSubAlphaState.nameId);
                          var firstSubAlphaStateName = currentFirstSubAlphaState.name;
                          var firstSubAlphaStateExtensionName = firstSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                          if (!this.isEmpty(firstSubAlphaStateExtensionName[0])) {
                            firstSubAlphaStateName = firstSubAlphaStateExtensionName[0].value;
                          }

                          for (var secondSubAlphaStateIterator = 0; secondSubAlphaStateIterator < secondSubAlphasStateToBeInspected.states.length; secondSubAlphaStateIterator++) {
                            var currentSecondSubAlphaState = secondSubAlphasStateToBeInspected.states[secondSubAlphaStateIterator];
                            var secondSubAlphaStateExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha.state" && extensionElement.targetElement === currentSecondSubAlphaState.nameId);
                            var secondSubAlphaStateName = currentSecondSubAlphaState.name;
                            var secondSubAlphaStateExtensionName = secondSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                            if (!this.isEmpty(secondSubAlphaStateExtensionName[0])) {
                              secondSubAlphaStateName = secondSubAlphaStateExtensionName[0].value;
                            }

                            var isSubAlphaStateConflictResolved = false;

                            if (firstSubAlphaStateName === secondSubAlphaStateName) {
                              isCurrentSubAlphaStateConflict = true;
                              // Delete dari temporarySubAlphaState dengan extensionName yang sama

                              let tempSubAlphaState = this.state.TemporarySubAlphaState.slice().filter((el, idx) => {
                                return el.subAlphaStateName !== firstSubAlphaStateName
                              })

                              this.setState({
                                TemporarySubAlphaState: tempSubAlphaState
                              })

                              // TemporarySubAlphaState.find({ subAlphaStateName: firstSubAlphaStateName }).forEach(function (doc) {
                              //   TemporarySubAlphaState.remove({ _id: doc._id });
                              // });

                              var conflictedSubAlphaStateAttributes = 0;
                              for (var subAlphaStateAttribute in currentFirstSubAlphaState) {
                                // Kasus 3, threshold 1 (tidak termasuk name)
                                if (conflictedSubAlphaStateAttributes > 0) {
                                  // Resolve conflict
                                  console.log("RESOLVE CONFLICT")
                                  // this.resolveConflictSubAlphaState(currentFirstSubAlphaState, currentSecondSubAlphaState, firstCurrentAlpha.name, firstSubAlphaName, firstSubAlphaStateExtensionElements, secondSubAlphaStateExtensionElements);
                                  isSubAlphaStateConflictResolved = true;
                                  break;
                                }

                                if (subAlphaStateAttribute === "name") {
                                  continue;
                                }

                                if (subAlphaStateAttribute === "checklists") {
                                  continue;
                                }

                                var currentFirstSubAlphaStateAttributeValue = currentFirstSubAlphaState[subAlphaStateAttribute];
                                var currentFirstExtensionAttributeValue = firstSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === subAlphaStateAttribute);
                                var currentSecondSubAlphaStateAttributeValue = currentSecondSubAlphaState[subAlphaStateAttribute];
                                var currentSecondExtensionAttributeValue = secondSubAlphaStateExtensionElements.filter(extensionElement => extensionElement.targetAttribute === subAlphaStateAttribute);

                                if (!this.isEmpty(currentFirstExtensionAttributeValue[0])) {
                                  currentFirstSubAlphaStateAttributeValue = currentFirstExtensionAttributeValue[0].value;
                                }

                                if (!this.isEmpty(currentSecondExtensionAttributeValue[0])) {
                                  currentSecondSubAlphaStateAttributeValue = currentSecondExtensionAttributeValue[0].value;
                                }

                                if (JSON.stringify(currentFirstSubAlphaStateAttributeValue) !== JSON.stringify(currentSecondSubAlphaStateAttributeValue)) {
                                  conflictedSubAlphaStateAttributes += 1;
                                }
                              }
                              // Kasus 2
                              if (conflictedSubAlphaStateAttributes === 0) {
                                var subAlphaStateToBeMerged = JSON.parse(JSON.stringify(currentFirstSubAlphaState));
                                var firstSubAlphaStateAttributes = Object.keys(subAlphaStateToBeMerged);

                                for (var secondSubAlphaStateProperty in currentSecondSubAlphaState) {
                                  // Kasus kalau atribut di kedua tidak ada di pertama
                                  if (firstSubAlphaStateAttributes.indexOf(secondSubAlphaStateProperty) === -1) {
                                    subAlphaStateToBeMerged[secondSubAlphaStateProperty] = currentSecondSubAlphaState[secondSubAlphaStateProperty]
                                  }
                                }

                                // Change value ot extension if possible
                                for (var firstSubAlphaStateExtensionIterator = 0; firstSubAlphaStateExtensionIterator < firstSubAlphaStateExtensionElements.length; firstSubAlphaStateExtensionIterator++) {
                                  subAlphaStateToBeMerged[firstSubAlphaExtensionElements[firstSubAlphaStateExtensionIterator].targetAttribute] = firstSubAlphaStateExtensionElements[firstSubAlphaStateExtensionIterator].value;
                                }

                                for (var secondSubAlphaStateExtensionIterator = 0; secondSubAlphaStateExtensionIterator < secondSubAlphaStateExtensionElements.length; secondSubAlphaStateExtensionIterator++) {
                                  subAlphaStateToBeMerged[secondSubAlphaStateExtensionElements[secondSubAlphaStateExtensionIterator].targetAttribute] = secondSubAlphaStateExtensionElements[secondSubAlphaStateExtensionIterator];
                                }

                                // Merge checklist
                                if (subAlphaStateToBeMerged.checklists !== currentSecondSubAlphaState.checklists) {
                                  var missingChecklist = currentSecondSubAlphaState.checklists.slice().filter(checklist => subAlphaStateToBeMerged.checklists.indexOf(checklist) === -1);
                                  subAlphaStateToBeMerged.checklists = subAlphaStateToBeMerged.checklist.concat(missingChecklist);
                                }

                                // Masukin ke temporarySubAlphaState

                                let tempSubAlphaState = this.state.TemporarySubAlphaState.slice()
                                tempSubAlphaState.push({
                                    alphaName: firstCurrentAlpha.name,
                                    subAlphaName: firstSubAlphaName,
                                    subAlphaStateName: subAlphaStateToBeMerged.name,
                                    subAlphaState: subAlphaStateToBeMerged
                                })

                                this.setState({
                                    TemporarySubAlphaState: tempSubAlphaState
                                })

                              } else {
                                if (!isSubAlphaStateConflictResolved) {
                                  // Resolve conflict
                                  console.log("RESOLVE CONFLICT")
                                  // this.resolveConflictSubAlphaState(currentFirstSubAlphaState,
                                  //   currentSecondSubAlphaState,
                                  //   firstCurrentAlpha.name,
                                  //   firstSubAlphaName,
                                  //   firstSubAlphaStateExtensionElements,
                                  //   secondSubAlphaStateExtensionElements)
                                }
                              }
                              break;
                            }
                          }
                          // Kasus 1
                          if (!isCurrentSubAlphaStateConflict) {
                            // Isi ke temporarySubAlphaState dari state pertama

                            let tempSubAlphaState = this.state.TemporarySubAlphaState.slice()
                            tempSubAlphaState.push({
                                alphaName: firstCurrentAlpha.name,
                                subAlphaName: firstSubAlphaName,
                                subAlphaStateName: firstSubAlphaStateName,
                                subAlphaState: currentFirstSubAlphaState
                            })

                            this.setState({
                                TemporarySubAlphaState: tempSubAlphaState
                            })

                          }
                        }
                        continue;
                      }

                      var currentFirstSubAlphaAttributeValue = currentFirstSubAlpha[attribute];
                      var currentFirstExtensionAttributeValue = firstSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                      var currentSecondSubAlphaAttributeValue = currentSecondSubAlpha[attribute];
                      var currentSecondExtensionAttributeValue = secondSubAlphaExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);

                      if (!this.isEmpty(currentFirstExtensionAttributeValue[0])) {
                        currentFirstSubAlphaAttributeValue = currentFirstExtensionAttributeValue[0].value;
                      }

                      if (!this.isEmpty(currentSecondExtensionAttributeValue[0])) {
                        currentSecondSubAlphaAttributeValue = currentSecondExtensionAttributeValue[0].value;
                      }

                      if (JSON.stringify(currentFirstSubAlphaAttributeValue) !== JSON.stringify(currentSecondSubAlphaAttributeValue)) {
                        conflictedAttributes += 1;
                      }
                    }
                    console.log(conflictedAttributes);
                    // Kasus 2
                    if (conflictedAttributes === 0) {
                      var subAlphaToBeMerged = currentFirstSubAlpha;
                      var firstSubAlphaAttributes = Object.keys(subAlphaToBeMerged);

                      for (var secondSubAlphaProperty in currentSecondSubAlpha) {
                        if (firstSubAlphaAttributes.indexOf(secondSubAlphaProperty) === -1) {
                          subAlphaToBeMerged[secondSubAlphaProperty] = currentSecondSubAlpha[secondSubAlphaProperty];
                        }
                      }

                      // Change value to extension values if possible
                      for (var firstSubAlphaExtensionIterator = 0; firstSubAlphaExtensionIterator < firstSubAlphaExtensionElements.length; firstSubAlphaExtensionIterator++) {
                        subAlphaToBeMerged[firstSubAlphaExtensionElements[firstSubAlphaExtensionIterator].targetAttribute] = firstSubAlphaExtensionElements[firstSubAlphaExtensionIterator].value;
                      }

                      for (var secondSubAlphaExtensionIterator = 0; secondSubAlphaExtensionIterator < secondSubAlphaExtensionElements.length; secondSubAlphaExtensionIterator++) {
                        subAlphaToBeMerged[secondSubAlphaExtensionElements[secondSubAlphaExtensionIterator].targetAttribute] = secondSubAlphaExtensionElements[secondSubAlphaExtensionIterator].value;
                      }

                      // Cari alpha buat masukin si sub alpha baru
                      for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                        if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                          alphasToBeMerged[currentAlphaIterator].subAlphas.push(subAlphaToBeMerged);
                          // Maybe ga perlu, karena sempat di assign diatas juga, will check
                          // this.state.alphasToBeMerged = alphasToBeMerged;
                          break;
                        }
                      }
                    } else {
                      if (!isConflictResolved) {
                        console.log("RESOLVE CONFLICT")
                        // this.resolveConflictSubAlpha(currentFirstSubAlpha, currentSecondSubAlpha, firstCurrentAlpha.name, firstSubAlphaExtensionElements, secondSubAlphaExtensionElements);
                      }
                    }
                    break;
                  }
                }
                // Kasus subAlpha ga tabrakan, tapi ada di alpha yang sama,
                // tinggal tambahin yang pertama, karena yang kedua udah di assign di 
                // alphasToBeMerged sebelumnya.
                if (!isCurrentSubAlphaConflict) {
                  for (var currentAlphaIterator = 0; currentAlphaIterator < alphasToBeMerged.length; currentAlphaIterator++) {
                    if (alphasToBeMerged[currentAlphaIterator].name === firstCurrentAlpha.name) {
                      // not sure if needed
                      // var subAlphaToBeAdded = JSON.parse(JSON.stringify(firstCurrentAlpha.subAlphas[firstSubAlphaIterator]));
                      alphasToBeMerged[currentAlphaIterator].subAlphas.push(currentFirstSubAlpha);
                    }
                  }
                }
              }
            }
          }
        }

        this.setState({
            alphasToBeMerged: alphasToBeMerged
        })

        console.log("composeAlphas SELESAI KAK")
        console.log("alphasToBeMerged", alphasToBeMerged)
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

        var firstChunkExtensionElements = JSON.parse(JSON.stringify(firstChunk.extensionElements));
        var secondChunkExtensionElements = JSON.parse(JSON.stringify(secondChunk.extensionElements));

        var patternsToBeMerged = [];
        var firstChunkPatternsTemp = JSON.parse(JSON.stringify(firstChunkPatterns));
        var secondChunkPatternsTemp = JSON.parse(JSON.stringify(secondChunkPatterns));

        // Apply the extension directly to each element that it corresponds
        for (var firstChunkExtensionElementsIterator = 0; firstChunkExtensionElementsIterator < firstChunkExtensionElements.length; firstChunkExtensionElementsIterator++) {
          let currentExtension = firstChunkExtensionElements[firstChunkExtensionElementsIterator];
          if (currentExtension.type === "patterns" || currentExtension.type === "patterns.pattern") {
            for (var patternsIterator = 0; patternsIterator < firstChunkPatternsTemp.length; patternsIterator++) {
              let isCurrentPatternExtensionFound = false;
              if (currentExtension.type === "patterns" && firstChunkPatternsTemp[patternsIterator].nameId === currentExtension.targetElement) {
                firstChunkPatternsTemp[patternsIterator][currentExtension.targetAttribute] = currentExtension.value;
                break;
              }
              for (var patternIterator = 0; patternIterator < firstChunkPatternsTemp[patternsIterator].pattern.length; patternIterator++) {
                if (currentExtension.type === "patterns.pattern" && firstChunkPatternsTemp[patternsIterator].pattern[patternIterator].nameId === currentExtension.targetElement) {
                  firstChunkPatternsTemp[patternsIterator].pattern[patternIterator][currentExtension.targetAttribute] = currentExtension.value;
                  isCurrentPatternExtensionFound = true;
                  break;
                }
              }
              if (isCurrentPatternExtensionFound) {
                break;
              }
            }
          }
        }

        let firstChunkActivityExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "activity" && extensionElement.targetAttribute === "name");
        let firstChunkSubAlphaExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetAttribute === "name");

        // Replace patterns name_id if possible 
        for (var replaceFirstPatternsIterator = 0; replaceFirstPatternsIterator < firstChunkPatternsTemp.length; replaceFirstPatternsIterator++) {
          let newPatternsNameId = JSON.parse(JSON.stringify(firstChunkPatternsTemp[replaceFirstPatternsIterator].name));
          firstChunkPatternsTemp[replaceFirstPatternsIterator].nameId = newPatternsNameId.replace(/\s/g,'');
          for (var replaceFirstPatternIterator = 0; replaceFirstPatternIterator < firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern.length; replaceFirstPatternIterator++) {
            let newPatternNameId = JSON.parse(JSON.stringify(firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].name));
            firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].nameId = newPatternNameId.replace(/\s/g,'');

            for (var activityExtensionIterator = 0; activityExtensionIterator < firstChunkActivityExtensionElements.length; activityExtensionIterator++) {
              for (var activityIterator = 0; activityIterator < firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].activities.length; activityIterator++) {
                if (firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].activities[activityIterator] === firstChunkActivityExtensionElements[activityExtensionIterator].targetElement) {
                  firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].activities[activityIterator] = firstChunkActivityExtensionElements[activityExtensionIterator].value.replace(/\s/g,'');
                }
              }
            }

            for (var subAlphaExtensionIterator = 0; subAlphaExtensionIterator < firstChunkSubAlphaExtensionElements.length; subAlphaExtensionIterator++) {
              for (var alphaIterator = 0; alphaIterator < firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].alphas.length; alphaIterator++) {
                if (firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].alphas[alphaIterator] === firstChunkSubAlphaExtensionElements[subAlphaExtensionIterator].targetElement) {
                  firstChunkPatternsTemp[replaceFirstPatternsIterator].pattern[replaceFirstPatternIterator].alphas[alphaIterator] = firstChunkSubAlphaExtensionElements[subAlphaExtensionIterator].value.replace(/\s/g,'');
                }
              }
            }
          }
        }

        for (var secondChunkExtensionElementsIterator = 0; secondChunkExtensionElementsIterator < secondChunkExtensionElements.length; secondChunkExtensionElementsIterator++) {
          let currentExtension = secondChunkExtensionElements[secondChunkExtensionElementsIterator];
          if (currentExtension.type === "patterns" || currentExtension.type === "patterns.pattern") {
            for (var patternsIterator = 0; patternsIterator < secondChunkPatternsTemp.length; patternsIterator++) {
              let isCurrentPatternExtensionFound = false;
              if (currentExtension.type === "patterns" && secondChunkPatternsTemp[patternsIterator].nameId === currentExtension.targetElement) {
                secondChunkPatternsTemp[patternsIterator][currentExtension.targetAttribute] = currentExtension.value;
                break;
              }
              for (var patternIterator = 0; patternIterator < secondChunkPatternsTemp[patternsIterator].pattern.length; patternIterator++) {
                if (currentExtension.type === "patterns.pattern" && secondChunkPatternsTemp[patternsIterator].pattern[patternIterator].nameId === currentExtension.targetElement) {
                  secondChunkPatternsTemp[patternsIterator].pattern[patternIterator][currentExtension.targetAttribute] = currentExtension.value;
                  isCurrentPatternExtensionFound = true;
                  break;
                }
              }
              if (isCurrentPatternExtensionFound) {
                break;
              }
            }
          }
        }

        let secondChunkActivityExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "activity" && extensionElement.targetAttribute === "name");
        let secondChunkSubAlphaExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "subAlpha" && extensionElement.targetAttribute === "name");

        // Replace patterns name_id if possible 
        for (var replaceSecondPatternsIterator = 0; replaceSecondPatternsIterator < secondChunkPatternsTemp.length; replaceSecondPatternsIterator++) {
          let newPatternsNameId = JSON.parse(JSON.stringify(secondChunkPatternsTemp[replaceSecondPatternsIterator].name));
          secondChunkPatternsTemp[replaceSecondPatternsIterator].nameId = newPatternsNameId.replace(/\s/g,'');
          for (var replaceSecondPatternIterator = 0; replaceSecondPatternIterator < secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern.length; replaceSecondPatternIterator++) {
            let newPatternNameId = JSON.parse(JSON.stringify(secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].name));
            secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].nameId = newPatternNameId.replace(/\s/g,'');

            for (var secondActivityExtensionIterator = 0; secondActivityExtensionIterator < secondChunkActivityExtensionElements.length; secondActivityExtensionIterator++) {
              for (var secondActivityIterator = 0; secondActivityIterator < secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].activities.length; secondActivityIterator++) {
                if (secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].activities[secondActivityIterator] === secondChunkActivityExtensionElements[secondActivityExtensionIterator].targetElement) {
                  secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].activities[secondActivityIterator] = secondChunkActivityExtensionElements[secondActivityExtensionIterator].value.replace(/\s/g,'');
                }
              }
            }

            for (var secondSubAlphaExtensionIterator = 0; secondSubAlphaExtensionIterator < secondChunkSubAlphaExtensionElements.length; secondSubAlphaExtensionIterator++) {
              for (var secondSubAlphaIterator = 0; secondSubAlphaIterator < secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].alphas.length; secondSubAlphaIterator++) {
                if (secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].alphas[secondSubAlphaIterator] === secondChunkSubAlphaExtensionElements[secondSubAlphaExtensionIterator].targetElement) {
                  secondChunkPatternsTemp[replaceSecondPatternsIterator].pattern[replaceSecondPatternIterator].alphas[secondSubAlphaIterator] = secondChunkSubAlphaExtensionElements[secondSubAlphaExtensionIterator].value.replace(/\s/g,'');
                }
              }
            }
          }
        }

        for (var i = 0; i < secondChunkPatternsTemp.length; i++) {
          var firstCurrentPattern = secondChunkPatternsTemp[i];

          patternsToBeMerged[i] = firstCurrentPattern;
        }

        var patternsToBeAdded = [];
        var patternsTemp = patternsToBeMerged.slice(0);
        for (var i = 0; i < firstChunkPatternsTemp.length; i++) {
          var firstCurrentPattern = firstChunkPatternsTemp[i];
          var firstCurrentPatternsName = firstCurrentPattern.name;
          var firstCurrentPatternsExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "patterns" && extensionElement.targetElement === firstCurrentPattern.nameId);
          var firstCurrentPatternsExtensionName = firstCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");
          var isContained = false;

          if (!this.isEmpty(firstCurrentPatternsExtensionName[0])) {
            firstCurrentPatternsName = firstCurrentPatternsExtensionName[0].value;
          }

          for (var j = 0; j < patternsTemp.length; j++) {
            var secondCurrentPattern = patternsTemp[j];
            var secondCurrentPatternsName = secondCurrentPattern.name;
            var secondCurrentPatternsExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "patterns" && extensionElement.targetElement === secondCurrentPattern.nameId);
            var secondCurrentPatternsExtensionName = secondCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

            if (!this.isEmpty(secondCurrentPatternsExtensionName[0])) {
              secondCurrentPatternsName = secondCurrentPatternsExtensionName[0].value;
            }

            if (firstCurrentPatternsName === secondCurrentPatternsName) {
              isContained = true;
              break;
            }
          }

          if (!isContained) {
            patternsToBeAdded.push(firstCurrentPattern);
          }
        }

        for (var i = 0; i < patternsToBeAdded.length; i++) {
          var currentPattern = patternsToBeAdded[i];
          patternsToBeMerged.push(currentPattern);
        }

        // Kasus 1 kalau fine, harusnya dibawah ga berubah" lagi
        // this.state.patternsToBeMerged = patternsToBeMerged;

        for (var i = 0; i < firstChunkPatternsTemp.length; i++) {
          var firstCurrentPattern = firstChunkPatternsTemp[i];
          var isCurrentPatternsConflict = false;
          var firstCurrentPatternsName = firstCurrentPattern.name;
          var firstCurrentPatternsExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "patterns" && extensionElement.targetElement === firstCurrentPattern.nameId);
          var firstCurrentPatternsExtensionName = firstCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

          if (!this.isEmpty(firstCurrentPatternsExtensionName[0])) {
            firstCurrentPatternsName = firstCurrentPatternsExtensionName[0].value;
          }

          for (var j = 0; j < secondChunkPatternsTemp.length; j++) {
            var secondCurrentPattern = secondChunkPatternsTemp[j];
            var secondCurrentPatternsName = secondCurrentPattern.name;
            var secondCurrentPatternsExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "patterns" && extensionElement.targetElement === secondCurrentPattern.nameId);
            var secondCurrentPatternsExtensionName = secondCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

            if (!this.isEmpty(secondCurrentPatternsExtensionName[0])) {
              secondCurrentPatternsName = secondCurrentPatternsExtensionName[0].value;
            }

            var isConflictResolved = false;

            // Cek patterns nya sama atau tidak
            if (firstCurrentPatternsName === secondCurrentPatternsName) {
              isCurrentPatternsConflict = true;
              // Remove conflicted patterns from state
              for (var currentPatternsIterator = 0; currentPatternsIterator < patternsToBeMerged.length; currentPatternsIterator++) {
                if (patternsToBeMerged[currentPatternsIterator].name === secondCurrentPattern.name) {
                  patternsToBeMerged.splice(currentPatternsIterator, 1);
                  break;
                }
              }

              var firstPatternsToBeInspected = JSON.parse(JSON.stringify(firstCurrentPattern));
              var secondPatternsToBeInspected = JSON.parse(JSON.stringify(secondCurrentPattern));
              // Populate TemporaryPattern with second Pattern and extensionName
              for (var secondPatternIterator = 0; secondPatternIterator < secondPatternsToBeInspected.pattern.length; secondPatternIterator++) {
                    var currentSecondPattern = secondPatternsToBeInspected.pattern[secondPatternIterator];
                    var secondPatternExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "patterns.pattern" && extensionElement.targetElement === currentSecondPattern.nameId);
                    var secondPatternNameToBeInserted = currentSecondPattern.name;
                    var secondPatternExtensionNameToBeInserted = secondPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                    if (!this.isEmpty(secondPatternExtensionNameToBeInserted[0])) {
                      secondPatternNameToBeInserted = secondPatternExtensionNameToBeInserted[0].value;
                    }

                    // Isi ke TemporaryPattern
                    let tempPattern = this.state.TemporaryPattern.slice()
                    tempPattern.push({
                        patternsName: secondCurrentPatternsName,
                        patternName: secondPatternNameToBeInserted,
                        pattern: currentSecondPattern
                    })

                    this.setState({
                        TemporaryPattern: tempPattern
                    })

                    
                  }
                  for (var firstPatternIterator = 0; firstPatternIterator < firstPatternsToBeInspected.pattern.length; firstPatternIterator++) {
                    var currentFirstPattern = firstPatternsToBeInspected.pattern[firstPatternIterator];
                    var isCurrentPatternConflict = false;
                    var firstPatternName = currentFirstPattern.name;
                    var firstPatternExtensionElements = firstChunkExtensionElements.filter(extensionElement => extensionElement.type === "pattern" && extensionElement.targetElement === currentFirstPattern.nameId);
                    console.log(firstPatternExtensionElements);
                    var firstPatternExtensionName = firstPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                    if (!this.isEmpty(firstPatternExtensionName[0])) {
                      firstPatternName = firstPatternExtensionName[0].value;
                    }

                    for (var secondPatternIterator = 0; secondPatternIterator < secondCurrentPattern.pattern.length; secondPatternIterator++) {
                      var currentSecondPattern = secondCurrentPattern.pattern[secondPatternIterator];
                      var secondPatternName = currentSecondPattern.name;
                      var secondPatternExtensionElements = secondChunkExtensionElements.filter(extensionElement => extensionElement.type === "pattern" && extensionElement.targetElement === currentSecondPattern.nameId);
                      var secondPatternExtensionName = secondPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === "name");

                      if (!this.isEmpty(secondPatternExtensionName[0])) {
                        secondPatternName = secondPatternExtensionName[0].value;
                      }
                      var isConflictPatternResolved = false;

                      // Pattern sama, berarti harus ngecek atribut pada sama atau enggak
                      if (firstPatternName === secondPatternName) {
                        isCurrentPatternConflict = true;
                        // Remove dari TemporaryPattern dengan extensionName yang sama

                        let tempPatternsNew = this.state.TemporaryPattern.slice().filter((el, idx) => {
                            return el.patternName !== firstPatternName
                        })

                        this.setState({
                            TemporaryPattern: tempPatternsNew
                        })

                        // TemporaryPattern.find({ patternName: firstPatternName }).forEach(function (doc) {
                        //   TemporaryPattern.remove({ _id: doc._id });
                        // });

                        console.log("test nama sama");
                        var conflictedAttributes = 0;
                        for (var attribute in currentFirstPattern) {
                          console.log(attribute);
                          // Kasus 3 dengan threshold 1
                          if (conflictedAttributes > 0) {
                            // Resolve konfliknya harus dibikin khusus, ga bisa generik, trus tambahin parameter
                            // activity spacenya apa atau aspeknya apa buat dimasukin nantinya trus taruh ke statenya kapan
                            isConflictPatternResolved = true;
                            // this.resolveConflictPattern(currentFirstPattern, currentSecondPattern, firstCurrentPatternsName, firstPatternExtensionElements, secondPatternExtensionElements);
                            console.log("resolve gan");
                            break;
                          }

                          // Skip, by default it will be the same
                          if (attribute === "name") {
                            continue;
                          }

                          // Does not need to bother checking extensionElements, because it is not available
                          // to be extended, just skip, because it will not conflict
                          if (attribute === "alphas" || attribute === "activities" || attribute === "competencies") {
                            continue;
                          }

                          var currentFirstPatternAttributeValue = currentFirstPattern[attribute];
                          var currentFirstExtensionAttribute = firstPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                          var currentSecondPatternAttributeValue = currentSecondPattern[attribute];
                          var currentSecondExtensionAttribute = secondPatternExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);

                          if (!this.isEmpty(currentFirstExtensionAttribute[0])) {
                            currentFirstPatternAttributeValue = currentFirstExtensionAttribute[0].value;
                          }

                          if (!this.isEmpty(currentSecondExtensionAttribute[0])) {
                            currentSecondPatternAttributeValue = currentSecondExtensionAttribute[0].value;
                          }

                          if (JSON.stringify(currentFirstPatternAttributeValue) !== JSON.stringify(currentSecondPatternAttributeValue)) {
                            conflictedAttributes += 1;
                          }
                        }
                        console.log("Conflicted Attributes Count:", conflictedAttributes);
                        // Kasus 2
                        if (conflictedAttributes === 0) {
                          console.log("masuk sini ga gan");
                          var patternToBeMerged = currentFirstPattern;
                          var firstPatternAttributes = Object.keys(patternToBeMerged);

                          for (var secondPatternProperty in currentSecondPattern) {
                            // Kasus atribut kedua tidak ada di pertama
                            if (firstPatternAttributes.indexOf(secondPatternProperty) === -1) {
                              patternToBeMerged[secondPatternProperty] = currentSecondPattern[secondPatternProperty];
                            }
                          }

                          // Change value to extension values if possible
                          for (var firstPatternExtensionIterator = 0; firstPatternExtensionIterator < firstPatternExtensionElements.length; firstPatternExtensionIterator++) {
                            patternToBeMerged[firstPatternExtensionElements[firstPatternExtensionIterator].targetAttribute] = firstPatternExtensionElements[firstPatternExtensionIterator].value;
                          }

                          for (var secondPatternExtensionIterator = 0; secondPatternExtensionIterator < secondPatternExtensionElements.length; secondPatternExtensionIterator++) {
                            patternToBeMerged[secondPatternExtensionElements[secondPatternExtensionIterator].targetAttribute] = secondPatternExtensionElements[secondPatternExtensionIterator].value;
                          }

                          // Masukin competencies, alpha sama activity, karena ga mungkin konflik, dengan satu
                          // atribut doang, ga mungkin konflik, tapi bisa sama persis.
                          if (patternToBeMerged.alphas !== currentSecondPattern.alphas) {
                            var missingAlpha = currentSecondPattern.alphas.slice().filter(currentAlpha => patternToBeMerged.alphas.indexOf(currentAlpha) === -1);
                            patternToBeMerged.alphas = patternToBeMerged.alphas.concat(missingAlpha);
                          }

                          if (patternToBeMerged.activities !== currentSecondPattern.activities) {
                            var missingActivity = currentSecondPattern.activities.slice().filter(currentActivity => patternToBeMerged.activities.indexOf(currentActivity) === -1);
                            patternToBeMerged.activities = patternToBeMerged.activities.concat(missingActivity);
                          }

                          if (patternToBeMerged.competencies !== currentSecondPattern.competencies) {
                            var missingCompetency = currentSecondPattern.competencies.slice().filter(currentCompetency => patternToBeMerged.competencies.indexOf(currentCompetency) === -1);
                            patternToBeMerged.competencies = patternToBeMerged.competencies.concat(missingCompetency);
                          }

                          let tempPatterns = this.state.TemporaryPattern.slice()
                          tempPatterns.push({
                            patternsName: firstCurrentPatternsName,
                            patternName: patternToBeMerged.name,
                            pattern: patternToBeMerged
                          })
                          this.setState({
                            TemporaryPattern: tempPatterns
                          })
                        } else {
                          // Kondisi kalau dia misal atribut cuman 3, pas conflicted attributes = 2, keburu keluar
                          // dari loopingny jadi ga masuk ke break yang atas.
                          if (!isConflictPatternResolved) {
                            console.log("RESOLVE CONFLICT")
                            // this.resolveConflictPattern(currentFirstPattern, currentSecondPattern, firstCurrentPatternsName, firstPatternExtensionElements, secondPatternExtensionElements);
                          }
                        }
                        // to escape and reset the isCurrentExtensionConflict
                        break;
                      }
                    }
                    if (!isCurrentPatternConflict) {
                      // Isi ke TemporaryPattern dari yang pertama

                      let tempPatterns = this.state.TemporaryPattern.slice()
                      tempPatterns.push({
                        patternsName: firstCurrentPatternsName,
                        patternName: firstPatternName,
                        pattern: currentFirstPattern
                      })
                      this.setState({
                        TemporaryPattern: tempPatterns
                      })

                    }
                  }

              var patternsConflictedAttributes = 0;
              for (var attribute in firstCurrentPattern) {
                // Kasus 3 dengan threshold 1
                if (patternsConflictedAttributes > 0) {
                  // Resolve conflict
                  console.log("RESOLVE CONFLICT")
                  // this.resolveConflictPatterns(firstCurrentPattern, secondCurrentPattern, firstCurrentPatternsExtensionElements, secondCurrentPatternsExtensionElements);
                  isConflictResolved = true;
                  break;
                }
                // Skip, because by default it is the same
                if (attribute === "name") {
                  continue;
                }
                
                if (attribute === "pattern") {
                  continue;
                }

                var currentFirstPatternsAttributeValue = firstCurrentPattern[attribute];
                var currentFirstExtensionAttributeValue = firstCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);
                var currentSecondPatternsAttributeValue = secondCurrentPattern[attribute];
                var currentSecondExtensionAttributeValue = secondCurrentPatternsExtensionElements.filter(extensionElement => extensionElement.targetAttribute === attribute);

                if (!this.isEmpty(currentFirstExtensionAttributeValue[0])) {
                  currentFirstPatternsAttributeValue = currentFirstExtensionAttributeValue[0].value;
                }

                if (!this.isEmpty(currentSecondExtensionAttributeValue[0])) {
                  currentSecondPatternsAttributeValue = currentSecondExtensionAttributeValue[0].value;
                }

                if (JSON.stringify(currentFirstPatternsAttributeValue) !== JSON.stringify(currentSecondPatternsAttributeValue)) {
                  patternsConflictedAttributes += 1;
                }
              }
              // Kasus 2
              if (patternsConflictedAttributes === 0) {
                var patternsToBeInserted = JSON.parse(JSON.stringify(firstCurrentPattern));
                var firstPatternsAttributes = Object.keys(patternsToBeInserted);

                // Find missing attribute if there is any
                for (var secondPatternsProperty in secondCurrentPattern) {
                  if (firstPatternsAttributes.indexOf(secondPatternsProperty) === -1) {
                    patternsToBeInserted[secondPatternsProperty] = secondCurrentPattern[secondPatternsProperty];
                  }
                }

                // Change value to extension values if possible
                for (var firstPatternsExtensionIterator = 0; firstPatternsExtensionIterator < firstCurrentPatternsExtensionElements.length; firstPatternsExtensionIterator++) {
                  patternsToBeInserted[firstCurrentPatternsExtensionElements[firstPatternsExtensionIterator].targetAttribute] = firstCurrentPatternsExtensionElements[firstPatternsExtensionIterator].value;
                }

                for (var secondPatternsExtensionIterator = 0; secondPatternsExtensionIterator < secondCurrentPatternsExtensionElements.length; secondPatternsExtensionIterator++) {
                  patternsToBeInserted[secondCurrentPatternsExtensionElements[secondPatternsExtensionIterator].targetAttribute] = secondCurrentPatternsExtensionElements[secondPatternsExtensionIterator].value;
                }

                // Insert new Patterns (already removed before)
                patternsToBeInserted.pattern = [];
                patternsToBeMerged.push(patternsToBeInserted);

              } else {
                if (!isConflictResolved) {
                  // Resolve conflict edge case - ketemu beda di atribut ujung"
                  console.log("RESOLVE CONFLICT")
                  // this.resolveConflictPatterns(firstCurrentPattern, secondCurrentPattern, firstCurrentPatternsExtensionElements, secondCurrentPatternsExtensionElements);
                }
              }
              break;
            }
          }
          // Kasus patternsnya ga tabrakan
          if (!isCurrentPatternsConflict) {
            console.log("testing kasus 1 untuk PATTERNS, harusnya kalau masuk ga perlu nambahin lagi karena sudah di handle");
          }
        }

        this.setState({
            patternsToBeMerged: patternsToBeMerged
        })

        console.log("composePatterns SELESAI KAK")
        console.log("patternsToBeMerged", patternsToBeMerged)
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
        return newIntentions
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