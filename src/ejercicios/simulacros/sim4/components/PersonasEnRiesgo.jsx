/**
 * @fileoverview Componente para mostrar personas con riesgo de salud por su IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React from "react";
import Calculo from "../models/Calculo";

/**
 * @function PersonasEnRiesgo
 * @description Componente que muestra las personas con peso no normal (riesgo de salud)
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.personasRiesgo - Lista de personas en riesgo
 * @param {string} props.titulo - Título del componente
 * @returns {JSX.Element} Componente de personas en riesgo
 */
function PersonasEnRiesgo({ personasRiesgo, titulo }) {
	// Contar personas por categoría
	const contarPorCategoria = () => {
		const conteo = {
			delgado: 0,
			obeso: 0,
		};

		personasRiesgo.forEach((persona) => {
			if (persona.categoria in conteo) {
				conteo[persona.categoria]++;
			}
		});

		return conteo;
	};

	const conteo = contarPorCategoria();

	return (
		<div className="personas-riesgo">
			<h3>{titulo}</h3>

			<div className="riesgo-descripcion">
				<p>
					Se han detectado {personasRiesgo.length} personas que no están en su peso normal y requieren
					atención:
					{conteo.delgado > 0 && ` ${conteo.delgado} con peso insuficiente`}
					{conteo.delgado > 0 && conteo.obeso > 0 && " y"}
					{conteo.obeso > 0 && ` ${conteo.obeso} con sobrepeso`}.
				</p>
			</div>

			{personasRiesgo.length > 0 && (
				<table className="imc-tabla">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>IMC</th>
							<th>Categoría</th>
							<th>Recomendación</th>
						</tr>
					</thead>
					<tbody>
						{personasRiesgo.map((persona) => (
							<tr key={persona.nombre}>
								<td>{persona.nombre}</td>
								<td>{persona.imc}</td>
								<td>
									<span className={`categoria ${persona.categoria}`}>{persona.categoria}</span>
								</td>
								<td>
									{persona.categoria === "delgado"
										? "Aumentar ingesta calórica y consultar a un nutricionista"
										: "Reducir ingesta calórica, aumentar actividad física y consultar a un nutricionista"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default PersonasEnRiesgo;
