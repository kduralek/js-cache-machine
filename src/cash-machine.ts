const MAX_ARRAY_SIZE = Math.pow(2, 32);

export const ERR_INVALID_ARGUMENT_EXCEPTION = 'InvalidArgumentException';
export const ERR_NOTE_UNAVAILABLE_EXCEPTION = 'NoteUnavailableException';

export class CashMachine {
  availableNotes: number[];

  constructor(availableNotes: number[]) {
    this.availableNotes = availableNotes.sort((a, b) => a < b ? 1 : -1);
  }

  findDeliveryNotes(amount: number): Map<number, number> {
    if (!amount) {
      return new Map();
    }

    if (!this.isAmountValid(amount)) {
      throw new Error(ERR_INVALID_ARGUMENT_EXCEPTION);
    }

    const availableNotes = this.availableNotes;

    if (amount % availableNotes[ availableNotes.length - 1 ] !== 0) {
      throw new Error(ERR_NOTE_UNAVAILABLE_EXCEPTION);
    }

    const deliveryNotes = availableNotes.reduce((acc, curr) => {
      acc.set(curr, 0);
      return acc;
    }, new Map());

    let i = 0;
    let note;
    let rest = amount;

    while (note = availableNotes[ i ]) {
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

    return deliveryNotes;
  }

  findDeliveryNotesAsArray(amount: number): number[] {
    return this.deliveryNotesToArray(this.findDeliveryNotes(amount));
  }

  deliveryNotesToArray(deliveryNotes): number[] {
    let arr: number[] = [];
    deliveryNotes.forEach((times: number, note: number) => {
      if (times > 0) {
        arr = arr.concat(new Array<number>(times).fill(note));
      }
    });
    return arr;
  }

  isAmountValid(amount): boolean {
    return amount > 0 && amount <= Number.MAX_VALUE;
  }
}
