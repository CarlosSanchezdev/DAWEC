/**
 * @fileoverview Ejercicio 2.13 - Calculadora de IVA
 * @ejercicio 2.13
 * @tema Operaciones Matemáticas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_13_CalculadoraIVA.module.css";

/**
 * @function Ej2_13_CalculadoraIVA
 * @description Componente que calcula el precio total con IVA
 * @returns {JSX.Element} Interfaz para calcular IVA
 */
function Ej2_13_CalculadoraIVA() {
	const [precioBase, setPrecioBase] = useState("");
	const [iva, setIva] = useState("21");
	const [resultado, setResultado] = useState(null);

	/**
	 * @function calcularIVA
	 * @description Calcula el precio total incluyendo IVA
	 * @param {Event} e Evento del formulario
	 */
	const calcularIVA = (e) => {
		e.preventDefault();
		const precio = parseFloat(precioBase);
		const porcentajeIVA = parseFloat(iva);

		if (isNaN(precio) || precio <= 0) {
			alert("Por favor, ingrese un precio válido mayor que 0");
			return;
		}

		if (isNaN(porcentajeIVA) || porcentajeIVA < 0 || porcentajeIVA > 100) {
			alert("Por favor, ingrese un porcentaje de IVA válido entre 0 y 100");
			return;
		}

		const montoIVA = precio * (porcentajeIVA / 100);
		const precioTotal = precio + montoIVA;

		setResultado({
			precioBase: precio,
			porcentajeIVA: porcentajeIVA,
			montoIVA: montoIVA,
			precioTotal: precioTotal,
		});
	};

	const codigoEjemplo = `// Código equivalente en JavaScript puro:
let precio = parseFloat(prompt("Ingrese el precio base:"));
let iva = parseFloat(prompt("Ingrese el porcentaje de IVA:"));

let montoIVA = precio * (iva / 100);
let precioTotal = precio + montoIVA;

alert(\`Precio total con IVA: \${precioTotal}\`);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={calcularIVA}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="precioBase">Precio base (€):</label>
					<input
						type="number"
						id="precioBase"
						value={precioBase}
						onChange={(e) => setPrecioBase(e.target.value)}
						required
						min="0"
						step="0.01"
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="iva">IVA (%):</label>
					<select
						id="iva"
						value={iva}
						onChange={(e) => setIva(e.target.value)}
						className={styles.input}>
						<option value="21">21% (Tipo general)</option>
						<option value="10">10% (Tipo reducido)</option>
						<option value="4">4% (Tipo superreducido)</option>
						<option value="0">0% (Exento)</option>
						<option value="custom">Otro porcentaje</option>
					</select>
					{iva === "custom" && (
						<input
							type="number"
							value={iva}
							onChange={(e) => setIva(e.target.value)}
							min="0"
							max="100"
							step="0.1"
							className={`${styles.input} ${styles.customInput}`}
							placeholder="Ingrese porcentaje..."
						/>
					)}
				</div>
				<button
					type="submit"
					className={styles.button}>
					Calcular
				</button>
			</form>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Desglose del cálculo:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Precio base:</span>
							<span>{resultado.precioBase.toFixed(2)} €</span>
						</div>
						<div className={styles.linea}>
							<span>IVA ({resultado.porcentajeIVA}%):</span>
							<span>{resultado.montoIVA.toFixed(2)} €</span>
						</div>
						<div className={`${styles.linea} ${styles.total}`}>
							<span>Precio total:</span>
							<span>{resultado.precioTotal.toFixed(2)} €</span>
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Tipos de IVA en España:</h3>
				<ul>
					<li>
						<strong>21% (General):</strong> La mayoría de productos y servicios
					</li>
					<li>
						<strong>10% (Reducido):</strong> Alimentos, transporte, vivienda
					</li>
					<li>
						<strong>4% (Superreducido):</strong> Pan, leche, huevos, medicamentos
					</li>
					<li>
						<strong>0% (Exento):</strong> Servicios médicos, educación, seguros
					</li>
				</ul>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Porcentajes y cálculos</li>
					<li>Validación de entrada</li>
					<li>Formateo de números decimales</li>
					<li>Manejo de formularios</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_13_CalculadoraIVA;
