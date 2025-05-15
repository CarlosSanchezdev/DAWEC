/**
 * @fileoverview Ejercicio 2.35 - Multiplicación por Sumas
 * @ejercicio 2.35
 * @tema Algoritmos y Visualización
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_35_MultiplicacionSumas.module.css";

/**
 * @typedef {Object} PasoMultiplicacion
 * @property {number} resultado - Resultado parcial
 * @property {string} explicacion - Explicación del paso
 */

/**
 * @function multiplicarPorSumas
 * @description Multiplica dos números usando solo sumas
 * @param {number} num1 - Primer número
 * @param {number} num2 - Segundo número
 * @returns {{resultado: number, pasos: PasoMultiplicacion[]}} Resultado y pasos
 */
const multiplicarPorSumas = (num1, num2) => {
	const pasos = [];
	let resultado = 0;
	let contador = 0;
	const numPositivo1 = Math.abs(num1);
	const numPositivo2 = Math.abs(num2);
	const esNegativo = (num1 < 0 && num2 > 0) || (num1 > 0 && num2 < 0);

	// Optimización: usar el número más pequeño como contador
	const [numMenor, numMayor] =
		numPositivo1 < numPositivo2 ? [numPositivo1, numPositivo2] : [numPositivo2, numPositivo1];

	while (contador < numMenor) {
		resultado += numMayor;
		pasos.push({
			resultado: resultado,
			explicacion: `${contador + 1}ª suma: ${resultado} (${numMayor} + ${
				contador === 0 ? "0" : resultado - numMayor
			})`,
		});
		contador++;
	}

	// Ajustar el signo del resultado final
	if (esNegativo) {
		resultado = -resultado;
		pasos.push({
			resultado: resultado,
			explicacion: "Ajuste de signo: el resultado es negativo",
		});
	}

	return { resultado, pasos };
};

/**
 * @function Ej2_35_MultiplicacionSumas
 * @description Componente que muestra la multiplicación usando sumas
 * @returns {JSX.Element} Componente React
 */
function Ej2_35_MultiplicacionSumas() {
	const [numero1, setNumero1] = useState("");
	const [numero2, setNumero2] = useState("");
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState("");
	const [velocidad, setVelocidad] = useState(500); // ms entre pasos
	const [setMostrandoPasos] = useState(false);
	const [pasoActual, setPasoActual] = useState(0);

	/**
	 * @function validarEntrada
	 * @description Valida los números ingresados
	 * @returns {boolean} true si los números son válidos
	 */
	const validarEntrada = () => {
		if (!numero1 || !numero2) {
			setError("Por favor, ingrese ambos números");
			return false;
		}

		if (!Number.isInteger(parseFloat(numero1)) || !Number.isInteger(parseFloat(numero2))) {
			setError("Por favor, ingrese números enteros");
			return false;
		}

		const num1 = parseInt(numero1);
		const num2 = parseInt(numero2);

		if (Math.abs(num1) > 100 || Math.abs(num2) > 100) {
			setError("Por favor, use números entre -100 y 100");
			return false;
		}

		return true;
	};

	/**
	 * @function calcular
	 * @description Realiza la multiplicación y muestra los pasos
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");
		setResultado(null);
		setMostrandoPasos(false);
		setPasoActual(0);

		if (validarEntrada()) {
			const num1 = parseInt(numero1);
			const num2 = parseInt(numero2);
			const resultadoCalculo = multiplicarPorSumas(num1, num2);
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
			<h2 className={styles.titulo}>Multiplicación usando Sumas</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.numerosGrupo}>
					<div className={styles.inputGrupo}>
						<label htmlFor="numero1">Primer número:</label>
						<input
							type="number"
							id="numero1"
							value={numero1}
							onChange={(e) => setNumero1(e.target.value)}
							placeholder="-100 a 100"
						/>
					</div>

					<span className={styles.operador}>×</span>

					<div className={styles.inputGrupo}>
						<label htmlFor="numero2">Segundo número:</label>
						<input
							type="number"
							id="numero2"
							value={numero2}
							onChange={(e) => setNumero2(e.target.value)}
							placeholder="-100 a 100"
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
					Multiplicar
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{resultado && (
				<div className={styles.resultado}>
					<div className={styles.operacion}>
						{numero1} × {numero2} = {resultado.resultado}
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
							La multiplicación {numero1} × {numero2} se realiza sumando {Math.abs(numero1)} veces el
							número {Math.abs(numero2)} (o viceversa, usando el menor número para optimizar).
							{(numero1 < 0 || numero2 < 0) &&
								" Como uno de los números es negativo, el resultado final es negativo."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Ej2_35_MultiplicacionSumas;
