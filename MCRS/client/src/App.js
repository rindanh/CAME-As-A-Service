import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Providers from "./components/Providers";
import ProviderForm from "./components/ProviderForm";
import Login from "./components/Login";
import Register from "./components/Register";
import MethodChunks from "./components/MethodChunks";
import MethodChunkForm from "./components/MethodChunkForm";
import Projects from "./components/Projects";
import ProviderItem from "./components/ProviderItem";
import ProjectForm from "./components/ProjectForm";
import FindResult from "./components/FindResult";
import Characteristics from "./components/Characteristics";
import CharacteristicForm from "./components/CharacteristicForm";
import NotFound from "./components/NotFound";
import history from "./history";
import {
  ORGANISATIONAL,
  HUMAN,
  APPLICATION_DOMAIN,
  DEVELOPMENT_STRATEGY
} from "./components/Characteristics";
import {
  readIndustries,
  readDimensions,
  readProviders,
  readCharacteristics,
  readMethodChunks,
  readProjects
} from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.readIndustries();
    this.props.readDimensions();
    this.props.readProviders();
    this.props.readCharacteristics();
    this.props.readMethodChunks();
    this.props.readProjects();
  }

  render() {
    if (
      this.props.industries.loading ||
      this.props.dimensions.loading ||
      this.props.providers.loading ||
      this.props.characteristics.loading ||
      this.props.methodChunks.loading ||
      this.props.projects.loading
    )
      return "";
    console.log("All", this.props);
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Header user={this.props.providers.user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/providers"
              component={() => (
                <Providers providers={this.props.providers} industries={this.props.industries} />
              )}
            />
            <Route
              exact
              path="/register"
              component={props => <Register {...props} industries={this.props.industries} />}
            />
            <Route
              exact
              path="/login"
              component={props => <Login {...props} providers={this.props.providers} />}
            />
            <Route
              exact
              path="/providers/:id/edit"
              component={props => (
                <ProviderForm
                  {...props}
                  provider={this.props.providers[props.match.params.id]}
                  providers={this.props.providers}
                  industries={this.props.industries}
                />
              )}
            />
            <Route
              path="/providers/:id"
              component={props => (
                <ProviderItem
                  {...props}
                  provider={this.props.providers[props.match.params.id]}
                  providers={this.props.providers}
                  methodChunks={this.props.methodChunks.all
                    .filter(e => this.props.methodChunks[e].provider === props.match.params.id)
                    .map(e => this.props.methodChunks[e])}
                  projects={this.props.projects.all
                    .filter(e => this.props.projects[e].provider === props.match.params.id)
                    .map(e => this.props.projects[e])}
                  industry={
                    this.props.industries[this.props.providers[props.match.params.id].industry]
                  }
                />
              )}
            />
            <Route
              exact
              path="/method-chunks/"
              component={props => (
                <MethodChunks
                  {...props}
                  providers={this.props.providers}
                  methodChunks={this.props.methodChunks}
                />
              )}
            />
            <Route
              path="/method-chunks/:id/edit"
              component={props => (
                <MethodChunkForm
                  {...props}
                  organisational={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === ORGANISATIONAL
                  )}
                  human={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === HUMAN
                  )}
                  applicationDomain={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === APPLICATION_DOMAIN
                  )}
                  developmentStrategy={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === DEVELOPMENT_STRATEGY
                  )}
                  others={this.props.characteristics.all.filter(
                    e => !this.props.characteristics[e].dimension
                  )}
                  characteristics={this.props.characteristics}
                  methodChunk={this.props.methodChunks[props.match.params.id]}
                />
              )}
            />
            <Route
              path="/publish"
              component={props => (
                <MethodChunkForm
                  {...props}
                  organisational={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === ORGANISATIONAL
                  )}
                  human={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === HUMAN
                  )}
                  applicationDomain={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === APPLICATION_DOMAIN
                  )}
                  developmentStrategy={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === DEVELOPMENT_STRATEGY
                  )}
                  others={this.props.characteristics.all.filter(
                    e => !this.props.characteristics[e].dimension
                  )}
                  characteristics={this.props.characteristics}
                />
              )}
            />
            <Route
              exact
              path="/characteristics/"
              component={props => (
                <Characteristics
                  {...props}
                  dimensions={this.props.dimensions}
                  organisational={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === ORGANISATIONAL
                  )}
                  human={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === HUMAN
                  )}
                  applicationDomain={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === APPLICATION_DOMAIN
                  )}
                  developmentStrategy={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === DEVELOPMENT_STRATEGY
                  )}
                  others={this.props.characteristics.all.filter(
                    e => !this.props.characteristics[e].dimension
                  )}
                  characteristics={this.props.characteristics}
                />
              )}
            />
            <Route
              exact
              path="/characteristics/create"
              component={props => (
                <CharacteristicForm {...props} dimensions={this.props.dimensions} />
              )}
            />{" "}
            <Route
              path="/characteristics/:id/edit"
              component={props => (
                <CharacteristicForm
                  {...props}
                  dimensions={this.props.dimensions}
                  characteristic={this.props.characteristics[props.match.params.id]}
                />
              )}
            />
            <Route
              exact
              path="/projects"
              component={props => (
                <Projects
                  {...props}
                  projects={this.props.projects}
                  providers={this.props.providers}
                />
              )}
            />
            <Route
              path="/projects/:provider/:project/edit"
              component={props => (
                <ProjectForm
                  {...props}
                  organisational={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === ORGANISATIONAL
                  )}
                  human={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === HUMAN
                  )}
                  applicationDomain={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === APPLICATION_DOMAIN
                  )}
                  developmentStrategy={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === DEVELOPMENT_STRATEGY
                  )}
                  others={this.props.characteristics.all.filter(
                    e => !this.props.characteristics[e].dimension
                  )}
                  characteristics={this.props.characteristics}
                  project={
                    this.props.projects[
                      props.match.params.provider + "/" + props.match.params.project
                    ]
                  }
                />
              )}
            />
            <Route
              exact
              path="/find"
              component={props => (
                <ProjectForm
                  {...props}
                  organisational={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === ORGANISATIONAL
                  )}
                  human={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === HUMAN
                  )}
                  applicationDomain={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === APPLICATION_DOMAIN
                  )}
                  developmentStrategy={this.props.characteristics.all.filter(
                    e => this.props.characteristics[e].dimension === DEVELOPMENT_STRATEGY
                  )}
                  others={this.props.characteristics.all.filter(
                    e => !this.props.characteristics[e].dimension
                  )}
                  characteristics={this.props.characteristics}
                />
              )}
            />
            <Route
              exact
              path="/find/:provider/:project"
              component={props => <FindResult {...props} providers={this.props.providers} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {
  readIndustries,
  readDimensions,
  readProviders,
  readCharacteristics,
  readMethodChunks,
  readProjects
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
