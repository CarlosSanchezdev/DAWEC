/**
 * @fileoverview Ejercicio 2.17 - Promesas y async/await
 * @ejercicio 2.17
 * @tema Asincronía
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function simularPeticion
 * @description Simula una petición asíncrona
 * @param {number} tiempo - Tiempo de espera en ms
 * @param {any} valor - Valor a devolver
 * @param {boolean} exito - Si la promesa debe resolverse o rechazarse
 * @returns {Promise} Promesa que se resuelve o rechaza después del tiempo especificado
 */
const simularPeticion = (tiempo, valor, exito = true) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (exito) {
				resolve(valor);
			} else {
				reject(new Error(`Error al obtener ${valor}`));
			}
		}, tiempo);
	});
};

/**
 * @function demostrarPromesas
 * @description Ejemplifica el uso de promesas y async/await
 * @returns {Promise<string[]>} Array con los resultados de las operaciones
 */
const demostrarPromesas = async () => {
	const resultados = [];

	// Promesa básica
	resultados.push("// Promesa básica:");
	try {
		const dato = await simularPeticion(1000, "Datos obtenidos");
		resultados.push(`Resultado: ${dato}`);
	} catch (error) {
		resultados.push(`Error: ${error.message}`);
	}

	// Promesas en paralelo
	resultados.push("\n// Promesas en paralelo:");
	try {
		const inicio = Date.now();
		const [res1, res2] = await Promise.all([simularPeticion(1000, "Datos 1"), simularPeticion(1000, "Datos 2")]);
		const tiempo = Date.now() - inicio;
		resultados.push(`Resultado 1: ${res1}`);
		resultados.push(`Resultado 2: ${res2}`);
		resultados.push(`Tiempo total: ${tiempo}ms`);
	} catch (error) {
		resultados.push(`Error: ${error.message}`);
	}

	// Manejo de errores
	resultados.push("\n// Manejo de errores:");
	try {
		await simularPeticion(1000, "datos", false);
	} catch (error) {
		resultados.push(`Capturado: ${error.message}`);
	}

	// Promise.race
	resultados.push("\n// Promise.race:");
	try {
		const ganador = await Promise.race([simularPeticion(1000, "Rápido"), simularPeticion(2000, "Lento")]);
		resultados.push(`Ganador: ${ganador}`);
	} catch (error) {
		resultados.push(`Error: ${error.message}`);
	}

	// Encadenamiento de promesas
	resultados.push("\n// Encadenamiento de promesas:");
	try {
		const resultado = await simularPeticion(1000, 5)
			.then((valor) => valor * 2)
			.then((valor) => valor + 3)
			.then((valor) => `Resultado final: ${valor}`);
		resultados.push(resultado);
	} catch (error) {
		resultados.push(`Error: ${error.message}`);
	}

	return resultados;
};

/**
 * @function Ej17
 * @description Componente que demuestra el uso de promesas y async/await en JavaScript
 */
function Ej17() {
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);

	const ejecutarEjemplos = async () => {
		setLoading(true);
		try {
			const resultados = await demostrarPromesas();
			setOutput(resultados.join("\n"));
		} catch (error) {
			setOutput(`Error general: ${error.message}`);
		}
		setLoading(false);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.17: Promesas y async/await</h2>
				<p className="enunciado">
					Exploración de la programación asíncrona en JavaScript usando promesas y la sintaxis async/await.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Crear una promesa
const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Datos obtenidos");
        // reject(new Error("Algo salió mal"));
    }, 1000);
});

// Usando async/await
async function obtenerDatos() {
    try {
        const datos = await miPromesa;
        console.log(datos);
    } catch (error) {
        console.error(error);
    }
}

// Promesas en paralelo
const resultados = await Promise.all([
    promesa1,
    promesa2
]);

// Promise.race
const ganador = await Promise.race([
    promesaRapida,
    promesaLenta
]);

// Encadenamiento
miPromesa
    .then(valor => valor * 2)
    .then(valor => valor + 3)
    .catch(error => console.error(error));`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarEjemplos}
					className="ejecutar-btn"
					disabled={loading}>
					{loading ? "Ejecutando..." : "Ejecutar ejemplos"}
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
					<li>Promesas y sus estados</li>
					<li>Sintaxis async/await</li>
					<li>Manejo de errores con try/catch</li>
					<li>Promise.all y Promise.race</li>
					<li>Encadenamiento de promesas</li>
					<li>Programación asíncrona</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej17;
