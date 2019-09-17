const gameField2DArray = [];
const numberOfColumns = 10;
const numberOfRows = 10;
const numberOfMines = 20;
const wrapper = document.getElementById("fieldWrapper");

createEmptyRow = () => {
  let rowArray = [];
  for (let i = 0; i < numberOfColumns; i++) {
    rowArray.push("")[i];
  }
  return rowArray;
};

createEmptyField2DArray = () => {
  for (let i = 0; i < numberOfRows; i++) {
    gameField2DArray.push(createEmptyRow())[i];
  }
};
createEmptyField2DArray();

generateRandomIndexNumber = numberOfItemsInArray =>
  Math.floor(Math.random() * numberOfItemsInArray);

doesFieldHaveMine = array => (array === "X" ? true : false);

insertMines = () => {
  let minesAdded = 0;
  while (minesAdded < numberOfMines) {
    let randomRowIndex = generateRandomIndexNumber(numberOfRows);
    let randomColumnIndex = generateRandomIndexNumber(numberOfColumns);
    if (
      !doesFieldHaveMine(gameField2DArray[randomRowIndex][randomColumnIndex])
    ) {
      gameField2DArray[randomRowIndex][randomColumnIndex] = "X";
      minesAdded += 1;
    }
  }
};
insertMines();

updateClue = fieldValue => {
  return fieldValue ? (fieldValue += 1) : 1;
};

isRowIndexValid = i => (i >= 0 && i < numberOfRows ? true : false);
isColumnIndexValid = j => (j >= 0 && j < numberOfColumns ? true : false);

findAdjacentFieldsAndUpdateClue = (array, i, j) => {
  if (isRowIndexValid(i - 1) && isColumnIndexValid(j - 1)) {
    array[i - 1][j - 1] = updateClue(array[i - 1][j - 1]);
  } 
  if (isRowIndexValid(i - 1) && isColumnIndexValid(j)) {
    array[i - 1][j] = updateClue(array[i - 1][j]);
  } 
  if (isRowIndexValid(i - 1) && isColumnIndexValid(j+1)) {
    array[i - 1][j + 1] = updateClue(array[i - 1][j + 1]);
  } 
  if (isRowIndexValid(i) && isColumnIndexValid(j-1)) {
    array[i][j - 1] = updateClue(array[i][j - 1]);
  } 
  if (isRowIndexValid(i) && isColumnIndexValid(j+1)) {
    array[i][j + 1] = updateClue(array[i][j + 1]);
  } 
  if (isRowIndexValid(i+1) && isColumnIndexValid(j-1)) {
    array[i + 1][j - 1] = updateClue(array[i + 1][j - 1]);
  }
  if (isRowIndexValid(i+1) && isColumnIndexValid(j)) {
    array[i + 1][j] = updateClue(array[i + 1][j]);
  }
  if (isRowIndexValid(i+1) && isColumnIndexValid(j+1)) {
     array[i + 1][j + 1] = updateClue(array[i + 1][j + 1]);
  } 
};

loopThrough2DArray = array => {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      if (doesFieldHaveMine(array[i][j])) {
        console.log(i, j);
        findAdjacentFieldsAndUpdateClue(array, i, j);
      }
    }
  }
};

//uncomment function below to see clue value, n.b. only works when no edge case errors.
loopThrough2DArray(gameField2DArray)

fieldRowHTML = rowNumber => {
  let htmlRow = ``;
  for (let i = 0; i < numberOfColumns; i++) {
    htmlRow += `<div>${gameField2DArray[rowNumber][i]}</div>`;
  }
  htmlRow += `<br>`;
  return htmlRow;
};
fieldArrayHTML = () => {
  let html = ``;
  for (let i = 0; i < numberOfRows; i++) {
    html += fieldRowHTML(i);
  }
  return html;
};

wrapper.innerHTML = fieldArrayHTML();
