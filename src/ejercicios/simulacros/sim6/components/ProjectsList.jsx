/**
 * @fileoverview Componente que lista y gestiona los proyectos en TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import { useState, useContext } from "react";
import { TaskMasterContext } from "../context/TaskMasterContext.jsx";
import ProjectForm from "./ProjectForm";
import useDataFilter from "../hooks/useDataFilter";
import "./ProjectsList.css";

/**
 * @function ProjectsList
 * @description Componente que muestra el listado de proyectos y permite su gestión
 * @returns {JSX.Element} Componente de listado de proyectos
 */
function ProjectsList() {
	// ===== HOOKS =====
	const { state, dispatch } = useContext(TaskMasterContext);
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [editingProject, setEditingProject] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [sortBy, setSortBy] = useState("name");

	// Obtener proyectos (o utilizar datos de ejemplo si aún no hay)
	const projects = state.projects || [
		{
			id: 1,
			name: "Rediseño de sitio web",
			description: "Actualizar el diseño y la experiencia de usuario del sitio web corporativo",
			startDate: "2025-03-15",
			dueDate: "2025-06-30",
			status: "in-progress",
			priority: "high",
			teamMembers: [1, 3, 4],
		},
		{
			id: 2,
			name: "Aplicación móvil",
			description: "Desarrollo de una aplicación móvil para clientes",
			startDate: "2025-02-01",
			dueDate: "2025-09-30",
			status: "planning",
			priority: "medium",
			teamMembers: [2, 5],
		},
		{
			id: 3,
			name: "Migración a la nube",
			description: "Migrar los servicios actuales a una infraestructura en la nube",
			startDate: "2025-01-10",
			dueDate: "2025-04-30",
			status: "completed",
			priority: "high",
			teamMembers: [1, 2, 3],
		},
		{
			id: 4,
			name: "Campaña de marketing",
			description: "Planificación y ejecución de la campaña de marketing Q2",
			startDate: "2025-04-01",
			dueDate: "2025-06-30",
			status: "in-progress",
			priority: "medium",
			teamMembers: [4, 5],
		},
		{
			id: 5,
			name: "Automatización de procesos",
			description: "Implementar herramientas para automatizar procesos internos",
			startDate: "2025-05-15",
			dueDate: "2025-08-30",
			status: "planning",
			priority: "low",
			teamMembers: [2, 3],
		},
	];

	// ===== HOOKS PERSONALIZADOS =====
	// Utilizamos nuestro hook personalizado para filtrar y ordenar los datos
	const { filteredData } = useDataFilter(
		projects,
		searchTerm,
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase()),
		filterStatus !== "all" ? (item) => item.status === filterStatus : null,
		(a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "date":
					return new Date(a.dueDate) - new Date(b.dueDate);
				case "priority": {
					const priorityOrder = { high: 1, medium: 2, low: 3 };
					return priorityOrder[a.priority] - priorityOrder[b.priority];
				}
				default:
					return 0;
			}
		}
	);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function handleAddProject
	 * @description Muestra el formulario para añadir un nuevo proyecto
	 */
	const handleAddProject = () => {
		setEditingProject(null);
		setIsFormVisible(true);
	};

	/**
	 * @function handleEditProject
	 * @description Muestra el formulario para editar un proyecto existente
	 * @param {Object} project - Proyecto a editar
	 */
	const handleEditProject = (project) => {
		setEditingProject(project);
		setIsFormVisible(true);
	};

	/**
	 * @function handleDeleteProject
	 * @description Elimina un proyecto
	 * @param {number} projectId - ID del proyecto a eliminar
	 */
	const handleDeleteProject = (projectId) => {
		if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
			dispatch({
				type: "DELETE_PROJECT",
				payload: projectId,
			});
		}
	};

	/**
	 * @function handleFormSubmit
	 * @description Gestiona el envío del formulario de proyecto (nuevo o edición)
	 * @param {Object} projectData - Datos del proyecto
	 */
	const handleFormSubmit = (projectData) => {
		if (editingProject) {
			dispatch({
				type: "UPDATE_PROJECT",
				payload: {
					...projectData,
					id: editingProject.id,
				},
			});
		} else {
			dispatch({
				type: "ADD_PROJECT",
				payload: {
					...projectData,
					id: Date.now(), // Generar ID único
				},
			});
		}
		setIsFormVisible(false);
	};

	/**
	 * @function getStatusText
	 * @description Devuelve un texto legible para el estado del proyecto
	 * @param {string} status - Estado del proyecto
	 * @returns {string} Texto formateado del estado
	 */
	const getStatusText = (status) => {
		switch (status) {
			case "planning":
				return "Planificación";
			case "in-progress":
				return "En progreso";
			case "on-hold":
				return "En pausa";
			case "completed":
				return "Completado";
			default:
				return status;
		}
	};

	/**
	 * @function getPriorityText
	 * @description Devuelve un texto legible para la prioridad del proyecto
	 * @param {string} priority - Prioridad del proyecto
	 * @returns {string} Texto formateado de la prioridad
	 */
	const getPriorityText = (priority) => {
		switch (priority) {
			case "low":
				return "Baja";
			case "medium":
				return "Media";
			case "high":
				return "Alta";
			default:
				return priority;
		}
	};

	// ===== RENDER =====
	return (
		<div className="projects-container">
			{isFormVisible ? (
				<ProjectForm
					project={editingProject}
					onSubmit={handleFormSubmit}
					onCancel={() => setIsFormVisible(false)}
				/>
			) : (
				<>
					<div className="projects-header">
						<div className="search-filter-container">
							<div className="search-box">
								<input
									type="text"
									placeholder="Buscar proyectos..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							<div className="filter-controls">
								<div className="filter-group">
									<label>Estado:</label>
									<select
										value={filterStatus}
										onChange={(e) => setFilterStatus(e.target.value)}>
										<option value="all">Todos</option>
										<option value="planning">Planificación</option>
										<option value="in-progress">En progreso</option>
										<option value="on-hold">En pausa</option>
										<option value="completed">Completado</option>
									</select>
								</div>

								<div className="filter-group">
									<label>Ordenar por:</label>
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}>
										<option value="name">Nombre</option>
										<option value="date">Fecha límite</option>
										<option value="priority">Prioridad</option>
									</select>
								</div>
							</div>
						</div>

						<button
							className="btn btn-primary"
							onClick={handleAddProject}>
							Nuevo Proyecto
						</button>
					</div>

					<div className="projects-list">
						{filteredData.length === 0 ? (
							<div className="no-results">
								<p>No se encontraron proyectos que coincidan con tu búsqueda.</p>
							</div>
						) : (
							filteredData.map((project) => (
								<div
									key={project.id}
									className={`project-card status-${project.status}`}>
									<div className="project-header">
										<h3>{project.name}</h3>
										<div className="project-badges">
											<span className={`badge status-${project.status}`}>
												{getStatusText(project.status)}
											</span>
											<span className={`badge priority-${project.priority}`}>
												{getPriorityText(project.priority)}
											</span>
										</div>
									</div>

									<p className="project-description">{project.description}</p>

									<div className="project-dates">
										<div className="date-group">
											<label>Inicio:</label>
											<span>{new Date(project.startDate).toLocaleDateString()}</span>
										</div>
										<div className="date-group">
											<label>Límite:</label>
											<span>{new Date(project.dueDate).toLocaleDateString()}</span>
										</div>
									</div>

									<div className="project-team">
										<label>Equipo:</label>
										<div className="team-members">
											{project.teamMembers.map((memberId) => (
												<div
													key={memberId}
													className="team-member-avatar">
													{memberId}
												</div>
											))}
										</div>
									</div>

									<div className="project-actions">
										<button
											className="btn btn-sm btn-outline"
											onClick={() => handleEditProject(project)}>
											Editar
										</button>
										<button
											className="btn btn-sm btn-danger"
											onClick={() => handleDeleteProject(project.id)}>
											Eliminar
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default ProjectsList;
