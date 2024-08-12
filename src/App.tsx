import { useState } from "react";

import Backdrop from "./Backdrop.tsx";
import Preloader from "./Preloader.tsx";
import Scene from "./Scene/Scene.tsx";

import "./App.scss";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    console.log("Starting game...");
    setGameStarted(true);
  };

  return (
    <div className="App">
      <Backdrop isDimmed={gameStarted} />
      {gameStarted ? <Scene /> : <Preloader startGame={startGame} />}
    </div>
  );
}

export default App;
