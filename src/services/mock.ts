import { Ship } from '../store/models/ship';

// this is could be more sofisticated generation
const LShaped = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 3 }
];
const IShaped = [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }];
const Dot1 = [{ x: 9, y: 4 }];
const Dot2 = [{ x: 5, y: 5 }];

function generateMockedShips() {
   return [LShaped, IShaped, Dot1, Dot2].map(bodyParts=> Ship.create({ bodyParts }))
}

export { generateMockedShips };
