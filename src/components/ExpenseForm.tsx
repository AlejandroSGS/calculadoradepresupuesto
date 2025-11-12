import { useState, type ChangeEvent } from "react"
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useGasto } from "../hooks/useGasto";
import { formatCurrency } from "../helpers";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * Formulario para registrar nuevos gastos
 * Permite ingresar nombre, cantidad, categoría y fecha del gasto
 */
export default function ExpenseForm() {
    // Valores iniciales del formulario
    const initialExpense: DraftExpense = {
        amount: 0,
        expenseName: '',
        categories: '',
        date: new Date()
    };

    const [expense, setExpense] = useState<DraftExpense>(initialExpense);
    const [error, setError] = useState('');
    const { state, dispatch } = useGasto();

    // Función para reiniciar el formulario
    const resetForm = () => {
        setExpense(initialExpense);
        setError('');
    };

    // Maneja cambios en los campos del formulario
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        
        if (isAmountField) {
            // Si el campo está vacío, guardar como 0 pero mostrar vacío
            const numValue = value === '' ? 0 : +value
            setExpense({
                ...expense,
                [name]: numValue
            })
        } else {
            setExpense({
                ...expense,
                [name]: value
            })
        }
        // Limpiar el error cuando el usuario empiece a escribir
        if(error) setError('')
    }

    // Maneja el foco en el campo de cantidad para limpiar el 0
    const handleAmountFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (expense.amount === 0) {
            e.target.select()
        }
    }

    // Maneja cambios en la fecha seleccionada
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
        // Limpiar el error cuando el usuario cambie la fecha
        if(error) setError('')
    }

    // Valida y procesa el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar cada campo individualmente
        if(!expense.expenseName.trim()){
            setError('El nombre del gasto es obligatorio')
            return
        }

        if(expense.amount <= 0 || isNaN(expense.amount)){
            setError('La cantidad debe ser mayor a 0')
            return
        }

        if(!expense.categories){
            setError('Debes seleccionar una categoría')
            return
        }

        if(!expense.date || (expense.date instanceof Date && isNaN(expense.date.getTime()))){
            setError('Debes seleccionar una fecha válida')
            return
        }

        // Validar que no se exceda el presupuesto
        const totalGastado = state.expense.reduce((total, exp) => total + exp.amount, 0);
        const nuevoTotal = totalGastado + expense.amount;
        
        if (nuevoTotal > state.gasto) {
            const disponible = state.gasto - totalGastado;
            setError(`No puedes exceder el presupuesto. Disponible: ${formatCurrency(disponible)}`)
            return
        }

        // Si todo está bien, limpiar el error y procesar
        dispatch({type: 'add-expense', payload: {expense}})

        // Reiniciar el formulario después de agregar el gasto
        resetForm();
        
        // Cerrar el modal automáticamente
        dispatch({type: 'close-modal'});
    }

    return (
        <form className=" space-y-5" onSubmit={handleSubmit}>
            <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-400 py-2">
                Nuevo gasto
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className=" text-xl">Nuevo Gasto:</label>
            <input type="text" id="expenseName" placeholder="Agrega nuevo gasto" className=" bg-slate-100" name="expenseName" value={expense.expenseName} onChange={handleChange}/>
        </div>


        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className=" text-xl">Cantidad:</label>
            <input 
                type="number" 
                id="amount" 
                placeholder="Agrega la cantidad del gasto" 
                className=" bg-slate-100" 
                name="amount" 
                value={expense.amount === 0 ? '' : expense.amount} 
                onChange={handleChange}
                onFocus={handleAmountFocus}
                min="0"
                step="0.01"
            />
        </div>


        <div className="flex flex-col gap-2">
            <label htmlFor="categories" className=" text-xl">Categoria:</label>
            <select id="categories" value={expense.categories} onChange={handleChange} className=" bg-slate-100" name="categories" defaultValue="">
                <option value="" disabled>
                    Agrega la categoria
                </option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className=" text-xl">Fecha gasto:</label>
            <DatePicker
            className=" bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
        </div>

        <input 
            type="submit" 
            className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700 transition-colors" 
            value={'Registrar gasto'}
        />

    </form>
  )
}
