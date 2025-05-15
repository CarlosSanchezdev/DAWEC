/**
 * @fileoverview Ejercicio 2.5 - Múltiplos de un número
 * @ejercicio 2.5
 * @tema Variables y Operaciones Básicas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_5_Multiplos.module.css";

/**
 * @function Ej2_5_Multiplos
 * @description Componente que calcula y muestra el doble, triple y cuádruple de un número
 * @returns {JSX.Element} Interfaz para calcular múltiplos
 */
function Ej2_5_Multiplos() {
	const [numero, setNumero] = useState("");
	const [resultados, setResultados] = useState(null);

	/**
	 * @function calcularMultiplos
	 * @description Calcula los múltiplos del número ingresado
	 * @param {Event} e Evento del formulario
	 */
	const calcularMultiplos = (e) => {
		e.preventDefault();
		const num = parseFloat(numero);

		if (isNaN(num)) {
			alert("Por favor, ingrese un número válido");
			return;
		}

		setResultados({
			doble: num * 2,
			triple: num * 3,
			cuadruple: num * 4,
		});
	};

	return (
		<div className={styles.container}>
			<form
				onSubmit={calcularMultiplos}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="numero">Ingrese un número:</label>
					<input
						type="number"
						id="numero"
						value={numero}
						onChange={(e) => setNumero(e.target.value)}
						required
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular Múltiplos
				</button>
			</form>

			{resultados && (
				<div className={styles.resultados}>
					<h3>Resultados:</h3>
					<ul>
						<li>Doble: {resultados.doble}</li>
						<li>Triple: {resultados.triple}</li>
						<li>Cuádruple: {resultados.cuadruple}</li>
					</ul>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Operaciones matemáticas básicas</li>
					<li>Manejo de formularios en React</li>
					<li>Validación de entrada numérica</li>
					<li>Estados y eventos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_5_Multiplos;
