import './App.css';

import React, { useContext } from 'react';
import ComponentOne from './ComponentOne.tsx';
import ComponentTwo from './ComponentTwo.tsx';
import { Context, ContextProvider } from './Context.js';

function App() {
  const { items, setItems } = useContext(Context);

  return (
    <ContextProvider>
    <div className="App">
      <div className="Component">
        <div className="ComponentTitle">
          In APP
        </div>
        <div>
          Updated new value Count:<b>{items}</b>
        </div>
      </div>
      <ComponentOne/>
      <ComponentTwo/>
    </div>
    </ContextProvider>
  );
}

export default App;
