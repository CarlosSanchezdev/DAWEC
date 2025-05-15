/**
 * @fileoverview Ejercicio 2.3 - Uso de console.log
 * @ejercicio 2.3
 * @tema Sintaxis Básica
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej03
 * @description Demostración del uso de console.log para debugging
 */
function Ej03() {
	const [output, setOutput] = useState("");

	const ejecutarCodigo = () => {
		console.log("Hola desde la consola");
		console.log("Número:", 42);
		console.log("Booleano:", true);
		console.log("Array:", [1, 2, 3]);
		console.log("Objeto:", { nombre: "Juan", edad: 25 });

		// Ejemplo de console.table
		console.table([
			{ nombre: "Juan", edad: 25 },
			{ nombre: "Ana", edad: 30 },
		]);

		// Ejemplo de console.error
		console.error("¡Este es un error!");

		// Ejemplo de console.warn
		console.warn("¡Esta es una advertencia!");

		setOutput(`Se han mostrado varios ejemplos en la consola:
1. console.log básico
2. console.log con diferentes tipos de datos
3. console.table con array de objetos
4. console.error
5. console.warn

Abre la consola del navegador (F12) para ver los resultados.`);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.3: Uso de console.log</h2>
				<p className="enunciado">
					Explorar diferentes formas de usar console.log y otros métodos de la consola para debugging.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Ejemplos básicos
console.log('Hola desde la consola');
console.log('Número:', 42);
console.log('Array:', [1, 2, 3]);
console.log('Objeto:', { nombre: 'Juan', edad: 25 });

// Tabla
console.table([
    { nombre: 'Juan', edad: 25 },
    { nombre: 'Ana', edad: 30 }
]);

// Error y advertencia
console.error('¡Este es un error!');
console.warn('¡Esta es una advertencia!');`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarCodigo}
					className="ejecutar-btn">
					Ejecutar código
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Instrucciones:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Uso de console.log para debugging</li>
					<li>Diferentes métodos de la consola (table, error, warn)</li>
					<li>Visualización de diferentes tipos de datos</li>
					<li>Herramientas de desarrollo del navegador</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03;
