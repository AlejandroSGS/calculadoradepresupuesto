import { useContext } from "react"
import { GastoContext } from "../context/GastoContext"

export const useGasto = () => {
    const context = useContext(GastoContext)
    if (!context) {
        throw new Error("useGasto debe ser usado dentro de un GastoProvider")
    }
    return context
}

