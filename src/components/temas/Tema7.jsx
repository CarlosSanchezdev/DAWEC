/**
 * @fileoverview Componente para mostrar ejercicios del Tema 7
 * @fecha 11/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Importación diferida de ejercicios
const Ej01_Modelo_Eventos = lazy(() => import("../../ejercicios/tema7/Ej01_Modelo_Eventos"));
const Ej02_Eventos_React = lazy(() => import("../../ejercicios/tema7/Ej02_Eventos_React"));
const Ej03_Formularios_Basicos = lazy(() => import("../../ejercicios/tema7/Ej03_Formularios_Basicos"));
const Ej04_Formularios_Avanzados = lazy(() => import("../../ejercicios/tema7/Ej04_Formularios_Avanzados"));
const Ej05_Validacion_Formularios = lazy(() => import("../../ejercicios/tema7/Ej05_Validacion_Formularios"));

/**
 * @function Tema7
 * @description Componente que muestra los ejercicios del Tema 7: Interacción con el usuario, eventos y formularios
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema7() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "modelo-eventos",
			title: "Modelo de Eventos",
			path: "modelo-eventos",
			description: "Modelo de gestión de eventos, tipos y manejadores de eventos, closures",
		},
		{
			id: "eventos-react",
			title: "Eventos en React",
			path: "eventos-react",
			description: "Manejo de eventos en React, SyntheticEvent, captura y burbujeo",
		},
		{
			id: "formularios-basicos",
			title: "Formularios Básicos",
			path: "formularios-basicos",
			description: "Objetos y propiedades de formularios, acceso a miembros desde código",
		},
		{
			id: "formularios-avanzados",
			title: "Formularios Avanzados",
			path: "formularios-avanzados",
			description: "Formularios controlados vs no controlados, campos de archivo, modificación de apariencia",
		},
		{
			id: "validacion-formularios",
			title: "Validación de Formularios",
			path: "validacion-formularios",
			description: "Validación y envío, expresiones regulares, procesamiento de datos",
		},
	];

	return (
		<div className="tema-container dark-theme">
			<div className="tema-header">
				<button
					onClick={() => navigate("/temas")}
					className="back-button">
					← Volver a Temas
				</button>
				<h2>Tema 7: Interacción con el usuario, eventos y formularios</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Estos ejercicios cubren la interacción del usuario con aplicaciones web, incluyendo el
								modelo de eventos, gestión de eventos en React, formularios básicos y avanzados,
								validación y procesamiento de datos.
							</p>

							<div className="ejercicios-grid dark-theme">
								{ejercicios.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className="ejercicio-card dark-theme">
										<h3>{ejercicio.title}</h3>
										<p>{ejercicio.description}</p>
										<Link
											to={ejercicio.path}
											className="btn-ejercicio dark-theme">
											Ver ejercicio
										</Link>
									</div>
								))}
							</div>
						</div>
					}
				/>

				<Route
					path="/modelo-eventos"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/7")}
								className="back-button dark-theme">
								← Volver a Tema 7
							</button>
							<h3>Ejercicio: Modelo de Eventos</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej01_Modelo_Eventos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/eventos-react"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/7")}
								className="back-button dark-theme">
								← Volver a Tema 7
							</button>
							<h3>Ejercicio: Eventos en React</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej02_Eventos_React />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/formularios-basicos"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/7")}
								className="back-button dark-theme">
								← Volver a Tema 7
							</button>
							<h3>Ejercicio: Formularios Básicos</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej03_Formularios_Basicos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/formularios-avanzados"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/7")}
								className="back-button dark-theme">
								← Volver a Tema 7
							</button>
							<h3>Ejercicio: Formularios Avanzados</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej04_Formularios_Avanzados />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/validacion-formularios"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/7")}
								className="back-button dark-theme">
								← Volver a Tema 7
							</button>
							<h3>Ejercicio: Validación de Formularios</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej05_Validacion_Formularios />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema7;
