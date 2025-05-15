/**
 * @fileoverview Ejercicio 2.39 - Repetición con While
 * @ejercicio 2.39
 * @tema Bucles y Concatenación
 * @fecha 15/05/2025
 */

import { useState, useRef, useEffect } from "react";
import styles from "./Ej2_39_RepeticionWhile.module.css";

/**
 * @function generarRepeticiones
 * @description Genera una cadena con la palabra repetida N veces
 * @param {string} palabra - Palabra a repetir
 * @param {number} veces - Número de repeticiones
 * @param {string} separador - Separador entre palabras
 * @returns {string} Cadena con las repeticiones
 */
const generarRepeticiones = (palabra, veces, separador = " ") => {
	let resultado = "";
	let contador = 0;

	while (contador < veces) {
		resultado += palabra;
		if (contador < veces - 1) {
			resultado += separador;
		}
		contador++;
	}

	return resultado;
};

/**
 * @typedef {Object} AnimacionConfig
 * @property {number} duracion - Duración de cada aparición en milisegundos
 * @property {number} intervalo - Intervalo entre apariciones en milisegundos
 */

/**
 * @function Ej2_39_RepeticionWhile
 * @description Componente que repite una palabra N veces usando while
 * @returns {JSX.Element} Componente React
 */
function Ej2_39_RepeticionWhile() {
	const [palabra, setPalabra] = useState("Feliz");
	const [repeticiones, setRepeticiones] = useState(5);
	const [separador, setSeparador] = useState(" ");
	const [resultado, setResultado] = useState("");
	const [animacion, setAnimacion] = useState(true);
	const [velocidad, setVelocidad] = useState(1);
	const [mostrarConfig, setMostrarConfig] = useState(false);

	const animacionRef = useRef(null);
	const palabrasRef = useRef([]);

	const velocidades = {
		0.5: { duracion: 1000, intervalo: 800 },
		1: { duracion: 500, intervalo: 400 },
		1.5: { duracion: 300, intervalo: 200 },
		2: { duracion: 200, intervalo: 100 },
	};

	/**
	 * @function generarPalabras
	 * @description Genera el resultado y actualiza la animación si está activa
	 */
	const generarPalabras = () => {
		const nuevoResultado = generarRepeticiones(palabra, repeticiones, separador);
		setResultado(nuevoResultado);
		palabrasRef.current = nuevoResultado.split(separador);

		if (animacion) {
			reiniciarAnimacion();
		}
	};

	/**
	 * @function reiniciarAnimacion
	 * @description Reinicia la animación de las palabras
	 */
	const reiniciarAnimacion = () => {
		if (animacionRef.current) {
			clearTimeout(animacionRef.current);
		}

		const elementos = document.querySelectorAll(`.${styles.palabra}`);
		elementos.forEach((el) => {
			el.style.opacity = "0";
			el.style.transform = "scale(0.5)";
		});

		const config = velocidades[velocidad];
		let index = 0;

		const animarSiguiente = () => {
			if (index < elementos.length) {
				const elemento = elementos[index];
				elemento.style.opacity = "1";
				elemento.style.transform = "scale(1)";

				index++;
				animacionRef.current = setTimeout(animarSiguiente, config.intervalo);
			}
		};

		animarSiguiente();
	};

	useEffect(() => {
		generarPalabras();
		return () => {
			if (animacionRef.current) {
				clearTimeout(animacionRef.current);
			}
		};
	}, [palabra, repeticiones, separador, animacion, velocidad]);

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Repetición con While</h2>

			<div className={styles.controles}>
				<div className={styles.controlGrupo}>
					<label htmlFor="palabra">Palabra:</label>
					<input
						type="text"
						id="palabra"
						value={palabra}
						onChange={(e) => setPalabra(e.target.value)}
						className={styles.input}
					/>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="repeticiones">Repeticiones:</label>
					<input
						type="number"
						id="repeticiones"
						min="1"
						max="20"
						value={repeticiones}
						onChange={(e) => setRepeticiones(parseInt(e.target.value) || 1)}
						className={styles.input}
					/>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="separador">Separador:</label>
					<select
						id="separador"
						value={separador}
						onChange={(e) => setSeparador(e.target.value)}
						className={styles.select}>
						<option value=" ">Espacio</option>
						<option value=", ">Coma</option>
						<option value=" - ">Guión</option>
						<option value=" | ">Barra</option>
						<option value=" ❤ ">Corazón</option>
					</select>
				</div>
			</div>

			<div className={styles.opciones}>
				<label className={styles.checkboxLabel}>
					<input
						type="checkbox"
						checked={animacion}
						onChange={(e) => setAnimacion(e.target.checked)}
					/>
					Animación
				</label>

				{animacion && (
					<div className={styles.velocidadControl}>
						<span>Velocidad:</span>
						<select
							value={velocidad}
							onChange={(e) => setVelocidad(parseFloat(e.target.value))}
							className={styles.select}>
							<option value={0.5}>0.5x</option>
							<option value={1}>1x</option>
							<option value={1.5}>1.5x</option>
							<option value={2}>2x</option>
						</select>
					</div>
				)}
			</div>

			<div className={styles.resultado}>
				{resultado.split(separador).map((p, index) => (
					<span
						key={index}
						className={`${styles.palabra} ${animacion ? styles.conAnimacion : ""}`}
						style={{
							transitionDuration: `${velocidades[velocidad].duracion}ms`,
						}}>
						{p}
						{index < resultado.split(separador).length - 1 && (
							<span className={styles.separador}>{separador}</span>
						)}
					</span>
				))}
			</div>

			<button
				className={styles.configBtn}
				onClick={() => setMostrarConfig(!mostrarConfig)}>
				{mostrarConfig ? "Ocultar Configuración" : "Mostrar Configuración"}
			</button>

			{mostrarConfig && (
				<div className={styles.configuracion}>
					<h3>Detalles de Implementación</h3>

					<div className={styles.seccion}>
						<h4>Bucle While</h4>
						<pre className={styles.codigo}>
							{`let contador = 0;
while (contador < ${repeticiones}) {
    resultado += "${palabra}";
    if (contador < ${repeticiones - 1}) {
        resultado += "${separador}";
    }
    contador++;
}`}
						</pre>
					</div>

					<div className={styles.seccion}>
						<h4>Características</h4>
						<ul>
							<li>
								<strong>Contador:</strong> Variable que lleva el control de las repeticiones
							</li>
							<li>
								<strong>Concatenación:</strong> Construcción progresiva de la cadena resultado
							</li>
							<li>
								<strong>Separador condicional:</strong> Se añade entre palabras, pero no al final
							</li>
						</ul>
					</div>

					<div className={styles.seccion}>
						<h4>Animación</h4>
						<ul>
							<li>
								<strong>Duración:</strong> {velocidades[velocidad].duracion}ms por palabra
							</li>
							<li>
								<strong>Intervalo:</strong> {velocidades[velocidad].intervalo}ms entre palabras
							</li>
							<li>
								<strong>Total:</strong> {velocidades[velocidad].intervalo * (repeticiones - 1)}ms de
								duración total
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default Ej2_39_RepeticionWhile;
