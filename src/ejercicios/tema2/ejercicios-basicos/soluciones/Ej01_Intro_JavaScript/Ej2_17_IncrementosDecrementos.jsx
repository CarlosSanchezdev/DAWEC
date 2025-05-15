/**
 * @fileoverview Ejercicio 2.17 - Incrementos y Decrementos
 * @ejercicio 2.17
 * @tema Operadores de incremento y decremento
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_17_IncrementosDecrementos.module.css";

/**
 * @function Ej2_17_IncrementosDecrementos
 * @description Componente que demuestra el uso de incrementos y decrementos
 * @returns {JSX.Element} Interfaz con ejemplos de incrementos y decrementos
 */
function Ej2_17_IncrementosDecrementos() {
	const [valor1, setValor1] = useState(5);
	const [valor2, setValor2] = useState(5);
	const [historial, setHistorial] = useState([]);
	const [pasoActual, setPasoActual] = useState(0);

	const pasos = [
		{
			descripcion: "Valores iniciales",
			accion: () => {
				setValor1(5);
				setValor2(5);
			},
		},
		{
			descripcion: "Incremento previo (++x)",
			accion: () => {
				setValor1((prev) => prev + 1);
				addHistorial(`++valor1 = ${valor1 + 1}`);
			},
		},
		{
			descripcion: "Incremento posterior (x++)",
			accion: () => {
				addHistorial(`valor2++ = ${valor2}`);
				setValor2((prev) => prev + 1);
			},
		},
		{
			descripcion: "Decremento previo (--x)",
			accion: () => {
				setValor1((prev) => prev - 1);
				addHistorial(`--valor1 = ${valor1 - 1}`);
			},
		},
		{
			descripcion: "Decremento posterior (x--)",
			accion: () => {
				addHistorial(`valor2-- = ${valor2}`);
				setValor2((prev) => prev - 1);
			},
		},
	];

	const addHistorial = (mensaje) => {
		setHistorial((prev) => [...prev, mensaje]);
	};

	const siguiente = () => {
		if (pasoActual < pasos.length - 1) {
			const siguientePaso = pasoActual + 1;
			pasos[siguientePaso].accion();
			setPasoActual(siguientePaso);
		}
	};

	const reiniciar = () => {
		setValor1(5);
		setValor2(5);
		setHistorial([]);
		setPasoActual(0);
	};

	const codigoEjemplo = `// Ejemplos de incrementos y decrementos
let x = 5;

// Incremento previo
console.log(++x); // Muestra 6
console.log(x);   // Muestra 6

// Incremento posterior
let y = 5;
console.log(y++); // Muestra 5
console.log(y);   // Muestra 6

// Decremento previo
console.log(--x); // Muestra 5
console.log(x);   // Muestra 5

// Decremento posterior
console.log(y--); // Muestra 6
console.log(y);   // Muestra 5`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Ejemplos de código:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<div className={styles.demoArea}>
				<div className={styles.valores}>
					<div className={styles.valor}>
						<h3>Valor 1</h3>
						<div className={styles.numero}>{valor1}</div>
					</div>
					<div className={styles.valor}>
						<h3>Valor 2</h3>
						<div className={styles.numero}>{valor2}</div>
					</div>
				</div>

				<div className={styles.controles}>
					<button
						onClick={siguiente}
						disabled={pasoActual >= pasos.length - 1}
						className={styles.button}>
						Siguiente Paso
					</button>
					<button
						onClick={reiniciar}
						className={`${styles.button} ${styles.resetButton}`}>
						Reiniciar
					</button>
				</div>

				<div className={styles.paso}>
					<h3>Paso actual:</h3>
					<p>{pasos[pasoActual].descripcion}</p>
				</div>

				<div className={styles.historial}>
					<h3>Historial:</h3>
					<div className={styles.lista}>
						{historial.map((entrada, index) => (
							<div
								key={index}
								className={styles.entrada}>
								{entrada}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className={styles.explicacion}>
				<h3>Diferencias clave:</h3>
				<ul>
					<li>
						<strong>Incremento/decremento previo (++x, --x):</strong>
						<p>El valor se incrementa/decrementa antes de ser utilizado en la expresión</p>
					</li>
					<li>
						<strong>Incremento/decremento posterior (x++, x--):</strong>
						<p>El valor original se utiliza en la expresión y luego se incrementa/decrementa</p>
					</li>
				</ul>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Operadores de incremento (++)</li>
					<li>Operadores de decremento (--)</li>
					<li>Evaluación de expresiones</li>
					<li>Orden de operaciones</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_17_IncrementosDecrementos;
