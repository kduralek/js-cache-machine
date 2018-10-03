import 'mocha';
import { expect } from 'chai';

import { CashMachine, ERR_INVALID_ARGUMENT_EXCEPTION, ERR_NOTE_UNAVAILABLE_EXCEPTION } from './cash-machine';

const AVAILABLE_NOTES = [ 20, 50, 100, 10 ];
const cashMachine = new CashMachine(AVAILABLE_NOTES);

it('should return collection of notes', () => {
  expect(cashMachine.findDeliveryNotesAsArray(30)).to.deep.equal([ 20, 10 ]);
  expect(cashMachine.findDeliveryNotesAsArray(80)).to.deep.equal([ 50, 20, 10 ]);
  expect(cashMachine.findDeliveryNotesAsArray(270)).to.deep.equal([ 100, 100, 50, 20 ]);
});

it('should return empty collection', () => {
  expect(cashMachine.findDeliveryNotesAsArray(undefined)).to.deep.equal([]);
  expect(cashMachine.findDeliveryNotesAsArray(null)).to.deep.equal([]);
  expect(cashMachine.findDeliveryNotesAsArray(NaN)).to.deep.equal([]);
});

it('should throw exception when amount entry is invalid', () => {
  expect(cashMachine.findDeliveryNotesAsArray.bind(cashMachine, -130.00)).to.throw(ERR_INVALID_ARGUMENT_EXCEPTION);
  expect(cashMachine.findDeliveryNotesAsArray.bind(cashMachine, 'ffff')).to.throw(ERR_INVALID_ARGUMENT_EXCEPTION);
});

it('should throw exception when cash machine has no notes for given amount ', () => {
  expect(cashMachine.findDeliveryNotesAsArray.bind(cashMachine, 125)).to.throw(ERR_NOTE_UNAVAILABLE_EXCEPTION);
  expect(cashMachine.findDeliveryNotesAsArray.bind(cashMachine, 11)).to.throw(ERR_NOTE_UNAVAILABLE_EXCEPTION);
});
