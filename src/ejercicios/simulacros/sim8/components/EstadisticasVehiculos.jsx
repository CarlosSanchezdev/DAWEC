/**
 * @fileoverview Componente para mostrar estadísticas de vehículos
 */

import { useState, useEffect } from "react";
import { useVehiculos } from "../context/VehiculosContext";

function EstadisticasVehiculos() {
	const { vehiculos, calcularEstadisticas } = useVehiculos();
	const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
	const [estadisticas, setEstadisticas] = useState({
		general: { media: 0, minima: 0, maxima: 0 },
		porMarca: { media: 0, minima: 0, maxima: 0 },
	});

	// Obtener lista única de marcas
	const marcas = [...new Set(vehiculos.map((v) => v.marca))].sort();

	useEffect(() => {
		// Calcular estadísticas generales
		const statsGenerales = calcularEstadisticas();

		// Calcular estadísticas por marca si hay una seleccionada
		const statsMarca = marcaSeleccionada
			? calcularEstadisticas(marcaSeleccionada)
			: { media: 0, minima: 0, maxima: 0 };

		setEstadisticas({
			general: statsGenerales,
			porMarca: statsMarca,
		});
	}, [vehiculos, marcaSeleccionada, calcularEstadisticas]);

	return (
		<div className="estadisticas-container">
			<h2>Estadísticas de Potencia</h2>

			<div className="stats-section">
				<h3>Estadísticas Generales</h3>
				<div className="stats-grid">
					<div className="stat-item">
						<label>Media:</label>
						<span>{estadisticas.general.media.toFixed(2)} CV</span>
					</div>
					<div className="stat-item">
						<label>Mínima:</label>
						<span>{estadisticas.general.minima} CV</span>
					</div>
					<div className="stat-item">
						<label>Máxima:</label>
						<span>{estadisticas.general.maxima} CV</span>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<h3>Estadísticas por Marca</h3>
				<select
					value={marcaSeleccionada}
					onChange={(e) => setMarcaSeleccionada(e.target.value)}
					className="marca-select">
					<option value="">Seleccione una marca</option>
					{marcas.map((marca) => (
						<option
							key={marca}
							value={marca}>
							{marca}
						</option>
					))}
				</select>

				{marcaSeleccionada && (
					<div className="stats-grid">
						<div className="stat-item">
							<label>Media:</label>
							<span>{estadisticas.porMarca.media.toFixed(2)} CV</span>
						</div>
						<div className="stat-item">
							<label>Mínima:</label>
							<span>{estadisticas.porMarca.minima} CV</span>
						</div>
						<div className="stat-item">
							<label>Máxima:</label>
							<span>{estadisticas.porMarca.maxima} CV</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default EstadisticasVehiculos;
