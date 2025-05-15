/**
 * @fileoverview Ejercicio 2.4 - Comentarios en JavaScript
 * @ejercicio 2.4
 * @tema Sintaxis Básica
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej04
 * @description Demostración de los diferentes tipos de comentarios en JavaScript
 */
function Ej04() {
	const [output, setOutput] = useState("");

	const mostrarInfo = () => {
		// Ejemplo de comentario de una línea
		console.log("Después de un comentario de una línea");

		/* 
            Ejemplo de comentario 
            de múltiples líneas
        */
		console.log("Después de un comentario multilinea");

		/**
		 * Ejemplo de comentario JSDoc
		 * @param {string} nombre - Nombre de la persona
		 * @returns {string} Saludo personalizado
		 */
		function saludar(nombre) {
			return `¡Hola ${nombre}!`;
		}

		console.log(saludar("Usuario"));

		setOutput(`Se han demostrado los tres tipos principales de comentarios:

1. Comentario de una línea (//)
2. Comentario multilinea (/* */)
3. Comentario JSDoc (/** */)

Revisa el código fuente y la consola para ver los ejemplos.`);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.4: Comentarios en JavaScript</h2>
				<p className="enunciado">
					Explorar los diferentes tipos de comentarios disponibles en JavaScript y sus usos.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Comentario de una línea
console.log('Después de un comentario de una línea');

/* 
    Comentario 
    de múltiples líneas
*/
console.log('Después de un comentario multilinea');

/** 
 * Comentario JSDoc
 * @param {string} nombre - Nombre de la persona
 * @returns {string} Saludo personalizado
 */
function saludar(nombre) {
    return \`¡Hola \${nombre}!\`;
}`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={mostrarInfo}
					className="ejecutar-btn">
					Ver ejemplos
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Explicación:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Comentarios de una línea (//) para notas breves</li>
					<li>Comentarios multilinea (/* */) para explicaciones extensas</li>
					<li>Comentarios JSDoc para documentación de código</li>
					<li>Buenas prácticas de documentación</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej04;
