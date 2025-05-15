/**
 * @fileoverview Ejercicio 2.18 - Columnas Numéricas
 * @ejercicio 2.18
 * @tema Bucles y Formateo
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_18_ColumnasNumericas.module.css";

/**
 * @function generarColumnas
 * @description Genera dos columnas numéricas según los parámetros especificados
 * @param {number} inicio Número inicial
 * @param {number} fin Número final
 * @param {number} incremento Incremento entre números
 * @returns {Array} Array con los números generados para ambas columnas
 */
const generarColumnas = (inicio, fin, incremento) => {
	const columna1 = [];
	const columna2 = [];
	let valor = inicio;

	while (valor <= fin) {
		columna1.push(valor);
		columna2.push(valor * 2); // Segunda columna muestra el doble
		valor += incremento;
	}

	return [columna1, columna2];
};

/**
 * @function Ej2_18_ColumnasNumericas
 * @description Componente que muestra dos columnas numéricas relacionadas
 * @returns {JSX.Element} Interfaz para generar y mostrar columnas numéricas
 */
function Ej2_18_ColumnasNumericas() {
	const [config, setConfig] = useState({
		inicio: 1,
		fin: 10,
		incremento: 1,
	});
	const [columnas, setColumnas] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { inicio, fin, incremento } = config;

		if (inicio > fin) {
			alert("El número inicial debe ser menor o igual al final");
			return;
		}

		if (incremento <= 0) {
			alert("El incremento debe ser mayor que 0");
			return;
		}

		if ((fin - inicio) / incremento > 100) {
			alert("La secuencia generaría demasiados números. Por favor, ajuste los valores.");
			return;
		}

		setColumnas(generarColumnas(inicio, fin, incremento));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setConfig((prev) => ({
			...prev,
			[name]: Number(value),
		}));
	};

	const codigoEjemplo = `// Generación de columnas numéricas
let inicio = 1, fin = 10, incremento = 1;
let columna1 = [], columna2 = [];
let valor = inicio;

while (valor <= fin) {
    columna1.push(valor);
    columna2.push(valor * 2);
    valor += incremento;
}

// Mostrar columnas
for (let i = 0; i < columna1.length; i++) {
    console.log(\`\${columna1[i].toString().padStart(3)} | \${columna2[i].toString().padStart(3)}\`);
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={handleSubmit}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="inicio">Número inicial:</label>
					<input
						type="number"
						id="inicio"
						name="inicio"
						value={config.inicio}
						onChange={handleInputChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="fin">Número final:</label>
					<input
						type="number"
						id="fin"
						name="fin"
						value={config.fin}
						onChange={handleInputChange}
						required
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="incremento">Incremento:</label>
					<input
						type="number"
						id="incremento"
						name="incremento"
						value={config.incremento}
						onChange={handleInputChange}
						required
						min="1"
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Generar Columnas
				</button>
			</form>

			{columnas && (
				<div className={styles.resultado}>
					<div className={styles.columnas}>
						<div className={styles.columna}>
							<h3>Columna 1</h3>
							<div className={styles.numeros}>
								{columnas[0].map((num, i) => (
									<div
										key={i}
										className={styles.numero}>
										{num}
									</div>
								))}
							</div>
						</div>
						<div className={styles.columna}>
							<h3>Columna 2 (x2)</h3>
							<div className={styles.numeros}>
								{columnas[1].map((num, i) => (
									<div
										key={i}
										className={styles.numero}>
										{num}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>¿Cómo funciona?</h3>
				<ol>
					<li>Se definen los parámetros: inicio, fin e incremento</li>
					<li>Se genera la primera columna sumando el incremento en cada paso</li>
					<li>La segunda columna muestra el doble de cada valor</li>
					<li>Los números se alinean para mejor visualización</li>
				</ol>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Bucles while</li>
					<li>Arrays paralelos</li>
					<li>Formateo de números</li>
					<li>Validación de entrada</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_18_ColumnasNumericas;
