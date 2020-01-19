import React from "react";
import { connect } from "dva";
const Dock = function() {
  return <h1>hello Dock</h1>;
};
export default connect()(Dock);
