/**
 * @fileoverview Componente para mostrar ejercicios del Tema 6
 * @fecha 11/05/2025
 */

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Importación diferida de ejercicios
const Ej01_Objetos_Nativos = lazy(() => import("../../ejercicios/tema6/Ej01_Objetos_Nativos.jsx"));
const Ej02_Objetos_Navegador = lazy(() => import("../../ejercicios/tema6/Ej02_Objetos_Navegador.jsx"));
const Ej03_Generacion_Elementos = lazy(() => import("../../ejercicios/tema6/Ej03_Generacion_Elementos.jsx"));
const Ej04_Ventanas_Router = lazy(() => import("../../ejercicios/tema6/Ej04_Ventanas_Router.jsx"));
const Ej05_Estilos_MaterialUI = lazy(() => import("../../ejercicios/tema6/Ej05_Estilos_MaterialUI.jsx"));
const Ej06_Reducers_Context = lazy(() => import("../../ejercicios/tema6/Ej06_Reducers_Context.jsx"));
const Ej07_Almacenamiento_Navegador = lazy(() => import("../../ejercicios/tema6/Ej07_Almacenamiento_Navegador.jsx"));
const Ej08_Depuracion_Documentacion = lazy(() => import("../../ejercicios/tema6/Ej08_Depuracion_Documentacion.jsx"));

/**
 * @function Tema6
 * @description Componente que muestra los ejercicios del Tema 6: Componentes y Objetos Predefinidos
 * @returns {JSX.Element} Componente para navegar por los ejercicios del tema
 */
function Tema6() {
	const navigate = useNavigate();

	// Lista de ejercicios disponibles en este tema
	const ejercicios = [
		{
			id: "objetos-nativos",
			title: "Objetos Nativos",
			path: "objetos-nativos",
			description: "Date, Math y otros objetos nativos de JavaScript",
		},
		{
			id: "objetos-navegador",
			title: "Objetos del Navegador",
			path: "objetos-navegador",
			description: "Window, location, history, navigator y temporizadores",
		},
		{
			id: "generacion-elementos",
			title: "Generación de Elementos",
			path: "generacion-elementos",
			description: "Generación de texto y elementos HTML desde código, listas en React",
		},
		{
			id: "ventanas-router",
			title: "Ventanas y React Router",
			path: "ventanas-router",
			description: "Creación de ventanas en JS y navegación con React Router",
		},
		{
			id: "estilos-materialui",
			title: "Estilos y Material-UI",
			path: "estilos-materialui",
			description: "Gestión de apariencia, estilos en React y uso de Material-UI",
		},
		{
			id: "reducers-context",
			title: "Reducers y Context",
			path: "reducers-context",
			description: "Gestión de estado con reducers y uso de React Context",
		},
		{
			id: "almacenamiento-navegador",
			title: "Almacenamiento en Navegador",
			path: "almacenamiento-navegador",
			description: "Cookies, localStorage, sessionStorage y otras técnicas",
		},
		{
			id: "depuracion-documentacion",
			title: "Depuración y Documentación",
			path: "depuracion-documentacion",
			description: "Técnicas de depuración y documentación del código",
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
				<h2>Tema 6: Componentes y Objetos Predefinidos</h2>
			</div>

			<Routes>
				<Route
					path="/"
					element={
						<div className="ejercicios-list">
							<p className="tema-description">
								Ejercicios sobre Componentes y Objetos Predefinidos en JavaScript y React. Esta unidad
								explora objetos nativos, interacción con el navegador, generación de elementos,
								ventanas, estilos, gestión de estado, almacenamiento y depuración.
							</p>

							<div className="ejercicios-grid">
								{ejercicios.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className="ejercicio-card">
										<h3>{ejercicio.title}</h3>
										<p>{ejercicio.description}</p>{" "}
										<Link
											to={ejercicio.path}
											className="btn-ejercicio">
											Ver ejercicio
										</Link>
									</div>
								))}
							</div>
						</div>
					}
				/>

				<Route
					path="/objetos-nativos"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Objetos Nativos</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej01_Objetos_Nativos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/objetos-navegador"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Objetos del Navegador</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej02_Objetos_Navegador />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/generacion-elementos"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Generación de Elementos</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej03_Generacion_Elementos />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/ventanas-router"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Ventanas y React Router</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej04_Ventanas_Router />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/estilos-materialui"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Estilos y Material-UI</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej05_Estilos_MaterialUI />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/reducers-context"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Reducers y Context</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej06_Reducers_Context />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/almacenamiento-navegador"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Almacenamiento en Navegador</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej07_Almacenamiento_Navegador />
							</Suspense>
						</div>
					}
				/>

				<Route
					path="/depuracion-documentacion"
					element={
						<div className="ejercicio-container">
							<button
								onClick={() => navigate("/tema/6")}
								className="back-button">
								← Volver a Tema 6
							</button>
							<h3>Ejercicio: Depuración y Documentación</h3>
							<Suspense fallback={<div className="loading">Cargando ejercicio...</div>}>
								<Ej08_Depuracion_Documentacion />
							</Suspense>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default Tema6;
