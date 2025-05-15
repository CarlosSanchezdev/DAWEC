/**
 * @fileoverview Ejercicio 2.5 - Declaración de Variables
 * @ejercicio 2.5
 * @tema Variables y Tipos de Datos
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej05
 * @description Demostración de la declaración de variables con var, let y const
 */
function Ej05() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Ejemplo con var
		var nombre = "Juan";
		{
			nombre = "Pedro"; // Sobreescribe la variable anterior
		}
		console.log("var nombre:", nombre); // Muestra 'Pedro'

		// Ejemplo con let
		let edad = 25;
		{
			let edad = 30; // Nueva variable en este scope
			console.log("let edad (dentro del bloque):", edad); // Muestra 30
		}
		console.log("let edad (fuera del bloque):", edad); // Muestra 25

		// Ejemplo con const
		const PI = 3.14159;
		// PI = 3.14; // Esto causaría un error

		// Objeto const (las propiedades pueden modificarse)
		const persona = { nombre: "Ana", edad: 28 };
		persona.edad = 29; // Esto es válido
		// persona = { nombre: 'Luis' }; // Esto causaría un error

		setOutput(`Resultados (ver también la consola):

1. var (ámbito de función):
   - No respeta bloques
   - Puede redeclararse
   - Puede reasignarse
   
2. let (ámbito de bloque):
   - Respeta bloques
   - No puede redeclararse en el mismo ámbito
   - Puede reasignarse
   
3. const (ámbito de bloque):
   - Respeta bloques
   - No puede redeclararse
   - No puede reasignarse
   - Los objetos pueden modificar sus propiedades`);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.5: Declaración de Variables</h2>
				<p className="enunciado">
					Explorar las diferentes formas de declarar variables en JavaScript: var, let y const.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Ejemplo con var
var nombre = 'Juan';
{
    var nombre = 'Pedro'; // Sobreescribe la variable anterior
}
console.log(nombre); // 'Pedro'

// Ejemplo con let
let edad = 25;
{
    let edad = 30; // Nueva variable en este scope
    console.log(edad); // 30
}
console.log(edad); // 25

// Ejemplo con const
const PI = 3.14159;
// PI = 3.14; // Error

const persona = { nombre: 'Ana', edad: 28 };
persona.edad = 29; // OK
// persona = { nombre: 'Luis' }; // Error`}</code>
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
					<h3>Explicación:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Declaración con var y su ámbito de función</li>
					<li>Declaración con let y su ámbito de bloque</li>
					<li>Declaración con const para valores inmutables</li>
					<li>Diferencias entre inmutabilidad de primitivos y objetos</li>
					<li>Hoisting y temporal dead zone</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej05;
