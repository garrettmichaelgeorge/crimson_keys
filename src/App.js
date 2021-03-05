import React from "react";
import { Header, Main, AudioGUI } from "./components";

function App() {
  return (
    <div className="container">
      <Header title="Crimson Keys" />
      <Main>
        <AudioGUI />
      </Main>
    </div>
  );
}

export default App;
