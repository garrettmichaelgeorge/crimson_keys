import React, { useContext, useReducer, useEffect } from "react";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import synthReducer from "./reducers/synthReducer";
import SynthContext from "./contexts/context";
import AudioEngine from "./components/AudioEngine";

import "./App.css";

function App() {
  const initialState = useContext(SynthContext);
  const [state, dispatch] = useReducer(synthReducer, initialState);

  return (
    <SynthContext.Provider value={{ state, dispatch }}>
      <div className="App container">
        <Header title="Crimson Keys" />

        <main className="main">
          <Keyboard />
          <AudioEngine />
        </main>
      </div>
    </SynthContext.Provider>
  );
}

export default App;
