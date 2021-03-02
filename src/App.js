import "./App.css";
import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  
  const [squares, setSquares] = useLocalStorage('squares:tic-tac-toe',Array(9).fill(null));
  const [history,setHistory] =useLocalStorage('history:tic-tac-toe',[]);
  let winningCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let player=getNextPlayer(squares);
  let winner=getWinner(squares);
  let status=getStatus(winner,squares,player);
  
  let makeAMove = (index) => {
   if(squares[index]||winner)
   return;
    let squaresCopy = [...squares];
    squaresCopy[index] = player;
    let historyCopy=[...history];
    historyCopy.push(squaresCopy);
    setHistory(historyCopy);
    setSquares(squaresCopy); 
  };

  function getWinner(squares)
  {
    for(let i=0;i<winningCombinations.length;i++)
    { let [a,b,c]=winningCombinations[i];
    
      if(squares[a] && squares[a]===squares[b] && squares[b]==squares[c])
      {  
        return squares[a];
      }
    }
    return null;
  }
  function getNextPlayer(squares){
    const xSquaresCount=squares.filter(r=>r=="X").length;
    const oSquaresCount=squares.filter(r=>r=="O").length;
    return oSquaresCount === xSquaresCount?"X":"O";
  }
function restartGame(){
  setSquares(Array(9).fill(null));
  setHistory([]);
}
function getStatus(winner,squares,nextValue)
{
  return winner?`${winner} Won`:squares.every(Boolean)?`Scratch: Cat's game`: `Next player: ${nextValue}`
}
function trackHistory(index)
{
  let historySegment=[...history[index]];
  setSquares(historySegment);
}
  return (
    <div className="App">
 
    <div className="Game">
      <h1>Tic Tac Toe</h1>
      <h2>{status}</h2>
      <div className="board">
        {squares.map((sq, i) => {
         return (
            <div key={i} onClick={(e) => makeAMove(i)} className={sq||winner?"cell filled":"cell"}>
              {sq}
            </div>
          );
        })}
      </div>
      <div><button onClick={restartGame}>Restart</button></div>
      </div>
      <div className="HistoryInfo">{

    history.length>0?history.map((h,i)=>{
        return (<div key={i} className="segment" onClick={()=>trackHistory(i)}>Go To Step {i+1}</div>);
      }):<div className="segment">Start Game</div>
    }
      </div>
    </div>
  );
}
export default App;
