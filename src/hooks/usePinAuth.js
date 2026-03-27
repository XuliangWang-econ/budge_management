import { useState, useEffect } from 'react'

const PIN_KEY = 'expense_tracker_pin'
const AUTH_KEY = 'expense_tracker_authenticated'

export function usePinAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY)
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
    const storedPin = localStorage.getItem(PIN_KEY)
    if (storedPin) {
      setPin(storedPin)
    } else {
      setPin(import.meta.env.VITE_DEFAULT_PIN || '1234')
    }
  }, [])

  const verifyPin = (inputPin) => {
    if (inputPin === pin) {
      localStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
      return true
    }
    setError('Incorrect PIN')
    return false
  }

  const changePin = (newPin) => {
    localStorage.setItem(PIN_KEY, newPin)
    setPin(newPin)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }

  return { isAuthenticated, verifyPin, changePin, logout, hasPin: !!pin, error }
}
