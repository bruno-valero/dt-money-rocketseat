import { api } from '@/lib/axios'
import {
  TransactionJson,
  useTransactionProvider,
} from '@/providers/TransactionsProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { AxiosResponse } from 'axios'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { Transaction } from '@/providers/reducers/transactionReducer'

export function NewTransactionModal() {
  const formSchema = z.object({
    description: z.string().min(1),
    price: z.coerce.number(),
    category: z.string(),
    type: z.enum(['outcome', 'income']),
  })
  type FormSchema = z.infer<typeof formSchema>

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const {
    callbacks: { addTransaction },
  } = useTransactionProvider()

  const handleCreateNewTransaction = useCallback(
    async (data: FormSchema) => {
      const { category, description, price, type } = data
      const { data: dataResponse } = (await api.post(
        '/transactions',
        {
          category,
          description,
          price,
          type,
          createdAt: new Date(),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )) as AxiosResponse<TransactionJson | null, unknown>

      if (dataResponse) {
        const transaction: Transaction = {
          ...dataResponse,
          createdAt: new Date(dataResponse.createdAt),
        }
        addTransaction(transaction)
      }

      reset()
    },
    [reset, addTransaction],
  )

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price')}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => {
              return (
                <TransactionType onValueChange={onChange} value={value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
        <CloseButton>
          <X size={24} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  )
}
