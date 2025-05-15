/**
 * @fileoverview Ejercicio sobre los conceptos básicos del DOM
 * @ejercicio EJ01
 * @tema Tema 4 - Modelo de Objetos del Documento (DOM)
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej01_Intro_DOM.css";

/**
 * @function Ej01_Intro_DOM
 * @description Componente que demuestra los conceptos básicos del DOM y su estructura
 * @returns {JSX.Element} Componente con ejemplos de manipulación básica del DOM
 */
function Ej01_Intro_DOM() {
	// ===== ESTADOS =====
	const [activeTab, setActiveTab] = useState("estructura");
	const [consoleOutput, setConsoleOutput] = useState([]);

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploEstructuraDOM = () => {
		clearConsole();

		// Ejemplo de navegación básica del DOM
		addToConsole("// Estructura básica del DOM:");
		addToConsole(`
document.documentElement              // <html>
document.documentElement.childNodes   // [head, text, body]
document.body                        // <body>
document.head                        // <head>
`);

		addToConsole("\n// Ejemplo de propiedades y métodos del DOM:");
		addToConsole(`
document.title                      // Título del documento
document.URL                        // URL del documento
document.domain                     // Dominio del documento
document.documentElement.nodeName   // 'HTML'
document.body.nodeName             // 'BODY'
`);
	};

	const ejemploAccesoElementos = () => {
		clearConsole();

		// Ejemplo de diferentes formas de acceder a elementos
		addToConsole("// Métodos para acceder a elementos:");
		addToConsole(`
// Por ID
document.getElementById('miElemento')

// Por clase
document.getElementsByClassName('miClase')

// Por etiqueta
document.getElementsByTagName('div')

// Por selector CSS
document.querySelector('.clase')
document.querySelectorAll('.clase')
`);

		addToConsole("\n// Navegación entre nodos:");
		addToConsole(`
elemento.parentNode         // Nodo padre
elemento.childNodes        // Nodos hijos
elemento.firstChild        // Primer hijo
elemento.lastChild         // Último hijo
elemento.nextSibling      // Siguiente hermano
elemento.previousSibling  // Hermano anterior
`);
	};

	const ejemploTiposNodos = () => {
		clearConsole();

		// Ejemplo de tipos de nodos
		addToConsole("// Tipos de nodos en el DOM:");
		addToConsole(`
Node.ELEMENT_NODE (1)               // <p>, <div>, etc.
Node.ATTRIBUTE_NODE (2)             // class="miClase"
Node.TEXT_NODE (3)                  // Texto dentro de elementos
Node.COMMENT_NODE (8)               // <!-- comentario -->
Node.DOCUMENT_NODE (9)              // Documento raíz
Node.DOCUMENT_TYPE_NODE (10)        // <!DOCTYPE html>
`);

		addToConsole("\n// Ejemplo de comprobación de tipo de nodo:");
		addToConsole(`
function getTipoNodo(elemento) {
    switch(elemento.nodeType) {
        case Node.ELEMENT_NODE:
            return 'Elemento';
        case Node.TEXT_NODE:
            return 'Texto';
        case Node.COMMENT_NODE:
            return 'Comentario';
        default:
            return 'Otro tipo';
    }
}`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 1: Introducción al DOM</h2>

			<div className="tabs">
				<button
					className={activeTab === "estructura" ? "active" : ""}
					onClick={() => {
						setActiveTab("estructura");
						ejemploEstructuraDOM();
					}}>
					Estructura del DOM
				</button>
				<button
					className={activeTab === "elementos" ? "active" : ""}
					onClick={() => {
						setActiveTab("elementos");
						ejemploAccesoElementos();
					}}>
					Acceso a Elementos
				</button>
				<button
					className={activeTab === "nodos" ? "active" : ""}
					onClick={() => {
						setActiveTab("nodos");
						ejemploTiposNodos();
					}}>
					Tipos de Nodos
				</button>
			</div>

			<div className="content-section">
				{activeTab === "estructura" && (
					<div className="tab-content">
						<h3>Estructura del DOM</h3>
						<p>
							El DOM (Document Object Model) representa el documento HTML como una estructura de árbol
							jerárquica:
						</p>
						<ul>
							<li>El documento es el nodo raíz</li>
							<li>Cada elemento HTML es un nodo</li>
							<li>Los atributos y el texto son nodos</li>
							<li>Estructura jerárquica padre-hijo</li>
						</ul>
					</div>
				)}

				{activeTab === "elementos" && (
					<div className="tab-content">
						<h3>Acceso a Elementos</h3>
						<p>El DOM proporciona varios métodos para acceder a los elementos:</p>
						<ul>
							<li>Métodos de selección directa (getElementById)</li>
							<li>Métodos de selección múltiple (getElementsByClassName)</li>
							<li>Selectores CSS modernos (querySelector)</li>
							<li>Navegación entre nodos relacionados</li>
						</ul>
					</div>
				)}

				{activeTab === "nodos" && (
					<div className="tab-content">
						<h3>Tipos de Nodos</h3>
						<p>El DOM está compuesto por diferentes tipos de nodos:</p>
						<ul>
							<li>Nodos de elemento (Element Node)</li>
							<li>Nodos de atributo (Attribute Node)</li>
							<li>Nodos de texto (Text Node)</li>
							<li>Nodos de documento (Document Node)</li>
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

export default Ej01_Intro_DOM;
