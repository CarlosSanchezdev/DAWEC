/**
 * @fileoverview Ejercicio 2.8 - Datos Personales
 * @ejercicio 2.8
 * @tema Variables y Operaciones Básicas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_8_DatosPersonales.module.css";

/**
 * @function Ej2_8_DatosPersonales
 * @description Componente que formatea y muestra datos personales
 * @returns {JSX.Element} Interfaz para entrada y formateo de datos personales
 */
function Ej2_8_DatosPersonales() {
	const [formData, setFormData] = useState({
		nombre: "",
		apellido: "",
		poblacion: "",
	});
	const [mensaje, setMensaje] = useState("");

	/**
	 * @function handleChange
	 * @description Maneja los cambios en los campos del formulario
	 * @param {Event} e Evento del input
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	/**
	 * @function formatearDatos
	 * @description Formatea los datos personales y muestra el mensaje
	 * @param {Event} e Evento del formulario
	 */
	const formatearDatos = (e) => {
		e.preventDefault();
		const { nombre, apellido, poblacion } = formData;

		// Validar que no haya campos vacíos
		if (!nombre.trim() || !apellido.trim() || !poblacion.trim()) {
			alert("Por favor, complete todos los campos");
			return;
		}

		// Formatear datos (primera letra mayúscula, resto minúscula)
		const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
		const apellidoFormateado = apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase();
		const poblacionFormateada = poblacion.charAt(0).toUpperCase() + poblacion.slice(1).toLowerCase();

		const mensajeFormateado = `¡Hola ${nombreFormateado} ${apellidoFormateado}! Veo que eres de ${poblacionFormateada}.`;
		setMensaje(mensajeFormateado);
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={formatearDatos}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="nombre">Nombre:</label>
					<input
						type="text"
						id="nombre"
						name="nombre"
						value={formData.nombre}
						onChange={handleChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="apellido">Apellido:</label>
					<input
						type="text"
						id="apellido"
						name="apellido"
						value={formData.apellido}
						onChange={handleChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="poblacion">Población:</label>
					<input
						type="text"
						id="poblacion"
						name="poblacion"
						value={formData.poblacion}
						onChange={handleChange}
						required
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Formatear Datos
				</button>
			</form>

			{mensaje && (
				<div className={styles.mensaje}>
					<h3>Mensaje formateado:</h3>
					<p>{mensaje}</p>
				</div>
			)}

			<div className={styles.ejemplos}>
				<h3>Ejemplos de formato:</h3>
				<ul>
					<li>
						<strong>Entrada:</strong> "JUAN" → <strong>Salida:</strong> "Juan"
					</li>
					<li>
						<strong>Entrada:</strong> "maría" → <strong>Salida:</strong> "María"
					</li>
					<li>
						<strong>Entrada:</strong> "SeViLLa" → <strong>Salida:</strong> "Sevilla"
					</li>
				</ul>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Manipulación de strings</li>
					<li>Métodos de string (charAt, slice, toLowerCase)</li>
					<li>Template literals</li>
					<li>Formularios controlados en React</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_8_DatosPersonales;
