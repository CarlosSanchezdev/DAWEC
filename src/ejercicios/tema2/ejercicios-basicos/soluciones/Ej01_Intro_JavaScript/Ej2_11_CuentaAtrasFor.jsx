/**
 * @fileoverview Ejercicio 2.11 - Cuenta Atrás con For
 * @ejercicio 2.11
 * @tema Estructuras de Control
 * @fecha 15/05/2025
 */

import { useState, useEffect, useRef } from "react";
import styles from "./Ej2_11_CuentaAtrasFor.module.css";

/**
 * @function Ej2_11_CuentaAtrasFor
 * @description Componente que realiza una cuenta atrás usando un bucle for
 * @returns {JSX.Element} Interfaz para la cuenta atrás
 */
function Ej2_11_CuentaAtrasFor() {
	const [numeroInicial, setNumeroInicial] = useState("");
	const [cuentaAtras, setCuentaAtras] = useState([]);
	const [ejecutando, setEjecutando] = useState(false);
	const [velocidad, setVelocidad] = useState(1000);
	const timeoutRef = useRef(null);

	useEffect(() => {
		// Limpiar timeout al desmontar
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	/**
	 * @function iniciarCuentaAtras
	 * @description Inicia la cuenta atrás con animación
	 * @param {Event} e Evento del formulario
	 */
	const iniciarCuentaAtras = (e) => {
		e.preventDefault();
		const numero = parseInt(numeroInicial);

		if (isNaN(numero) || numero < 0) {
			alert("Por favor, ingrese un número válido mayor o igual a 0");
			return;
		}

		// Generar array con la secuencia de números
		const secuencia = [];
		for (let i = numero; i >= 0; i--) {
			secuencia.push(i);
		}

		setEjecutando(true);
		setCuentaAtras([]);

		// Mostrar números secuencialmente
		const mostrarSecuencia = (index) => {
			if (index < secuencia.length) {
				setCuentaAtras((prev) => [...prev, secuencia[index]]);
				timeoutRef.current = setTimeout(() => mostrarSecuencia(index + 1), velocidad);
			} else {
				setEjecutando(false);
			}
		};

		mostrarSecuencia(0);
	};

	/**
	 * @function detenerCuentaAtras
	 * @description Detiene la cuenta atrás actual
	 */
	const detenerCuentaAtras = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setEjecutando(false);
	};

	const codigoEjemplo = `// Código equivalente en JavaScript puro:
let numero = parseInt(prompt("Ingrese un número:"));
for (let i = numero; i >= 0; i--) {
    console.log(i);
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Implementación con for:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<form
				onSubmit={iniciarCuentaAtras}
				className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="numeroInicial">Número inicial:</label>
					<input
						type="number"
						id="numeroInicial"
						value={numeroInicial}
						onChange={(e) => setNumeroInicial(e.target.value)}
						required
						min="0"
						className={styles.input}
						disabled={ejecutando}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="velocidad">Velocidad (ms):</label>
					<input
						type="number"
						id="velocidad"
						value={velocidad}
						onChange={(e) => setVelocidad(Math.max(100, parseInt(e.target.value) || 1000))}
						min="100"
						step="100"
						className={styles.input}
						disabled={ejecutando}
					/>
				</div>
				<div className={styles.botones}>
					<button
						type="submit"
						className={styles.iniciarBtn}
						disabled={ejecutando}>
						Iniciar Cuenta Atrás
					</button>
					{ejecutando && (
						<button
							type="button"
							onClick={detenerCuentaAtras}
							className={styles.detenerBtn}>
							Detener
						</button>
					)}
				</div>
			</form>

			<div className={styles.display}>
				<div className={styles.numeroActual}>
					{cuentaAtras.length > 0 ? cuentaAtras[cuentaAtras.length - 1] : "-"}
				</div>
				<div className={styles.secuencia}>
					{cuentaAtras.map((num, index) => (
						<span
							key={index}
							className={styles.numero}>
							{num}
						</span>
					))}
				</div>
			</div>

			<div className={styles.comparacion}>
				<h3>Diferencias entre while y for:</h3>
				<ul>
					<li>El bucle for es más compacto y tiene la inicialización, condición e incremento en una línea</li>
					<li>El bucle while es más flexible para condiciones que no dependen de un contador</li>
					<li>En este caso, ambos logran el mismo resultado de manera eficiente</li>
				</ul>
			</div>

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Bucle for</li>
					<li>Decrementos</li>
					<li>Validación de entrada</li>
					<li>Animaciones temporizadas</li>
					<li>Gestión de estado en React</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_11_CuentaAtrasFor;
