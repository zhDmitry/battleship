import * as React from "react";
import * as classNames from "classnames";
import { observer } from "mobx-react";
import { ICell } from "../store/models/grid";

const cx = classNames.default;

interface IProps {
  cellData: ICell;
}
class CellElement extends React.Component<IProps, any> {
  render() {
    const { cellData } = this.props;
    console.log(this.props);
    return (
      <div
        onClick={() => cellData.markCell()}
        className={cx.call(null, "cell", {
          owned: !cellData.isEmpty,
          marked: cellData.marked
        })}
      />
    );
  }
}

export default observer(CellElement);
