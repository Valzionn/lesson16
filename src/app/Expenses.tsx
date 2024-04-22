import { useContext, useEffect, useState } from "react";
import { ExpenseType, api } from "./api";
import { AdminRightContext, AdminRightsProvider } from "./AdminRightsContext";

/*
  context name should be AdminRightsContext
*/

const AdminButton = () => {
  const context = useContext(AdminRightContext)
  const toggleCanDelete = context?.toggleCanDelete

  return (
    <button onClick={toggleCanDelete}>
      Toggle admin mode
    </button>
  ) 
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
  const context = useContext(AdminRightContext)
  const canDelete = context?.canDelete
  // Use the context
  // If the context is true, show button, else hide the button
  return (
    <p key={expense.id}>
      {canDelete && (
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
    <AdminRightsProvider>
    <div className="m-10">
      <HeaderComponent />
      {expenses.map((expense) => (
        <Expense expense={expense} key={expense.id} />
      ))}
    </div>
    </AdminRightsProvider>
  );
};

export default Expenses;
