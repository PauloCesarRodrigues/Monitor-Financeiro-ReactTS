import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SeachForm";
import { PriceHighlight, TransactionsContainer, TrasactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions(){

  const  transactions  = useContextSelector(TransactionsContext, (context)=> context.transactions)

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
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)} 
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            )
          })}
        </tbody>
      </TrasactionsTable>
    </TransactionsContainer>
    </div>
  )
}