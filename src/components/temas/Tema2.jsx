/**
 * @fileoverview Componente para mostrar ejercicios del Tema 2: JavaScript Sintaxis Básica
 * @fecha 14/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Importamos ejercicios del Tema 2 usando lazy loading
const SintaxisBasica = lazy(() => import("../../ejercicios/tema2/Ej01_Sintaxis_Basica/Ej01_Sintaxis_Basica"));
const VariablesTipos = lazy(() => import("../../ejercicios/tema2/Ej02_Variables_Tipos/Ej02_Variables_Tipos"));
const OperadoresEstructuras = lazy(() =>
	import("../../ejercicios/tema2/Ej03_Operadores_Estructuras/Ej03_Operadores_Estructuras")
);
const BuclesControl = lazy(() => import("../../ejercicios/tema2/Ej04_Bucles_Control/Ej04_Bucles_Control"));
const EjerciciosTema2 = lazy(() => import("../../ejercicios/tema2/ejercicios/EjerciciosTema2"));
const EjerciciosAvanzados = lazy(() => import("../../ejercicios/tema2/ejerciciosAvanzados/EjerciciosAvanzados"));
const EjerciciosBasicos = lazy(() => import("../../ejercicios/tema2/ejercicios-basicos/EjerciciosBasicos"));

/**
 * @function Tema2
 * @description Componente que muestra los ejercicios del Tema 2: JavaScript Sintaxis Básica
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema2() {
	const navigate = useNavigate();
	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "javascript-basic",
			title: "JavaScript Básico: 30 Ejercicios",
			path: "ejercicios",
			description: "Colección interactiva de 30 ejercicios que cubren los fundamentos de JavaScript",
			isActividad: true,
			estado: "completado",
			totalEjercicios: 30,
			completados: 30,
			temas: [
				"Sintaxis básica",
				"Variables y tipos",
				"Operadores",
				"Estructuras de control",
				"Bucles",
				"Manejo de errores",
				"Eventos",
				"Expresiones regulares",
				"Características ES6+",
				"Depuración",
			],
			tecnologias: ["JavaScript", "React", "CSS Modules"],
			objetivos: [
				"Comprender la sintaxis básica de JavaScript",
				"Practicar con tipos de datos y variables",
				"Explorar operadores y estructuras de control",
				"Implementar bucles y control de flujo",
				"Manejar errores y eventos",
				"Utilizar características modernas de ES6+",
				"Aprender técnicas de depuración",
			],
		},
		{
			id: "javascript-basic-2",
			title: "Básicos 2.0: JavaScript Fundamentals",
			path: "ejercicios-basicos",
			description: "Colección completa de 55 ejercicios prácticos que cubren los fundamentos de JavaScript",
			isActividad: true,
			estado: "disponible",
			totalEjercicios: 55,
			completados: 0,
			temas: [
				"Variables y tipos de datos",
				"Operadores y expresiones",
				"Estructuras de control",
				"Bucles y ciclos",
				"Funciones y ámbito",
				"Arrays y objetos básicos",
				"Métodos de conversión",
				"Validación de datos",
				"Cálculos y algoritmos",
				"Ejercicios interactivos",
			],
			tecnologias: ["JavaScript", "Lógica de programación"],
			objetivos: [
				"Dominar la sintaxis básica de JavaScript",
				"Practicar operaciones y cálculos",
				"Implementar algoritmos sencillos",
				"Trabajar con estructuras de control",
				"Manipular diferentes tipos de datos",
				"Resolver problemas prácticos",
				"Validar entradas de usuario",
			],
		},
		{
			id: "javascript-advanced",
			title: "JavaScript Avanzado: Conceptos Modernos",
			path: "ejercicios-avanzados",
			description: "Módulo especial enfocado en características modernas y patrones avanzados de JavaScript",
			isActividad: true,
			estado: "disponible",
			totalEjercicios: 20,
			completados: 0,
			temas: [
				"Promesas y Async/Await",
				"Generadores e Iteradores",
				"Módulos ES6",
				"Patrones de Diseño",
				"Programación Funcional",
				"APIs Web Modernas",
				"Testing y Depuración Avanzada",
				"Optimización y Rendimiento",
			],
			tecnologias: ["JavaScript ES6+", "React", "Jest", "TypeScript"],
			objetivos: [
				"Dominar la programación asíncrona moderna",
				"Implementar patrones de diseño avanzados",
				"Trabajar con APIs web modernas",
				"Escribir código testeable y mantenible",
				"Optimizar el rendimiento de aplicaciones",
				"Utilizar características de ES6+ efectivamente",
			],
		},
		{
			id: "sintaxis-basica",
			title: "Sintaxis Básica de JavaScript",
			path: "sintaxis-basica",
			description: "Ejercicio sobre la sintaxis básica, comentarios y bloques de código en JavaScript",
		},
		{
			id: "variables-tipos",
			title: "Variables y Tipos de Datos",
			path: "variables-tipos",
			description: "Ejercicio sobre declaración de variables, tipos de datos y conversiones en JavaScript",
		},
		{
			id: "operadores-estructuras",
			title: "Operadores y Estructuras Condicionales",
			path: "operadores-estructuras",
			description: "Ejercicio sobre operadores y estructuras condicionales en JavaScript",
		},
		{
			id: "bucles-control",
			title: "Bucles y Control de Flujo",
			path: "bucles-control",
			description: "Ejercicio sobre bucles y estructuras de control de flujo en JavaScript",
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
				<h2>Tema 2: JavaScript Sintaxis Básica</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Este tema cubre la sintaxis básica de JavaScript, incluyendo variables, tipos de datos,
								operadores, estructuras de control, bucles, manejo de errores, eventos y características
								modernas del lenguaje. La sección principal contiene una colección completa de 30
								ejercicios interactivos.
							</p>
							<div className="ejercicios-grid">
								{ejercicios.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className={
											ejercicio.isActividad ? "ejercicio-card actividad" : "ejercicio-card"
										}>
										{ejercicio.isActividad ? (
											<>
												<div className="ejercicio-header">
													<h3>{ejercicio.title}</h3>
													<div className="progreso">
														<div className="progreso-texto">
															{ejercicio.completados} / {ejercicio.totalEjercicios}
														</div>
														<div className="progreso-barra">
															<div
																className="progreso-completado"
																style={{
																	width: `${
																		(ejercicio.completados /
																			ejercicio.totalEjercicios) *
																		100
																	}%`,
																}}></div>
														</div>
													</div>
												</div>
												<p className="description">{ejercicio.description}</p>
												<div className="temas-container">
													<h4>Temas cubiertos:</h4>
													<div className="temas-grid">
														{ejercicio.temas.map((tema, index) => (
															<span
																key={index}
																className="tema-tag">
																{tema}
															</span>
														))}
													</div>
												</div>
												<Link
													to={ejercicio.path}
													className="btn-acceder">
													Acceder a los ejercicios
												</Link>
											</>
										) : (
											<>
												<h3>{ejercicio.title}</h3>
												<p>{ejercicio.description}</p>
												<Link
													to={ejercicio.path}
													className="btn">
													Ver ejercicio
												</Link>
											</>
										)}
									</div>
								))}{" "}
							</div>
						</div>
					}
				/>

				<Route
					path="ejercicios/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<Suspense fallback={<div className="loading">Cargando ejercicios...</div>}>
								<EjerciciosTema2 />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="ejercicios-basicos/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<Suspense fallback={<div className="loading">Cargando ejercicios básicos...</div>}>
								<EjerciciosBasicos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="ejercicios-avanzados/*"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<Suspense fallback={<div className="loading">Cargando ejercicios...</div>}>
								<EjerciciosAvanzados />
							</Suspense>
						</div>
					}
				/>

				{/* Rutas para los ejercicios individuales */}
				<Route
					path="/sintaxis-basica"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<h3>Ejercicio: Sintaxis Básica de JavaScript</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<SintaxisBasica />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/variables-tipos"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<h3>Ejercicio: Variables y Tipos de Datos</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<VariablesTipos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/operadores-estructuras"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<h3>Ejercicio: Operadores y Estructuras Condicionales</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<OperadoresEstructuras />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/bucles-control"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/2")}
								className="back-button">
								← Volver a Tema 2
							</button>
							<h3>Ejercicio: Bucles y Control de Flujo</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<BuclesControl />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema2;
