/**
 * @fileoverview Ejercicio 2.28 - Condiciones de Variables
 * @ejercicio 2.28
 * @tema Operadores y Condiciones
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_28_CondicionesVariables.module.css";

/**
 * @function compararVariables
 * @description Compara dos valores y retorna un objeto con todas las comparaciones
 * @param {number|string} valor1 Primer valor a comparar
 * @param {number|string} valor2 Segundo valor a comparar
 * @returns {Object} Objeto con los resultados de las comparaciones
 */
const compararVariables = (valor1, valor2) => {
	const comparaciones = {
		igualdad: valor1 === valor2,
		igualdadNoEstricta: valor1 == valor2,
		mayorQue: valor1 > valor2,
		menorQue: valor1 < valor2,
		mayorIgualQue: valor1 >= valor2,
		menorIgualQue: valor1 <= valor2,
		tiposDiferentes: typeof valor1 !== typeof valor2,
	};
	return comparaciones;
};

/**
 * @function Ej2_28_CondicionesVariables
 * @description Componente para comparar dos variables y mostrar diferentes condiciones
 * @returns {JSX.Element} Interfaz para comparar variables
 */
function Ej2_28_CondicionesVariables() {
	const [valores, setValores] = useState({
		valor1: "",
		valor2: "",
		tipo1: "number",
		tipo2: "number",
	});
	const [resultados, setResultados] = useState(null);

	/**
	 * @function manejarCambio
	 * @description Maneja los cambios en los inputs
	 * @param {Event} e Evento de cambio
	 * @param {string} campo Campo a actualizar
	 */
	const manejarCambio = (e, campo) => {
		const valor = e.target.value;
		setValores((prev) => ({
			...prev,
			[campo]: valor,
		}));
	};

	/**
	 * @function compararValores
	 * @description Compara los valores ingresados y muestra los resultados
	 * @param {Event} e Evento del formulario
	 */
	const compararValores = (e) => {
		e.preventDefault();
		let val1 = valores.valor1;
		let val2 = valores.valor2;

		// Convertir valores según el tipo seleccionado
		if (valores.tipo1 === "number") val1 = Number(val1);
		if (valores.tipo2 === "number") val2 = Number(val2);

		const resultados = compararVariables(val1, val2);
		setResultados(resultados);
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
function compararValores(valor1, valor2) {
    console.log("Igual a:", valor1 === valor2);
    console.log("Mayor que:", valor1 > valor2);
    console.log("Menor que:", valor1 < valor2);
    console.log("Mayor o igual que:", valor1 >= valor2);
    console.log("Menor o igual que:", valor1 <= valor2);
    console.log("Tipos diferentes:", typeof valor1 !== typeof valor2);
}

let num1 = prompt("Ingrese primer valor:");
let num2 = prompt("Ingrese segundo valor:");
compararValores(num1, num2);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={compararValores}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label>
						Primer valor:
						<input
							type="text"
							value={valores.valor1}
							onChange={(e) => manejarCambio(e, "valor1")}
							className={styles.input}
							required
						/>
					</label>
					<select
						value={valores.tipo1}
						onChange={(e) => manejarCambio(e, "tipo1")}
						className={styles.select}>
						<option value="number">Número</option>
						<option value="string">Texto</option>
					</select>
				</div>

				<div className={styles.inputGroup}>
					<label>
						Segundo valor:
						<input
							type="text"
							value={valores.valor2}
							onChange={(e) => manejarCambio(e, "valor2")}
							className={styles.input}
							required
						/>
					</label>
					<select
						value={valores.tipo2}
						onChange={(e) => manejarCambio(e, "tipo2")}
						className={styles.select}>
						<option value="number">Número</option>
						<option value="string">Texto</option>
					</select>
				</div>

				<button
					type="submit"
					className={styles.button}>
					Comparar Valores
				</button>
			</form>

			{resultados && (
				<div className={styles.resultado}>
					<h3>Resultados de las comparaciones:</h3>
					<div className={styles.comparaciones}>
						<div className={styles.comparacion}>
							<span>Igualdad estricta (===):</span>
							<span className={resultados.igualdad ? styles.verdadero : styles.falso}>
								{resultados.igualdad ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Igualdad no estricta (==):</span>
							<span className={resultados.igualdadNoEstricta ? styles.verdadero : styles.falso}>
								{resultados.igualdadNoEstricta ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Mayor que (&gt;):</span>
							<span className={resultados.mayorQue ? styles.verdadero : styles.falso}>
								{resultados.mayorQue ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Menor que (&lt;):</span>
							<span className={resultados.menorQue ? styles.verdadero : styles.falso}>
								{resultados.menorQue ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Mayor o igual que (&gt;=):</span>
							<span className={resultados.mayorIgualQue ? styles.verdadero : styles.falso}>
								{resultados.mayorIgualQue ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Menor o igual que (&lt;=):</span>
							<span className={resultados.menorIgualQue ? styles.verdadero : styles.falso}>
								{resultados.menorIgualQue ? "Verdadero" : "Falso"}
							</span>
						</div>
						<div className={styles.comparacion}>
							<span>Tipos diferentes:</span>
							<span className={resultados.tiposDiferentes ? styles.verdadero : styles.falso}>
								{resultados.tiposDiferentes ? "Verdadero" : "Falso"}
							</span>
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Operadores de comparación en JavaScript</li>
					<li>Comparación estricta vs no estricta</li>
					<li>Tipos de datos y coerción</li>
					<li>Operadores relacionales</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_28_CondicionesVariables;
