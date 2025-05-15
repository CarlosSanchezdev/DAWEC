/**
 * @fileoverview Componente de estadísticas para TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import React, { useContext, useMemo } from "react";
import { TaskMasterContext } from "../context/TaskMasterContext.jsx";
import "./Statistics.css";

/**
 * @function Statistics
 * @description Componente que muestra estadísticas de proyectos y tareas
 * @returns {JSX.Element} Componente de estadísticas
 */
function Statistics() {
	// ===== CONTEXTO =====
	const { state } = useContext(TaskMasterContext);
	const { projects, tasks, team } = state;

	// ===== CÁLCULOS OPTIMIZADOS =====
	/**
	 * Estadísticas calculadas de manera optimizada con useMemo
	 */
	const stats = useMemo(() => {
		// Si no hay datos, usamos valores de ejemplo
		const demoStats = {
			totalProjects: 5,
			completedProjects: 2,
			totalTasks: 25,
			completedTasks: 15,
			completionRate: 60,
			avgTasksPerProject: 5,
			tasksByStatus: {
				Pendiente: 5,
				"En progreso": 5,
				Completada: 15,
			},
			teamEfficiency: {
				Ana: 90,
				Carlos: 85,
				Elena: 75,
				Miguel: 80,
			},
		};

		// Si tenemos datos reales, calculamos las estadísticas
		if (projects && projects.length > 0) {
			const totalProjects = projects.length;
			const completedProjects = projects.filter((p) => p.status === "completed").length;

			const totalTasks = tasks ? tasks.length : 0;
			const completedTasks = tasks ? tasks.filter((t) => t.status === "completed").length : 0;

			// Calcular tasas y promedios
			const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
			const avgTasksPerProject = totalProjects > 0 ? Math.round(totalTasks / totalProjects) : 0;

			// Agrupar tareas por estado
			const tasksByStatus = tasks
				? tasks.reduce((acc, task) => {
						acc[task.status] = (acc[task.status] || 0) + 1;
						return acc;
				  }, {})
				: {};

			// Calcular eficiencia del equipo
			const teamEfficiency = {};
			if (team && team.length > 0 && tasks && tasks.length > 0) {
				team.forEach((member) => {
					const memberTasks = tasks.filter((t) => t.assignedTo === member.id);
					const completedMemberTasks = memberTasks.filter((t) => t.status === "completed").length;
					teamEfficiency[member.name] =
						memberTasks.length > 0 ? Math.round((completedMemberTasks / memberTasks.length) * 100) : 0;
				});
			}

			return {
				totalProjects,
				completedProjects,
				totalTasks,
				completedTasks,
				completionRate,
				avgTasksPerProject,
				tasksByStatus,
				teamEfficiency,
			};
		}

		// Si no hay datos, devolver demo
		return demoStats;
	}, [projects, tasks, team]);

	// ===== RENDER =====
	return (
		<div className="statistics-container">
			<div className="stats-overview">
				<div className="stat-card">
					<h3>Proyectos</h3>
					<div className="stat-value">{stats.totalProjects}</div>
					<div className="stat-subtext">{stats.completedProjects} completados</div>
				</div>

				<div className="stat-card">
					<h3>Tareas</h3>
					<div className="stat-value">{stats.totalTasks}</div>
					<div className="stat-subtext">{stats.completedTasks} completadas</div>
				</div>

				<div className="stat-card">
					<h3>Tasa de completado</h3>
					<div className="stat-value">{stats.completionRate}%</div>
					<div className="stat-subtext">Tareas completadas</div>
				</div>

				<div className="stat-card">
					<h3>Tareas por proyecto</h3>
					<div className="stat-value">{stats.avgTasksPerProject}</div>
					<div className="stat-subtext">Promedio</div>
				</div>
			</div>

			<div className="stats-detailed">
				<div className="stats-section">
					<h3>Tareas por estado</h3>
					<div className="chart-container">
						{Object.entries(stats.tasksByStatus).map(([status, count]) => (
							<div
								key={status}
								className="chart-bar-container">
								<div className="chart-label">{status}</div>
								<div className="chart-bar">
									<div
										className={`chart-bar-fill status-${status.toLowerCase().replace(" ", "-")}`}
										style={{ width: `${(count / stats.totalTasks) * 100}%` }}></div>
								</div>
								<div className="chart-value">{count}</div>
							</div>
						))}
					</div>
				</div>

				<div className="stats-section">
					<h3>Eficiencia del equipo</h3>
					<div className="chart-container">
						{Object.entries(stats.teamEfficiency).map(([member, efficiency]) => (
							<div
								key={member}
								className="chart-bar-container">
								<div className="chart-label">{member}</div>
								<div className="chart-bar">
									<div
										className="chart-bar-fill efficiency"
										style={{ width: `${efficiency}%` }}></div>
								</div>
								<div className="chart-value">{efficiency}%</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="stats-footer">
				<p>
					<strong>Nota:</strong> En este simulacro, las estadísticas se muestran con datos de ejemplo para
					demostrar la visualización de datos. En una aplicación real, estos datos se calcularían a partir de
					los proyectos y tareas reales.
				</p>
			</div>
		</div>
	);
}

export default Statistics;
