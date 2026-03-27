import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#34d399', '#6ee7b7', '#d1fae5']

export default function SpendingByScenario({ expenses }) {
  const data = useMemo(() => {
    const grouped = expenses.reduce((acc, expense) => {
      const key = expense.scenario
      if (!acc[key]) {
        acc[key] = 0
      }
      acc[key] += parseFloat(expense.amount)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [expenses])

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">By Scenario</h3>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">By Scenario</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `€${value.toFixed(2)}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
