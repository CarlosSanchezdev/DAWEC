/**
 * @fileoverview Componente para mostrar ejercicios del Tema 8
 * @fecha 11/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ListadoNotas from "../../ejercicios/tema8/EjercicioCompleto/ListadoNotas";

// Importación diferida de ejercicios
const Ej01_Mecanismos_Asincronos = lazy(() => import("../../ejercicios/tema8/Ej01_Mecanismos_Asincronos"));
const Ej02_AJAX_XMLHttpRequest = lazy(() => import("../../ejercicios/tema8/Ej02_AJAX_XMLHttpRequest"));
const Ej03_Promesas = lazy(() => import("../../ejercicios/tema8/Ej03_Promesas"));
const Ej04_Fetch_API = lazy(() => import("../../ejercicios/tema8/Ej04_Fetch_API"));
const Ej05_Async_Await = lazy(() => import("../../ejercicios/tema8/Ej05_Async_Await"));

/**
 * @function Tema8
 * @description Componente que muestra los ejercicios del Tema 8: Comunicación Asíncrona
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema8() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "mecanismos-asincronos",
			title: "Mecanismos Asíncronos",
			path: "mecanismos-asincronos",
			description: "Bucle de eventos, pila de ejecución, callbacks, event loop",
		},
		{
			id: "ajax-xmlhttprequest",
			title: "AJAX y XMLHttpRequest",
			path: "ajax-xmlhttprequest",
			description: "Solicitudes AJAX, objeto XMLHttpRequest, respuestas XML/JSON",
		},
		{
			id: "promesas",
			title: "Promesas",
			path: "promesas",
			description: "Concepto de Promesas, encadenamiento, gestión de errores",
		},
		{
			id: "fetch-api",
			title: "Fetch API",
			path: "fetch-api",
			description: "Uso de la API Fetch, peticiones y respuestas, headers",
		},
		{
			id: "async-await",
			title: "Async/Await",
			path: "async-await",
			description: "Funciones asíncronas, manejo de errores, paralelismo",
		},
		{
			id: "ejercicio-completo",
			title: "Ejercicio Completo",
			path: "ejercicio-completo",
			description: "Aplicación de los conceptos aprendidos en un ejercicio completo",
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
				<h2>Tema 8: Comunicación Asíncrona</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Estos ejercicios cubren los mecanismos de comunicación asíncrona en JavaScript,
								incluyendo el bucle de eventos, AJAX, Promesas, Fetch API y Async/Await. Aprenderás cómo
								realizar comunicaciones con servidores y gestionar operaciones que no bloquean la
								ejecución principal.
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
				/>{" "}
				<Route
					path="/mecanismos-asincronos"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio: Mecanismos Asíncronos</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej01_Mecanismos_Asincronos />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/ajax-xmlhttprequest"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio: AJAX y XMLHttpRequest</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej02_AJAX_XMLHttpRequest />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/promesas"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio: Promesas</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej03_Promesas />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/fetch-api"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio: Fetch API</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej04_Fetch_API />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/async-await"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio: Async/Await</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<Ej05_Async_Await />
							</Suspense>
						</div>
					}
				/>
				<Route
					path="/ejercicio-completo"
					element={
						<div className="ejercicio-container dark-theme">
							<button
								onClick={() => navigate("/tema/8")}
								className="back-button dark-theme">
								← Volver a Tema 8
							</button>
							<h3>Ejercicio Completo</h3>
							<Suspense fallback={<div className="loading dark-theme">Cargando ejercicio...</div>}>
								<ListadoNotas />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema8;
