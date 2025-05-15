/**
 * @fileoverview Ejercicio 2.10 - Operadores Aritméticos
 * @ejercicio 2.10
 * @tema Operadores
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej10
 * @description Demostración de los operadores aritméticos en JavaScript
 */
function Ej10() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Operadores básicos
		const suma = 5 + 3; // 8
		const resta = 10 - 4; // 6
		const multiplicacion = 6 * 2; // 12
		const division = 15 / 3; // 5
		const modulo = 17 % 5; // 2
		const exponente = 2 ** 3; // 8

		// Incremento y decremento
		let num = 5;
		const preIncremento = ++num; // 6 (incrementa y luego devuelve)
		const postIncremento = num++; // 6 (devuelve y luego incrementa)
		const preDecremento = --num; // 6 (decrementa y luego devuelve)
		const postDecremento = num--; // 6 (devuelve y luego decrementa)

		// Operadores de asignación aritmética
		let _x = 10;
		_x += 5; // _x = _x + 5
		_x -= 3; // _x = _x - 3
		_x *= 2; // _x = _x * 2
		_x /= 4; // _x = _x / 4
		_x %= 3; // _x = _x % 3
		_x **= 2; // _x = _x ** 2

		// Precedencia de operadores
		const operacionCompleja = 2 + 3 * 4; // 14
		const operacionAgrupada = (2 + 3) * 4; // 20

		// Números especiales
		const infinito = Infinity;
		const negInfinito = -Infinity;
		const noEsNumero = NaN;

		const resultados = `// Operadores básicos:
5 + 3 = ${suma}
10 - 4 = ${resta}
6 * 2 = ${multiplicacion}
15 / 3 = ${division}
17 % 5 = ${modulo}
2 ** 3 = ${exponente}

// Incremento y decremento:
let num = 5;
++num = ${preIncremento} (pre-incremento)
num++ = ${postIncremento} (post-incremento)
--num = ${preDecremento} (pre-decremento)
num-- = ${postDecremento} (post-decremento)

// Operadores de asignación aritmética:
let x = 10;
x += 5  // ${10 + 5}
x -= 3  // ${15 - 3}
x *= 2  // ${12 * 2}
x /= 4  // ${24 / 4}
x %= 3  // ${6 % 3}
x **= 2 // ${0 ** 2}

// Precedencia de operadores:
2 + 3 * 4 = ${operacionCompleja}
(2 + 3) * 4 = ${operacionAgrupada}

// Números especiales:
Infinity: ${infinito}
-Infinity: ${negInfinito}
NaN: ${noEsNumero}

// Operaciones especiales:
5 / 0 = ${5 / 0}
-5 / 0 = ${-5 / 0}
0 / 0 = ${0 / 0}
Math.sqrt(-1) = ${Math.sqrt(-1)}`;

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.10: Operadores Aritméticos</h2>
				<p className="enunciado">Explorar los diferentes operadores aritméticos disponibles en JavaScript.</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Operadores básicos
const suma = 5 + 3;          // 8
const resta = 10 - 4;        // 6
const multiplicacion = 6 * 2; // 12
const division = 15 / 3;     // 5
const modulo = 17 % 5;       // 2
const exponente = 2 ** 3;    // 8

// Incremento y decremento
let num = 5;
++num;  // Pre-incremento
num++;  // Post-incremento
--num;  // Pre-decremento
num--;  // Post-decremento

// Operadores de asignación
x += 5;  // x = x + 5
x -= 3;  // x = x - 3
x *= 2;  // x = x * 2
x /= 4;  // x = x / 4
x %= 3;  // x = x % 3
x **= 2; // x = x ** 2`}</code>
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
					<li>Operadores aritméticos básicos (+, -, *, /, %, **)</li>
					<li>Operadores de incremento y decremento (++, --)</li>
					<li>Operadores de asignación aritmética (+=, -=, *=, /=, %=, **=)</li>
					<li>Precedencia de operadores</li>
					<li>Números especiales (Infinity, NaN)</li>
					<li>Comportamiento con tipos no numéricos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej10;
