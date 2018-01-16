import * as React from "react";
import { observer, inject, Observer } from "mobx-react";
import Grid from "../components/Grid";
import GameOver from "../components/GameOver";
import { ShipCell, Ship } from "../store/models/ship";
import { IStore } from "../store";

class GridContainer extends React.Component<{ store: IStore }, any> {
  render() {
    const { store } = this.props;
    return (
      <div className="centered">
        {store.grid.availableShips > 0 ? (
          <div>
            <h4>Ships available: {store.grid.availableShips}</h4>
            <Grid elements={store.grid.elements} />
          </div>
        ) : (
          <div>
            <GameOver />
            <button onClick={store.reinitGrid}>restart</button>
          </div>
        )}
      </div>
    );
  }
}

export default inject(({ store }) => ({
  store
}))(observer(GridContainer));
