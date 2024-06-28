import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback } from 'react'
import { useTransactionProvider } from '@/providers/TransactionsProvider'

export function SearchForm() {
  const formSchema = z.object({
    search: z.string().min(1),
  })
  type FormSchema = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const {
    callbacks: { fetchTransactions },
  } = useTransactionProvider()

  const handleSearchTransactions = useCallback(
    async ({ search }: FormSchema) => {
      await fetchTransactions(search)
    },
    [fetchTransactions],
  )

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por Transações"
        {...register('search')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}
