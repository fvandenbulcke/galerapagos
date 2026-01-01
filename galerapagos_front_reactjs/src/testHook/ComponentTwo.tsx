import { useContext } from "react";
import { Context } from "./Context";

function ComponentTwo() {
  const { items, setItems } = useContext(Context)
  
  const handlertwo = () => {
  };

  const clickHandler = () => {
    setItems((prevcount) => prevcount + 1);
  };

  const clickHandlerOne = () => {
      setItems((prevcount) => prevcount - 1);
  };

  return (
    <div className="Component ComponentTwo">
      <div className="ComponentTitle">
        SubComponentOne
      </div>
      <div>
        Updated new value Count:<b>{items}</b>
        <div>
            <button onClick={handlertwo}>Move to Page One</button>
        </div>
  </div>
    </div>
  );
}


export default ComponentTwo;