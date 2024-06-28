import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { SummaryCard, SummaryContainer } from './styles'
import { useTransactionProvider } from '@/providers/TransactionsProvider'
import { currencyFormatter } from '@/utils/formatter'

export function Summary() {
  const {
    transactionState: {
      summary: { totalIncome, totalOutcome, total },
    },
  } = useTransactionProvider()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{currencyFormatter.format(totalIncome)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{currencyFormatter.format(totalOutcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{currencyFormatter.format(total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
