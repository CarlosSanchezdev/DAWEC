/**
 * @fileoverview Componente para mostrar y gestionar el listado de personas
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React from "react";

/**
 * @function ListadoPersonas
 * @description Componente que muestra el listado de personas y permite gestionarlas
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.personas - Lista de personas a mostrar
 * @param {Function} props.onEditar - Función a llamar para editar una persona
 * @param {Function} props.onNuevaPersona - Función a llamar para crear una nueva persona
 * @param {Function} props.onCalcularIMC - Función a llamar para calcular el IMC
 * @returns {JSX.Element} Componente de listado de personas
 */
function ListadoPersonas({ personas, onEditar, onNuevaPersona, onCalcularIMC }) {
	return (
		<div className="listado-container">
			<h2>Gestión de Personas</h2>

			<div className="acciones-listado">
				<button
					className="btn-principal"
					onClick={onNuevaPersona}>
					Nueva Persona
				</button>

				<button
					className="btn-principal"
					onClick={onCalcularIMC}
					disabled={personas.length === 0}>
					Calcular IMC
				</button>
			</div>

			{personas.length > 0 ? (
				<table className="tabla-personas">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Peso (kg)</th>
							<th>Altura (m)</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{personas.map((persona) => (
							<tr key={persona.nombre}>
								<td>{persona.nombre}</td>
								<td>{persona.peso}</td>
								<td>{persona.altura}</td>
								<td>
									<div className="acciones-persona">
										<button
											className="btn-editar"
											onClick={() => onEditar(persona)}>
											Editar
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="sin-personas">
					<p>No hay personas registradas. ¡Añade una persona para empezar!</p>
				</div>
			)}
		</div>
	);
}

export default ListadoPersonas;
