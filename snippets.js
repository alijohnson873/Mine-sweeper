findAdjacentFieldsAndUpdateClue = (array, i, j) => {
    array[i - 1][j - 1] = updateClue(array[i - 1][j - 1])
    array[i - 1][j] = updateClue(array[i - 1][j])
    array[i - 1][j + 1] = updateClue(array[i - 1][j + 1])
    array[i][j - 1] = updateClue(array[i][j - 1])
    array[i][j + 1] = updateClue(array[i][j + 1])
    array[i + 1][j - 1] = updateClue(array[i + 1][j - 1])
    array[i + 1][j] = updateClue(array[i + 1][j])
    array[i + 1][j + 1] = updateClue(array[i + 1][j + 1])
  }

  checkColumnIndexIsInValidRange = j => {
    if (j >= 0 && j < numberOfColumns) {
      return true;
    } else {
      return false;
    }
  };
  

  checkRowIndexIsInValidRange = i => {
    if (i >= 0 && i < numberOfRows) {
      return true;
    } else {
      return false;
    }
  };

  //this doesn't check both at same time so best not to use type of
// isArrayIndexValid = (array, i, j) =>
//   array[i] === undefined && field[j] === undefined ? false : true;
