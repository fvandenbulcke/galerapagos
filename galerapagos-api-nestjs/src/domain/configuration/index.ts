export const MINIMUM_PLAYER_NUMBER = 3;
export const MAXIMUM_PLAYER_NUMBER = 7;

export type Ressource = {
  fish: number;
  water: number;
  wood: number;
};

export enum TurnAction {
  waterCollect = 'waterCollect',
  fishCatch = 'fishCatch',
  wooCollect = 'woodCollect',
}

type playersNumber = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const startingRessourcesByPlayersNumber: {
  [key in playersNumber]: Ressource;
} = {
  3: { fish: 5, water: 6, wood: 0 },
  4: { fish: 7, water: 8, wood: 0 },
  5: { fish: 8, water: 10, wood: 0 },
  6: { fish: 10, water: 12, wood: 0 },
  7: { fish: 12, water: 15, wood: 0 },
  8: { fish: 13, water: 16, wood: 0 },
  9: { fish: 15, water: 18, wood: 0 },
  10: { fish: 16, water: 20, wood: 0 },
  11: { fish: 18, water: 22, wood: 0 },
  12: { fish: 10, water: 24, wood: 0 },
};
