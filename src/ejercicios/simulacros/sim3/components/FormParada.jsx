/**
 * @fileoverview Componente de formulario para crear o editar paradas de autobús
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";

/**
 * @function FormParada
 * @description Componente para crear o editar una parada de autobús
 * @param {Object} props - Propiedades del componente
 * @param {Object} [props.parada] - Parada a editar (opcional)
 * @param {number} props.numeroLinea - Número de línea de la parada
 * @param {Function} props.onGuardar - Función para guardar la parada
 * @param {Function} props.onCancelar - Función para cancelar el formulario
 * @returns {JSX.Element} Componente de formulario de parada
 *
 * IMPORTANTE: Este componente valida los datos del formulario antes de enviarlos
 * utilizando las mismas reglas que el modelo Parada.
 */
function FormParada({ parada, numeroLinea, onGuardar, onCancelar }) {
	// ===== HOOKS =====
	const [formData, setFormData] = useState({
		numero: "",
		numeroLinea: numeroLinea,
		localidad: "",
		intervalo: "",
	});

	const [errores, setErrores] = useState({});

	// ===== EFECTOS =====

	/**
	 * Efecto para cargar los datos de la parada si se está editando
	 */
	useEffect(() => {
		if (parada) {
			setFormData({
				numero: parada.numero,
				numeroLinea: parada.numeroLinea,
				localidad: parada.localidad,
				intervalo: parada.intervalo,
			});
		} else {
			// Si es una nueva parada, establecer la línea seleccionada
			setFormData((prevState) => ({
				...prevState,
				numeroLinea: numeroLinea,
			}));
		}
	}, [parada, numeroLinea]);

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function handleChange
	 * @description Maneja los cambios en los campos del formulario
	 * @param {Event} e - Evento de cambio
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Limpia el error del campo al modificarlo
		if (errores[name]) {
			setErrores({
				...errores,
				[name]: null,
			});
		}
	};

	/**
	 * @function validarFormulario
	 * @description Valida los datos del formulario
	 * @returns {boolean} true si el formulario es válido
	 */
	const validarFormulario = () => {
		const nuevosErrores = {};

		// Validación del número de parada
		if (!formData.numero) {
			nuevosErrores.numero = "El número de parada es obligatorio";
		} else if (!/^\d+$/.test(formData.numero) || parseInt(formData.numero) < 1) {
			nuevosErrores.numero = "El número de parada debe ser un entero mayor o igual a 1";
		}

		// Validación de la localidad
		if (!formData.localidad.trim()) {
			nuevosErrores.localidad = "La localidad es obligatoria";
		}

		// Validación del intervalo
		if (!formData.intervalo) {
			nuevosErrores.intervalo = "El intervalo es obligatorio";
		} else if (!/^([0-9][0-9]):([0-5][0-9])$/.test(formData.intervalo)) {
			nuevosErrores.intervalo = "El intervalo debe tener formato HH:MM";
		}

		setErrores(nuevosErrores);
		return Object.keys(nuevosErrores).length === 0;
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {Event} e - Evento de envío
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validarFormulario()) {
			// Convertir el número a entero
			const datosValidados = {
				...formData,
				numero: parseInt(formData.numero),
				numeroLinea: parseInt(formData.numeroLinea),
			};

			onGuardar(datosValidados);
		}
	};

	// ===== RENDER =====

	return (
		<div className="formulario">
			<h2>{parada ? "Editar Parada" : "Nueva Parada"}</h2>

			<form onSubmit={handleSubmit}>
				<div className="campo-form">
					<label htmlFor="numero">Número de Parada:</label>
					<input
						type="number"
						id="numero"
						name="numero"
						value={formData.numero}
						onChange={handleChange}
						min="1"
						disabled={parada} // No permitir cambiar el número en edición
						required
					/>
					{errores.numero && <div className="error-campo">{errores.numero}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="numeroLinea">Número de Línea:</label>
					<input
						type="number"
						id="numeroLinea"
						name="numeroLinea"
						value={formData.numeroLinea}
						disabled // No permitir cambiar la línea
						required
					/>
				</div>

				<div className="campo-form">
					<label htmlFor="localidad">Localidad:</label>
					<input
						type="text"
						id="localidad"
						name="localidad"
						value={formData.localidad}
						onChange={handleChange}
						required
					/>
					{errores.localidad && <div className="error-campo">{errores.localidad}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="intervalo">Intervalo desde salida (HH:MM):</label>
					<input
						type="text"
						id="intervalo"
						name="intervalo"
						value={formData.intervalo}
						onChange={handleChange}
						placeholder="00:00"
						pattern="^([0-9][0-9]):([0-5][0-9])$"
						required
					/>
					<small>Para la parada de origen debe ser 00:00</small>
					{errores.intervalo && <div className="error-campo">{errores.intervalo}</div>}
				</div>

				<div className="botones-form">
					<button
						type="button"
						className="btn-cancelar"
						onClick={onCancelar}>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn-guardar">
						{parada ? "Actualizar" : "Guardar"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormParada;
