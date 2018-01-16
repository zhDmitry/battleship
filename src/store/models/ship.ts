import { types, onSnapshot, getParent, hasParent } from "mobx-state-tree"
import { Cell, ICell } from './grid';

const IId = types.optional(types.identifier(), ()=> Math.random().toFixed(5))

const ShipCell = types.model("ShipCell", {
    id: IId,
    x: types.number,
    y: types.number,
    injured: types.optional(types.boolean, ()=> false),
}).actions(self=>({
     kill(){
         self.injured = true;
     }
}))

const Ship = types.model("Ship", {
    id: IId,
    bodyParts: types.array(ShipCell)
}).views(self => ({
    get isActive() {
        return !!self.bodyParts.find(el=> !el.injured);
    },

}))

type IShip = typeof Ship.Type
export { Ship, IShip, ShipCell  } 