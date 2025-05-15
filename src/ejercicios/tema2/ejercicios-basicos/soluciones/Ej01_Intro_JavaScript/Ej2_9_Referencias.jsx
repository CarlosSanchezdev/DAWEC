/**
 * @fileoverview Ejercicio 2.9 - Referencias de Variables
 * @ejercicio 2.9
 * @tema Variables y Operaciones Básicas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_9_Referencias.module.css";

/**
 * @function Ej2_9_Referencias
 * @description Componente que demuestra el comportamiento de referencias entre variables tipo string
 * @returns {JSX.Element} Interfaz para demostrar referencias de variables
 */
function Ej2_9_Referencias() {
	const [log, setLog] = useState([]);
	const [mostrarEjemplo, setMostrarEjemplo] = useState(1);

	/**
	 * @function agregarLog
	 * @description Agrega una línea al registro de ejecución
	 * @param {string} mensaje Mensaje a agregar al log
	 */
	const agregarLog = (mensaje) => {
		setLog((prev) => [...prev, mensaje]);
	};

	/**
	 * @function limpiarLog
	 * @description Limpia el registro de ejecución
	 */
	const limpiarLog = () => {
		setLog([]);
	};

	/**
	 * @function ejecutarEjemplo1
	 * @description Demuestra la inmutabilidad de strings
	 */
	const ejecutarEjemplo1 = () => {
		limpiarLog();
		agregarLog("// Ejemplo 1: Inmutabilidad de strings");
		agregarLog("let str1 = 'Hola';");
		agregarLog("let str2 = str1;");
		agregarLog("str1 = 'Adiós';");
		agregarLog("");
		agregarLog("console.log(str1); // Resultado: 'Adiós'");
		agregarLog("console.log(str2); // Resultado: 'Hola'");
		agregarLog("");
		agregarLog("// Los strings son inmutables y se pasan por valor");
		agregarLog("// Cada variable mantiene su propia copia del valor");
	};

	/**
	 * @function ejecutarEjemplo2
	 * @description Demuestra la concatenación y referencias
	 */
	const ejecutarEjemplo2 = () => {
		limpiarLog();
		agregarLog("// Ejemplo 2: Concatenación y referencias");
		agregarLog("let nombre = 'Juan';");
		agregarLog("let saludo = 'Hola ' + nombre;");
		agregarLog("nombre = 'Pedro';");
		agregarLog("");
		agregarLog("console.log(saludo); // Resultado: 'Hola Juan'");
		agregarLog("console.log('Hola ' + nombre); // Resultado: 'Hola Pedro'");
		agregarLog("");
		agregarLog("// La concatenación crea un nuevo string");
		agregarLog("// No mantiene referencia a las variables originales");
	};

	/**
	 * @function ejecutarEjemplo3
	 * @description Demuestra template literals y referencias
	 */
	const ejecutarEjemplo3 = () => {
		limpiarLog();
		agregarLog("// Ejemplo 3: Template literals");
		agregarLog("let user = 'María';");
		agregarLog("let mensaje = `Bienvenida ${user}`;");
		agregarLog("user = 'Ana';");
		agregarLog("");
		agregarLog("console.log(mensaje); // Resultado: 'Bienvenida María'");
		agregarLog("console.log(`Bienvenida ${user}`); // Resultado: 'Bienvenida Ana'");
		agregarLog("");
		agregarLog("// Los template literals se evalúan en el momento");
		agregarLog("// No mantienen referencias dinámicas");
	};

	return (
		<div className={styles.container}>
			<div className={styles.controles}>
				<button
					className={`${styles.botonEjemplo} ${mostrarEjemplo === 1 ? styles.activo : ""}`}
					onClick={() => {
						setMostrarEjemplo(1);
						ejecutarEjemplo1();
					}}>
					Ejemplo 1: Inmutabilidad
				</button>
				<button
					className={`${styles.botonEjemplo} ${mostrarEjemplo === 2 ? styles.activo : ""}`}
					onClick={() => {
						setMostrarEjemplo(2);
						ejecutarEjemplo2();
					}}>
					Ejemplo 2: Concatenación
				</button>
				<button
					className={`${styles.botonEjemplo} ${mostrarEjemplo === 3 ? styles.activo : ""}`}
					onClick={() => {
						setMostrarEjemplo(3);
						ejecutarEjemplo3();
					}}>
					Ejemplo 3: Template Literals
				</button>
			</div>

			<div className={styles.consola}>
				<div className={styles.consolaHeader}>
					<h3>Consola:</h3>
					<button
						onClick={limpiarLog}
						className={styles.limpiarBtn}>
						Limpiar
					</button>
				</div>
				<pre className={styles.consolaContenido}>
					{log.map((linea, index) => (
						<div
							key={index}
							className={styles.lineaConsola}>
							{linea}
						</div>
					))}
				</pre>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Inmutabilidad de strings</li>
					<li>Paso por valor vs. paso por referencia</li>
					<li>Concatenación de strings</li>
					<li>Template literals</li>
					<li>Comportamiento de referencias en JavaScript</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_9_Referencias;
