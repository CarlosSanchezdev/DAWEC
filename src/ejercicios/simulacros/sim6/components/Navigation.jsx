/**
 * @fileoverview Componente de navegación para TaskMaster
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import React from "react";
import "./Navigation.css";

/**
 * @function Navigation
 * @description Componente que muestra la navegación lateral de la aplicación
 * @param {Object} props - Propiedades del componente
 * @param {string} props.activeSection - Sección actualmente activa
 * @param {function} props.onNavigate - Función para cambiar de sección
 * @returns {JSX.Element} Componente de navegación
 */
function Navigation({ activeSection, onNavigate }) {
	// ===== MENÚ DE NAVEGACIÓN =====
	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: "📊" },
		{ id: "projects", label: "Proyectos", icon: "📁" },
		{ id: "tasks", label: "Tareas", icon: "✓" },
		{ id: "team", label: "Equipo", icon: "👥" },
		{ id: "statistics", label: "Estadísticas", icon: "📈" },
	];

	return (
		<nav className="app-navigation">
			<div className="logo">
				<h1>TaskMaster</h1>
				<p className="version">v1.0</p>
			</div>

			<ul className="nav-items">
				{navItems.map((item) => (
					<li
						key={item.id}
						className={activeSection === item.id ? "active" : ""}
						onClick={() => onNavigate(item.id)}>
						<span className="nav-icon">{item.icon}</span>
						<span className="nav-label">{item.label}</span>
					</li>
				))}
			</ul>

			<div className="nav-footer">
				<div className="user-profile">
					<div className="avatar">👤</div>
					<div className="user-info">
						<p className="user-name">Usuario Demo</p>
						<p className="user-role">Administrador</p>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
