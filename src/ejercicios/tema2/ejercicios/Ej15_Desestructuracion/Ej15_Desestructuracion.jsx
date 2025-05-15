/**
 * @fileoverview Ejercicio 2.15 - Desestructuración
 * @ejercicio 2.15
 * @tema Desestructuración
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarDesestructuracion
 * @description Ejemplifica diferentes casos de desestructuración en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarDesestructuracion = () => {
	const resultados = [];

	// Desestructuración de arrays
	const colores = ["rojo", "verde", "azul"];
	const [primario, secundario, terciario] = colores;
	resultados.push("// Desestructuración de arrays:");
	resultados.push(`const [primario, secundario, terciario] = ${JSON.stringify(colores)}`);
	resultados.push(`primario: ${primario}`);
	resultados.push(`secundario: ${secundario}`);
	resultados.push(`terciario: ${terciario}`);

	// Omitir elementos
	const numeros = [1, 2, 3, 4, 5];
	const [primero, , tercero, ...resto] = numeros;
	resultados.push("\n// Omitir elementos y rest operator:");
	resultados.push(`const [primero, , tercero, ...resto] = ${JSON.stringify(numeros)}`);
	resultados.push(`primero: ${primero}`);
	resultados.push(`tercero: ${tercero}`);
	resultados.push(`resto: ${JSON.stringify(resto)}`);

	// Desestructuración de objetos
	const usuario = {
		nombre: "María",
		edad: 28,
		ciudad: "Barcelona",
		perfil: {
			rol: "admin",
			nivel: "senior",
		},
	};

	const { nombre, edad, ciudad } = usuario;
	resultados.push("\n// Desestructuración de objetos:");
	resultados.push(`const { nombre, edad, ciudad } = ${JSON.stringify(usuario)}`);
	resultados.push(`nombre: ${nombre}`);
	resultados.push(`edad: ${edad}`);
	resultados.push(`ciudad: ${ciudad}`);

	// Renombrar propiedades
	const {
		nombre: nombreUsuario,
		perfil: { rol, nivel },
	} = usuario;
	resultados.push("\n// Renombrar propiedades y desestructuración anidada:");
	resultados.push(`const { nombre: nombreUsuario, perfil: { rol, nivel } } = usuario`);
	resultados.push(`nombreUsuario: ${nombreUsuario}`);
	resultados.push(`rol: ${rol}`);
	resultados.push(`nivel: ${nivel}`);

	// Valores por defecto
	const config = { tema: "claro", idioma: "es" };
	const { tema, idioma, timeout = 1000 } = config;
	resultados.push("\n// Valores por defecto:");
	resultados.push(`const { tema, idioma, timeout = 1000 } = ${JSON.stringify(config)}`);
	resultados.push(`tema: ${tema}`);
	resultados.push(`idioma: ${idioma}`);
	resultados.push(`timeout: ${timeout}`);

	return resultados;
};

/**
 * @function Ej15
 * @description Componente que demuestra el uso de la desestructuración en JavaScript
 */
function Ej15() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarDesestructuracion();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.15: Desestructuración</h2>
				<p className="enunciado">
					Exploración de la desestructuración en JavaScript: arrays, objetos, valores por defecto y patrones
					de desestructuración anidados.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Desestructuración de arrays
const colores = ["rojo", "verde", "azul"];
const [primario, secundario, terciario] = colores;

// Omitir elementos y rest operator
const numeros = [1, 2, 3, 4, 5];
const [primero, , tercero, ...resto] = numeros;

// Desestructuración de objetos
const usuario = {
    nombre: "María",
    edad: 28,
    ciudad: "Barcelona",
    perfil: {
        rol: "admin",
        nivel: "senior"
    }
};
const { nombre, edad, ciudad } = usuario;

// Renombrar propiedades y desestructuración anidada
const { 
    nombre: nombreUsuario,
    perfil: { rol, nivel }
} = usuario;

// Valores por defecto
const config = { tema: "claro", idioma: "es" };
const { tema, idioma, timeout = 1000 } = config;`}</code>
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
					<li>Desestructuración de arrays y objetos</li>
					<li>Operador rest (...) en desestructuración</li>
					<li>Omisión de elementos en arrays</li>
					<li>Renombrado de propiedades</li>
					<li>Desestructuración anidada</li>
					<li>Valores por defecto</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej15;
