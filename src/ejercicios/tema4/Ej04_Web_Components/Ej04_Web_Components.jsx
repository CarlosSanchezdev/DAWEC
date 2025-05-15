/**
 * @fileoverview Ejercicio sobre Web Components y Shadow DOM
 * @ejercicio EJ04
 * @tema Tema 4 - Modelo de Objetos del Documento (DOM)
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej04_Web_Components.css";

/**
 * @function Ej04_Web_Components
 * @description Componente que demuestra el uso de Web Components y Shadow DOM
 * @returns {JSX.Element} Componente con ejemplos de Web Components
 */
function Ej04_Web_Components() {
	// ===== ESTADOS =====
	const [consoleOutput, setConsoleOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("custom");

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploCustomElements = () => {
		clearConsole();

		addToConsole("// Definición de Custom Elements:");
		addToConsole(`
// Crear un nuevo elemento personalizado
class MiElemento extends HTMLElement {
    constructor() {
        super();
        
        // Inicialización del elemento
        this.innerHTML = '<p>Mi Elemento Personalizado</p>';
    }
    
    // Ciclo de vida del elemento
    connectedCallback() {
        console.log('Elemento añadido al DOM');
    }
    
    disconnectedCallback() {
        console.log('Elemento eliminado del DOM');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(\`Atributo \${name} cambió de \${oldValue} a \${newValue}\`);
    }
}

// Registrar el elemento personalizado
customElements.define('mi-elemento', MiElemento);

// Uso del elemento
document.body.innerHTML = '<mi-elemento></mi-elemento>';
`);
	};

	const ejemploShadowDOM = () => {
		clearConsole();

		addToConsole("// Trabajo con Shadow DOM:");
		addToConsole(`
// Crear y adjuntar Shadow DOM
class ComponenteEncapsulado extends HTMLElement {
    constructor() {
        super();
        
        // Crear Shadow DOM
        const shadow = this.attachShadow({mode: 'open'});
        
        // Crear elementos
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        
        const estilos = document.createElement('style');
        estilos.textContent = \`
            .wrapper {
                padding: 10px;
                background: #f0f0f0;
            }
        \`;
        
        // Añadir al Shadow DOM
        shadow.appendChild(estilos);
        shadow.appendChild(wrapper);
    }
}

customElements.define('componente-encapsulado', ComponenteEncapsulado);
`);

		addToConsole("\n// Acceso al Shadow DOM:");
		addToConsole(`
// Obtener el Shadow Root
const shadow = elemento.shadowRoot;

// Buscar elementos en el Shadow DOM
const elementos = shadow.querySelectorAll('.clase');

// Eventos en el Shadow DOM
shadow.addEventListener('click', (e) => {
    console.log('Click en Shadow DOM');
});
`);
	};

	const ejemploTemplates = () => {
		clearConsole();

		addToConsole("// Uso de Templates y Slots:");
		addToConsole(`
// Definir un template
const template = document.createElement('template');
template.innerHTML = \`
    <style>
        .container {
            border: 1px solid #ccc;
            padding: 10px;
        }
    </style>
    <div class="container">
        <header>
            <slot name="titulo">Título por defecto</slot>
        </header>
        <main>
            <slot>Contenido por defecto</slot>
        </main>
    </div>
\`;

// Usar el template en un componente
class ComponenteTemplate extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('componente-template', ComponenteTemplate);
`);

		addToConsole("\n// Uso del componente con slots:");
		addToConsole(`
<componente-template>
    <h2 slot="titulo">Mi Título Personalizado</h2>
    <p>Este contenido irá en el slot por defecto</p>
</componente-template>
`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 4: Web Components y Shadow DOM</h2>

			<div className="tabs">
				<button
					className={activeTab === "custom" ? "active" : ""}
					onClick={() => {
						setActiveTab("custom");
						ejemploCustomElements();
					}}>
					Custom Elements
				</button>
				<button
					className={activeTab === "shadow" ? "active" : ""}
					onClick={() => {
						setActiveTab("shadow");
						ejemploShadowDOM();
					}}>
					Shadow DOM
				</button>
				<button
					className={activeTab === "templates" ? "active" : ""}
					onClick={() => {
						setActiveTab("templates");
						ejemploTemplates();
					}}>
					Templates y Slots
				</button>
			</div>

			<div className="content-section">
				{activeTab === "custom" && (
					<div className="tab-content">
						<h3>Custom Elements</h3>
						<p>Los Custom Elements permiten crear elementos HTML personalizados:</p>
						<ul>
							<li>Definición de nuevos elementos HTML</li>
							<li>Ciclo de vida de los componentes</li>
							<li>Gestión de atributos personalizados</li>
							<li>Extensión de elementos HTML existentes</li>
						</ul>
					</div>
				)}

				{activeTab === "shadow" && (
					<div className="tab-content">
						<h3>Shadow DOM</h3>
						<p>El Shadow DOM proporciona encapsulación para Web Components:</p>
						<ul>
							<li>Árbol DOM encapsulado y aislado</li>
							<li>Estilos CSS encapsulados</li>
							<li>Aislamiento del DOM principal</li>
							<li>Gestión de eventos en el Shadow DOM</li>
						</ul>
					</div>
				)}

				{activeTab === "templates" && (
					<div className="tab-content">
						<h3>Templates y Slots</h3>
						<p>Los templates y slots permiten crear componentes reutilizables:</p>
						<ul>
							<li>Definición de plantillas HTML</li>
							<li>Uso de slots para contenido personalizable</li>
							<li>Slots con nombre para múltiples puntos de inserción</li>
							<li>Contenido por defecto en slots</li>
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

export default Ej04_Web_Components;
