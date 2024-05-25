import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A Red Mixer",
    amount: 30.33,
    date: new Date("2024-05-19"),
  },
  {
    id: "e2",
    description: "A pair of shoese",
    amount: 40.66,
    date: new Date("2024-05-23"),
  },
  {
    id: "e3",
    description: "A book",
    amount: 30.66,
    date: new Date("2024-05-22"),
  },
  {
    id: "e4",
    description: "Some bananas",
    amount: 30.66,
    date: new Date("2021-12-26"),
  },
  {
    id: "e5",
    description: "Another Book",
    amount: 30.66,
    date: new Date("2021-12-29"),
  },
  {
    id: "e6",
    description: "A Red Mixer",
    amount: 30.33,
    date: new Date("2021-12-19"),
  },
  {
    id: "e7",
    description: "A pair of shoese",
    amount: 40.66,
    date: new Date("2021-01-23"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 30.66,
    date: new Date("2021-12-25"),
  },
  {
    id: "e9",
    description: "Some bananas",
    amount: 30.66,
    date: new Date("2021-12-26"),
  },
  {
    id: "e10",
    description: "Another Book",
    amount: 30.66,
    date: new Date("2021-12-29"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
