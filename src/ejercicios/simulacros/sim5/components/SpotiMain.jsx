/**
 * @fileoverview Componente principal SpotiMain para la aplicación SpotifEx
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT8
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";
import ListadoCanciones from "./ListadoCanciones";
import FiltradoCanciones from "./FiltradoCanciones";
import MasPopular from "./MasPopular";
// Importar directamente los datos para evitar problemas con fetch
import spotifyData from "../json/Spotify.json";

/**
 * @function SpotiMain
 * @description Componente principal que contiene y organiza los demás componentes
 * @returns {JSX.Element} Componente principal con la estructura de la aplicación
 *
 * IMPORTANTE: Este componente es el contenedor principal que gestiona el estado
 * de las canciones y las distribuye a los componentes hijos.
 */
function SpotiMain() {
	// ===== HOOKS =====

	// Estado para almacenar todas las canciones cargadas
	const [canciones, setCanciones] = useState([]);

	// Estado para controlar errores durante la carga
	const [error, setError] = useState(null);

	// Estado para manejar la carga de datos
	const [cargando, setCargando] = useState(true);

	// ===== EFECTOS =====

	/**
	 * Efecto para cargar las canciones al montar el componente
	 */
	useEffect(() => {
		cargarCanciones();
	}, []);

	// ===== FUNCIONES =====
	/**
	 * @function cargarCanciones
	 * @description Función asíncrona para obtener las canciones del archivo JSON
	 *
	 * IMPORTANTE: Esta función implementa el apartado 2 del ejercicio.
	 * Utiliza async/await para obtener los datos del archivo JSON.
	 */
	const cargarCanciones = async () => {
		try {
			setCargando(true);

			// En lugar de usar fetch, usamos los datos importados directamente
			setCanciones(spotifyData.canciones);
			console.log("Canciones cargadas:", spotifyData.canciones);
		} catch (error) {
			console.error("Error al cargar canciones:", error);
			setError(error.message);
		} finally {
			setCargando(false);
		}
	};

	// ===== RENDER =====

	// Renderizado condicional durante la carga
	if (cargando) {
		return <div className="cargando">Cargando canciones...</div>;
	}

	// Renderizado en caso de error
	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	// Renderizado principal cuando los datos están disponibles
	return (
		<div className="spoti-main">
			<section className="seccion-principal">
				<div className="paneles">
					<div className="panel-izquierdo">
						{/* Sección de canciones más populares */}
						<div className="panel-seccion">
							<h2>Canción más popular</h2>
							{/* 
                Ejercicio 5: Componente MasPopular 
                Este componente muestra la canción más popular de la lista
              */}
							<MasPopular canciones={canciones} />
						</div>

						{/* Sección de filtrado de canciones */}
						<div className="panel-seccion">
							<h2>Buscar canciones por artista</h2>
							{/* 
                Ejercicio 4: Componente FiltradoCanciones 
                Este componente permite filtrar canciones por artista
              */}
							<FiltradoCanciones canciones={canciones} />
						</div>
					</div>

					<div className="panel-derecho">
						{/* Sección de listado completo de canciones */}
						<div className="panel-seccion">
							<h2>Listado de canciones</h2>
							{/* 
                Ejercicio 3: Componente ListadoCanciones 
                Este componente muestra la lista completa de canciones en formato tabular
              */}
							<ListadoCanciones canciones={canciones} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default SpotiMain;
