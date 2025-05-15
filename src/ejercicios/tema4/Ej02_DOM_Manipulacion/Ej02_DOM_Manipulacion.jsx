/**
 * @fileoverview Ejercicio sobre manipulación de elementos del DOM
 * @ejercicio EJ02
 * @tema Tema 4 - Modelo de Objetos del Documento (DOM)
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej02_DOM_Manipulacion.css";

/**
 * @function Ej02_DOM_Manipulacion
 * @description Componente que demuestra la manipulación de elementos del DOM
 * @returns {JSX.Element} Componente con ejemplos de manipulación del DOM
 */
function Ej02_DOM_Manipulacion() {
	// ===== ESTADOS =====
	const [consoleOutput, setConsoleOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("atributos");

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploAtributos = () => {
		clearConsole();

		addToConsole("// Manipulación de atributos del DOM:");
		addToConsole(`
elemento.getAttribute('id')           // Obtener valor de atributo
elemento.setAttribute('class', 'new') // Establecer valor de atributo
elemento.hasAttribute('data-value')  // Comprobar si existe atributo
elemento.removeAttribute('style')    // Eliminar atributo
elemento.dataset.customValue        // Acceder a data-* attributes
`);

		addToConsole("\n// Manipulación de clases CSS:");
		addToConsole(`
elemento.classList.add('nueva-clase')    // Añadir clase
elemento.classList.remove('vieja-clase') // Eliminar clase
elemento.classList.toggle('activo')      // Alternar clase
elemento.classList.contains('clase')     // Comprobar clase
`);
	};

	const ejemploContenido = () => {
		clearConsole();

		addToConsole("// Manipulación del contenido de elementos:");
		addToConsole(`
elemento.textContent = 'Nuevo texto'     // Modificar contenido de texto
elemento.innerHTML = '<b>HTML</b>'       // Modificar contenido HTML
elemento.innerText = 'Texto visible'     // Modificar texto visible

// Crear y añadir elementos
const nuevoDiv = document.createElement('div')
nuevoDiv.textContent = 'Nuevo elemento'
elemento.appendChild(nuevoDiv)

// Insertar elementos en posición específica
elemento.insertBefore(nuevoDiv, elementoReferencia)
elemento.insertAdjacentHTML('beforeend', '<p>Nuevo párrafo</p>')
`);
	};

	const ejemploEstilos = () => {
		clearConsole();

		addToConsole("// Manipulación de estilos CSS:");
		addToConsole(`
// Estilos directos
elemento.style.backgroundColor = 'red'
elemento.style.fontSize = '16px'
elemento.style.display = 'flex'

// Obtener estilos computados
const estilos = window.getComputedStyle(elemento)
console.log(estilos.backgroundColor)

// Modificar variables CSS
elemento.style.setProperty('--mi-variable', 'valor')
const valorVariable = elemento.style.getPropertyValue('--mi-variable')
`);

		addToConsole("\n// Manipulación de dimensiones y posición:");
		addToConsole(`
// Dimensiones del elemento
elemento.offsetWidth     // Ancho total con padding y border
elemento.offsetHeight    // Alto total con padding y border
elemento.clientWidth     // Ancho del contenido con padding
elemento.clientHeight    // Alto del contenido con padding

// Posición del elemento
elemento.getBoundingClientRect()  // Posición relativa al viewport
elemento.offsetLeft     // Posición izquierda
elemento.offsetTop      // Posición superior
`);
	};

	// ===== MANIPULACIÓN PRÁCTICA =====
	const [demoElement, setDemoElement] = useState({
		color: "black",
		fontSize: "16px",
		textContent: "Elemento de demostración",
		classes: ["demo-element"],
		customAttribute: "",
	});

	const handleStyleChange = (property, value) => {
		setDemoElement((prev) => ({
			...prev,
			[property]: value,
		}));
		addToConsole(`elemento.style.${property} = '${value}'`);
	};

	const handleClassToggle = (className) => {
		setDemoElement((prev) => ({
			...prev,
			classes: prev.classes.includes(className)
				? prev.classes.filter((c) => c !== className)
				: [...prev.classes, className],
		}));
		addToConsole(`elemento.classList.toggle('${className}')`);
	};

	const handleContentChange = (content) => {
		setDemoElement((prev) => ({
			...prev,
			textContent: content,
		}));
		addToConsole(`elemento.textContent = '${content}'`);
	};

	const handleAttributeChange = (value) => {
		setDemoElement((prev) => ({
			...prev,
			customAttribute: value,
		}));
		addToConsole(`elemento.setAttribute('data-custom', '${value}')`);
	};

	// ===== RENDERIZADO =====
	return (
		<div className="ejercicio">
			<h2>Ejercicio 2: Manipulación del DOM</h2>

			<div className="tabs">
				<button
					className={activeTab === "atributos" ? "active" : ""}
					onClick={() => {
						setActiveTab("atributos");
						ejemploAtributos();
					}}>
					Atributos
				</button>
				<button
					className={activeTab === "contenido" ? "active" : ""}
					onClick={() => {
						setActiveTab("contenido");
						ejemploContenido();
					}}>
					Contenido
				</button>
				<button
					className={activeTab === "estilos" ? "active" : ""}
					onClick={() => {
						setActiveTab("estilos");
						ejemploEstilos();
					}}>
					Estilos
				</button>
				<button
					className={activeTab === "demo" ? "active" : ""}
					onClick={() => {
						setActiveTab("demo");
						clearConsole();
					}}>
					Demostración
				</button>
			</div>

			<div className="content-area">
				{activeTab === "demo" ? (
					<div className="demo-area">
						<div
							className={demoElement.classes.join(" ")}
							style={{
								color: demoElement.color,
								fontSize: demoElement.fontSize,
							}}
							data-custom={demoElement.customAttribute}>
							{demoElement.textContent}
						</div>

						<div className="controls">
							<div className="control-group">
								<h3>Estilos</h3>
								<button
									onClick={() =>
										handleStyleChange("color", demoElement.color === "black" ? "red" : "black")
									}>
									Cambiar Color
								</button>
								<button
									onClick={() =>
										handleStyleChange("fontSize", demoElement.fontSize === "16px" ? "24px" : "16px")
									}>
									Cambiar Tamaño
								</button>
							</div>

							<div className="control-group">
								<h3>Clases</h3>
								<button onClick={() => handleClassToggle("destacado")}>Toggle Destacado</button>
								<button onClick={() => handleClassToggle("sombreado")}>Toggle Sombreado</button>
							</div>

							<div className="control-group">
								<h3>Contenido</h3>
								<button onClick={() => handleContentChange("¡Texto modificado!")}>Cambiar Texto</button>
								<button onClick={() => handleContentChange("Elemento de demostración")}>
									Restaurar Texto
								</button>
							</div>

							<div className="control-group">
								<h3>Atributos</h3>
								<button onClick={() => handleAttributeChange("valor-personalizado")}>
									Añadir Atributo
								</button>
								<button onClick={() => handleAttributeChange("")}>Eliminar Atributo</button>
							</div>
						</div>
					</div>
				) : (
					<pre className="console">
						{consoleOutput.map((line, index) => (
							<div
								key={index}
								className="console-line">
								{line}
							</div>
						))}
					</pre>
				)}
			</div>
		</div>
	);
}

export default Ej02_DOM_Manipulacion;
