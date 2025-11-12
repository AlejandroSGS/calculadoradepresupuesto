import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AmountDisplay from "./AmountDisplay";
import { useGasto } from "../hooks/useGasto";

/**
 * Vista principal cuando hay un presupuesto configurado
 * Muestra el gráfico, resumen de gastos y botón para resetear
 */
export default function GastoNext() {
  const { state, dispatch } = useGasto();

  // Calcular el total gastado sumando todos los gastos
  const gastado = useMemo(() => {
    return state.expense.reduce((total, expense) => total + expense.amount, 0);
  }, [state.expense]);

  // Calcular el disponible (presupuesto - gastado)
  const disponible = useMemo(() => {
    return state.gasto - gastado;
  }, [state.gasto, gastado]);

  // Calcular el porcentaje gastado (para la barra de progreso)
  const porcentajeGastado = useMemo(() => {
    if (state.gasto === 0) return 0;
    return Math.min((gastado / state.gasto) * 100, 100);
  }, [state.gasto, gastado]);

  // Determinar el color según el porcentaje gastado
  const getProgressColor = () => {
    if (porcentajeGastado < 50) return "#10b981"; // Verde
    if (porcentajeGastado < 75) return "#f59e0b"; // Amarillo/Naranja
    return "#ef4444"; // Rojo
  };

  // Función para resetear la aplicación
  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas resetear toda la aplicación? Se eliminarán todos los gastos y el presupuesto.')) {
      dispatch({ type: 'reset-app' });
      // Limpiar LocalStorage
      localStorage.removeItem('presupuesto-app-state');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center items-center">
          <div className="w-64 h-64">
            <CircularProgressbar
              value={porcentajeGastado}
              text={`${porcentajeGastado.toFixed(1)}%`}
              styles={buildStyles({
                // Color del círculo de progreso
                pathColor: getProgressColor(),
                // Color del texto
                textColor: "#1f2937",
                // Color del círculo de fondo
                trailColor: "#e5e7eb",
                // Tamaño del texto
                textSize: "20px"
              })}
            />
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 font-semibold">
                Presupuesto utilizado
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button
            type="button"
            onClick={handleReset}
            className=" bg-red-500 p-2 text-white uppercase font-bold rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
          >
            Resetear App
          </button>

          <AmountDisplay 
            label="Presupuesto"
            amount={state.gasto}
          />

          <AmountDisplay 
            label="Disponible"
            amount={disponible}
          />

          <AmountDisplay 
            label="Gastado"
            amount={gastado}
          />

        </div>
    </div>
  )
}
