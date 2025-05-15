/**
 * @fileoverview Ejercicio 2.33 - Operaciones Múltiples
 * @ejercicio 2.33
 * @tema Operadores y Cálculos
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_33_OperacionesMultiples.module.css";

/**
 * @typedef {Object} OperacionHistorial
 * @property {string} operacion - Tipo de operación realizada
 * @property {number[]} numeros - Números utilizados en la operación
 * @property {number} resultado - Resultado de la operación
 */

/**
 * @function realizarOperacion
 * @description Realiza una operación matemática con múltiples números
 * @param {string} operacion - Tipo de operación a realizar
 * @param {number[]} numeros - Array de números para la operación
 * @returns {number} Resultado de la operación
 */
const realizarOperacion = (operacion, numeros) => {
	switch (operacion) {
		case "suma":
			return numeros.reduce((a, b) => a + b, 0);
		case "resta":
			return numeros.reduce((a, b) => a - b);
		case "multiplicacion":
			return numeros.reduce((a, b) => a * b, 1);
		case "division":
			return numeros.reduce((a, b) => a / b);
		case "potencia":
			return numeros.reduce((a, b) => Math.pow(a, b));
		case "promedio":
			return numeros.reduce((a, b) => a + b, 0) / numeros.length;
		default:
			throw new Error("Operación no válida");
	}
};

/**
 * @function formatearOperacion
 * @description Formatea una operación para mostrarla como texto
 * @param {string} operacion - Tipo de operación
 * @param {number[]} numeros - Números de la operación
 * @param {number} resultado - Resultado de la operación
 * @returns {string} Operación formateada
 */
const formatearOperacion = (operacion, numeros, resultado) => {
	const simbolos = {
		suma: "+",
		resta: "-",
		multiplicacion: "×",
		division: "÷",
		potencia: "^",
		promedio: "promedio",
	};

	if (operacion === "promedio") {
		return `promedio(${numeros.join(", ")}) = ${resultado}`;
	}

	return `${numeros.join(` ${simbolos[operacion]} `)} = ${resultado}`;
};

/**
 * @function Ej2_33_OperacionesMultiples
 * @description Componente que permite realizar múltiples operaciones matemáticas
 * @returns {JSX.Element} Componente React
 */
function Ej2_33_OperacionesMultiples() {
	const [numeros, setNumeros] = useState(["", ""]);
	const [operacion, setOperacion] = useState("suma");
	const [historial, setHistorial] = useState([]);
	const [error, setError] = useState("");

	/**
	 * @function agregarNumero
	 * @description Agrega un nuevo campo para número
	 */
	const agregarNumero = () => {
		setNumeros([...numeros, ""]);
	};

	/**
	 * @function actualizarNumero
	 * @description Actualiza un número en una posición específica
	 * @param {number} index - Índice del número a actualizar
	 * @param {string} valor - Nuevo valor
	 */
	const actualizarNumero = (index, valor) => {
		const nuevosNumeros = [...numeros];
		nuevosNumeros[index] = valor;
		setNumeros(nuevosNumeros);
	};

	/**
	 * @function eliminarNumero
	 * @description Elimina un número del array
	 * @param {number} index - Índice del número a eliminar
	 */
	const eliminarNumero = (index) => {
		if (numeros.length > 2) {
			const nuevosNumeros = numeros.filter((_, i) => i !== index);
			setNumeros(nuevosNumeros);
		}
	};

	/**
	 * @function calcular
	 * @description Realiza el cálculo y actualiza el historial
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");

		try {
			const numerosValidos = numeros.map((n) => {
				const num = parseFloat(n);
				if (isNaN(num)) {
					throw new Error("Todos los campos deben ser números válidos");
				}
				return num;
			});

			if (operacion === "division" && numerosValidos.includes(0)) {
				throw new Error("No se puede dividir por cero");
			}

			const resultado = realizarOperacion(operacion, numerosValidos);

			if (!isFinite(resultado)) {
				throw new Error("El resultado es demasiado grande o indefinido");
			}

			const nuevaOperacion = {
				operacion,
				numeros: numerosValidos,
				resultado,
			};

			setHistorial([nuevaOperacion, ...historial].slice(0, 10));
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Calculadora de Operaciones Múltiples</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.numerosContainer}>
					{numeros.map((numero, index) => (
						<div
							key={index}
							className={styles.numeroGrupo}>
							<input
								type="number"
								value={numero}
								onChange={(e) => actualizarNumero(index, e.target.value)}
								placeholder={`Número ${index + 1}`}
								step="any"
							/>
							{numeros.length > 2 && (
								<button
									type="button"
									onClick={() => eliminarNumero(index)}
									className={styles.eliminarBtn}>
									×
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={agregarNumero}
						className={styles.agregarBtn}>
						+ Agregar número
					</button>
				</div>

				<div className={styles.operacionGrupo}>
					<label htmlFor="operacion">Operación:</label>
					<select
						id="operacion"
						value={operacion}
						onChange={(e) => setOperacion(e.target.value)}>
						<option value="suma">Suma</option>
						<option value="resta">Resta</option>
						<option value="multiplicacion">Multiplicación</option>
						<option value="division">División</option>
						<option value="potencia">Potencia</option>
						<option value="promedio">Promedio</option>
					</select>
				</div>

				<button
					type="submit"
					className={styles.calcularBtn}>
					Calcular
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{historial.length > 0 && (
				<div className={styles.historial}>
					<h3>Historial de operaciones</h3>
					<div className={styles.historialLista}>
						{historial.map((item, index) => (
							<div
								key={index}
								className={styles.historialItem}>
								{formatearOperacion(item.operacion, item.numeros, item.resultado)}
							</div>
						))}
					</div>
				</div>
			)}

			<div className={styles.instrucciones}>
				<h3>Instrucciones:</h3>
				<ul>
					<li>Ingrese al menos dos números para realizar operaciones</li>
					<li>Puede agregar más números haciendo clic en "Agregar número"</li>
					<li>Seleccione la operación que desea realizar</li>
					<li>El historial muestra las últimas 10 operaciones</li>
					<li>Para números decimales, use el punto como separador</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_33_OperacionesMultiples;
