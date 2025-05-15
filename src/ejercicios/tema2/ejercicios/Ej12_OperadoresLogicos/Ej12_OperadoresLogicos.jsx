/**
 * @fileoverview Ejercicio 2.12 - Operadores Lógicos
 * @ejercicio 2.12
 * @tema Operadores
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function realizarOperacionesLogicas
 * @returns {string[]} Array con los resultados de las operaciones lógicas
 */
const realizarOperacionesLogicas = () => {
	const casos = [
		{ descripcion: "true && true", valor1: true, valor2: true, operador: "&&" },
		{ descripcion: "true && false", valor1: true, valor2: false, operador: "&&" },
		{ descripcion: "false && true", valor1: false, valor2: true, operador: "&&" },
		{ descripcion: "false && false", valor1: false, valor2: false, operador: "&&" },
		{ descripcion: "true || true", valor1: true, valor2: true, operador: "||" },
		{ descripcion: "true || false", valor1: true, valor2: false, operador: "||" },
		{ descripcion: "false || true", valor1: false, valor2: true, operador: "||" },
		{ descripcion: "false || false", valor1: false, valor2: false, operador: "||" },
		{ descripcion: "!true", valor1: true, operador: "!" },
		{ descripcion: "!false", valor1: false, operador: "!" },
	];

	return casos.map(({ descripcion, valor1, valor2, operador }) => {
		let resultado;
		switch (operador) {
			case "&&":
				resultado = valor1 && valor2;
				break;
			case "||":
				resultado = valor1 || valor2;
				break;
			case "!":
				resultado = !valor1;
				break;
			default:
				resultado = "Error";
		}
		return `${descripcion}: ${resultado}`;
	});
};

/**
 * @function Ej12
 * @description Demostración de los operadores lógicos en JavaScript
 */
function Ej12() {
	const [output, setOutput] = useState("");
	const ejecutarEjemplos = () => {
		// Operaciones lógicas básicas con variables dinámicas
		const valor1 = Math.random() > 0.5;
		const valor2 = Math.random() > 0.5;
		const and = valor1 && valor2;
		const or = valor1 || valor2;
		const not = !valor1;

		// Operadores con valores truthy/falsy usando variables
		const texto = Math.random() > 0.5 ? "texto" : "";
		const numero = Math.random() * 10;
		const truthyAnd = texto && numero;
		const falsyAnd = texto && "resultado";
		const truthyOr = texto || "valor por defecto";
		const falsyOr = texto || "";

		// Operador lógico con variables de ejemplo
		const edad = 20;
		const permiso = true;
		const puedeConducir = edad >= 18 && permiso;

		// Ejemplo práctico con objetos
		const usuario = Math.random() > 0.5 ? { nombre: "Juan" } : null;
		const tieneAcceso = usuario && usuario.nombre;

		const resultadosLogicos = realizarOperacionesLogicas();

		const resultados = `// Operaciones lógicas básicas:
true && true = ${and}
false || true = ${or}
!true = ${not}

// Operaciones con valores truthy/falsy:
"texto" && 5 = ${truthyAnd} (devuelve el último valor truthy)
"" && "texto" = "${falsyAnd}" (devuelve el primer valor falsy)
"texto" || "" = "${truthyOr}" (devuelve el primer valor truthy)
null || "" = "${falsyOr}" (devuelve el último valor si todos son falsy)

// Ejemplos con variables:
edad >= 18 && permiso = ${puedeConducir}
usuario && usuario.nombre = ${tieneAcceso}

// Tabla de operaciones lógicas:
${resultadosLogicos.join("\n")}`;

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.12: Operadores Lógicos</h2>
				<p className="enunciado">
					Explorar los diferentes operadores lógicos en JavaScript y sus peculiaridades, incluyendo
					cortocircuito lógico y valores truthy/falsy.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Operadores lógicos básicos
true && true  // true (AND lógico)
false || true // true (OR lógico)
!true        // false (NOT lógico)

// Valores truthy y falsy
"texto" && 5       // 5 (devuelve el último valor truthy)
"" && "texto"      // "" (devuelve el primer valor falsy)
"texto" || ""      // "texto" (devuelve el primer valor truthy)
null || ""         // "" (devuelve el último valor si todos son falsy)

// Cortocircuito lógico
false && funcionQueNoExiste()  // false (no ejecuta la función)
true || funcionQueNoExiste()   // true (no ejecuta la función)

// Uso práctico
const edad = 20;
const permiso = true;
const puedeConducir = edad >= 18 && permiso;  // true

const usuario = { nombre: "Juan" };
const tieneAcceso = usuario && usuario.nombre;  // "Juan"`}</code>
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
					<li>Operadores lógicos básicos (&&, ||, !)</li>
					<li>Evaluación de cortocircuito (short-circuit evaluation)</li>
					<li>Valores truthy y falsy en JavaScript</li>
					<li>Operadores lógicos con valores no booleanos</li>
					<li>Uso práctico en validaciones y comprobaciones</li>
					<li>Precedencia de operadores lógicos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej12;
