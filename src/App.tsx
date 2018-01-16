import * as React from "react";
import * as ReactDom from "react-dom";
import { observer, Provider } from "mobx-react";
import { store } from "./store";
import Grid from "./containers/Grid";

class AppStateType {}

class AppPropsType {}

export default class App extends React.Component<AppPropsType, AppStateType> {
  componentDidMount() {
    console.log("render", ReactDom.findDOMNode(this));
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Grid />
        </div>
      </Provider>
    );
  }
}
