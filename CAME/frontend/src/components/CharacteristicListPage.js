import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Row, Card, Form, Spinner, Table, ToggleButton, ToggleButtonGroup, Button } from "react-bootstrap";

import { characteristicActions, dimensionActions } from '../_actions'

class CharacteristicListPage extends React.Component {

	constructor(props) {
        super(props);
        this.props.getAllChars()
        this.props.getAllDims()

    }

    groupCharsByDims(dims, chars) {

        let arr = []
        let arrdim = []
        for (let dim of dims) {
            arr.push({"dimension": dim, "characteristics": []})
            arrdim.push(dim.id)
        }
        arr.push({"dimension": {"id": "others", "name": "Others"}, "characteristics": []})

        for (let char of chars) {
            let idx = arrdim.indexOf(char.dimension)
            if (idx !== -1) {
                arr[idx].characteristics.push(char)
            } else {
                arr[arrdim.length].characteristics.push(char)
            }
        }

        return arr
    }

    

	render() {
        let characteristics = this.props.characteristics
        let charsByDim

        if (this.props.characteristics && this.props.dimensions) {
            charsByDim = this.groupCharsByDims(this.props.dimensions, this.props.characteristics)

        }

        return (
            <div>
                <h1>List Characteristics Page</h1>
                <br />
                { charsByDim ?
                    charsByDim.map((el, idx) => (
                        <div>
                            <h3>Dimension: {el.dimension.name}</h3>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Values</th>
                                        <th>ref</th>
                                        <th>isQuantifiable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        el.characteristics.map((char, id) => (
                                            <tr key={id}>
                                                <td>
                                                    {char.id}
                                                </td>
                                                <td>
                                                    {char.name}
                                                </td>
                                                
                                                <td>
                                                    {
                                                        char.characteristicValues.map((val, i) => (
                                                            <div>
                                                                {JSON.stringify(val.values).replace(/"/g, "")}
                                                            </div>
                                                        ))
                                                    }
                                                    
                                                </td>
                                                <td>
                                                    {
                                                        char.characteristicValues.map((val, i) => (
                                                            <div>
                                                                {val.ref}
                                                            </div>
                                                            
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        char.characteristicValues.map((val, i) => (
                                                            
                                                            <div>
                                                                {val.isQuantifiable ? "true": "false"}
                                                            </div>
                                                        ))
                                                    }
                                                </td>
                                                
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <br/>
                        </div>
                    ))
                    


                : null}
            </div>
        );
	}
}

const mapStateToProps = state => { 
    return ({
        characteristics: state.characteristics.items,
        dimensions: state.dimensions.items
    })
};

const mapDispatchToProps = {
  getAllChars: characteristicActions.getAll,
  getAllDims: dimensionActions.getAll
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacteristicListPage);