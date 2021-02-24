import React from 'react';
import { Container, Button, Row, CardDeck, Card, Col, Jumbotron, Table, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { configActions, tenantSettingsActions } from '../_actions'


class AdminPage extends React.Component {

    constructor(props) {
        super(props)

        this.props.getAllTenant()
        this.props.getAllTenantSettings()

        this.setType = this.setType.bind(this)
    }

    setType(tenant, selected) {

        this.props.setTenantType(tenant.tenantId, selected.target.value)
        this.props.getAllTenant()

    }

    getAllTenantTypes() {
        let tenantSettings = this.props.tenantSettings.slice()

        let arr_types = tenantSettings.map(el => el.type)
        return arr_types
    }

	render() {

        let tenants = this.props.configs
        let tenantSettings = this.props.tenantSettings

		return (
                <div>
                    <Jumbotron>
                        <Row className="row">
                            <h1>Dashboard</h1>
                        </Row>
                        <Row className="row">
                            <h3>Hi <span>{this.props.user.username}!</span></h3>
                        </Row>
                    </Jumbotron>
                    <h3>Set Tenant Type</h3>
                    { tenants && tenantSettings ? 
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Tenant name</th>
                                    <th>Type</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tenants.map((tenant, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                {tenant.name}
                                            </td>
                                            <td>
                                                {tenant.type}
                                            </td>
                                            <td>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Set type</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        value={tenant.type} 
                                                        onChange={(selected) => this.setType(tenant, selected)}
                                                    >
                                                        {
                                                            this.getAllTenantTypes().map((type, id) => (
                                                                <option>{type}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    : null}
                </div>
                

		)
	}
}

const mapStateToProps = state => {
    return ({
        user: state.authentication.user,
        configs: state.configs.items,
        tenantSettings: state.tenantSettings.items
    })
};

const mapDispatchToProps = {
    setTenantType: configActions.setType,
    getAllTenant: configActions.getAll,
    getAllTenantSettings: tenantSettingsActions.getAll,
    getTenantSettingsByType: tenantSettingsActions.getByType
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPage);