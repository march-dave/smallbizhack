import React, { Component } from "react";
import { connect } from "react-redux";

// action
const action = search => {
  return {
    type: "LOCATION_SEARCH",
    search
  };
};

const mapDispathToProps = dispatch => {
  return {
    setlocationsearch: e => dispatch(action(e.target.value))
  };
};

class LocationSearch extends Component {
  render() {
    return (
      <div className="inner-addon left-addon">
        <i className="glyphicon glyphicon-user" />
        <input
          type="text"
          className="form-control"
          onChange={this.props.setlocationsearch}
          placeholder="Location Search"
        />
      </div>
    );
  }
}

LocationSearch = connect(
  null,
  mapDispathToProps
)(LocationSearch);
export default LocationSearch;
