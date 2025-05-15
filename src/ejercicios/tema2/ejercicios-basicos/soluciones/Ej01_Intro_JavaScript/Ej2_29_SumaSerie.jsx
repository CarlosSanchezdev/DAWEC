/**
 * @fileoverview Ejercicio 2.29 - Suma de Series
 * @ejercicio 2.29
 * @tema Series y Sumatorios
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_29_SumaSerie.module.css";

/**
 * @function calcularSerieSuma
 * @description Calcula la suma de números desde 1 hasta n
 * @param {number} limite El número hasta el cual se debe sumar
 * @returns {Object} Objeto con resultado y pasos del cálculo
 */
const calcularSerieSuma = (limite) => {
	const pasos = [];
	let suma = 0;
	let serie = "";

	for (let i = 1; i <= limite; i++) {
		suma += i;
		serie += i + (i === limite ? " = " : " + ");
		pasos.push({
			numero: i,
			sumaAcumulada: suma,
			expresion: serie + suma,
		});
	}

	return {
		resultado: suma,
		pasos: pasos,
		formulaDirecta: (limite * (limite + 1)) / 2,
		formula: `(${limite} × (${limite} + 1)) ÷ 2 = ${(limite * (limite + 1)) / 2}`,
	};
};

/**
 * @function Ej2_29_SumaSerie
 * @description Componente que calcula la suma de una serie de números
 * @returns {JSX.Element} Interfaz para calcular sumas de series
 */
function Ej2_29_SumaSerie() {
	const [numero, setNumero] = useState("");
	const [resultado, setResultado] = useState(null);

	/**
	 * @function calcularSuma
	 * @description Maneja el cálculo de la suma de la serie
	 * @param {Event} e Evento del formulario
	 */
	const calcularSuma = (e) => {
		e.preventDefault();
		const limite = parseInt(numero);

		if (isNaN(limite) || limite < 1) {
			alert("Por favor, ingrese un número positivo válido");
			return;
		}

		if (limite > 1000) {
			alert("Por favor, use un número menor o igual a 1000 para evitar problemas de rendimiento");
			return;
		}

		const resultados = calcularSerieSuma(limite);
		setResultado(resultados);
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
function calcularSumaSerie(n) {
    let suma = 0;
    for(let i = 1; i <= n; i++) {
        suma += i;
    }
    return suma;
}

// O usando la fórmula de Gauss:
function sumaGauss(n) {
    return (n * (n + 1)) / 2;
}

let n = parseInt(prompt("Ingrese un número:"));
console.log("Suma de la serie:", calcularSumaSerie(n));
console.log("Usando fórmula de Gauss:", sumaGauss(n));`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={calcularSuma}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="numero">Ingrese un número (n):</label>
					<input
						type="number"
						id="numero"
						value={numero}
						onChange={(e) => setNumero(e.target.value)}
						min="1"
						max="1000"
						required
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular Suma
				</button>
			</form>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.resumenCalculo}>
						<div className={styles.formulaGauss}>
							<h4>Fórmula de Gauss:</h4>
							<p>{resultado.formula}</p>
						</div>

						<div className={styles.resultadoFinal}>
							<h4>Resultado:</h4>
							<p className={styles.suma}>{resultado.resultado}</p>
						</div>
					</div>

					<div className={styles.pasos}>
						<h4>Proceso paso a paso:</h4>
						<div className={styles.pasosLista}>
							{resultado.pasos.map((paso, index) => (
								<div
									key={index}
									className={styles.paso}>
									<span className={styles.pasoNumero}>Paso {index + 1}:</span>
									<span className={styles.pasoExpresion}>{paso.expresion}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Series numéricas y sumatorios</li>
					<li>Fórmula de Gauss para suma de series</li>
					<li>Bucles y acumuladores</li>
					<li>Optimización de cálculos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_29_SumaSerie;
