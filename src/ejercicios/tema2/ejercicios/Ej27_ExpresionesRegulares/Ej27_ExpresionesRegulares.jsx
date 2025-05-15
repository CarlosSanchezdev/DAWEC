/**
 * @fileoverview Ejercicio 2.27 - Expresiones Regulares
 * @ejercicio 2.27
 * @tema Regexp
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarRegexp
 * @description Ejemplifica el uso de expresiones regulares en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarRegexp = () => {
	const resultados = [];

	// Regexp básica
	resultados.push("// Regexp básica (test):");
	const texto = "Hola Mundo 2025";
	const patron = /\d{4}/;
	resultados.push(`Texto: "${texto}"`);
	resultados.push(`¿Contiene 4 dígitos? ${patron.test(texto)}`);

	// Match con grupos
	resultados.push("\n// Match con grupos:");
	const fecha = "2025-05-14";
	const regexFecha = /(\d{4})-(\d{2})-(\d{2})/;
	const [match, año, mes, dia] = fecha.match(regexFecha) || [];
	resultados.push(`Fecha completa: ${match}`);
	resultados.push(`Año: ${año}, Mes: ${mes}, Día: ${dia}`);

	// Replace
	resultados.push("\n// Replace:");
	const frase = "gato perro gato";
	const reemplazado = frase.replace(/gato/g, "felino");
	resultados.push(`Original: "${frase}"`);
	resultados.push(`Reemplazado: "${reemplazado}"`);

	// Validación de email
	resultados.push("\n// Validación de email:");
	const emails = ["usuario@dominio.com", "invalido@.com", "usuario.nombre@subdominio.dominio.es"];
	const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	emails.forEach((email) => {
		resultados.push(`${email}: ${regexEmail.test(email)}`);
	});

	// Búsqueda con grupos nombrados
	resultados.push("\n// Búsqueda con grupos nombrados:");
	const url = "https://www.ejemplo.com/ruta?param=valor";
	const regexUrl = /^(?<protocolo>https?):\/\/(?<dominio>[\w.-]+)(?<ruta>\/\S*)?$/;
	const matchUrl = url.match(regexUrl);
	if (matchUrl?.groups) {
		const { protocolo, dominio, ruta } = matchUrl.groups;
		resultados.push(`Protocolo: ${protocolo}`);
		resultados.push(`Dominio: ${dominio}`);
		resultados.push(`Ruta: ${ruta}`);
	}

	// Expresiones con flags
	resultados.push("\n// Expresiones con flags:");
	const textoMultilinea = `Línea 1
    LÍNEA 2
    línea 3`;
	const regexLinea = /^línea \d/gim;
	let coincidencia;
	while ((coincidencia = regexLinea.exec(textoMultilinea)) !== null) {
		resultados.push(`Encontrado: ${coincidencia[0]}`);
	}

	// Lookahead y lookbehind
	resultados.push("\n// Lookahead y lookbehind:");
	const precio = "100€ 200$ 300€";
	const regexEuros = /\d+(?=€)/g;
	const euros = precio.match(regexEuros);
	resultados.push(`Precios en euros: ${euros?.join(", ")}`);

	return resultados;
};

/**
 * @function Ej27
 * @description Componente que demuestra el uso de expresiones regulares en JavaScript
 */
function Ej27() {
	const [output, setOutput] = useState("");
	const [textoInput, setTextoInput] = useState("");
	const [patron, setPatron] = useState("");
	const [resultado, setResultado] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarRegexp();
		setOutput(resultados.join("\n"));
	};

	const probarRegexp = () => {
		try {
			const regex = new RegExp(patron);
			const coincide = regex.test(textoInput);
			const coincidencias = textoInput.match(regex);
			setResultado(`Coincide: ${coincide}\nCoincidencias: ${JSON.stringify(coincidencias)}`);
		} catch (error) {
			setResultado(`Error: ${error.message}`);
		}
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.27: Expresiones Regulares</h2>
				<p className="enunciado">
					Exploración de expresiones regulares en JavaScript: patrones, búsqueda, reemplazo y validación.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Test básico
const patron = /\\d{4}/;
patron.test("Año 2025");  // true

// Match con grupos
"2025-05-14".match(/(\\d{4})-(\\d{2})-(\\d{2})/);

// Replace
"gato perro gato".replace(/gato/g, "felino");

// Validación de email
/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

// Grupos nombrados
/^(?<protocolo>https?):\\/\\/(?<dominio>[\\w.-]+)/

// Lookahead y lookbehind
/\\d+(?=€)/  // Números seguidos de €
/(?<=\\$)\\d+/  // Números precedidos de $`}</code>
				</pre>
			</div>

			<div className="regexp-tester">
				<h3>Probador de expresiones regulares</h3>
				<div className="input-group">
					<input
						type="text"
						placeholder="Ingresa texto"
						value={textoInput}
						onChange={(e) => setTextoInput(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Ingresa patrón regexp"
						value={patron}
						onChange={(e) => setPatron(e.target.value)}
					/>
					<button onClick={probarRegexp}>Probar</button>
				</div>
				{resultado && <pre className="regexp-result">{resultado}</pre>}
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
					<li>Patrones básicos</li>
					<li>Grupos de captura</li>
					<li>Grupos nombrados</li>
					<li>Flags (g, i, m)</li>
					<li>Métodos test, match, replace</li>
					<li>Lookahead y lookbehind</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej27;
