/**
 * @fileoverview Ejercicio 2.6 - Corrección de Programa
 * @ejercicio 2.6
 * @tema Variables y Operaciones Básicas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_6_Correccion.module.css";

/**
 * @function Ej2_6_Correccion
 * @description Componente que corrige y calcula el área de un triángulo
 * @returns {JSX.Element} Interfaz para calcular área de triángulo
 */
function Ej2_6_Correccion() {
	const [base, setBase] = useState("");
	const [altura, setAltura] = useState("");
	const [area, setArea] = useState(null);
	const [codigoIncorrecto, setCodigoIncorrecto] = useState(true);

	// Código original con errores
	const codigoOriginal = `
	// Código con errores
	function calcularArea(base altura) {  // Error 1: falta coma entre parámetros
		area = (base * altura) / 2;       // Error 2: variable no declarada
		retrun area;                      // Error 3: "retrun" mal escrito
	}

	base = prompt("Base: ");             // Error 4: no se convierte a número
	altura = prompt("Altura: ");         // Error 5: no se convierte a número
	resultado = calcularArea(base altura); // Error 6: falta coma
	alert("El área es: " + resultado)    // Error 7: falta punto y coma
	`;

	// Código corregido
	const codigoCorregido = `
	// Código corregido
	function calcularArea(base, altura) {  // Corregido: coma añadida
		let area = (base * altura) / 2;    // Corregido: declaración con let
		return area;                       // Corregido: "return" bien escrito
	}

	let base = Number(prompt("Base: "));  // Corregido: conversión a número
	let altura = Number(prompt("Altura: ")); // Corregido: conversión a número
	let resultado = calcularArea(base, altura); // Corregido: coma añadida
	alert("El área es: " + resultado);    // Corregido: punto y coma añadido
	`;

	/**
	 * @function calcularArea
	 * @description Calcula el área del triángulo a partir de base y altura
	 * @param {Event} e Evento del formulario
	 */
	const calcularArea = (e) => {
		e.preventDefault();
		const baseNum = parseFloat(base);
		const alturaNum = parseFloat(altura);

		if (isNaN(baseNum) || isNaN(alturaNum)) {
			alert("Por favor, ingrese valores numéricos válidos");
			return;
		}

		if (baseNum <= 0 || alturaNum <= 0) {
			alert("La base y la altura deben ser mayores que 0");
			return;
		}

		setArea((baseNum * alturaNum) / 2);
	};

	return (
		<div className={styles.container}>
			<div className={styles.toggleContainer}>
				<button
					onClick={() => setCodigoIncorrecto(!codigoIncorrecto)}
					className={styles.toggleButton}>
					Mostrar código {codigoIncorrecto ? "corregido" : "incorrecto"}
				</button>
			</div>

			<pre className={styles.codigo}>{codigoIncorrecto ? codigoOriginal : codigoCorregido}</pre>

			<form
				onSubmit={calcularArea}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="base">Base del triángulo:</label>
					<input
						type="number"
						id="base"
						value={base}
						onChange={(e) => setBase(e.target.value)}
						required
						className={styles.input}
						step="any"
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="altura">Altura del triángulo:</label>
					<input
						type="number"
						id="altura"
						value={altura}
						onChange={(e) => setAltura(e.target.value)}
						required
						className={styles.input}
						step="any"
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular Área
				</button>
			</form>

			{area !== null && (
				<div className={styles.resultado}>
					<h3>Resultado:</h3>
					<p>El área del triángulo es: {area}</p>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Errores corregidos:</h3>
				<ul>
					<li>Falta de coma entre parámetros de función</li>
					<li>Variable no declarada con let/var/const</li>
					<li>Error de escritura en la palabra "return"</li>
					<li>Falta de conversión de strings a números</li>
					<li>Falta de coma en llamada a función</li>
					<li>Falta de punto y coma al final de sentencia</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_6_Correccion;
