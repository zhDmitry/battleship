import * as React from "react";

function GameOver({ winner }) {
  return (
    <div>
      <h1>Game Over</h1>
      <h3>{winner} win</h3>
    </div>
  );
}

export default GameOver;
