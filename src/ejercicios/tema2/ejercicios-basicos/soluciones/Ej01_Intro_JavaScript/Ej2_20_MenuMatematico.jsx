/**
 * @fileoverview Ejercicio 2.20 - Menú Matemático
 * @ejercicio 2.20
 * @tema Operaciones matemáticas y menús
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_20_MenuMatematico.module.css";

/**
 * @function realizarOperacion
 * @description Realiza la operación matemática seleccionada
 * @param {string} operacion - Tipo de operación a realizar
 * @param {number[]} numeros - Array con los números a operar
 * @returns {number|string} Resultado de la operación o mensaje de error
 */
const realizarOperacion = (operacion, numeros) => {
	const [num1, num2] = numeros.map((n) => parseFloat(n));

	if (numeros.some((n) => n === "" || isNaN(n))) {
		return "Por favor, ingrese números válidos";
	}

	switch (operacion) {
		case "suma":
			return num1 + num2;
		case "resta":
			return num1 - num2;
		case "multiplicacion":
			return num1 * num2;
		case "division":
			if (num2 === 0) return "No se puede dividir por cero";
			return num1 / num2;
		case "potencia":
			return Math.pow(num1, num2);
		case "raiz":
			if (num1 < 0) return "No existe raíz real de número negativo";
			return Math.pow(num1, 1 / num2);
		case "modulo":
			if (num2 === 0) return "No se puede calcular módulo con divisor cero";
			return num1 % num2;
		case "max":
			return Math.max(num1, num2);
		case "min":
			return Math.min(num1, num2);
		default:
			return "Operación no válida";
	}
};

/**
 * @function Ej2_20_MenuMatematico
 * @description Componente que implementa una calculadora con menú de operaciones
 * @returns {JSX.Element} Interfaz de la calculadora
 */
function Ej2_20_MenuMatematico() {
	const [numeros, setNumeros] = useState(["", ""]);
	const [operacion, setOperacion] = useState("suma");
	const [resultado, setResultado] = useState(null);
	const [historial, setHistorial] = useState([]);

	const operaciones = [
		{ id: "suma", nombre: "Suma", simbolo: "+", descripcion: "Suma dos números" },
		{ id: "resta", nombre: "Resta", simbolo: "-", descripcion: "Resta el segundo número del primero" },
		{ id: "multiplicacion", nombre: "Multiplicación", simbolo: "×", descripcion: "Multiplica dos números" },
		{ id: "division", nombre: "División", simbolo: "÷", descripcion: "Divide el primer número entre el segundo" },
		{
			id: "potencia",
			nombre: "Potencia",
			simbolo: "^",
			descripcion: "Eleva el primer número a la potencia del segundo",
		},
		{
			id: "raiz",
			nombre: "Raíz",
			simbolo: "√",
			descripcion: "Calcula la raíz del primer número con índice del segundo",
		},
		{ id: "modulo", nombre: "Módulo", simbolo: "%", descripcion: "Calcula el resto de la división" },
		{ id: "max", nombre: "Máximo", simbolo: "max", descripcion: "Encuentra el mayor entre dos números" },
		{ id: "min", nombre: "Mínimo", simbolo: "min", descripcion: "Encuentra el menor entre dos números" },
	];

	const handleNumeroChange = (index, value) => {
		const nuevosNumeros = [...numeros];
		nuevosNumeros[index] = value;
		setNumeros(nuevosNumeros);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const res = realizarOperacion(operacion, numeros);

		if (typeof res === "number") {
			const nuevaOperacion = {
				numeros: [...numeros],
				operacion: operaciones.find((op) => op.id === operacion),
				resultado: res,
				timestamp: new Date().toLocaleTimeString(),
			};

			setHistorial((prev) => [nuevaOperacion, ...prev.slice(0, 4)]);
		}

		setResultado(res);
	};

	const codigoEjemplo = `// Ejemplo de implementación de operaciones matemáticas
function calcular(operacion, num1, num2) {
    switch (operacion) {
        case "suma":
            return num1 + num2;
        case "resta":
            return num1 - num2;
        case "multiplicacion":
            return num1 * num2;
        case "division":
            if (num2 === 0) throw new Error("División por cero");
            return num1 / num2;
        // ... más operaciones
    }
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
				<div className={styles.inputs}>
					<div className={styles.inputGroup}>
						<label>Primer número:</label>
						<input
							type="number"
							value={numeros[0]}
							onChange={(e) => handleNumeroChange(0, e.target.value)}
							className={styles.input}
							step="any"
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Segundo número:</label>
						<input
							type="number"
							value={numeros[1]}
							onChange={(e) => handleNumeroChange(1, e.target.value)}
							className={styles.input}
							step="any"
							required
						/>
					</div>
				</div>

				<div className={styles.operaciones}>
					<h3>Seleccione una operación:</h3>
					<div className={styles.opciones}>
						{operaciones.map((op) => (
							<label
								key={op.id}
								className={styles.opcion}>
								<input
									type="radio"
									name="operacion"
									value={op.id}
									checked={operacion === op.id}
									onChange={(e) => setOperacion(e.target.value)}
								/>
								<span className={styles.simbolo}>{op.simbolo}</span>
								<span className={styles.nombre}>{op.nombre}</span>
								<span className={styles.descripcion}>{op.descripcion}</span>
							</label>
						))}
					</div>
				</div>

				<button
					type="submit"
					className={styles.button}>
					Calcular
				</button>
			</form>

			{resultado !== null && (
				<div className={`${styles.resultado} ${typeof resultado === "string" ? styles.error : ""}`}>
					<h3>Resultado:</h3>
					<div className={styles.valor}>
						{typeof resultado === "number" ? resultado.toFixed(4) : resultado}
					</div>
				</div>
			)}

			{historial.length > 0 && (
				<div className={styles.historial}>
					<h3>Historial de operaciones:</h3>
					<div className={styles.lista}>
						{historial.map((item, index) => (
							<div
								key={index}
								className={styles.entrada}>
								<span className={styles.tiempo}>{item.timestamp}</span>
								<span className={styles.operacionHistorial}>
									{item.numeros[0]} {item.operacion.simbolo} {item.numeros[1]} ={" "}
									{item.resultado.toFixed(4)}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			<div className={styles.footer}>
				<h3>Notas importantes:</h3>
				<ul>
					<li>La división por cero no está permitida</li>
					<li>La raíz de números negativos no es calculable en números reales</li>
					<li>Los resultados se redondean a 4 decimales</li>
					<li>Se mantiene un historial de las últimas 5 operaciones</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_20_MenuMatematico;
