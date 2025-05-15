/**
 * @fileoverview Contexto para gestionar el estado global de TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import React, { createContext, useReducer, useEffect } from 'react';
import initialData from '../data/initialData';

/**
 * Creación del contexto de TaskMaster
 */
export const TaskMasterContext = createContext();

/**
 * @function taskMasterReducer
 * @description Reducer para gestionar el estado global de la aplicación
 * @param {Object} state - Estado actual
 * @param {Object} action - Acción a realizar
 * @returns {Object} Nuevo estado
 */
const taskMasterReducer = (state, action) => {
    switch (action.type) {
        // ==== PROYECTOS ====
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };

        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id ? action.payload : project
                )
            };

        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload)
            };

        // ==== TAREAS ====
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        // ==== EQUIPO ====
        case 'ADD_TEAM_MEMBER':
            return {
                ...state,
                team: [...state.team, action.payload]
            };

        case 'UPDATE_TEAM_MEMBER':
            return {
                ...state,
                team: state.team.map(member =>
                    member.id === action.payload.id ? action.payload : member
                )
            };

        case 'DELETE_TEAM_MEMBER':
            return {
                ...state,
                team: state.team.filter(member => member.id !== action.payload)
            };

        // ==== CARGAR DATOS ====
        case 'LOAD_DATA':
            return action.payload;

        default:
            return state;
    }
};

/**
 * @function TaskMasterProvider
 * @description Proveedor del contexto de TaskMaster
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente proveedor del contexto
 */
export const TaskMasterProvider = ({ children }) => {
    // Intentar cargar datos del localStorage
    const loadFromLocalStorage = () => {
        try {
            const savedData = localStorage.getItem('taskMasterData');
            return savedData ? JSON.parse(savedData) : initialData;
        } catch (error) {
            console.error('Error al cargar datos desde localStorage:', error);
            return initialData;
        }
    };

    // Inicializar estado con datos del localStorage o datos iniciales
    const [state, dispatch] = useReducer(taskMasterReducer, loadFromLocalStorage());

    // Guardar cambios en localStorage cuando el estado cambie
    useEffect(() => {
        try {
            localStorage.setItem('taskMasterData', JSON.stringify(state));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }, [state]); return (
        <TaskMasterContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskMasterContext.Provider>
    );
};

// No es necesario exportar nuevamente TaskMasterContext, ya está exportado arriba
