/**
 * @fileoverview Ejercicio 2.38 - Bucle For con Formato
 * @ejercicio 2.38
 * @tema Bucles y Formato de Salida
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_38_BucleForFormato.module.css";

/**
 * @function generarSecuencia
 * @description Genera una secuencia de números con el formato especificado
 * @param {number} numerosLinea - Números por línea
 * @param {number} step - Incremento entre números
 * @returns {Array<Array<number>>} Array de arrays, cada uno representando una línea
 */
const generarSecuencia = (numerosLinea = 4, step = 3) => {
	const lineas = [];
	let lineaActual = [];

	// Empezamos desde 1 y vamos hasta 25, incrementando de step en step
	for (let i = 1; i <= 25; i += step) {
		lineaActual.push(i);

		// Si la línea actual tiene numerosLinea elementos o es el último número
		if (lineaActual.length === numerosLinea || i + step > 25) {
			lineas.push([...lineaActual]);
			lineaActual = [];
		}
	}

	return lineas;
};

/**
 * @function Ej2_38_BucleForFormato
 * @description Componente que muestra números del 1 al 25 de 3 en 3 con formato
 * @returns {JSX.Element} Componente React
 */
function Ej2_38_BucleForFormato() {
	const [numerosLinea, setNumerosLinea] = useState(4);
	const [incremento, setIncremento] = useState(3);
	const [secuencia, setSecuencia] = useState(() => generarSecuencia(numerosLinea, incremento));
	const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

	/**
	 * @function actualizarSecuencia
	 * @description Actualiza la secuencia cuando cambian los parámetros
	 */
	const actualizarSecuencia = () => {
		setSecuencia(generarSecuencia(numerosLinea, incremento));
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Bucle For con Formato</h2>

			<div className={styles.controles}>
				<div className={styles.controlGrupo}>
					<label htmlFor="numerosLinea">Números por línea:</label>
					<input
						type="number"
						id="numerosLinea"
						min="1"
						max="10"
						value={numerosLinea}
						onChange={(e) => {
							const valor = parseInt(e.target.value) || 1;
							setNumerosLinea(valor);
							setSecuencia(generarSecuencia(valor, incremento));
						}}
					/>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="incremento">Incremento:</label>
					<input
						type="number"
						id="incremento"
						min="1"
						max="5"
						value={incremento}
						onChange={(e) => {
							const valor = parseInt(e.target.value) || 1;
							setIncremento(valor);
							setSecuencia(generarSecuencia(numerosLinea, valor));
						}}
					/>
				</div>

				<button
					className={styles.actualizarBtn}
					onClick={actualizarSecuencia}>
					Actualizar Secuencia
				</button>
			</div>

			<div className={styles.secuencia}>
				{secuencia.map((linea, index) => (
					<div
						key={index}
						className={styles.lineaNumeros}>
						{linea.map((numero, idx) => (
							<span
								key={idx}
								className={styles.numero}>
								{numero}
							</span>
						))}
					</div>
				))}
			</div>

			<button
				className={styles.explicacionBtn}
				onClick={() => setMostrarExplicacion(!mostrarExplicacion)}>
				{mostrarExplicacion ? "Ocultar Explicación" : "Mostrar Explicación"}
			</button>

			{mostrarExplicacion && (
				<div className={styles.explicacion}>
					<h3>¿Cómo funciona?</h3>
					<ol>
						<li>
							<strong>Bucle For Principal:</strong> Itera desde 1 hasta 25, incrementando de {incremento}{" "}
							en {incremento}.
						</li>
						<li>
							<strong>Control de Formato:</strong> Agrupa los números en líneas de {numerosLinea}{" "}
							elementos.
						</li>
						<li>
							<strong>Lógica de Agrupación:</strong>
							<ul>
								<li>Crea un array temporal para cada línea</li>
								<li>Cuando la línea está llena, la agrega al resultado final</li>
								<li>Si es el último número, agrega la línea aunque no esté completa</li>
							</ul>
						</li>
						<li>
							<strong>Manejo de Estado:</strong> Usa el hook useState para mantener y actualizar:
							<ul>
								<li>Números por línea</li>
								<li>Valor del incremento</li>
								<li>Secuencia generada</li>
							</ul>
						</li>
					</ol>

					<div className={styles.complejidadInfo}>
						<h4>Complejidad de la solución:</h4>
						<ul>
							<li>
								<strong>Tiempo:</strong> O(n), donde n es el número de elementos generados
								(25/incremento)
							</li>
							<li>
								<strong>Espacio:</strong> O(n), almacena todos los números generados
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default Ej2_38_BucleForFormato;
