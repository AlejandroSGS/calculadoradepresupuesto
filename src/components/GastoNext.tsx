import AmountDisplay from "./AmountDisplay";

/**
 * Vista principal cuando hay un presupuesto configurado
 * Muestra el gráfico, resumen de gastos y botón para resetear
 */
export default function GastoNext() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="imagen gastos" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button
          type="button"
          className=" bg-red-500 p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-red-600"
          >
            Resetear contador
          </button>

          <AmountDisplay 
            label="Presupuesto"
            amount={300}

          />

          <AmountDisplay 
          label="Disponible"
          amount={200}
          />

          <AmountDisplay 
          label="Gastado"
          amount={100}
          />

        </div>
    </div>
  )
}
