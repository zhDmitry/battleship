import { onSnapshot, types } from "mobx-state-tree";
import { generateMockedShips } from "../services/mock";
import { Cell, Grid } from "./models/grid";

const Store = types
  .model("Store", {
    grid: Grid,
    opponentGrid: Grid
  })
  .actions(self => {
    function afterCreate() {
      initGrid();
    }
    function reinitGrid() {
      self.grid = Grid.create({ elements: [] });
      self.opponentGrid = Grid.create({ elements: [] });

      initGrid();
    }
    function initGrid() {
      const mockedShips = generateMockedShips();
      mockedShips.forEach(self.grid.addShip);
      const mockedShips2 = generateMockedShips();
      mockedShips2.forEach(self.opponentGrid.addShip);
    }
    return { afterCreate, reinitGrid, initGrid };
  });
// create an instance from a snapshot
const store = Store.create({
  grid: {
    elements: []
  },
  opponentGrid: {
    elements: []
  }
});

// development block
window.store = store;

// listen to new snapshots
onSnapshot(store, snapshot => {
  console.dir(snapshot);
});

type IStore = typeof Store.Type;

export { store, IStore, Store };
