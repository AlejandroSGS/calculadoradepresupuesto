/**
 * Componente para mostrar mensajes de error
 */

import type { ReactNode } from "react"

type ErrorMessageProps = {
  children: ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="bg-red-600 text-white font-bold text-sm text-center p-2 rounded-lg">
      {children}
    </p>
  )
}
