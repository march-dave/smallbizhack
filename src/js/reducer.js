import React, { Component } from "react";

const initialState = {
  locationsearch: ""
};

const reducer = (state = initialState, action) => {

    console.log('state' + JSON.stringify(state) );
    console.log('action' + JSON.stringify(action) );

  switch (action.type) {
    case "LOCATION_SEARCH":
      return {
        ...state,
        locationsearch: action.search
      };
    default:
      return state;
  }
};

export default reducer;
