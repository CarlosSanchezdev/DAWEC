/**
 * @fileoverview Ejercicio 2.14 - Objetos Literales
 * @ejercicio 2.14
 * @tema Objetos
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function trabajarConObjetos
 * @description Demuestra diferentes operaciones con objetos literales
 * @returns {string[]} Array con los resultados de las operaciones
 */
const trabajarConObjetos = () => {
	const resultados = [];

	// Creación de objetos
	const persona = {
		nombre: "Ana",
		edad: 25,
		profesion: "desarrolladora",
		saludar() {
			return `Hola, soy ${this.nombre}`;
		},
	};

	resultados.push("// Objeto básico:");
	resultados.push(JSON.stringify(persona, null, 2));

	// Acceso a propiedades
	resultados.push("\n// Acceso a propiedades:");
	resultados.push(`Notación punto: ${persona.nombre}`);
	resultados.push(`Notación corchetes: ${persona["edad"]}`);
	resultados.push(`Método: ${persona.saludar()}`);

	// Object.keys, values y entries
	resultados.push("\n// Métodos de Object:");
	resultados.push(`Object.keys(): ${Object.keys(persona)}`);
	resultados.push(`Object.values(): ${Object.values(persona)}`);
	resultados.push(`Object.entries(): ${JSON.stringify(Object.entries(persona))}`);

	// Modificación de objetos
	resultados.push("\n// Modificación de objetos:");
	persona.ciudad = "Madrid";
	delete persona.profesion;
	resultados.push(JSON.stringify(persona, null, 2));

	// Fusión de objetos
	const infoAdicional = {
		hobbies: ["lectura", "viajes"],
		experiencia: 3,
	};

	const personaCompleta = { ...persona, ...infoAdicional };
	resultados.push("\n// Fusión de objetos con spread:");
	resultados.push(JSON.stringify(personaCompleta, null, 2));

	// Comprobación de propiedades
	resultados.push("\n// Comprobación de propiedades:");
	resultados.push(`hasOwnProperty("nombre"): ${Object.prototype.hasOwnProperty.call(persona, "nombre")}`);
	resultados.push(`"ciudad" in persona: ${"ciudad" in persona}`);
	resultados.push(`Propiedad indefinida: ${persona.propiedadInexistente}`);

	return resultados;
};

/**
 * @function Ej14
 * @description Componente que demuestra el uso de objetos literales en JavaScript
 */
function Ej14() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = trabajarConObjetos();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.14: Objetos Literales</h2>
				<p className="enunciado">
					Exploración de objetos literales en JavaScript: creación, acceso a propiedades, métodos,
					modificación y operaciones comunes.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Creación de objeto literal
const persona = {
    nombre: "Ana",
    edad: 25,
    profesion: "desarrolladora",
    saludar() {
        return \`Hola, soy \${this.nombre}\`;
    }
};

// Acceso a propiedades
persona.nombre;          // Notación punto
persona["edad"];        // Notación corchetes
persona.saludar();      // Llamada a método

// Métodos de Object
Object.keys(persona);    // Array de claves
Object.values(persona);  // Array de valores
Object.entries(persona); // Array de pares [clave, valor]

// Modificación
persona.ciudad = "Madrid";    // Añadir propiedad
delete persona.profesion;     // Eliminar propiedad

// Fusión de objetos
const infoAdicional = {
    hobbies: ["lectura", "viajes"],
    experiencia: 3
};
const personaCompleta = { ...persona, ...infoAdicional };

// Comprobación de propiedades
persona.hasOwnProperty("nombre");  // true
"ciudad" in persona;               // true
persona.propiedadInexistente;      // undefined`}</code>
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
					<li>Creación y sintaxis de objetos literales</li>
					<li>Acceso y modificación de propiedades</li>
					<li>Métodos en objetos</li>
					<li>Métodos estáticos de Object</li>
					<li>Operador spread con objetos</li>
					<li>Comprobación de propiedades</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej14;
