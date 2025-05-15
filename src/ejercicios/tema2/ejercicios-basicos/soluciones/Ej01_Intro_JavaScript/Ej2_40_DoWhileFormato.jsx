/**
 * @fileoverview Ejercicio 2.40 - Bucle Do-While con Formato
 * @ejercicio 2.40
 * @tema Bucles y Formato
 * @fecha 15/05/2025
 */

import { useState, useEffect } from "react";
import styles from "./Ej2_40_DoWhileFormato.module.css";

/**
 * @typedef {Object} ConfiguracionFormato
 * @property {number} incremento - Valor del incremento entre números
 * @property {number} numerosLinea - Cantidad de números por línea
 * @property {string} separadorNumeros - Separador entre números
 * @property {string} separadorLineas - Separador entre líneas
 */

/**
 * @typedef {Object} ResultadoSecuencia
 * @property {number[][]} lineas - Array de líneas, cada una con sus números
 * @property {number} totalNumeros - Total de números generados
 * @property {number} totalLineas - Total de líneas generadas
 */

/**
 * @function generarSecuenciaDoWhile
 * @description Genera una secuencia de números usando do-while
 * @param {ConfiguracionFormato} config - Configuración del formato
 * @returns {ResultadoSecuencia} Resultado de la generación
 */
const generarSecuenciaDoWhile = (config) => {
	const resultado = {
		lineas: [],
		totalNumeros: 0,
		totalLineas: 0,
	};

	let numeroActual = 1;
	let lineaActual = [];

	do {
		lineaActual.push(numeroActual);
		resultado.totalNumeros++;

		if (lineaActual.length === config.numerosLinea || numeroActual + config.incremento > 25) {
			resultado.lineas.push([...lineaActual]);
			resultado.totalLineas++;
			lineaActual = [];
		}

		numeroActual += config.incremento;
	} while (numeroActual <= 25);

	return resultado;
};

/**
 * @function Ej2_40_DoWhileFormato
 * @description Componente que muestra números usando do-while con formato
 * @returns {JSX.Element} Componente React
 */
