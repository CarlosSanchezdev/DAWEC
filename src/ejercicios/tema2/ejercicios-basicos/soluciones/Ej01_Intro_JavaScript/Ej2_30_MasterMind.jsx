/**
 * @fileoverview Ejercicio 2.30 - Master Mind
 * @ejercicio 2.30
 * @tema Juegos y Lógica
 * @fecha 15/05/2025
 */

import { useState, useEffect } from "react";
import styles from "./Ej2_30_MasterMind.module.css";

/**
 * @function generarCodigoSecreto
 * @description Genera un código secreto aleatorio de 4 dígitos
 * @returns {Array} Array con 4 dígitos aleatorios
 */
const generarCodigoSecreto = () => {
	const codigo = [];
	while (codigo.length < 4) {
		const num = Math.floor(Math.random() * 10);
		if (!codigo.includes(num)) {
			codigo.push(num);
		}
	}
	return codigo;
};

/**
 * @function calcularPistas
 * @description Calcula las pistas para un intento
 * @param {Array} intento Array con el intento del jugador
 * @param {Array} codigo Array con el código secreto
 * @returns {Object} Objeto con las pistas
 */
const calcularPistas = (intento, codigo) => {
	const pistas = {
		exactas: 0,
		parciales: 0,
	};

	// Comprobar posiciones exactas
	for (let i = 0; i < 4; i++) {
		if (intento[i] === codigo[i]) {
			pistas.exactas++;
		} else if (codigo.includes(intento[i])) {
			pistas.parciales++;
		}
	}

	return pistas;
};

/**
 * @function Ej2_30_MasterMind
 * @description Juego de Master Mind
 * @returns {JSX.Element} Interfaz del juego
 */
