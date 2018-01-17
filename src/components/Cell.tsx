import { default as cx } from "classnames";
import * as _ from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { ICell } from "../store/models/grid";

interface IProps {
  cellData: ICell;
  shipsVisible: boolean;
  clickable: boolean;
  handleCellClick?: (y: number, x: number) => void;
}

function CellElement({
  cellData,
  clickable = true,
  shipsVisible,
  handleCellClick
}: IProps) {
  const owned = cellData.marked
    ? !cellData.isEmpty
    : !cellData.isEmpty && shipsVisible;
  return (
    <div
      onClick={
        clickable
          ? () => {
              if (handleCellClick) {
                handleCellClick(cellData.x, cellData.y);
              }
              cellData.markCell();
            }
          : _.noop
      }
      className={cx.call(null, "cell", {
        owned,
        marked: cellData.marked
      })}
    />
  );
}

CellElement.defaultProps = {
  shipsVisible: true,
  clickable: true
};

export default observer(CellElement);
