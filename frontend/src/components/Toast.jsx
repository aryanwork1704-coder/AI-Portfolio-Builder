import { useEffect, useState } from 'react'

const Toast = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random()
      const { message, type } = e.detail || { message: String(e.detail || ''), type: 'info' }
      setToasts((t) => [...t, { id, message, type }])
      setTimeout(() => {
        setToasts((t) => t.filter(tt => tt.id !== id))
      }, 4000)
    }

    document.addEventListener('showToast', handler)
    return () => document.removeEventListener('showToast', handler)
  }, [])

  if (!toasts.length) return null

  return (
    <div className="fixed right-4 bottom-6 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`max-w-sm w-full px-4 py-3 rounded-lg shadow-lg text-white ${t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'}`}>
          {t.message}
        </div>
      ))}
    </div>
  )
}

export default Toast
