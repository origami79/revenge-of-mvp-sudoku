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
    let piece = <span className="piece">0</span>

    return (
      <span id={coords} className={`${rowNum} ${colNum} ${squareNum} square`}>
        <span id={`inner${coords}`} className={`${rowNum} ${colNum} ${squareNum} inner-square`}>
        {piece}
        </span>
      </span>
    )
  }
};

export default Square;