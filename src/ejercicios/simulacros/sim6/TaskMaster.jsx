/**
 * @fileoverview Componente principal de TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import React, { useState, useEffect } from "react";
import { TaskMasterProvider } from "./context/TaskMasterContext.jsx";
import Navigation from "./components/Navigation";
import Statistics from "./components/Statistics";
import ProjectsList from "./components/ProjectsList";
import "./TaskMaster.css";

/**
 * @function TaskMaster
 * @description Componente principal que gestiona la aplicación TaskMaster
 * @returns {JSX.Element} Componente principal de la aplicación
 *
 * IMPORTANTE: Este componente es un ejemplo avanzado que integra:
 * - Context API para gestión de estado global
 * - Hooks personalizados
 * - Almacenamiento persistente con localStorage
 * - Filtrado y ordenación de datos
 * - Renderizado condicional avanzado
 * - Optimización de rendimiento con useMemo
 */
function TaskMaster() {
	// ===== HOOKS =====
	const [activeSection, setActiveSection] = useState("dashboard");
	const [pageTitle, setPageTitle] = useState("Dashboard");

	// ===== EFECTOS =====
	/**
	 * Actualiza el título de la página cuando cambia la sección activa
	 */
	useEffect(() => {
		// Establecer el título según la sección
		switch (activeSection) {
			case "dashboard":
				setPageTitle("Dashboard");
				break;
			case "projects":
				setPageTitle("Proyectos");
				break;
			case "tasks":
				setPageTitle("Tareas");
				break;
			case "team":
				setPageTitle("Equipo");
				break;
			case "statistics":
				setPageTitle("Estadísticas");
				break;
			default:
				setPageTitle("TaskMaster");
		}
	}, [activeSection]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function renderContent
	 * @description Renderiza el contenido según la sección activa
	 * @returns {JSX.Element} Contenido de la sección actual
	 */
	const renderContent = () => {
		switch (activeSection) {
			case "dashboard":
				return (
					<div className="dashboard-container">
						<div className="welcome-banner">
							<h2>Bienvenido a TaskMaster</h2>
							<p>Gestiona tus proyectos y tareas de manera eficiente</p>
						</div>

						<div className="dashboard-overview">
							<p>TaskMaster es una aplicación para la gestión de proyectos que te permite:</p>
							<ul>
								<li>Organizar tus proyectos y tareas</li>
								<li>Asignar responsabilidades a miembros del equipo</li>
								<li>Dar seguimiento al progreso</li>
								<li>Visualizar estadísticas relevantes</li>
							</ul>
							<p>Este simulacro demuestra conceptos avanzados de React como:</p>
							<ul>
								<li>Context API para gestión de estado global</li>
								<li>Hooks personalizados para lógica reutilizable</li>
								<li>Optimización de rendimiento</li>
								<li>Formularios con validación</li>
								<li>Almacenamiento persistente</li>
							</ul>
						</div>

						<div className="dashboard-actions">
							<button
								className="btn btn-primary"
								onClick={() => setActiveSection("projects")}>
								Ver Proyectos
							</button>
							<button
								className="btn btn-secondary"
								onClick={() => setActiveSection("statistics")}>
								Ver Estadísticas
							</button>
						</div>
					</div>
				);

			case "projects":
				return <ProjectsList />;

			case "tasks":
				return (
					<div className="placeholder-content">
						<h2>Gestión de Tareas</h2>
						<p>
							Aquí se implementaría la gestión de tareas con funcionalidades similares a la gestión de
							proyectos.
						</p>
						<p>Características que incluiría:</p>
						<ul>
							<li>Listado de tareas con filtros</li>
							<li>Formulario para crear/editar tareas</li>
							<li>Asignación de tareas a miembros</li>
							<li>Cambio de estado de las tareas</li>
							<li>Vista de detalles de tarea</li>
						</ul>
					</div>
				);

			case "team":
				return (
					<div className="placeholder-content">
						<h2>Gestión de Equipo</h2>
						<p>Aquí se implementaría la gestión del equipo de trabajo.</p>
						<p>Características que incluiría:</p>
						<ul>
							<li>Listado de miembros del equipo</li>
							<li>Formulario para añadir/editar miembros</li>
							<li>Asignación de roles</li>
							<li>Vista de carga de trabajo por miembro</li>
							<li>Estadísticas de desempeño</li>
						</ul>
					</div>
				);

			case "statistics":
				return <Statistics />;

			default:
				return <div>Sección no encontrada</div>;
		}
	};

	// ===== RENDER =====
	return (
		<TaskMasterProvider>
			<div className="taskmaster-app">
				<Navigation
					onNavigate={setActiveSection}
					activeSection={activeSection}
				/>

				<main className="app-content">
					<header className="content-header">
						<h1>{pageTitle}</h1>
						<div className="header-actions">
							<button className="btn btn-outline">
								<span className="icon">🔔</span>
							</button>
							<button className="btn btn-outline">
								<span className="icon">⚙️</span>
							</button>
						</div>
					</header>

					<div className="content-container">{renderContent()}</div>

					<footer className="app-footer">
						<p>&copy; 2025 TaskMaster - Ejemplo de Simulacro 6 (3ª Evaluación)</p>
					</footer>
				</main>
			</div>
		</TaskMasterProvider>
	);
}

export default TaskMaster;
