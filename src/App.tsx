import FormularioComp from "./components/FormularioComp"

function App() {
  

  return (
    <>
      <header className="bg-blue-700 py-8 max-h-72">
        <h1 className="text-white text-2xl font-bold text-center">
          Presupuesto
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-10 p-10">
        <FormularioComp />
      </div>
    </>
  )
}

export default App
