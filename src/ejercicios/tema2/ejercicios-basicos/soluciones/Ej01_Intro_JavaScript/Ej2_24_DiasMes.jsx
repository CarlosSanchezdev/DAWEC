/**
 * @fileoverview Ejercicio 2.24 - Días del Mes
 * @ejercicio 2.24
 * @tema Estructuras de Control
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_24_DiasMes.module.css";

/**
 * @function getDiasMes
 * @description Devuelve el número de días de un mes dado
 * @param {number} mes Número del mes (1-12)
 * @param {number} año Año para verificar si es bisiesto
 * @returns {number} Número de días del mes
 */
const getDiasMes = (mes, año) => {
	switch (mes) {
		case 2: // Febrero
			return (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0 ? 29 : 28;
		case 4:
		case 6:
		case 9:
		case 11: // Abril, Junio, Septiembre, Noviembre
			return 30;
		default: // Resto de meses
			return 31;
	}
};

/**
 * @function getNombreMes
 * @description Devuelve el nombre del mes
 * @param {number} mes Número del mes (1-12)
 * @returns {string} Nombre del mes en español
 */
const getNombreMes = (mes) => {
	const meses = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];
	return meses[mes - 1];
};

/**
 * @function Ej2_24_DiasMes
 * @description Componente que identifica cuántos días tiene el mes
 * @returns {JSX.Element} Interfaz para calcular días del mes
 */
function Ej2_24_DiasMes() {
	const [mes, setMes] = useState(1);
	const [año, setAño] = useState(new Date().getFullYear());
	const [resultado, setResultado] = useState(null);

	/**
	 * @function calcularDias
	 * @description Calcula los días del mes seleccionado
	 */
	const calcularDias = () => {
		const dias = getDiasMes(parseInt(mes), parseInt(año));
		const nombreMes = getNombreMes(parseInt(mes));
		const esBisiesto = (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0;

		setResultado({
			mes: nombreMes,
			año,
			dias,
			esBisiesto,
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let mes = parseInt(prompt("Ingrese el número de mes (1-12):"));
let año = parseInt(prompt("Ingrese el año:"));
let dias;

switch (mes) {
    case 2: // Febrero
        dias = ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) ? 29 : 28;
        break;
    case 4: case 6: case 9: case 11:
        dias = 30;
        break;
    default:
        dias = 31;
}

console.log(\`El mes \${mes} del año \${año} tiene \${dias} días.\`);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="mes">Mes:</label>
					<select
						id="mes"
						value={mes}
						onChange={(e) => setMes(e.target.value)}
						className={styles.select}>
						{Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
							<option
								key={num}
								value={num}>
								{getNombreMes(num)}
							</option>
						))}
					</select>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="año">Año:</label>
					<input
						type="number"
						id="año"
						value={año}
						onChange={(e) => setAño(e.target.value)}
						min="1"
						className={styles.input}
					/>
				</div>
				<button
					onClick={calcularDias}
					className={styles.button}>
					Calcular Días
				</button>
			</div>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultado:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Mes:</span>
							<span>{resultado.mes}</span>
						</div>
						<div className={styles.linea}>
							<span>Año:</span>
							<span>{resultado.año}</span>
						</div>
						{resultado.mes === "Febrero" && (
							<div className={styles.linea}>
								<span>¿Año bisiesto?</span>
								<span>{resultado.esBisiesto ? "Sí" : "No"}</span>
							</div>
						)}
						<div className={`${styles.linea} ${styles.total}`}>
							<span>Días en el mes:</span>
							<span>{resultado.dias}</span>
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Uso de switch para manejar casos múltiples</li>
					<li>Cálculo de años bisiestos</li>
					<li>Manejo de fechas</li>
					<li>Operadores lógicos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_24_DiasMes;
