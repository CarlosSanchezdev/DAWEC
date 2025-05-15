/**
 * @fileoverview Ejercicio 2.30 - Depuración y Herramientas de Desarrollo
 * @ejercicio 2.30
 * @tema Depuración
 * @fecha 14/05/2025
 */

import { useState, useEffect } from "react";
import "../ejercicio.css";

/**
 * @function simulateError
 * @description Función que simula diferentes tipos de errores para depuración
 * @param {string} tipoError - El tipo de error a simular
 * @returns {any} El resultado o error según el caso
 */
const simulateError = (tipoError) => {
	switch (tipoError) {
		case "referencia":
			// Error de referencia (generado en runtime)
			throw new ReferenceError("Variable 'noExiste' no definida");
		// Alternativa: return undefined.propiedad;

		case "sintaxis":
			// Error de sintaxis (se comenta porque no se puede ejecutar)
			// return eval("{ valor: 123 }");
			throw new SyntaxError("Error de sintaxis simulado");

		case "tipo":
			// Error de tipo
			return "texto".toFixed(2);

		case "logico":
			// Error lógico (no lanza excepción)
			return [1, 2, 3].map((x) => x * 2).reduce((a, b) => a - b);

		case "asincrono":
			// Error en promesa
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					reject(new Error("Error asíncrono simulado"));
				}, 1000);
			});

		default:
			return "Tipo de error no reconocido";
	}
};

/**
 * @function demostracionConsola
 * @description Demuestra diferentes métodos de la consola
 */
const demostracionConsola = () => {
	// Niveles de log
	console.log("Log normal");
	console.info("Información");
	console.warn("Advertencia");
	console.error("Error");

	// Agrupación
	console.group("Grupo de logs");
	console.log("Elemento 1");
	console.log("Elemento 2");
	console.groupEnd();

	// Tabla
	console.table([
		{ nombre: "Juan", edad: 25 },
		{ nombre: "Ana", edad: 30 },
	]);

	// Tiempo
	console.time("operación");
	for (let i = 0; i < 1000000; i++) {
		// Simple operation to avoid empty block warning
		let _temp = i;
	}
	console.timeEnd("operación");

	// Conteo
	for (let i = 0; i < 3; i++) {
		console.count("iteración");
	}

	// Traza
	console.trace("Traza de la pila");
};

/**
 * @function Ej30
 * @description Componente que demuestra técnicas de depuración y herramientas de desarrollo
 */
