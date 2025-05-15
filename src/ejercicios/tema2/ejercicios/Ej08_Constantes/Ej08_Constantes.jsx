/**
 * @fileoverview Ejercicio 2.8 - Constantes
 * @ejercicio 2.8
 * @tema Variables y Tipos de Datos
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej08
 * @description Demostración del uso de constantes en JavaScript
 */
function Ej08() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		// Constantes primitivas
		const PI = 3.14159;
		const DIAS_SEMANA = 7;
		const NOMBRE_APP = "Mi Aplicación";

		// Constantes de objeto (las propiedades pueden modificarse)
		const CONFIGURACION = {
			tema: "claro",
			idioma: "es",
			version: "1.0.0",
		};

		// Constantes de array
		const COLORES_PRIMARIOS = ["rojo", "azul", "amarillo"];

		// Intentar modificar constantes (generará errores)
		try {
			// PI = 3.14; // Error: no se puede reasignar
			CONFIGURACION.tema = "oscuro"; // Esto sí funciona
			COLORES_PRIMARIOS.push("verde"); // Esto también funciona
		} catch (error) {
			console.error(error);
		}

		// Object.freeze() para hacer inmutable un objeto
		const CONFIGURACION_INMUTABLE = Object.freeze({
			host: "localhost",
			puerto: 3000,
			protocolo: "https",
		});

		try {
			// CONFIGURACION_INMUTABLE.puerto = 8080; // Error en modo estricto
		} catch (error) {
			console.error(error);
		}

		const resultados = `// Constantes primitivas:
const PI = ${PI}
const DIAS_SEMANA = ${DIAS_SEMANA}
const NOMBRE_APP = "${NOMBRE_APP}"

// Constantes de objeto (mutables):
const CONFIGURACION = ${JSON.stringify(CONFIGURACION, null, 2)}

// Constantes de array (mutables):
const COLORES_PRIMARIOS = ${JSON.stringify(COLORES_PRIMARIOS)}

// Object.freeze() para inmutabilidad total:
const CONFIGURACION_INMUTABLE = ${JSON.stringify(CONFIGURACION_INMUTABLE, null, 2)}

// Intentar modificar CONFIGURACION_INMUTABLE.puerto generará un error
console.log(Object.isFrozen(CONFIGURACION_INMUTABLE)); // ${Object.isFrozen(CONFIGURACION_INMUTABLE)}`;

		setOutput(resultados);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.8: Constantes</h2>
				<p className="enunciado">Explorar el uso de constantes en JavaScript y la inmutabilidad.</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Constantes primitivas
const PI = 3.14159;
const DIAS_SEMANA = 7;

// Constantes de objeto (las propiedades son mutables)
const CONFIG = {
    tema: "claro",
    idioma: "es"
};
CONFIG.tema = "oscuro"; // Esto funciona

// Object.freeze() para inmutabilidad total
const CONFIG_INMUTABLE = Object.freeze({
    host: "localhost",
    puerto: 3000
});
// CONFIG_INMUTABLE.puerto = 8080; // Error`}</code>
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
					<li>Declaración de constantes con const</li>
					<li>Inmutabilidad de valores primitivos</li>
					<li>Mutabilidad de objetos y arrays</li>
					<li>Uso de Object.freeze()</li>
					<li>Convenciones de nomenclatura para constantes</li>
					<li>Buenas prácticas en el uso de constantes</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej08;
