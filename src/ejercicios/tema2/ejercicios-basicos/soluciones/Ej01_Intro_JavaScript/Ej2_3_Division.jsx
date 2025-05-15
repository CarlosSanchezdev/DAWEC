/**
 * @fileoverview Ejercicio 2.3 - División de Números
 * @ejercicio 2.3
 * @tema Operaciones y Variables Básicas
 * @fecha 2024-01-25
 */

import React, { useState } from "react";
import styles from "./Ej2_3_Division.module.css";

/**
 * @function Ej2_3_Division
 * @description Componente que realiza la división de dos números,
 *             manejando casos especiales como división por cero y valores no numéricos
 * @returns {JSX.Element} Componente renderizado
 */
const Ej2_3_Division = () => {
	// ===== HOOKS =====
	const [num1, setNum1] = useState("");
	const [num2, setNum2] = useState("");
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState(null);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function validarNumero
	 * @description Valida si un valor es un número válido
	 * @param {string} valor - El valor a validar
	 * @param {string} campo - Nombre del campo para el mensaje de error
	 * @returns {number|null} El número validado o null si hay error
	 */
	const validarNumero = (valor, campo) => {
		if (valor.trim() === "") {
			setError(`Por favor, ingrese el ${campo}`);
			return null;
		}

		const num = Number(valor);
		if (isNaN(num)) {
			setError(`El ${campo} debe ser un número válido`);
			return null;
		}

		return num;
	};

	/**
	 * @function realizarDivision
	 * @description Realiza la división manejando todos los casos especiales
	 */
	const realizarDivision = () => {
		setError(null);
		setResultado(null);

		const numero1 = validarNumero(num1, "primer número");
		if (numero1 === null) return;

		const numero2 = validarNumero(num2, "segundo número");
		if (numero2 === null) return;

		if (numero2 === 0) {
			setError("No es posible dividir por cero");
			return;
		}

		setResultado(numero1 / numero2);
	};

	// ===== RENDER =====
	return (
		<div className={styles.container}>
			<h2>Ejercicio 2.3 - División de Números</h2>

			<div className={styles.calculadora}>
				<div className={styles.inputs}>
					<input
						type="text"
						value={num1}
						onChange={(e) => setNum1(e.target.value)}
						placeholder="Primer número"
						className={styles.input}
					/>
					<span className={styles.operador}>÷</span>
					<input
						type="text"
						value={num2}
						onChange={(e) => setNum2(e.target.value)}
						placeholder="Segundo número"
						className={styles.input}
					/>
				</div>

				<button
					onClick={realizarDivision}
					className={styles.button}>
					Dividir
				</button>

				{error && <div className={styles.error}>{error}</div>}

				{resultado !== null && (
					<div className={styles.resultado}>
						<p>Resultado: {resultado}</p>
					</div>
				)}
			</div>

			<div className={styles.explanation}>
				<h3>Explicación:</h3>
				<p>Este ejercicio demuestra:</p>
				<ul>
					<li>Validación de entrada de datos</li>
					<li>Manejo de errores (división por cero)</li>
					<li>Conversión de tipos de datos</li>
					<li>Operaciones matemáticas básicas</li>
				</ul>
			</div>
		</div>
	);
};

export default Ej2_3_Division;
