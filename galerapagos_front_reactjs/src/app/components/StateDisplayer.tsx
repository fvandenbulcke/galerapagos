type PlayerState = {
  _links: {
    login: {
      href: string;
    };
  }
};

function StateDisplayer({ playerState }: { playerState: PlayerState }) {
  return (
    <div>{JSON.stringify(playerState)}</div>
  );
};

export default StateDisplayer;