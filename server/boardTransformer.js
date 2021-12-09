const boardTransformer = function(boardString) {
  let rawBoard = boardString.split('');
  let formattedBoard = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < rawBoard.length; i++) {
    const value = rawBoard[i];
    let object = {};
    if (value === '.') {
      object.value = 0;
      object.changeable = true;
    } else {
      object.value = value;
      object.changeable = false;
    }
    if (i < 9) {
      formattedBoard[0].push(object);
    } else if (i < 18) {
      formattedBoard[1].push(object);
    } else if (i < 27) {
      formattedBoard[2].push(object);
    } else if (i < 36) {
      formattedBoard[3].push(object);
    } else if (i < 45) {
      formattedBoard[4].push(object);
    } else if (i < 54) {
      formattedBoard[5].push(object);
    } else if (i < 63) {
      formattedBoard[6].push(object);
    } else if (i < 72) {
      formattedBoard[7].push(object);
    } else {
      formattedBoard[8].push(object);
    }
  }
  return formattedBoard;
}

module.exports = boardTransformer;