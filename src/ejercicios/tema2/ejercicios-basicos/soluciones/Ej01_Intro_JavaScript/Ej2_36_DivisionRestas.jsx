/**
 * @fileoverview Ejercicio 2.36 - División por Restas
 * @ejercicio 2.36
 * @tema Algoritmos y Visualización
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_36_DivisionRestas.module.css";

/**
 * @typedef {Object} PasoDivision
 * @property {number} restaParcial - Resultado de la resta en este paso
 * @property {number} cocienteParcial - Cociente acumulado hasta este paso
 * @property {string} explicacion - Explicación del paso
 */

/**
 * @typedef {Object} ResultadoDivision
 * @property {number} cociente - Resultado de la división
 * @property {number} resto - Resto de la división
 * @property {PasoDivision[]} pasos - Pasos del proceso
 */

/**
 * @function dividirPorRestas
 * @description Divide dos números usando solo restas
 * @param {number} dividendo - Número a dividir
 * @param {number} divisor - Número por el cual dividir
 * @returns {ResultadoDivision} Resultado y pasos de la división
 */
const dividirPorRestas = (dividendo, divisor) => {
	const pasos = [];
	let cociente = 0;
	let restaParcial = Math.abs(dividendo);
	const divisorAbs = Math.abs(divisor);
	const esNegativo = (dividendo < 0 && divisor > 0) || (dividendo > 0 && divisor < 0);

	while (restaParcial >= divisorAbs) {
		restaParcial -= divisorAbs;
		cociente++;

		pasos.push({
			restaParcial,
			cocienteParcial: cociente,
			explicacion: `${cociente}ª resta: ${restaParcial + divisorAbs} - ${divisorAbs} = ${restaParcial}`,
		});
	}

	// Ajustar el signo del cociente si es necesario
	if (esNegativo) {
		cociente = -cociente;
		pasos.push({
			restaParcial,
			cocienteParcial: cociente,
			explicacion: "Ajuste de signo: el resultado es negativo",
		});
	}

	return {
		cociente,
		resto: restaParcial,
		pasos,
	};
};

/**
 * @function Ej2_36_DivisionRestas
 * @description Componente que muestra la división usando restas
 * @returns {JSX.Element} Componente React
 */
function Ej2_36_DivisionRestas() {
	const [dividendo, setDividendo] = useState("");
	const [divisor, setDivisor] = useState("");
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState("");
	const [velocidad, setVelocidad] = useState(500);
	const [setMostrandoPasos] = useState(false);
	const [pasoActual, setPasoActual] = useState(0);

	/**
	 * @function validarEntrada
	 * @description Valida los números ingresados
	 * @returns {boolean} true si los números son válidos
	 */
	const validarEntrada = () => {
		if (!dividendo || !divisor) {
			setError("Por favor, ingrese ambos números");
			return false;
		}

		if (!Number.isInteger(parseFloat(dividendo)) || !Number.isInteger(parseFloat(divisor))) {
			setError("Por favor, ingrese números enteros");
			return false;
		}

		const divd = parseInt(dividendo);
		const divs = parseInt(divisor);

		if (divs === 0) {
			setError("No se puede dividir por cero");
			return false;
		}

		if (Math.abs(divd) > 1000 || Math.abs(divs) > 100) {
			setError("Por favor, use números más pequeños (dividendo ≤ 1000, divisor ≤ 100)");
			return false;
		}

		return true;
	};

	/**
	 * @function calcular
	 * @description Realiza la división y muestra los pasos
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");
		setResultado(null);
		setMostrandoPasos(false);
		setPasoActual(0);

		if (validarEntrada()) {
			const divd = parseInt(dividendo);
			const divs = parseInt(divisor);
			const resultadoCalculo = dividirPorRestas(divd, divs);
			setResultado(resultadoCalculo);
			setMostrandoPasos(true);

			// Mostrar los pasos gradualmente
			let paso = 0;
			const intervalo = setInterval(() => {
				if (paso < resultadoCalculo.pasos.length) {
					setPasoActual(paso + 1);
					paso++;
				} else {
					clearInterval(intervalo);
				}
			}, velocidad);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>División usando Restas</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.numerosGrupo}>
					<div className={styles.inputGrupo}>
						<label htmlFor="dividendo">Dividendo:</label>
						<input
							type="number"
							id="dividendo"
							value={dividendo}
							onChange={(e) => setDividendo(e.target.value)}
							placeholder="≤ 1000"
						/>
					</div>

					<span className={styles.operador}>÷</span>

					<div className={styles.inputGrupo}>
						<label htmlFor="divisor">Divisor:</label>
						<input
							type="number"
							id="divisor"
							value={divisor}
							onChange={(e) => setDivisor(e.target.value)}
							placeholder="≤ 100"
						/>
					</div>
				</div>

				<div className={styles.velocidadGrupo}>
					<label htmlFor="velocidad">Velocidad de animación:</label>
					<select
						id="velocidad"
						value={velocidad}
						onChange={(e) => setVelocidad(parseInt(e.target.value))}>
						<option value="250">Rápida (0.25s)</option>
						<option value="500">Normal (0.5s)</option>
						<option value="1000">Lenta (1s)</option>
					</select>
				</div>

				<button
					type="submit"
					className={styles.calcularBtn}>
					Dividir
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{resultado && (
				<div className={styles.resultado}>
					<div className={styles.operacion}>
						{dividendo} ÷ {divisor} = {resultado.cociente}
						{resultado.resto > 0 && ` (resto: ${resultado.resto})`}
					</div>

					<div className={styles.pasos}>
						<h3>Proceso paso a paso:</h3>
						{resultado.pasos.slice(0, pasoActual).map((paso, index) => (
							<div
								key={index}
								className={`${styles.paso} ${index === pasoActual - 1 ? styles.activo : ""}`}>
								<span className={styles.pasoNumero}>{index + 1}</span>
								<span className={styles.pasoExplicacion}>{paso.explicacion}</span>
							</div>
						))}
					</div>

					<div className={styles.explicacion}>
						<h3>¿Cómo funciona?</h3>
						<p>
							La división {dividendo} ÷ {divisor} se realiza restando repetidamente {Math.abs(divisor)} de{" "}
							{Math.abs(dividendo)} hasta que no se pueda restar más. El número de restas realizadas es el
							cociente, y el último número restante es el resto.
							{(parseInt(dividendo) < 0 || parseInt(divisor) < 0) &&
								" Como uno de los números es negativo, el resultado final es negativo."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Ej2_36_DivisionRestas;
