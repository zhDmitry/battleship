import * as _ from "lodash";
import { inject, observer, Observer } from "mobx-react";
import * as React from "react";

import GameOver from "../components/GameOver";
import Grid from "../components/Grid";
import { IStore } from "../store";
import { Ship, ShipCell } from "../store/models/ship";

class GridContainer extends React.Component<{ store: IStore }, any> {
  public handleCellClick = (x: number, y: number) => {
    const { grid } = this.props.store;
    const targetCell = _.shuffle(grid.availableCells)[0];
    grid.markCell(targetCell.x, targetCell.y);
  };
  public render() {
    const { store } = this.props;
    const gameEnded =
      store.grid.availableShips === 0 ||
      store.opponentGrid.availableShips === 0;

    const winner =
      store.grid.availableShips > store.opponentGrid.availableShips
        ? "You"
        : "Compute";
    return (
      <div className="flex-center">
        {!gameEnded ? (
          <>
            <Grid gridData={store.grid} clickable={false} shipsVisible />
            <Grid
              gridData={store.opponentGrid}
              handleCellClick={this.handleCellClick}
              shipsVisible={false}
              clickable
            />
          </>
        ) : (
          <div>
            <GameOver winner={winner} />
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
