/**
 * @fileoverview Ejercicio sobre Programación Orientada a Objetos en JavaScript
 * @ejercicio EJ03
 * @tema Tema 3 - JavaScript Arrays, Funciones y Objetos
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej03_POO.css";

/**
 * @function Ej03_POO
 * @description Componente que demuestra conceptos de POO en JavaScript
 * @returns {JSX.Element} Componente con ejemplos de clases, objetos, herencia y prototipos
 */
function Ej03_POO() {
	// ===== ESTADOS =====
	const [activeTab, setActiveTab] = useState("clases");
	const [consoleOutput, setConsoleOutput] = useState([]);

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploClasesYObjetos = () => {
		clearConsole();

		// Ejemplo de clase básica
		class Persona {
			constructor(nombre, edad) {
				this.nombre = nombre;
				this.edad = edad;
			}

			saludar() {
				return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
			}
		}

		const persona = new Persona("Ana", 25);
		addToConsole("// Definición de clase básica:");
		addToConsole(`
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return \`Hola, soy \${this.nombre} y tengo \${this.edad} años\`;
    }
}`);
		addToConsole("\n// Creación de objeto:");
		addToConsole('const persona = new Persona("Ana", 25);');
		addToConsole(`persona.saludar() → "${persona.saludar()}"`);
	};

	const ejemploHerencia = () => {
		clearConsole();

		// Ejemplo de herencia
		class Animal {
			constructor(nombre) {
				this.nombre = nombre;
			}

			hablar() {
				return `${this.nombre} hace algún sonido`;
			}
		}

		class Perro extends Animal {
			hablar() {
				return `${this.nombre} dice guau!`;
			}
		}

		const perro = new Perro("Rex");
		addToConsole("// Ejemplo de herencia:");
		addToConsole(`
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    hablar() {
        return \`\${this.nombre} hace algún sonido\`;
    }
}

class Perro extends Animal {
    hablar() {
        return \`\${this.nombre} dice guau!\`;
    }
}`);
		addToConsole("\n// Uso de herencia:");
		addToConsole('const perro = new Perro("Rex");');
		addToConsole(`perro.hablar() → "${perro.hablar()}"`);
	};

	const ejemploPrototipos = () => {
		clearConsole();

		// Ejemplo de prototipos
		function Usuario(nombre) {
			this.nombre = nombre;
		}

		Usuario.prototype.saludar = function () {
			return `¡Hola ${this.nombre}!`;
		};

		const usuario = new Usuario("Carlos");
		addToConsole("// Ejemplo de prototipos:");
		addToConsole(`
function Usuario(nombre) {
    this.nombre = nombre;
}

Usuario.prototype.saludar = function() {
    return \`¡Hola \${this.nombre}!\`;
};`);
		addToConsole("\n// Uso de prototipos:");
		addToConsole('const usuario = new Usuario("Carlos");');
		addToConsole(`usuario.saludar() → "${usuario.saludar()}"`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 3: Programación Orientada a Objetos</h2>

			<div className="tabs">
				<button
					className={activeTab === "clases" ? "active" : ""}
					onClick={() => {
						setActiveTab("clases");
						ejemploClasesYObjetos();
					}}>
					Clases y Objetos
				</button>
				<button
					className={activeTab === "herencia" ? "active" : ""}
					onClick={() => {
						setActiveTab("herencia");
						ejemploHerencia();
					}}>
					Herencia
				</button>
				<button
					className={activeTab === "prototipos" ? "active" : ""}
					onClick={() => {
						setActiveTab("prototipos");
						ejemploPrototipos();
					}}>
					Prototipos
				</button>
			</div>

			<div className="content-section">
				{activeTab === "clases" && (
					<div className="tab-content">
						<h3>Clases y Objetos</h3>
						<p>
							Las clases en JavaScript son una mejora sintáctica sobre la herencia basada en prototipos:
						</p>
						<ul>
							<li>
								Definición de clases con la palabra clave <code>class</code>
							</li>
							<li>Constructor para inicializar propiedades</li>
							<li>Métodos para definir comportamiento</li>
							<li>Encapsulamiento de datos y funcionalidad</li>
						</ul>
					</div>
				)}

				{activeTab === "herencia" && (
					<div className="tab-content">
						<h3>Herencia</h3>
						<p>La herencia permite crear nuevas clases basadas en otras existentes:</p>
						<ul>
							<li>
								Uso de <code>extends</code> para heredar
							</li>
							<li>Sobrescritura de métodos</li>
							<li>
								Uso de <code>super</code> para acceder a la clase padre
							</li>
							<li>Reutilización de código</li>
						</ul>
					</div>
				)}

				{activeTab === "prototipos" && (
					<div className="tab-content">
						<h3>Prototipos</h3>
						<p>
							Los prototipos son el mecanismo por el cual los objetos JavaScript heredan características:
						</p>
						<ul>
							<li>Cadena de prototipos</li>
							<li>Herencia basada en prototipos</li>
							<li>Modificación del prototipo</li>
							<li>Compartir métodos entre instancias</li>
						</ul>
					</div>
				)}
			</div>

			<div className="console-section">
				<h3>Consola:</h3>
				<div className="console">
					{consoleOutput.map((output, index) => (
						<div
							key={index}
							className="console-line">
							{output}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Ej03_POO;
