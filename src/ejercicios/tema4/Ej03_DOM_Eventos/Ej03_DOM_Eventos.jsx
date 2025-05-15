/**
 * @fileoverview Ejercicio sobre eventos y manipulación dinámica del DOM
 * @ejercicio EJ03
 * @tema Tema 4 - Modelo de Objetos del Documento (DOM)
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej03_DOM_Eventos.css";

/**
 * @function Ej03_DOM_Eventos
 * @description Componente que demuestra el manejo de eventos y manipulación dinámica del DOM
 * @returns {JSX.Element} Componente con ejemplos de eventos y manipulación dinámica
 */
function Ej03_DOM_Eventos() {
	// ===== ESTADOS =====
	const [consoleOutput, setConsoleOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("eventos");

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploEventos = () => {
		clearConsole();

		addToConsole("// Gestión de eventos básicos:");
		addToConsole(`
// Añadir evento con addEventListener
elemento.addEventListener('click', (event) => {
    console.log('Click detectado');
    event.preventDefault();  // Prevenir comportamiento por defecto
});

// Eliminar evento
const handler = (event) => console.log('Evento');
elemento.addEventListener('click', handler);
elemento.removeEventListener('click', handler);

// Tipos comunes de eventos
elemento.onclick = () => console.log('Click');
elemento.onmouseover = () => console.log('Mouse sobre elemento');
elemento.onkeydown = (e) => console.log('Tecla:', e.key);
`);

		addToConsole("\n// Propiedades del objeto Event:");
		addToConsole(`
event.target          // Elemento que disparó el evento
event.currentTarget   // Elemento al que está adjunto el listener
event.type           // Tipo de evento ('click', 'mouseover', etc.)
event.clientX        // Posición X del cursor
event.clientY        // Posición Y del cursor
event.key            // Tecla presionada (eventos de teclado)
event.preventDefault()// Prevenir acción por defecto
event.stopPropagation()// Detener propagación del evento
`);
	};

	const ejemploPropagacion = () => {
		clearConsole();

		addToConsole("// Propagación de eventos (Event Bubbling):");
		addToConsole(`
// Fase de captura (capture phase)
elemento.addEventListener('click', (e) => {
    console.log('Captura:', e.target);
}, true);

// Fase de burbujeo (bubbling phase)
elemento.addEventListener('click', (e) => {
    console.log('Burbujeo:', e.target);
}, false);  // false es el valor por defecto

// Detener la propagación
elemento.addEventListener('click', (e) => {
    e.stopPropagation();  // El evento no sigue propagándose
    console.log('Evento detenido');
});
`);

		addToConsole("\n// Delegación de eventos:");
		addToConsole(`
// En lugar de agregar listeners a cada elemento
document.getElementById('lista').addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        console.log('Click en elemento de lista:', e.target.textContent);
    }
});
`);
	};

	const ejemploManipulacionDinamica = () => {
		clearConsole();

		addToConsole("// Manipulación dinámica del DOM:");
		addToConsole(`
// Modificar elementos en respuesta a eventos
document.getElementById('boton').onclick = () => {
    const nuevoElemento = document.createElement('div');
    nuevoElemento.textContent = 'Creado dinámicamente';
    document.body.appendChild(nuevoElemento);
};

// Animaciones basadas en eventos
elemento.addEventListener('mouseover', () => {
    elemento.style.transition = 'all 0.3s';
    elemento.style.transform = 'scale(1.1)';
});

elemento.addEventListener('mouseout', () => {
    elemento.style.transform = 'scale(1)';
});

// Modificación de contenido basada en eventos
document.getElementById('input').addEventListener('input', (e) => {
    document.getElementById('output').textContent = e.target.value;
});
`);

		addToConsole("\n// Observación de cambios en el DOM:");
		addToConsole(`
// Usar MutationObserver
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log('Cambio detectado:', mutation.type);
    });
});

observer.observe(elemento, {
    attributes: true,    // Observar cambios en atributos
    childList: true,     // Observar cambios en hijos
    subtree: true       // Observar cambios en descendientes
});
`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 3: Eventos y Manipulación Dinámica</h2>

			<div className="tabs">
				<button
					className={activeTab === "eventos" ? "active" : ""}
					onClick={() => {
						setActiveTab("eventos");
						ejemploEventos();
					}}>
					Gestión de Eventos
				</button>
				<button
					className={activeTab === "propagacion" ? "active" : ""}
					onClick={() => {
						setActiveTab("propagacion");
						ejemploPropagacion();
					}}>
					Propagación y Delegación
				</button>
				<button
					className={activeTab === "manipulacion" ? "active" : ""}
					onClick={() => {
						setActiveTab("manipulacion");
						ejemploManipulacionDinamica();
					}}>
					Manipulación Dinámica
				</button>
			</div>

			<div className="content-section">
				{activeTab === "eventos" && (
					<div className="tab-content">
						<h3>Gestión de Eventos</h3>
						<p>El DOM proporciona un sistema completo para manejar eventos:</p>
						<ul>
							<li>Eventos de ratón (click, mouseover, mouseout)</li>
							<li>Eventos de teclado (keydown, keyup, keypress)</li>
							<li>Eventos de formulario (submit, input, change)</li>
							<li>Eventos del documento (DOMContentLoaded, load)</li>
						</ul>
					</div>
				)}

				{activeTab === "propagacion" && (
					<div className="tab-content">
						<h3>Propagación y Delegación</h3>
						<p>Los eventos en el DOM siguen un modelo de propagación:</p>
						<ul>
							<li>Fase de captura (desde el documento hacia el objetivo)</li>
							<li>Fase de objetivo (el elemento que disparó el evento)</li>
							<li>Fase de burbujeo (desde el objetivo hacia el documento)</li>
							<li>Delegación de eventos para eficiencia</li>
						</ul>
					</div>
				)}

				{activeTab === "manipulacion" && (
					<div className="tab-content">
						<h3>Manipulación Dinámica</h3>
						<p>El DOM permite modificar el documento en respuesta a eventos:</p>
						<ul>
							<li>Creación y eliminación dinámica de elementos</li>
							<li>Modificación de contenido basada en eventos</li>
							<li>Animaciones y transiciones</li>
							<li>Observación de cambios en el DOM</li>
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

export default Ej03_DOM_Eventos;
