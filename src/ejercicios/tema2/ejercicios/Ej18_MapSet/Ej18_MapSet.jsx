/**
 * @fileoverview Ejercicio 2.18 - Map y Set
 * @ejercicio 2.18
 * @tema Estructuras de datos
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarMapSet
 * @description Ejemplifica el uso de Map y Set en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarMapSet = () => {
	const resultados = [];

	// Map básico
	resultados.push("// Map básico:");
	const frutas = new Map();
	frutas.set("manzana", 1);
	frutas.set("plátano", 2);
	frutas.set("naranja", 3);

	resultados.push("Map creado con:");
	resultados.push("frutas.set('manzana', 1)");
	resultados.push("frutas.set('plátano', 2)");
	resultados.push("frutas.set('naranja', 3)");
	resultados.push(`\nfrutas.get('manzana'): ${frutas.get("manzana")}`);
	resultados.push(`frutas.has('plátano'): ${frutas.has("plátano")}`);
	resultados.push(`frutas.size: ${frutas.size}`);

	// Iteración en Map
	resultados.push("\n// Iteración en Map:");
	resultados.push("for...of con entries():");
	for (const [fruta, cantidad] of frutas.entries()) {
		resultados.push(`${fruta}: ${cantidad}`);
	}

	// Objetos como claves en Map
	resultados.push("\n// Objetos como claves en Map:");
	const objMap = new Map();
	const obj1 = { id: 1 };
	const obj2 = { id: 2 };

	objMap.set(obj1, "valor1");
	objMap.set(obj2, "valor2");

	resultados.push(`objMap.get(obj1): ${objMap.get(obj1)}`);
	resultados.push(`objMap.size: ${objMap.size}`);

	// Set básico
	resultados.push("\n// Set básico:");
	const numeros = new Set([1, 2, 2, 3, 3, 4]);
	resultados.push("Set creado con: new Set([1, 2, 2, 3, 3, 4])");
	resultados.push(`numeros.size: ${numeros.size}`);
	resultados.push(`Valores únicos: ${[...numeros].join(", ")}`);

	// Operaciones con Set
	resultados.push("\n// Operaciones con Set:");
	numeros.add(5);
	resultados.push(`Después de add(5): ${[...numeros].join(", ")}`);
	numeros.delete(2);
	resultados.push(`Después de delete(2): ${[...numeros].join(", ")}`);
	resultados.push(`has(3): ${numeros.has(3)}`);

	// Casos de uso prácticos
	resultados.push("\n// Casos de uso prácticos:");

	// Eliminar duplicados de un array
	const arrayConDuplicados = [1, 2, 2, 3, 3, 4, 4, 5];
	const arrayUnico = [...new Set(arrayConDuplicados)];
	resultados.push("// Eliminar duplicados:");
	resultados.push(`Original: ${arrayConDuplicados}`);
	resultados.push(`Sin duplicados: ${arrayUnico}`);

	// Intersección de conjuntos
	const set1 = new Set([1, 2, 3, 4]);
	const set2 = new Set([3, 4, 5, 6]);
	const interseccion = [...set1].filter((x) => set2.has(x));
	resultados.push("\n// Intersección de conjuntos:");
	resultados.push(`Set1: ${[...set1]}`);
	resultados.push(`Set2: ${[...set2]}`);
	resultados.push(`Intersección: ${interseccion}`);

	return resultados;
};

/**
 * @function Ej18
 * @description Componente que demuestra el uso de Map y Set en JavaScript
 */
function Ej18() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarMapSet();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.18: Map y Set</h2>
				<p className="enunciado">
					Exploración de las estructuras de datos Map y Set en JavaScript: creación, manipulación y casos de
					uso comunes.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Map
const frutas = new Map();
frutas.set('manzana', 1);
frutas.get('manzana');     // 1
frutas.has('plátano');     // false
frutas.size;               // 1

// Iteración en Map
for (const [key, value] of frutas) {
    console.log(\`\${key}: \${value}\`);
}

// Objetos como claves
const objMap = new Map();
const obj1 = { id: 1 };
objMap.set(obj1, 'valor1');

// Set
const numeros = new Set([1, 2, 2, 3]);
numeros.add(4);           // Añade 4
numeros.delete(2);        // Elimina 2
numeros.has(3);          // true
numeros.size;            // 3

// Casos prácticos
// Eliminar duplicados
const unicos = [...new Set(arrayConDuplicados)];

// Intersección de conjuntos
const interseccion = [...set1].filter(x => set2.has(x));`}</code>
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
					<li>Estructura Map y sus métodos</li>
					<li>Estructura Set y sus métodos</li>
					<li>Iteración sobre Map y Set</li>
					<li>Objetos como claves en Map</li>
					<li>Eliminación de duplicados con Set</li>
					<li>Operaciones de conjuntos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej18;
