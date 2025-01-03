 
/* eslint-disable react-refresh/only-export-components */

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction{
  id: number,
  description: string,
  type: 'income' | 'outcome',
  price: number,
  category: string,
  createdAt: string
}

interface CreateTransactionInput{
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType{
  transactions : Transaction[];
  fetchTransactions: (query?: string)=> Promise<void>
  createTransactions: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps{
  children : ReactNode;
}



export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children } : TransactionsProviderProps){

  const [transactions, setTransatcions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async (query?: string)=>{

      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })
  
      setTransatcions(response.data)
    },
    []  
  );

  const createTransactions = useCallback(
    async (data: CreateTransactionInput)=>{
      const {category, description, price, type} = data;
  
      const response = await api.post('transactions',{
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      })
  
      setTransatcions(state => [response.data, ...state])
    },
    []
  )

  useEffect(()=>{
    fetchTransactions()
  },[fetchTransactions])

  return(
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactions }}> 
      {children}
    </TransactionsContext.Provider>
  )
}