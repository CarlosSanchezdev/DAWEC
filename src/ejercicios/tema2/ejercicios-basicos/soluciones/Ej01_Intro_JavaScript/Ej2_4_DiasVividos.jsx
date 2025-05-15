/**
 * @fileoverview Ejercicio 2.4 - Cálculo de Días Vividos
 * @ejercicio 2.4
 * @tema Operaciones y Variables Básicas
 * @fecha 2024-01-25
 */

import React, { useState } from "react";
import styles from "./Ej2_4_DiasVividos.module.css";

/**
 * @function Ej2_4_DiasVividos
 * @description Componente que calcula los días vividos basado en la edad ingresada
 * @returns {JSX.Element} Componente renderizado
 */
const Ej2_4_DiasVividos = () => {
	// ===== HOOKS =====
	const [edad, setEdad] = useState("");
	const [diasVividos, setDiasVividos] = useState(null);
	const [error, setError] = useState(null);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function calcularDias
	 * @description Calcula los días vividos según la edad ingresada
	 */
	const calcularDias = () => {
		setError(null);
		setDiasVividos(null);

		// Validar que se ingresó un valor
		if (edad.trim() === "") {
			setError("Por favor, ingrese su edad");
			return;
		}

		// Convertir y validar el número
		const edadNum = Number(edad);
		if (isNaN(edadNum)) {
			setError("La edad debe ser un número válido");
			return;
		}

		// Validar que la edad sea positiva y razonable
		if (edadNum <= 0) {
			setError("La edad debe ser mayor que 0");
			return;
		}
		if (edadNum > 150) {
			setError("Por favor, ingrese una edad válida");
			return;
		}

		// IMPORTANTE: Consideramos años de 365 días según el enunciado
		const dias = Math.floor(edadNum * 365);
		setDiasVividos(dias);
	};

	// ===== RENDER =====
	return (
		<div className={styles.container}>
			<h2>Ejercicio 2.4 - Cálculo de Días Vividos</h2>

			<div className={styles.calculadora}>
				<div className={styles.inputGroup}>
					<label htmlFor="edad">Ingrese su edad:</label>
					<input
						id="edad"
						type="number"
						min="0"
						max="150"
						value={edad}
						onChange={(e) => setEdad(e.target.value)}
						placeholder="Edad en años"
						className={styles.input}
					/>
				</div>

				<button
					onClick={calcularDias}
					className={styles.button}>
					Calcular días vividos
				</button>

				{error && <div className={styles.error}>{error}</div>}

				{diasVividos !== null && (
					<div className={styles.resultado}>
						<p>Has vivido aproximadamente:</p>
						<p className={styles.dias}>{diasVividos.toLocaleString()} días</p>
						<p className={styles.nota}>(Basado en años de 365 días)</p>
					</div>
				)}
			</div>

			<div className={styles.explanation}>
				<h3>Explicación:</h3>
				<p>Este ejercicio demuestra:</p>
				<ul>
					<li>Uso de input numérico con validaciones</li>
					<li>Operaciones matemáticas simples</li>
					<li>Manejo de errores y validaciones</li>
					<li>Formateo de números grandes</li>
				</ul>
			</div>
		</div>
	);
};

export default Ej2_4_DiasVividos;