function Ej30() {
	const [output, setOutput] = useState([]);
	const [errorActual, setErrorActual] = useState(null);

	// Capturar errores de consola
	useEffect(() => {
		const consoleLog = console.log;
		const consoleInfo = console.info;
		const consoleWarn = console.warn;
		const consoleError = console.error;
		const consoleTable = console.table;

		console.log = (...args) => {
			setOutput((prev) => [...prev, { tipo: "log", mensaje: args.join(" ") }]);
			consoleLog.apply(console, args);
		};

		console.info = (...args) => {
			setOutput((prev) => [...prev, { tipo: "info", mensaje: args.join(" ") }]);
			consoleInfo.apply(console, args);
		};

		console.warn = (...args) => {
			setOutput((prev) => [...prev, { tipo: "warn", mensaje: args.join(" ") }]);
			consoleWarn.apply(console, args);
		};

		console.error = (...args) => {
			setOutput((prev) => [...prev, { tipo: "error", mensaje: args.join(" ") }]);
			consoleError.apply(console, args);
		};

		console.table = (data) => {
			setOutput((prev) => [
				...prev,
				{
					tipo: "table",
					mensaje: JSON.stringify(data, null, 2),
				},
			]);
			consoleTable.apply(console, [data]);
		};

		return () => {
			console.log = consoleLog;
			console.info = consoleInfo;
			console.warn = consoleWarn;
			console.error = consoleError;
			console.table = consoleTable;
		};
	}, []);

	const ejecutarError = async (tipo) => {
		setErrorActual(null);
		setOutput([]);
		try {
			const resultado = await simulateError(tipo);
			console.log("Resultado:", resultado);
		} catch (error) {
			setErrorActual(error);
			console.error("Error capturado:", error.message);
		}
	};

	const mostrarDemoConsola = () => {
		setErrorActual(null);
		setOutput([]);
		demostracionConsola();
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.30: Depuración y Herramientas de Desarrollo</h2>
				<p className="enunciado">
					Exploración de técnicas de depuración y herramientas de desarrollo en JavaScript, incluyendo manejo
					de errores y uso de la consola.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Uso básico de console
console.log("Mensaje normal");
console.info("Información");
console.warn("Advertencia");
console.error("Error");

// Try-catch para depuración
try {
    // código que puede fallar
    throw new Error("Error simulado");
} catch (error) {
    console.error(error);
    debugger; // punto de interrupción
}

// Depuración asíncrona
async function ejemplo() {
    try {
        await operacionAsincrona();
    } catch (error) {
        console.trace(); // muestra la pila
    }
}

// Console avanzado
console.group("Grupo");
console.table(datos);
console.time("operación");
// ... código ...
console.timeEnd("operación");`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<div className="button-group">
					<h3>Simular errores:</h3>
					<button
						onClick={() => ejecutarError("referencia")}
						className="error-btn">
						Error de Referencia
					</button>
					<button
						onClick={() => ejecutarError("sintaxis")}
						className="error-btn">
						Error de Sintaxis
					</button>
					<button
						onClick={() => ejecutarError("tipo")}
						className="error-btn">
						Error de Tipo
					</button>
					<button
						onClick={() => ejecutarError("logico")}
						className="error-btn">
						Error Lógico
					</button>
					<button
						onClick={() => ejecutarError("asincrono")}
						className="error-btn">
						Error Asíncrono
					</button>
				</div>

				<button
					onClick={mostrarDemoConsola}
					className="ejecutar-btn">
					Demostración de Console
				</button>
			</div>

			{errorActual && (
				<div className="error-display">
					<h3>Error Actual:</h3>
					<pre>{errorActual.toString()}</pre>
					{errorActual.stack && (
						<div className="stack-trace">
							<h4>Stack Trace:</h4>
							<pre>{errorActual.stack}</pre>
						</div>
					)}
				</div>
			)}

			{output.length > 0 && (
				<div className="console-output">
					<h3>Salida de Consola:</h3>
					{output.map((item, index) => (
						<div
							key={index}
							className={`console-line ${item.tipo}`}>
							<span className="console-type">[{item.tipo}]</span>
							<pre>{item.mensaje}</pre>
						</div>
					))}
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Console API y sus métodos</li>
					<li>Depuración con breakpoints</li>
					<li>Try/catch y manejo de errores</li>
					<li>Stack trace y seguimiento</li>
					<li>Depuración asíncrona</li>
					<li>DevTools y herramientas</li>
				</ul>

				<h3>Herramientas de Desarrollo:</h3>
				<ul>
					<li>Console Panel: Para logs y depuración</li>
					<li>Sources Panel: Para breakpoints y código</li>
					<li>Network Panel: Para peticiones HTTP</li>
					<li>Performance Panel: Para rendimiento</li>
					<li>Memory Panel: Para uso de memoria</li>
					<li>Application Panel: Para almacenamiento</li>
				</ul>
			</div>

			<style jsx>{`
				.button-group {
					margin: 20px 0;
				}
				.error-btn {
					margin: 5px;
					padding: 8px 12px;
					border: 1px solid #ddd;
					border-radius: 4px;
					background: #f8f8f8;
					cursor: pointer;
				}
				.error-btn:hover {
					background: #e8e8e8;
				}
				.console-output {
					margin: 20px 0;
					padding: 15px;
					background: #1e1e1e;
					border-radius: 4px;
					color: #fff;
				}
				.console-line {
					padding: 5px;
					border-bottom: 1px solid #333;
				}
				.console-type {
					font-weight: bold;
					margin-right: 10px;
				}
				.log {
					color: #fff;
				}
				.info {
					color: #58a6ff;
				}
				.warn {
					color: #d29922;
				}
				.error {
					color: #f85149;
				}
				.table {
					background: #2d2d2d;
					padding: 10px;
					border-radius: 4px;
				}
				.error-display {
					margin: 20px 0;
					padding: 15px;
					background: #ffebee;
					border: 1px solid #ffcdd2;
					border-radius: 4px;
				}
				.stack-trace {
					margin-top: 10px;
					padding: 10px;
					background: #fff;
					border-radius: 4px;
				}
			`}</style>
		</div>
	);
}

export default Ej30;
