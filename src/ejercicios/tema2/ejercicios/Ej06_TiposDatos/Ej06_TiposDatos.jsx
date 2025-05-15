/**
 * @fileoverview Ejercicio 2.6 - Tipos de Datos
 * @ejercicio 2.6
 * @tema Variables y Tipos de Datos
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej06
 * @description Demostración de los diferentes tipos de datos en JavaScript
 */
function Ej06() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Tipos primitivos
		const numerica = 42;
		const decimal = 3.14;
		const texto = "Hola mundo";
		const booleano = true;
		const nulo = null;
		const indefinido = undefined;
		const simbolo = Symbol("mi símbolo");
		const bigInt = BigInt(9007199254740991);

		// Tipos compuestos
		const array = [1, "dos", true];
		const objeto = {
			nombre: "Juan",
			edad: 25,
			hobbies: ["música", "deportes"],
		};

		// Comprobación de tipos
		const resultados = [
			`// Tipos primitivos:
- Number: ${numerica} (${typeof numerica})
- Number (decimal): ${decimal} (${typeof decimal})
- String: "${texto}" (${typeof texto})
- Boolean: ${booleano} (${typeof booleano})
- Null: ${nulo} (${typeof nulo})
- Undefined: ${indefinido} (${typeof indefinido})
- Symbol: ${String(simbolo)} (${typeof simbolo})
- BigInt: ${bigInt} (${typeof bigInt})

// Tipos compuestos:
- Array: ${JSON.stringify(array)} (${typeof array})
- Object: ${JSON.stringify(objeto, null, 2)} (${typeof objeto})

// Verificaciones especiales:
- Array.isArray([1, 2, 3]): ${Array.isArray([1, 2, 3])}
- instanceof Array: ${array instanceof Array}
- instanceof Object: ${objeto instanceof Object}`,
		];

		console.log("Ejemplos de tipos de datos:", {
			numerica,
			decimal,
			texto,
			booleano,
			nulo,
			indefinido,
			simbolo,
			bigInt,
			array,
			objeto,
		});

		setOutput(resultados.join("\n\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.6: Tipos de Datos</h2>
				<p className="enunciado">
					Explorar los diferentes tipos de datos disponibles en JavaScript y cómo verificarlos.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Tipos primitivos
const numerica = 42;
const decimal = 3.14;
const texto = "Hola mundo";
const booleano = true;
const nulo = null;
const indefinido = undefined;
const simbolo = Symbol('mi símbolo');
const bigInt = BigInt(9007199254740991);

// Tipos compuestos
const array = [1, "dos", true];
const objeto = {
    nombre: "Juan",
    edad: 25,
    hobbies: ["música", "deportes"]
};

// Verificación de tipos
console.log(typeof numerica); // "number"
console.log(typeof texto);    // "string"
console.log(Array.isArray(array)); // true
console.log(objeto instanceof Object); // true`}</code>
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
					<li>Tipos primitivos: number, string, boolean, null, undefined, symbol, bigint</li>
					<li>Tipos compuestos: array, object</li>
					<li>Operador typeof</li>
					<li>Métodos isArray e instanceof</li>
					<li>Coerción de tipos</li>
					<li>Diferencia entre null y undefined</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej06;
