export type ExpenseType = {
  id: number
  name: string
  cost: number
}

const getExpenses = async (): Promise<ExpenseType[]> => {
  const res = await fetch('http://localhost:3001/api/expenses')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const response = await res.json()
  console.log('getting expenses', response)
  return response
}

const EXPENSE = {
  name: 'Water',
  cost: 1200
}

const postExpenses = async (): Promise<ExpenseType[]> => {
  const res = await fetch('http://localhost:3001/api/create-expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(EXPENSE)
  })

  if (!res.ok) {
    throw new Error('Failed to post data')
  }

  const response = await res.json()
  console.log(response)
  return response
}

const deleteExpense = async (id: number): Promise<ExpenseType[]> => {
  const res = await fetch(`http://localhost:3001/api/expense/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to post data')
  }

  const response = await res.json()
  console.log(response)
  return response
}

export const api = {
  getExpenses,
  postExpenses,
  deleteExpense
}
