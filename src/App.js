import React from "react";
import { Header, Keyboard } from "./components";

function App() {
  return (
    <div className="container">
      <Header title="Crimson Keys" />

      <main className="main">
        <Keyboard />
      </main>
    </div>
  );
}

export default App;
