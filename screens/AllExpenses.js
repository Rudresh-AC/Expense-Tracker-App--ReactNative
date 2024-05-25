import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context"; // Fix: Ensure this is imported correctly

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  if (!expensesCtx) {
    console.log("ExpensesContext is not available");
    return null;
  }

  console.log("expensesCtx=", expensesCtx);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registred expenses found!"
    />
  );
}
