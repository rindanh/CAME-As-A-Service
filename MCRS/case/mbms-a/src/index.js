import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import Header from "./Header";
import MethodChunk from "./MethodChunk";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/browse" component={Browse} />
      <Route path="/:nameId" component={MethodChunk} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
