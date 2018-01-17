import * as _ from "lodash";
import { observable } from "mobx";
import { onSnapshot, types } from "mobx-state-tree";
import { Cell, ICell } from "./cell";
import { IShip, Ship } from "./ship";

const DeskElements = types.array(types.array(Cell));
type IDeskElements = typeof DeskElements.Type;
const Grid = types
  .model("Grid", {
    elements: DeskElements
  })
  .volatile(self => ({
    shipsOnDesk: observable.array([] as IShip[])
  }))
  .views(self => ({
    get availableShips() {
      return self.shipsOnDesk.filter(el => el.isActive).length;
    },
    get availableCells() {
      const initial: any = [];
      return self.elements.reduce((acc, el) => {
        const elements = el.filter(el => !el.marked);
        acc.push(...elements);
        return acc;
      }, initial);
    }
  }))
  .actions(self => ({
    markCell(x: number, y: number) {
      self.elements[x][y].markCell();
    },
    addShip(ship: IShip) {
      if (canPutShipOnDesk(ship, self.elements)) {
        self.shipsOnDesk.push(ship);
        putShipPartsOnDesk(ship, self.elements);
      } else {
        throw new Error("cannot put ship on selected coordinates");
      }
    },
    afterCreate() {
      self.elements.replace(initEmptyGrid(10));
    }
  }));

type IGrid = typeof Grid.Type;

function canPutShipOnDesk(ship: IShip, elements: IDeskElements) {
  return ship.bodyParts.every(el => !elements[el.x][el.y].marked);
}

function putShipPartsOnDesk(ship: IShip, elements: IDeskElements) {
  ship.bodyParts.forEach(el => {
    const element = elements[el.x][el.y];
    element.ownedBy = el;
  });
}

function initEmptyGrid(gridSize: number) {
  return observable.array(
    _.range(0, gridSize).map(x =>
      observable.array(
        _.range(0, gridSize).map(y =>
          Cell.create({
            x,
            y
          })
        )
      )
    )
  );
}

export { Grid, IGrid, Cell, ICell };
