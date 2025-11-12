import FormularioComp from "./components/FormularioComp"
import GastoNext from "./components/GastoNext"
import { useGasto } from "./hooks/useGasto"
import { useMemo } from "react"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

/**
 * Componente principal de la aplicación
 * Gestiona el presupuesto y muestra el formulario o la vista de gastos según el estado
 */
function App() {

  const { state } = useGasto()
  console.log(state.gasto)

  // Valida si hay un presupuesto válido (mayor a 0)
  const isValidoGasto = useMemo(() => state.gasto <= 0, [state.gasto])




  return (
    <>
      <header className="bg-blue-700 py-8 max-h-72">
        <h1 className="text-white text-2xl font-bold text-center">
          Presupuesto
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-10 p-10">
        {!isValidoGasto ? <GastoNext /> : <FormularioComp />}
      </div>
      
      {!isValidoGasto && (
        <>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-10 p-10">
            <ExpenseList />
          </div>
          <ExpenseModal />
        </>
      )}
      


    </>
  )
}

export default App
