/**
 * @fileoverview Componente de formulario para añadir o modificar personas
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";

/**
 * @function FormPersona
 * @description Componente de formulario para añadir o modificar personas
 * @param {Object} props - Propiedades del componente
 * @param {Object} [props.persona] - Persona a modificar (null si es nueva)
 * @param {Function} props.onGuardar - Función a llamar al guardar
 * @param {Function} props.onCancelar - Función a llamar al cancelar
 * @param {string} props.titulo - Título del formulario
 * @returns {JSX.Element} Componente de formulario
 */
function FormPersona({ persona, onGuardar, onCancelar, titulo }) {
	// ===== HOOKS =====
	const [formData, setFormData] = useState({
		nombre: "",
		peso: "",
		altura: "",
	});

	const [errores, setErrores] = useState({
		nombre: "",
		peso: "",
		altura: "",
	});

	// Cargar datos si se está editando
	useEffect(() => {
		if (persona) {
			setFormData({
				nombre: persona.nombre,
				peso: persona.peso.toString(),
				altura: persona.altura.toString(),
			});
		}
	}, [persona]);

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

		// Limpiar error al modificar el campo
		if (errores[name]) {
			setErrores({
				...errores,
				[name]: "",
			});
		}
	};

	/**
	 * @function validarFormulario
	 * @description Valida los datos del formulario
	 * @returns {boolean} true si es válido, false si hay errores
	 */
	const validarFormulario = () => {
		const nuevosErrores = {
			nombre: "",
			peso: "",
			altura: "",
		};

		let esValido = true;

		// Validar nombre
		if (!formData.nombre.trim()) {
			nuevosErrores.nombre = "El nombre es obligatorio";
			esValido = false;
		}

		// Validar peso
		if (!formData.peso.trim()) {
			nuevosErrores.peso = "El peso es obligatorio";
			esValido = false;
		} else if (isNaN(parseFloat(formData.peso)) || parseFloat(formData.peso) <= 0) {
			nuevosErrores.peso = "El peso debe ser un número positivo";
			esValido = false;
		}

		// Validar altura
		if (!formData.altura.trim()) {
			nuevosErrores.altura = "La altura es obligatoria";
			esValido = false;
		} else if (isNaN(parseFloat(formData.altura)) || parseFloat(formData.altura) <= 0) {
			nuevosErrores.altura = "La altura debe ser un número positivo";
			esValido = false;
		}

		setErrores(nuevosErrores);
		return esValido;
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {Event} e - Evento de envío
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validarFormulario()) {
			onGuardar(formData);
		}
	};

	// ===== RENDER =====
	return (
		<div className="form-container">
			<h2>{titulo}</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-grupo">
					<label htmlFor="nombre">Nombre:</label>
					<input
						type="text"
						id="nombre"
						name="nombre"
						value={formData.nombre}
						onChange={handleChange}
						className={errores.nombre ? "input-error" : ""}
					/>
					{errores.nombre && <div className="texto-error">{errores.nombre}</div>}
				</div>

				<div className="form-grupo">
					<label htmlFor="peso">Peso (kg):</label>
					<input
						type="number"
						id="peso"
						name="peso"
						value={formData.peso}
						onChange={handleChange}
						step="0.01"
						min="0"
						className={errores.peso ? "input-error" : ""}
					/>
					{errores.peso && <div className="texto-error">{errores.peso}</div>}
				</div>

				<div className="form-grupo">
					<label htmlFor="altura">Altura (m):</label>
					<input
						type="number"
						id="altura"
						name="altura"
						value={formData.altura}
						onChange={handleChange}
						step="0.01"
						min="0"
						className={errores.altura ? "input-error" : ""}
					/>
					{errores.altura && <div className="texto-error">{errores.altura}</div>}
				</div>

				<div className="form-acciones">
					<button
						type="button"
						className="btn-secundario"
						onClick={onCancelar}>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn-principal">
						{persona ? "Guardar Cambios" : "Añadir Persona"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default FormPersona;
