/**
 * @fileoverview Ejercicio sobre operadores y estructuras de control en JavaScript
 * @ejercicio Ej03_Operadores_Estructuras
 * @tema Tema 2: JavaScript Sintaxis Básica
 * @fecha 12/05/2025
 */

import React, { useState } from "react";
import "./Ej03_Operadores_Estructuras.css";

/**
 * @function Ej03_Operadores_Estructuras
 * @description Componente que demuestra los operadores y estructuras de control en JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej03_Operadores_Estructuras() {
	// ===== HOOKS =====
	const [consolaOutput, setConsolaOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("operadores");
	const [input1, setInput1] = useState(10);
	const [input2, setInput2] = useState(5);
	const [condicion, setCondicion] = useState("");
	const [puntuacion, setPuntuacion] = useState(75);

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
	 * @function ejecutarOperadores
	 * @description Ejecuta ejemplos de operadores
	 */
	const ejecutarOperadores = () => {
		limpiarConsola();

		const a = Number(input1);
		const b = Number(input2);

		// Operadores aritméticos
		consoleLog("=== Operadores Aritméticos ===");
		consoleLog(`a = ${a}, b = ${b}`);
		consoleLog(`a + b = ${a + b} (Suma)`);
		consoleLog(`a - b = ${a - b} (Resta)`);
		consoleLog(`a * b = ${a * b} (Multiplicación)`);
		consoleLog(`a / b = ${a / b} (División)`);
		consoleLog(`a % b = ${a % b} (Módulo o resto)`);
		consoleLog(`a ** b = ${a ** b} (Exponenciación)`);

		let x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`++x = ${++x} (Incremento prefijo)`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x++ = ${x++} (Incremento postfijo)`);
		consoleLog(`Después del incremento postfijo, x = ${x}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`--x = ${--x} (Decremento prefijo)`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x-- = ${x--} (Decremento postfijo)`);
		consoleLog(`Después del decremento postfijo, x = ${x}`);

		// Operadores de asignación
		consoleLog("\n=== Operadores de Asignación ===");
		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x += b es equivalente a x = x + b. Resultado: ${(x += b)}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x -= b es equivalente a x = x - b. Resultado: ${(x -= b)}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x *= b es equivalente a x = x * b. Resultado: ${(x *= b)}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x /= b es equivalente a x = x / b. Resultado: ${(x /= b)}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x %= b es equivalente a x = x % b. Resultado: ${(x %= b)}`);

		x = a;
		consoleLog(`x = ${x}`);
		consoleLog(`x **= b es equivalente a x = x ** b. Resultado: ${(x **= b)}`);

		// Operadores de comparación
		consoleLog("\n=== Operadores de Comparación ===");
		consoleLog(`a = ${a}, b = ${b}`);
		consoleLog(`a == b: ${a == b} (Igualdad)`);
		consoleLog(`a === b: ${a === b} (Igualdad estricta)`);
		consoleLog(`a != b: ${a != b} (Desigualdad)`);
		consoleLog(`a !== b: ${a !== b} (Desigualdad estricta)`);
		consoleLog(`a > b: ${a > b} (Mayor que)`);
		consoleLog(`a >= b: ${a >= b} (Mayor o igual que)`);
		consoleLog(`a < b: ${a < b} (Menor que)`);
		consoleLog(`a <= b: ${a <= b} (Menor o igual que)`);

		// Operadores lógicos
		consoleLog("\n=== Operadores Lógicos ===");
		consoleLog(`a > 0 && b > 0: ${a > 0 && b > 0} (AND lógico - ambos deben ser true)`);
		consoleLog(`a < 0 || b > 0: ${a < 0 || b > 0} (OR lógico - al menos uno debe ser true)`);
		consoleLog(`!(a > b): ${!(a > b)} (NOT lógico - niega la condición)`);

		// Operador ternario
		consoleLog("\n=== Operador Ternario ===");
		consoleLog(`a > b ? "a es mayor" : "b es mayor o igual": ${a > b ? "a es mayor" : "b es mayor o igual"}`);

		// Operador de cadena (string template)
		consoleLog("\n=== Operador de Cadena (Template Literals) ===");
		consoleLog("Usando template literals: `El valor de a es ${a} y el valor de b es ${b}`");
		consoleLog(`El valor de a es ${a} y el valor de b es ${b}`);
	};

	/**
	 * @function ejecutarEstructuras
	 * @description Ejecuta ejemplos de estructuras condicionales
	 */
	const ejecutarEstructuras = () => {
		limpiarConsola();

		// Obtener el valor de la condición
		const condicionValue = condicion.trim();
		const score = Number(puntuacion);

		// Ejemplo de if simple
		consoleLog("=== Estructura condicional simple (if) ===");
		consoleLog(`Evaluando la condición: ${condicionValue || "Sin condición especificada"}`);

		if (condicionValue) {
			consoleLog("El resultado es verdadero (truly)");
			consoleLog("La condición no está vacía");
		}

		// Ejemplo de if-else
		consoleLog("\n=== Estructura condicional compuesta (if-else) ===");
		consoleLog(`Puntuación: ${score}`);

		if (score >= 60) {
			consoleLog("Resultado: Aprobado");
		} else {
			consoleLog("Resultado: Suspenso");
		}

		// Ejemplo de if-else if-else
		consoleLog("\n=== Estructura condicional anidada (if-else if-else) ===");
		consoleLog(`Evaluando la puntuación: ${score}`);

		if (score >= 90) {
			consoleLog("Calificación: Sobresaliente");
		} else if (score >= 70) {
			consoleLog("Calificación: Notable");
		} else if (score >= 60) {
			consoleLog("Calificación: Aprobado");
		} else {
			consoleLog("Calificación: Suspenso");
		}

		// Ejemplo de switch
		consoleLog("\n=== Estructura switch ===");
		const calificacionLetra = obtenerCalificacionLetra(score);
		consoleLog(`Puntuación: ${score}, Calificación letra: ${calificacionLetra}`);

		// Valores truthy y falsy
		consoleLog("\n=== Valores Truthy y Falsy ===");
		const ejemplos = [true, false, 0, 1, -1, "", "hola", null, undefined, NaN, [], {}, function () {}];

		ejemplos.forEach((valor) => {
			consoleLog(
				`Valor: ${
					valor === ""
						? "(cadena vacía)"
						: valor === null
						? "null"
						: valor === undefined
						? "undefined"
						: typeof valor === "function"
						? "function() {}"
						: typeof valor === "object"
						? JSON.stringify(valor)
						: valor
				}`
			);
			consoleLog(`Evaluación booleana: ${Boolean(valor)}`);

			if (valor) {
				consoleLog(`→ Es un valor "truthy" (evaluado como verdadero)`);
			} else {
				consoleLog(`→ Es un valor "falsy" (evaluado como falso)`);
			}
			consoleLog("---");
		});
	};

	/**
	 * @function obtenerCalificacionLetra
	 * @description Obtiene una calificación en letra según la puntuación
	 * @param {number} puntuacion - Puntuación numérica (0-100)
	 * @returns {string} Calificación en letra
	 */
	const obtenerCalificacionLetra = (puntuacion) => {
		let letra;

		switch (true) {
			case puntuacion >= 90:
				letra = "A";
				break;
			case puntuacion >= 80:
				letra = "B";
				break;
			case puntuacion >= 70:
				letra = "C";
				break;
			case puntuacion >= 60:
				letra = "D";
				break;
			default:
				letra = "F";
		}

		return letra;
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2 className="ejercicio-title">Ejercicio 3: Operadores y Estructuras de Control</h2>
			<p className="ejercicio-description">
				Este ejercicio demuestra los operadores disponibles en JavaScript y las diferentes estructuras de
				control condicionales.
			</p>

			<div className="ejercicio-tabs">
				<button
					className={activeTab === "operadores" ? "tab-active" : ""}
					onClick={() => setActiveTab("operadores")}>
					Operadores
				</button>
				<button
					className={activeTab === "estructuras" ? "tab-active" : ""}
					onClick={() => setActiveTab("estructuras")}>
					Estructuras Condicionales
				</button>
			</div>

			<div className="ejercicio-content">
				{activeTab === "operadores" && (
					<div className="seccion">
						<h3>2.6 Operadores</h3>
						<p>
							Los operadores son símbolos que expresan operaciones a realizar entre valores o variables.
							JavaScript dispone de diversos tipos de operadores que permiten realizar cálculos,
							comparaciones, asignaciones y más.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="input1">Valor 1:</label>
								<input
									id="input1"
									type="number"
									value={input1}
									onChange={(e) => setInput1(e.target.value)}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="input2">Valor 2:</label>
								<input
									id="input2"
									type="number"
									value={input2}
									onChange={(e) => setInput2(e.target.value)}
								/>
							</div>
						</div>

						<div className="operadores-grid">
							<div className="operador-card">
								<h4>Operadores Aritméticos</h4>
								<table className="operadores-tabla">
									<thead>
										<tr>
											<th>Operador</th>
											<th>Descripción</th>
											<th>Ejemplo</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>+</td>
											<td>Suma</td>
											<td>a + b</td>
										</tr>
										<tr>
											<td>-</td>
											<td>Resta</td>
											<td>a - b</td>
										</tr>
										<tr>
											<td>*</td>
											<td>Multiplicación</td>
											<td>a * b</td>
										</tr>
										<tr>
											<td>/</td>
											<td>División</td>
											<td>a / b</td>
										</tr>
										<tr>
											<td>%</td>
											<td>Módulo (resto)</td>
											<td>a % b</td>
										</tr>
										<tr>
											<td>**</td>
											<td>Exponenciación</td>
											<td>a ** b</td>
										</tr>
										<tr>
											<td>++</td>
											<td>Incremento</td>
											<td>++a, a++</td>
										</tr>
										<tr>
											<td>--</td>
											<td>Decremento</td>
											<td>--a, a--</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="operador-card">
								<h4>Operadores de Asignación</h4>
								<table className="operadores-tabla">
									<thead>
										<tr>
											<th>Operador</th>
											<th>Equivale a</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>x = y</td>
											<td>Asignación simple</td>
										</tr>
										<tr>
											<td>x += y</td>
											<td>x = x + y</td>
										</tr>
										<tr>
											<td>x -= y</td>
											<td>x = x - y</td>
										</tr>
										<tr>
											<td>x *= y</td>
											<td>x = x * y</td>
										</tr>
										<tr>
											<td>x /= y</td>
											<td>x = x / y</td>
										</tr>
										<tr>
											<td>x %= y</td>
											<td>x = x % y</td>
										</tr>
										<tr>
											<td>x **= y</td>
											<td>x = x ** y</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="operador-card">
								<h4>Operadores de Comparación</h4>
								<table className="operadores-tabla">
									<thead>
										<tr>
											<th>Operador</th>
											<th>Descripción</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>==</td>
											<td>Igualdad (con conversión)</td>
										</tr>
										<tr>
											<td>===</td>
											<td>Igualdad estricta (sin conversión)</td>
										</tr>
										<tr>
											<td>!=</td>
											<td>Desigualdad</td>
										</tr>
										<tr>
											<td>!==</td>
											<td>Desigualdad estricta</td>
										</tr>
										<tr>
											<td>&gt;</td>
											<td>Mayor que</td>
										</tr>
										<tr>
											<td>&gt;=</td>
											<td>Mayor o igual que</td>
										</tr>
										<tr>
											<td>&lt;</td>
											<td>Menor que</td>
										</tr>
										<tr>
											<td>&lt;=</td>
											<td>Menor o igual que</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="operador-card">
								<h4>Operadores Lógicos</h4>
								<table className="operadores-tabla">
									<thead>
										<tr>
											<th>Operador</th>
											<th>Descripción</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>&&</td>
											<td>AND lógico</td>
										</tr>
										<tr>
											<td>||</td>
											<td>OR lógico</td>
										</tr>
										<tr>
											<td>!</td>
											<td>NOT lógico</td>
										</tr>
										<tr>
											<td>?:</td>
											<td>Operador ternario (condición ? valorSiTrue : valorSiFalse)</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarOperadores}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "estructuras" && (
					<div className="seccion">
						<h3>2.7 Estructuras de Control</h3>
						<p>
							Las estructuras de control permiten modificar el flujo de ejecución de un programa
							dependiendo de ciertas condiciones o criterios.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="condicion">Condición (texto para evaluar):</label>
								<input
									id="condicion"
									type="text"
									value={condicion}
									onChange={(e) => setCondicion(e.target.value)}
									placeholder="Escribe algo para evaluar como condición"
								/>
							</div>

							<div className="input-group">
								<label htmlFor="puntuacion">Puntuación (0-100):</label>
								<input
									id="puntuacion"
									type="number"
									min="0"
									max="100"
									value={puntuacion}
									onChange={(e) => setPuntuacion(e.target.value)}
								/>
							</div>
						</div>

						<div className="estructuras-container">
							<div className="estructura-card">
								<h4>2.7.1 Estructura Condicional Simple (if)</h4>
								<p>Ejecuta un bloque de código si la condición evaluada es verdadera.</p>
								<pre>{`if (condición) {
  // código a ejecutar si la condición es verdadera
}`}</pre>
							</div>

							<div className="estructura-card">
								<h4>2.7.2 Estructura Condicional Compuesta (if-else)</h4>
								<p>
									Ejecuta un bloque de código si la condición es verdadera y otro bloque si es falsa.
								</p>
								<pre>{`if (condición) {
  // código a ejecutar si la condición es verdadera
} else {
  // código a ejecutar si la condición es falsa
}`}</pre>
							</div>

							<div className="estructura-card">
								<h4>2.7.3 Estructura Condicional Anidada (if-else if-else)</h4>
								<p>Permite evaluar múltiples condiciones en secuencia.</p>
								<pre>{`if (condición1) {
  // código a ejecutar si condición1 es verdadera
} else if (condición2) {
  // código a ejecutar si condición1 es falsa y condición2 es verdadera
} else {
  // código a ejecutar si todas las condiciones son falsas
}`}</pre>
							</div>

							<div className="estructura-card">
								<h4>2.7.4 Switch</h4>
								<p>Selecciona un bloque de código a ejecutar basándose en el valor de una expresión.</p>
								<pre>{`switch (expresión) {
  case valor1:
    // código a ejecutar si expresión === valor1
    break;
  case valor2:
    // código a ejecutar si expresión === valor2
    break;
  default:
    // código a ejecutar si no coincide con ningún caso
}`}</pre>
							</div>

							<div className="estructura-card">
								<h4>2.7.5 Valores Truthy y Falsy</h4>
								<p>
									En JavaScript, los valores pueden evaluarse como verdaderos (truthy) o falsos
									(falsy) en un contexto booleano.
								</p>
								<p>
									<strong>Valores Falsy:</strong> false, 0, -0, 0n, "", null, undefined, NaN
								</p>
								<p>
									<strong>Valores Truthy:</strong> Cualquier otro valor, incluyendo objetos vacíos{" "}
									{"{}"} y arrays vacíos []
								</p>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarEstructuras}>
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
					<li>Los operadores en JavaScript permiten realizar operaciones sobre valores y variables</li>
					<li>Existen operadores aritméticos, de asignación, de comparación y lógicos</li>
					<li>Los operadores de comparación estricta (=== y !==) comparan sin conversión de tipos</li>
					<li>Las estructuras condicionales permiten ejecutar código según se cumplan ciertas condiciones</li>
					<li>Las estructuras if, if-else y switch son las principales estructuras condicionales</li>
					<li>
						Los valores en JavaScript se evalúan como truthy (verdadero) o falsy (falso) en contextos
						booleanos
					</li>
					<li>El operador ternario es una forma concisa de escribir una estructura if-else</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03_Operadores_Estructuras;
