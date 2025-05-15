/**
 * @fileoverview Ejercicio sobre Objetos Nativos en JavaScript
 * @ejercicio Ejercicio 1
 * @tema Tema 6 - Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ejercicios.css";

/**
 * @function Ej01_Objetos_Nativos
 * @description Componente que muestra ejemplos de uso de objetos nativos de JavaScript
 * @returns {JSX.Element} Componente con ejemplos de Date, Math, String, Array
 */
function Ej01_Objetos_Nativos() {
	// ===== HOOKS =====
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [randomNumbers, setRandomNumbers] = useState([]);
	const [stringDemo, setStringDemo] = useState({
		original: "JavaScript es un lenguaje de programación interpretado",
		transformed: "",
	});
	const [arrayDemo, setArrayDemo] = useState({
		original: [5, 2, 8, 1, 9, 4],
		transformed: [],
	});

	// ===== EFECTOS =====
	// Actualiza la fecha y hora cada segundo
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Inicializa los ejemplos al cargar
	useEffect(() => {
		// Genera 5 números aleatorios al iniciar
		generateRandomNumbers();

		// Ejemplos de manipulación de strings
		const original = stringDemo.original;
		const transformed = {
			uppercase: original.toUpperCase(),
			lowercase: original.toLowerCase(),
			words: original.split(" ").length,
			substring: original.substring(0, 10) + "...",
			replaced: original.replace("JavaScript", "JS"),
		};
		setStringDemo({ original, transformed });

		// Ejemplos de manipulación de arrays
		processArrayDemo();
	}, []);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function generateRandomNumbers
	 * @description Genera 5 números aleatorios entre 1 y 100
	 */
	const generateRandomNumbers = () => {
		const numbers = [];
		for (let i = 0; i < 5; i++) {
			numbers.push(Math.floor(Math.random() * 100) + 1);
		}
		setRandomNumbers(numbers);
	};

	/**
	 * @function processArrayDemo
	 * @description Realiza operaciones con el array de ejemplo
	 */
	const processArrayDemo = () => {
		const original = [...arrayDemo.original];
		const transformed = {
			sorted: [...original].sort((a, b) => a - b),
			reversed: [...original].reverse(),
			mapped: original.map((n) => n * 2),
			filtered: original.filter((n) => n > 4),
			reduced: original.reduce((acc, curr) => acc + curr, 0),
		};
		setArrayDemo({ original, transformed });
	};

	/**
	 * @function formatDate
	 * @description Formatea una fecha en un formato específico
	 * @param {Date} date - La fecha a formatear
	 * @param {string} format - El formato deseado
	 * @returns {string} La fecha formateada
	 */
	const formatDate = (date, format) => {
		const options = {};

		switch (format) {
			case "short":
				options.dateStyle = "short";
				break;
			case "long":
				options.dateStyle = "long";
				break;
			case "time":
				options.timeStyle = "medium";
				break;
			case "full":
				options.dateStyle = "full";
				options.timeStyle = "long";
				break;
			default:
				options.dateStyle = "medium";
		}

		return new Intl.DateTimeFormat("es-ES", options).format(date);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 1: Objetos Nativos en JavaScript</h2>

			<section className="seccion-ejercicio">
				<h3>Objeto Date</h3>
				<p>El objeto Date permite trabajar con fechas y horas en JavaScript.</p>

				<div className="demo-panel">
					<div className="date-display">
						<p>
							<strong>Fecha y hora actual:</strong> {currentDateTime.toString()}
						</p>
						<p>
							<strong>Formato corto:</strong> {formatDate(currentDateTime, "short")}
						</p>
						<p>
							<strong>Formato largo:</strong> {formatDate(currentDateTime, "long")}
						</p>
						<p>
							<strong>Solo hora:</strong> {formatDate(currentDateTime, "time")}
						</p>
						<p>
							<strong>Completo:</strong> {formatDate(currentDateTime, "full")}
						</p>
					</div>

					<div className="date-components">
						<p>
							<strong>Año:</strong> {currentDateTime.getFullYear()}
						</p>
						<p>
							<strong>Mes:</strong> {currentDateTime.getMonth() + 1}
						</p>
						<p>
							<strong>Día:</strong> {currentDateTime.getDate()}
						</p>
						<p>
							<strong>Día de la semana:</strong> {currentDateTime.getDay()}
						</p>
						<p>
							<strong>Hora:</strong> {currentDateTime.getHours()}
						</p>
						<p>
							<strong>Minutos:</strong> {currentDateTime.getMinutes()}
						</p>
						<p>
							<strong>Segundos:</strong> {currentDateTime.getSeconds()}
						</p>
					</div>
				</div>
			</section>

			<section className="seccion-ejercicio">
				<h3>Objeto Math</h3>
				<p>Math es un objeto incorporado que proporciona funcionalidades matemáticas básicas y constantes.</p>

				<div className="demo-panel">
					<div className="math-constants">
						<h4>Constantes matemáticas</h4>
						<p>
							<strong>PI (π):</strong> {Math.PI}
						</p>
						<p>
							<strong>Euler (e):</strong> {Math.E}
						</p>
						<p>
							<strong>Raíz cuadrada de 2:</strong> {Math.SQRT2}
						</p>
						<p>
							<strong>Logaritmo natural de 10:</strong> {Math.LN10}
						</p>
					</div>

					<div className="math-operations">
						<h4>Operaciones matemáticas</h4>
						<p>
							<strong>Redondeo:</strong> Math.round(4.7) = {Math.round(4.7)}
						</p>
						<p>
							<strong>Redondeo hacia arriba:</strong> Math.ceil(4.1) = {Math.ceil(4.1)}
						</p>
						<p>
							<strong>Redondeo hacia abajo:</strong> Math.floor(4.9) = {Math.floor(4.9)}
						</p>
						<p>
							<strong>Valor absoluto:</strong> Math.abs(-5) = {Math.abs(-5)}
						</p>
						<p>
							<strong>Potencia:</strong> Math.pow(2, 3) = {Math.pow(2, 3)}
						</p>
						<p>
							<strong>Raíz cuadrada:</strong> Math.sqrt(16) = {Math.sqrt(16)}
						</p>
					</div>

					<div className="math-random">
						<h4>Números aleatorios</h4>
						<p>Math.random() genera un número aleatorio entre 0 y 1</p>
						<button
							onClick={generateRandomNumbers}
							className="btn-generar">
							Generar 5 números aleatorios (1-100)
						</button>
						<div className="random-numbers">
							{randomNumbers.map((num, index) => (
								<span
									key={index}
									className="random-number">
									{num}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="seccion-ejercicio">
				<h3>Objeto String</h3>
				<p>String proporciona métodos para manipular cadenas de texto.</p>

				<div className="demo-panel">
					<h4>Texto original:</h4>
					<p className="string-original">"{stringDemo.original}"</p>

					<h4>Métodos de String:</h4>
					<div className="string-methods">
						<p>
							<strong>Longitud:</strong> {stringDemo.original.length} caracteres
						</p>
						<p>
							<strong>Mayúsculas:</strong> "{stringDemo.original.toUpperCase()}"
						</p>
						<p>
							<strong>Minúsculas:</strong> "{stringDemo.original.toLowerCase()}"
						</p>
						<p>
							<strong>Substring:</strong> "{stringDemo.original.substring(0, 10)}..."
						</p>
						<p>
							<strong>Reemplazar:</strong> "{stringDemo.original.replace("JavaScript", "JS")}"
						</p>
						<p>
							<strong>Posición:</strong> "JavaScript" comienza en la posición{" "}
							{stringDemo.original.indexOf("JavaScript")}
						</p>
						<p>
							<strong>Incluye "programación":</strong>{" "}
							{stringDemo.original.includes("programación") ? "Sí" : "No"}
						</p>
						<p>
							<strong>Número de palabras:</strong> {stringDemo.original.split(" ").length}
						</p>
					</div>
				</div>
			</section>

			<section className="seccion-ejercicio">
				<h3>Objeto Array</h3>
				<p>Array proporciona métodos para trabajar con colecciones ordenadas de datos.</p>

				<div className="demo-panel">
					<h4>Array original:</h4>
					<p className="array-original">[{arrayDemo.original.join(", ")}]</p>

					<h4>Métodos de Array:</h4>
					<div className="array-methods">
						<p>
							<strong>Ordenado:</strong> [{arrayDemo.transformed.sorted?.join(", ")}]
						</p>
						<p>
							<strong>Invertido:</strong> [{arrayDemo.transformed.reversed?.join(", ")}]
						</p>
						<p>
							<strong>Duplicado (map):</strong> [{arrayDemo.transformed.mapped?.join(", ")}]
						</p>
						<p>
							<strong>Filtrado ({">"}4):</strong> [{arrayDemo.transformed.filtered?.join(", ")}]
						</p>
						<p>
							<strong>Suma (reduce):</strong> {arrayDemo.transformed.reduced}
						</p>
					</div>
				</div>
			</section>

			<div className="ejercicio-footer">
				<p>
					<strong>NOTA:</strong> Este ejercicio muestra solo algunos de los métodos más comunes de estos
					objetos nativos. JavaScript ofrece muchas más funcionalidades.
				</p>
			</div>
		</div>
	);
}

export default Ej01_Objetos_Nativos;
