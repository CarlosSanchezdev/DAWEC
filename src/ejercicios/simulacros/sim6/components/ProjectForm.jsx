/**
 * @fileoverview Componente de formulario para crear/editar proyectos
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import React from "react";
import useForm from "../hooks/useForm";
import "./ProjectForm.css";

/**
 * @function ProjectForm
 * @description Formulario para crear o editar proyectos
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.project - Proyecto a editar (null si es nuevo)
 * @param {function} props.onSubmit - Función para manejar el envío del formulario
 * @param {function} props.onCancel - Función para cancelar y cerrar el formulario
 * @returns {JSX.Element} Componente de formulario
 */
function ProjectForm({ project, onSubmit, onCancel }) {
	// ===== VALORES INICIALES =====
	const initialValues = project
		? {
				name: project.name,
				description: project.description,
				startDate: project.startDate,
				dueDate: project.dueDate,
				status: project.status,
				priority: project.priority,
				teamMembers: project.teamMembers || [],
		  }
		: {
				name: "",
				description: "",
				startDate: new Date().toISOString().split("T")[0],
				dueDate: "",
				status: "planning",
				priority: "medium",
				teamMembers: [],
		  };

	// ===== VALIDACIÓN =====
	/**
	 * @function validate
	 * @description Valida los campos del formulario
	 * @param {Object} values - Valores del formulario
	 * @returns {Object} Errores de validación
	 */
	const validate = (values) => {
		const errors = {};

		if (!values.name.trim()) {
			errors.name = "El nombre del proyecto es obligatorio";
		}

		if (!values.description.trim()) {
			errors.description = "La descripción es obligatoria";
		}

		if (!values.startDate) {
			errors.startDate = "La fecha de inicio es obligatoria";
		}

		if (!values.dueDate) {
			errors.dueDate = "La fecha límite es obligatoria";
		} else if (values.startDate && values.dueDate && new Date(values.dueDate) < new Date(values.startDate)) {
			errors.dueDate = "La fecha límite debe ser posterior a la fecha de inicio";
		}

		return errors;
	};

	// ===== HOOK PERSONALIZADO PARA FORMULARIOS =====
	const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm(initialValues, validate, onSubmit);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function handleTeamMemberChange
	 * @description Maneja los cambios en la selección de miembros del equipo
	 * @param {Event} e - Evento de cambio
	 */
	const handleTeamMemberChange = (e) => {
		const options = e.target.options;
		const selectedValues = [];

		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				selectedValues.push(parseInt(options[i].value));
			}
		}

		setFieldValue("teamMembers", selectedValues);
	};

	// Datos de ejemplo para miembros del equipo
	const teamMembers = [
		{ id: 1, name: "Ana García" },
		{ id: 2, name: "Carlos Rodríguez" },
		{ id: 3, name: "Elena Martínez" },
		{ id: 4, name: "Miguel López" },
		{ id: 5, name: "Laura Sánchez" },
	];

	// ===== RENDER =====
	return (
		<div className="project-form-container">
			<h2>{project ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>

			<form
				onSubmit={handleSubmit}
				className="project-form">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="name">Nombre del Proyecto *</label>
						<input
							type="text"
							id="name"
							name="name"
							value={values.name}
							onChange={handleChange}
							className={errors.name ? "error" : ""}
						/>
						{errors.name && <span className="error-message">{errors.name}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="description">Descripción *</label>
						<textarea
							id="description"
							name="description"
							value={values.description}
							onChange={handleChange}
							rows="3"
							className={errors.description ? "error" : ""}></textarea>
						{errors.description && <span className="error-message">{errors.description}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="startDate">Fecha de Inicio *</label>
						<input
							type="date"
							id="startDate"
							name="startDate"
							value={values.startDate}
							onChange={handleChange}
							className={errors.startDate ? "error" : ""}
						/>
						{errors.startDate && <span className="error-message">{errors.startDate}</span>}
					</div>

					<div className="form-group">
						<label htmlFor="dueDate">Fecha Límite *</label>
						<input
							type="date"
							id="dueDate"
							name="dueDate"
							value={values.dueDate}
							onChange={handleChange}
							className={errors.dueDate ? "error" : ""}
						/>
						{errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="status">Estado</label>
						<select
							id="status"
							name="status"
							value={values.status}
							onChange={handleChange}>
							<option value="planning">Planificación</option>
							<option value="in-progress">En Progreso</option>
							<option value="on-hold">En Pausa</option>
							<option value="completed">Completado</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="priority">Prioridad</label>
						<select
							id="priority"
							name="priority"
							value={values.priority}
							onChange={handleChange}>
							<option value="low">Baja</option>
							<option value="medium">Media</option>
							<option value="high">Alta</option>
						</select>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group">
						<label htmlFor="teamMembers">Miembros del Equipo</label>
						<select
							id="teamMembers"
							name="teamMembers"
							multiple
							value={values.teamMembers}
							onChange={handleTeamMemberChange}
							size="5">
							{teamMembers.map((member) => (
								<option
									key={member.id}
									value={member.id}>
									{member.name}
								</option>
							))}
						</select>
						<small className="help-text">Mantén presionado Ctrl (Cmd en Mac) para seleccionar varios</small>
					</div>
				</div>

				<div className="form-actions">
					<button
						type="button"
						className="btn btn-outline"
						onClick={onCancel}>
						Cancelar
					</button>
					<button
						type="submit"
						className="btn btn-primary">
						{project ? "Guardar Cambios" : "Crear Proyecto"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default ProjectForm;
