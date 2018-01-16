import * as React from "react";
import { observer } from "mobx-react";

import Cell from "./Cell";
import { ICell } from "../store/models/grid";

class Grid extends React.Component<any, any> {
  render() {
    const { elements } = this.props;
    return (
      <div className="grid">
        {elements.map(nestedElements => {
          return (
            <div>
              {nestedElements.map((el: ICell, i: number) => {
                return <Cell key={i} cellData={el} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default observer(Grid);
