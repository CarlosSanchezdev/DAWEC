/**
 * @fileoverview Ejercicio 2.22 - Media Aritmética
 * @ejercicio 2.22
 * @tema Bucles y Cálculos
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_22_MediaAritmetica.module.css";

/**
 * @function Ej2_22_MediaAritmetica
 * @description Calcula la media aritmética de una serie de números
 * @returns {JSX.Element} Interfaz para calcular media aritmética
 */
function Ej2_22_MediaAritmetica() {
	const [numeros, setNumeros] = useState([]);
	const [numeroActual, setNumeroActual] = useState("");
	const [resultado, setResultado] = useState(null);

	/**
	 * @function agregarNumero
	 * @description Agrega un nuevo número a la lista
	 */
	const agregarNumero = () => {
		const numero = parseFloat(numeroActual);
		if (isNaN(numero)) {
			alert("Por favor, ingrese un número válido");
			return;
		}

		const nuevosNumeros = [...numeros, numero];
		setNumeros(nuevosNumeros);
		setNumeroActual("");
		calcularMedia(nuevosNumeros);
	};

	/**
	 * @function reiniciar
	 * @description Reinicia el cálculo de la media
	 */
	const reiniciar = () => {
		setNumeros([]);
		setNumeroActual("");
		setResultado(null);
	};

	/**
	 * @function calcularMedia
	 * @description Calcula la media aritmética de los números ingresados
	 * @param {Array} lista Lista de números
	 */
	const calcularMedia = (lista) => {
		if (lista.length === 0) return;

		const suma = lista.reduce((acc, curr) => acc + curr, 0);
		const media = suma / lista.length;

		setResultado({
			numeros: lista,
			suma,
			cantidad: lista.length,
			media,
		});
	};

	const codigoEjemplo = `// Versión JavaScript tradicional:
let cantidad = parseInt(prompt("¿Cuántos números desea ingresar?"));
let suma = 0;

for (let i = 0; i < cantidad; i++) {
    let numero = parseFloat(prompt(\`Ingrese el número \${i + 1}:\`));
    suma += numero;
}

let media = suma / cantidad;
console.log(\`La media aritmética es: \${media}\`);`;

	return (
		<div className={styles.container}>
			<div className={styles.codigo}>
				<h3>Código de ejemplo:</h3>
				<pre>{codigoEjemplo}</pre>
			</div>

			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label htmlFor="numero">Número:</label>
					<input
						type="number"
						id="numero"
						value={numeroActual}
						onChange={(e) => setNumeroActual(e.target.value)}
						placeholder="Ingrese un número..."
						className={styles.input}
						step="any"
					/>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={agregarNumero}
						className={styles.button}>
						Agregar Número
					</button>
					<button
						onClick={reiniciar}
						className={`${styles.button} ${styles.secondary}`}>
						Reiniciar
					</button>
				</div>
			</div>

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resultados:</h3>
					<div className={styles.desglose}>
						<div className={styles.linea}>
							<span>Números ingresados:</span>
							<span>{resultado.numeros.join(", ")}</span>
						</div>
						<div className={styles.linea}>
							<span>Cantidad de números:</span>
							<span>{resultado.cantidad}</span>
						</div>
						<div className={styles.linea}>
							<span>Suma total:</span>
							<span>{resultado.suma.toFixed(2)}</span>
						</div>
						<div className={`${styles.linea} ${styles.total}`}>
							<span>Media aritmética:</span>
							<span>{resultado.media.toFixed(2)}</span>
						</div>
					</div>
				</div>
			)}

			<div className={styles.explicacion}>
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Arrays y método reduce para sumas</li>
					<li>Cálculo de media aritmética</li>
					<li>Manejo de números decimales</li>
					<li>Manipulación de estado en React</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej2_22_MediaAritmetica;
