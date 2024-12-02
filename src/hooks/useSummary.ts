import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary(){

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
    total:0
  }
)
  return summary
}