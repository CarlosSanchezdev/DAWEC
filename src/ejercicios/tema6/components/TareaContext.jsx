/**
 * @fileoverview Contexto y Reducer para el Gestor de Tareas
 * @ejercicio Ej05_Context_Reducers
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 20/05/2025
 */

import { createContext, useReducer } from "react";

// ===== CONTEXTO =====
/**
 * @const TareaContext
 * @description Contexto para compartir el estado de tareas entre componentes
 */
export const TareaContext = createContext();

// ===== ACCIONES =====
/**
 * @const ACTIONS
 * @description Tipos de acciones que pueden ser despachadas al reducer
 */
export const ACTIONS = {
	AGREGAR_TAREA: "agregar_tarea",
	ELIMINAR_TAREA: "eliminar_tarea",
	COMPLETAR_TAREA: "completar_tarea",
	ACTUALIZAR_TAREA: "actualizar_tarea",
	FILTRAR_TAREAS: "filtrar_tareas",
};

// ===== REDUCER =====
/**
 * @function tareaReducer
 * @description Reducer para manejar el estado de las tareas
 * @param {Object} state - Estado actual
 * @param {Object} action - Acción a realizar
 * @returns {Object} Nuevo estado
 */
export function tareaReducer(state, action) {
	switch (action.type) {
		case ACTIONS.AGREGAR_TAREA:
			return {
				...state,
				tareas: [
					...state.tareas,
					{
						id: Date.now(),
						texto: action.payload.texto,
						completada: false,
						prioridad: action.payload.prioridad || "normal",
					},
				],
			};

		case ACTIONS.ELIMINAR_TAREA:
			return {
				...state,
				tareas: state.tareas.filter((tarea) => tarea.id !== action.payload.id),
			};

		case ACTIONS.COMPLETAR_TAREA:
			return {
				...state,
				tareas: state.tareas.map((tarea) =>
					tarea.id === action.payload.id ? { ...tarea, completada: !tarea.completada } : tarea
				),
			};

		case ACTIONS.ACTUALIZAR_TAREA:
			return {
				...state,
				tareas: state.tareas.map((tarea) =>
					tarea.id === action.payload.id ? { ...tarea, ...action.payload.cambios } : tarea
				),
			};

		case ACTIONS.FILTRAR_TAREAS:
			return {
				...state,
				filtro: action.payload.filtro,
			};

		default:
			return state;
	}
}

/**
 * @function TareaProvider
 * @description Proveedor del contexto de tareas
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} Proveedor con el estado y dispatch
 */
export function TareaProvider({ children }) {
	// Estado inicial para el reducer
	const initialState = {
		tareas: [
			{ id: 1, texto: "Estudiar Context API", completada: true, prioridad: "alta" },
			{ id: 2, texto: "Practicar con useReducer", completada: false, prioridad: "normal" },
			{ id: 3, texto: "Repasar eventos del DOM", completada: false, prioridad: "baja" },
		],
		filtro: "todas",
	};

	// Inicializar el reducer
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	return <TareaContext.Provider value={{ state, dispatch }}>{children}</TareaContext.Provider>;
}
