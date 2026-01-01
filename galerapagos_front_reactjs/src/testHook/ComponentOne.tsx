import { useContext } from "react";
import { Context } from "./Context";

function ComponentOne() {
  const { items, setItems } = useContext(Context);

  const clickHandler = () => {
    setItems((prevcount) => prevcount + 1);
  };

  const clickHandlerOne = () => {
      setItems((prevcount) => prevcount - 1);
  };

  return (
    <div className="Component ComponentOne">
      <div className="ComponentTitle">
        SubComponentTwo
      </div>
      <div>
        <button onClick={clickHandler}>Increase</button>
        Count:{items}
        <button onClick={clickHandlerOne}>Decrease</button>
      </div>
    </div>
  );
}

export default ComponentOne;