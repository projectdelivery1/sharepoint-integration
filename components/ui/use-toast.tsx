"use client"

import { createContext, useContext, useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
})

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])
    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map((t, i) => (
          <div
            key={i}
            className={`p-4 rounded-md shadow-md ${
              t.variant === "destructive" ? "bg-red-100 text-red-800" : "bg-white"
            }`}
          >
            {t.title && <h3 className="font-medium">{t.title}</h3>}
            {t.description && <p className="text-sm">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
