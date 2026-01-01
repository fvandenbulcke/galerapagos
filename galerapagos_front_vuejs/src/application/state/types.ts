import type { ComputedRef } from 'vue';
import type { UUID } from '../infrastructure/types';

type GameListItemPlayer = {
  id: UUID;
  name: string;
};

export type GameListItem = {
  id: UUID;
  canBeJoined: boolean;
  players: GameListItemPlayer[];
};

export type Player = {
  id: UUID;
  name: string;
  numberOfCards: number;
};

export type GamePlayer = {
  name: string;
  isActive: boolean;
  numberOfCards: number;
};

export enum GameWheater {
  Sun,
  Rain,
}

export type GameState = {
  wheater: GameWheater;
  fish: number;
  water: number;
  wood: number;
};

export type Game = {
  id: UUID;
  players: GamePlayer[];
  canBeStarted: boolean;
  state?: GameState;
};

export type AppState = {
  player?: ComputedRef<Player | undefined>;
  gameList: ComputedRef<GameListItem[]>;
  game?: ComputedRef<Game | undefined>;
  login: (userLogin?: string) => Promise<void>;
  connect: () => void;
  loadGames: () => void;
  joinGame: (gameId: string) => void;
  startGame: () => void;
};
