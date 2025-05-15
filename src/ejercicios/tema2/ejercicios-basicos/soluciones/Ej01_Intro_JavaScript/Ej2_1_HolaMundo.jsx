/**
 * @fileoverview Ejercicio 2.1 - Hola Mundo con JavaScript
 * @ejercicio 2.1
 * @tema Introducción a JavaScript
 * @fecha 2024-01-25
 */

import React from "react";
import styles from "./Ej2_1_HolaMundo.module.css";

/**
 * @function Ej2_1_HolaMundo
 * @description Componente que muestra un mensaje "Hola Mundo" y demuestra
 *             el uso básico de JavaScript en el navegador
 * @returns {JSX.Element} Componente renderizado
 */
const Ej2_1_HolaMundo = () => {
	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function mostrarMensaje
	 * @description Muestra una alerta con el mensaje Hola Mundo
	 */
	const mostrarMensaje = () => {
		alert("¡Hola Mundo desde JavaScript!");
	};

	// ===== RENDER =====
	return (
		<div className={styles.container}>
			<h2>Ejercicio 2.1 - Hola Mundo JS</h2>

			{/* IMPORTANTE: Este es el ejemplo más básico de interacción con JavaScript */}
			<button
				onClick={mostrarMensaje}
				className={styles.button}>
				Mostrar mensaje
			</button>

			<div className={styles.explanation}>
				<h3>Explicación:</h3>
				<p>Este ejercicio demuestra el uso más básico de JavaScript en una página web:</p>
				<ul>
					<li>Uso de una función JavaScript</li>
					<li>Manejo de eventos (click)</li>
					<li>Interacción con el usuario mediante alert()</li>
				</ul>
			</div>
		</div>
	);
};

export default Ej2_1_HolaMundo;
