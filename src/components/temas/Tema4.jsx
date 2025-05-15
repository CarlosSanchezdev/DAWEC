/**
 * @fileoverview Componente para mostrar ejercicios del Tema 4 - DOM
 * @fecha 13/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Importación dinámica de ejercicios
const Ej01_Intro_DOM = lazy(() => import("../../ejercicios/tema4/Ej01_Intro_DOM/Ej01_Intro_DOM"));
const Ej02_DOM_Manipulacion = lazy(() => import("../../ejercicios/tema4/Ej02_DOM_Manipulacion/Ej02_DOM_Manipulacion"));
const Ej03_DOM_Eventos = lazy(() => import("../../ejercicios/tema4/Ej03_DOM_Eventos/Ej03_DOM_Eventos"));
const Ej04_Web_Components = lazy(() => import("../../ejercicios/tema4/Ej04_Web_Components/Ej04_Web_Components"));

/**
 * @function Tema4
 * @description Componente que muestra los ejercicios del Tema 4: Modelo de objetos del documento (DOM)
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema4() {
	const navigate = useNavigate();

	const ejercicios = [
		{
			id: "intro-dom",
			title: "Introducción al DOM",
			path: "intro-dom",
			description: "Conceptos básicos del DOM y su estructura",
		},
		{
			id: "dom-manipulacion",
			title: "Manipulación del DOM",
			path: "dom-manipulacion",
			description: "Modificación dinámica de elementos del DOM",
		},
		{
			id: "dom-eventos",
			title: "Eventos del DOM",
			path: "dom-eventos",
			description: "Manejo de eventos y interacción con el usuario",
		},
		{
			id: "web-components",
			title: "Web Components",
			path: "web-components",
			description: "Creación de componentes web personalizados",
		},
	];

	return (
		<div className="tema-container">
			<div className="tema-header">
				<button
					onClick={() => navigate("/temas")}
					className="back-button">
					← Volver a Temas
				</button>
				<h2>Tema 4: Modelo de objetos del documento (DOM)</h2>
			</div>

			<Routes>
				{" "}
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Explora el DOM y aprende a manipular la estructura y contenido de páginas web.
							</p>

							<div className="ejercicios-grid">
								{ejercicios.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className="ejercicio-card">
										<h3>{ejercicio.title}</h3>
										<p>{ejercicio.description}</p>
										<Link
											to={ejercicio.path}
											className="btn">
											Ver ejercicio
										</Link>
									</div>
								))}
							</div>
						</div>
					}
				/>
				<Route
					path="/intro-dom"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/4")}
								className="back-button">
								← Volver a Tema 4
							</button>
							<h3>Ejercicio: Introducción al DOM</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej01_Intro_DOM />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/dom-manipulacion"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/4")}
								className="back-button">
								← Volver a Tema 4
							</button>
							<h3>Ejercicio: Manipulación del DOM</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej02_DOM_Manipulacion />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/dom-eventos"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/4")}
								className="back-button">
								← Volver a Tema 4
							</button>
							<h3>Ejercicio: Eventos del DOM</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej03_DOM_Eventos />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/web-components"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/4")}
								className="back-button">
								← Volver a Tema 4
							</button>
							<h3>Ejercicio: Web Components</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej04_Web_Components />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema4;
