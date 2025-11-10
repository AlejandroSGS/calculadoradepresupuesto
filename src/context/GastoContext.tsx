import { useReducer, createContext, type Dispatch, type ReactNode } from "react";
import { gastoReducer, initialState, type GastoState, type GastoAction } from "../reducers/gasto-reducer";

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
 */
export const GastoProvider = ({children}: GastoProviderProps) =>{

    const [state, dispatch] = useReducer(gastoReducer, initialState);


    return (
        <GastoContext.Provider
        value={{ state, dispatch }}
        >
            {children}
        </GastoContext.Provider>
    )
}