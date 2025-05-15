/**
 * @fileoverview Ejercicio 2.25 - Doble o Nada
 * @ejercicio 2.25
 * @tema Juegos y Azar
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_25_DobleNada.module.css";

/**
 * @function Ej2_25_DobleNada
 * @description Juego de apuestas con moneda aleatoria
 * @returns {JSX.Element} Interfaz del juego Doble o Nada
 */
function Ej2_25_DobleNada() {
	const [saldo, setSaldo] = useState(10); // Saldo inicial de 10€
	const [apuesta, setApuesta] = useState(1);
	const [historial, setHistorial] = useState([]);
	const [resultado, setResultado] = useState(null);
	const [animando, setAnimando] = useState(false);

	/**
	 * @function lanzarMoneda
	 * @description Simula el lanzamiento de una moneda
	 */
	const lanzarMoneda = () => {
		if (apuesta > saldo) {
			alert("No tienes suficiente saldo para esa apuesta");
			return;
		}

		setAnimando(true);
		const nuevoHistorial = [...historial];

		setTimeout(() => {
			const victoria = Math.random() < 0.5;
			const nuevoSaldo = victoria ? saldo + apuesta : saldo - apuesta;

			nuevoHistorial.unshift({
				apuesta,
				resultado: victoria ? "Victoria" : "Derrota",
				saldoResultante: nuevoSaldo,
			});

			setSaldo(nuevoSaldo);
			setResultado({
				victoria,
				mensaje: victoria ? "¡Has ganado!" : "Has perdido",
				cantidad: victoria ? apuesta : -apuesta,
			});
			setHistorial(nuevoHistorial.slice(0, 10)); // Mantener solo los últimos 10 resultados
			setAnimando(false);

			if (nuevoSaldo <= 0) {
				setTimeout(() => {
					alert("¡Te has quedado sin saldo! El juego se reiniciará.");
					reiniciarJuego();
				}, 500);
			}
		}, 1000);
	};

	/**
	 * @function reiniciarJuego
	 * @description Reinicia el juego a su estado inicial
	 */
	const reiniciarJuego = () => {
		setSaldo(10);
		setApuesta(1);
		setHistorial([]);
		setResultado(null);
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let saldo = 10;
let jugando = true;

while (jugando && saldo > 0) {
    let apuesta = parseInt(prompt(\`Tu saldo: \${saldo}€. ¿Cuánto apuestas?\`));
    
    if (apuesta > saldo) {
        alert("No tienes suficiente saldo");
        continue;
    }

    let victoria = Math.random() < 0.5;
    saldo = victoria ? saldo + apuesta : saldo - apuesta;
    alert(victoria ? "¡Has ganado!" : "Has perdido");

    if (saldo <= 0) {
        alert("¡Te has quedado sin saldo!");
        break;
    }

    jugando = confirm("¿Quieres seguir jugando?");
}`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<div className={styles.juego}>
				<div className={styles.estado}>
					<div className={`${styles.saldo} ${saldo <= 5 ? styles.bajo : ""}`}>
						<h3>Saldo actual:</h3>
						<span>{saldo.toFixed(2)}€</span>
					</div>
					<div className={styles.controles}>
						<label>
							Apuesta:
							<input
								type="number"
								value={apuesta}
								onChange={(e) => setApuesta(Math.max(1, Math.min(saldo, Number(e.target.value))))}
								min="1"
								max={saldo}
								step="1"
								className={styles.input}
							/>
						</label>
						<button
							onClick={lanzarMoneda}
							disabled={animando || saldo <= 0}
							className={styles.button}>
							{animando ? "Lanzando..." : "¡Lanzar moneda!"}
						</button>
						<button
							onClick={reiniciarJuego}
							className={`${styles.button} ${styles.secondary}`}>
							Reiniciar juego
						</button>
					</div>
				</div>

				{resultado && !animando && (
					<div className={`${styles.resultado} ${resultado.victoria ? styles.victoria : styles.derrota}`}>
						<h3>{resultado.mensaje}</h3>
						<p>
							{resultado.victoria ? "+" : ""}
							{resultado.cantidad}€
						</p>
					</div>
				)}

				{animando && (
					<div className={styles.moneda}>
						<div className={styles.monedaInner} />
					</div>
				)}

				{historial.length > 0 && (
					<div className={styles.historial}>
						<h3>Últimas jugadas:</h3>
						<div className={styles.lista}>
							{historial.map((h, i) => (
								<div
									key={i}
									className={`${styles.jugada} ${
										h.resultado === "Victoria" ? styles.victoria : styles.derrota
									}`}>
									<span>Apuesta: {h.apuesta}€</span>
									<span>{h.resultado}</span>
									<span>Saldo: {h.saldoResultante.toFixed(2)}€</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Generación de números aleatorios con Math.random()</li>
					<li>Gestión de estado del juego</li>
					<li>Animaciones CSS</li>
					<li>Validación de entrada de datos</li>
					<li>Historial de jugadas</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_25_DobleNada;
