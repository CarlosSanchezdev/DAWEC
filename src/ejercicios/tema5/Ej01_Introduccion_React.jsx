/**
 * @fileoverview Ejercicio de introducción a React
 * @ejercicio Ej01_Introduccion_React
 * @tema Tema 5: Bibliotecas y Frameworks - React
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ej01_Introduccion_React.css";

/**
 * @function Ej01_Introduccion_React
 * @description Componente principal que demuestra los conceptos fundamentales de React
 * @returns {JSX.Element} Componente de introducción a React
 * @example
 *   <Ej01_Introduccion_React />
 */
function Ej01_Introduccion_React() {
	// ===== HOOKS =====
	const [count, setCount] = useState(0);
	const [renderTime, setRenderTime] = useState(0);

	// ===== EFECTOS =====
	/**
	 * Efecto que se ejecuta cada vez que cambia el contador
	 * para medir el tiempo de renderizado (demuestra el Virtual DOM)
	 */
	useEffect(() => {
		const start = performance.now();
		return () => {
			// Mide el tiempo de renderizado después de actualizar el componente
			const end = performance.now();
			setRenderTime(end - start);
		};
	}, [count]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function handleIncrement
	 * @description Incrementa el contador en 1
	 */
	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	/**
	 * @function handleReset
	 * @description Reinicia el contador a 0
	 */
	const handleReset = () => {
		setCount(0);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 1: Introducción a React</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra los conceptos fundamentales de React: componentes, Virtual DOM, JSX y hooks
					básicos.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Componentes</h4>
					<p>
						Los componentes son bloques de construcción reutilizables en React. Este archivo es un
						componente funcional que retorna JSX.
					</p>
					<div className="component-demo">
						<ComponenteSimple nombre="Estudiante" />
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. Virtual DOM</h4>
					<p>
						React utiliza un DOM virtual para optimizar las actualizaciones al DOM real. Observa cómo el
						tiempo de renderizado es mínimo incluso con actualizaciones frecuentes.
					</p>
					<div className="virtual-dom-demo">
						<div className="counter-display">Contador: {count}</div>
						<div className="render-time">Tiempo de renderizado: {renderTime.toFixed(2)} ms</div>
						<div className="counter-controls">
							<button onClick={handleIncrement}>Incrementar</button>
							<button onClick={handleReset}>Reiniciar</button>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. JSX</h4>
					<p>
						JSX es una extensión de sintaxis de JavaScript que parece HTML pero permite usar toda la
						potencia de JavaScript dentro de tus componentes.
					</p>

					<div className="jsx-demo">
						<h5>Ejemplo de JSX:</h5>
						<pre>
							{`
// Este es JSX:
return (
  <div className="container">
    <h1>{titulo}</h1>
    {mostrarBoton && <button onClick={handleClick}>Haz clic</button>}
  </div>
)
                `}
						</pre>
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Hooks</h4>
					<p>
						Los hooks permiten usar el estado y otras características de React sin escribir una clase. Los
						hooks básicos son useState y useEffect.
					</p>

					<div className="hooks-demo">
						<HookDemo />
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>React es una biblioteca para construir interfaces de usuario</li>
					<li>Usa el Virtual DOM para optimizar actualizaciones del DOM real</li>
					<li>Los componentes pueden ser funcionales (recomendado) o de clase</li>
					<li>JSX permite escribir markup similar a HTML dentro de JavaScript</li>
					<li>Los hooks permiten usar características de React en componentes funcionales</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function ComponenteSimple
 * @description Un componente sencillo que muestra un saludo
 * @param {Object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre a mostrar en el saludo
 * @returns {JSX.Element} Componente de saludo
 */
function ComponenteSimple({ nombre }) {
	return (
		<div className="componente-simple">
			<p>Hola, {nombre || "Mundo"}! Soy un componente simple.</p>
		</div>
	);
}

/**
 * @function HookDemo
 * @description Componente que demuestra el uso básico de useState
 * @returns {JSX.Element} Componente de demostración de hook
 */
function HookDemo() {
	// IMPORTANTE: useState permite agregar estado a componentes funcionales
	const [mensaje, setMensaje] = useState("Hola desde useState!");

	const cambiarMensaje = () => {
		setMensaje("¡El estado ha cambiado!");
	};

	return (
		<div className="hook-demo-container">
			<p>{mensaje}</p>
			<button onClick={cambiarMensaje}>Cambiar mensaje</button>
		</div>
	);
}

export default Ej01_Introduccion_React;
