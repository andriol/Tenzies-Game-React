import React, { useState } from "react";
import Die from "./Die";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const diceArray = [];

    for (let i = 0; i < 10; i++) {
      const generateDice = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: uuidv4(),
      };
      diceArray.push(generateDice);
    }
    return diceArray;
  }
  function rollDice() {
    setDice(allNewDice());
  }
  function isDieHeld(id) {
    setDice((prev) => {
      return prev.map((die) => {
        return die.id === id ? { ...die, isHeld: true } : die;
      });
    });
  }

  const displayDice = dice.map((die) => {
    return (
      <Die
        key={uuidv4()}
        value={die.value}
        isHeld={die.isHeld}
        isDieHeld={() => isDieHeld(die.id)}
      />
    );
  });

  return (
    <main>
      <div className="dice-container">{displayDice}</div>
      <button onClick={rollDice} className="roll-dice">
        Roll
      </button>
    </main>
  );
};
export default App;
