# 💰 Aplicación de Presupuesto Personal

Una aplicación web moderna para gestionar tu presupuesto personal y controlar tus gastos. Desarrollada con React, TypeScript y Vite.

## 📋 Descripción

Esta aplicación te permite:
- Establecer un presupuesto inicial
- Registrar gastos con categorías, fechas y montos
- Visualizar el progreso del presupuesto con un gráfico circular
- Editar y eliminar gastos registrados
- Persistir los datos en el navegador (LocalStorage)
- Ver un resumen de presupuesto, gastado y disponible

## 🚀 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Context API** - Gestión de estado global
- **React Hooks** - useReducer, useState, useEffect
- **Headless UI** - Componentes de UI accesibles
- **Heroicons** - Iconos SVG
- **React Circular Progressbar** - Gráfico de progreso circular
- **React Date Picker** - Selector de fechas

## 📁 Estructura del Proyecto

```
presupuesto/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AmountDisplay.tsx      # Muestra cantidades formateadas
│   │   ├── ErrorMessage.tsx       # Mensajes de error
│   │   ├── ExpenseForm.tsx        # Formulario para agregar gastos
│   │   ├── ExpenseList.tsx        # Lista de gastos con edición
│   │   ├── ExpenseModal.tsx       # Modal para agregar gastos
│   │   ├── FormularioComp.tsx     # Formulario de presupuesto inicial
│   │   └── GastoNext.tsx          # Vista principal con gráfico
│   ├── context/
│   │   └── GastoContext.tsx       # Context API para estado global
│   ├── data/
│   │   └── categories.ts          # Categorías de gastos disponibles
│   ├── helpers/
│   │   ├── index.ts               # Utilidades (formateo de moneda)
│   │   └── localStorage.ts        # Persistencia en LocalStorage
│   ├── hooks/
│   │   └── useGasto.ts            # Hook personalizado para acceder al contexto
│   ├── reducers/
│   │   └── gasto-reducer.ts       # Reducer para gestión de estado
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── public/                   # Archivos estáticos
│   ├── icono_*.svg          # Iconos de categorías
│   └── grafico.jpg          # Imagen de gráfico
└── dist/                     # Build de producción
```

## 🎯 Funcionalidades Principales

### 1. Establecer Presupuesto
- Formulario inicial para definir el presupuesto total
- Validación para asegurar que el presupuesto sea mayor a 0
- Una vez establecido, se muestra la vista principal de gestión

### 2. Gestión de Gastos
- **Agregar gastos**: Modal con formulario para registrar:
  - Nombre del gasto
  - Cantidad (con validación)
  - Categoría (7 categorías disponibles)
  - Fecha del gasto
- **Editar gastos**: Edición inline en la lista de gastos
- **Eliminar gastos**: Con confirmación antes de eliminar
- **Validación**: No permite exceder el presupuesto total

### 3. Visualización
- **Gráfico circular**: Muestra el porcentaje del presupuesto utilizado
  - Verde: < 50% gastado
  - Amarillo/Naranja: 50-75% gastado
  - Rojo: > 75% gastado
- **Resumen financiero**: Muestra presupuesto, disponible y gastado
- **Lista de gastos**: Con opción de mostrar/ocultar y animaciones

### 4. Persistencia
- Los datos se guardan automáticamente en LocalStorage
- Al recargar la página, se restauran los datos guardados
- Opción de resetear toda la aplicación

## 🔧 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de instalación

1. Clonar o descargar el repositorio
```bash
cd presupuesto
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar en modo desarrollo
```bash
npm run dev
```

4. Abrir en el navegador
```
http://localhost:5173
```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter

## 📊 Categorías de Gastos

La aplicación incluye 7 categorías predefinidas:

1. **Ahorro** 💰
2. **Comida** 🍔
3. **Casa** 🏠
4. **Gastos Varios** 📦
5. **Ocio** 🎮
6. **Salud** 🏥
7. **Suscripciones** 📱

## 🏗️ Arquitectura

### Gestión de Estado

La aplicación utiliza **React Context API** junto con **useReducer** para gestionar el estado global:

- **GastoContext**: Proporciona el estado y dispatch a toda la aplicación
- **gastoReducer**: Maneja todas las acciones de estado:
  - `SET_BUDGET`: Establece el presupuesto inicial
  - `add-expense`: Agrega un nuevo gasto
  - `update-expense`: Actualiza un gasto existente
  - `remove-expense`: Elimina un gasto
  - `show-modal` / `close-modal`: Controla la visibilidad del modal
  - `reset-app`: Resetea toda la aplicación

### Persistencia

- **LocalStorage**: Los datos se guardan automáticamente en `presupuesto-app-state`
- Las fechas se serializan como ISO strings y se reconstruyen al cargar
- El estado se sincroniza en cada cambio

### Tipos TypeScript

```typescript
// Gasto completo con ID
type Expense = {
  id: string
  amount: number
  expenseName: string
  categories: string
  date: Value
}

// Gasto sin ID (para formularios)
type DraftExpense = Omit<Expense, 'id'>

// Estado global
type GastoState = {
  gasto: number        // Presupuesto total
  modal: boolean      // Estado del modal
  expense: Expense[]  // Lista de gastos
}
```

## 🎨 Componentes Principales

### App.tsx
Componente raíz que:
- Determina qué vista mostrar (formulario inicial o gestión)
- Renderiza condicionalmente los componentes según el estado

### FormularioComp.tsx
Formulario para establecer el presupuesto inicial con validación.

### GastoNext.tsx
Vista principal que muestra:
- Gráfico circular de progreso
- Resumen financiero (presupuesto, disponible, gastado)
- Botón para resetear la aplicación

### ExpenseModal.tsx
Modal con animaciones (Headless UI) que contiene el formulario de gastos.

### ExpenseForm.tsx
Formulario completo para agregar gastos con:
- Validación de campos
- Validación de presupuesto disponible
- Manejo de errores

### ExpenseList.tsx
Lista de gastos con:
- Funcionalidad de mostrar/ocultar
- Edición inline
- Eliminación con confirmación
- Animaciones de entrada
- Formateo de fechas y monedas

## 🔐 Validaciones

- **Presupuesto**: Debe ser mayor a 0
- **Nombre de gasto**: Campo obligatorio
- **Cantidad**: Debe ser mayor a 0 y no exceder el presupuesto disponible
- **Categoría**: Debe ser seleccionada
- **Fecha**: Debe ser válida

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## 📝 Notas de Desarrollo

- El proyecto utiliza **TypeScript** para type safety
- **Tailwind CSS** para estilos utilitarios
- **ESLint** configurado para mantener calidad de código
- Los iconos de categorías están en formato SVG en la carpeta `public/`
- El estado se persiste automáticamente en LocalStorage

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

