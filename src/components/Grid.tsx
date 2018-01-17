import { observer } from "mobx-react";
import * as React from "react";

import { ICell, IGrid } from "../store/models/grid";
import Cell from "./Cell";

interface IProps {
  gridData: IGrid;
  clickable: boolean;
  shipsVisible: boolean;
  handleCellClick?: (x: number, y: number) => void;
}

function Grid({ gridData, clickable, shipsVisible, handleCellClick }: IProps) {
  return (
    <div>
      <h4 className="title">Ships available: {gridData.availableShips}</h4>
      <div className="grid">
        {gridData.elements.map((nestedElements, l: number) => (
          <div key={l}>
            {nestedElements.map((el: ICell, i: number) => (
              <Cell
                key={i}
                cellData={el}
                handleCellClick={handleCellClick}
                clickable={clickable}
                shipsVisible={shipsVisible}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default observer(Grid);
