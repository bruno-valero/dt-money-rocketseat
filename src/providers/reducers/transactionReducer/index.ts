import { ActionTypes } from './actions'

export type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: Date
}

export type TransactionState = {
  transactions: Transaction[]
  summary: {
    totalIncome: number
    totalOutcome: number
    total: number
  }
}

type TransactionAction = {
  type: keyof typeof ActionTypes
  payload: {
    data: unknown
  }
}

export function transactionReducer(
  state: TransactionState,
  action: TransactionAction,
) {
  function getSummary(transactions: Transaction[]) {
    const totalIncome = transactions.reduce((acc, item) => {
      if (item.type === 'income') {
        acc += item.price
      }
      return acc
    }, 0)
    const totalOutcome = transactions.reduce((acc, item) => {
      if (item.type === 'outcome') {
        acc += item.price
      }
      return acc
    }, 0)

    const total = totalIncome - totalOutcome

    return {
      totalIncome,
      totalOutcome,
      total,
    }
  }

  switch (action.type) {
    case 'SET_ALL_TRANSACTIONS': {
      const transactions = action.payload.data as Transaction[]

      return <TransactionState>{
        transactions,
        summary: getSummary(transactions),
      }
    }

    case 'ADD_TRANSACTION': {
      const transactions = [
        ...state.transactions,
        action.payload.data as Transaction,
      ]
      return <TransactionState>{
        transactions,
        summary: getSummary(transactions),
      }
    }
    default:
      return state
  }
}
