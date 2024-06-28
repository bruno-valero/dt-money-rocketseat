import { Transaction } from '.'

export enum ActionTypes {
  SET_ALL_TRANSACTIONS = 'SET_ALL_TRANSACTIONS',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
}

export function setAllTransactionsAction(data: Transaction[]) {
  return {
    type: ActionTypes.SET_ALL_TRANSACTIONS,
    payload: {
      data,
    },
  }
}

export function addTransactionAction(data: Transaction) {
  return {
    type: ActionTypes.ADD_TRANSACTION,
    payload: {
      data,
    },
  }
}
