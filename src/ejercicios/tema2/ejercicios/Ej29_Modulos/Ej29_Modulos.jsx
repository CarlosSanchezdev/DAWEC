/**
 * @fileoverview Ejercicio 2.29 - Módulos y Exportación/Importación
 * @ejercicio 2.29
 * @tema Módulos
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

// Ejemplo de módulo con diferentes tipos de exportaciones
const calculadora = {
	sumar: (a, b) => a + b,
	restar: (a, b) => a - b,
	multiplicar: (a, b) => a * b,
	dividir: (a, b) => (b !== 0 ? a / b : "Error: División por cero"),
};

// Clase para demostrar exportación de clase
class Persona {
	constructor(nombre, edad) {
		this.nombre = nombre;
		this.edad = edad;
	}

	saludar() {
		return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
	}
}

// Función auxiliar para mostrar ejemplos de código
const mostrarEjemplosModulos = () => {
	return [
		{
			titulo: "Exportación nombrada",
			codigo: `// matematicas.js
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;

// main.js
import { sumar, restar } from './matematicas.js';`,
		},
		{
			titulo: "Exportación por defecto",
			codigo: `// Persona.js
export default class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

// main.js
import Persona from './Persona.js';`,
		},
		{
			titulo: "Exportación mixta",
			codigo: `// utils.js
export const VERSION = '1.0.0';
export default class Utilidad {
    // ...
}

// main.js
import Utilidad, { VERSION } from './utils.js';`,
		},
		{
			titulo: "Importación con alias",
			codigo: `// main.js
import { sumar as suma, restar as resta } from './matematicas.js';
import * as math from './matematicas.js';`,
		},
		{
			titulo: "Re-exportación",
			codigo: `// index.js
export { sumar, restar } from './matematicas.js';
export { default as Persona } from './Persona.js';`,
		},
	];
};

/**
 * @function demostrarModulos
 * @description Ejemplifica el uso de módulos en JavaScript
 * @returns {string[]} Array con los resultados
 */
const demostrarModulos = () => {
	const resultados = [];

	// Demostrar calculadora
	resultados.push("// Usando el módulo calculadora:");
	resultados.push(`Suma: ${calculadora.sumar(5, 3)}`);
	resultados.push(`Resta: ${calculadora.restar(10, 4)}`);
	resultados.push(`Multiplicación: ${calculadora.multiplicar(6, 2)}`);
	resultados.push(`División: ${calculadora.dividir(15, 3)}`);

	// Demostrar clase Persona
	resultados.push("\n// Usando la clase Persona:");
	const persona = new Persona("Ana", 25);
	resultados.push(persona.saludar());

	return resultados;
};

/**
 * @function Ej29
 * @description Componente que demuestra el uso de módulos en JavaScript
 */
function Ej29() {
	const [output, setOutput] = useState("");
	const [ejemploSeleccionado, setEjemploSeleccionado] = useState(null);

	const ejecutarEjemplos = () => {
		const resultados = demostrarModulos();
		setOutput(resultados.join("\n"));
	};

	const ejemplos = mostrarEjemplosModulos();

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.29: Módulos y Exportación/Importación</h2>
				<p className="enunciado">
					Exploración de módulos en JavaScript: diferentes tipos de exportación e importación, y organización
					de código.
				</p>
			</div>

			<div className="modulos-ejemplos">
				<h3>Ejemplos de sintaxis de módulos</h3>
				<div className="ejemplos-grid">
					{ejemplos.map((ejemplo, index) => (
						<div
							key={index}
							className={`ejemplo-card ${ejemploSeleccionado === index ? "seleccionado" : ""}`}
							onClick={() => setEjemploSeleccionado(index)}>
							<h4>{ejemplo.titulo}</h4>
							{ejemploSeleccionado === index && (
								<pre>
									<code>{ejemplo.codigo}</code>
								</pre>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Exportación nombrada
export const sumar = (a, b) => a + b;
export const PI = 3.14159;
export class Calculadora { }

// Exportación por defecto
export default class Persona { }

// Importación básica
import { sumar, PI } from './matematicas.js';
import Persona from './Persona.js';

// Importación con alias
import { sumar as suma } from './matematicas.js';

// Importación de todo el módulo
import * as matematicas from './matematicas.js';

// Re-exportación
export { sumar, restar } from './matematicas.js';`}</code>
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
					<li>Exportación nombrada</li>
					<li>Exportación por defecto</li>
					<li>Importación básica y con alias</li>
					<li>Importación de módulo completo</li>
					<li>Re-exportación</li>
					<li>Organización de módulos</li>
				</ul>
			</div>

			<style jsx>{`
				.modulos-ejemplos {
					margin: 20px 0;
				}
				.ejemplos-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
					gap: 15px;
					margin-top: 15px;
				}
				.ejemplo-card {
					padding: 15px;
					border: 1px solid #ddd;
					border-radius: 5px;
					cursor: pointer;
					transition: all 0.3s ease;
				}
				.ejemplo-card:hover {
					background-color: #f5f5f5;
				}
				.ejemplo-card.seleccionado {
					border-color: #007bff;
					background-color: #f8f9fa;
				}
				.ejemplo-card h4 {
					margin: 0 0 10px 0;
				}
			`}</style>
		</div>
	);
}

export default Ej29;
