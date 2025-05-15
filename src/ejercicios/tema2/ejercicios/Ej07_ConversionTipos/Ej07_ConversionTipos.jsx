/**
 * @fileoverview Ejercicio 2.7 - Conversión de Tipos
 * @ejercicio 2.7
 * @tema Variables y Tipos de Datos
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej07
 * @description Demostración de conversiones entre tipos de datos en JavaScript
 */
function Ej07() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Conversiones a String
		const numToStr = String(123); // "123"
		const boolToStr = String(true); // "true"
		const arrToStr = String([1, 2, 3]); // "1,2,3"
		const objToStr = String({ x: 1 }); // "[object Object]"

		// Conversiones a Number
		const strToNum = Number("123"); // 123
		const boolToNum = Number(true); // 1
		const nullToNum = Number(null); // 0
		const undefinedToNum = Number(undefined); // NaN

		// Conversiones a Boolean
		const strToBool = Boolean("texto"); // true
		const numToBool = Boolean(1); // true
		const zeroBool = Boolean(0); // false
		const emptyStrBool = Boolean(""); // false
		const nullBool = Boolean(null); // false

		// Conversiones implícitas
		const suma = "3" + 4; // "34"
		const resta = "5" - 2; // 3
		const comparacion = "3" == 3; // true
		const comparacionEstricta = "3" === 3; // false

		const resultados = `// Conversiones a String:
String(123) => "${numToStr}" (${typeof numToStr})
String(true) => "${boolToStr}" (${typeof boolToStr})
String([1,2,3]) => "${arrToStr}" (${typeof arrToStr})
String({x:1}) => "${objToStr}" (${typeof objToStr})

// Conversiones a Number:
Number("123") => ${strToNum} (${typeof strToNum})
Number(true) => ${boolToNum} (${typeof boolToNum})
Number(null) => ${nullToNum} (${typeof nullToNum})
Number(undefined) => ${undefinedToNum} (${typeof undefinedToNum})

// Conversiones a Boolean:
Boolean("texto") => ${strToBool} (${typeof strToBool})
Boolean(1) => ${numToBool} (${typeof numToBool})
Boolean(0) => ${zeroBool} (${typeof zeroBool})
Boolean("") => ${emptyStrBool} (${typeof emptyStrBool})
Boolean(null) => ${nullBool} (${typeof nullBool})

// Conversiones implícitas:
"3" + 4 => ${suma} (${typeof suma})
"5" - 2 => ${resta} (${typeof resta})
"3" == 3 => ${comparacion} (${typeof comparacion})
"3" === 3 => ${comparacionEstricta} (${typeof comparacionEstricta})`;

		console.log("Ejemplos de conversiones:", {
			numToStr,
			boolToStr,
			arrToStr,
			objToStr,
			strToNum,
			boolToNum,
			nullToNum,
			undefinedToNum,
			strToBool,
			numToBool,
			zeroBool,
			emptyStrBool,
			nullBool,
			suma,
			resta,
			comparacion,
			comparacionEstricta,
		});

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.7: Conversión de Tipos</h2>
				<p className="enunciado">
					Explorar las diferentes formas de convertir entre tipos de datos en JavaScript.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Conversiones explícitas
String(123);       // "123"
Number("123");     // 123
Boolean("texto");  // true

// Conversiones implícitas
"3" + 4;          // "34"
"5" - 2;          // 3
"3" == 3;         // true
"3" === 3;        // false

// Valores especiales
Number(undefined); // NaN
Boolean("");      // false
Boolean(0);       // false
Boolean(null);    // false`}</code>
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
					<li>Conversiones explícitas (type casting)</li>
					<li>Conversiones implícitas (coerción)</li>
					<li>Constructores String(), Number(), Boolean()</li>
					<li>Valores especiales (NaN, undefined, null)</li>
					<li>Comparación estricta vs no estricta</li>
					<li>Reglas de coerción en operaciones</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej07;
