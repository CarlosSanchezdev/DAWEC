/**
 * @fileoverview Componente para mostrar ejercicios del Tema 5
 * @fecha 11/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Importación diferida de ejercicios
const Ej01_Introduccion_React = lazy(() => import("../../ejercicios/tema5/Ej01_Introduccion_React"));
const Ej02_Componentes_JSX = lazy(() => import("../../ejercicios/tema5/Ej02_Componentes_JSX"));
const Ej03_Props_Estado = lazy(() => import("../../ejercicios/tema5/Ej03_Props_Estado"));
const Ej04_Renderizado_Condicional = lazy(() => import("../../ejercicios/tema5/Ej04_Renderizado_Condicional"));
const Ej05_Visor_Imagenes = lazy(() => import("../../ejercicios/tema5/Ej05_Visor_Imagenes"));

/**
 * @function Tema5
 * @description Componente que muestra los ejercicios del Tema 5: Bibliotecas y Frameworks - React
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema5() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "intro-react",
			title: "Introducción a React",
			path: "introduccion-react",
			description: "Conceptos fundamentales de React: componentes, Virtual DOM, JSX y hooks básicos",
		},
		{
			id: "componentes-jsx",
			title: "Componentes y JSX",
			path: "componentes-jsx",
			description: "Sintaxis JSX, componentes, variables, comentarios y bucles en React",
		},
		{
			id: "props-estado",
			title: "Props y Estado",
			path: "props-estado",
			description: "Comunicación entre componentes con props y manejo de estado con useState",
		},
		{
			id: "renderizado-condicional",
			title: "Renderizado Condicional",
			path: "renderizado-condicional",
			description: "Técnicas para mostrar elementos de forma condicional en React",
		},
		{
			id: "visor-imagenes",
			title: "Visor de Imágenes",
			path: "visor-imagenes",
			description: "Aplicación práctica que combina varios conceptos de React",
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
				<h2>Tema 5: Bibliotecas y Frameworks - React</h2>
			</div>

			<Routes>
				{" "}
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Estos ejercicios cubren los fundamentos de React, incluyendo JSX, componentes, props,
								estado, renderizado condicional y ejemplos de aplicación.
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
					path="/introduccion-react"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/5")}
								className="back-button">
								← Volver a Tema 5
							</button>
							<h3>Ejercicio: Introducción a React</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej01_Introduccion_React />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/componentes-jsx"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/5")}
								className="back-button">
								← Volver a Tema 5
							</button>
							<h3>Ejercicio: Componentes y JSX</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej02_Componentes_JSX />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/props-estado"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/5")}
								className="back-button">
								← Volver a Tema 5
							</button>
							<h3>Ejercicio: Props y Estado</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej03_Props_Estado />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/renderizado-condicional"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/5")}
								className="back-button">
								← Volver a Tema 5
							</button>
							<h3>Ejercicio: Renderizado Condicional</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej04_Renderizado_Condicional />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/visor-imagenes"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/5")}
								className="back-button">
								← Volver a Tema 5
							</button>
							<h3>Ejercicio: Visor de Imágenes</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej05_Visor_Imagenes />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema5;
