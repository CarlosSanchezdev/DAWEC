/**
 * @fileoverview Ejercicio 2.2 - Script Externo
 * @version 1.0
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function Ej02
 * @description Ejemplo de script externo
 */
function Ej02() {
	const [output, setOutput] = useState("");

	const mostrarInfo = () => {
		const info = `
Se ha creado un archivo externo 'script.js' con el siguiente contenido:

// script.js
alert('Hola mundo JS desde archivo externo');

Y se ha vinculado al HTML usando:
<script src="script.js"></script>
        `;
		setOutput(info);
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.2: Script Externo</h2>
				<p className="enunciado">
					Realizar el mismo ejercicio anterior, pero haciendo una llamada a un archivo .js externo.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// index.html
<!DOCTYPE html>
<html>
<head>
    <title>Script Externo</title>
</head>
<body>
    <script src="script.js"></script>
</body>
</html>

// script.js
alert('Hola mundo JS desde archivo externo');`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={mostrarInfo}
					className="ejecutar-btn">
					Ver solución
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Explicación:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Separación de código JavaScript en archivos externos</li>
					<li>Etiqueta script y atributo src</li>
					<li>Organización y estructura de archivos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej02;
