/**
 * @fileoverview Ejercicio 2.20 - Operadores Spread y Rest
 * @ejercicio 2.20
 * @tema Operadores
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarSpreadRest
 * @description Ejemplifica el uso de los operadores spread y rest
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarSpreadRest = () => {
	const resultados = [];

	// Spread con arrays
	resultados.push("// Spread con arrays:");
	const numeros = [1, 2, 3];
	const masNumeros = [...numeros, 4, 5];
	resultados.push(`const numeros = ${JSON.stringify(numeros)}`);
	resultados.push(`const masNumeros = [...numeros, 4, 5] = ${JSON.stringify(masNumeros)}`);

	// Concatenar arrays
	const array1 = [1, 2];
	const array2 = [3, 4];
	const concatenado = [...array1, ...array2];
	resultados.push("\n// Concatenar arrays:");
	resultados.push(`[...array1, ...array2] = ${JSON.stringify(concatenado)}`);

	// Copiar arrays
	const original = [1, 2, 3];
	const copia = [...original];
	copia[0] = 100;
	resultados.push("\n// Copiar arrays:");
	resultados.push(`Original: ${JSON.stringify(original)}`);
	resultados.push(`Copia modificada: ${JSON.stringify(copia)}`);

	// Spread con objetos
	resultados.push("\n// Spread con objetos:");
	const persona = {
		nombre: "Ana",
		edad: 25,
	};
	const personaConDireccion = {
		...persona,
		ciudad: "Madrid",
	};
	resultados.push(`const persona = ${JSON.stringify(persona)}`);
	resultados.push(`const personaConDireccion = ${JSON.stringify(personaConDireccion)}`);

	// Combinar objetos
	const datos1 = { a: 1, b: 2 };
	const datos2 = { b: 3, c: 4 }; // b será sobrescrito
	const combinado = { ...datos1, ...datos2 };
	resultados.push("\n// Combinar objetos:");
	resultados.push(`{ ...datos1, ...datos2 } = ${JSON.stringify(combinado)}`);

	// Rest en parámetros de función
	resultados.push("\n// Rest en parámetros de función:");
	const sumar = (...numeros) => {
		const suma = numeros.reduce((total, n) => total + n, 0);
		return `sumar(${numeros.join(", ")}) = ${suma}`;
	};
	resultados.push(sumar(1, 2, 3, 4, 5));

	// Rest en desestructuración de arrays
	resultados.push("\n// Rest en desestructuración de arrays:");
	const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
	resultados.push(`[primero, segundo, ...resto] = [1, 2, 3, 4, 5]`);
	resultados.push(`primero: ${primero}`);
	resultados.push(`segundo: ${segundo}`);
	resultados.push(`resto: ${JSON.stringify(resto)}`);

	// Rest en desestructuración de objetos
	resultados.push("\n// Rest en desestructuración de objetos:");
	const { nombre, ...otrosDatos } = {
		nombre: "Carlos",
		edad: 30,
		ciudad: "Barcelona",
		profesion: "desarrollador",
	};
	resultados.push(`const { nombre, ...otrosDatos } = objeto`);
	resultados.push(`nombre: ${nombre}`);
	resultados.push(`otrosDatos: ${JSON.stringify(otrosDatos)}`);

	return resultados;
};

/**
 * @function Ej20
 * @description Componente que demuestra el uso de los operadores spread y rest en JavaScript
 */
function Ej20() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarSpreadRest();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.20: Operadores Spread y Rest</h2>
				<p className="enunciado">
					Exploración de los operadores spread (...) y rest (...) en JavaScript: uso con arrays, objetos y
					funciones.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Spread con arrays
const numeros = [1, 2, 3];
const masNumeros = [...numeros, 4, 5];

// Concatenar arrays
const array1 = [1, 2];
const array2 = [3, 4];
const concatenado = [...array1, ...array2];

// Spread con objetos
const persona = { nombre: "Ana", edad: 25 };
const personaConDireccion = {
    ...persona,
    ciudad: "Madrid"
};

// Rest en parámetros
const sumar = (...numeros) => {
    return numeros.reduce((total, n) => total + n, 0);
};

// Rest en desestructuración
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

// Rest con objetos
const { nombre, ...otrosDatos } = {
    nombre: "Carlos",
    edad: 30,
    ciudad: "Barcelona"
};`}</code>
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
					<li>Operador spread con arrays</li>
					<li>Operador spread con objetos</li>
					<li>Parámetros rest en funciones</li>
					<li>Desestructuración con rest</li>
					<li>Copia superficial vs profunda</li>
					<li>Combinación de objetos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej20;
