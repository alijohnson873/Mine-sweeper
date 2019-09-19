let gameField2DArray = [];
let numberOfColumns = 10;
let numberOfRows = 3;
let numberOfMines = 10;
const wrapper = document.getElementById("fieldWrapper");
const columnInput = document.getElementById("columnInput");
const rowInput = document.getElementById("rowInput");
const mineInput = document.getElementById("mineInput");

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

generateRandomIndexNumber = numberOfItemsInArray =>
  Math.floor(Math.random() * numberOfItemsInArray);

doesFieldHaveMine = field => (field === "X" ? true : false);

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

updateClueArrayLoop = array => {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      if (doesFieldHaveMine(array[i][j])) {
        findAdjacentFieldsAndUpdateClue(array, i, j);
      }
    }
  }
};

fieldRowHTML = rowNumber => {
  let htmlRow = ``;
  for (let i = 0; i < numberOfColumns; i++) {
    htmlRow += `<div><p>${gameField2DArray[rowNumber][i]}<p></div>`;
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

handleFormSubmit = () => {
  gameField2DArray = [];
  numberOfColumns = columnInput.value;
  numberOfRows = rowInput.value;
  numberOfMines = mineInput.value;
  if (numberOfMines > numberOfRows * numberOfColumns) {
    alert(
      `You have entered more mines than fields available! Maximum ${numberOfRows *
        numberOfColumns} mines allowed.`
    );
    mineInput.value = "";
  } else {
    createEmptyField2DArray();
    insertMines();
    updateClueArrayLoop(gameField2DArray);
    wrapper.innerHTML = fieldArrayHTML();
    colorFieldItems();
  }
};

colorFieldItems = () => {
  wrapper.childNodes.forEach(element => {
    if (element.innerText === "X") {
      element.style.color = "red";
    } else if (element.innerText === "1") {
      element.style.color = "darkblue";
    } else if (element.innerText === "2") {
      element.style.color = "blue";
    } else if (element.innerText === "3") {
      element.style.color = "purple";
    } else if (element.innerText === "4") {
      element.style.color = "indigo";
    } else if (element.innerText === "5") {
      element.style.color = "darkorange";
    } else if (element.innerText === "6") {
      element.style.color = "coral";
    } else if (element.innerText === "7") {
      element.style.color = "orangered";
    } else if (element.innerText === "8"){
      element.style.color = "darkred"
    }
  });
};

