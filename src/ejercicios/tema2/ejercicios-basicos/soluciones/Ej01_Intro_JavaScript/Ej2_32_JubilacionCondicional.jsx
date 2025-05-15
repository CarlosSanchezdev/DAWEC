/**
 * @fileoverview Ejercicio 2.32 - Jubilación Condicional
 * @ejercicio 2.32
 * @tema Cálculos y Control de Flujo
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_32_JubilacionCondicional.module.css";

/**
 * @function calcularEdadJubilacion
 * @description Calcula la edad de jubilación según el año de nacimiento y años cotizados
 * @param {number} anoNacimiento - Año de nacimiento
 * @param {number} anosCotizados - Años cotizados
 * @returns {Object} Información sobre la jubilación
 */
const calcularEdadJubilacion = (anoNacimiento, anosCotizados) => {
	const anoActual = new Date().getFullYear();
	const edad = anoActual - anoNacimiento;
	const edadMinima = 65;
	const edadMaxima = 67;
	const cotizacionMinima = 35;

	// Casos especiales
	if (anosCotizados >= cotizacionMinima) {
		return {
			puedeJubilarse: edad >= edadMinima,
			edadJubilacion: edadMinima,
			anosRestantes: Math.max(0, edadMinima - edad),
			mensaje:
				edad >= edadMinima
					? "¡Ya puede jubilarse!"
					: `Podrá jubilarse a los ${edadMinima} años por tener suficientes años cotizados.`,
		};
	}

	return {
		puedeJubilarse: edad >= edadMaxima,
		edadJubilacion: edadMaxima,
		anosRestantes: Math.max(0, edadMaxima - edad),
		mensaje:
			edad >= edadMaxima
				? "¡Ya puede jubilarse!"
				: `Deberá jubilarse a los ${edadMaxima} años por no tener suficientes años cotizados.`,
	};
};

/**
 * @function Ej2_32_JubilacionCondicional
 * @description Componente que calcula la jubilación según las condiciones del usuario
 * @returns {JSX.Element} Componente React
 */
function Ej2_32_JubilacionCondicional() {
	const [anoNacimiento, setAnoNacimiento] = useState("");
	const [anosCotizados, setAnosCotizados] = useState("");
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState("");

	const anoActual = new Date().getFullYear();

	/**
	 * @function validarDatos
	 * @description Valida los datos ingresados por el usuario
	 * @returns {boolean} true si los datos son válidos, false en caso contrario
	 */
	const validarDatos = () => {
		if (!anoNacimiento || !anosCotizados) {
			setError("Por favor, complete todos los campos.");
			return false;
		}

		const ano = parseInt(anoNacimiento);
		const cotizados = parseInt(anosCotizados);

		if (isNaN(ano) || isNaN(cotizados)) {
			setError("Por favor, ingrese valores numéricos válidos.");
			return false;
		}

		if (ano < 1900 || ano > anoActual) {
			setError("El año de nacimiento debe estar entre 1900 y el año actual.");
			return false;
		}

		if (cotizados < 0 || cotizados > 50) {
			setError("Los años cotizados deben estar entre 0 y 50.");
			return false;
		}

		if (anoActual - ano < 16) {
			setError("La edad mínima para empezar a cotizar es 16 años.");
			return false;
		}

		if (cotizados > anoActual - ano - 16) {
			setError("Los años cotizados no pueden ser mayores que los años trabajables.");
			return false;
		}

		return true;
	};

	/**
	 * @function calcular
	 * @description Maneja el envío del formulario y realiza los cálculos
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");

		if (validarDatos()) {
			const resultadoCalculo = calcularEdadJubilacion(parseInt(anoNacimiento), parseInt(anosCotizados));
			setResultado(resultadoCalculo);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Calculadora de Jubilación</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.inputGrupo}>
					<label htmlFor="anoNacimiento">Año de nacimiento:</label>
					<input
						type="number"
						id="anoNacimiento"
						value={anoNacimiento}
						onChange={(e) => setAnoNacimiento(e.target.value)}
						min="1900"
						max={anoActual}
						placeholder="Ej: 1980"
					/>
				</div>

				<div className={styles.inputGrupo}>
					<label htmlFor="anosCotizados">Años cotizados:</label>
					<input
						type="number"
						id="anosCotizados"
						value={anosCotizados}
						onChange={(e) => setAnosCotizados(e.target.value)}
						min="0"
						max="50"
						placeholder="Ej: 30"
					/>
				</div>

				<button
					type="submit"
					className={styles.boton}>
					Calcular
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{resultado && (
				<div className={styles.resultado}>
					<div className={styles.mensajePrincipal}>{resultado.mensaje}</div>

					<div className={styles.detalles}>
						<p>
							<strong>Edad actual:</strong> {anoActual - parseInt(anoNacimiento)} años
						</p>
						<p>
							<strong>Edad de jubilación:</strong> {resultado.edadJubilacion} años
						</p>
						<p>
							<strong>Años restantes:</strong> {resultado.anosRestantes} años
						</p>
					</div>

					{resultado.anosRestantes > 0 && (
						<div className={styles.informacionAdicional}>
							<p>Se podrá jubilar en el año {anoActual + resultado.anosRestantes}</p>
						</div>
					)}
				</div>
			)}

			<div className={styles.instrucciones}>
				<h3>Información importante:</h3>
				<ul>
					<li>La edad mínima de jubilación es de 65 años con 35 o más años cotizados</li>
					<li>La edad máxima de jubilación es de 67 años si no se alcanza la cotización mínima</li>
					<li>Se requieren al menos 15 años cotizados para acceder a una jubilación contributiva</li>
					<li>La edad mínima para empezar a cotizar es 16 años</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_32_JubilacionCondicional;
