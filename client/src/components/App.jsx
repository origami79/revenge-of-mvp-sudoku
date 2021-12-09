import React from 'react';
import $ from 'jquery';
import axios from 'axios';

import Board from './Board.jsx';
import Settings from './Settings.jsx';
import numbers from './Pieces.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}],
        [{value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}, {value: 0, changeable: true}]
      ],
      pieces: 'number',
      difficulty: 'easy',
    };
    this.cycleChoices = this.cycleChoices.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.getGame = this.getGame.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  componentDidMount() {
    this.getGame();
  }

  // function to retrieve games from API
  getGame() {
    const options = {
      method: 'GET',
      url: `/newGame?difficulty=${this.state.difficulty}`,
    }
    axios.request(options)
    .then(response => {
      this.setState({board: response.data.board, difficulty: response.data.difficulty});
    })
    .catch(error => {
      console.error(error);
    })
  }

  // function to change diffuculty
  changeDifficulty(e) {
    let difficulty = e.target.attributes.id.value;
    console.log('CLICKED', difficulty);
    this.setState({difficulty});
  }

  // functions to check if correct
  checkSolution() {
    const currentBoard = this.state.board;
    let solved = true;
    let rows = this.checkRows();
    let cols = this.checkCols();
    let squares = this.checkSquares();
    if (rows === false || cols === false || squares === false) {
      solved = false;
    }

    if (solved === true) {
      // do something
      console.log('SOLVED');
    } else {
      // do something else
      console.log('Not Yet...');
    }
  }

  checkMatrix(matrix) {
    let solved = true;
    for (let i = 0; i <matrix.length; i++) {
      const row = matrix[i];
      let counter = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
      }
      for (let i = 0; i < row.length; i++) {
        const square = row[i];
        counter[square]++;
      }
      if (counter[1] !== 1 || counter[2] !== 1 ||  counter[3] !== 1 ||
        counter[6] !== 1 || counter[5] !== 1 || counter[4] !== 1 ||
        counter[7] !== 1 || counter[8] !== 1 || counter[9] !== 1) {
          solved = false;
      }
    }
    return solved;
  }

  checkRows() {
    let matrix = [[], [], [], [], [], [], [], [], []];
    let board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const squareVal = row[j].value;
        matrix[i].push(squareVal);
      }
    }
    let solved = this.checkMatrix(matrix);
    console.log('ROW', solved);
    return solved;
  }

  checkCols() {
    let matrix = [[], [], [], [], [], [], [], [], []];
    let board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const squareVal = board[j][i].value;
        matrix[i].push(squareVal);
      }
    }
    let solved = this.checkMatrix(matrix);
    console.log('COL', solved);
    return solved;
  }

  checkSquares() {
    let matrix = [[], [], [], [], [], [], [], [], []];
    const board = this.state.board;
    for (let i = 0; i <board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const squareVal = board[i][j].value;
        if (i < 3 && j < 3) {
          matrix[0].push(squareVal);
        } else if (i < 3 && j < 6) {
          matrix[1].push(squareVal);
        } else if (i < 3 && j < 9) {
          matrix[2].push(squareVal);
        } else if (i < 6 && j < 3) {
          matrix[3].push(squareVal);
        } else if (i < 6 && j < 6) {
          matrix[4].push(squareVal);
        } else if (i < 6 && j < 9) {
          matrix[5].push(squareVal);
        } else if (i < 9 && j < 3) {
          matrix[6].push(squareVal);
        } else if (i < 9 && j < 6) {
          matrix[7].push(squareVal);
        } else if (i < 9 && j < 9) {
          matrix[8].push(squareVal);
        }
      }
    }
    let solved = this.checkMatrix(matrix);
    console.log('SQUARES', solved);
    return solved;
  }

  // function to provide hint
  giveHint() {

  }

  //function to change piece set
  changePieces() {

  }

  // functions to set a piece
  cycleChoices(e) {
    let boardTarget = e.target.attributes.id;
    if (boardTarget === undefined) {
      boardTarget = e.target.parentElement.attributes.id.value;
    } else {
      boardTarget = boardTarget.value;
    }
    const row = boardTarget.substring(3, 4);
    const col = boardTarget.substring(7, 8);
    let targetValue = this.state.board[row][col].value;
    // console.log('CLICKED', targetValue);
    // if value is = 9 set it equal to 1
    let currentBoard = this.state.board;
    if (targetValue === 9) {
      currentBoard[row][col].value = 0;
      this.setState({board: currentBoard})
    } else {
      targetValue++;
      currentBoard[row][col].value = targetValue;
      this.setState({board: currentBoard});
    }
  }

  render() {
    return (
      <div id="App">
        <h1>Sudoku</h1>
        <Board board={this.state.board} pieces={this.state.pieces}  pieceClick={this.cycleChoices} />
        <Settings solved={this.checkSolution} newPuzzle={this.getGame} difficulty={this.changeDifficulty} />
      </div>
    )
  }
};

export default App;