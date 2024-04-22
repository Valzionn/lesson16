import { useEffect, useState } from "react";
import { ExpenseType, api } from "./api";

/*
  context name should be AdminRightsContext
*/

const AdminButton = () => {
  /*
    use context to manipulate the context itself, by toggling whether it's admin mode or not
  */
  return <button>Toggle admin mode</button>;
};

const HeaderComponent = () => {
  return (
    <div>
      {/* Some components within the header of the page */}
      <AdminButton />
    </div>
  );
};

const Expense = ({ expense }: { expense: ExpenseType }) => {
  // Use the context
  // If the context is true, show button, else hide the button
  const contextValue = true;
  return (
    <p key={expense.id}>
      {contextValue && (
        <button
          onClick={() => {
            console.log("delete, should be hidden when context is toggled off");
          }}
        >
          Delete
        </button>
      )}
      {expense.name}: {expense.cost}
    </p>
  );
};
const Expenses = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>();

  const fetchExpenses = async () => {
    const fetchedExpenses = await api.getExpenses();
    setExpenses(fetchedExpenses);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses) {
    return <p>Loading...</p>;
  }

  const handleDelete = (id: number) => {
    api.deleteExpense(id);
  };

  return (
    // <---1 Wrap this component with a context
    <div className="m-10">
      <HeaderComponent />
      {expenses.map((expense) => (
        <Expense expense={expense} key={expense.id} />
      ))}
    </div>
    // 1--->
  );
};

export default Expenses;
