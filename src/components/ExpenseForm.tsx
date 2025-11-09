import { useState } from "react"
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
    // Fix: include the 'date' property as required by DraftExpense (default to current date)
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        categories: '',
        date: new Date()
    });
    return (
        <form className=" space-y-5">
            <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-400 py-2">
                Nuevo gasto
        </legend>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className=" text-xl">Nuevo Gasto:</label>
            <input type="text" id="expenseName" placeholder="Agrega nuevo gasto" className=" bg-slate-100" name="expenseName" value={expense.expenseName}/>
        </div>


        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className=" text-xl">Cantidad:</label>
            <input type="number" id="expenseName" placeholder="Agrega la cantidad del gasto" className=" bg-slate-100" name="amount" 
            value={expense.amount}/>
        </div>


        <div className="flex flex-col gap-2">
            <label htmlFor="categories" className=" text-xl">Categoria:</label>
            <select id="categories" value={expense.categories} className=" bg-slate-100" name="categories" defaultValue="">
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
            className=" bg-slate-100 p-2 border-0" value={expense.date}/>
        </div>

        <input type="submit" className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={'Registrar ahorro'}/>

    </form>
  )
}
