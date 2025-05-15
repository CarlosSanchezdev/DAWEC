/**
 * @fileoverview Componente para mostrar simulacros de examen
 * @fecha 13/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./Temas.css";

// Importación dinámica de simulacros
const Sim3_AVILESA = lazy(() => import("../../ejercicios/simulacros/sim3/AvilesaApp"));
const Sim4_IMC = lazy(() => import("../../ejercicios/simulacros/sim4/IMCApp"));
const Sim5_SPOTIFEX = lazy(() => import("../../ejercicios/simulacros/sim5/SpotifEx"));
const Sim6_TASKMASTER = lazy(() => import("../../ejercicios/simulacros/sim6/TaskMaster"));
const Sim7_MADERAVILES = lazy(() => import("../../ejercicios/simulacros/sim7/MaderAvilesApp"));
const Sim8_CONCESIONARIO = lazy(() => import("../../ejercicios/simulacros/sim8/ConcesionarioApp"));

/**
 * @function Simulacros
 * @description Componente que muestra los simulacros de examen disponibles
 * @returns {JSX.Element} Componente para navegar por los simulacros
 */
function Simulacros() {
	const navigate = useNavigate();
	// Lista de simulacros disponibles
	const simulacros = [
		{
			id: "concesionario",
			title: "Concesionario",
			path: "concesionario",
			description: "Sistema de gestión de vehículos con validaciones y estadísticas",
			status: "completado",
			evaluation: "Ejemplo examen 2ª evaluación",
			units: [
				"UT5: Bibliotecas y Frameworks: React",
				"UT6: Componentes y objetos predefinidos",
				"UT7: Interacción con el usuario: eventos y formularios",
				"UT8: Comunicación asíncrona",
			],
			concepts: [
				"React Context API",
				"Validación de formularios",
				"CRUD con API REST",
				"Componentes funcionales",
				"React Hooks",
				"Comunicación asíncrona",
				"Manejo de estado global",
				"Gestión de errores",
				"Cálculo de estadísticas",
			],
		},
		{
			id: "maderaviles",
			title: "MaderAvilés",
			path: "maderaviles",
			description:
				"Sistema de gestión para una carpintería que permite registrar pedidos y piezas de madera con sus medidas",
			status: "completado",
			evaluation: "Ejemplo examen 1ª evaluación",
			units: [
				"UT2: Sintaxis del lenguaje",
				"UT3: Arrays, funciones y objetos",
				"UT4: Modelo de objetos del documento (DOM)",
				"UT5: Manipulación de datos y validación",
			],
			concepts: [
				"JavaScript vanilla",
				"DOM",
				"LocalStorage",
				"Validación de formularios",
				"CRUD",
				"Clases y objetos",
				"Manejo de eventos",
				"Patrón MVC",
			],
		},
		{
			id: "lista-tareas",
			title: "Lista de Tareas",
			path: "lista-tareas",
			description: "Aplicación de lista de tareas con hooks, estado, efectos y contexto",
			status: "pendiente",
			units: ["Tema 5", "Tema 6", "Tema 7"],
			concepts: ["Hooks", "Estado", "Efectos", "Contexto"],
		},
		{
			id: "dashboard-datos",
			title: "Dashboard de Datos",
			path: "dashboard-datos",
			description: "Dashboard con fetching de datos, visualización, filtrado y gráficos",
			status: "pendiente",
			units: ["Tema 6", "Tema 7", "Tema 8"],
			concepts: ["Fetch API", "Async/Await", "Charts", "Filtros"],
		},
		{
			id: "avilesa",
			title: "AVILESA",
			path: "avilesa",
			description: "Sistema de gestión de líneas y paradas de autobuses",
			status: "completado",
			units: [
				"UT2: JavaScript Sintaxis básica",
				"UT3: Arrays, funciones y objetos",
				"UT4: Modelo de objetos del documento (DOM)",
			],
			concepts: [
				"Manipulación del DOM",
				"Clases y objetos",
				"Eventos y formularios",
				"LocalStorage",
				"Validación de datos",
			],
		},
		{
			id: "imc",
			title: "Calculadora IMC",
			path: "imc",
			description: "Aplicación para calcular el Índice de Masa Corporal",
			status: "completado",
			evaluation: "Ejemplo examen 1ª evaluación",
			units: [
				"UT2: JavaScript Sintaxis básica",
				"UT3: Arrays, funciones y objetos",
				"UT4: Modelo de objetos del documento (DOM)",
				"UT5: React",
			],
			concepts: [
				"Componentes funcionales en React",
				"Hooks (useState, useEffect)",
				"Clases y objetos",
				"Gestión de formularios",
				"LocalStorage",
				"Patrón Singleton",
				"Validación de datos",
			],
		},
		{
			id: "spotifex",
			title: "SpotifEx",
			path: "spotifex",
			description: "Aplicación para consultar datos de canciones de Spotify",
			status: "completado",
			evaluation: "Ejemplo examen 2ª evaluación",
			units: [
				"UT5: React",
				"UT6: Componentes y objetos predefinidos",
				"UT7: Interacción con el usuario, eventos y formularios",
				"UT8: Comunicación asíncrona",
			],
			concepts: [
				"Componentes funcionales en React",
				"Hooks (useState, useEffect, useMemo)",
				"Paso de props entre componentes",
				"Fetch API y async/await",
				"Gestión de formularios y eventos",
				"Renderizado condicional",
				"Manejo de listas y datos JSON",
			],
		},
		{
			id: "taskmaster",
			title: "TaskMaster",
			path: "taskmaster",
			description: "Sistema de gestión de proyectos y tareas con equipo de trabajo",
			status: "completado",
			evaluation: "Ejemplo examen 3ª evaluación",
			units: [
				"UT5: React",
				"UT6: Componentes y objetos predefinidos",
				"UT7: Interacción con el usuario, eventos y formularios",
				"UT8: Comunicación asíncrona",
			],
			concepts: [
				"Context API y patrón Reducer",
				"Hooks personalizados avanzados",
				"Almacenamiento persistente con localStorage",
				"Optimización de rendimiento con useMemo",
				"Formularios con validación",
				"Filtrado y ordenación de datos",
				"CSS modular y responsive design",
			],
		},
	];

	return (
		<div className="tema-container">
			<div className="tema-header">
				<button
					onClick={() => navigate("/")}
					className="back-button">
					← Volver a Inicio
				</button>
				<h2>Simulacros de Examen</h2>
			</div>{" "}
			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Simulacros que integran múltiples conceptos de las unidades temáticas para practicar
								situaciones de examen reales.
							</p>

							<div className="ejercicios-grid">
								{simulacros.map((simulacro) => (
									<div
										key={simulacro.id}
										className="ejercicio-card">
										{" "}
										<div className="ejercicio-header">
											<h3>{simulacro.title}</h3>
											<span className={`estado ${simulacro.status}`}>{simulacro.status}</span>
										</div>
										<p>{simulacro.description}</p>
										{simulacro.evaluation && (
											<div className="ejercicio-metadata evaluacion">
												<p>
													<strong>{simulacro.evaluation}</strong>
												</p>
											</div>
										)}
										{simulacro.units && (
											<div className="ejercicio-metadata">
												<h4>Unidades:</h4>
												<ul className="metadata-list">
													{simulacro.units.map((unit, index) => (
														<li key={index}>{unit}</li>
													))}
												</ul>
											</div>
										)}
										{simulacro.concepts && (
											<div className="ejercicio-metadata">
												<h4>Conceptos clave:</h4>
												<ul className="metadata-list">
													{simulacro.concepts.map((concept, index) => (
														<li key={index}>{concept}</li>
													))}
												</ul>
											</div>
										)}
										<Link
											to={simulacro.path}
											className="btn">
											Ver simulacro
										</Link>
									</div>
								))}
							</div>
						</div>
					}
				/>{" "}
				<Route
					path="/lista-tareas"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>Simulacro: Lista de Tareas</h3>
							<div className="ejercicio-content placeholder-content">
								<h3>Este simulacro está en desarrollo</h3>
								<p>
									Próximamente podrás practicar con un ejercicio completo de gestión de tareas usando
									React.
								</p>
							</div>
						</div>
					}
				/>
				<Route
					path="/dashboard-datos"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>Simulacro: Dashboard de Datos</h3>
							<div className="ejercicio-content placeholder-content">
								<h3>Este simulacro está en desarrollo</h3>
								<p>
									Próximamente podrás practicar con un ejercicio completo de visualización de datos.
								</p>
							</div>
						</div>
					}
				/>{" "}
				<Route
					path="/avilesa/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>Simulacro: AVILESA</h3>
							<Suspense fallback={<div className="loading">Cargando simulacro AVILESA...</div>}>
								<Sim3_AVILESA />
							</Suspense>{" "}
						</div>
					}
				/>
				<Route
					path="/imc/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>
								Simulacro: Calculadora IMC{" "}
								<span className="badge-evaluacion">Ejemplo 1ª Evaluación</span>
							</h3>
							<Suspense fallback={<div className="loading">Cargando calculadora IMC...</div>}>
								<Sim4_IMC />
							</Suspense>
						</div>
					}
				/>{" "}
				<Route
					path="/maderaviles/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>
								Simulacro: MaderAvilés <span className="badge-evaluacion">Ejemplo 1ª Evaluación</span>
							</h3>
							<Suspense fallback={<div className="loading">Cargando simulacro MaderAvilés...</div>}>
								<Sim7_MADERAVILES />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/spotifex/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>
								Simulacro: SpotifEx <span className="badge-evaluacion">Ejemplo 2ª Evaluación</span>
							</h3>
							<Suspense fallback={<div className="loading">Cargando SpotifEx...</div>}>
								<Sim5_SPOTIFEX />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/taskmaster/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>
								Simulacro: TaskMaster <span className="badge-evaluacion">Ejemplo 3ª Evaluación</span>
							</h3>
							<Suspense fallback={<div className="loading">Cargando TaskMaster...</div>}>
								<Sim6_TASKMASTER />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/concesionario/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/simulacros")}
								className="back-button">
								← Volver a Simulacros
							</button>
							<h3>
								Simulacro: Gestión de Concesionario{" "}
								<span className="badge-evaluacion">Ejemplo 2ª Evaluación</span>
							</h3>
							<Suspense fallback={<div className="loading">Cargando simulacro de concesionario...</div>}>
								<Sim8_CONCESIONARIO />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Simulacros;
