import React from 'react';

import Row from './Row.jsx';

class Board extends React.Component {

  render(props) {
    return (
      <div id="Board">
        <div id="inner-board">
        {this.props.board.map((row, index) => {
          return <Row key={index} rowData={row} row={index} pieces={this.props.pieces} pieceClick={this.props.pieceClick} />
        })}
        </div>
      </div>
    )
  }
};

export default Board;

