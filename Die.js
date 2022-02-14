import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };
  return (
    <div className="die-face" style={styles}>
      <h2 onClick={props.isDieHeld}>{props.value}</h2>
    </div>
  );
}
