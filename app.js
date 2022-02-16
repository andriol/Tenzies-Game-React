import React, { useEffect, useState } from "react";
import Die from "./Die";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";

const App = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function checkIfHeld(dices) {
    const dicesHeld = dices.every((die) => die.isHeld);
    return dicesHeld;
  }

  const sameDieValue = (dices) => {
    const firstValue = dice[0].value;
    const dicesValue = dices.map((die) => die.value === firstValue);
    return dicesValue;
  };

  useEffect(() => {
    const allDiceHeld = checkIfHeld(dice);
    const sameDiceValue = sameDieValue(dice);

    if (allDiceHeld && sameDiceValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDice() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: uuidv4(),
    };
  }
  // generate dice object and pus into array
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateDice());
    }
    return diceArray;
  }
  // roll dice when button clicked
  function rollDice() {
    if (!tenzies) {
      setDice((prev) => {
        return prev.map((die) => {
          return die.isHeld ? die : generateDice();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  // change property isHeld to true when clicked
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
      {tenzies && <Confetti />}
      <div className="dice-container">{displayDice}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
};
export default App;
