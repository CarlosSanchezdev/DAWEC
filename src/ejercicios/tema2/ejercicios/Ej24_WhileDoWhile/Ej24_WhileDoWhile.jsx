/**
 * @fileoverview Ejercicio 2.24 - Bucles While y Do...While
 * @ejercicio 2.24
 * @tema Bucles
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarWhile
 * @description Ejemplifica los bucles while y do...while en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarWhile = () => {
	const resultados = [];

	// While básico
	resultados.push("// While básico:");
	let contador = 0;
	while (contador < 5) {
		resultados.push(`Contador: ${contador}`);
		contador++;
	}

	// While con break
	resultados.push("\n// While con break:");
	let numero = 1;
	while (true) {
		if (numero > 5) break;
		resultados.push(`Número: ${numero}`);
		numero++;
	}

	// While con continue
	resultados.push("\n// While con continue:");
	let i = 0;
	while (i < 5) {
		i++;
		if (i === 3) continue;
		resultados.push(`Valor de i: ${i}`);
	}

	// Do...While
	resultados.push("\n// Do...While básico:");
	let j = 0;
	do {
		resultados.push(`j vale: ${j}`);
		j++;
	} while (j < 3);

	// While con condición compuesta
	resultados.push("\n// While con condición compuesta:");
	let x = 0,
		y = 10;
	while (x < 5 && y > 5) {
		resultados.push(`x: ${x}, y: ${y}`);
		x++;
		y--;
	}

	// Simulación de evento
	resultados.push("\n// Simulación de evento (mientras hay intentos):");
	let intentos = 3;
	let exito = false;
	while (intentos > 0 && !exito) {
		resultados.push(`Intento ${4 - intentos}: procesando...`);
		// Simulamos éxito aleatorio
		exito = Math.random() > 0.5;
		intentos--;
	}
	resultados.push(exito ? "¡Operación exitosa!" : "Se agotaron los intentos");

	// Do...While con validación
	resultados.push("\n// Do...While con validación:");
	let input = "";
	let intentosValidacion = 0;
	do {
		intentosValidacion++;
		input = `intento${intentosValidacion}`;
		resultados.push(`Validando entrada: ${input}`);
	} while (input.length < 8 && intentosValidacion < 3);

	return resultados;
};

/**
 * @function Ej24
 * @description Componente que demuestra el uso de bucles while y do...while en JavaScript
 */
function Ej24() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarWhile();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.24: Bucles While y Do...While</h2>
				<p className="enunciado">
					Exploración de los bucles while y do...while en JavaScript: casos de uso y diferencias entre ambos.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// While básico
let contador = 0;
while (contador < 5) {
    console.log(contador);
    contador++;
}

// While con break
while (true) {
    if (condicion) break;
    // código
}

// Do...While
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 3);

// While con condición compuesta
while (x < 5 && y > 0) {
    // código
}

// Simulación de evento
while (intentos > 0 && !exito) {
    // intentar operación
    intentos--;
}

// Do...While con validación
do {
    input = obtenerEntrada();
} while (!esValido(input));`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarEjemplos}
					className="ejercar-btn">
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
					<li>Bucle while</li>
					<li>Bucle do...while</li>
					<li>Break y continue</li>
					<li>Condiciones compuestas</li>
					<li>Validación de entrada</li>
					<li>Control de intentos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej24;
