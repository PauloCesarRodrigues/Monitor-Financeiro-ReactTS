import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary(){

  const transactions  = useContextSelector(TransactionsContext, (context)=> context.transactions)
  
  const summary = useMemo(()=>{
    return transactions.reduce(
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
  }, [transactions])
  return summary
}