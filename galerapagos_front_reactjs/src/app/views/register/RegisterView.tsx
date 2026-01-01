import React from "react";
import './RegisterView.css';
import TheButton from "../../components/button/TheButton.tsx";
import TheTextField from "../../components/textField/TheTextField.tsx";

function RegisterView({ onRegister }) {

  const [playerName, setPlayerName] = React.useState('');

  const onClick = () => {
    onRegister(playerName);
  };

  const handleTextareaChange = (playerName: string) => {
    setPlayerName(playerName);
  };

  return (
    <div className="RegisterView">
      <form>
        <TheTextField
          value={playerName}
          placeholder={'Enter your name'}
          onChange={handleTextareaChange}
        />
        <TheButton label={'Register'} onClick={onClick}/>
      </form>
    </div>
  );
}

export default RegisterView;