import { types, onSnapshot } from "mobx-state-tree"
import { Grid, Cell } from './models/grid';
import { generateMockedShips } from '../services/mock';



const Store = types.model("Store", {
    grid: Grid
}).actions(self=>({
    afterCreate(){
        const mockedShips = generateMockedShips();
        mockedShips.forEach(el=>{
            console.log('adding mocked ship', el)
            self.grid.addShip(el);
        })
    },
    reinitGrid(){
        self.grid = Grid.create({ elements: [] });
        const mockedShips = generateMockedShips();
        mockedShips.forEach(el=>{
            console.log('adding mocked ship', el)
            self.grid.addShip(el);
        })
    }
}))
// create an instance from a snapshot
const store = Store.create({
    grid: {
        elements: []
    }
})

// development block
window.store = store;

// listen to new snapshots
onSnapshot(store, (snapshot) => {
    console.dir(snapshot)
})

type IStore = typeof Store.Type;

export {
    store,
    IStore,
    Store
}

