/**
 * @fileoverview Hook personalizado para manejar formularios
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * @function useForm
 * @description Hook personalizado para manejar la lógica de formularios
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} validate - Función de validación
 * @param {Function} onSubmit - Función a ejecutar al enviar el formulario
 * @returns {Object} Métodos y propiedades para usar en el formulario
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm(
 *   { name: '', email: '' },
 *   (values) => {
 *     let errors = {};
 *     if (!values.name) errors.name = 'El nombre es requerido';
 *     return errors;
 *   },
 *   (values) => console.log(values)
 * );
 */
function useForm(initialValues, validate, onSubmit) {
    // ===== ESTADOS =====
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ===== EFECTOS =====
    /**
     * Efecto para validar cuando cambian los valores o se tocan campos
     */
    useEffect(() => {
        if (Object.keys(touched).length > 0) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    }, [values, touched, validate]);

    /**
     * Efecto para manejar el envío del formulario
     */
    useEffect(() => {
        if (isSubmitting) {
            const validationErrors = validate(values);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                onSubmit(values);
            }

            setIsSubmitting(false);
        }
    }, [isSubmitting, onSubmit, validate, values]);

    // ===== CALLBACKS =====
    /**
     * @function handleChange
     * @description Maneja los cambios en los campos del formulario
     * @param {Event} e - Evento de cambio
     */
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setValues(prevValues => ({
            ...prevValues,
            [name]: fieldValue
        }));

        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
    }, []);

    /**
     * @function handleBlur
     * @description Maneja el evento de perder el foco en un campo
     * @param {Event} e - Evento blur
     */
    const handleBlur = useCallback((e) => {
        const { name } = e.target;

        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
    }, []);

    /**
     * @function handleSubmit
     * @description Maneja el envío del formulario
     * @param {Event} e - Evento de envío
     */
    const handleSubmit = useCallback((e) => {
        if (e) e.preventDefault();

        // Marcar todos los campos como tocados para validación
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});

        setTouched(allTouched);
        setIsSubmitting(true);
    }, [values]);

    /**
     * @function setFieldValue
     * @description Establece el valor de un campo específico
     * @param {string} name - Nombre del campo
     * @param {any} value - Valor a establecer
     */
    const setFieldValue = useCallback((name, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));

        setTouched(prevTouched => ({
            ...prevTouched,
            [name]: true
        }));
    }, []);

    /**
     * @function resetForm
     * @description Restablece el formulario a sus valores iniciales
     */
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting
    };
}

export default useForm;
