import { CashMachine } from './cash-machine';

const amountEnvVariable = process.env.amount;
const amount = amountEnvVariable ? parseInt(amountEnvVariable) : null;

const AVAILABLE_NOTES = [ 20, 50, 100, 10 ];
const cashMachine = new CashMachine(AVAILABLE_NOTES);

console.log(cashMachine.findDeliveryNotesAsArray(amount));
