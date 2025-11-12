import type { GastoState } from "../reducers/gasto-reducer";
import type { Expense } from "../types";

const STORAGE_KEY = 'presupuesto-app-state';

/**
 * Guarda el estado completo en LocalStorage
 */
export const saveStateToLocalStorage = (state: GastoState): void => {
    try {
        const serializedState = JSON.stringify({
            gasto: state.gasto,
            expense: state.expense.map(expense => ({
                ...expense,
                date: expense.date instanceof Date 
                    ? expense.date.toISOString() 
                    : expense.date
            }))
        });
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
        console.error('Error guardando en LocalStorage:', error);
    }
};

/**
 * Carga el estado desde LocalStorage
 */
export const loadStateFromLocalStorage = (): GastoState | null => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return null;
        }
        const parsedState = JSON.parse(serializedState);
        
        // Convertir las fechas de string a Date
        const expenses: Expense[] = parsedState.expense.map((expense: any) => ({
            ...expense,
            date: expense.date ? new Date(expense.date) : new Date()
        }));

        return {
            gasto: parsedState.gasto || 0,
            modal: false, // El modal siempre inicia cerrado
            expense: expenses
        };
    } catch (error) {
        console.error('Error cargando desde LocalStorage:', error);
        return null;
    }
};

