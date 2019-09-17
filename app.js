const gameField2DArray = [];
let numberOfColumns = 10;
let numberOfRows = 10;
let numberOfMines = 10;
const wrapper = document.getElementById("fieldWrapper");
const columnInput = document.getElementById("columnInput");
const rowInput = document.getElementById("rowInput");
const mineInput = document.getElementById("mineInput");

handleFormSubmit = () => {
  numberOfColumns = columnInput.value;
  numberOfRows = rowInput.value;
  numberOfMines = mineInput.value;
  createEmptyField2DArray();
  insertMines();
  loopThrough2DArray(gameField2DArray);
  wrapper.innerHTML = fieldArrayHTML();
  columnInput.value = "";
  rowInput.value = "";
  mineInput.value = "";
  
}

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
  if (fieldValue === "") {
    return 1;
  } else if (typeof fieldValue === "number") {
    return (fieldValue += 1);
  } else {
    return "X";
  }
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
  if (isRowIndexValid(i - 1) && isColumnIndexValid(j + 1)) {
    array[i - 1][j + 1] = updateClue(array[i - 1][j + 1]);
  }
  if (isRowIndexValid(i) && isColumnIndexValid(j - 1)) {
    array[i][j - 1] = updateClue(array[i][j - 1]);
  }
  if (isRowIndexValid(i) && isColumnIndexValid(j + 1)) {
    array[i][j + 1] = updateClue(array[i][j + 1]);
  }
  if (isRowIndexValid(i + 1) && isColumnIndexValid(j - 1)) {
    array[i + 1][j - 1] = updateClue(array[i + 1][j - 1]);
  }
  if (isRowIndexValid(i + 1) && isColumnIndexValid(j)) {
    array[i + 1][j] = updateClue(array[i + 1][j]);
  }
  if (isRowIndexValid(i + 1) && isColumnIndexValid(j + 1)) {
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
loopThrough2DArray(gameField2DArray);

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
