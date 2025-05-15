/**
 * @fileoverview Ejercicio 2.7 - Círculo y Circunferencia
 * @ejercicio 2.7
 * @tema Variables y Operaciones Básicas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_7_Circulo.module.css";

/**
 * @function Ej2_7_Circulo
 * @description Componente que calcula longitud de circunferencia y área del círculo
 * @returns {JSX.Element} Interfaz para cálculos de círculo
 */
function Ej2_7_Circulo() {
	const [radio, setRadio] = useState("");
	const [resultados, setResultados] = useState(null);
	const PI = Math.PI;

	/**
	 * @function calcularCirculo
	 * @description Calcula la longitud de la circunferencia y el área del círculo
	 * @param {Event} e Evento del formulario
	 */
	const calcularCirculo = (e) => {
		e.preventDefault();
		const r = parseFloat(radio);

		if (isNaN(r)) {
			alert("Por favor, ingrese un número válido");
			return;
		}

		if (r <= 0) {
			alert("El radio debe ser mayor que 0");
			return;
		}

		setResultados({
			longitud: 2 * PI * r,
			area: PI * r * r,
		});
	};

	/**
	 * @function formatearNumero
	 * @description Formatea un número a 4 decimales
	 * @param {number} num Número a formatear
	 * @returns {string} Número formateado
	 */
	const formatearNumero = (num) => {
		return num.toFixed(4);
	};

	return (
		<div className={styles.container}>
			<div className={styles.teoria}>
				<h3>Fórmulas:</h3>
				<ul>
					<li>
						<strong>Longitud de la circunferencia:</strong> L = 2πr
					</li>
					<li>
						<strong>Área del círculo:</strong> A = πr²
					</li>
					<li>
						<strong>Valor de π:</strong> {formatearNumero(PI)}
					</li>
				</ul>
			</div>

			<form
				onSubmit={calcularCirculo}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="radio">Radio del círculo:</label>
					<input
						type="number"
						id="radio"
						value={radio}
						onChange={(e) => setRadio(e.target.value)}
						required
						className={styles.input}
						step="any"
						min="0"
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular
				</button>
			</form>

			{resultados && (
				<div className={styles.resultados}>
					<h3>Resultados:</h3>
					<ul>
						<li>Longitud de la circunferencia: {formatearNumero(resultados.longitud)} unidades</li>
						<li>Área del círculo: {formatearNumero(resultados.area)} unidades cuadradas</li>
					</ul>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Constante matemática PI</li>
					<li>Fórmulas geométricas</li>
					<li>Formateo de números decimales</li>
					<li>Validación de entrada</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_7_Circulo;
