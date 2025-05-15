/**
 * @fileoverview Ejercicio 2.31 - Cálculos Esféricos
 * @ejercicio 2.31
 * @tema Matemáticas y Geometría
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_31_CalculosEsfericos.module.css";

/**
 * @function calcularArea
 * @description Calcula el área de una esfera
 * @param {number} radio Radio de la esfera
 * @returns {number} Área de la esfera
 */
const calcularArea = (radio) => {
	return 4 * Math.PI * Math.pow(radio, 2);
};

/**
 * @function calcularVolumen
 * @description Calcula el volumen de una esfera
 * @param {number} radio Radio de la esfera
 * @returns {number} Volumen de la esfera
 */
const calcularVolumen = (radio) => {
	return (4 / 3) * Math.PI * Math.pow(radio, 3);
};

/**
 * @function Ej2_31_CalculosEsfericos
 * @description Calcula el área y volumen de una esfera
 * @returns {JSX.Element} Interfaz para cálculos esféricos
 */
function Ej2_31_CalculosEsfericos() {
	const [radio, setRadio] = useState("");
	const [resultados, setResultados] = useState(null);
	const [precision, setPrecision] = useState(2);

	/**
	 * @function calcular
	 * @description Realiza los cálculos de área y volumen
	 * @param {Event} e Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		const r = parseFloat(radio);

		if (isNaN(r) || r <= 0) {
			alert("Por favor, ingrese un radio válido y positivo");
			return;
		}

		const area = calcularArea(r);
		const volumen = calcularVolumen(r);

		setResultados({
			area: area.toFixed(precision),
			volumen: volumen.toFixed(precision),
			radio: r,
			pi: Math.PI.toFixed(precision),
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
function calcularAreaEsfera(radio) {
    return 4 * Math.PI * Math.pow(radio, 2);
}

function calcularVolumenEsfera(radio) {
    return (4/3) * Math.PI * Math.pow(radio, 3);
}

let radio = parseFloat(prompt("Ingrese el radio de la esfera:"));
console.log("Área:", calcularAreaEsfera(radio).toFixed(2));
console.log("Volumen:", calcularVolumenEsfera(radio).toFixed(2));`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={calcular}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="radio">Radio de la esfera:</label>
					<input
						type="number"
						id="radio"
						value={radio}
						onChange={(e) => setRadio(e.target.value)}
						step="any"
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="precision">Decimales:</label>
					<select
						id="precision"
						value={precision}
						onChange={(e) => setPrecision(parseInt(e.target.value))}
						className={styles.select}>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular
				</button>
			</form>

			{resultados && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.formulas}>
						<div className={styles.formula}>
							<h4>Área:</h4>
							<p>A = 4πr²</p>
							<p>
								A = 4 × {resultados.pi} × {resultados.radio}²
							</p>
							<p className={styles.total}>A = {resultados.area} u²</p>
						</div>
						<div className={styles.formula}>
							<h4>Volumen:</h4>
							<p>V = (4/3)πr³</p>
							<p>
								V = 4/3 × {resultados.pi} × {resultados.radio}³
							</p>
							<p className={styles.total}>V = {resultados.volumen} u³</p>
						</div>
					</div>

					<div className={styles.visualizacion}>
						<div
							className={styles.esfera}
							style={{
								width: `${Math.min(200, resultados.radio * 20)}px`,
								height: `${Math.min(200, resultados.radio * 20)}px`,
							}}
						/>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Fórmulas geométricas</li>
					<li>Math.PI y Math.pow</li>
					<li>Formateo de números decimales</li>
					<li>CSS para visualización 3D</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_31_CalculosEsfericos;
