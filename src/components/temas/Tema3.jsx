/**
 * @fileoverview Componente para mostrar ejercicios del Tema 3: JavaScript Arrays, Funciones y Objetos
 * @fecha 12/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Importamos ejercicios del Tema 3 usando lazy loading
const Funciones = lazy(() => import("../../ejercicios/tema3/Ej01_Funciones/Ej01_Funciones"));
const Arrays = lazy(() => import("../../ejercicios/tema3/Ej02_Arrays/Ej02_Arrays"));
const POO = lazy(() => import("../../ejercicios/tema3/Ej03_POO/Ej03_POO"));
const PatronesDiseno = lazy(() => import("../../ejercicios/tema3/Ej04_Patrones_Diseno/Ej04_Patrones_Diseno"));

/**
 * @function Tema3
 * @description Componente que muestra los ejercicios del Tema 3: JavaScript Arrays, Funciones y Objetos
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema3() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "funciones",
			title: "Funciones en JavaScript",
			path: "funciones",
			description: "Ejercicio sobre definición, parámetros, retorno y tipos de funciones en JavaScript",
		},
		{
			id: "arrays",
			title: "Arrays y Matrices",
			path: "arrays",
			description: "Ejercicio sobre creación, manipulación y operaciones con arrays en JavaScript",
		},
		{
			id: "poo",
			title: "Programación Orientada a Objetos",
			path: "poo",
			description: "Ejercicio sobre clases, objetos, herencia y prototipos en JavaScript",
		},
		{
			id: "patrones-diseno",
			title: "Patrones de Diseño",
			path: "patrones-diseno",
			description: "Ejercicio sobre patrones Singleton, Factory, Strategy e Iterator en JavaScript",
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
				<h2>Tema 3: JavaScript Arrays, Funciones y Objetos</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Estos ejercicios cubren funciones, arrays, programación orientada a objetos y patrones
								de diseño en JavaScript.
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
					path="/funciones"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/3")}
								className="back-button">
								← Volver a Tema 3
							</button>
							<h3>Ejercicio: Funciones en JavaScript</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Funciones />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/arrays"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/3")}
								className="back-button">
								← Volver a Tema 3
							</button>
							<h3>Ejercicio: Arrays y Matrices</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Arrays />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/poo"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/3")}
								className="back-button">
								← Volver a Tema 3
							</button>
							<h3>Ejercicio: Programación Orientada a Objetos</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<POO />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/patrones-diseno"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/3")}
								className="back-button">
								← Volver a Tema 3
							</button>
							<h3>Ejercicio: Patrones de Diseño</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<PatronesDiseno />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema3;
