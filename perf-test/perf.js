const MAX_ARRAY_SIZE = Math.pow(2, 32);
const ERR_INVALID_ARGUMENT_EXCEPTION = 'InvalidArgumentException';
const ERR_NOTE_UNAVAILABLE_EXCEPTION = 'NoteUnavailableException';


// PERF TESTING
const argsNotes = [20, 50, 100, 10];
const sortedNotes = argsNotes.sort((a, b) => a < b ? 1: -1);

const balanceToTest = 4294967200;
let timeStart, timeEnd;

timeStart = Date.now();
findDeliveryNotesFaster(sortedNotes, balanceToTest);
timeEnd = Date.now();
console.log('findDeliveryNotesFaster() - Execution time: ', timeEnd - timeStart, 'ms');

timeStart = Date.now();
findDeliveryNotes(sortedNotes, balanceToTest);
timeEnd = Date.now();
console.log('findDeliveryNotes() - Execution time: ', timeEnd - timeStart, 'ms');

//////////////
function findDeliveryNotesFaster(availableNotes, balance) {
  if (!balance) {
    return [];
  }

  if (!isBalanceValid(balance)) {
    throw new Error(ERR_INVALID_ARGUMENT_EXCEPTION);
  }

  if (balance % availableNotes[availableNotes.length - 1] !== 0) {
    throw new Error(ERR_NOTE_UNAVAILABLE_EXCEPTION);
  }

  const deliveryNotes = availableNotes.reduce((acc, curr) => {
    acc.set(curr, 0);
    return acc;
  }, new Map());

  let i = 0;
  let note;
  let rest = balance;

  while (note = availableNotes[i]) {
    const divisionResult = rest / note;
    const absResult = Math.floor(divisionResult);
    rest = (divisionResult - absResult) * note;

    if (absResult > MAX_ARRAY_SIZE) {
      throw new Error(ERR_INVALID_ARGUMENT_EXCEPTION);
    }

    if (absResult > 0) {
      deliveryNotes.set(note, deliveryNotes.get(note) + absResult);
      if (rest === 0) {
        break;
      }
    }
    i++;
  }

  return deliveryNotesToArray(deliveryNotes);
}

function deliveryNotesToArray(deliveryNotes) {
  let arr = [];
  for (let item of deliveryNotes) {
    let [note, times] = item;
    if (times > 0) {
      arr = arr.concat(Array(times).fill(note));
    }
  }

  return arr;
}

function findDeliveryNotes(availableNotes, balance) {
  if (!balance) {
    return [];
  }

  if (!isBalanceValid(balance)) {
    throw new Error(ERR_INVALID_ARGUMENT_EXCEPTION);
  }

  if (balance % availableNotes[availableNotes.length - 1] !== 0) {
    throw new Error(ERR_NOTE_UNAVAILABLE_EXCEPTION);
  }

  const sortedNotes = availableNotes.sort((a, b) => a < b);
  const deliveryNotes = [];
  let amount = balance;

  while (amount > 0) {
    const highestNote = sortedNotes.find(el => el <= amount);
    deliveryNotes.push(highestNote);
    amount -= highestNote;
  }

  return deliveryNotes;
}

function isBalanceValid(balance) {
  return balance > 0 && balance <= Number.MAX_SAFE_INTEGER;
}


