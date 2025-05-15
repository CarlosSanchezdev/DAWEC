/**
 * @fileoverview Componente principal de la aplicación SpotifEx
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT6, UT7, UT8
 * @fecha 14/05/2025
 */

import SpotiMain from "./components/SpotiMain";
import ExplicacionSpotifEx from "./ExplicacionSpotifEx";
import { useState } from "react";
import "./SpotifEx.css";

/**
 * @function SpotifEx
 * @description Componente principal que contiene toda la aplicación SpotifEx
 * @returns {JSX.Element} Componente principal de la aplicación
 *
 * IMPORTANTE: Este es el componente de entrada que se carga inicialmente.
 * Su función principal es renderizar el componente SpotiMain.
 */
function SpotifEx() {
	const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

	return (
		<div className="spotifex-app">
			<header className="app-header">
				<h1>SpotifEx</h1>
				<div className="app-description">Explorador de canciones de Spotify</div>
				<button
					className="btn-explicacion"
					onClick={() => setMostrarExplicacion(!mostrarExplicacion)}>
					{mostrarExplicacion ? "Ver Aplicación" : "Ver Explicación Técnica"}
				</button>
			</header>

			<main className="app-content">
				{mostrarExplicacion ? (
					<ExplicacionSpotifEx />
				) : (
					<>
						{/* 
							Ejercicio 1: Componente SpotiMain 
							Este componente contendrá todos los demás componentes de la aplicación
						*/}
						<SpotiMain />
					</>
				)}
			</main>

			<footer className="app-footer">
				<p>SpotifEx &copy; 2025 - Ejemplo de examen 2ª evaluación DWEC</p>
			</footer>
		</div>
	);
}

export default SpotifEx;
