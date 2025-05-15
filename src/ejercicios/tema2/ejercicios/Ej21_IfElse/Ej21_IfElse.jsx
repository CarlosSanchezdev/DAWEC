/**
 * @fileoverview Ejercicio 2.21 - Estructuras de Control If/Else
 * @ejercicio 2.21
 * @tema Estructuras de Control
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarIfElse
 * @description Ejemplifica diferentes usos de estructuras if/else en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarIfElse = () => {
	const resultados = [];

	// If simple
	const edad = 18;
	resultados.push("// If simple:");
	if (edad >= 18) {
		resultados.push("La persona es mayor de edad");
	}

	// If/else
	const hora = new Date().getHours();
	resultados.push("\n// If/else:");
	if (hora < 12) {
		resultados.push("Buenos días");
	} else {
		resultados.push("Buenas tardes/noches");
	}

	// If/else if/else
	const nota = 8.5;
	resultados.push("\n// If/else if/else:");
	if (nota >= 9) {
		resultados.push("Sobresaliente");
	} else if (nota >= 7) {
		resultados.push("Notable");
	} else if (nota >= 5) {
		resultados.push("Aprobado");
	} else {
		resultados.push("Suspenso");
	}

	// Operador ternario
	const esPar = 4;
	resultados.push("\n// Operador ternario:");
	resultados.push(`${esPar} es ${esPar % 2 === 0 ? "par" : "impar"}`);

	// Ternario anidado
	const temperatura = 25;
	resultados.push("\n// Ternario anidado:");
	const clima =
		temperatura < 0
			? "helado"
			: temperatura < 15
			? "frío"
			: temperatura < 25
			? "agradable"
			: temperatura < 35
			? "caluroso"
			: "muy caluroso";
	resultados.push(`Con ${temperatura}°C el clima está ${clima}`);

	// Condiciones múltiples
	const diaSemana = new Date().getDay();
	resultados.push("\n// Condiciones múltiples:");
	if (diaSemana === 0 || diaSemana === 6) {
		resultados.push("Es fin de semana");
	} else {
		resultados.push("Es día laborable");
	}

	// Condiciones anidadas
	const usuario = {
		edad: 20,
		permiso: true,
		experiencia: 2,
	};

	resultados.push("\n// Condiciones anidadas:");
	if (usuario.edad >= 18) {
		if (usuario.permiso) {
			if (usuario.experiencia >= 2) {
				resultados.push("Puede conducir vehículos especiales");
			} else {
				resultados.push("Puede conducir vehículos normales");
			}
		} else {
			resultados.push("No tiene permiso de conducir");
		}
	} else {
		resultados.push("Es menor de edad");
	}

	return resultados;
};

/**
 * @function Ej21
 * @description Componente que demuestra el uso de estructuras if/else en JavaScript
 */
function Ej21() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarIfElse();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.21: Estructuras If/Else</h2>
				<p className="enunciado">
					Exploración de las estructuras de control if/else en JavaScript: sintaxis básica, condiciones
					múltiples y operador ternario.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// If simple
if (edad >= 18) {
    console.log("Mayor de edad");
}

// If/else
if (hora < 12) {
    console.log("Buenos días");
} else {
    console.log("Buenas tardes");
}

// If/else if/else
if (nota >= 9) {
    console.log("Sobresaliente");
} else if (nota >= 7) {
    console.log("Notable");
} else if (nota >= 5) {
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}

// Operador ternario
const resultado = edad >= 18 ? "Mayor" : "Menor";

// Ternario anidado
const clima = temp < 0 ? "helado" : 
             temp < 15 ? "frío" : 
             temp < 25 ? "agradable" : "caluroso";

// Condiciones múltiples
if (dia === 0 || dia === 6) {
    console.log("Fin de semana");
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
					<li>Estructura if simple</li>
					<li>Estructura if/else</li>
					<li>Estructura if/else if/else</li>
					<li>Operador ternario</li>
					<li>Condiciones múltiples</li>
					<li>Condiciones anidadas</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej21;
