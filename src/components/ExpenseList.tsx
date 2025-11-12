import { useState } from "react";
import { useGasto } from "../hooks/useGasto";
import { categories } from "../data/categories";
import { formatCurrency } from "../helpers";
import type { Expense, DraftExpense } from "../types";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'

/**
 * Componente para mostrar la lista de gastos registrados
 * Con funcionalidad para mostrar/ocultar con animación
 */
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseList() {
    const { state, dispatch } = useGasto();
    const [isVisible, setIsVisible] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedExpense, setEditedExpense] = useState<DraftExpense | null>(null);

    // Función para obtener el nombre de la categoría por ID
    const getCategoryName = (categoryId: string): string => {
        const category = categories.find(cat => cat.id === categoryId);
        return category?.name || 'Sin categoría';
    };

    // Función para formatear la fecha
    const formatDate = (date: Expense['date']): string => {
        if (!date) return 'Sin fecha';
        if (date instanceof Date) {
            return new Intl.DateTimeFormat('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        }
        return 'Fecha inválida';
    };

    // Función para iniciar edición
    const handleEdit = (expense: Expense) => {
        setEditingId(expense.id);
        setEditedExpense({
            expenseName: expense.expenseName,
            amount: expense.amount,
            categories: expense.categories,
            date: expense.date instanceof Date ? expense.date : new Date(expense.date as any)
        });
    };

    // Función para cancelar edición
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedExpense(null);
    };

    // Función para guardar edición
    const handleSaveEdit = (id: string) => {
        if (!editedExpense) return;

        // Validaciones
        if (!editedExpense.expenseName.trim()) {
            alert('El nombre del gasto es obligatorio');
            return;
        }
        if (editedExpense.amount <= 0 || isNaN(editedExpense.amount)) {
            alert('La cantidad debe ser mayor a 0');
            return;
        }
        if (!editedExpense.categories) {
            alert('Debes seleccionar una categoría');
            return;
        }

        // Validar que no se exceda el presupuesto
        // Calcular el total sin el gasto que se está editando
        const totalSinEsteGasto = state.expense
            .filter(exp => exp.id !== id)
            .reduce((total, exp) => total + exp.amount, 0);
        
        const nuevoTotal = totalSinEsteGasto + editedExpense.amount;
        
        if (nuevoTotal > state.gasto) {
            const disponible = state.gasto - totalSinEsteGasto;
            alert(`No puedes exceder el presupuesto. Disponible: ${formatCurrency(disponible)}`);
            return;
        }

        dispatch({ type: 'update-expense', payload: { id, expense: editedExpense } });
        handleCancelEdit();
    };

    // Función para eliminar gasto
    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
            dispatch({ type: 'remove-expense', payload: { id } });
        }
    };

    // Si no hay gastos, mostrar mensaje
    if (state.expense.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No hay gastos registrados</p>
                <p className="text-gray-400 text-sm mt-2">Agrega tu primer gasto usando el botón +</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header con botón para mostrar/ocultar */}
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                    Gastos Registrados ({state.expense.length})
                </h2>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    aria-label={isVisible ? "Ocultar gastos" : "Mostrar gastos"}
                >
                    {isVisible ? (
                        <>
                            <span>Ocultar</span>
                            <ChevronUpIcon className="w-5 h-5" />
                        </>
                    ) : (
                        <>
                            <span>Mostrar</span>
                            <ChevronDownIcon className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
            
            {/* Lista de gastos con animación */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="space-y-3">
                    {state.expense.map((expense, index) => (
                        <div
                            key={expense.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animation: isVisible ? 'fadeInUp 0.4s ease-out forwards' : 'none'
                            }}
                        >
                            {editingId === expense.id && editedExpense ? (
                                // Modo edición
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">Nombre del gasto:</label>
                                        <input
                                            type="text"
                                            value={editedExpense.expenseName}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, expenseName: e.target.value })}
                                            className="bg-slate-100 p-2 rounded border"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">Cantidad:</label>
                                        <input
                                            type="number"
                                            value={editedExpense.amount}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, amount: +e.target.value })}
                                            className="bg-slate-100 p-2 rounded border"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">Categoría:</label>
                                        <select
                                            value={editedExpense.categories}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, categories: e.target.value })}
                                            className="bg-slate-100 p-2 rounded border"
                                        >
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold">Fecha:</label>
                                        <DatePicker
                                            className="bg-slate-100 p-2 border-0 rounded"
                                            value={editedExpense.date}
                                            onChange={(value: Value) => setEditedExpense({ ...editedExpense, date: value })}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveEdit(expense.id)}
                                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Modo visualización
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {expense.expenseName}
                                        </h3>
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Categoría:</span> {getCategoryName(expense.categories)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Fecha:</span> {formatDate(expense.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex flex-col items-end gap-2">
                                        <p className="text-xl font-bold text-blue-600">
                                            {formatCurrency(expense.amount)}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(expense)}
                                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                aria-label="Editar gasto"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(expense.id)}
                                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                aria-label="Eliminar gasto"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Estilos de animación */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

