/**
 * @fileoverview Componente para filtrar canciones por artista
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT7
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";

/**
 * @function FiltradoCanciones
 * @description Componente que permite filtrar canciones por nombre de artista
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.canciones - Lista de canciones para filtrar
 * @returns {JSX.Element} Formulario de búsqueda y lista de resultados
 *
 * IMPORTANTE: Este componente implementa el apartado 4 del ejercicio.
 * Utiliza eventos y estado para filtrar las canciones según el artista ingresado.
 */
function FiltradoCanciones({ canciones }) {
	// ===== HOOKS =====

	// Estado para el filtro de artista
	const [filtroArtista, setFiltroArtista] = useState("");

	// Estado para las canciones filtradas
	const [cancionesFiltradas, setCancionesFiltradas] = useState([]);

	// ===== EFECTOS =====

	/**
	 * Efecto para filtrar las canciones cuando cambia el filtro o las canciones
	 */
	useEffect(() => {
		// Si no hay filtro, mostramos todas las canciones
		if (!filtroArtista.trim()) {
			setCancionesFiltradas([]);
			return;
		}

		// Filtramos las canciones cuyo artista coincida parcialmente con el filtro
		const filtradas = canciones.filter((cancion) =>
			cancion.artista.toLowerCase().includes(filtroArtista.toLowerCase())
		);

		setCancionesFiltradas(filtradas);
	}, [filtroArtista, canciones]);

	// ===== FUNCIONES =====

	/**
	 * @function handleFiltroChange
	 * @description Gestiona el cambio en el input de filtro
	 * @param {Event} e - Evento de cambio
	 */
	const handleFiltroChange = (e) => {
		setFiltroArtista(e.target.value);
	};

	// ===== RENDER =====

	return (
		<div className="filtrado-canciones">
			<div className="filtro-container">
				<input
					type="text"
					placeholder="Introduce nombre de artista..."
					className="filtro-input"
					value={filtroArtista}
					onChange={handleFiltroChange}
				/>
			</div>

			<div className="resultados-filtro">
				{filtroArtista ? (
					cancionesFiltradas.length > 0 ? (
						<div>
							<h3>Canciones de {filtroArtista}:</h3>
							<ul className="lista-canciones-filtradas">
								{cancionesFiltradas.map((cancion) => (
									<li
										key={cancion.id}
										className="cancion-item">
										{cancion.nombre}
									</li>
								))}
							</ul>
							<p className="contador-resultados">
								{cancionesFiltradas.length}{" "}
								{cancionesFiltradas.length === 1 ? "canción encontrada" : "canciones encontradas"}
							</p>
						</div>
					) : (
						<p className="sin-resultados">No se encontraron canciones para este artista</p>
					)
				) : (
					<p className="instrucciones">Escribe el nombre de un artista para ver sus canciones</p>
				)}
			</div>
		</div>
	);
}

export default FiltradoCanciones;
