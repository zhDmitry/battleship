import { observer, Provider } from "mobx-react";
import * as React from "react";
import * as ReactDom from "react-dom";
import Grid from "./containers/Grid";
import { store } from "./store";

export default class App extends React.Component<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <div>
          <Grid />
        </div>
      </Provider>
    );
  }
}
