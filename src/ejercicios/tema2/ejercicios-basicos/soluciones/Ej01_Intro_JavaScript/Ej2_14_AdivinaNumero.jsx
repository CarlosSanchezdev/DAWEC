/**
 * @fileoverview Juego para adivinar un número aleatorio con 5 intentos
 * @ejercicio 2.14
 * @tema Tema 2: JavaScript Sintaxis Básica
 * @fecha 15/05/2025
 */
import { useState, useEffect } from "react";
import styles from "./Ej2_14_AdivinaNumero.module.css";

/**
 * @function Ej2_14_AdivinaNumero
 * @description Juego donde el usuario debe adivinar un número entre 1 y 100 en 5 intentos
 * @returns {JSX.Element} Interfaz del juego
 */
function Ej2_14_AdivinaNumero() {
	const [numeroObjetivo, setNumeroObjetivo] = useState(0);
	const [intento, setIntento] = useState("");
	const [intentosRestantes, setIntentosRestantes] = useState(5);
	const [mensaje, setMensaje] = useState("");
	const [juegoTerminado, setJuegoTerminado] = useState(false);

	// Iniciar nuevo juego generando número aleatorio
	useEffect(() => {
		iniciarJuego();
	}, []);

	/**
	 * @function iniciarJuego
	 * @description Reinicia el juego con un nuevo número aleatorio
	 */
	const iniciarJuego = () => {
		setNumeroObjetivo(Math.floor(Math.random() * 100) + 1);
		setIntentosRestantes(5);
		setIntento("");
		setMensaje("¡Adivina el número entre 1 y 100!");
		setJuegoTerminado(false);
	};

	/**
	 * @function verificarIntento
	 * @description Verifica si el número ingresado coincide con el objetivo
	 */
	const verificarIntento = () => {
		const numeroIntento = parseInt(intento);

		if (isNaN(numeroIntento) || numeroIntento < 1 || numeroIntento > 100) {
			setMensaje("Por favor, ingresa un número válido entre 1 y 100.");
			return;
		}

		setIntentosRestantes((prev) => prev - 1);

		if (numeroIntento === numeroObjetivo) {
			setMensaje("¡Felicidades! ¡Has adivinado el número!");
			setJuegoTerminado(true);
			return;
		}

		if (intentosRestantes <= 1) {
			setMensaje(`¡Game Over! El número era ${numeroObjetivo}`);
			setJuegoTerminado(true);
			return;
		}

		const pista = numeroIntento < numeroObjetivo ? "El número es mayor" : "El número es menor";

		setMensaje(`${pista}. Te quedan ${intentosRestantes - 1} intentos.`);
		setIntento("");
	};

	return (
		<div className={styles.container}>
			<h3>Adivina el Número</h3>
			<div className={styles.gameArea}>
				<p className={styles.mensaje}>{mensaje}</p>
				<div className={styles.inputArea}>
					<input
						type="number"
						value={intento}
						onChange={(e) => setIntento(e.target.value)}
						placeholder="Ingresa un número"
						disabled={juegoTerminado}
						className={styles.input}
					/>
					{!juegoTerminado ? (
						<button
							onClick={verificarIntento}
							className={styles.button}>
							Intentar
						</button>
					) : (
						<button
							onClick={iniciarJuego}
							className={styles.button}>
							Jugar de nuevo
						</button>
					)}
				</div>
				<div className={styles.intentos}>Intentos restantes: {intentosRestantes}</div>
			</div>
		</div>
	);
}

export default Ej2_14_AdivinaNumero;
