import React from 'react';

const Settings = (props) => {


  return (
    <div id="Settings">
      <h2>Settings</h2>
      <button>Check Solution</button>
      <button>Hint</button>
      <form id="new-game" onSubmit={e => e.preventDefault()}>
        <input type="radio" id="easy" name="difficulty" value="easy"></input>
        <label htmlFor="easy">Easy</label><br></br>
        <input type="radio" id="medium" name="difficulty" value="medium"></input>
        <label htmlFor="medium">Medium</label><br></br>
        <input type="radio" id="hard" name="difficulty" value="hard"></input>
        <label htmlFor="hard">Hard</label><br></br>
        <button>Get New Puzzle</button>
      </form>
      <form id="pieces" onSubmit={e => e.preventDefault()}>
        <input type="radio" id="number" name="piece-selection" value="number"></input>
        <label htmlFor="number">Numbers</label><br></br>
        <input type="radio" id="color" name="piece-selection" value="color"></input>
        <label htmlFor="color">Colors</label><br></br>
        <input type="radio" id="fruit" name="piece-selection" value="fruit"></input>
        <label htmlFor="fruit">Fruits</label><br></br>
        <button>Change Pieces</button>
      </form>
    </div>
  );
}

export default Settings;