/**
 * @fileoverview Ejercicio 2.15 - Conversión de notas usando switch
 * @ejercicio 2.15
 * @tema Switch Statement
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_15_NotasSwitch.module.css";

/**
 * @function convertirNota
 * @description Convierte una nota numérica a su calificación correspondiente
 * @param {number} nota - Nota numérica entre 0 y 10
 * @returns {Object} Objeto con la calificación y el color correspondiente
 */
const convertirNota = (nota) => {
	let calificacion;
	let color;

	switch (true) {
		case nota >= 9:
			calificacion = "Sobresaliente";
			color = "#28a745";
			break;
		case nota >= 7:
			calificacion = "Notable";
			color = "#17a2b8";
			break;
		case nota >= 6:
			calificacion = "Bien";
			color = "#ffc107";
			break;
		case nota >= 5:
			calificacion = "Suficiente";
			color = "#ff9800";
			break;
		case nota >= 0:
			calificacion = "Insuficiente";
			color = "#dc3545";
			break;
		default:
			calificacion = "Nota no válida";
			color = "#6c757d";
	}

	return { calificacion, color };
};

/**
 * @function Ej2_15_NotasSwitch
 * @description Componente que convierte notas numéricas a calificaciones
 * @returns {JSX.Element} Interfaz para convertir notas
 */
function Ej2_15_NotasSwitch() {
	const [nota, setNota] = useState("");
	const [resultado, setResultado] = useState(null);

	const handleConversion = (e) => {
		e.preventDefault();
		const notaNumerica = parseFloat(nota);

		if (isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 10) {
			alert("Por favor, ingrese una nota válida entre 0 y 10");
			return;
		}

		setResultado(convertirNota(notaNumerica));
	};

	const codigoEjemplo = `// Código usando switch con rangos:
let nota = parseFloat(prompt("Ingrese la nota (0-10):"));
let calificacion;

switch (true) {
    case nota >= 9:
        calificacion = "Sobresaliente";
        break;
    case nota >= 7:
        calificacion = "Notable";
        break;
    case nota >= 6:
        calificacion = "Bien";
        break;
    case nota >= 5:
        calificacion = "Suficiente";
        break;
    case nota >= 0:
        calificacion = "Insuficiente";
        break;
    default:
        calificacion = "Nota no válida";
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Switch con rangos:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={handleConversion}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="nota">Nota numérica (0-10):</label>
					<input
						type="number"
						id="nota"
						value={nota}
						onChange={(e) => setNota(e.target.value)}
						min="0"
						max="10"
						step="0.1"
						required
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Convertir
				</button>
			</form>

			{resultado && (
				<div
					className={styles.resultado}
					style={{ backgroundColor: resultado.color + "20", borderColor: resultado.color }}>
					<h3>Calificación:</h3>
					<p style={{ color: resultado.color }}>{resultado.calificacion}</p>
				</div>
			)}

			<div className={styles.tabla}>
				<h3>Tabla de conversión:</h3>
				<table>
					<thead>
						<tr>
							<th>Rango</th>
							<th>Calificación</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>9 - 10</td>
							<td>Sobresaliente</td>
						</tr>
						<tr>
							<td>7 - 8.9</td>
							<td>Notable</td>
						</tr>
						<tr>
							<td>6 - 6.9</td>
							<td>Bien</td>
						</tr>
						<tr>
							<td>5 - 5.9</td>
							<td>Suficiente</td>
						</tr>
						<tr>
							<td>0 - 4.9</td>
							<td>Insuficiente</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Switch statement con rangos</li>
					<li>Validación de entrada numérica</li>
					<li>Conversión de tipos de datos</li>
					<li>Aplicación de estilos dinámicos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_15_NotasSwitch;
