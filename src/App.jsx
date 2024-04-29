import { useState } from "react";

import Player from "./components/player";
import Game from "./components/Game";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

const initialgameBoard=[
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurn){
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}


function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurn, setgameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  let gameboard = [...initialgameBoard.map(array => [...array])];

  for (const turn of gameTurn) {
      const {square, player} = turn;
      const {row, col} = square;
      gameboard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstBoxSymbol = gameboard[combination[0].row][combination[0].column];
    const secondBoxSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdBoxSymbol = gameboard[combination[2].row][combination[2].column];

    if(
      firstBoxSymbol && firstBoxSymbol === secondBoxSymbol && firstBoxSymbol === thirdBoxSymbol
    ){
      winner = players[firstBoxSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleselectBox(rowIndex, colIndex){
    setgameTurn((oldTurns) =>{
      const currentPlayer = deriveActivePlayer(oldTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...oldTurns];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setgameTurn([]);
  }

  function handlePlayer(symbol, newName){
    setPlayers(oldPlayers => {
      return {
        ...oldPlayers,
        [symbol]: newName
      };
    });
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
      <Player name="Player-1" symbol="X" isActive={activePlayer === 'X'}whenNameChange = {handlePlayer}/>
      <Player name="Player-2" symbol="O" isActive={activePlayer === 'O'}whenNameChange = {handlePlayer}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner = {winner} onRestart={handleRestart}/>}
      <Game onselectBox={handleselectBox} board={gameboard}/>
    </div>
  </main>
  );
}

export default App
