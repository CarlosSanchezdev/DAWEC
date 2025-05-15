/**
 * @fileoverview Ejercicio 2.12 - Cuadrado de Asteriscos
 * @ejercicio 2.12
 * @tema Bucles Anidados
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_12_CuadradoAsteriscos.module.css";

/**
 * @function Ej2_12_CuadradoAsteriscos
 * @description Componente que genera un cuadrado de asteriscos según el tamaño especificado
 * @returns {JSX.Element} Interfaz para generar cuadrados de asteriscos
 */
function Ej2_12_CuadradoAsteriscos() {
	const [tamano, setTamano] = useState("");
	const [cuadrado, setCuadrado] = useState([]);

	/**
	 * @function generarCuadrado
	 * @description Genera el cuadrado de asteriscos según el tamaño especificado
	 * @param {Event} e Evento del formulario
	 */
	const generarCuadrado = (e) => {
		e.preventDefault();
		const n = parseInt(tamano);

		if (isNaN(n) || n <= 0) {
			alert("Por favor, ingrese un número positivo");
			return;
		}

		if (n > 20) {
			alert("Por favor, ingrese un número menor o igual a 20");
			return;
		}

		// Generar el cuadrado fila por fila
		const nuevoCuadrado = [];
		for (let i = 0; i < n; i++) {
			let fila = [];
			for (let j = 0; j < n; j++) {
				fila.push("*");
			}
			nuevoCuadrado.push(fila);
		}
		setCuadrado(nuevoCuadrado);
	};

	const codigoEjemplo = `// Código equivalente en JavaScript puro:
let n = parseInt(prompt("Ingrese el tamaño del cuadrado:"));
for (let i = 0; i < n; i++) {
    let linea = "";
    for (let j = 0; j < n; j++) {
        linea += "* ";
    }
    console.log(linea);
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Implementación con bucles anidados:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={generarCuadrado}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="tamano">Tamaño del cuadrado (1-20):</label>
					<input
						type="number"
						id="tamano"
						value={tamano}
						onChange={(e) => setTamano(e.target.value)}
						required
						min="1"
						max="20"
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Generar Cuadrado
				</button>
			</form>

			{cuadrado.length > 0 && (
				<div className={styles.resultado}>
					<h3>
						Cuadrado {tamano}x{tamano}:
					</h3>
					<div className={styles.cuadrado}>
						{cuadrado.map((fila, i) => (
							<div
								key={i}
								className={styles.fila}>
								{fila.map((celda, j) => (
									<span
										key={j}
										className={styles.celda}>
										{celda}
									</span>
								))}
							</div>
						))}
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>¿Cómo funciona?</h3>
				<ol>
					<li>El bucle exterior (i) controla el número de filas</li>
					<li>El bucle interior (j) controla el número de columnas por fila</li>
					<li>En cada celda se coloca un asterisco (*)</li>
					<li>El resultado es una matriz cuadrada de n x n asteriscos</li>
				</ol>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Bucles anidados</li>
					<li>Arrays bidimensionales</li>
					<li>Patrones de repetición</li>
					<li>Validación de entrada</li>
					<li>Renderizado de matrices</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_12_CuadradoAsteriscos;
