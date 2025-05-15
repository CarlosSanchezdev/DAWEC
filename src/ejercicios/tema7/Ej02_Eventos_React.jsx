/**
 * @fileoverview Ejercicio sobre Eventos en React
 * @ejercicio Ej02_Eventos_React
 * @tema Tema 7: Interacción con el usuario, eventos y formularios
 * @fecha 11/05/2025
 */

import { useState, useRef } from "react";
import "./Ej02_Eventos_React.css";

/**
 * @function Ej02_Eventos_React
 * @description Componente que demuestra el manejo de eventos específicos de React
 * @returns {JSX.Element} Componente con ejemplos de eventos en React
 */
function Ej02_Eventos_React() {
	// ===== HOOKS =====
	const [eventHistory, setEventHistory] = useState([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [dragStatus, setDragStatus] = useState("No arrastrando");
	const [keyPressed, setKeyPressed] = useState(null);
	const canvasRef = useRef(null);
	const historyRef = useRef(null);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function logEvent
	 * @description Registra un evento en el historial
	 * @param {string} eventName - Nombre del evento
	 * @param {string} details - Detalles adicionales del evento
	 */
	const logEvent = (eventName, details = "") => {
		const timestamp = new Date().toLocaleTimeString();
		const newEntry = {
			id: Date.now(),
			timestamp,
			eventName,
			details,
		};

		setEventHistory((prev) => [newEntry, ...prev].slice(0, 10)); // Mantener solo los 10 últimos eventos

		// Hacer scroll al inicio del historial
		if (historyRef.current) {
			historyRef.current.scrollTop = 0;
		}
	};

	/**
	 * @function handleMouseMove
	 * @description Maneja el evento de movimiento del ratón
	 * @param {React.MouseEvent} e - Evento sintético de React
	 */
	const handleMouseMove = (e) => {
		const canvas = canvasRef.current;
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			const x = Math.round(e.clientX - rect.left);
			const y = Math.round(e.clientY - rect.top);
			setMousePosition({ x, y });

			// Solo logueamos cambios cada 100px para no saturar el historial
			if (x % 100 < 5 && y % 100 < 5) {
				logEvent("mousemove", `x: ${x}, y: ${y}`);
			}
		}
	};

	/**
	 * @function handleDragStart
	 * @description Maneja el inicio de arrastre
	 * @param {React.DragEvent} e - Evento de arrastre
	 */
	const handleDragStart = (e) => {
		e.dataTransfer.setData("text/plain", "elemento arrastrable");
		setDragStatus("¡Arrastrando!");
		logEvent("dragstart", "Comenzó el arrastre del elemento");
	};

	/**
	 * @function handleDragEnd
	 * @description Maneja el fin de arrastre
	 */
	const handleDragEnd = () => {
		setDragStatus("Arrastre finalizado");
		logEvent("dragend", "Finalizó el arrastre");
	};

	/**
	 * @function handleDrop
	 * @description Maneja el evento drop
	 * @param {React.DragEvent} e - Evento de drop
	 */
	const handleDrop = (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData("text/plain");
		setDragStatus(`Elemento "${data}" soltado`);
		logEvent("drop", `Elemento "${data}" soltado en la zona de destino`);
	};

	/**
	 * @function handleDragOver
	 * @description Previene el comportamiento por defecto del evento dragover
	 * @param {React.DragEvent} e - Evento de dragover
	 */
	const handleDragOver = (e) => {
		e.preventDefault(); // Necesario para permitir el drop
	};

	/**
	 * @function handleKeyDown
	 * @description Maneja el evento de tecla presionada
	 * @param {React.KeyboardEvent} e - Evento de teclado
	 */
	const handleKeyDown = (e) => {
		setKeyPressed({
			key: e.key,
			code: e.code,
			altKey: e.altKey,
			ctrlKey: e.ctrlKey,
			shiftKey: e.shiftKey,
		});

		logEvent("keydown", `Tecla: ${e.key} (${e.code})`);

		// Prevenir comportamiento por defecto en algunas teclas para demostración
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
			e.preventDefault();
		}
	};

	/**
	 * @function clearHistory
	 * @description Limpia el historial de eventos
	 */
	const clearHistory = () => {
		setEventHistory([]);
		logEvent("clear", "Historial limpiado");
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>7.2 Eventos en React</h4>
				<p>
					React implementa un sistema de eventos sintéticos (SyntheticEvent) que envuelve los eventos nativos
					del navegador, proporcionando una API consistente en todos los navegadores. Los eventos en React se
					nombran usando camelCase (onClick, onMouseOver) en lugar de minúsculas (onclick, onmouseover).
				</p>

				<div className="event-playground dark-theme">
					<h5>Área de Juego con Eventos</h5>

					<div
						className="event-canvas dark-theme"
						ref={canvasRef}
						onMouseMove={handleMouseMove}
						onKeyDown={handleKeyDown}
						tabIndex="0" // Permite que el div reciba eventos de teclado
						onDragOver={handleDragOver}
						onDrop={handleDrop}>
						<div className="mouse-tracker dark-theme">
							Posición del ratón: X: {mousePosition.x}, Y: {mousePosition.y}
						</div>

						<div className="event-controls dark-theme">
							<div
								className="draggable-element dark-theme"
								draggable="true"
								onDragStart={handleDragStart}
								onDragEnd={handleDragEnd}>
								Arrástrare a la zona de destino
							</div>

							<div className="drop-zone dark-theme">
								Zona de destino (suelta aquí)
								<div className="status-indicator dark-theme">{dragStatus}</div>
							</div>
						</div>

						<div className="keyboard-area dark-theme">
							<p>Haz clic aquí y presiona una tecla (se deben capturar eventos de teclado)</p>
							{keyPressed && (
								<div className="key-display dark-theme">
									<div>
										Tecla: <span className="key-value dark-theme">{keyPressed.key}</span>
									</div>
									<div>
										Código: <span className="key-value dark-theme">{keyPressed.code}</span>
									</div>
									<div className="key-modifiers dark-theme">
										<span className={keyPressed.ctrlKey ? "active" : ""}>Ctrl</span>
										<span className={keyPressed.altKey ? "active" : ""}>Alt</span>
										<span className={keyPressed.shiftKey ? "active" : ""}>Shift</span>
									</div>
								</div>
							)}
							<p className="keyboard-hint dark-theme">
								Las teclas de flecha y espacio tienen preventDefault()
							</p>
						</div>
					</div>

					<div
						className="event-history dark-theme"
						ref={historyRef}>
						<div className="history-header dark-theme">
							<h6>Historial de Eventos</h6>
							<button
								onClick={clearHistory}
								className="clear-history-btn dark-theme">
								Limpiar
							</button>
						</div>

						{eventHistory.length === 0 ? (
							<p className="empty-history dark-theme">
								Interactúa con los elementos de arriba para ver eventos
							</p>
						) : (
							<ul className="event-list dark-theme">
								{eventHistory.map((event) => (
									<li
										key={event.id}
										className="event-item dark-theme">
										<span className="event-time dark-theme">[{event.timestamp}]</span>
										<span className="event-name dark-theme">{event.eventName}</span>
										{event.details && (
											<span className="event-details dark-theme">{event.details}</span>
										)}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Comparación de Eventos en React vs DOM Nativo</h5>
					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>React (Eventos Sintéticos)</h6>
							<pre className="code-snippet dark-theme">
								{`// Eventos en React
function MyComponent() {
  const handleClick = (e) => {
    e.preventDefault(); // API consistente
    console.log('Clase del evento:', e.constructor.name);
    console.log('Evento nativo:', e.nativeEvent);
  };
  
  return (
    <button 
      onClick={handleClick}
      onMouseEnter={() => console.log('Mouse entró')}
    >
      Botón de React
    </button>
  );
}`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>DOM Nativo</h6>
							<pre className="code-snippet dark-theme">
								{`// Eventos en DOM Nativo
document.getElementById('myButton')
  .addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Clase del evento:', e.constructor.name);
  });
  
// Otra sintaxis (no recomendada)
document.getElementById('myButton').onclick = 
  function() {
    console.log('Clic en botón');
  };`}
							</pre>
						</div>
					</div>
				</div>

				<div className="event-pooling-section dark-theme">
					<h5>SyntheticEvent y Event Pooling</h5>
					<p>
						Hasta React 16, React utilizaba un sistema de "event pooling" donde los objetos de eventos se
						reutilizaban y se limpiaban justo después de que el manejador de eventos terminaba. A partir de
						React 17, este sistema fue eliminado, y los eventos sintéticos de React ahora se comportan más
						como los eventos nativos del navegador.
					</p>

					<div className="info-box dark-theme">
						<h6>Nota sobre Event Pooling (para versiones anteriores a React 17)</h6>
						<p>
							Si necesitas acceder a las propiedades de un evento después de que el manejador de eventos
							ha finalizado, debes llamar a <code>e.persist()</code> o guardar las propiedades que
							necesitas.
						</p>

						<pre className="code-snippet dark-theme">
							{`// React <17 (con event pooling)
function handleChange(e) {
  // ❌ No funcionará en versiones anteriores a React 17
  setTimeout(() => {
    console.log(e.target.value);
  }, 100);
  
  // ✅ Correcto para todas las versiones
  e.persist();
  setTimeout(() => {
    console.log(e.target.value);
  }, 100);
  
  // ✅ Alternativa: guardar los valores
  const value = e.target.value;
  setTimeout(() => {
    console.log(value);
  }, 100);
}`}
						</pre>
					</div>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>
						React utiliza eventos sintéticos (SyntheticEvent) para normalizar el comportamiento entre
						navegadores
					</li>
					<li>
						Los eventos en React se nombran usando camelCase (onClick, onKeyDown) en lugar de lowercase
						(onclick, onkeydown)
					</li>
					<li>Se debe usar preventDefault() para evitar el comportamiento por defecto del navegador</li>
					<li>En eventos de arrastre, es necesario preventDefault() en onDragOver para permitir el drop</li>
					<li>
						Desde React 17, el sistema de event pooling fue eliminado y los eventos actúan de forma más
						natural
					</li>
					<li>
						Los eventos sintéticos de React tienen acceso al evento nativo a través de la propiedad
						nativeEvent
					</li>
					<li>Para que un elemento reciba eventos de teclado, debe tener un tabIndex y estar enfocado</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej02_Eventos_React;
