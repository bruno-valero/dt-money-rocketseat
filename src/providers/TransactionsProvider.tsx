import { api } from '@/lib/axios'
import { AxiosResponse } from 'axios'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {
  Transaction,
  TransactionState,
  transactionReducer,
} from './reducers/transactionReducer'
import {
  addTransactionAction,
  setAllTransactionsAction,
} from './reducers/transactionReducer/actions'

export type TransactionJson = {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

type TransactionProvider = {
  transactionState: TransactionState
  callbacks: {
    fetchTransactions(query?: string): Promise<void>
    addTransaction(transaction: Transaction): void
  }
}

const TransactionProviderInitial = createContext({} as TransactionProvider)

interface TransactionProviderProps {
  children: ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, dispatch] = useReducer(transactionReducer, {
    transactions: [],
    summary: {
      totalIncome: 0,
      totalOutcome: 0,
      total: 0,
    },
  })
  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = (await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })) as AxiosResponse<TransactionJson[], unknown>

    const transactions: Transaction[] = data.map((item) => {
      const transaction: Transaction = {
        ...item,
        createdAt: new Date(item.createdAt),
      }

      return transaction
    })

    dispatch(setAllTransactionsAction(transactions))
  }, [])

  const addTransaction = useCallback((transaction: Transaction) => {
    dispatch(addTransactionAction(transaction))
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const data: TransactionProvider = {
    transactionState: transactions,
    callbacks: {
      fetchTransactions,
      addTransaction,
    },
  }
  return (
    <TransactionProviderInitial.Provider value={data}>
      {children}
    </TransactionProviderInitial.Provider>
  )
}

// eslint-disable-next-line
export const useTransactionProvider = () =>
  useContext(TransactionProviderInitial)