function Ej2_40_DoWhileFormato() {
	const [config, setConfig] = useState({
		incremento: 3,
		numerosLinea: 4,
		separadorNumeros: "espacio",
		separadorLineas: "nueva-linea",
	});

	const [resultado, setResultado] = useState(null);
	const [mostrarDetalles, setMostrarDetalles] = useState(false);
	const [mostrarCodigo, setMostrarCodigo] = useState(false);
	const [temaVisual, setTemaVisual] = useState("claro");

	const separadoresNumeros = {
		espacio: " ",
		coma: ", ",
		guion: " - ",
		punto: " • ",
		flecha: " → ",
	};

	const separadoresLineas = {
		"nueva-linea": "\n",
		"doble-linea": "\n\n",
		barra: " | ",
		puntos: " ... ",
		personalizado: " ◆ ",
	};

	useEffect(() => {
		actualizarSecuencia();
	}, [config]);

	/**
	 * @function actualizarSecuencia
	 * @description Actualiza la secuencia cuando cambia la configuración
	 */
	const actualizarSecuencia = () => {
		const nuevoResultado = generarSecuenciaDoWhile(config);
		setResultado(nuevoResultado);
	};

	return (
		<div className={`${styles.container} ${styles[`tema-${temaVisual}`]}`}>
			<h2 className={styles.titulo}>Bucle Do-While con Formato</h2>

			<div className={styles.controles}>
				<div className={styles.controlGrupo}>
					<label htmlFor="incremento">Incremento:</label>
					<input
						type="number"
						id="incremento"
						min="1"
						max="5"
						value={config.incremento}
						onChange={(e) =>
							setConfig({
								...config,
								incremento: parseInt(e.target.value) || 1,
							})
						}
						className={styles.input}
					/>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="numerosLinea">Números por línea:</label>
					<input
						type="number"
						id="numerosLinea"
						min="1"
						max="10"
						value={config.numerosLinea}
						onChange={(e) =>
							setConfig({
								...config,
								numerosLinea: parseInt(e.target.value) || 1,
							})
						}
						className={styles.input}
					/>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="separadorNumeros">Separador de números:</label>
					<select
						id="separadorNumeros"
						value={config.separadorNumeros}
						onChange={(e) =>
							setConfig({
								...config,
								separadorNumeros: e.target.value,
							})
						}
						className={styles.select}>
						<option value="espacio">Espacio</option>
						<option value="coma">Coma</option>
						<option value="guion">Guión</option>
						<option value="punto">Punto</option>
						<option value="flecha">Flecha</option>
					</select>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="separadorLineas">Separador de líneas:</label>
					<select
						id="separadorLineas"
						value={config.separadorLineas}
						onChange={(e) =>
							setConfig({
								...config,
								separadorLineas: e.target.value,
							})
						}
						className={styles.select}>
						<option value="nueva-linea">Nueva línea</option>
						<option value="doble-linea">Doble línea</option>
						<option value="barra">Barra vertical</option>
						<option value="puntos">Puntos</option>
						<option value="personalizado">Personalizado</option>
					</select>
				</div>

				<div className={styles.controlGrupo}>
					<label htmlFor="temaVisual">Tema visual:</label>
					<select
						id="temaVisual"
						value={temaVisual}
						onChange={(e) => setTemaVisual(e.target.value)}
						className={styles.select}>
						<option value="claro">Claro</option>
						<option value="oscuro">Oscuro</option>
						<option value="colorido">Colorido</option>
					</select>
				</div>
			</div>

			{resultado && (
				<div className={styles.resultadoContainer}>
					<div className={styles.secuenciaDisplay}>
						{resultado.lineas.map((linea, indexLinea) => (
							<div
								key={indexLinea}
								className={styles.lineaNumeros}>
								{linea.map((numero, indexNumero) => (
									<span
										key={indexNumero}
										className={styles.numero}>
										{numero}
										{indexNumero < linea.length - 1 && (
											<span className={styles.separador}>
												{separadoresNumeros[config.separadorNumeros]}
											</span>
										)}
									</span>
								))}
								{indexLinea < resultado.lineas.length - 1 && (
									<span className={styles.separadorLinea}>
										{separadoresLineas[config.separadorLineas]}
									</span>
								)}
							</div>
						))}
					</div>

					<div className={styles.estadisticas}>
						<div className={styles.estadisticaItem}>
							<span className={styles.etiqueta}>Total números:</span>
							<span className={styles.valor}>{resultado.totalNumeros}</span>
						</div>
						<div className={styles.estadisticaItem}>
							<span className={styles.etiqueta}>Total líneas:</span>
							<span className={styles.valor}>{resultado.totalLineas}</span>
						</div>
					</div>
				</div>
			)}

			<div className={styles.botonesControl}>
				<button
					className={styles.boton}
					onClick={() => setMostrarDetalles(!mostrarDetalles)}>
					{mostrarDetalles ? "Ocultar Detalles" : "Mostrar Detalles"}
				</button>
				<button
					className={styles.boton}
					onClick={() => setMostrarCodigo(!mostrarCodigo)}>
					{mostrarCodigo ? "Ocultar Código" : "Mostrar Código"}
				</button>
			</div>

			{mostrarDetalles && (
				<div className={styles.detalles}>
					<h3>Detalles de Implementación</h3>
					<div className={styles.seccionDetalles}>
						<h4>Características del bucle do-while</h4>
						<ul>
							<li>
								<strong>Ejecución inicial garantizada:</strong> El bloque se ejecuta al menos una vez
							</li>
							<li>
								<strong>Condición posterior:</strong> La evaluación se realiza después de cada iteración
							</li>
							<li>
								<strong>Control de formato:</strong> Manejo de líneas y separadores dinámico
							</li>
						</ul>
					</div>

					<div className={styles.seccionDetalles}>
						<h4>Ventajas de esta implementación</h4>
						<ul>
							<li>
								<strong>Flexibilidad:</strong> Permite cambiar el formato en tiempo real
							</li>
							<li>
								<strong>Mantenibilidad:</strong> Código modular y bien estructurado
							</li>
							<li>
								<strong>Reutilización:</strong> Funciones separadas para generación y formato
							</li>
						</ul>
					</div>
				</div>
			)}

			{mostrarCodigo && (
				<div className={styles.codigo}>
					<h3>Implementación del bucle do-while</h3>
					<pre className={styles.codigoContenido}>
						{`let numeroActual = 1;
let lineaActual = [];

do {
    lineaActual.push(numeroActual);
    
    if (lineaActual.length === ${config.numerosLinea} || 
        numeroActual + ${config.incremento} > 25) {
        // Guardar línea actual y crear nueva
        resultado.lineas.push([...lineaActual]);
        lineaActual = [];
    }

    numeroActual += ${config.incremento};
} while (numeroActual <= 25);`}
					</pre>
				</div>
			)}
		</div>
	);
}

export default Ej2_40_DoWhileFormato;
