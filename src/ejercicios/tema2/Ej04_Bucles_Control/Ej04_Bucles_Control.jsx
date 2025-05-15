/**
 * @fileoverview Ejercicio sobre bucles y estructuras de control en JavaScript
 * @ejercicio Ej04_Bucles_Control
 * @tema Tema 2: JavaScript Sintaxis Básica
 * @fecha 12/05/2025
 */

import React, { useState } from "react";
import "./Ej04_Bucles_Control.css";

/**
 * @function Ej04_Bucles_Control
 * @description Componente que demuestra los bucles y control de flujo en JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej04_Bucles_Control() {
	// ===== HOOKS =====
	const [consolaOutput, setConsolaOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("while");
	const [iteraciones, setIteraciones] = useState(5);
	const [arrayEjemplo, setArrayEjemplo] = useState("manzana,naranja,plátano,kiwi,uva");

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function consoleLog
	 * @description Simula la función console.log agregando el resultado a la consola
	 * @param {*} args - Argumentos para mostrar en la consola
	 */
	const consoleLog = (...args) => {
		setConsolaOutput((prev) => [
			...prev,
			args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" "),
		]);
	};

	/**
	 * @function limpiarConsola
	 * @description Limpia la consola simulada
	 */
	const limpiarConsola = () => {
		setConsolaOutput([]);
	};

	/**
	 * @function ejecutarWhile
	 * @description Ejecuta ejemplos del bucle while
	 */
	const ejecutarWhile = () => {
		limpiarConsola();

		const numIteraciones = Number(iteraciones);

		// Ejemplo básico de while
		consoleLog("=== Bucle While Básico ===");
		consoleLog(`Iterando ${numIteraciones} veces:`);

		let contador = 1;
		while (contador <= numIteraciones) {
			consoleLog(`Iteración ${contador}`);
			contador++;
		}

		// Ejemplo de while con control de salida
		consoleLog("\n=== Bucle While con Break ===");
		consoleLog("Iterando hasta encontrar un número par aleatorio:");

		let intentos = 0;
		while (true) {
			intentos++;
			const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
			consoleLog(`Intento ${intentos}: Número generado = ${numeroAleatorio}`);

			if (numeroAleatorio % 2 === 0) {
				consoleLog(`¡Encontrado un número par (${numeroAleatorio}) en ${intentos} intentos!`);
				break; // Salimos del bucle
			}

			if (intentos >= 10) {
				consoleLog("Alcanzado el límite de 10 intentos, deteniendo la búsqueda.");
				break;
			}
		}

		// Ejemplo de while con validación
		consoleLog("\n=== Bucle While para Validación ===");
		const passwords = ["1234", "admin", "password", "seguro"];
		const intentoMax = 3;

		consoleLog(`Validando contraseña con ${intentoMax} intentos máximos`);
		consoleLog("Contraseñas válidas:", passwords.join(", "));

		let intentoActual = 0;
		let accesoConcedido = false;

		while (intentoActual < intentoMax && !accesoConcedido) {
			intentoActual++;
			// Simulamos un intento de contraseña aleatorio
			const indiceAleatorio = Math.floor(Math.random() * (passwords.length + 2));
			const intentoPassword =
				indiceAleatorio < passwords.length
					? passwords[indiceAleatorio]
					: "contraseña_incorrecta" + intentoActual;

			consoleLog(`Intento ${intentoActual}: Probando "${intentoPassword}"`);

			if (passwords.includes(intentoPassword)) {
				accesoConcedido = true;
				consoleLog(`¡Acceso concedido! Contraseña correcta: "${intentoPassword}"`);
			} else {
				consoleLog(`Contraseña incorrecta. Quedan ${intentoMax - intentoActual} intentos.`);
			}
		}

		if (!accesoConcedido) {
			consoleLog("Acceso denegado. Ha agotado todos los intentos.");
		}
	};

	/**
	 * @function ejecutarDoWhile
	 * @description Ejecuta ejemplos del bucle do-while
	 */
	const ejecutarDoWhile = () => {
		limpiarConsola();

		const numIteraciones = Number(iteraciones);

		// Ejemplo básico de do-while
		consoleLog("=== Bucle Do-While Básico ===");
		consoleLog(`Iterando ${numIteraciones} veces:`);

		let contador = 1;
		do {
			consoleLog(`Iteración ${contador}`);
			contador++;
		} while (contador <= numIteraciones);

		// Diferencia entre while y do-while
		consoleLog("\n=== Diferencia entre While y Do-While ===");
		consoleLog("Cuando la condición es falsa desde el principio:");

		// Ejemplo con while
		consoleLog("\nCon While (condición falsa al inicio):");
		contador = 10; // Ya es mayor que numIteraciones (5 por defecto)
		let iteracionesRealizadas = 0;

		while (contador <= numIteraciones) {
			consoleLog(`Iteración ${contador}`);
			contador++;
			iteracionesRealizadas++;
		}

		consoleLog(`Total de iteraciones realizadas: ${iteracionesRealizadas}`);
		consoleLog("El bucle while no se ejecutó ninguna vez porque la condición era falsa al inicio.");

		// Ejemplo con do-while
		consoleLog("\nCon Do-While (condición falsa al inicio):");
		contador = 10; // Ya es mayor que numIteraciones
		iteracionesRealizadas = 0;

		do {
			consoleLog(`Iteración ${contador}`);
			contador++;
			iteracionesRealizadas++;
		} while (contador <= numIteraciones);

		consoleLog(`Total de iteraciones realizadas: ${iteracionesRealizadas}`);
		consoleLog("El bucle do-while se ejecutó una vez aunque la condición era falsa desde el inicio.");

		// Ejemplo práctico de do-while
		consoleLog("\n=== Ejemplo Práctico: Generador de Números ===");
		consoleLog("Generando números aleatorios hasta obtener uno mayor que 0.8:");

		let numero;
		let intentos = 0;

		do {
			intentos++;
			numero = Math.random();
			consoleLog(`Intento ${intentos}: Número generado = ${numero.toFixed(4)}`);
		} while (numero <= 0.8 && intentos < 10);

		if (numero > 0.8) {
			consoleLog(`¡Éxito! Se encontró un número mayor que 0.8 en ${intentos} intentos.`);
		} else {
			consoleLog("No se encontró un número mayor que 0.8 en 10 intentos.");
		}
	};

	/**
	 * @function ejecutarFor
	 * @description Ejecuta ejemplos del bucle for
	 */
	const ejecutarFor = () => {
		limpiarConsola();

		const numIteraciones = Number(iteraciones);

		// Ejemplo básico de for
		consoleLog("=== Bucle For Básico ===");
		consoleLog(`Iterando ${numIteraciones} veces:`);

		for (let i = 1; i <= numIteraciones; i++) {
			consoleLog(`Iteración ${i}`);
		}

		// Ejemplo de for con arrays
		consoleLog("\n=== Bucle For con Arrays ===");
		const frutas = arrayEjemplo.split(",").map((item) => item.trim());

		consoleLog(`Array de frutas: [${frutas.join(", ")}]`);
		consoleLog("Recorriendo el array con for clásico:");

		for (let i = 0; i < frutas.length; i++) {
			consoleLog(`frutas[${i}] = ${frutas[i]}`);
		}

		// Ejemplo de for con control de flujo
		consoleLog("\n=== Bucle For con Control de Flujo ===");
		consoleLog("Números del 1 al 10, saltando los múltiplos de 3:");

		for (let i = 1; i <= 10; i++) {
			if (i % 3 === 0) {
				consoleLog(`Saltando ${i} (es múltiplo de 3)`);
				continue; // Salta a la siguiente iteración
			}
			consoleLog(`Procesando número: ${i}`);
		}

		// Ejemplo de for anidado
		consoleLog("\n=== Bucle For Anidado ===");
		consoleLog("Tabla de multiplicar simplificada (del 1 al 4):");

		for (let i = 1; i <= 4; i++) {
			let fila = "";
			for (let j = 1; j <= 4; j++) {
				fila += `${i}×${j}=${i * j}\t`;
			}
			consoleLog(fila);
		}

		// Ejemplo avanzado: Array bidimensional
		consoleLog("\n=== Ejemplo Avanzado: Matriz ===");
		const matriz = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		consoleLog("Matriz 3×3:");
		for (let i = 0; i < matriz.length; i++) {
			consoleLog(`[${matriz[i].join(", ")}]`);
		}

		consoleLog("\nRecorriendo elementos de la matriz:");
		for (let i = 0; i < matriz.length; i++) {
			for (let j = 0; j < matriz[i].length; j++) {
				consoleLog(`matriz[${i}][${j}] = ${matriz[i][j]}`);
			}
		}
	};

	/**
	 * @function ejecutarForInOf
	 * @description Ejecuta ejemplos de los bucles for...in y for...of
	 */
	const ejecutarForInOf = () => {
		limpiarConsola();

		const frutas = arrayEjemplo.split(",").map((item) => item.trim());

		// Ejemplo de for...in con arrays
		consoleLog("=== Bucle for...in con Arrays ===");
		consoleLog(`Array de frutas: [${frutas.join(", ")}]`);
		consoleLog("Recorriendo índices del array con for...in:");

		for (let indice in frutas) {
			consoleLog(`Índice: ${indice}, Valor: ${frutas[indice]}`);
		}

		// Ejemplo de for...in con objetos
		consoleLog("\n=== Bucle for...in con Objetos ===");
		const persona = {
			nombre: "Ana",
			edad: 28,
			profesion: "Desarrolladora",
			ciudad: "Valencia",
		};

		consoleLog("Objeto persona:", JSON.stringify(persona, null, 2));
		consoleLog("Recorriendo propiedades del objeto con for...in:");

		for (let propiedad in persona) {
			consoleLog(`${propiedad}: ${persona[propiedad]}`);
		}

		// Ejemplo de for...of con arrays
		consoleLog("\n=== Bucle for...of con Arrays ===");
		consoleLog(`Array de frutas: [${frutas.join(", ")}]`);
		consoleLog("Recorriendo valores del array con for...of:");

		for (let fruta of frutas) {
			consoleLog(`Fruta: ${fruta}`);
		}

		// Ejemplo de for...of con cadenas
		consoleLog("\n=== Bucle for...of con Cadenas ===");
		const palabra = "JavaScript";

		consoleLog(`Palabra: ${palabra}`);
		consoleLog("Recorriendo caracteres con for...of:");

		for (let letra of palabra) {
			consoleLog(`Letra: ${letra}`);
		}

		// Comparación de for...in y for...of
		consoleLog("\n=== Comparación de for...in y for...of ===");
		consoleLog("for...in obtiene las claves/índices del objeto o array");
		consoleLog("for...of obtiene los valores de objetos iterables (arrays, strings, etc.)");

		// NOTA: for...of no funciona con objetos simples, ya que no son iterables por defecto
		consoleLog("\nIntentando usar for...of con un objeto (no funcionará):");
		try {
			for (let valor of persona) {
				consoleLog(valor);
			}
		} catch (error) {
			consoleLog(`Error: ${error.message}`);
			consoleLog("Los objetos simples no son iterables, por lo que for...of no funciona con ellos.");
		}
	};

	/**
	 * @function ejecutarRupturasContinuaciones
	 * @description Ejecuta ejemplos de rupturas y continuaciones en bucles
	 */
	const ejecutarRupturasContinuaciones = () => {
		limpiarConsola();

		// Ejemplo de break
		consoleLog("=== Sentencia break ===");
		consoleLog("Buscando el primer número divisible por 3 y 5 entre 1 y 100:");

		let numeroEncontrado = null;
		for (let i = 1; i <= 100; i++) {
			if (i % 3 === 0 && i % 5 === 0) {
				numeroEncontrado = i;
				consoleLog(`¡Encontrado! El número ${i} es divisible por 3 y 5.`);
				break; // Salimos del bucle una vez encontrado
			}
		}

		if (numeroEncontrado === null) {
			consoleLog("No se encontró ningún número que cumpla la condición.");
		}

		// Ejemplo de continue
		consoleLog("\n=== Sentencia continue ===");
		consoleLog("Sumando solo los números impares del 1 al 10:");

		let suma = 0;
		for (let i = 1; i <= 10; i++) {
			if (i % 2 === 0) {
				consoleLog(`Saltando ${i} (es par)`);
				continue; // Saltamos a la siguiente iteración
			}
			suma += i;
			consoleLog(`Sumando ${i}. Suma parcial: ${suma}`);
		}

		consoleLog(`Suma total de los impares: ${suma}`);

		// Ejemplo de etiquetas y break/continue
		consoleLog("\n=== Etiquetas con break y continue ===");
		consoleLog("Buscando una combinación específica en una matriz 5×5:");

		externoLoop: for (let i = 1; i <= 5; i++) {
			for (let j = 1; j <= 5; j++) {
				const producto = i * j;

				consoleLog(`Evaluando: ${i} × ${j} = ${producto}`);

				if (producto === 12) {
					consoleLog(`¡Encontrado! ${i} × ${j} = ${producto}`);
					break externoLoop; // Rompe el bucle externo
				}

				if (producto > 15) {
					consoleLog(`Producto ${producto} mayor que 15, pasando a la siguiente fila`);
					continue externoLoop; // Salta a la siguiente iteración del bucle externo
				}
			}
		}

		// Ejemplo avanzado: Control combinado
		consoleLog("\n=== Control combinado en bucles anidados ===");
		consoleLog("Generando patrones:");

		for (let i = 1; i <= 5; i++) {
			let linea = "";

			for (let j = 1; j <= 5; j++) {
				if (j < i) {
					linea += "  "; // Espacio en blanco
					continue;
				}

				linea += "* ";

				if (j === 5) {
					break; // Termina este bucle interno
				}
			}

			consoleLog(linea);

			if (i === 3) {
				consoleLog("Deteniendo el patrón en la mitad");
				break;
			}
		}
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2 className="ejercicio-title">Ejercicio 4: Bucles y Control de Flujo</h2>
			<p className="ejercicio-description">
				Este ejercicio demuestra los distintos tipos de bucles en JavaScript y las sentencias de control de
				flujo que permiten alterar la ejecución normal de los bucles.
			</p>

			<div className="ejercicio-tabs">
				<button
					className={activeTab === "while" ? "tab-active" : ""}
					onClick={() => setActiveTab("while")}>
					Bucle While
				</button>
				<button
					className={activeTab === "dowhile" ? "tab-active" : ""}
					onClick={() => setActiveTab("dowhile")}>
					Bucle Do-While
				</button>
				<button
					className={activeTab === "for" ? "tab-active" : ""}
					onClick={() => setActiveTab("for")}>
					Bucle For
				</button>
				<button
					className={activeTab === "forinof" ? "tab-active" : ""}
					onClick={() => setActiveTab("forinof")}>
					For...in / For...of
				</button>
				<button
					className={activeTab === "ruptura" ? "tab-active" : ""}
					onClick={() => setActiveTab("ruptura")}>
					Break y Continue
				</button>
			</div>

			<div className="ejercicio-content">
				{activeTab === "while" && (
					<div className="seccion">
						<h3>2.8.1 Bucle While</h3>
						<p>
							El bucle <code>while</code> ejecuta un bloque de código mientras una condición específica
							sea verdadera. La condición se evalúa antes de cada iteración.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="iteraciones">Número de iteraciones:</label>
								<input
									id="iteraciones"
									type="number"
									min="1"
									max="20"
									value={iteraciones}
									onChange={(e) => setIteraciones(e.target.value)}
								/>
							</div>
						</div>

						<div className="codigo-ejemplo">
							<pre>{`// Sintaxis básica
let contador = 1;
while (contador <= 5) {
  console.log("Iteración " + contador);
  contador++;
}

// Control con break
while (true) {
  // Código a ejecutar
  if (condicionDeSalida) {
    break; // Sale del bucle
  }
}`}</pre>
						</div>

						<p>
							<strong>Características del bucle while:</strong>
						</p>
						<ul>
							<li>Evalúa la condición antes de ejecutar el bloque de código</li>
							<li>Si la condición inicial es falsa, el bloque nunca se ejecuta</li>
							<li>Es ideal cuando no sabemos cuántas iteraciones necesitaremos</li>
							<li>Debe contener código que eventualmente haga que la condición sea falsa</li>
						</ul>

						<button
							className="ejecutar-btn"
							onClick={ejecutarWhile}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "dowhile" && (
					<div className="seccion">
						<h3>2.8.2 Bucle Do-While</h3>
						<p>
							El bucle <code>do-while</code> es similar al <code>while</code>, pero evalúa la condición
							después de ejecutar el bloque de código, lo que garantiza que el bloque se ejecute al menos
							una vez.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="iteracionesDoWhile">Número de iteraciones:</label>
								<input
									id="iteracionesDoWhile"
									type="number"
									min="1"
									max="20"
									value={iteraciones}
									onChange={(e) => setIteraciones(e.target.value)}
								/>
							</div>
						</div>

						<div className="codigo-ejemplo">
							<pre>{`// Sintaxis básica
let contador = 1;
do {
  console.log("Iteración " + contador);
  contador++;
} while (contador <= 5);

// Diferencia con while
let x = 10;
do {
  console.log("Este mensaje se muestra aunque la condición sea falsa");
} while (x < 5);`}</pre>
						</div>

						<p>
							<strong>Características del bucle do-while:</strong>
						</p>
						<ul>
							<li>Evalúa la condición después de ejecutar el bloque de código</li>
							<li>El bloque de código siempre se ejecuta al menos una vez</li>
							<li>Útil cuando queremos asegurar que el código se ejecute como mínimo una vez</li>
							<li>
								Al igual que while, debe contener código que eventualmente haga que la condición sea
								falsa
							</li>
						</ul>

						<button
							className="ejecutar-btn"
							onClick={ejecutarDoWhile}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "for" && (
					<div className="seccion">
						<h3>2.8.3 Bucle For</h3>
						<p>
							El bucle <code>for</code> proporciona una sintaxis más compacta para crear bucles con un
							contador, combinando la inicialización, condición e incremento en una sola línea.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="iteracionesFor">Número de iteraciones:</label>
								<input
									id="iteracionesFor"
									type="number"
									min="1"
									max="20"
									value={iteraciones}
									onChange={(e) => setIteraciones(e.target.value)}
								/>
							</div>

							<div className="input-group input-group-wide">
								<label htmlFor="arrayEjemplo">Array para ejemplo (separado por comas):</label>
								<input
									id="arrayEjemplo"
									type="text"
									value={arrayEjemplo}
									onChange={(e) => setArrayEjemplo(e.target.value)}
								/>
							</div>
						</div>

						<div className="codigo-ejemplo">
							<pre>{`// Sintaxis básica
for (let i = 0; i < 5; i++) {
  console.log("Iteración " + i);
}

// Recorriendo un array
const frutas = ["manzana", "naranja", "plátano"];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// Bucles for anidados
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i + "×" + j + "=" + (i*j));
  }
}`}</pre>
						</div>
						<p>
							<strong>Componentes del bucle for:</strong>
						</p>
						<ol>
							<li>
								<strong>Inicialización:</strong> Se ejecuta una vez al inicio (let i = 0)
							</li>
							<li>
								<strong>Condición:</strong> Se evalúa antes de cada iteración (i &lt; 5)
							</li>
							<li>
								<strong>Expresión de incremento:</strong> Se ejecuta después de cada iteración (i++)
							</li>
						</ol>

						<button
							className="ejecutar-btn"
							onClick={ejecutarFor}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "forinof" && (
					<div className="seccion">
						<h3>2.8.5 Bucles for...in y for...of</h3>
						<p>
							JavaScript proporciona formas adicionales de iterar sobre colecciones de datos, como objetos
							y arrays, mediante los bucles <code>for...in</code> y <code>for...of</code>.
						</p>

						<div className="input-controls">
							<div className="input-group input-group-wide">
								<label htmlFor="arrayEjemploInOf">Array para ejemplo (separado por comas):</label>
								<input
									id="arrayEjemploInOf"
									type="text"
									value={arrayEjemplo}
									onChange={(e) => setArrayEjemplo(e.target.value)}
								/>
							</div>
						</div>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>Bucle for...in</h4>
								<p>
									Itera sobre las <strong>propiedades enumerables</strong> de un objeto, o los{" "}
									<strong>índices</strong> de un array.
								</p>
								<pre>{`// Con objetos
const persona = {
  nombre: "Ana",
  edad: 28,
  profesion: "Desarrolladora"
};

for (let propiedad in persona) {
  console.log(propiedad + ": " + persona[propiedad]);
}

// Con arrays (devuelve índices)
const frutas = ["manzana", "naranja", "plátano"];
for (let indice in frutas) {
  console.log(indice + ": " + frutas[indice]);
}`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Bucle for...of</h4>
								<p>
									Itera sobre los <strong>valores</strong> de objetos iterables (arrays, strings,
									maps, sets, etc.).
								</p>
								<pre>{`// Con arrays (devuelve valores)
const frutas = ["manzana", "naranja", "plátano"];
for (let fruta of frutas) {
  console.log(fruta);
}

// Con strings (carácter por carácter)
const palabra = "JavaScript";
for (let letra of palabra) {
  console.log(letra);
}

// NOTA: No funciona con objetos simples
// porque no son iterables
// Este código dará error:
for (let valor of persona) {
  console.log(valor);
}`}</pre>
							</div>
						</div>

						<div className="comparacion-tabla">
							<h4>Comparación de for...in vs for...of</h4>
							<table>
								<thead>
									<tr>
										<th>Característica</th>
										<th>for...in</th>
										<th>for...of</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>¿Qué itera?</td>
										<td>Propiedades/índices</td>
										<td>Valores</td>
									</tr>
									<tr>
										<td>Objetos</td>
										<td>✅ Sí</td>
										<td>❌ No (no son iterables)</td>
									</tr>
									<tr>
										<td>Arrays</td>
										<td>✅ Sí (índices)</td>
										<td>✅ Sí (valores)</td>
									</tr>
									<tr>
										<td>Strings</td>
										<td>✅ Sí (índices)</td>
										<td>✅ Sí (caracteres)</td>
									</tr>
									<tr>
										<td>Orden garantizado</td>
										<td>❌ No</td>
										<td>✅ Sí</td>
									</tr>
								</tbody>
							</table>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarForInOf}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "ruptura" && (
					<div className="seccion">
						<h3>Sentencias de Ruptura y Continuación</h3>
						<p>
							JavaScript proporciona sentencias para alterar el flujo normal de los bucles, permitiendo
							salir del bucle o saltar a la siguiente iteración.
						</p>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>break</h4>
								<p>
									Termina la ejecución del bucle actual y continúa con la siguiente instrucción
									después del bucle.
								</p>
								<pre>{`// Salir del bucle cuando se cumple una condición
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log("Encontrado, saliendo del bucle");
    break;
  }
  console.log("Número: " + i);
}

// Con etiquetas en bucles anidados
externoLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log("Saliendo de ambos bucles");
      break externoLoop;
    }
  }
}`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>continue</h4>
								<p>
									Salta a la siguiente iteración del bucle, omitiendo el resto del código en la
									iteración actual.
								</p>
								<pre>{`// Saltarse números pares
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log("Saltando número par: " + i);
    continue;
  }
  console.log("Procesando número impar: " + i);
}

// Con etiquetas en bucles anidados
externoLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      console.log("Saltando a la siguiente fila");
      continue externoLoop;
    }
    console.log(i + "," + j);
  }
}`}</pre>
							</div>
						</div>
						<p>
							<strong>Uso de etiquetas:</strong>
						</p>
						<p>
							Las etiquetas permiten identificar un bucle y referenciarlo en las sentencias{" "}
							<code>break</code> o <code>continue</code>. Son especialmente útiles en bucles anidados
							cuando queremos salir o continuar un bucle exterior.
						</p>
						<pre>{`// Sintaxis
etiqueta: for (inicialización; condición; incremento) {
  // cuerpo del bucle
  break etiqueta; // salir del bucle etiquetado
  continue etiqueta; // continuar con la siguiente iteración del bucle etiquetado
}`}</pre>

						<div className="ejemplo-card">
							<h4>¿Cuándo usar etiquetas?</h4>
							<p>Las etiquetas son especialmente útiles en los siguientes escenarios:</p>
							<ul>
								<li>
									<strong>Búsqueda en matrices multidimensionales:</strong> Cuando encontramos lo que
									buscamos y queremos salir de todos los bucles
								</li>
								<li>
									<strong>Procesamiento por lotes:</strong> Para saltar a otro lote cuando detectamos
									un error
								</li>
								<li>
									<strong>Algoritmos complejos:</strong> Donde necesitamos control preciso del flujo
									en bucles anidados
								</li>
							</ul>
							<p>
								<strong>IMPORTANTE:</strong> Aunque las etiquetas pueden ser útiles, un uso excesivo
								puede dificultar la legibilidad del código. Considera refactorizar en funciones si la
								lógica es muy compleja.
							</p>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarRupturasContinuaciones}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}
			</div>

			<div className="consola-simulada">
				<div className="consola-header">
					<h3>Consola</h3>
					<button
						className="limpiar-btn"
						onClick={limpiarConsola}>
						Limpiar
					</button>
				</div>
				<div className="consola-contenido">
					{consolaOutput.length ? (
						consolaOutput.map((linea, index) => (
							<div
								key={index}
								className="consola-linea">
								{linea}
							</div>
						))
					) : (
						<div className="consola-vacia">
							La consola está vacía. Ejecuta un ejemplo para ver resultados.
						</div>
					)}
				</div>
			</div>
			<div className="ejercicio-footer">
				<h3>Conceptos clave para el examen:</h3>
				<ul>
					<li>
						JavaScript ofrece varios tipos de bucles: <code>while</code>, <code>do-while</code>,{" "}
						<code>for</code>, <code>for...in</code> y <code>for...of</code>
					</li>
					<li>
						El bucle <code>while</code> evalúa la condición antes de cada iteración
					</li>
					<li>
						El bucle <code>do-while</code> evalúa la condición después de cada iteración, garantizando que
						el bloque se ejecute al menos una vez
					</li>
					<li>
						El bucle <code>for</code> combina inicialización, condición e incremento en una sola línea
					</li>
					<li>
						El bucle <code>for...in</code> itera sobre propiedades de objetos o índices de arrays
					</li>
					<li>
						El bucle <code>for...of</code> itera sobre valores de objetos iterables como arrays o strings
					</li>
					<li>
						La sentencia <code>break</code> termina la ejecución del bucle
					</li>
					<li>
						La sentencia <code>continue</code> salta a la siguiente iteración del bucle
					</li>
					<li>
						Las etiquetas permiten direccionar las sentencias <code>break</code> y <code>continue</code> a
						bucles específicos
					</li>
				</ul>

				<h3>Comparativa de bucles:</h3>
				<div className="comparacion-tabla">
					<table>
						<thead>
							<tr>
								<th>Tipo de bucle</th>
								<th>Cuándo usarlo</th>
								<th>Ventajas</th>
								<th>Desventajas</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<code>while</code>
								</td>
								<td>Cuando no se conoce el número de iteraciones de antemano</td>
								<td>Simple y flexible</td>
								<td>Riesgo de bucles infinitos si no se maneja bien</td>
							</tr>
							<tr>
								<td>
									<code>do-while</code>
								</td>
								<td>Cuando necesitamos que el bloque se ejecute al menos una vez</td>
								<td>Garantiza al menos una ejecución</td>
								<td>Menos utilizado en la práctica</td>
							</tr>
							<tr>
								<td>
									<code>for</code>
								</td>
								<td>Cuando se conoce el número de iteraciones o se itera según un patrón predecible</td>
								<td>Mantiene todas las partes del bucle en una línea, código más claro</td>
								<td>Puede ser excesivo para lógicas simples</td>
							</tr>
							<tr>
								<td>
									<code>for...in</code>
								</td>
								<td>Para iterar sobre las propiedades de un objeto</td>
								<td>Ideal para objetos</td>
								<td>No recomendado para arrays (no garantiza orden, itera prototipos)</td>
							</tr>
							<tr>
								<td>
									<code>for...of</code>
								</td>
								<td>Para iterar sobre valores en colecciones iterables (arrays, strings, etc.)</td>
								<td>Sintaxis limpia, respeta el orden de iteración</td>
								<td>No funciona con objetos planos, solo iterables</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Ej04_Bucles_Control;
