import './App.css';

import React, { useContext, useEffect, useState } from 'react';
import RegisterView from './views/register/RegisterView.tsx';
import httpClient from './infrastructure/httpClient/httpClient.ts';
import { PlayerContext, type PlayerState } from './domain/types.ts';
import GameList from './views/gameList/GameList.tsx';

type Navigation = {
  isLoading: boolean;
  isRegisterView: boolean;
  isGameListView: boolean;
}

function App() {
  const [navigationState, setNagivationState] = useState<Navigation>({
    isLoading: false,
    isRegisterView: true,
    isGameListView: false,
  });
  const [playerState, setPlayerState] = useState<PlayerState>({
    _links: {
      login: {
        href: '',
      }
    }
  });

  useEffect(() => {
    return () => {
      httpClient
        .get<PlayerState>('/galerapagos')
        .then((player) => {
          setPlayerState(player)
        });
    };
  }, []);

  const onRegister = (playerName: string) => {
    
    const href = playerState._links.login?.href;
    if (!href) {
      throw new Error();
    }

    httpClient
      .post<PlayerState>(href, { userName: playerName })
      .then((player) => {
        setPlayerState(player);
        setNagivationState({
          ...navigationState,
          isRegisterView: false,
          isGameListView: true,
        });
      });
  };

  return (
    <div className="App">
      <PlayerContext.Provider value={ playerState }>
        {
          (playerState._links.login &&
            <RegisterView
              onRegister={onRegister}
            />
          )
          ||
          <GameList/>
        }
      </PlayerContext.Provider>
    </div>
  );
}

function SubComponentTwo() {
  const playerState = useContext(PlayerContext);
  return (
    <div>
      SubComponentTwo
      <div>{ JSON.stringify(playerState) }</div>
    </div>
  );
}

function SubComponentOne() {
  const playerState = useContext(PlayerContext);

  return (
    <div>
      SubComponentOne
      <div>{ JSON.stringify(playerState) }</div>
    </div>
  );
}

export default App;
