import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function MonthlyTrend({ expenses }) {
  const data = useMemo(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const date = new Date(expense.expense_date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!acc[key]) {
        acc[key] = 0
      }
      acc[key] += parseFloat(expense.amount)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6) // Last 6 months
  }, [expenses])

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Trend</h3>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Trend</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => `€${value}`}
              width={60}
            />
            <Tooltip 
              formatter={(value) => [`€${value.toFixed(2)}`, 'Amount']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
