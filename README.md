# Cash Machine

## The Problem
Develop a solution that simulate the delivery of notes when a client does a withdraw in a cash
machine.

The basic requirements are the follow:

* Always deliver the lowest number of possible notes.
* It’s possible to get the amount requested with available notes.
* The client balance is infinite.
* Amount of notes is infinite.
* Available notes $100,00; $50,00; $20,00; $10,00.

## Expected result
Entry: 30.00  
Result: [20.00, 10.00]  

Entry: 80.00  
Result: [50.00, 20.00, 10.00]  

Entry: 125.00  
Result: throw NoteUnavailableException  

Entry: -130.00  
Result: throw InvalidArgumentException  

Entry: NULL  
Result: [Empty Set]  

## Script usage

### Prerequisites
Please install `yarn` package manager first. Then use command in project root: `yarn` to install project dependencies.

### Execute script
Pass amount of money to calculate notes to withdraw in cash machine by passing `amount` parameter:  
`amount=300 yarn cash-machine`

### Run tests
Type `yarn test` to execute test suite.

### Performance tests
Type `yarn perf-test` to execute and compare two different algorithms.  
