/**
 * @fileoverview Ejercicio sobre Manipulación del DOM y Eventos
 * @ejercicio Ej04_DOM_Eventos
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej04_DOM_Eventos.css";

/**
 * @function Ej04_DOM_Eventos
 * @description Componente principal que demuestra la manipulación del DOM y eventos en React
 * @returns {JSX.Element} Componente de demostración de DOM y eventos
 * @example
 *   <Ej04_DOM_Eventos />
 */
function Ej04_DOM_Eventos() {
	// ===== HOOKS =====
	const [counter, setCounter] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [keyPressed, setKeyPressed] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [submittedData, setSubmittedData] = useState(null);

	// Referencias para acceder a elementos del DOM
	const counterContainerRef = useRef(null);
	const nameInputRef = useRef(null);
	const dragElementRef = useRef(null);
	const dropZoneRef = useRef(null);

	// ===== EFECTOS =====
	// Efecto para manejar eventos de teclado
	useEffect(() => {
		const handleKeyDown = (event) => {
			setKeyPressed(event.key);

			// Limpiar después de 2 segundos
			setTimeout(() => {
				setKeyPressed("");
			}, 2000);
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function incrementCounter
	 * @description Incrementa el contador y actualiza el estilo
	 */
	const incrementCounter = () => {
		setCounter((prevCounter) => {
			const newValue = prevCounter + 1;

			// Manipulación directa del DOM usando ref (estilo condicional)
			if (counterContainerRef.current) {
				if (newValue % 5 === 0) {
					counterContainerRef.current.classList.add("milestone");
					setTimeout(() => {
						if (counterContainerRef.current) {
							counterContainerRef.current.classList.remove("milestone");
						}
					}, 500);
				}
			}

			return newValue;
		});
	};

	/**
	 * @function handleMouseMove
	 * @description Actualiza la posición del ratón
	 * @param {React.MouseEvent} event - Evento de movimiento del ratón
	 */
	const handleMouseMove = (event) => {
		setMousePosition({
			x: event.clientX,
			y: event.clientY,
		});
	};

	/**
	 * @function handleInputChange
	 * @description Actualiza el estado del formulario
	 * @param {React.ChangeEvent} event - Evento de cambio de input
	 */
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Limpiar errores al escribir
		if (formErrors[name]) {
			setFormErrors((prevErrors) => ({
				...prevErrors,
				[name]: null,
			}));
		}
	};

	/**
	 * @function validateForm
	 * @description Valida los campos del formulario
	 * @returns {boolean} True si el formulario es válido
	 */
	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = "El nombre es obligatorio";
		}

		if (!formData.email.trim()) {
			errors.email = "El email es obligatorio";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = "El email no es válido";
		}

		if (!formData.message.trim()) {
			errors.message = "El mensaje es obligatorio";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {React.FormEvent} event - Evento de envío del formulario
	 */
	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateForm()) {
			// Simulación de envío exitoso
			setSubmittedData({ ...formData });

			// Limpiar formulario
			setFormData({
				name: "",
				email: "",
				message: "",
			});

			// Enfocar el primer campo usando ref
			if (nameInputRef.current) {
				nameInputRef.current.focus();
			}
		}
	};

	/**
	 * @function handleReset
	 * @description Resetea el formulario
	 */
	const handleReset = () => {
		setFormData({
			name: "",
			email: "",
			message: "",
		});
		setFormErrors({});
		setSubmittedData(null);

		// Enfocar el primer campo
		if (nameInputRef.current) {
			nameInputRef.current.focus();
		}
	};

	/**
	 * @function handleDragStart
	 * @description Maneja el inicio del arrastre
	 * @param {React.DragEvent} event - Evento de inicio de arrastre
	 */
	const handleDragStart = (event) => {
		event.dataTransfer.setData("text/plain", "elemento-arrastrado");
		event.currentTarget.classList.add("dragging");
	};

	/**
	 * @function handleDragEnd
	 * @description Maneja el fin del arrastre
	 * @param {React.DragEvent} event - Evento de fin de arrastre
	 */
	const handleDragEnd = (event) => {
		event.currentTarget.classList.remove("dragging");
	};

	/**
	 * @function handleDragOver
	 * @description Maneja el evento de arrastre sobre la zona de destino
	 * @param {React.DragEvent} event - Evento de arrastre sobre zona
	 */
	const handleDragOver = (event) => {
		event.preventDefault();
		event.currentTarget.classList.add("drag-over");
	};

	/**
	 * @function handleDragLeave
	 * @description Maneja cuando el elemento arrastrado sale de la zona
	 * @param {React.DragEvent} event - Evento de salida de zona
	 */
	const handleDragLeave = (event) => {
		event.currentTarget.classList.remove("drag-over");
	};

	/**
	 * @function handleDrop
	 * @description Maneja la acción de soltar en la zona de destino
	 * @param {React.DragEvent} event - Evento de soltar
	 */
	const handleDrop = (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData("text/plain");

		if (data === "elemento-arrastrado" && dragElementRef.current && dropZoneRef.current) {
			// Crear un clon visual del elemento en la zona de destino
			const clone = dragElementRef.current.cloneNode(true);
			clone.classList.remove("dragging");
			clone.classList.add("dropped");

			// Añadir el clon a la zona de destino
			dropZoneRef.current.appendChild(clone);

			// Añadir botón para eliminar el elemento
			const removeButton = document.createElement("button");
			removeButton.textContent = "Eliminar";
			removeButton.classList.add("remove-button");
			removeButton.addEventListener("click", () => {
				clone.remove();
			});

			clone.appendChild(removeButton);
		}

		event.currentTarget.classList.remove("drag-over");
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 4: Manipulación del DOM y Eventos</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra la manipulación del DOM y el manejo de eventos en React.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Eventos básicos en React</h4>
					<p>
						React implementa un sistema de eventos sintéticos que normaliza los eventos del navegador de
						manera consistente entre diferentes navegadores.
					</p>

					<div className="eventos-demo">
						<div
							className="counter-container"
							ref={counterContainerRef}
							onClick={incrementCounter}>
							<p>
								Click para incrementar: <span className="counter-value">{counter}</span>
							</p>
						</div>

						<div
							className="mouse-tracker"
							onMouseMove={handleMouseMove}>
							<p>Mueve el ratón por esta área</p>
							<div className="mouse-position">
								Posición: X: {mousePosition.x}, Y: {mousePosition.y}
							</div>
						</div>

						<div className="keyboard-tracker">
							<p>Presiona cualquier tecla</p>
							<div className="key-display">
								{keyPressed ? (
									<span className="key-pressed">{keyPressed}</span>
								) : (
									<span className="key-instruction">Esperando tecla...</span>
								)}
							</div>
						</div>

						<div className="code-example">
							<pre>
								{`// Eventos en React
<button onClick={handleClick}>Clic aquí</button>

<input
  type="text"
  onChange={handleInputChange}
  onFocus={handleFocus}
  onBlur={handleBlur}
/>

<div 
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
/>

// A diferencia de HTML, en React:
// 1. Los nombres de eventos usan camelCase
// 2. Se pasan funciones como manejadores (no strings)
// 3. Para prevenir el comportamiento por defecto:
//    event.preventDefault() en lugar de return false`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. Formularios y Validación</h4>
					<p>
						Los formularios en React suelen ser "controlados", manteniendo el estado de los campos en el
						componente y actualizándolo con cada cambio.
					</p>

					<div className="form-demo">
						<form
							onSubmit={handleSubmit}
							className="contact-form">
							<div className="form-group">
								<label htmlFor="name">Nombre:</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									ref={nameInputRef}
									className={formErrors.name ? "error" : ""}
								/>
								{formErrors.name && <div className="error-message">{formErrors.name}</div>}
							</div>

							<div className="form-group">
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className={formErrors.email ? "error" : ""}
								/>
								{formErrors.email && <div className="error-message">{formErrors.email}</div>}
							</div>

							<div className="form-group">
								<label htmlFor="message">Mensaje:</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									rows="4"
									className={formErrors.message ? "error" : ""}></textarea>
								{formErrors.message && <div className="error-message">{formErrors.message}</div>}
							</div>

							<div className="form-actions">
								<button type="submit">Enviar</button>
								<button
									type="button"
									onClick={handleReset}>
									Limpiar
								</button>
							</div>
						</form>

						{submittedData && (
							<div className="form-result">
								<h5>Datos enviados:</h5>
								<ul>
									<li>
										<strong>Nombre:</strong> {submittedData.name}
									</li>
									<li>
										<strong>Email:</strong> {submittedData.email}
									</li>
									<li>
										<strong>Mensaje:</strong> {submittedData.message}
									</li>
								</ul>
							</div>
						)}
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. Manipulación del DOM con useRef</h4>
					<p>
						React permite acceder y manipular elementos del DOM usando el hook useRef, aunque generalmente
						se prefiere el enfoque declarativo.
					</p>

					<div className="dom-manipulation-demo">
						<div className="refs-example">
							<h5>Ejemplos de uso de useRef:</h5>
							<ul>
								<li>Acceso a elementos del DOM (foco, scroll, dimensiones)</li>
								<li>Acceso a valores previos de props o estado</li>
								<li>Almacenar valores que no deben causar re-renders</li>
							</ul>

							<div className="code-example">
								<pre>
									{`// Manipulación del DOM con useRef
const inputRef = useRef(null);

// Más adelante en el código...
const focusInput = () => {
  inputRef.current.focus();  // Acceso directo al elemento
};

return (
  <>
    <input ref={inputRef} type="text" />
    <button onClick={focusInput}>
      Enfocar input
    </button>
  </>
);`}
								</pre>
							</div>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Eventos de arrastrar y soltar (Drag & Drop)</h4>
					<p>
						La API Drag and Drop de HTML5 permite implementar funcionalidad de arrastrar y soltar elementos
						en una interfaz.
					</p>

					<div className="drag-drop-demo">
						<div className="drag-container">
							<div
								className="draggable-element"
								draggable="true"
								ref={dragElementRef}
								onDragStart={handleDragStart}
								onDragEnd={handleDragEnd}>
								¡Arrástrame!
							</div>

							<div
								className="drop-zone"
								ref={dropZoneRef}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}>
								Zona de destino
							</div>
						</div>

						<div className="code-example">
							<pre>
								{`// API de Drag & Drop en HTML5/React
// Elemento a arrastrar
<div
  draggable="true"
  onDragStart={(e) => {
    e.dataTransfer.setData('text/plain', id);
    e.currentTarget.classList.add('dragging');
  }}
  onDragEnd={(e) => {
    e.currentTarget.classList.remove('dragging');
  }}
>
  Arrástramo
</div>

// Zona de destino
<div
  onDragOver={(e) => {
    e.preventDefault(); // Necesario para permitir el drop
    e.currentTarget.classList.add('drag-over');
  }}
  onDragLeave={(e) => {
    e.currentTarget.classList.remove('drag-over');
  }}
  onDrop={(e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    // Procesar los datos recibidos
    e.currentTarget.classList.remove('drag-over');
  }}
>
  Zona de destino
</div>`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>5. Eventos Sintéticos en React</h4>
					<p>
						React envuelve los eventos nativos del navegador en un objeto de evento sintético que funciona
						de manera consistente en todos los navegadores.
					</p>

					<div className="synthetic-events-demo">
						<div className="events-list">
							<h5>Categorías de eventos en React:</h5>
							<ul>
								<li>
									<strong>Eventos de ratón:</strong> onClick, onDoubleClick, onMouseDown,
									onMouseEnter, onMouseLeave, onMouseMove, onMouseOut, onMouseOver, onMouseUp
								</li>
								<li>
									<strong>Eventos de teclado:</strong> onKeyDown, onKeyPress, onKeyUp
								</li>
								<li>
									<strong>Eventos de formulario:</strong> onChange, onInput, onInvalid, onSubmit,
									onReset
								</li>
								<li>
									<strong>Eventos de foco:</strong> onFocus, onBlur
								</li>
								<li>
									<strong>Eventos UI:</strong> onScroll
								</li>
								<li>
									<strong>Eventos de rueda:</strong> onWheel
								</li>
								<li>
									<strong>Eventos de portapapeles:</strong> onCopy, onCut, onPaste
								</li>
								<li>
									<strong>Eventos táctiles:</strong> onTouchCancel, onTouchEnd, onTouchMove,
									onTouchStart
								</li>
							</ul>
						</div>

						<div className="code-example">
							<pre>
								{`// Propiedades comunes de eventos en React
function handleEvent(event) {
  // Propiedades comunes
  event.type         // Tipo de evento (click, change, etc.)
  event.target       // Elemento que disparó el evento
  event.currentTarget// Elemento al que está adjunto el manejador
  event.nativeEvent  // Evento nativo del navegador
  
  // Métodos comunes
  event.preventDefault()   // Prevenir comportamiento por defecto
  event.stopPropagation()  // Detener la propagación del evento
  
  // También existen propiedades específicas para cada tipo de evento
  // Ej: event.key para eventos de teclado, event.clientX para eventos de ratón
}`}
							</pre>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>En React, los nombres de eventos usan camelCase (onClick en lugar de onclick)</li>
					<li>Se pasan funciones como manejadores de eventos, no strings</li>
					<li>
						React utiliza un sistema de eventos sintéticos para normalizar el comportamiento entre
						navegadores
					</li>
					<li>Para prevenir el comportamiento por defecto, se usa event.preventDefault(), no return false</li>
					<li>useRef permite acceder a elementos del DOM y manipularlos directamente cuando es necesario</li>
					<li>Los formularios "controlados" mantienen su estado en variables de React, no en el DOM</li>
					<li>
						La API Drag & Drop de HTML5 requiere manejar varios eventos: dragStart, dragOver, drop, etc.
					</li>
					<li>
						Para permitir soltar elementos, siempre se debe llamar a preventDefault() en el evento dragOver
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej04_DOM_Eventos;
