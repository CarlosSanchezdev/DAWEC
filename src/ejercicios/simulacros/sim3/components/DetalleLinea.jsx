/**
 * @fileoverview Componente para mostrar el detalle de una línea y sus paradas
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";

/**
 * @function DetalleLinea
 * @description Componente que muestra el detalle de una línea y sus paradas
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.linea - Línea a mostrar
 * @param {Function} props.obtenerParadas - Función para obtener las paradas de la línea
 * @param {Function} props.onNuevaParada - Función para crear una nueva parada
 * @param {Function} props.onEditarParada - Función para editar una parada
 * @param {Function} props.onEliminarParada - Función para eliminar una parada
 * @param {Function} props.onVolver - Función para volver al listado
 * @returns {JSX.Element} Componente de detalle de línea
 *
 * IMPORTANTE: Este componente muestra las paradas ordenadas por intervalo
 * según los requisitos del ejercicio.
 */
function DetalleLinea({ linea, obtenerParadas, onNuevaParada, onEditarParada, onEliminarParada, onVolver }) {
	// ===== HOOKS =====
	const [paradas, setParadas] = useState([]);

	// ===== EFECTOS =====

	/**
	 * Efecto para cargar las paradas cuando cambia la línea
	 */
	useEffect(() => {
		if (linea) {
			const paradasLinea = obtenerParadas();
			setParadas(paradasLinea);
		}
	}, [linea, obtenerParadas]);

	// ===== RENDER =====

	if (!linea) {
		return <div>No se ha seleccionado ninguna línea</div>;
	}

	return (
		<div className="detalle-linea">
			<div className="acciones-detalle">
				<button
					className="btn-cancelar"
					onClick={onVolver}>
					Volver al Listado
				</button>
			</div>

			<div className="info-linea">
				<h3>Detalles de la Línea {linea.numero}</h3>
				<div className="datos-linea">
					<div className="dato">
						<span className="dato-label">Número:</span>
						<span className="dato-valor">{linea.numero}</span>
					</div>
					<div className="dato">
						<span className="dato-label">Origen:</span>
						<span className="dato-valor">{linea.origen}</span>
					</div>
					<div className="dato">
						<span className="dato-label">Destino:</span>
						<span className="dato-valor">{linea.destino}</span>
					</div>
					<div className="dato">
						<span className="dato-label">Hora de Salida:</span>
						<span className="dato-valor">{linea.horaSalida}</span>
					</div>
					<div className="dato">
						<span className="dato-label">Intervalo:</span>
						<span className="dato-valor">{linea.intervalo}</span>
					</div>
				</div>
			</div>

			<div className="paradas-linea">
				<h3>
					Paradas de la Línea
					<button
						className="btn-nuevo"
						onClick={onNuevaParada}>
						Nueva Parada
					</button>
				</h3>

				{paradas.length > 0 ? (
					<table className="tabla-paradas">
						<thead>
							<tr>
								<th>Num. Parada</th>
								<th>Localidad</th>
								<th>Intervalo</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{paradas.map((parada) => (
								<tr key={`${parada.numeroLinea}-${parada.numero}`}>
									<td>{parada.numero}</td>
									<td>{parada.localidad}</td>
									<td>{parada.intervalo}</td>
									<td className="acciones">
										<button
											className="btn-accion btn-editar"
											onClick={() => onEditarParada(parada)}>
											Editar
										</button>
										<button
											className="btn-accion btn-eliminar"
											onClick={() => onEliminarParada(parada.numero, parada.numeroLinea)}>
											Eliminar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="sin-paradas">
						<p>No hay paradas para esta línea. Añada una nueva parada.</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default DetalleLinea;
