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
      hint: false,
      highlights: [],
    };
    this.cycleChoices = this.cycleChoices.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.getGame = this.getGame.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.changePieces = this.changePieces.bind(this);
    this.giveHint = this.giveHint.bind(this);
  }

  componentDidMount() {
    this.getGame();
  }

  componentDidUpdate() {
    let classList = document.body.classList;
    if (this.state.pieces === 'fruit') {
      if (classList.length === 0) {
        $('body').toggleClass('fruitmode');
      }
    } else {
      if (classList.length === 1) {
        $('body').toggleClass('fruitmode');
      }
    }
    if (this.state.highlights.length > 0) {
      const highlights = this.state.highlights;
      for (let i = 0; i < highlights.length; i++) {
        console.log('current highlight', highlights[i]);
        // turn on hightlights
        $(`.${highlights[i]}`).toggleClass('highlight');
      }
    }
    if(this.state.hint === false) {
      $('.highlight').removeClass('highlight');
    }
  }

  // function to retrieve games from API
  getGame() {
    $('#banner').text('');
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
    let rows = this.checkRows(this.checkMatrix);
    let cols = this.checkCols(this.checkMatrix);
    let squares = this.checkSquares(this.checkMatrix);
    if (rows === false || cols === false || squares === false) {
      solved = false;
    }
    if (solved === true) {
      // do something
      $('#banner').text('Congrats! You did it! Play again?');
    } else {
      // do something else
      $('#banner').text('Whoops, you don\'t quite have it right...');
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
      for (let j = 0; j < row.length; j++) {
        const square = row[j];
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

  checkRows(cb) {
    let matrix = [[], [], [], [], [], [], [], [], []];
    let board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const squareVal = row[j].value;
        matrix[i].push(squareVal);
      }
    }
    let solved = cb(matrix);
    //console.log('ROW', solved);
    return solved;
  }

  checkCols(cb) {
    let matrix = [[], [], [], [], [], [], [], [], []];
    let board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      for (let j = 0; j < row.length; j++) {
        const squareVal = board[j][i].value;
        matrix[i].push(squareVal);
      }
    }
    let solved = cb(matrix);
    //console.log('COL', solved);
    return solved;
  }

  checkSquares(cb) {
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
    let solved = cb(matrix);
    //console.log('SQUARES', solved);
    return solved;
  }

  storeConflicts(matrix) {
    let conflicts = [];
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
      for (let j = 0; j < row.length; j++) {
        const square = row[j];
        counter[square]++;
      }
      if (counter[1] !== 1 || counter[2] !== 1 ||  counter[3] !== 1 ||
        counter[6] !== 1 || counter[5] !== 1 || counter[4] !== 1 ||
        counter[7] !== 1 || counter[8] !== 1 || counter[9] !== 1) {
          conflicts.push(i)
      }
    }
    return conflicts;
  }

  // function to provide hint
  giveHint() {
    // if no hint active:
    if (this.state.hint === false) {
      let conflicts = {};
      // find all rows/cols/square with conflicts
      if (this.checkRows(this.checkMatrix) === false) {
        // store conflicts
        conflicts.rows = this.checkRows(this.storeConflicts);
      }
      if (this.checkCols(this.checkMatrix) === false) {
        // store conflicts
        conflicts.cols = this.checkCols(this.storeConflicts);
      }
      if (this.checkSquares(this.checkMatrix) === false) {
        // store conflicts
        conflicts.squares = this.checkSquares(this.storeConflicts);
      }
      // depending on difficulty, pick a percentage of those conflicts
      let skip;
      if (this.state.difficulty === 'easy' || this.state.difficulty === 'Easy') {
        skip = 1;
      } else if (this.state.difficulty === 'medium' || this.state.difficulty === 'Medium') {
        skip = 2;
      } else {
        skip = 5;
      }
      let chosenConflicts = [];
      if (conflicts.rows !== undefined) {
        for (let i = 0; i < conflicts.rows.length; i += skip) {
          chosenConflicts.push('row' + conflicts.rows[i]);
        }
      }
      if (conflicts.cols !== undefined) {
        for (let i = 0; i < conflicts.cols.length; i += skip) {
          chosenConflicts.push('col' + conflicts.cols[i]);
        }
      }
      if (conflicts.squares !== undefined) {
        for (let i = 0; i < conflicts.squares.length; i += skip) {
          chosenConflicts.push('square' + conflicts.squares[i]);
        }
      }
      console.log('CONFLICTS', chosenConflicts);
      this.setState({hint: true, highlights: chosenConflicts})
      //if hint is already active:
    } else {
      this.setState({hint: false, highlights: []})
      // turn off highlights
    }
  }

  //function to change piece set
  changePieces(e) {
    let pieceStyle = e.target.attributes.id.value;
    console.log('CLICKED', pieceStyle);
    this.setState({pieces: pieceStyle});
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
        <div id="info">
          <h1 id="title">Sudoku</h1>
          <h3 id="banner"></h3>
        </div>
        <Board board={this.state.board} pieces={this.state.pieces}  pieceClick={this.cycleChoices} />
        <Settings solved={this.checkSolution} newPuzzle={this.getGame} difficulty={this.changeDifficulty} pieces={this.changePieces} hint={this.giveHint} />
      </div>
    )
  }
};

export default App;