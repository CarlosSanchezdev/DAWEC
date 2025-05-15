/**
 * @fileoverview Ejercicio 2.27 - Validar Fecha
 * @ejercicio 2.27
 * @tema Validación y Fechas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_27_ValidarFecha.module.css";

/**
 * @function esBisiesto
 * @description Verifica si un año es bisiesto
 * @param {number} año Año a verificar
 * @returns {boolean} true si es bisiesto, false si no
 */
const esBisiesto = (año) => {
	return (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0;
};

/**
 * @function Ej2_27_ValidarFecha
 * @description Valida una fecha incluyendo años bisiestos
 * @returns {JSX.Element} Interfaz para validar fechas
 */
function Ej2_27_ValidarFecha() {
	const [fecha, setFecha] = useState({
		dia: "",
		mes: "",
		año: "",
	});
	const [resultado, setResultado] = useState(null);

	/**
	 * @function validarFecha
	 * @description Valida una fecha y muestra el resultado
	 * @param {Event} e Evento del formulario
	 */
	const validarFecha = (e) => {
		e.preventDefault();
		const dia = parseInt(fecha.dia);
		const mes = parseInt(fecha.mes);
		const año = parseInt(fecha.año);

		// Validaciones básicas
		if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
			setResultado({
				valida: false,
				mensaje: "Por favor, ingrese números válidos",
			});
			return;
		}

		if (mes < 1 || mes > 12) {
			setResultado({
				valida: false,
				mensaje: "El mes debe estar entre 1 y 12",
			});
			return;
		}

		if (año < 1) {
			setResultado({
				valida: false,
				mensaje: "El año debe ser un número positivo",
			});
			return;
		}

		// Obtener días del mes considerando años bisiestos
		let diasEnMes;
		switch (mes) {
			case 2: // Febrero
				diasEnMes = esBisiesto(año) ? 29 : 28;
				break;
			case 4:
			case 6:
			case 9:
			case 11: // Meses con 30 días
				diasEnMes = 30;
				break;
			default: // Meses con 31 días
				diasEnMes = 31;
		}

		if (dia < 1 || dia > diasEnMes) {
			setResultado({
				valida: false,
				mensaje: `El mes ${mes} tiene ${diasEnMes} días`,
			});
			return;
		}

		// Fecha válida
		const esBis = esBisiesto(año);
		setResultado({
			valida: true,
			mensaje: "La fecha es válida",
			detalles: {
				fecha: `${dia}/${mes}/${año}`,
				añoBisiesto: esBis,
				diasEnMes,
			},
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
function validarFecha(dia, mes, año) {
    // Validar rango del mes
    if (mes < 1 || mes > 12) return false;

    // Determinar días del mes
    let diasEnMes;
    switch (mes) {
        case 2: // Febrero
            diasEnMes = ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) ? 29 : 28;
            break;
        case 4: case 6: case 9: case 11:
            diasEnMes = 30;
            break;
        default:
            diasEnMes = 31;
    }

    // Validar día
    return dia >= 1 && dia <= diasEnMes;
}

let fecha = prompt("Ingrese fecha (DD/MM/AAAA):");
let [dia, mes, año] = fecha.split("/").map(Number);
console.log(validarFecha(dia, mes, año) ? "Fecha válida" : "Fecha inválida");`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={validarFecha}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="dia">Día:</label>
					<input
						type="number"
						id="dia"
						value={fecha.dia}
						onChange={(e) => setFecha({ ...fecha, dia: e.target.value })}
						required
						min="1"
						max="31"
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="mes">Mes:</label>
					<select
						id="mes"
						value={fecha.mes}
						onChange={(e) => setFecha({ ...fecha, mes: e.target.value })}
						required
						className={styles.select}>
						<option value="">Seleccione mes</option>
						<option value="1">Enero</option>
						<option value="2">Febrero</option>
						<option value="3">Marzo</option>
						<option value="4">Abril</option>
						<option value="5">Mayo</option>
						<option value="6">Junio</option>
						<option value="7">Julio</option>
						<option value="8">Agosto</option>
						<option value="9">Septiembre</option>
						<option value="10">Octubre</option>
						<option value="11">Noviembre</option>
						<option value="12">Diciembre</option>
					</select>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="año">Año:</label>
					<input
						type="number"
						id="año"
						value={fecha.año}
						onChange={(e) => setFecha({ ...fecha, año: e.target.value })}
						required
						min="1"
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Validar Fecha
				</button>
			</form>

			{resultado && (
				<div className={`${styles.resultado} ${resultado.valida ? styles.valido : styles.invalido}`}>
					<h3>Resultado:</h3>
					<p className={styles.mensaje}>{resultado.mensaje}</p>
					{resultado.valida && resultado.detalles && (
						<div className={styles.desglose}>
							<div className={styles.linea}>
								<span>Fecha:</span>
								<span>{resultado.detalles.fecha}</span>
							</div>
							<div className={styles.linea}>
								<span>Año bisiesto:</span>
								<span>{resultado.detalles.añoBisiesto ? "Sí" : "No"}</span>
							</div>
							<div className={styles.linea}>
								<span>Días en el mes:</span>
								<span>{resultado.detalles.diasEnMes}</span>
							</div>
						</div>
					)}
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Validación de fechas</li>
					<li>Cálculo de años bisiestos</li>
					<li>Uso de switch y operadores lógicos</li>
					<li>Manejo de formularios</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_27_ValidarFecha;
