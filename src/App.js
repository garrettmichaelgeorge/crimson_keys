import React from "react";
import { Header, Keyboard, Main } from "./components";

function App() {
  return (
    <div className="container">
      <Header title="Crimson Keys" />
      <Main>
        <Keyboard />
      </Main>
    </div>
  );
}

export default App;
