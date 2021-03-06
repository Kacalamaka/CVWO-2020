import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Todos from "../components/Todos"
import Todo from "../components/Todo";
import NewTask from "../components/NewTask"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Todos} />
      <Route path="/todo/:id" exact component={Todo} />
      <Route path="/todo" exact component={NewTask} />
    </Switch>
  </Router>
);