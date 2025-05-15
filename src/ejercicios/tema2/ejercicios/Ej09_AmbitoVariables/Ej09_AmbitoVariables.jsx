/**
 * @fileoverview Ejercicio 2.9 - Ámbito de Variables
 * @ejercicio 2.9
 * @tema Variables y Tipos de Datos
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej09
 * @description Demostración de los diferentes ámbitos de variables en JavaScript
 */
function Ej09() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Variables globales (evitar en lo posible)
		window.variableGlobal = "Soy global";

		// Ámbito de función
		function ejemploFuncion() {
			var varFuncion = "Variable de función";
			let letFuncion = "Let de función";
			return { varFuncion, letFuncion };
		}

		// Ámbito de bloque
		{
			let letBloque = "Let de bloque";
			var varBloque = "Var de bloque"; // ¡Cuidado! No respeta el bloque
			const constBloque = "Const de bloque";
			console.log(letBloque, varBloque, constBloque);
		}
		// console.log(letBloque); // Error: letBloque no está definido
		console.log(varBloque); // "Var de bloque" - ¡Sigue accesible!

		// Closures
		function crearContador() {
			let contador = 0;
			return {
				incrementar: () => ++contador,
				obtenerValor: () => contador,
			};
		}

		const contador = crearContador();
		contador.incrementar();
		contador.incrementar();

		// Hoisting
		console.log(variableHoisting); // undefined
		var variableHoisting = "Hoisted";
		// console.log(letHoisting); // Error: no se puede acceder antes de la inicialización
		let letHoisting = "No hoisted";

		const resultados = `// 1. Variable Global (window):
window.variableGlobal = "${window.variableGlobal}"

// 2. Ámbito de Función:
const resultado = ejemploFuncion();
console.log(resultado) => ${JSON.stringify(ejemploFuncion())}

// 3. Ámbito de Bloque:
varBloque (accesible fuera del bloque) = "${varBloque}"
// letBloque y constBloque no son accesibles aquí

// 4. Closure:
contador.obtenerValor() = ${contador.obtenerValor()}

// 5. Hoisting:
var variableHoisting; // hoisted
console.log(variableHoisting); // undefined
variableHoisting = "${variableHoisting}";

// let y const no tienen hoisting:
// console.log(letHoisting); // Error
let letHoisting = "${letHoisting}";`;

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.9: Ámbito de Variables</h2>
				<p className="enunciado">
					Explorar los diferentes ámbitos de variables en JavaScript y conceptos relacionados.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Variable Global
window.variableGlobal = "Soy global";

// Ámbito de Función
function ejemploFuncion() {
    var varFuncion = "Variable de función";
    let letFuncion = "Let de función";
    return { varFuncion, letFuncion };
}

// Ámbito de Bloque
{
    let letBloque = "Let de bloque";
    var varBloque = "Var de bloque";
    const constBloque = "Const de bloque";
}
// console.log(letBloque); // Error
console.log(varBloque); // Funciona

// Closure
function crearContador() {
    let contador = 0;
    return {
        incrementar: () => ++contador,
        obtenerValor: () => contador
    };
}`}</code>
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
					<li>Ámbito global vs local</li>
					<li>Ámbito de función</li>
					<li>Ámbito de bloque</li>
					<li>Closures</li>
					<li>Hoisting</li>
					<li>Diferencias entre var, let y const</li>
					<li>Buenas prácticas de scope</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej09;
