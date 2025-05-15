/**
 * @fileoverview Ejercicio 2.23 - Números Pares
 * @ejercicio 2.23
 * @tema Bucles y Operadores
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_23_NumerosPares.module.css";

/**
 * @function Ej2_23_NumerosPares
 * @description Calcula cuántos números pares hay entre dos números
 * @returns {JSX.Element} Interfaz para calcular números pares
 */
function Ej2_23_NumerosPares() {
	const [inicio, setInicio] = useState("");
	const [fin, setFin] = useState("");
	const [resultado, setResultado] = useState(null);

	/**
	 * @function calcularPares
	 * @description Calcula la cantidad de números pares en el rango
	 * @param {Event} e Evento del formulario
	 */
	const calcularPares = (e) => {
		e.preventDefault();
		const numInicio = parseInt(inicio);
		const numFin = parseInt(fin);

		if (isNaN(numInicio) || isNaN(numFin)) {
			alert("Por favor, ingrese números válidos");
			return;
		}

		if (numInicio >= numFin) {
			alert("El número inicial debe ser menor que el final");
			return;
		}

		const pares = [];
		let count = 0;

		for (let i = numInicio; i <= numFin; i++) {
			if (i % 2 === 0) {
				count++;
				if (pares.length < 10) pares.push(i);
			}
		}

		setResultado({
			inicio: numInicio,
			fin: numFin,
			cantidad: count,
			ejemplos: pares,
			hayMas: count > 10,
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let inicio = parseInt(prompt("Ingrese el número inicial:"));
let fin = parseInt(prompt("Ingrese el número final:"));
let pares = 0;

for (let i = inicio; i <= fin; i++) {
    if (i % 2 === 0) {
        pares++;
    }
}

console.log(\`Hay \${pares} números pares entre \${inicio} y \${fin}\`);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={calcularPares}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="inicio">Número inicial:</label>
					<input
						type="number"
						id="inicio"
						value={inicio}
						onChange={(e) => setInicio(e.target.value)}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="fin">Número final:</label>
					<input
						type="number"
						id="fin"
						value={fin}
						onChange={(e) => setFin(e.target.value)}
						required
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular Pares
				</button>
			</form>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Rango:</span>
							<span>
								De {resultado.inicio} a {resultado.fin}
							</span>
						</div>
						<div className={`${styles.linea} ${styles.total}`}>
							<span>Números pares encontrados:</span>
							<span>{resultado.cantidad}</span>
						</div>
						{resultado.ejemplos.length > 0 && (
							<div className={styles.linea}>
								<span>Primeros ejemplos:</span>
								<span>
									{resultado.ejemplos.join(", ")}
									{resultado.hayMas ? "..." : ""}
								</span>
							</div>
						)}
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Uso del operador módulo (%)</li>
					<li>Bucles for para recorrer rangos</li>
					<li>Validación de entrada de datos</li>
					<li>Arrays para almacenar resultados</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_23_NumerosPares;