function Ej2_30_MasterMind() {
	const [dificultad, setDificultad] = useState("normal");
	const [codigo, setCodigo] = useState([]);
	const [intento, setIntento] = useState("");
	const [intentos, setIntentos] = useState([]);
	const [intentosRestantes, setIntentosRestantes] = useState(10);
	const [estado, setEstado] = useState("inicial"); // inicial, jugando, ganado, perdido
	const [puntuacion, setPuntuacion] = useState(0);
	const [mostrarTutorial, setMostrarTutorial] = useState(true);

	useEffect(() => {
		iniciarJuego();
	}, [dificultad]);

	/**
	 * @function iniciarJuego
	 * @description Inicia una nueva partida
	 */
	const iniciarJuego = () => {
		const nuevoCodigo = generarCodigoSecreto();
		setCodigo(nuevoCodigo);
		setIntento("");
		setIntentos([]);
		setEstado("jugando");
		setMostrarTutorial(false);
		setPuntuacion(0);

		// Ajustar intentos según dificultad
		switch (dificultad) {
			case "facil":
				setIntentosRestantes(12);
				break;
			case "normal":
				setIntentosRestantes(10);
				break;
			case "dificil":
				setIntentosRestantes(8);
				break;
		}
	};

	/**
	 * @function manejarIntento
	 * @description Procesa el intento del jugador
	 * @param {Event} e Evento del formulario
	 */
	const manejarIntento = (e) => {
		e.preventDefault();

		// Validar intento
		if (intento.length !== 4 || !/^\d{4}$/.test(intento)) {
			alert("Por favor, ingrese 4 dígitos diferentes");
			return;
		}

		const intentoArray = intento.split("").map(Number);
		if (new Set(intentoArray).size !== 4) {
			alert("Los dígitos deben ser diferentes");
			return;
		}

		// Calcular pistas
		const pistas = calcularPistas(intentoArray, codigo);
		const nuevoIntento = {
			numeros: intentoArray,
			pistas,
			timestamp: Date.now(),
		};

		// Actualizar estado del juego
		const nuevosIntentos = [...intentos, nuevoIntento];
		setIntentos(nuevosIntentos);
		setIntento("");
		setIntentosRestantes((prev) => prev - 1);

		// Calcular puntuación
		const puntosPorExacta = 25;
		const puntosPorParcial = 10;
		const nuevaPuntuacion = puntuacion + pistas.exactas * puntosPorExacta + pistas.parciales * puntosPorParcial;
		setPuntuacion(nuevaPuntuacion);

		// Verificar victoria o derrota
		if (pistas.exactas === 4) {
			const bonusPorDificultad = {
				facil: 50,
				normal: 100,
				dificil: 200,
			};
			const bonusIntentosRestantes = intentosRestantes * 25;
			setPuntuacion(nuevaPuntuacion + bonusPorDificultad[dificultad] + bonusIntentosRestantes);
			setEstado("ganado");
		} else if (intentosRestantes <= 1) {
			setEstado("perdido");
		}
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
function generarCodigoSecreto() {
    let codigo = [];
    while (codigo.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!codigo.includes(num)) codigo.push(num);
    }
    return codigo;
}

function verificarIntento(intento, codigo) {
    let exactas = 0, parciales = 0;
    
    for (let i = 0; i < 4; i++) {
        if (intento[i] === codigo[i]) exactas++;
        else if (codigo.includes(intento[i])) parciales++;
    }
    
    return { exactas, parciales };
}

// Iniciar juego
let codigo = generarCodigoSecreto();
let intentos = 10;

while (intentos > 0) {
    let intento = prompt("Ingrese 4 dígitos diferentes:").split("").map(Number);
    let resultado = verificarIntento(intento, codigo);
    
    console.log(\`Exactas: \${resultado.exactas}, Parciales: \${resultado.parciales}\`);
    
    if (resultado.exactas === 4) {
        console.log("¡Ganaste!");
        break;
    }
    
    intentos--;
    if (intentos === 0) console.log("Perdiste. El código era: " + codigo.join(""));
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			{mostrarTutorial && (
				<div className={styles.tutorial}>
					<h3>Cómo jugar Master Mind</h3>
					<ul>
						<li>🎯 Adivina el código secreto de 4 dígitos diferentes (0-9)</li>
						<li>✨ Después de cada intento, recibirás pistas:</li>
						<li>● Punto negro: Número correcto en posición correcta</li>
						<li>○ Punto blanco: Número correcto en posición incorrecta</li>
						<li>🏆 Gana puntos por cada acierto y bono por victoria rápida</li>
					</ul>
					<button
						className={styles.buttonSecondary}
						onClick={() => setMostrarTutorial(false)}>
						Entendido
					</button>
				</div>
			)}

			<div className={styles.juego}>
				<div className={styles.controles}>
					<select
						value={dificultad}
						onChange={(e) => setDificultad(e.target.value)}
						className={styles.select}
						disabled={estado === "jugando"}>
						<option value="facil">Fácil (12 intentos)</option>
						<option value="normal">Normal (10 intentos)</option>
						<option value="dificil">Difícil (8 intentos)</option>
					</select>
					<button
						onClick={iniciarJuego}
						className={styles.button}>
						Nuevo Juego
					</button>
				</div>

				<div className={styles.estado}>
					<span className={styles.intentosRestantes}>Intentos restantes: {intentosRestantes}</span>
					<span className={styles.puntuacion}>Puntuación: {puntuacion}</span>
				</div>

				{estado === "jugando" && (
					<form
						onSubmit={manejarIntento}
						className={styles.form}>
						<div className={styles.inputGroup}>
							<input
								type="text"
								value={intento}
								onChange={(e) => setIntento(e.target.value.slice(0, 4))}
								placeholder="0000"
								pattern="[0-9]{4}"
								required
								maxLength="4"
								className={styles.input}
							/>
							<button
								type="submit"
								className={styles.button}
								disabled={intento.length !== 4}>
								Probar
							</button>
						</div>
					</form>
				)}

				{(estado === "ganado" || estado === "perdido") && (
					<div className={styles.mensaje}>
						<h3>{estado === "ganado" ? "¡Felicitaciones! Has ganado 🎉" : "Game Over 😢"}</h3>
						<p>El código era: {codigo.join("")}</p>
						<p>Puntuación final: {puntuacion}</p>
						<button
							onClick={iniciarJuego}
							className={styles.button}>
							Jugar de nuevo
						</button>
					</div>
				)}

				<div className={styles.tablero}>
					{intentos.map((intento) => (
						<div
							key={intento.timestamp}
							className={styles.intento}>
							<div className={styles.numeros}>
								{intento.numeros.map((num, i) => (
									<span
										key={i}
										className={styles.numero}>
										{num}
									</span>
								))}
							</div>
							<div className={styles.pistas}>
								{[...Array(intento.pistas.exactas)].map((_, i) => (
									<span
										key={`e${i}`}
										className={styles.pistaExacta}>
										●
									</span>
								))}
								{[...Array(intento.pistas.parciales)].map((_, i) => (
									<span
										key={`p${i}`}
										className={styles.pistaParcial}>
										○
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Manipulación de arrays</li>
					<li>Generación de números aleatorios</li>
					<li>Validación de entrada de usuario</li>
					<li>Lógica de juego y estados</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_30_MasterMind;
