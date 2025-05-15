/**
 * @fileoverview Componente de formulario para crear o editar líneas de autobús
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";

/**
 * @function FormLinea
 * @description Componente para crear o editar una línea de autobús
 * @param {Object} props - Propiedades del componente
 * @param {Object} [props.linea] - Línea a editar (opcional)
 * @param {Function} props.onGuardar - Función para guardar la línea
 * @param {Function} props.onCancelar - Función para cancelar el formulario
 * @returns {JSX.Element} Componente de formulario de línea
 *
 * IMPORTANTE: Este componente valida los datos del formulario antes de enviarlos
 * utilizando las mismas reglas que el modelo Linea.
 */
function FormLinea({ linea, onGuardar, onCancelar }) {
	// ===== HOOKS =====
	const [formData, setFormData] = useState({
		numero: "",
		origen: "",
		destino: "",
		horaSalida: "",
		intervalo: "",
	});

	const [errores, setErrores] = useState({});

	// ===== EFECTOS =====

	/**
	 * Efecto para cargar los datos de la línea si se está editando
	 */
	useEffect(() => {
		if (linea) {
			setFormData({
				numero: linea.numero,
				origen: linea.origen,
				destino: linea.destino,
				horaSalida: linea.horaSalida,
				intervalo: linea.intervalo,
			});
		}
	}, [linea]);

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

		// Validación del número de línea
		if (!formData.numero) {
			nuevosErrores.numero = "El número de línea es obligatorio";
		} else if (!/^\d+$/.test(formData.numero) || parseInt(formData.numero) < 1) {
			nuevosErrores.numero = "El número de línea debe ser un entero mayor o igual a 1";
		}

		// Validación del origen
		if (!formData.origen.trim()) {
			nuevosErrores.origen = "El origen es obligatorio";
		}

		// Validación del destino
		if (!formData.destino.trim()) {
			nuevosErrores.destino = "El destino es obligatorio";
		} else if (formData.destino.trim().toLowerCase() === formData.origen.trim().toLowerCase()) {
			nuevosErrores.destino = "El destino no puede ser igual al origen";
		}

		// Validación de la hora de salida
		if (!formData.horaSalida) {
			nuevosErrores.horaSalida = "La hora de salida es obligatoria";
		} else if (!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(formData.horaSalida)) {
			nuevosErrores.horaSalida = "La hora de salida debe tener formato HH:MM";
		}

		// Validación del intervalo
		if (!formData.intervalo) {
			nuevosErrores.intervalo = "El intervalo es obligatorio";
		} else if (!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(formData.intervalo)) {
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
			};

			onGuardar(datosValidados);
		}
	};

	// ===== RENDER =====

	return (
		<div className="formulario">
			<h2>{linea ? "Editar Línea" : "Nueva Línea"}</h2>

			<form onSubmit={handleSubmit}>
				<div className="campo-form">
					<label htmlFor="numero">Número de Línea:</label>
					<input
						type="number"
						id="numero"
						name="numero"
						value={formData.numero}
						onChange={handleChange}
						min="1"
						disabled={linea} // No permitir cambiar el número en edición
						required
					/>
					{errores.numero && <div className="error-campo">{errores.numero}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="origen">Origen:</label>
					<input
						type="text"
						id="origen"
						name="origen"
						value={formData.origen}
						onChange={handleChange}
						required
					/>
					{errores.origen && <div className="error-campo">{errores.origen}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="destino">Destino:</label>
					<input
						type="text"
						id="destino"
						name="destino"
						value={formData.destino}
						onChange={handleChange}
						required
					/>
					{errores.destino && <div className="error-campo">{errores.destino}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="horaSalida">Hora de Salida (HH:MM):</label>
					<input
						type="text"
						id="horaSalida"
						name="horaSalida"
						value={formData.horaSalida}
						onChange={handleChange}
						placeholder="00:00"
						pattern="^([0-1][0-9]|2[0-3]):([0-5][0-9])$"
						required
					/>
					{errores.horaSalida && <div className="error-campo">{errores.horaSalida}</div>}
				</div>

				<div className="campo-form">
					<label htmlFor="intervalo">Intervalo (HH:MM):</label>
					<input
						type="text"
						id="intervalo"
						name="intervalo"
						value={formData.intervalo}
						onChange={handleChange}
						placeholder="00:30"
						pattern="^([0-1][0-9]|2[0-3]):([0-5][0-9])$"
						required
					/>
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
						{linea ? "Actualizar" : "Guardar"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormLinea;
