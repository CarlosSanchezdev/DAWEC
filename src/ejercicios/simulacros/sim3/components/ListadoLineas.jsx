/**
 * @fileoverview Componente para mostrar el listado de líneas de autobús
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React from "react";

/**
 * @function ListadoLineas
 * @description Componente que muestra una tabla con todas las líneas de autobús
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.lineas - Lista de líneas a mostrar
 * @param {Function} props.onVerDetalle - Función para ver el detalle de una línea
 * @param {Function} props.onEditar - Función para editar una línea
 * @param {Function} props.onEliminar - Función para eliminar una línea
 * @param {Function} props.onNuevaLinea - Función para crear una nueva línea
 * @returns {JSX.Element} Componente de listado de líneas
 */
function ListadoLineas({ lineas, onVerDetalle, onEditar, onEliminar, onNuevaLinea }) {
	return (
		<div className="listado-lineas">
			<div className="listado-cabecera">
				<h2>Listado de Líneas de Autobús</h2>
				<button
					className="btn-nuevo"
					onClick={onNuevaLinea}>
					Nueva Línea
				</button>
			</div>

			{lineas.length > 0 ? (
				<table className="tabla-lineas">
					<thead>
						<tr>
							<th>Número</th>
							<th>Origen</th>
							<th>Destino</th>
							<th>Hora Salida</th>
							<th>Intervalo</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{lineas.map((linea) => (
							<tr key={linea.numero}>
								<td>{linea.numero}</td>
								<td>{linea.origen}</td>
								<td>{linea.destino}</td>
								<td>{linea.horaSalida}</td>
								<td>{linea.intervalo}</td>
								<td className="acciones">
									<button
										className="btn-accion btn-detalle"
										onClick={() => onVerDetalle(linea)}>
										Detalle
									</button>
									<button
										className="btn-accion btn-editar"
										onClick={() => onEditar(linea)}>
										Editar
									</button>
									<button
										className="btn-accion btn-eliminar"
										onClick={() => onEliminar(linea.numero)}>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="sin-datos">
					<p>No hay líneas disponibles. Cree una nueva línea o cargue los datos de prueba.</p>
				</div>
			)}
		</div>
	);
}

export default ListadoLineas;
