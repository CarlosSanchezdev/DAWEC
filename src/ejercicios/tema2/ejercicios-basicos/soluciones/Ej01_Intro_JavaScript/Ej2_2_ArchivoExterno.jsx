/**
 * @fileoverview Ejercicio 2.2 - Archivo JS Externo
 * @ejercicio 2.2
 * @tema Introducción a JavaScript
 * @fecha 2024-01-25
 */

import React from "react";
import styles from "./Ej2_2_ArchivoExterno.module.css";

// IMPORTANTE: Este es el script externo que contiene la lógica de la calculadora
import { sumar, restar, multiplicar, dividir } from "./calculadora";

/**
 * @function Ej2_2_ArchivoExterno
 * @description Componente que demuestra el uso de un archivo JavaScript externo
 *             implementando una calculadora básica
 * @returns {JSX.Element} Componente renderizado
 */
const Ej2_2_ArchivoExterno = () => {
	// ===== HOOKS =====
	const [num1, setNum1] = React.useState(0);
	const [num2, setNum2] = React.useState(0);
	const [resultado, setResultado] = React.useState(null);
	const [operacion, setOperacion] = React.useState("sumar");

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function calcular
	 * @description Realiza la operación seleccionada con los números ingresados
	 */
	const calcular = () => {
		const n1 = parseFloat(num1);
		const n2 = parseFloat(num2);

		switch (operacion) {
			case "sumar":
				setResultado(sumar(n1, n2));
				break;
			case "restar":
				setResultado(restar(n1, n2));
				break;
			case "multiplicar":
				setResultado(multiplicar(n1, n2));
				break;
			case "dividir":
				if (n2 === 0) {
					alert("No se puede dividir por cero");
					return;
				}
				setResultado(dividir(n1, n2));
				break;
			default:
				setResultado(null);
		}
	};

	// ===== RENDER =====
	return (
		<div className={styles.container}>
			<h2>Ejercicio 2.2 - Archivo JS Externo</h2>

			<div className={styles.calculadora}>
				<div className={styles.inputs}>
					<input
						type="number"
						value={num1}
						onChange={(e) => setNum1(e.target.value)}
						placeholder="Primer número"
					/>
					<select
						value={operacion}
						onChange={(e) => setOperacion(e.target.value)}>
						<option value="sumar">+</option>
						<option value="restar">-</option>
						<option value="multiplicar">×</option>
						<option value="dividir">÷</option>
					</select>
					<input
						type="number"
						value={num2}
						onChange={(e) => setNum2(e.target.value)}
						placeholder="Segundo número"
					/>
				</div>

				<button
					onClick={calcular}
					className={styles.button}>
					Calcular
				</button>

				{resultado !== null && (
					<div className={styles.resultado}>
						<p>Resultado: {resultado}</p>
					</div>
				)}
			</div>

			<div className={styles.explanation}>
				<h3>Explicación:</h3>
				<p>Este ejercicio demuestra cómo organizar el código JavaScript en archivos externos:</p>
				<ul>
					<li>La lógica de la calculadora está en un archivo separado</li>
					<li>Uso de imports/exports para modularizar el código</li>
					<li>Separación de responsabilidades y mejor organización</li>
				</ul>
			</div>
		</div>
	);
};

export default Ej2_2_ArchivoExterno;
