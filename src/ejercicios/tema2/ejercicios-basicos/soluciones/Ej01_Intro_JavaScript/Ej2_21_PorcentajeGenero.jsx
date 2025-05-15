/**
 * @fileoverview Ejercicio 2.21 - Porcentaje de Género
 * @ejercicio 2.21
 * @tema Bucles y Cálculos
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_21_PorcentajeGenero.module.css";

/**
 * @function Ej2_21_PorcentajeGenero
 * @description Calcula el porcentaje de hombres y mujeres en un salón de clases
 * @returns {JSX.Element} Interfaz para calcular porcentajes de género
 */
function Ej2_21_PorcentajeGenero() {
	const [estudiantes, setEstudiantes] = useState([]);
	const [genero, setGenero] = useState("H");
	const [resultado, setResultado] = useState(null);

	/**
	 * @function agregarEstudiante
	 * @description Agrega un nuevo estudiante a la lista
	 */
	const agregarEstudiante = () => {
		setEstudiantes([...estudiantes, genero]);
		calcularPorcentajes([...estudiantes, genero]);
	};

	/**
	 * @function reiniciarConteo
	 * @description Reinicia el conteo de estudiantes
	 */
	const reiniciarConteo = () => {
		setEstudiantes([]);
		setResultado(null);
	};

	/**
	 * @function calcularPorcentajes
	 * @description Calcula los porcentajes por género
	 * @param {Array} lista Lista actualizada de estudiantes
	 */
	const calcularPorcentajes = (lista) => {
		const total = lista.length;
		if (total === 0) return;

		const hombres = lista.filter((g) => g === "H").length;
		const mujeres = lista.filter((g) => g === "M").length;

		setResultado({
			total,
			hombres,
			mujeres,
			porcentajeHombres: (hombres / total) * 100,
			porcentajeMujeres: (mujeres / total) * 100,
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let totalAlumnos = parseInt(prompt("Número de alumnos:"));
let hombres = 0, mujeres = 0;

for (let i = 0; i < totalAlumnos; i++) {
    let genero = prompt("Género del alumno (H/M):").toUpperCase();
    if (genero === "H") hombres++;
    else if (genero === "M") mujeres++;
}

let porcentajeHombres = (hombres / totalAlumnos) * 100;
let porcentajeMujeres = (mujeres / totalAlumnos) * 100;

console.log(\`Porcentaje de hombres: \${porcentajeHombres}%\`);
console.log(\`Porcentaje de mujeres: \${porcentajeMujeres}%\`);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label>Género del estudiante:</label>
					<select
						value={genero}
						onChange={(e) => setGenero(e.target.value)}
						className={styles.select}>
						<option value="H">Hombre</option>
						<option value="M">Mujer</option>
					</select>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={agregarEstudiante}
						className={styles.button}>
						Agregar Estudiante
					</button>
					<button
						onClick={reiniciarConteo}
						className={`${styles.button} ${styles.secondary}`}>
						Reiniciar
					</button>
				</div>
			</div>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Total de estudiantes:</span>
							<span>{resultado.total}</span>
						</div>
						<div className={styles.linea}>
							<span>Hombres:</span>
							<span>
								{resultado.hombres} ({resultado.porcentajeHombres.toFixed(2)}%)
							</span>
						</div>
						<div className={styles.linea}>
							<span>Mujeres:</span>
							<span>
								{resultado.mujeres} ({resultado.porcentajeMujeres.toFixed(2)}%)
							</span>
						</div>
					</div>
					<div className={styles.grafico}>
						<div
							className={styles.barraHombres}
							style={{ width: `${resultado.porcentajeHombres}%` }}
						/>
						<div
							className={styles.barraMujeres}
							style={{ width: `${resultado.porcentajeMujeres}%` }}
						/>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Manejo de arrays y métodos de array (filter)</li>
					<li>Cálculo de porcentajes</li>
					<li>Estado inmutable en React</li>
					<li>Visualización de datos con barras de progreso</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_21_PorcentajeGenero;
