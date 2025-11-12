/**
 * Reducer para gestionar el estado de gastos y modal
 */

import type { DraftExpense, Expense } from "../types";

// Tipos de acciones
export type GastoAction = 
    | { type: "AGREGAR_GASTO"; payload: { gasto: number } }
    | { type: "SET_BUDGET"; payload: { amount: number } }
    | { type: "show-modal" }
    | { type: "close-modal" }
    | { type: 'add-expense'; payload: { expense: DraftExpense } }
    | { type: 'remove-expense'; payload: { id: string } }
    | { type: 'update-expense'; payload: { id: string; expense: DraftExpense } }
    | { type: 'reset-app' }

// Estado global
export type GastoState = {
    gasto: number
    modal: boolean
    expense: Expense[]
}

// Estado inicial
export const initialState: GastoState = {
    gasto: 0,
    modal: false,
    expense: []
}

// Helper: Genera ID único para gastos
const generateId = (): string => 
    typeof crypto !== "undefined" && crypto.randomUUID 
        ? crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 9)

/**
 * Reducer que maneja las acciones de gastos y modal
 */
export const gastoReducer = (
    state: GastoState = initialState, 
    action: GastoAction
): GastoState => {
    switch (action.type) {
        case "AGREGAR_GASTO":
            return { ...state, gasto: state.gasto + action.payload.gasto }
        
        case "SET_BUDGET":
            return { ...state, gasto: action.payload.amount }
        
        case "show-modal":
            return { ...state, modal: true }
        
        case "close-modal":
            return { ...state, modal: false }

        case 'add-expense':
            return {
                ...state,
                expense: [...state.expense, { ...action.payload.expense, id: generateId() }]
            }

        case 'remove-expense':
            return {
                ...state,
                expense: state.expense.filter(expense => expense.id !== action.payload.id)
            }

        case 'update-expense':
            return {
                ...state,
                expense: state.expense.map(expense =>
                    expense.id === action.payload.id
                        ? { ...action.payload.expense, id: expense.id }
                        : expense
                )
            }

        case 'reset-app':
            return initialState
        
        default:
            return state
    }
}
