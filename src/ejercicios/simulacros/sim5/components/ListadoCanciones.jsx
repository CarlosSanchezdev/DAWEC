/**
 * @fileoverview Componente para mostrar listado tabular de canciones
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT6
 * @fecha 14/05/2025
 */

import React from "react";

/**
 * @function ListadoCanciones
 * @description Componente que muestra una tabla con todas las canciones
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.canciones - Lista de canciones a mostrar
 * @returns {JSX.Element} Tabla con la información de las canciones
 *
 * IMPORTANTE: Este componente implementa el apartado 3 del ejercicio.
 * Recibe las canciones como prop desestructurada y las muestra en formato tabla.
 */
function ListadoCanciones({ canciones }) {
	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function formatearDuracion
	 * @description Convierte la duración en segundos a formato mm:ss
	 * @param {number} segundos - Duración en segundos
	 * @returns {string} Duración formateada
	 */
	const formatearDuracion = (segundos) => {
		const minutos = Math.floor(segundos / 60);
		const segsRestantes = segundos % 60;
		return `${minutos}:${segsRestantes.toString().padStart(2, "0")}`;
	};

	// ===== RENDER =====

	// Si no hay canciones, mostramos un mensaje
	if (!canciones || canciones.length === 0) {
		return <div className="sin-datos">No hay canciones disponibles</div>;
	}

	return (
		<div className="listado-canciones">
			<table className="tabla-canciones">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Artista</th>
						<th>Álbum</th>
						<th>Duración</th>
						<th>Duración (seg)</th>
					</tr>
				</thead>
				<tbody>
					{/* 
            Iteramos sobre el array de canciones para generar una fila por cada una 
            Es importante usar la clave "key" única para cada elemento en la lista
          */}
					{canciones.map((cancion) => (
						<tr key={cancion.id}>
							<td>{cancion.id}</td>
							<td>{cancion.nombre}</td>
							<td>{cancion.artista}</td>
							<td>{cancion.album}</td>
							<td>{formatearDuracion(cancion.duracion)}</td>
							<td>{cancion.duracion}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="info-total">
				<p>Total canciones: {canciones.length}</p>
			</div>
		</div>
	);
}

export default ListadoCanciones;
