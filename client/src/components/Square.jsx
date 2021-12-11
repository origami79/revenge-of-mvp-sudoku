import React from 'react';

import pieces from './Pieces.jsx';

const squareAssignment = [
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8]
];

class Square extends React.Component {

  render(props) {
    const rowNum = 'row' + this.props.row;
    const colNum = 'col' + this.props.col;
    const squareNum = 'square' + squareAssignment[this.props.row][this.props.col];
    const coords = rowNum + colNum;

    const value = this.props.square.value;
    // let piece = pieces['color'][this.props.square.value];
    let piece = pieces[this.props.pieces][this.props.square.value];

    if (this.props.square.changeable === true) {
      return (
        <div className={`${rowNum} ${colNum} ${squareNum} square changeable`} onClick={this.props.pieceClick}>
          <div id={coords} className={`${rowNum} ${colNum} ${squareNum} inner-square`}>
            {piece}
          </div>
      </div>
      )
    } else {

      return (
        <div className={`${rowNum} ${colNum} ${squareNum} square preset`} >
          <div id={coords} className={`${rowNum} ${colNum} ${squareNum} inner-square`}>
            {piece}
          </div>
        </div>
      )
    }

  }
};

export default Square;