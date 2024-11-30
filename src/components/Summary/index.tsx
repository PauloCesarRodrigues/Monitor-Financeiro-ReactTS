import { useContext } from "react";
import { SummaryCard, SummaryContainer } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Summary(){

  const { transactions } = useContext(TransactionsContext)
  
  const summary = transactions.reduce(
      (ac, transaction)=>{

        if(transaction.type === 'income'){
          ac.income += transaction.price;
          ac.total += transaction.price;
        } else{
          ac.outcome += transaction.price
          ac.total -= transaction.price;
        }

        return ac
      },
      {
        income: 0,
        outcome: 0,
        total:0}
    )

  return(
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#88b37e"/>
        </header>

          <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68"/>
        </header>
        
          <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff"/>
        </header>
        
          <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}