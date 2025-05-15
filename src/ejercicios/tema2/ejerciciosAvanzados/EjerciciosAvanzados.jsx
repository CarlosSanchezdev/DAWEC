/**
 * @fileoverview Ejercicios avanzados del Tema 2 (2.1-2.55)
 * @ejercicio Tema 2 - JavaScript Sintaxis Básica
 * @tema Ejercicios de sintaxis básica, variables, bucles y operadores
 * @fecha 2024-01-20
 */

import React, { useState } from "react";
import "./EjerciciosAvanzados.css";

// Organización de ejercicios por bloques temáticos
const BLOQUES = {};

// Lista completa de ejercicios
const EJERCICIOS = [];

/**
 * @function EjerciciosAvanzados
 * @description Componente que muestra los ejercicios avanzados del Tema 2
 * @returns {JSX.Element} Interfaz para navegar y completar ejercicios
 */
function EjerciciosAvanzados() {
	const [filtro, setFiltro] = useState("todos");
	const [busqueda, setBusqueda] = useState("");
	const [setEjercicioActual] = useState(null);
	const [paginaActual, setPaginaActual] = useState(1);
	const ejerciciosPorPagina = 10;

	/**
	 * @function filtrarEjercicios
	 * @description Filtra los ejercicios según los criterios actuales
	 * @returns {Array} Lista de ejercicios filtrados
	 */
	const filtrarEjercicios = () => {
		return EJERCICIOS.filter((ejercicio) => {
			const coincideBusqueda =
				ejercicio.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
				ejercicio.enunciado.toLowerCase().includes(busqueda.toLowerCase());

			if (filtro === "todos") return coincideBusqueda;
			return coincideBusqueda && ejercicio.nivel === filtro;
		});
	};

	/**
	 * @function obtenerEjerciciosPagina
	 * @description Obtiene los ejercicios de la página actual
	 * @returns {Array} Ejercicios de la página actual
	 */
	const obtenerEjerciciosPagina = () => {
		const ejerciciosFiltrados = filtrarEjercicios();
		const inicio = (paginaActual - 1) * ejerciciosPorPagina;
		const fin = inicio + ejerciciosPorPagina;
		return ejerciciosFiltrados.slice(inicio, fin);
	};

	/**
	 * @function calcularTotalPaginas
	 * @description Calcula el total de páginas según los ejercicios filtrados
	 * @returns {number} Total de páginas
	 */
	const calcularTotalPaginas = () => {
		return Math.ceil(filtrarEjercicios().length / ejerciciosPorPagina);
	};

	/**
	 * @function handlePaginaClick
	 * @description Maneja el click en un botón de página
	 * @param {number} pagina Número de página seleccionada
	 */
	const handlePaginaClick = (pagina) => {
		setPaginaActual(pagina);
		window.scrollTo(0, 0);
	};

	return (
		<div className="ejercicios-container">
			<div className="navegacion">
				<button
					className="volver-btn"
					onClick={() => window.history.back()}>
					← Volver a la lista
				</button>
			</div>

			<header className="ejercicios-header">
				<h1>Ejercicios de JavaScript (2.1-2.55)</h1>
				<div className="filtros">
					<input
						type="text"
						placeholder="Buscar ejercicio..."
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						className="busqueda-input"
					/>
					<select
						value={filtro}
						onChange={(e) => setFiltro(e.target.value)}
						className="filtro-select">
						<option value="todos">Todos los niveles</option>
						<option value="básico">Nivel básico</option>
						<option value="intermedio">Nivel intermedio</option>
						<option value="avanzado">Nivel avanzado</option>
					</select>
				</div>
			</header>

			<div className="bloques-container">
				{Object.entries(BLOQUES).map(([nombreBloque, ejercicios]) => {
					const ejerciciosBloque = obtenerEjerciciosPagina().filter((ej) => ejercicios.includes(ej.id));

					if (ejerciciosBloque.length === 0) return null;

					return (
						<div
							key={nombreBloque}
							className="bloque">
							<h2>
								{nombreBloque} <span className="ejercicios-range">{ejercicios}</span>
							</h2>
							<div className="ejercicios-grid">
								{ejerciciosBloque.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className="ejercicio-card"
										onClick={() => setEjercicioActual(ejercicio)}>
										<div className="ejercicio-header">
											<h3>{ejercicio.titulo}</h3>
											<span className="ejercicio-id">Ejercicio {ejercicio.id}</span>
										</div>
										<p className="ejercicio-enunciado">{ejercicio.enunciado}</p>
										<div className="ejercicio-footer">
											<div className="conceptos">
												{ejercicio.conceptos.map((concepto, index) => (
													<span
														key={index}
														className="concepto-tag">
														{concepto}
													</span>
												))}
											</div>
											<span className={`nivel nivel-${ejercicio.nivel}`}>{ejercicio.nivel}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>

			<div className="paginacion">
				{Array.from({ length: calcularTotalPaginas() }, (_, i) => i + 1).map((pagina) => (
					<button
						key={pagina}
						onClick={() => handlePaginaClick(pagina)}
						className={`pagina-btn ${pagina === paginaActual ? "activa" : ""}`}>
						{pagina}
					</button>
				))}
			</div>
		</div>
	);
}

export default EjerciciosAvanzados;
