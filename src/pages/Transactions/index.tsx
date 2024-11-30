import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SeachForm";
import { PriceHighlight, TransactionsContainer, TrasactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";

interface Transaction{
  id: number,
  description: string,
  type: 'income' | 'outcome',
  price: number,
  category: string,
  createdAt: string
}

export function Transactions(){

  const { transactions } = useContext(TransactionsContext)

  return(
    <div>
      <Header />
      <Summary />

    <TransactionsContainer>
      <SearchForm/>
      
      <TrasactionsTable>
        <tbody>
          {transactions.map(transaction =>{
            return(
              <tr key={transaction.id}>
                <td width="50%"> {transaction.description} </td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            )
          })}
        </tbody>
      </TrasactionsTable>
    </TransactionsContainer>
    </div>
  )
}