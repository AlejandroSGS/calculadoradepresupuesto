/**
 * Tipos TypeScript para la aplicación de presupuesto
 */

// Gasto completo con ID generado
export type Expense = {
    id: string
    amount: number
    expenseName: string
    categories: string
    date: Value
}

// Gasto sin ID (para formularios)
export type DraftExpense = Omit<Expense, 'id'>

type ValuePice = Date | null;
// Tipo para valores de fecha (simple o rango)
export type Value = ValuePice | [ValuePice, ValuePice]

// Categoría de gasto con icono
export type Category = {
    id: string
    name: string
    icon: string

}