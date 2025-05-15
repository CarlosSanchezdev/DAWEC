/**
 * @fileoverview Componente principal que maneja la navegación entre temas y ejercicios
 * @fecha 11/05/2025
 */

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

// Importamos los componentes para cada tema (los crearemos después)
import Tema1 from "./components/temas/Tema1";
import Tema2 from "./components/temas/Tema2";
import Tema3 from "./components/temas/Tema3";
import Tema4 from "./components/temas/Tema4";
import Tema5 from "./components/temas/Tema5";
import Tema6 from "./components/temas/Tema6";
import Tema7 from "./components/temas/Tema7";
import Tema8 from "./components/temas/Tema8";
import Simulacros from "./components/temas/Simulacros";

/**
 * @function HomePage
 * @description Página de inicio con descripción general
 * @returns {JSX.Element} Componente de página de inicio
 */
function HomePage() {
	return (
		<div className="home-page">
			<h2>Bienvenido a los Ejercicios de DAWEC</h2>
			<p>
				Esta aplicación contiene ejercicios y ejemplos organizados por temas para ayudarte a preparar el examen
				de Desarrollo Web en Entorno Cliente.
			</p>

			<div className="features">
				<div className="feature-card">
					<h3>Temas</h3>
					<p>Ejercicios organizados por conceptos y técnicas clave.</p>
					<Link
						to="/temas"
						className="btn">
						Ver Temas
					</Link>
				</div>

				<div className="feature-card">
					<h3>Simulacros</h3>
					<p>Aplicaciones completas que integran múltiples conceptos.</p>
					<Link
						to="/simulacros"
						className="btn">
						Ver Simulacros
					</Link>
				</div>
			</div>
		</div>
	);
}

/**
 * @function TemasPage
 * @description Página que lista todos los temas disponibles
 * @returns {JSX.Element} Componente de listado de temas
 */
function TemasPage() {
	const temas = [
		{
			id: 1,
			title: "Selección y Manipulación de los Elementos del DOM",
			description: "Fundamentos de JavaScript para DOM",
		},
		{ id: 2, title: "Eventos y Formularios", description: "Manejo de eventos y validación de formularios" },
		{ id: 3, title: "APIs Gráficas y Multimedia", description: "Canvas, SVG y elementos multimedia" },
		{ id: 4, title: "Comunicación Asíncrona", description: "AJAX, Fetch y Promesas" },
		{ id: 5, title: "Bibliotecas y Frameworks: React", description: "Conceptos fundamentales de React" },
		{
			id: 6,
			title: "Componentes y Objetos Predefinidos",
			description: "Objetos nativos y del navegador, generación de elementos",
		},
		{
			id: 7,
			title: "Interacción con el usuario: eventos y formularios",
			description: "Modelo de eventos, eventos en React, formularios básicos y avanzados",
		},
		{
			id: 8,
			title: "Comunicación Asíncrona",
			description: "Mecanismos asíncronos, AJAX, Promesas, Fetch API, Async/Await",
		},
	];

	return (
		<div className="temas-page">
			<h2>Temas de DAWEC</h2>
			<p>Selecciona un tema para ver sus ejercicios:</p>

			<div className="temas-grid">
				{temas.map((tema) => (
					<div
						key={tema.id}
						className="tema-card">
						<h3>
							Tema {tema.id}: {tema.title}
						</h3>
						<p>{tema.description}</p>
						<Link
							to={`/tema/${tema.id}`}
							className="btn">
							Ver Ejercicios
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * @function App
 * @description Componente principal de la aplicación que maneja la navegación
 * @returns {JSX.Element} Componente App con navegación
 */
function App() {
	return (
		<Router>
			<div className="app-container">
				<header className="app-header">
					<div className="logo-container">
						<img
							src={reactLogo}
							className="logo react"
							alt="React logo"
						/>
						<h1>DAWEC - Ejercicios</h1>
					</div>
					<nav className="main-nav">
						<Link
							to="/"
							className="nav-link">
							Inicio
						</Link>
						<Link
							to="/temas"
							className="nav-link">
							Temas
						</Link>
						<Link
							to="/simulacros"
							className="nav-link">
							Simulacros
						</Link>
					</nav>
				</header>

				<main className="app-main">
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
						<Route
							path="/temas"
							element={<TemasPage />}
						/>
						<Route
							path="/tema/1/*"
							element={<Tema1 />}
						/>
						<Route
							path="/tema/2/*"
							element={<Tema2 />}
						/>
						<Route
							path="/tema/3/*"
							element={<Tema3 />}
						/>
						<Route
							path="/tema/4/*"
							element={<Tema4 />}
						/>
						<Route
							path="/tema/5/*"
							element={<Tema5 />}
						/>
						<Route
							path="/tema/6/*"
							element={<Tema6 />}
						/>
						<Route
							path="/tema/7/*"
							element={<Tema7 />}
						/>
						<Route
							path="/tema/8/*"
							element={<Tema8 />}
						/>
						<Route
							path="/simulacros/*"
							element={<Simulacros />}
						/>
						<Route
							path="*"
							element={
								<Navigate
									to="/"
									replace
								/>
							}
						/>
					</Routes>
				</main>

				<footer className="app-footer">
					<p>Desarrollo Web en Entorno Cliente - 2024/2025</p>
				</footer>
			</div>
		</Router>
	);
}

export default App;

