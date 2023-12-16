import { useState } from "react";
import Card from "../Card/Card.jsx";
import isWinner from "../Helpers/CheckWinner.js";
import './Grid.css';

function Grid({ numberOfCards }) {
   const [board, setBoard] = useState(Array(numberOfCards).fill(""));
   const [turn, setTurn] = useState(true);
   const [winner, setWinner] = useState(null);

   function play(index) {
      if (!board[index] && !winner) {
         const newBoard = [...board];
         newBoard[index] = turn ? 'O' : 'X';
         setBoard(newBoard);

         const win = isWinner(newBoard, turn ? 'O' : 'X');
         if (win) {
            setWinner(win);
         } else {
            setTurn(!turn);
         }
      }
   }

   function reset() {
      setBoard(Array(numberOfCards).fill(""));
      setTurn(true);
      setWinner(null);
   }

   return (
      <div className="grid-wrapper">
         {winner && (
            <>
               <h1 className="turn-highlight">Winner is {winner}</h1>
               <button className="reset" onClick={reset}>Reset Game</button>
            </>
         )}
         <h1 className="turn-highlight">Current turn: {turn ? 'O' : 'X'}</h1>
         <div className="grid">
            {board.map((el, index) => (
               <Card key={index} player={el} onPlay={() => play(index)} index={index} />
            ))}
         </div>
      </div>
   );
}

export default Grid;
