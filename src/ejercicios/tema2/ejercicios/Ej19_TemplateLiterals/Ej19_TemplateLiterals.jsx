/**
 * @fileoverview Ejercicio 2.19 - Template Literals
 * @ejercicio 2.19
 * @tema Strings
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarTemplateLiterals
 * @description Ejemplifica diferentes usos de template literals en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarTemplateLiterals = () => {
	const resultados = [];

	// Template literal básico
	const nombre = "María";
	const edad = 25;
	resultados.push("// Template literal básico:");
	resultados.push(`const mensaje = \`Hola, soy \${nombre} y tengo \${edad} años\`;`);
	resultados.push(`Resultado: Hola, soy ${nombre} y tengo ${edad} años`);

	// Multilinea
	resultados.push("\n// Multilinea:");
	const poema = `
    Las rosas son rojas,
    Las violetas azules,
    JavaScript es genial,
    ¿Y tú qué piensas?`;
	resultados.push("const poema = `");
	resultados.push(poema);
	resultados.push("`");

	// Expresiones en template literals
	resultados.push("\n// Expresiones en template literals:");
	const precio = 19.99;
	const cantidad = 3;
	resultados.push(`Precio: ${precio}, Cantidad: ${cantidad}`);
	resultados.push(`Total: $${(precio * cantidad).toFixed(2)}`);
	resultados.push(`¿Es caro? ${precio > 20 ? "Sí" : "No"}`);

	// Tagged templates
	resultados.push("\n// Tagged templates:");
	const destacar = (strings, ...valores) => {
		return strings.reduce((resultado, str, i) => {
			const valor = valores[i] || "";
			return `${resultado}${str}<strong>${valor}</strong>`;
		}, "");
	};

	const producto = "laptop";
	const marca = "TechBrand";
	const html = destacar`Mi ${producto} es de la marca ${marca}`;
	resultados.push("Función destacar:");
	resultados.push(html);

	// Template literal con funciones
	resultados.push("\n// Template literal con funciones:");
	const obtenerSaludo = (nombre) => `¡Hola ${nombre}!`;
	const obtenerHora = () => new Date().toLocaleTimeString();
	resultados.push(`Saludo: ${obtenerSaludo("Carlos")}`);
	resultados.push(`Hora actual: ${obtenerHora()}`);

	// Anidación de template literals
	resultados.push("\n// Anidación de template literals:");
	const condicion = true;
	const mensaje = `El resultado es: ${condicion ? `condición verdadera: ${1 + 1}` : `condición falsa: ${0}`}`;
	resultados.push(mensaje);

	return resultados;
};

/**
 * @function Ej19
 * @description Componente que demuestra el uso de template literals en JavaScript
 */
function Ej19() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarTemplateLiterals();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.19: Template Literals</h2>
				<p className="enunciado">
					Exploración de template literals en JavaScript: sintaxis básica, expresiones, multilinea y tagged
					templates.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Template literal básico
const nombre = "María";
const edad = 25;
const mensaje = \`Hola, soy \${nombre} y tengo \${edad} años\`;

// Multilinea
const poema = \`
    Las rosas son rojas,
    Las violetas azules,
    JavaScript es genial,
    ¿Y tú qué piensas?
\`;

// Expresiones
const precio = 19.99;
const cantidad = 3;
const total = \`Total: $\${(precio * cantidad).toFixed(2)}\`;

// Tagged templates
const destacar = (strings, ...valores) => {
    return strings.reduce((resultado, str, i) => {
        const valor = valores[i] || "";
        return \`\${resultado}\${str}<strong>\${valor}</strong>\`;
    }, "");
};

const producto = "laptop";
const marca = "TechBrand";
const html = destacar\`Mi \${producto} es de la marca \${marca}\`;`}</code>
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
					<li>Sintaxis de template literals</li>
					<li>Interpolación de expresiones</li>
					<li>Strings multilinea</li>
					<li>Tagged templates</li>
					<li>Anidación de template literals</li>
					<li>Uso con funciones</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej19;
