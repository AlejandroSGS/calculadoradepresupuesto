import { useReducer, useEffect, createContext, type Dispatch, type ReactNode } from "react";
import { gastoReducer, initialState, type GastoState, type GastoAction } from "../reducers/gasto-reducer";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "../helpers/localStorage";

/**
 * Contexto para gestionar el estado global de gastos
 */
type GastoContextProps = {
    state: GastoState 
    dispatch: Dispatch<GastoAction>
}

type GastoProviderProps = {
    children: ReactNode
}

export const GastoContext = createContext<GastoContextProps>(null!)

/**
 * Provider que envuelve la aplicación y proporciona el estado de gastos
 * Guarda y carga el estado desde LocalStorage
 */
export const GastoProvider = ({children}: GastoProviderProps) => {
    // Cargar estado inicial desde LocalStorage
    const savedState = loadStateFromLocalStorage();
    const initial = savedState || initialState;

    const [state, dispatch] = useReducer(gastoReducer, initial);

    // Guardar en LocalStorage cada vez que cambie el estado
    useEffect(() => {
        saveStateToLocalStorage(state);
    }, [state]);

    return (
        <GastoContext.Provider value={{ state, dispatch }}>
            {children}
        </GastoContext.Provider>
    )
}