/**
 * @fileoverview Ejercicio 2.1 - Hola Mundo JavaScript
 * @version 1.0
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej01
 * @description Primer ejercicio mostrando mensaje con alert()
 */
function Ej01() {
	const [ejecutado, setEjecutado] = useState(false);
	const [output, setOutput] = useState("");

	const ejecutarCodigo = () => {
		alert("Hola mundo JS");
		setOutput('Se mostró el mensaje "Hola mundo JS" en una ventana emergente');
		setEjecutado(true);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.1: Hola Mundo JS</h2>
				<p className="enunciado">Mostrar el mensaje 'Hola mundo JS' en una ventana emergente.</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`alert('Hola mundo JS');`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarCodigo}
					disabled={ejecutado}
					className="ejecutar-btn">
					Ejecutar código
				</button>
				<button
					onClick={() => setEjecutado(false)}
					className="reset-btn">
					Reiniciar
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Salida:</h3>
					<p>{output}</p>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Función alert() para mostrar mensajes emergentes</li>
					<li>Strings en JavaScript</li>
					<li>Interacción básica con el usuario</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej01;
