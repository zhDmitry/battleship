import { onSnapshot, types } from "mobx-state-tree";

import { IShip, Ship, ShipCell } from "./ship";

const Cell = types
  .model("Cell", {
    x: types.number,
    y: types.number,
    marked: types.optional(types.boolean, () => false),
    ownedBy: types.maybe(types.reference(ShipCell))
  })
  .actions(self => ({
    markCell() {
      self.marked = true;

      if (self.ownedBy) {
        self.ownedBy.kill();
      }
    }
  }))
  .views(self => ({
    get isEmpty() {
      return !self.ownedBy;
    }
  }));

type ICell = typeof Cell.Type;

export { Cell, ICell };
