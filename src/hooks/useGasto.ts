import { useContext } from "react"
import { GastoContext } from "../context/GastoContext"

/**
 * Hook personalizado para acceder al contexto de gastos
 * @throws Error si se usa fuera del GastoProvider
 */
export const useGasto = () => {
    const context = useContext(GastoContext)
    if (!context) {
        throw new Error("useGasto debe ser usado dentro de un GastoProvider")
    }
    return context
}

