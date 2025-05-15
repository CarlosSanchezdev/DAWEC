/**
 * @fileoverview Ejercicio 2.19 - Conversor de Temperatura
 * @ejercicio 2.19
 * @tema Conversiones y Fórmulas
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_19_ConversorTemperatura.module.css";

/**
 * @function convertirTemperatura
 * @description Convierte temperaturas entre Celsius, Fahrenheit y Kelvin
 * @param {number} valor - Valor a convertir
 * @param {string} desde - Unidad de origen
 * @param {string} hasta - Unidad de destino
 * @returns {number} Temperatura convertida
 */
const convertirTemperatura = (valor, desde, hasta) => {
	// Primero convertimos a Celsius como unidad intermedia
	let celsius;
	switch (desde) {
		case "celsius":
			celsius = valor;
			break;
		case "fahrenheit":
			celsius = ((valor - 32) * 5) / 9;
			break;
		case "kelvin":
			celsius = valor - 273.15;
			break;
		default:
			throw new Error("Unidad de origen no válida");
	}

	// Luego convertimos de Celsius a la unidad objetivo
	switch (hasta) {
		case "celsius":
			return celsius;
		case "fahrenheit":
			return (celsius * 9) / 5 + 32;
		case "kelvin":
			return celsius + 273.15;
		default:
			throw new Error("Unidad de destino no válida");
	}
};

/**
 * @function Ej2_19_ConversorTemperatura
 * @description Componente que permite convertir entre diferentes unidades de temperatura
 * @returns {JSX.Element} Interfaz para convertir temperaturas
 */
function Ej2_19_ConversorTemperatura() {
	const [temperatura, setTemperatura] = useState("");
	const [unidadOrigen, setUnidadOrigen] = useState("celsius");
	const [unidadDestino, setUnidadDestino] = useState("fahrenheit");
	const [resultado, setResultado] = useState(null);
	const [historial, setHistorial] = useState([]);

	const handleConversion = (e) => {
		e.preventDefault();
		const valor = parseFloat(temperatura);

		if (isNaN(valor)) {
			alert("Por favor, ingrese un valor numérico válido");
			return;
		}

		const resultadoConversion = convertirTemperatura(valor, unidadOrigen, unidadDestino);
		setResultado({
			valor: resultadoConversion,
			desde: unidadOrigen,
			hasta: unidadDestino,
			original: valor,
		});

		// Agregar al historial
		setHistorial((prev) => [
			{
				original: valor,
				desde: unidadOrigen,
				resultado: resultadoConversion,
				hasta: unidadDestino,
				timestamp: new Date().toLocaleTimeString(),
			},
			...prev.slice(0, 4), // Mantener solo las últimas 5 conversiones
		]);
	};

	const codigoEjemplo = `// Funciones de conversión de temperatura
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}`;

	const unidades = {
		celsius: "°C",
		fahrenheit: "°F",
		kelvin: "K",
	};

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Funciones de conversión:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={handleConversion}
				className={styles.form}>
				<div className={styles.inputRow}>
					<div className={styles.inputGroup}>
						<label htmlFor="temperatura">Temperatura:</label>
						<input
							type="number"
							id="temperatura"
							value={temperatura}
							onChange={(e) => setTemperatura(e.target.value)}
							required
							step="0.1"
							className={styles.input}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="unidadOrigen">De:</label>
						<select
							id="unidadOrigen"
							value={unidadOrigen}
							onChange={(e) => setUnidadOrigen(e.target.value)}
							className={styles.select}>
							<option value="celsius">Celsius (°C)</option>
							<option value="fahrenheit">Fahrenheit (°F)</option>
							<option value="kelvin">Kelvin (K)</option>
						</select>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="unidadDestino">A:</label>
						<select
							id="unidadDestino"
							value={unidadDestino}
							onChange={(e) => setUnidadDestino(e.target.value)}
							className={styles.select}>
							<option value="celsius">Celsius (°C)</option>
							<option value="fahrenheit">Fahrenheit (°F)</option>
							<option value="kelvin">Kelvin (K)</option>
						</select>
					</div>
				</div>
				<button
					type="submit"
					className={styles.button}>
					Convertir
				</button>
			</form>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultado:</h3>
					<div className={styles.conversion}>
						<span className={styles.valor}>
							{resultado.original.toFixed(2)}
							{unidades[resultado.desde]}
						</span>
						<span className={styles.igual}>=</span>
						<span className={styles.valor}>
							{resultado.valor.toFixed(2)}
							{unidades[resultado.hasta]}
						</span>
					</div>
				</div>
			)}

			{historial.length > 0 && (
				<div className={styles.historial}>
					<h3>Historial de conversiones:</h3>
					<div className={styles.lista}>
						{historial.map((item, index) => (
							<div
								key={index}
								className={styles.entrada}>
								<span className={styles.tiempo}>{item.timestamp}</span>
								<span className={styles.conversion}>
									{item.original.toFixed(2)}
									{unidades[item.desde]} →{item.resultado.toFixed(2)}
									{unidades[item.hasta]}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Fórmulas de conversión:</h3>
				<ul>
					<li>
						<strong>Celsius a Fahrenheit:</strong> °F = (°C × 9/5) + 32
					</li>
					<li>
						<strong>Fahrenheit a Celsius:</strong> °C = (°F - 32) × 5/9
					</li>
					<li>
						<strong>Celsius a Kelvin:</strong> K = °C + 273.15
					</li>
					<li>
						<strong>Kelvin a Celsius:</strong> °C = K - 273.15
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_19_ConversorTemperatura;
