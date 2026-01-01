import { createContext } from "react";


type IPlayerAction = {
  href: string;
};

type IPlayerActions = {
  login?: IPlayerAction;
  self?: IPlayerAction;
  listGames?: IPlayerAction;
  createGame?: IPlayerAction;
};

type IPlayer = {
  _id: string;
  _name: string;
};

type IGameActions = {
  self: IPlayerAction;
  joinGame: IPlayerAction;
};

export type IGame = {
  id: string;
  players: IPlayer[];
  _links: IGameActions;
};

export type IPlayerState = {
  content?: IGame[];
  _links: IPlayerActions
};

export type IAppState = {
  isLoading: boolean;
  isRegisterView: boolean;
  isGameListView: boolean;
  player?: IPlayerState;
  characters: any,
};

export const AppContext = createContext<IPlayerState>({ _links: { login: { href: 'local-http-login' } } });

export const PlayerContext = createContext<IPlayerState>({
  _links: {
    login: {
      href: '',
    }
  }
});
