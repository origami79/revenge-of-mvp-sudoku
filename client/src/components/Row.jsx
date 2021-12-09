import React from 'react';

import Square from './Square.jsx';

class Row extends React.Component {

  render(props) {
    const rowNum = 'row' + this.props.row;
    return (
      <span id={rowNum} className="row">
        {this.props.rowData.map((square, index) => {
          return <Square key={index} square={square} row={this.props.row} col={index} pieces={this.props.pieces} pieceClick={this.props.pieceClick} />
        })}
      </span>
    )
  }
};

export default Row;