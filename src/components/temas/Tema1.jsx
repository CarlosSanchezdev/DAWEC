/**
 * @fileoverview Componente para mostrar los ejercicios del Tema 1
 * @fecha 11/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Importamos ejercicios del Tema 1 usando lazy loading
const ContadorApp = lazy(() => import("../../ejercicios/tema1/Ej02_Hooks_useState"));
// Más ejercicios se importarían de forma similar

/**
 * @function Tema1
 * @description Componente que muestra los ejercicios del Tema 1: Fundamentos de React
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema1() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "props",
			title: "Componentes y Props",
			path: "componentes-props",
			description: "Ejercicio sobre componentes funcionales y paso de props",
		},
		{
			id: "useState",
			title: "Estado con useState",
			path: "usestate",
			description: "Ejercicio sobre manejo de estado con el hook useState",
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
				<h2>Tema 1: Fundamentos de React</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Estos ejercicios cubren los fundamentos de React, incluyendo componentes, props y
								estado.
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
					path="/usestate"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/1")}
								className="back-button">
								← Volver a Tema 1
							</button>
							<h3>Ejercicio: Estado con useState</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<ContadorApp />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/componentes-props"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/1")}
								className="back-button">
								← Volver a Tema 1
							</button>
							<h3>Ejercicio: Componentes y Props</h3>
							<div className="placeholder-content">
								<p>Este ejercicio aún no ha sido implementado.</p>
								<p>Revisa el índice para ver los ejercicios disponibles.</p>
							</div>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema1;
