import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function SpendingBySpender({ expenses }) {
  const data = useMemo(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const key = expense.spender
      if (!acc[key]) {
        acc[key] = 0
      }
      acc[key] += parseFloat(expense.amount)
      return acc
    }, { 'Wang': 0, 'Chen': 0 })

    return [
      { name: 'Wang', amount: grouped['Wang'] || 0 },
      { name: 'Chen', amount: grouped['Chen'] || 0 }
    ]
  }, [expenses])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">By Spender</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `€${value}`}
              width={60}
            />
            <Tooltip 
              formatter={(value) => [`€${value.toFixed(2)}`, 'Amount']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
