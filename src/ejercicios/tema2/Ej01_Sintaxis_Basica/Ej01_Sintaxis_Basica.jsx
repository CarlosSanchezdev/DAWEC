/**
 * @fileoverview Ejercicio sobre sintaxis básica de JavaScript
 * @ejercicio Ej01_Sintaxis_Basica
 * @tema Tema 2: JavaScript Sintaxis Básica
 * @fecha 12/05/2025
 */

import React, { useState } from "react";
import "./Ej01_Sintaxis_Basica.css";

/**
 * @function Ej01_Sintaxis_Basica
 * @description Componente que demuestra la sintaxis básica de JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej01_Sintaxis_Basica() {
	// ===== HOOKS =====
	const [consolaOutput, setConsolaOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("sentencias");

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function consoleLog
	 * @description Simula la función console.log agregando el resultado a la consola
	 * @param {*} args - Argumentos para mostrar en la consola
	 */
	const consoleLog = (...args) => {
		setConsolaOutput((prev) => [
			...prev,
			args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" "),
		]);
	};

	/**
	 * @function limpiarConsola
	 * @description Limpia la consola simulada
	 */
	const limpiarConsola = () => {
		setConsolaOutput([]);
	};

	/**
	 * @function ejecutarSentencias
	 * @description Ejecuta el ejemplo de sentencias y comentarios
	 */
	const ejecutarSentencias = () => {
		limpiarConsola();

		// Esto es un comentario de una línea
		consoleLog("Ejemplo de comentario de una línea");

		/* Esto es un comentario
       de múltiples líneas
       en JavaScript */
		consoleLog("Ejemplo de comentario de múltiples líneas");

		// Sentencias terminadas con punto y coma
		let a = 10;
		let b = 20;
		let c = a + b;
		consoleLog(`Sentencia: let a = 10; let b = 20; let c = a + b; Resultado: c = ${c}`);

		// Bloque de código
		consoleLog("Ejemplo de bloque de código:");
		{
			let x = 5;
			let y = 7;
			let z = x * y;
			consoleLog(`  Dentro del bloque: x = ${x}, y = ${y}, z = ${z}`);
		} // La variable x no es accesible aquí
		try {
			// Sabemos que esto dará error, pero lo atrapamos para mostrarlo como ejemplo
			// eslint-disable-next-line no-undef
			consoleLog(`  Fuera del bloque: x = ${x}`);
		} catch (error) {
			consoleLog(`  Error: ${error.message} (x no es accesible fuera del bloque)`);
		}
	};

	/**
	 * @function ejecutarEtiquetas
	 * @description Ejecuta el ejemplo de etiquetas y ubicación
	 */
	const ejecutarEtiquetas = () => {
		limpiarConsola();
		// Identificadores
		consoleLog("Ejemplos de identificadores válidos:");
		// eslint-disable-next-line no-unused-vars
		let _miVariable = 1;
		// eslint-disable-next-line no-unused-vars
		let $otraVariable = 2;
		// eslint-disable-next-line no-unused-vars
		let camelCase = 3;
		// eslint-disable-next-line no-unused-vars
		let PascalCase = 4;
		consoleLog("  _miVariable, $otraVariable, camelCase, PascalCase");

		// Palabras reservadas
		consoleLog("\nPalabras reservadas de JavaScript:");
		consoleLog("  let, const, var, if, else, for, while, function, return, class, etc.");

		// Literales
		consoleLog("\nEjemplos de literales:");
		// Enteros
		consoleLog("  Enteros: 10, 0xFF (hex), 0o77 (octal), 0b1111 (binario)");
		// Reales
		consoleLog("  Reales: 3.14, 2.5e3 (2500), -1.2e-2 (-0.012)");
		// Booleanos
		consoleLog("  Booleanos: true, false");
		// Cadenas
		consoleLog("  Cadenas: 'simple', \"doble\", `template`");
		// Caracteres especiales
		consoleLog("  Caracteres especiales: \\n, \\t, \\', \\\"");

		// Ejemplos
		const numero = 42;
		const hex = 0x2a;
		const cientifico = 4.2e1;
		const booleano = true;
		const cadena1 = "Texto con comillas simples";
		const cadena2 = 'Texto con "comillas dobles" dentro';
		const template = `El valor de numero es ${numero}`;

		consoleLog("\nValores de las variables:");
		consoleLog(`  numero = ${numero}`);
		consoleLog(`  hex = ${hex}`);
		consoleLog(`  cientifico = ${cientifico}`);
		consoleLog(`  booleano = ${booleano}`);
		consoleLog(`  cadena1 = ${cadena1}`);
		consoleLog(`  cadena2 = ${cadena2}`);
		consoleLog(`  template = ${template}`);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2 className="ejercicio-title">Ejercicio 1: Sintaxis Básica de JavaScript</h2>
			<p className="ejercicio-description">
				Este ejercicio demuestra los conceptos básicos de la sintaxis de JavaScript: sentencias, comentarios,
				bloques de código, etiquetas y ubicación del código.
			</p>

			<div className="ejercicio-tabs">
				<button
					className={activeTab === "sentencias" ? "tab-active" : ""}
					onClick={() => setActiveTab("sentencias")}>
					Sentencias y Comentarios
				</button>
				<button
					className={activeTab === "etiquetas" ? "tab-active" : ""}
					onClick={() => setActiveTab("etiquetas")}>
					Etiquetas y Ubicación
				</button>
			</div>

			<div className="ejercicio-content">
				{activeTab === "sentencias" && (
					<div className="seccion">
						<h3>2.1 Sentencias, Comentarios y Bloques de Código</h3>
						<p>
							JavaScript se compone de sentencias que terminan con punto y coma (;). Los bloques de código
							se delimitan con llaves ({"{}"}) y permiten agrupar varias sentencias.
						</p>
						<p>Los comentarios pueden ser de una línea (comenzando con //) o de bloque (entre /* y */).</p>

						<div className="codigo-ejemplo">
							<pre>{`// Esto es un comentario de una línea

/* Esto es un comentario
   de múltiples líneas */
   
// Sentencias terminadas con punto y coma
let a = 10;
let b = 20;
let c = a + b;

// Bloque de código
{
  let x = 5;
  let y = 7;
  let z = x * y;
  console.log(\`Dentro del bloque: x = \${x}, y = \${y}, z = \${z}\`);
}
// La variable x no es accesible aquí`}</pre>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarSentencias}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "etiquetas" && (
					<div className="seccion">
						<h3>2.2 Etiquetas y Ubicación del Código</h3>
						<p>
							Las etiquetas en JavaScript se clasifican en: identificadores, palabras reservadas,
							literales y operadores.
						</p>

						<div className="subseccion">
							<h4>Identificadores</h4>
							<p>
								Nombres que representan variables, métodos u objetos. Deben comenzar con una letra o
								guion bajo.
							</p>
							<pre>{`let miVariable;
let _otraVariable;
let $tercerVariable;
let camelCaseVariable;`}</pre>
						</div>

						<div className="subseccion">
							<h4>Palabras Reservadas</h4>
							<p>Identificadores reservados para uso específico del lenguaje.</p>
							<pre>{`if, else, while, for, function, return, var, let, const, class...`}</pre>
						</div>

						<div className="subseccion">
							<h4>Literales</h4>
							<p>Representan valores fijos en el código.</p>
							<pre>{`// Enteros
10, 0xFF (hex), 0o77 (octal), 0b1111 (binario)

// Reales
3.14, 2.5e3 (2500), -1.2e-2 (-0.012)

// Booleanos
true, false

// Cadenas
'simple', "doble", \`template literal: \${variable}\`

// Caracteres especiales
'Línea 1\\nLínea 2'    // Salto de línea
'Texto\\tTabulado'     // Tabulador
'Texto con \\'comillas\\' escapadas'`}</pre>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarEtiquetas}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}
			</div>

			<div className="consola-simulada">
				<div className="consola-header">
					<h3>Consola</h3>
					<button
						className="limpiar-btn"
						onClick={limpiarConsola}>
						Limpiar
					</button>
				</div>
				<div className="consola-contenido">
					{consolaOutput.length ? (
						consolaOutput.map((linea, index) => (
							<div
								key={index}
								className="consola-linea">
								{linea}
							</div>
						))
					) : (
						<div className="consola-vacia">
							La consola está vacía. Ejecuta un ejemplo para ver resultados.
						</div>
					)}
				</div>
			</div>

			<div className="ejercicio-footer">
				<h3>Conceptos clave para el examen:</h3>
				<ul>
					<li>JavaScript es un lenguaje de scripts que sigue el estándar ECMAScript</li>
					<li>Todas las sentencias en JavaScript terminan con punto y coma (;)</li>
					<li>Los bloques de código se delimitan por llaves {"{}"}</li>
					<li>JavaScript tiene comentarios de línea (//) y de bloque (/* */)</li>
					<li>JavaScript es sensible a mayúsculas y minúsculas</li>
					<li>
						Las etiquetas se clasifican en: identificadores, palabras reservadas, literales y operadores
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej01_Sintaxis_Basica;
