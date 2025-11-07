export type GastoAction = 
     { type: "AGREGAR_GASTO",payload: {gasto: number;} } |
     { type: "show-modal" } |
     { type: "close-modal" }

export type GastoState = {
    gasto:number
    modal:boolean
}

export const initialState: GastoState = {
    gasto:0,
    modal:false
}

export const gastoReducer = (state: GastoState = initialState, action: GastoAction): GastoState => {
    switch (action.type) {
        case "AGREGAR_GASTO":
            return {
                ...state,
                gasto: state.gasto + action.payload.gasto
            }
        case "show-modal":
            return {
                ...state,
                modal: true
            }
        case "close-modal":
            return {
                ...state,
                modal: false
            }
        default:
            return state;
    }
}
