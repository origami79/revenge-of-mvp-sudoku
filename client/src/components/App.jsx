import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="App">
        <h1>Sudoku</h1>
      </div>
    )
  }
};

export default App;