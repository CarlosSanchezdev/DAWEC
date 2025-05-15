/**
 * @fileoverview Ejercicio sobre Arrays en JavaScript
 * @ejercicio EJ02
 * @tema Tema 3 - JavaScript Arrays, Funciones y Objetos
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej02_Arrays.css";

const Ej02_Arrays = () => {
	// ===== ESTADOS =====
	const [activeTab, setActiveTab] = useState("creacion");
	const [consoleOutput, setConsoleOutput] = useState([]);

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploCreacionArrays = () => {
		clearConsole();

		// Diferentes formas de crear arrays
		const array1 = [1, 2, 3, 4, 5];
		const array2 = new Array(1, 2, 3, 4, 5);
		const array3 = Array.from("Hola"); // Convierte string a array
		const array4 = [...array1]; // Spread operator

		addToConsole("// Diferentes formas de crear arrays:");
		addToConsole(`const array1 = [1, 2, 3, 4, 5] → ${JSON.stringify(array1)}`);
		addToConsole(`const array2 = new Array(1, 2, 3, 4, 5) → ${JSON.stringify(array2)}`);
		addToConsole(`const array3 = Array.from('Hola') → ${JSON.stringify(array3)}`);
		addToConsole(`const array4 = [...array1] → ${JSON.stringify(array4)}`);
	};

	const ejemploManipulacionArrays = () => {
		clearConsole();

		const numeros = [1, 2, 3];
		addToConsole("const numeros = [1, 2, 3]");

		// Añadir elementos
		numeros.push(4);
		addToConsole(`numeros.push(4) → ${JSON.stringify(numeros)}`);

		numeros.unshift(0);
		addToConsole(`numeros.unshift(0) → ${JSON.stringify(numeros)}`);

		// Eliminar elementos
		const ultimo = numeros.pop();
		addToConsole(`numeros.pop() → eliminado: ${ultimo}, array: ${JSON.stringify(numeros)}`);

		const primero = numeros.shift();
		addToConsole(`numeros.shift() → eliminado: ${primero}, array: ${JSON.stringify(numeros)}`);
	};

	const ejemploOperacionesAvanzadas = () => {
		clearConsole();

		const numeros = [1, 2, 3, 4, 5];

		// map
		const duplicados = numeros.map((n) => n * 2);
		addToConsole("// Ejemplo de map:");
		addToConsole(`const duplicados = [1,2,3,4,5].map(n => n * 2)`);
		addToConsole(`Resultado: ${JSON.stringify(duplicados)}`);

		// filter
		const pares = numeros.filter((n) => n % 2 === 0);
		addToConsole("\n// Ejemplo de filter:");
		addToConsole(`const pares = [1,2,3,4,5].filter(n => n % 2 === 0)`);
		addToConsole(`Resultado: ${JSON.stringify(pares)}`);

		// reduce
		const suma = numeros.reduce((acc, curr) => acc + curr, 0);
		addToConsole("\n// Ejemplo de reduce:");
		addToConsole(`const suma = [1,2,3,4,5].reduce((acc, curr) => acc + curr, 0)`);
		addToConsole(`Resultado: ${suma}`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 2: Arrays en JavaScript</h2>

			<div className="tabs">
				<button
					className={activeTab === "creacion" ? "active" : ""}
					onClick={() => {
						setActiveTab("creacion");
						ejemploCreacionArrays();
					}}>
					Creación de Arrays
				</button>
				<button
					className={activeTab === "manipulacion" ? "active" : ""}
					onClick={() => {
						setActiveTab("manipulacion");
						ejemploManipulacionArrays();
					}}>
					Manipulación de Arrays
				</button>
				<button
					className={activeTab === "operaciones" ? "active" : ""}
					onClick={() => {
						setActiveTab("operaciones");
						ejemploOperacionesAvanzadas();
					}}>
					Operaciones Avanzadas
				</button>
			</div>

			<div className="content-section">
				{activeTab === "creacion" && (
					<div className="tab-content">
						<h3>Creación de Arrays</h3>
						<p>Diferentes formas de crear arrays en JavaScript:</p>
						<ul>
							<li>
								Literal de array: <code>[]</code>
							</li>
							<li>
								Constructor Array: <code>new Array()</code>
							</li>
							<li>Array.from(): Para crear arrays desde otros objetos iterables</li>
							<li>Spread operator: Para crear copias de arrays</li>
						</ul>
					</div>
				)}

				{activeTab === "manipulacion" && (
					<div className="tab-content">
						<h3>Manipulación de Arrays</h3>
						<p>Métodos básicos para manipular arrays:</p>
						<ul>
							<li>
								<code>push()</code>: Añade elementos al final
							</li>
							<li>
								<code>pop()</code>: Elimina y devuelve el último elemento
							</li>
							<li>
								<code>unshift()</code>: Añade elementos al principio
							</li>
							<li>
								<code>shift()</code>: Elimina y devuelve el primer elemento
							</li>
						</ul>
					</div>
				)}

				{activeTab === "operaciones" && (
					<div className="tab-content">
						<h3>Operaciones Avanzadas</h3>
						<p>Métodos funcionales para procesar arrays:</p>
						<ul>
							<li>
								<code>map()</code>: Transforma cada elemento
							</li>
							<li>
								<code>filter()</code>: Filtra elementos según una condición
							</li>
							<li>
								<code>reduce()</code>: Reduce el array a un único valor
							</li>
						</ul>
					</div>
				)}
			</div>

			<div className="console-section">
				<h3>Consola:</h3>
				<div className="console">
					{consoleOutput.map((output, index) => (
						<div
							key={index}
							className="console-line">
							{output}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Ej02_Arrays;
