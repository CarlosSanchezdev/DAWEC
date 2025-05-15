/**
 * @fileoverview Ejercicio 2.26 - Ordenar Números
 * @ejercicio 2.26
 * @tema Arrays y Ordenación
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_26_OrdenarNumeros.module.css";

/**
 * @function Ej2_26_OrdenarNumeros
 * @description Lee tres números y los escribe en orden decreciente
 * @returns {JSX.Element} Interfaz para ordenar números
 */
function Ej2_26_OrdenarNumeros() {
	const [numeros, setNumeros] = useState({
		num1: "",
		num2: "",
		num3: "",
	});
	const [resultado, setResultado] = useState(null);

	/**
	 * @function ordenarNumeros
	 * @description Ordena los números de mayor a menor
	 * @param {Event} e Evento del formulario
	 */
	const ordenarNumeros = (e) => {
		e.preventDefault();
		const nums = [parseFloat(numeros.num1), parseFloat(numeros.num2), parseFloat(numeros.num3)];

		if (nums.some(isNaN)) {
			alert("Por favor, ingrese números válidos");
			return;
		}

		const ordenados = [...nums].sort((a, b) => b - a);
		const pasos = generarPasos(nums, ordenados);

		setResultado({
			original: nums,
			ordenados,
			pasos,
		});
	};

	/**
	 * @function generarPasos
	 * @description Genera los pasos del proceso de ordenación
	 * @param {Array} original Array original
	 * @param {Array} final Array ordenado
	 * @returns {Array} Pasos del proceso
	 */
	const generarPasos = (original) => {
		const pasos = [];
		const nums = [...original];

		// Implementación simple de bubble sort para mostrar el proceso
		for (let i = 0; i < nums.length - 1; i++) {
			for (let j = 0; j < nums.length - 1 - i; j++) {
				if (nums[j] < nums[j + 1]) {
					// Intercambio
					const temp = nums[j];
					nums[j] = nums[j + 1];
					nums[j + 1] = temp;
					pasos.push([...nums]);
				}
			}
		}

		return pasos;
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let num1 = parseFloat(prompt("Ingrese el primer número:"));
let num2 = parseFloat(prompt("Ingrese el segundo número:"));
let num3 = parseFloat(prompt("Ingrese el tercer número:"));

let numeros = [num1, num2, num3];
numeros.sort((a, b) => b - a);

console.log("Números ordenados de mayor a menor:");
numeros.forEach(num => console.log(num));`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={ordenarNumeros}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="num1">Primer número:</label>
					<input
						type="number"
						id="num1"
						value={numeros.num1}
						onChange={(e) => setNumeros({ ...numeros, num1: e.target.value })}
						required
						step="any"
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="num2">Segundo número:</label>
					<input
						type="number"
						id="num2"
						value={numeros.num2}
						onChange={(e) => setNumeros({ ...numeros, num2: e.target.value })}
						required
						step="any"
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="num3">Tercer número:</label>
					<input
						type="number"
						id="num3"
						value={numeros.num3}
						onChange={(e) => setNumeros({ ...numeros, num3: e.target.value })}
						required
						step="any"
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Ordenar Números
				</button>
			</form>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Números originales:</span>
							<span>{resultado.original.join(" - ")}</span>
						</div>
						<div className={`${styles.linea} ${styles.total}`}>
							<span>Orden decreciente:</span>
							<span>{resultado.ordenados.join(" > ")}</span>
						</div>
					</div>

					<div className={styles.visualizacion}>
						<h4>Visualización del proceso:</h4>
						<div className={styles.barras}>
							{resultado.ordenados.map((num, index) => (
								<div
									key={index}
									className={styles.barra}
									style={{
										height: `${(num / Math.max(...resultado.ordenados)) * 100}%`,
									}}>
									{num}
								</div>
							))}
						</div>
					</div>

					{resultado.pasos.length > 0 && (
						<div className={styles.pasos}>
							<h4>Pasos de ordenación:</h4>
							{resultado.pasos.map((paso, index) => (
								<div
									key={index}
									className={styles.paso}>
									<span>Paso {index + 1}:</span>
									<span>{paso.join(" > ")}</span>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Arrays y método sort</li>
					<li>Comparación de números</li>
					<li>Visualización de datos</li>
					<li>Algoritmo de ordenación (Bubble Sort)</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_26_OrdenarNumeros;
