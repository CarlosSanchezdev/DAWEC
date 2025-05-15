/**
 * @fileoverview Ejercicio 2.16 - Funciones Flecha
 * @ejercicio 2.16
 * @tema Funciones
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarFuncionesFlecha
 * @description Ejemplifica diferentes usos de funciones flecha en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarFuncionesFlecha = () => {
	const resultados = [];

	// Sintaxis básica
	resultados.push("// Sintaxis básica:");
	const suma = (a, b) => a + b;
	resultados.push(`const suma = (a, b) => a + b;`);
	resultados.push(`suma(5, 3) = ${suma(5, 3)}`);

	// Función con bloque
	const calcularArea = (base, altura) => {
		const area = base * altura;
		return area / 2;
	};
	resultados.push("\n// Función con bloque:");
	resultados.push(`calcularArea(4, 3) = ${calcularArea(4, 3)}`);

	// Un solo parámetro (sin paréntesis)
	const cuadrado = (x) => x * x;
	resultados.push("\n// Un solo parámetro:");
	resultados.push(`const cuadrado = x => x * x;`);
	resultados.push(`cuadrado(4) = ${cuadrado(4)}`);

	// Sin parámetros
	const saludar = () => "¡Hola Mundo!";
	resultados.push("\n// Sin parámetros:");
	resultados.push(`const saludar = () => "¡Hola Mundo!";`);
	resultados.push(`saludar() = ${saludar()}`);

	// Retorno de objeto implícito
	const crearPersona = (nombre, edad) => ({ nombre, edad });
	resultados.push("\n// Retorno de objeto implícito:");
	resultados.push(`const crearPersona = (nombre, edad) => ({ nombre, edad });`);
	resultados.push(`crearPersona("Ana", 25) = ${JSON.stringify(crearPersona("Ana", 25))}`);

	// Uso con métodos de array
	const numeros = [1, 2, 3, 4, 5];
	resultados.push("\n// Uso con métodos de array:");
	resultados.push("const numeros = [1, 2, 3, 4, 5];");

	const dobles = numeros.map((n) => n * 2);
	resultados.push(`map: ${dobles}`);

	const pares = numeros.filter((n) => n % 2 === 0);
	resultados.push(`filter: ${pares}`);

	const suma_total = numeros.reduce((acc, n) => acc + n, 0);
	resultados.push(`reduce: ${suma_total}`);

	// Contexto (this)
	resultados.push("\n// Contexto (this):");
	const persona = {
		nombre: "Juan",
		amigos: ["Ana", "Pedro", "María"],
		saludarAmigos() {
			return this.amigos.map((amigo) => `${this.nombre} saluda a ${amigo}`);
		},
	};
	resultados.push(JSON.stringify(persona.saludarAmigos(), null, 2));

	return resultados;
};

/**
 * @function Ej16
 * @description Componente que demuestra el uso de funciones flecha en JavaScript
 */
function Ej16() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarFuncionesFlecha();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.16: Funciones Flecha</h2>
				<p className="enunciado">
					Exploración de las funciones flecha en JavaScript: sintaxis, usos comunes, y diferencias con las
					funciones tradicionales.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Sintaxis básica
const suma = (a, b) => a + b;

// Función con bloque
const calcularArea = (base, altura) => {
    const area = base * altura;
    return area / 2;
};

// Un solo parámetro
const cuadrado = x => x * x;

// Sin parámetros
const saludar = () => "¡Hola Mundo!";

// Retorno de objeto implícito
const crearPersona = (nombre, edad) => ({ nombre, edad });

// Uso con métodos de array
const numeros = [1, 2, 3, 4, 5];
const dobles = numeros.map(n => n * 2);
const pares = numeros.filter(n => n % 2 === 0);
const suma_total = numeros.reduce((acc, n) => acc + n, 0);

// Contexto (this)
const persona = {
    nombre: "Juan",
    amigos: ["Ana", "Pedro", "María"],
    saludarAmigos() {
        return this.amigos.map(amigo => 
            \`\${this.nombre} saluda a \${amigo}\`
        );
    }
};`}</code>
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
					<li>Sintaxis de funciones flecha</li>
					<li>Retorno implícito vs explícito</li>
					<li>Paréntesis opcionales y requeridos</li>
					<li>Contexto léxico (this)</li>
					<li>Uso en métodos de array</li>
					<li>Retorno de objetos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej16;
