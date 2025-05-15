/**
 * @fileoverview Ejercicio 2.11 - Operadores de Comparación
 * @ejercicio 2.11
 * @tema Operadores
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function realizarComparacionesEspeciales
 * @returns {string[]} Array con los resultados de las comparaciones
 */
const realizarComparacionesEspeciales = () => {
	// Comparaciones con valores predefinidos
	const comparaciones = [
		{ descripcion: "null == undefined", valor: null, comparador: undefined, operador: "==" },
		{ descripcion: "0 == false", valor: 0, comparador: false, operador: "==" },
		{ descripcion: '"" == false', valor: "", comparador: false, operador: "==" },
		{ descripcion: "[] == false", valor: [], comparador: false, operador: "==" },
		{ descripcion: "[0] == false", valor: [0], comparador: false, operador: "==" },
		{ descripcion: '"0" == false', valor: "0", comparador: false, operador: "==" },
	];

	return comparaciones.map(({ descripcion, valor, comparador }) => `${descripcion}: ${valor == comparador}`);
};

/**
 * @function Ej11
 * @description Demostración de los operadores de comparación en JavaScript
 */
function Ej11() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Comparaciones básicas
		const igual = 5 == "5"; // true (compara valor con coerción)
		const estrictamenteIgual = 5 === "5"; // false (compara valor y tipo)
		const distinto = 5 != "5"; // false (compara valor con coerción)
		const estrictamenteDistinto = 5 !== "5"; // true (compara valor y tipo)

		// Comparaciones de magnitud
		const mayor = 10 > 5; // true
		const mayorIgual = 10 >= 10; // true
		const menor = 5 < 10; // true
		const menorIgual = 5 <= 5; // true

		// Casos especiales
		const valorNull = null;
		const valorUndefined = undefined;
		const comparacionNull = valorNull == valorUndefined; // true
		const comparacionNullEstricta = valorNull === valorUndefined; // false

		// Comparación de strings
		const compararStrings = "apple" < "banana"; // true (orden alfabético)
		const compararStringNum = "10" > "2"; // false (comparación lexicográfica)

		// Comparación de objetos
		const obj1 = { value: 5 };
		const obj2 = { value: 5 };
		const obj3 = obj1;

		const compararObjetos = obj1 == obj2; // false (diferentes referencias)
		const compararReferencias = obj1 === obj3; // true (misma referencia)

		const comparacionesEspeciales = realizarComparacionesEspeciales();

		const resultados = `// Comparaciones básicas:
5 == "5" = ${igual} (compara valor con coerción)
5 === "5" = ${estrictamenteIgual} (compara valor y tipo)
5 != "5" = ${distinto} (compara valor con coerción)
5 !== "5" = ${estrictamenteDistinto} (compara valor y tipo)

// Comparaciones de magnitud:
10 > 5 = ${mayor}
10 >= 10 = ${mayorIgual}
5 < 10 = ${menor}
5 <= 5 = ${menorIgual}

// Casos especiales:
null == undefined = ${comparacionNull}
null === undefined = ${comparacionNullEstricta}

// Comparación de strings:
"apple" < "banana" = ${compararStrings}
"10" > "2" = ${compararStringNum}

// Comparación de objetos:
{value: 5} == {value: 5} = ${compararObjetos}
obj1 === obj3 (misma referencia) = ${compararReferencias}

// Tabla de comparaciones especiales:
${comparacionesEspeciales.join("\n")}`;

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.11: Operadores de Comparación</h2>
				<p className="enunciado">
					Explorar los diferentes operadores de comparación en JavaScript y sus peculiaridades.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Comparaciones básicas
5 == "5"    // true (compara valor)
5 === "5"   // false (compara valor y tipo)
5 != "5"    // false
5 !== "5"   // true

// Comparaciones de magnitud
10 > 5      // true
10 >= 10    // true
5 < 10      // true
5 <= 5      // true

// Casos especiales
null == undefined   // true
null === undefined  // false

// Comparación de objetos
const obj1 = {value: 5};
const obj2 = {value: 5};
const obj3 = obj1;
obj1 == obj2   // false (diferentes referencias)
obj1 === obj3  // true (misma referencia)`}</code>
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
					<li>Operadores de igualdad (==) vs igualdad estricta (===)</li>
					<li>Operadores de desigualdad (!=) vs desigualdad estricta (!==)</li>
					<li>Operadores de magnitud (&gt;, &gt;=, &lt;, &lt;=)</li>
					<li>Coerción de tipos en comparaciones</li>
					<li>Comparación de objetos y referencias</li>
					<li>Casos especiales (null, undefined)</li>
					<li>Buenas prácticas de comparación</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej11;
