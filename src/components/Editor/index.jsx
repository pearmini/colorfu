import React from "react";
import { connect } from "dva";
const Editor = function() {
  return <h1>hello Editor</h1>;
};
export default connect()(Editor);
