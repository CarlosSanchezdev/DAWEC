/**
 * @fileoverview Ejercicio 2.34 - Calculadora de Propinas
 * @ejercicio 2.34
 * @tema Cálculos y Formato de Moneda
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_34_CalculadoraPropinas.module.css";

/**
 * @typedef {Object} ResultadoCalculo
 * @property {number} subtotal - Monto sin propina
 * @property {number} propina - Monto de la propina
 * @property {number} totalPorPersona - Total por persona incluyendo propina
 * @property {number} propinaPorPersona - Propina por persona
 * @property {number} total - Total incluyendo propina
 */

/**
 * @function formatearMoneda
 * @description Formatea un número como moneda en euros
 * @param {number} monto - Monto a formatear
 * @returns {string} Monto formateado como moneda
 */
const formatearMoneda = (monto) => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(monto);
};

/**
 * @function calcularPropina
 * @description Calcula la propina y los totales
 * @param {number} subtotal - Monto de la cuenta
 * @param {number} porcentajePropina - Porcentaje de propina
 * @param {number} numeroPersonas - Número de personas
 * @returns {ResultadoCalculo} Resultado del cálculo
 */
const calcularPropina = (subtotal, porcentajePropina, numeroPersonas) => {
	const propina = subtotal * (porcentajePropina / 100);
	const total = subtotal + propina;

	return {
		subtotal,
		propina,
		total,
		totalPorPersona: total / numeroPersonas,
		propinaPorPersona: propina / numeroPersonas,
	};
};

/**
 * @function Ej2_34_CalculadoraPropinas
 * @description Componente para calcular propinas y dividir la cuenta
 * @returns {JSX.Element} Componente React
 */
function Ej2_34_CalculadoraPropinas() {
	const [subtotal, setSubtotal] = useState("");
	const [porcentajePropina, setPorcentajePropina] = useState(10);
	const [numeroPersonas, setNumeroPersonas] = useState(1);
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState("");
	const [propinaPersonalizada, setPropinaPersonalizada] = useState(false);

	const porcentajesPredefinidos = [5, 10, 15, 20];

	/**
	 * @function validarEntrada
	 * @description Valida los datos de entrada
	 * @returns {boolean} true si los datos son válidos
	 */
	const validarEntrada = () => {
		if (!subtotal) {
			setError("Por favor, ingrese el monto de la cuenta");
			return false;
		}

		const montoSubtotal = parseFloat(subtotal);
		if (isNaN(montoSubtotal) || montoSubtotal <= 0) {
			setError("El monto debe ser un número positivo");
			return false;
		}

		if (porcentajePropina < 0) {
			setError("El porcentaje de propina no puede ser negativo");
			return false;
		}

		if (numeroPersonas < 1) {
			setError("Debe haber al menos una persona");
			return false;
		}

		return true;
	};

	/**
	 * @function calcular
	 * @description Realiza el cálculo de la propina y actualiza el estado
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");

		if (validarEntrada()) {
			const resultadoCalculo = calcularPropina(parseFloat(subtotal), porcentajePropina, numeroPersonas);
			setResultado(resultadoCalculo);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Calculadora de Propinas</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.inputGrupo}>
					<label htmlFor="subtotal">Total de la cuenta:</label>
					<div className={styles.inputMoneda}>
						<span>€</span>
						<input
							type="number"
							id="subtotal"
							value={subtotal}
							onChange={(e) => setSubtotal(e.target.value)}
							placeholder="0.00"
							step="0.01"
							min="0"
						/>
					</div>
				</div>

				<div className={styles.propinaGrupo}>
					<label>Porcentaje de propina:</label>
					<div className={styles.botonesGrupo}>
						{porcentajesPredefinidos.map((porcentaje) => (
							<button
								key={porcentaje}
								type="button"
								className={`${styles.botonPropina} ${
									porcentajePropina === porcentaje && !propinaPersonalizada ? styles.activo : ""
								}`}
								onClick={() => {
									setPorcentajePropina(porcentaje);
									setPropinaPersonalizada(false);
								}}>
								{porcentaje}%
							</button>
						))}
						<button
							type="button"
							className={`${styles.botonPropina} ${propinaPersonalizada ? styles.activo : ""}`}
							onClick={() => setPropinaPersonalizada(true)}>
							Otro
						</button>
					</div>
					{propinaPersonalizada && (
						<input
							type="number"
							value={porcentajePropina}
							onChange={(e) => setPorcentajePropina(parseFloat(e.target.value) || 0)}
							placeholder="Porcentaje personalizado"
							className={styles.inputPersonalizado}
							min="0"
							step="0.1"
						/>
					)}
				</div>

				<div className={styles.inputGrupo}>
					<label htmlFor="personas">Número de personas:</label>
					<input
						type="number"
						id="personas"
						value={numeroPersonas}
						onChange={(e) => setNumeroPersonas(parseInt(e.target.value) || 1)}
						min="1"
					/>
				</div>

				<button
					type="submit"
					className={styles.calcularBtn}>
					Calcular
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{resultado && (
				<div className={styles.resultado}>
					<div className={styles.resumenCuenta}>
						<div className={styles.filaCuenta}>
							<span>Subtotal:</span>
							<span>{formatearMoneda(resultado.subtotal)}</span>
						</div>
						<div className={styles.filaCuenta}>
							<span>Propina ({porcentajePropina}%):</span>
							<span>{formatearMoneda(resultado.propina)}</span>
						</div>
						<div className={`${styles.filaCuenta} ${styles.total}`}>
							<span>Total:</span>
							<span>{formatearMoneda(resultado.total)}</span>
						</div>
					</div>

					{numeroPersonas > 1 && (
						<div className={styles.divisionCuenta}>
							<h3>División de la cuenta</h3>
							<div className={styles.filaCuenta}>
								<span>Total por persona:</span>
								<span>{formatearMoneda(resultado.totalPorPersona)}</span>
							</div>
							<div className={styles.filaCuenta}>
								<span>Propina por persona:</span>
								<span>{formatearMoneda(resultado.propinaPorPersona)}</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Ej2_34_CalculadoraPropinas;
