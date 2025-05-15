/**
 * @fileoverview Componente para mostrar la canción más popular
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT6
 * @fecha 14/05/2025
 */

import React, { useMemo } from "react";

/**
 * @function MasPopular
 * @description Componente que muestra la canción más popular de la lista
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.canciones - Lista de canciones para analizar
 * @returns {JSX.Element} Tarjeta con la información de la canción más popular
 *
 * IMPORTANTE: Este componente implementa el apartado 5 del ejercicio.
 * Utiliza useMemo para calcular la canción más popular de forma eficiente.
 */
function MasPopular({ canciones }) {
	// ===== MEMOS =====

	/**
	 * useMemo para calcular la canción más popular
	 * Solo se recalcula cuando cambia el array de canciones
	 */
	const cancionMasPopular = useMemo(() => {
		// Si no hay canciones, retornamos null
		if (!canciones || canciones.length === 0) {
			return null;
		}

		// Encontramos la canción con mayor popularidad
		// Si hay varias con la misma popularidad, devolvemos la primera
		return canciones.reduce((masPopular, cancionActual) => {
			return cancionActual.popularidad > masPopular.popularidad ? cancionActual : masPopular;
		}, canciones[0]);
	}, [canciones]);

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
	if (!cancionMasPopular) {
		return <div className="sin-datos">No hay canciones disponibles</div>;
	}

	return (
		<div className="mas-popular">
			<div className="tarjeta-cancion">
				<div className="badge-popularidad">
					<span>{cancionMasPopular.popularidad}</span>
					<small>/100</small>
				</div>

				<h3 className="nombre-cancion">{cancionMasPopular.nombre}</h3>
				<p className="datos-cancion">
					<span className="artista">{cancionMasPopular.artista}</span> -
					<span className="album"> {cancionMasPopular.album}</span>
				</p>

				<p className="duracion-cancion">
					<span className="etiqueta">Duración:</span> {formatearDuracion(cancionMasPopular.duracion)}
				</p>
			</div>
		</div>
	);
}

export default MasPopular;
