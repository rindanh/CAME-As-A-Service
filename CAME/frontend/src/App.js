import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { PrivateRoute } from './_components';

import PageWrapper from './components/PageWrapper';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import ProjectListPage from './components/ProjectListPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import MethodChunkListPage from './components/MethodChunkListPage';
import ProjectFormPage from './components/ProjectFormPage';
import MCCompositionPage from './components/MCCompositionPage';
import CharacteristicListPage from './components/CharacteristicListPage';

import { history } from './_helpers'

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router history={history}>
                <PageWrapper>
                    <Switch>
                        {
                            this.props.user ?
                                this.props.user.tenantId === 'admin' ?
                                    <PrivateRoute exact path="/" component={AdminPage}/>
                                :
                                    <PrivateRoute exact path="/" component={HomePage}/>
                        : 
                            <PrivateRoute exact path="/" component={HomePage}/>
                        }
                        
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <PrivateRoute exact path="/projects" component={ProjectListPage}/>
                        <PrivateRoute exact path="/characteristics" component={CharacteristicListPage}/>
                        <PrivateRoute exact path="/projects/:user/:project" component={ProjectDetailPage}/>
                        <PrivateRoute exact path="/create-project" component={ProjectFormPage}/>
                        <PrivateRoute exact path="/edit-project/:user/:project" component={ProjectFormPage}/>
                        <PrivateRoute exact path="/find/:user/:project" component={MethodChunkListPage}/>
                        <PrivateRoute exact path="/compose/:user/:project" component={MCCompositionPage} />
                    </Switch>
                </PageWrapper>
            </Router>
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
)(App);