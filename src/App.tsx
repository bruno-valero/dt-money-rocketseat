import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/gobal'
import { Transactions } from './pages/Transactions'
import { TransactionProvider } from './providers/TransactionsProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  )
}
