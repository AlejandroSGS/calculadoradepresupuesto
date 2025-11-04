export type GastoAction = 
    | {
        type: "AGREGAR_GASTO",
        payload: {
            gasto: number;
        }
    }

export type GastoState = {
    gasto:number;
}

export const initialState: GastoState = {
    gasto:0,
    auth: true
}

export const gastoReducer = (state: GastoState = initialState, action: GastoAction): GastoState => {
    switch (action.type) {
        case "AGREGAR_GASTO":
            return {
                ...state,
                gasto: state.gasto + action.payload.gasto
            }
        default:
            return state;
    }
}