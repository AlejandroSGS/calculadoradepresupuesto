import { useState, useMemo } from "react"
import { useGasto } from "../hooks/useGasto"


export default function FormularioComp() {
  // State

  const [gasto, setGasto] = useState(0)
  const { dispatch } = useGasto()

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGasto(Number(e.target.valueAsNumber))
  }

  // Validations
  const isValido = useMemo(() => {
    return gasto <= 0 || isNaN(gasto)
  }, [gasto])

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: "AGREGAR_GASTO", payload: { gasto: gasto }})
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="gasto" className="text-lg text-gray-700 uppercase text-center mb-2 font-bold">
          Nuevo Presupuesto
        </label>
        <input 
          type="number" 
          id="gasto" 
          placeholder="Añade el gasto" 
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
          name="gasto"
          value={gasto}
          onChange={handleChange}
          required
        />
        {isValido && <p className="text-red-500 text-sm">El gasto debe ser mayor a 0</p>}
      </div>

      <input 
        type="submit" 
        value="Añadir gasto" 
        className="bg-blue-500 text-white p-3 rounded-lg w-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 font-medium"
      />
    </form>
  )
}
