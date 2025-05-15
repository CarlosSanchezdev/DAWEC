/**
 * @fileoverview Ejercicio sobre Modelo de Eventos en JavaScript y React
 * @ejercicio Ej01_Modelo_Eventos
 * @tema Tema 7: Interacción con el usuario, eventos y formularios
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej01_Modelo_Eventos.css";

/**
 * @function Ej01_Modelo_Eventos
 * @description Componente que demuestra el modelo de eventos y los manejadores en JavaScript
 * @returns {JSX.Element} Componente con ejemplos de eventos
 */
function Ej01_Modelo_Eventos() {
	// ===== HOOKS =====
	const [eventLog, setEventLog] = useState([]);
	const [captureModeEnabled, setCaptureModeEnabled] = useState(false);
	const [stopPropagationEnabled, setStopPropagationEnabled] = useState(false);
	const [closureCounter, setClosureCounter] = useState(0);
	const logContainerRef = useRef(null);

	// ===== EFECTOS =====
	// Scroll al último evento del log cuando se añade uno nuevo
	useEffect(() => {
		if (logContainerRef.current) {
			logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
		}
	}, [eventLog]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function logEvent
	 * @description Añade un evento al registro de eventos
	 * @param {string} message - Mensaje a añadir
	 * @param {string} type - Tipo de evento (normal, capture, bubble)
	 */
	const logEvent = (message, type = "normal") => {
		const timestamp = new Date().toLocaleTimeString();
		setEventLog((prev) => [...prev, { id: Date.now(), message, type, timestamp }]);
	};

	/**
	 * @function clearLog
	 * @description Limpia el registro de eventos
	 */
	const clearLog = () => {
		setEventLog([]);
	};

	/**
	 * @function handleElement
	 * @description Maneja los eventos de los elementos de demostración
	 * @param {Event} e - Evento del DOM
	 * @param {string} elementName - Nombre del elemento
	 */
	const handleElement = (e, elementName) => {
		const phase = e.eventPhase === 1 ? "CAPTURE" : e.eventPhase === 2 ? "TARGET" : "BUBBLE";

		logEvent(
			`${e.type} en ${elementName} (Fase: ${phase})`,
			phase === "CAPTURE" ? "capture" : phase === "TARGET" ? "target" : "bubble"
		);

		if (stopPropagationEnabled && phase !== "CAPTURE") {
			e.stopPropagation();
			logEvent(`Propagación detenida en ${elementName}`, "warning");
		}
	};

	// ===== CLOSURES DEMO =====
	/**
	 * @function createCounter
	 * @description Crea una función de contador usando closures
	 * @param {number} initialValue - Valor inicial del contador
	 * @returns {Function} Función que incrementa y retorna el contador
	 */
	const createCounter = (initialValue) => {
		let count = initialValue;
		return function () {
			count++;
			return count;
		};
	};

	// Crear un nuevo contador cuando cambia closureCounter
	const counter = createCounter(closureCounter);

	/**
	 * @function incrementCounter
	 * @description Incrementa y actualiza el contador usando un closure
	 */
	const incrementCounter = () => {
		const newValue = counter();
		setClosureCounter(newValue);
		logEvent(`Contador incrementado a ${newValue} (usando closure)`, "info");
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>7.1 Modelo de gestión de eventos</h4>
				<p>
					JavaScript utiliza un modelo de eventos basado en el DOM para permitir interacciones entre el
					usuario y la interfaz. Este modelo incluye fases de captura y burbujeo, diferentes tipos de eventos,
					y manejadores para responder a ellos.
				</p>

				<div className="demo-container dark-theme">
					<h5>Demostración de Fases de Eventos</h5>

					<div className="controls dark-theme">
						<label className="toggle-control">
							<input
								type="checkbox"
								checked={captureModeEnabled}
								onChange={() => setCaptureModeEnabled(!captureModeEnabled)}
							/>
							<span>Usar fase de captura</span>
						</label>

						<label className="toggle-control">
							<input
								type="checkbox"
								checked={stopPropagationEnabled}
								onChange={() => setStopPropagationEnabled(!stopPropagationEnabled)}
							/>
							<span>Detener propagación</span>
						</label>

						<button
							onClick={clearLog}
							className="clear-btn dark-theme">
							Limpiar registro
						</button>
					</div>

					<div className="event-demo-area dark-theme">
						<div
							className="outer-box dark-theme"
							onClick={(e) => handleElement(e, "div exterior")}
							onMouseOver={(e) => handleElement(e, "div exterior")}
							onClickCapture={captureModeEnabled ? (e) => handleElement(e, "div exterior") : null}
							onMouseOverCapture={captureModeEnabled ? (e) => handleElement(e, "div exterior") : null}>
							<div
								className="middle-box dark-theme"
								onClick={(e) => handleElement(e, "div intermedio")}
								onMouseOver={(e) => handleElement(e, "div intermedio")}
								onClickCapture={captureModeEnabled ? (e) => handleElement(e, "div intermedio") : null}
								onMouseOverCapture={
									captureModeEnabled ? (e) => handleElement(e, "div intermedio") : null
								}>
								<div
									className="inner-box dark-theme"
									onClick={(e) => handleElement(e, "div interior")}
									onMouseOver={(e) => handleElement(e, "div interior")}
									onClickCapture={captureModeEnabled ? (e) => handleElement(e, "div interior") : null}
									onMouseOverCapture={
										captureModeEnabled ? (e) => handleElement(e, "div interior") : null
									}>
									Interactúa con estos elementos
								</div>
							</div>
						</div>
					</div>

					<div
						className="event-log dark-theme"
						ref={logContainerRef}>
						<h6>Registro de Eventos:</h6>
						{eventLog.length === 0 ? (
							<p className="empty-log dark-theme">
								No hay eventos registrados. Interactúa con los elementos de arriba.
							</p>
						) : (
							<ul className="log-list dark-theme">
								{eventLog.map((entry) => (
									<li
										key={entry.id}
										className={`log-item ${entry.type} dark-theme`}>
										<span className="timestamp dark-theme">[{entry.timestamp}]</span>
										<span className="message dark-theme">{entry.message}</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Código para Registrar Eventos</h5>
					<pre className="code-snippet dark-theme">
						{`// Añadir evento usando addEventListener
document.getElementById('myButton').addEventListener('click', function(event) {
    console.log('Botón clickeado');
}, false); // false indica fase de burbujeo (por defecto)

// Con fase de captura
document.getElementById('myButton').addEventListener('click', function(event) {
    console.log('Capturado en fase de captura');
}, true); // true indica fase de captura

// Detener la propagación
document.getElementById('myButton').addEventListener('click', function(event) {
    event.stopPropagation();
    console.log('Propagación detenida');
});

// Prevenir comportamiento por defecto
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Envío de formulario prevenido');
});`}
					</pre>
				</div>

				<div className="closure-section dark-theme">
					<h5>7.1.1 Closures</h5>
					<p>
						Los closures (cierres) son funciones que tienen acceso a variables de un ámbito externo, incluso
						después de que la función externa haya finalizado su ejecución. Son útiles para crear funciones
						con "memoria" y para implementar patrones como módulos.
					</p>

					<div className="closure-demo dark-theme">
						<h6>Demostración de Closures</h6>
						<div className="counter-display dark-theme">
							Valor actual: <span className="counter-value dark-theme">{closureCounter}</span>
						</div>
						<button
							onClick={incrementCounter}
							className="increment-btn dark-theme">
							Incrementar (usando closure)
						</button>

						<div className="code-example dark-theme">
							<pre className="code-snippet dark-theme">
								{`// Creación de un closure
function createCounter(initialValue) {
    let count = initialValue; // Variable privada
    
    return function() {
        count++; // Accediendo a la variable del ámbito externo
        return count;
    };
}

// Usando el closure
const counter = createCounter(0);
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Cada instancia tiene su propio estado
const anotherCounter = createCounter(10);
console.log(anotherCounter()); // 11`}
							</pre>
						</div>
					</div>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>El modelo de eventos de JavaScript incluye tres fases: captura, objetivo y burbujeo</li>
					<li>
						addEventListener puede configurarse para escuchar eventos en fase de captura (tercer parámetro
						true)
					</li>
					<li>event.stopPropagation() detiene la propagación del evento hacia arriba o hacia abajo</li>
					<li>event.preventDefault() evita el comportamiento predeterminado del navegador</li>
					<li>Los closures permiten a una función interna acceder a variables de una función externa</li>
					<li>Los closures son útiles para encapsular datos y crear funciones "con memoria"</li>
					<li>Cada instancia de un closure tiene su propio ámbito independiente</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej01_Modelo_Eventos;
