/**
 * @fileoverview Ejercicio 2.16 - Manipulación de Strings
 * @ejercicio 2.16
 * @tema Strings y sus métodos
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_16_ManipulacionStrings.module.css";

/**
 * @function procesarTexto
 * @description Aplica varias operaciones de manipulación a un string
 * @param {string} texto - Texto a procesar
 * @returns {Object} Resultado de las diferentes manipulaciones
 */
const procesarTexto = (texto) => {
	return {
		longitud: texto.length,
		mayusculas: texto.toUpperCase(),
		minusculas: texto.toLowerCase(),
		palabras: texto.trim().split(/\s+/).length,
		// Invierte el texto
		invertido: texto.split("").reverse().join(""),
		// Elimina espacios extras
		sinEspacios: texto.trim().replace(/\s+/g, " "),
		// Cuenta vocales
		vocales: (texto.match(/[aeiouáéíóúàèìòùäëïöüâêîôû]/gi) || []).length,
		// Cuenta consonantes
		consonantes: (texto.match(/[bcdfghjklmnpqrstvwxyzñ]/gi) || []).length,
		// Primera letra de cada palabra en mayúscula
		capitalizado: texto
			.toLowerCase()
			.split(/\s+/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "),
		// Reemplaza vocales por números
		leetSpeak: texto
			.replace(/a/gi, "4")
			.replace(/e/gi, "3")
			.replace(/i/gi, "1")
			.replace(/o/gi, "0")
			.replace(/u/gi, "|_|"),
	};
};

/**
 * @function Ej2_16_ManipulacionStrings
 * @description Componente que permite manipular strings de diferentes formas
 * @returns {JSX.Element} Interfaz para manipular strings
 */
function Ej2_16_ManipulacionStrings() {
	const [texto, setTexto] = useState("");
	const [resultado, setResultado] = useState(null);

	const handleProcesar = (e) => {
		e.preventDefault();
		if (!texto.trim()) {
			alert("Por favor, ingrese algún texto");
			return;
		}
		setResultado(procesarTexto(texto));
	};

	const codigoEjemplo = `// Ejemplos de manipulación de strings
let texto = "   Hola Mundo   ";

// Longitud
console.log(texto.length); // 15

// Mayúsculas y minúsculas
console.log(texto.toUpperCase()); // "   HOLA MUNDO   "
console.log(texto.toLowerCase()); // "   hola mundo   "

// Eliminar espacios
console.log(texto.trim()); // "Hola Mundo"

// Dividir en palabras
console.log(texto.trim().split(" ")); // ["Hola", "Mundo"]

// Invertir texto
console.log(texto.split('').reverse().join('')); // "   odnuM aloH   "

// Reemplazar caracteres
console.log(texto.replace(/o/g, "0")); // "   H0la Mund0   "`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Ejemplos de manipulación:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={handleProcesar}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="texto">Ingrese un texto:</label>
					<textarea
						id="texto"
						value={texto}
						onChange={(e) => setTexto(e.target.value)}
						required
						className={styles.textarea}
						placeholder="Escriba algo aquí..."
						rows={4}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Procesar Texto
				</button>
			</form>

			{resultado && (
				<div className={styles.resultados}>
					<h3>Resultados:</h3>
					<div className={styles.grid}>
						<div className={styles.resultado}>
							<h4>Información Básica</h4>
							<p>
								<strong>Longitud:</strong> {resultado.longitud} caracteres
							</p>
							<p>
								<strong>Palabras:</strong> {resultado.palabras}
							</p>
							<p>
								<strong>Vocales:</strong> {resultado.vocales}
							</p>
							<p>
								<strong>Consonantes:</strong> {resultado.consonantes}
							</p>
						</div>
						<div className={styles.resultado}>
							<h4>Transformaciones</h4>
							<p>
								<strong>Mayúsculas:</strong> {resultado.mayusculas}
							</p>
							<p>
								<strong>Minúsculas:</strong> {resultado.minusculas}
							</p>
							<p>
								<strong>Capitalizado:</strong> {resultado.capitalizado}
							</p>
							<p>
								<strong>Sin espacios extra:</strong> {resultado.sinEspacios}
							</p>
						</div>
						<div className={styles.resultado}>
							<h4>Efectos Especiales</h4>
							<p>
								<strong>Invertido:</strong> {resultado.invertido}
							</p>
							<p>
								<strong>Leet Speak:</strong> {resultado.leetSpeak}
							</p>
						</div>
					</div>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Métodos de strings</li>
					<li>Expresiones regulares</li>
					<li>Arrays y sus métodos</li>
					<li>Transformación de datos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_16_ManipulacionStrings;
