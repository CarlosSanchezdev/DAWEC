/**
 * @fileoverview Ejemplo de componente con hooks básicos para gestión de estado
 * @ejercicio Ej02_Hooks_useState
 * @tema Tema 1: Fundamentos de React
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej02_Hooks_useState.css";

/**
 * @function ContadorApp
 * @description Componente que demuestra el uso del hook useState para
 * manejar un contador simple y un formulario básico
 * @returns {JSX.Element} Componente de contador y formulario
 * @example
 *   <ContadorApp />
 */
function ContadorApp() {
	// ===== HOOKS =====
	/**
	 * @state {number} count - Estado para el contador
	 * @function setCount - Función para actualizar el contador
	 */
	const [count, setCount] = useState(0);

	/**
	 * @state {string} name - Estado para el campo de nombre
	 * @function setName - Función para actualizar el nombre
	 */
	const [name, setName] = useState("");

	/**
	 * @state {string} submittedName - Nombre enviado por el formulario
	 * @function setSubmittedName - Función para actualizar el nombre enviado
	 */
	const [submittedName, setSubmittedName] = useState("");

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function increment
	 * @description Incrementa el contador en 1
	 * @returns {void}
	 */
	const increment = () => {
		// IMPORTANTE: Usando forma funcional para asegurar el valor actualizado
		setCount((prevCount) => prevCount + 1);
	};

	/**
	 * @function decrement
	 * @description Decrementa el contador en 1
	 * @returns {void}
	 */
	const decrement = () => {
		setCount((prevCount) => prevCount - 1);
	};

	/**
	 * @function reset
	 * @description Restablece el contador a 0
	 * @returns {void}
	 */
	const reset = () => {
		setCount(0);
	};

	/**
	 * @function handleNameChange
	 * @description Maneja el cambio en el input de nombre
	 * @param {Event} e - Evento del input
	 * @returns {void}
	 */
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {Event} e - Evento del formulario
	 * @returns {void}
	 */
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

		// NOTA: Solo actualizamos si hay un nombre válido
		if (name.trim()) {
			setSubmittedName(name);
			setName(""); // Limpiar el input después del envío
		}
	};

	// ===== RENDER =====
	return (
		<div className="contador-app">
			<h2>Ejemplo de useState - Contador</h2>

			<div className="counter-section">
				<p className="count-display">Contador: {count}</p>
				<div className="counter-buttons">
					<button onClick={decrement}>Decrementar</button>
					<button onClick={reset}>Reiniciar</button>
					<button onClick={increment}>Incrementar</button>
				</div>

				{/* Mensaje condicional basado en el valor del contador */}
				{count === 0 ? (
					<p>El contador está en cero.</p>
				) : count > 0 ? (
					<p>El contador es positivo.</p>
				) : (
					<p>El contador es negativo.</p>
				)}
			</div>

			<h3>Formulario Simple</h3>
			<form
				onSubmit={handleSubmit}
				className="name-form">
				<div className="form-control">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={handleNameChange}
						placeholder="Escribe tu nombre"
					/>
				</div>
				<button type="submit">Enviar</button>
			</form>

			{/* Mostrar el nombre enviado si existe */}
			{submittedName && <p className="greeting">¡Hola, {submittedName}!</p>}

			{/* TODO: Agregar validación de formulario más completa */}
		</div>
	);
}

export default ContadorApp;
