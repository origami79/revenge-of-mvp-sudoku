import React from 'react';

const pieceSets = {
  number: [],
  color: [],
  fruit: [],
  animal: []
};

const squareAssignment = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9]
];

class Square extends React.Component {

  render(props) {
    const rowNum = 'row' + this.props.row;
    const colNum = 'col' + this.props.col;
    const squareNum = 'square' + squareAssignment[this.props.row][this.props.col];
    const coords = rowNum + colNum;

    // let piece = pieceSets[this.props.pieces][this.props.square];
    let piece = <div className="piece">{this.props.square.value}</div>

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