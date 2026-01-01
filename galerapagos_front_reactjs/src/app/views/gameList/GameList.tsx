import React, { useContext, useEffect, useState } from "react";
import { IGame, PlayerContext, IPlayerState } from "../../domain/types.ts";
import httpClient from "../../infrastructure/httpClient/httpClient.ts";
import TheButton from "../../components/button/TheButton.tsx";
import './Game.css';

function Game({item}:{item: IGame}){
  const onClick = () => {
    console.log(`join game ${item.id}`)
  };

  return (
    <div className="Game">
      <div>Game { item.id }</div>
      <div>
        <ul className="Players">
          { item.players.map(player => (
            <li key={player._id} className="Player">{player._name}</li>
          ))}
        </ul>
      </div>
      {
        item._links.joinGame &&
        <div className="GameAction">
          <TheButton label={'Join'} onClick={onClick}/>
        </div>
      }
    </div>
  );
};

function GameList() {
  const playerState = useContext(PlayerContext);

  const [games, setGames] = useState<IGame[]>();

  const createGame = () => {
    httpClient
      .post<IPlayerState>(playerState._links.createGame?.href as string)
      .then((games) => {
      });
  };

  useEffect(() => {
    console.log(playerState._links.listGames?.href)
    return () => {
      httpClient
        .get<IPlayerState>(playerState._links.listGames?.href as string)
        .then((games) => {
          const { content } = games;
          setGames(content);
        });
    };
  }, []);

  return (
    <div>
      <div>GAME LIST</div>
      <div>{ JSON.stringify(playerState) }</div>

      <ul className="GameList">
        {games && games.map(game => (
          <li key={game.id} className="GameComponent"><Game item={game} /></li>
        ))}
      </ul>

      {
        playerState._links.createGame &&
        <div className="GameListAction">
          <TheButton label={'Create Game'} onClick={ createGame }/>
        </div>
      }
    </div>
  );
}

export default GameList;