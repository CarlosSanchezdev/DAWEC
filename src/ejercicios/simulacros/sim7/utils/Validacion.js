/**
 * @fileoverview Utilidades de validación
 * @ejercicio Simulacro 7 - MaderAvilés
 */

/**
 * @function validarNumeroEnteroPositivo
 * @description Valida que un número sea entero y positivo
 * @param {any} valor - Valor a validar
 * @returns {boolean} true si es válido, false si no
 */
export const validarNumeroEnteroPositivo = (valor) => {
    const numero = Number(valor);
    return Number.isInteger(numero) && numero > 0;
};

/**
 * @function validarLongitudMaxima
 * @description Valida que una cadena no supere una longitud máxima
 * @param {string} texto - Texto a validar
 * @param {number} longitudMaxima - Longitud máxima permitida
 * @returns {boolean} true si es válido, false si no
 */
export const validarLongitudMaxima = (texto, longitudMaxima) => {
    return texto.length <= longitudMaxima;
};

/**
 * @function validarFecha
 * @description Valida que una fecha sea válida y no sea posterior a hoy
 * @param {string|Date} fecha - Fecha a validar
 * @returns {boolean} true si es válida, false si no
 */
export const validarFecha = (fecha) => {
    const fechaDate = fecha instanceof Date ? fecha : new Date(fecha);
    return !isNaN(fechaDate) && fechaDate <= new Date();
};

/**
 * @function validarMedida
 * @description Valida que una medida sea un número positivo
 * @param {number} medida - Medida a validar
 * @returns {boolean} true si es válida, false si no
 */
export const validarMedida = (medida) => {
    const numero = Number(medida);
    return !isNaN(numero) && numero > 0;
};

/**
 * @function validarColor
 * @description Valida que el color sea una cadena no vacía
 * @param {string} color - Color a validar
 * @returns {boolean} true si es válido, false si no
 */
export const validarColor = (color) => {
    return typeof color === "string" && color.trim().length > 0;
};

/**
 * @function formatearFecha
 * @description Formatea una fecha en formato dd/mm/yyyy
 * @param {Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
    if (!(fecha instanceof Date)) return "";

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
};

/**
 * @function formatearMedida
 * @description Formatea una medida en centímetros
 * @param {number} medida - Medida a formatear
 * @returns {string} Medida formateada
 */
export const formatearMedida = (medida) => {
    return `${medida} cm`;
};

/**
 * @function formatearSuperficie
 * @description Formatea una superficie en centímetros cuadrados
 * @param {number} superficie - Superficie a formatear
 * @returns {string} Superficie formateada
 */
export const formatearSuperficie = (superficie) => {
    return `${superficie} cm²`;
};

/**
 * @function formatearVolumen
 * @description Formatea un volumen en centímetros cúbicos
 * @param {number} volumen - Volumen a formatear
 * @returns {string} Volumen formateado
 */
export const formatearVolumen = (volumen) => {
    return `${volumen} cm³`;
};
