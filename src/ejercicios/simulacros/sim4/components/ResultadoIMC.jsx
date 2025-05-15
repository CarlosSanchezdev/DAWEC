/**
 * @fileoverview Componente para mostrar los resultados del IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React from "react";
import Calculo from "../models/Calculo";

/**
 * @function ResultadoIMC
 * @description Componente que muestra los resultados del cálculo de IMC
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.resultados - Lista de resultados de IMC
 * @param {string} props.titulo - Título del componente
 * @returns {JSX.Element} Componente de resultados de IMC
 */
function ResultadoIMC({ resultados, titulo }) {
	return (
		<div className="resultados-imc">
			<h2>{titulo}</h2>

			{resultados.length > 0 ? (
				<table className="imc-tabla">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>IMC</th>
							<th>Categoría</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{resultados.map((resultado) => (
							<tr key={resultado.nombre}>
								<td>{resultado.nombre}</td>
								<td>{resultado.imc}</td>
								<td>
									<span className={`categoria ${resultado.categoria}`}>{resultado.categoria}</span>
								</td>
								<td>{Calculo.obtenerDescripcionCategoria(resultado.categoria)}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="sin-resultados">
					<p>No hay resultados de IMC disponibles.</p>
				</div>
			)}

			<div className="leyenda-imc">
				<h3>Interpretación de resultados:</h3>
				<ul>
					<li>
						<span className="categoria delgado">delgado</span>: IMC menor a 18.49 - Peso insuficiente
					</li>
					<li>
						<span className="categoria normal">normal</span>: IMC entre 18.49 y 24.99 - Peso saludable
					</li>
					<li>
						<span className="categoria obeso">obeso</span>: IMC mayor a 25.00 - Sobrepeso
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ResultadoIMC;
