import React from "react";
import ReactDOM from "react-dom";

import data from "../data.json";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/app.css";

import $ from "jquery";
import utf8 from "utf8";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    getlocationsearch: state.locationsearch
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="container-fluid">Hi </div>;
  }
}

App = connect(
  mapStateToProps,
  null
)(App);

export default App;
