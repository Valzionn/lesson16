import { useContext, useEffect, useState } from "react";
import { ExpenseType, api } from "./api";
import { AdminRightContext, AdminRightsProvider } from "./AdminRightsContext";

const AdminButton = () => {
  const context = useContext(AdminRightContext)
  const toggleCanDelete = context?.toggleCanDelete

  return (
    <button style={{
      backgroundColor: 'white', border: '2px solid blue', fontSize: '24px',
      margin: '4px', padding: '4px'
    }}
      onClick={toggleCanDelete}>
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

const Expense = ({ expense, onDelete }: { expense: ExpenseType, onDelete: (id: number) => void }) => {
  const context = useContext(AdminRightContext)
  const canDelete = context?.canDelete

  let deleteButton;
  if (canDelete) {
    deleteButton = (
      <button style={{ position: 'absolute', top: '10px', right: '10px',  color: 'red' }}
        onClick={() => {
          onDelete(expense.id)
        }}
      >
        X
      </button>
    )
  }

  return (
    <div key={expense.id} style={{
      fontSize: '24px', color: 'white', border: '3px solid', borderColor: '#18dfa5',
      padding: '20px', marginBottom: '20px', position: 'relative', display: 'flex',
      alignItems: 'center', justifyContent: 'center', width: '50%'
    }}>
      <p> Name: {expense.name} <br /> Cost: {expense.cost} isk.
        {deleteButton}
      </p>
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>();
  const [newExpenseName, setNewExpenseName] = useState<string>('');
  const [newExpenseCost, setNewExpenseCost] = useState<number | null>(null);

  const fetchExpenses = async () => {
    const fetchedExpenses = await api.getExpenses();
    setExpenses(fetchedExpenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (newExpenseName && newExpenseCost !== null) {
      const newExpense: ExpenseType = {
        id: Date.now(),
        name: newExpenseName,
        cost: newExpenseCost
      }
      await api.postExpenses(newExpense);
      fetchExpenses();
      setNewExpenseName('');
      setNewExpenseCost(null);
    }
  };

  if (!expenses) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id: number) => {
    await api.deleteExpense(id);
    fetchExpenses()
  };

  return (
    <AdminRightsProvider>
      <div className="m-10">
        <HeaderComponent />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <p style={{ color: '#18dfa5', fontSize: '48px', }}>Add Expense</p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              width: '50%'
            }}>
              <label htmlFor="" className="text-2xl text-white" style={{ marginRight: '10px' }}>
                Name </label>
              <input
                type='text'
                placeholder='Expense name'
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className='border border-solid #eee text-2xl my-2'
              />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              width: '52%'
            }}>
              <label htmlFor="" className="text-2xl text-white" style={{ marginRight: '24px' }}>
                Cost </label>
              <input
                type='number'
                placeholder='Expense cost'
                value={newExpenseCost || ''}
                onChange={(e) => setNewExpenseCost(parseFloat(e.target.value))}
                className='border border-solid #eee text-2xl my-2'
              />
            </div>
            <button style={{
              backgroundColor: 'white', border: '2px solid blue', fontSize: '24px',
              margin: '4px', padding: '4px'
            }} onClick={handleAddExpense}>Add</button>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {expenses.map((expense) => (
                <Expense expense={expense} key={expense.id} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminRightsProvider>
  );
};

export default Expenses;
