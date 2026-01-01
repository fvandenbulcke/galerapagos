import { computed, reactive } from 'vue';
import { API_URL } from '../infrastructure/constants';
import httpClient from '../infrastructure/http.client';
import type {
  ApiGameItem,
  ApiGameListItem,
  ApiGameListResponse,
  ApiPlayer,
} from '../infrastructure/types';
import { GameWheater, type AppState, type Game, type GameListItem, type Player } from './types';

type State = {
  localPlayer?: ApiPlayer;
  games?: ApiGameListItem[];
  game?: ApiGameItem;
};

const state = reactive<State>({
  localPlayer: undefined,
  games: [],
  game: undefined,
});

const gameList = computed((): GameListItem[] => {
  return (
    state.games?.map((game) => ({
      id: game.id,
      canBeJoined: !!game._links.joinGame,
      players: game.players.map((player) => ({ id: player._id, name: player._name })),
    })) || []
  );
});

const player = computed((): Player | undefined => {
  return (
    state.localPlayer && {
      id: state.localPlayer._id,
      name: state.localPlayer._name,
      numberOfCards: 0,
    }
  );
});

const game = computed((): Game | undefined => {
  if (!state.game) return undefined;

  const { players, currentPlayer, ressources, _links } = state.game;

  const gameState = ressources && {
    wheater: GameWheater.Sun,
    fish: ressources.fish,
    water: ressources.water,
    wood: ressources.wood,
  };

  return {
    id: state.game.id,
    players: players.map((player) => ({
      name: player._name,
      isActive: player._id === currentPlayer,
      numberOfCards: 0,
    })),
    canBeStarted: !!_links.startGame,
    state: gameState,
  };
});

const processState = (newState: ApiGameListItem) => {
  console.log('📩 Nouveau message:', newState);
  state.game = newState;
};

const login = async (userLogin?: string): Promise<void> => {
  return httpClient
    .post<ApiPlayer>('/galerapagos/login', { userName: userLogin })
    .then((response) => {
      console.log('✅ Login réussi');
      state.localPlayer = response;
    })
    .catch((error) => {
      console.error('❌ Erreur login:', error);
      throw error;
    });
};

const connect = async (userLogin?: string) => {
  return httpClient
    .post('/galerapagos/login', { userName: userLogin })
    .then(() => {
      console.log('✅ Login réussi');
      const eventSource = new EventSource(`${API_URL}/galerapagos/connect`, {
        withCredentials: true,
      });
      eventSource.onmessage = ({ data }) => {
        processState(JSON.parse(data));
      };
    })
    .catch((error) => {
      console.error('❌ Erreur login:', error);
      throw error;
    });
};

const loadGames = async () => {
  if (!state.localPlayer) {
    return;
  }
  const path = state.localPlayer._links.listGames.href;
  httpClient
    .get<ApiGameListResponse>(path)
    .then((response) => {
      state.games = response.content;
    })
    .catch((error) => {
      console.error('❌ Erreur chargement des jeux:', error);
    });
};

const joinGame = (gameId: string) => {
  if (!state.games) {
    return;
  }
  const path = state.games.find((game) => game.id === gameId)!._links.joinGame.href;

  const eventSource = new EventSource(`${API_URL}${path}`, {
    withCredentials: true,
  });
  eventSource.onmessage = ({ data }) => {
    processState(JSON.parse(data));
  };
};

const startGame = () => {
  if (!state.game) {
    return;
  }
  const path = state.game._links.startGame.href;
  httpClient.put<ApiGameListResponse>(path).catch((error) => {
    console.error('❌ Erreur during starting game:', error);
  });
};

export default (): AppState => ({
  player,
  gameList,
  game,
  login,
  connect,
  loadGames,
  joinGame,
  startGame,
});
