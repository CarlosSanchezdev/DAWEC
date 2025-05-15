/**
 * @fileoverview Ejercicio 2.13 - Arrays y sus métodos
 * @ejercicio 2.13
 * @tema Arrays
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function manipularArrays
 * @description Demuestra diferentes operaciones con arrays
 * @returns {string[]} Array con los resultados de las operaciones
 */
const manipularArrays = () => {
	const numeros = [1, 2, 3, 4, 5];
	const frutas = ["manzana", "banana", "naranja"];
	const resultados = [];

	// Métodos de manipulación
	resultados.push(`Array original: ${numeros}`);
	resultados.push(`push(): ${numeros.push(6)} - Array: ${numeros}`);
	resultados.push(`pop(): ${numeros.pop()} - Array: ${numeros}`);
	resultados.push(`unshift(): ${numeros.unshift(0)} - Array: ${numeros}`);
	resultados.push(`shift(): ${numeros.shift()} - Array: ${numeros}`);

	// Métodos de transformación
	resultados.push("\nMétodos de transformación:");
	resultados.push(`map(): ${numeros.map((n) => n * 2)}`);
	resultados.push(`filter(): ${numeros.filter((n) => n > 2)}`);
	resultados.push(`reduce(): ${numeros.reduce((acc, n) => acc + n, 0)}`);

	// Métodos de búsqueda
	resultados.push("\nMétodos de búsqueda:");
	resultados.push(`indexOf("banana"): ${frutas.indexOf("banana")}`);
	resultados.push(`includes("pera"): ${frutas.includes("pera")}`);
	resultados.push(`find() > 3: ${numeros.find((n) => n > 3)}`);

	// Métodos de ordenación
	const desordenado = [3, 1, 4, 1, 5];
	resultados.push("\nMétodos de ordenación:");
	resultados.push(`sort(): ${desordenado.slice().sort((a, b) => a - b)}`);
	resultados.push(`reverse(): ${numeros.slice().reverse()}`);

	return resultados;
};

/**
 * @function Ej13
 * @description Componente que demuestra el uso de arrays y sus métodos en JavaScript
 */
function Ej13() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = manipularArrays();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.13: Arrays y sus métodos</h2>
				<p className="enunciado">
					Exploración de los diferentes métodos disponibles para manipular arrays en JavaScript, incluyendo
					métodos de manipulación, transformación, búsqueda y ordenación.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Métodos de manipulación
const numeros = [1, 2, 3, 4, 5];
numeros.push(6);      // Añade al final
numeros.pop();        // Elimina del final
numeros.unshift(0);   // Añade al inicio
numeros.shift();      // Elimina del inicio

// Métodos de transformación
numeros.map(n => n * 2);           // Multiplica cada elemento por 2
numeros.filter(n => n > 2);        // Filtra números mayores que 2
numeros.reduce((acc, n) => acc + n, 0); // Suma todos los elementos

// Métodos de búsqueda
const frutas = ["manzana", "banana", "naranja"];
frutas.indexOf("banana");     // Encuentra el índice
frutas.includes("pera");     // Comprueba si existe
numeros.find(n => n > 3);    // Encuentra el primer elemento > 3

// Métodos de ordenación
const desordenado = [3, 1, 4, 1, 5];
desordenado.sort((a, b) => a - b);  // Ordena ascendente
numeros.reverse();                   // Invierte el orden`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarEjemplos}
					className="ejecutar-btn">
					Ejecutar ejemplos
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Resultados:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Métodos de manipulación de arrays (push, pop, shift, unshift)</li>
					<li>Métodos de transformación (map, filter, reduce)</li>
					<li>Métodos de búsqueda (indexOf, includes, find)</li>
					<li>Métodos de ordenación (sort, reverse)</li>
					<li>Inmutabilidad vs mutación de arrays</li>
					<li>Encadenamiento de métodos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej13;
