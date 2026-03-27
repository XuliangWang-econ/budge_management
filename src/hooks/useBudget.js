import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const BUDGET_KEY = 'monthly_budget_override'

export function useBudget() {
  const [monthlyBudget, setMonthlyBudget] = useState(5000)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // First check local storage for override
    const localBudget = localStorage.getItem(BUDGET_KEY)
    if (localBudget) {
      setMonthlyBudget(parseFloat(localBudget))
      setLoading(false)
      return
    }

    // Fetch from Supabase
    const fetchBudget = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'monthly_budget')
          .single()

        if (data && !error) {
          const budget = parseFloat(data.value)
          setMonthlyBudget(budget)
          localStorage.setItem(BUDGET_KEY, budget.toString())
        }
      } catch (err) {
        console.error('Error fetching budget:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBudget()

    // Subscribe to budget changes
    const channel = supabase
      .channel('budget-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'settings',
          filter: `key=eq.monthly_budget`
        },
        (payload) => {
          const newBudget = parseFloat(payload.new.value)
          setMonthlyBudget(newBudget)
          localStorage.setItem(BUDGET_KEY, newBudget.toString())
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const updateBudget = async (newBudget) => {
    try {
      // First check if the row exists
      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .eq('key', 'monthly_budget')
        .single()

      let error
      if (existing) {
        // Update existing row
        const result = await supabase
          .from('settings')
          .update({ value: newBudget.toString() })
          .eq('key', 'monthly_budget')
        error = result.error
      } else {
        // Insert new row
        const result = await supabase
          .from('settings')
          .insert({ key: 'monthly_budget', value: newBudget.toString() })
        error = result.error
      }

      if (error) throw error

      setMonthlyBudget(parseFloat(newBudget))
      localStorage.setItem(BUDGET_KEY, newBudget.toString())
    } catch (err) {
      console.error('Error updating budget:', err)
      throw err
    }
  }

  return { monthlyBudget, updateBudget, loading }
}
