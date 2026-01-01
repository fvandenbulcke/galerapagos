export type UUID = `${string}-${string}-${string}-${string}-${string}`;

type HyperMediaLink = 'self' | 'listGames' | 'joinGame' | 'startGame';

export type HyperMediaLinks = { [key in HyperMediaLink]: { href: string } };

export type ApiPlayer = {
  _id: UUID;
  _name: string;
  _links: HyperMediaLinks;
};

export type ApiGamePlayer = {
  _id: UUID;
  _name: string;
};

export type ApiGameListItem = {
  id: UUID;
  players: ApiGamePlayer[];
  _links: HyperMediaLinks;
};

export type ApiGameListResponse = { content: ApiGameListItem[]; _links: HyperMediaLinks };

type ApiGameRessource = 'fish' | 'water' | 'wood';
type ApiGameRessources = { [key in ApiGameRessource]: number };

export type ApiGameItem = ApiGameListItem & {
  ressources?: ApiGameRessources;
  currentPlayer?: UUID;
};
