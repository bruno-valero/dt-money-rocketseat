import { Header } from '@/components/Header'
import { Summary } from '@/components/Summary'
import { useTransactionProvider } from '@/providers/TransactionsProvider'
import { currencyFormatter, dateFormatter } from '@/utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const {
    transactionState: { transactions },
  } = useTransactionProvider()

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td>
                  <PriceHighlight variant={item.type}>
                    {item.type === 'outcome' && '- '}
                    {currencyFormatter.format(item.price)}
                  </PriceHighlight>
                </td>
                <td>{item.category}</td>
                <td>{dateFormatter.format(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
