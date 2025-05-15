/**
 * @fileoverview Ejercicio 2.10 - Cuenta Atrás While
 * @ejercicio 2.10
 * @tema Estructuras de Control
 * @fecha 15/05/2025
 */

import { useState, useEffect, useRef } from "react";
import styles from "./Ej2_10_CuentaAtras.module.css";

/**
 * @function Ej2_10_CuentaAtras
 * @description Componente que realiza una cuenta atrás usando un bucle while
 * @returns {JSX.Element} Interfaz para la cuenta atrás
 */
function Ej2_10_CuentaAtras() {
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
		let i = numero;
		while (i >= 0) {
			secuencia.push(i);
			i--;
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
while (numero >= 0) {
    console.log(numero);
    numero--;
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Implementación con while:</h3>
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

			<div className={styles.footer}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Bucle while</li>
					<li>Decrementos</li>
					<li>Validación de entrada</li>
					<li>Animaciones temporizadas</li>
					<li>Gestión de estado en React</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_10_CuentaAtras;
