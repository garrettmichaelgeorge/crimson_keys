import React, { useContext, useReducer } from "react";
import { Header, Keyboard, AudioEngine } from "./components";
import synthReducer from "./reducers/synthReducer";
import SynthContext from "./contexts/SynthContext";

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
