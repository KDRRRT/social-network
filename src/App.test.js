
import MainApp from "./App";
import React from "react";
import ReactDOM from "react-dom"

it("render without crushing", () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div)
});
