/**
 * @fileoverview Ejercicio sobre variables y tipos de datos en JavaScript
 * @ejercicio Ej02_Variables_Tipos
 * @tema Tema 2: JavaScript Sintaxis Básica
 * @fecha 12/05/2025
 */

import React, { useState } from "react";
import "./Ej02_Variables_Tipos.css";

/**
 * @function Ej02_Variables_Tipos
 * @description Componente que demuestra las variables y tipos de datos en JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej02_Variables_Tipos() {
	// ===== HOOKS =====
	const [consolaOutput, setConsolaOutput] = useState([]);
	const [activeTab, setActiveTab] = useState("declaracion");

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
	 * @function ejecutarDeclaracion
	 * @description Ejecuta el ejemplo de declaración e inicialización de variables
	 */
	const ejecutarDeclaracion = () => {
		limpiarConsola();

		// Variables con var
		var numero1;
		var numero2, numero3;
		var numero4 = 8;
		var numero5 = 3,
			numero6 = 6;

		numero1 = 24;
		numero2 = 42;

		consoleLog("=== Declaración con var ===");
		consoleLog(`numero1 = ${numero1}`);
		consoleLog(`numero2 = ${numero2}`);
		consoleLog(`numero3 = ${numero3}`);
		consoleLog(`numero4 = ${numero4}`);
		consoleLog(`numero5 = ${numero5}, numero6 = ${numero6}`);
		// Variables con let
		let extLet = 1;
		var extVar = 1;

		consoleLog("\n=== Diferencias entre let y var ===");
		// Usamos un bloque condicional para mostrar el scope
		// eslint-disable-next-line no-constant-condition
		if (true) {
			let intLet = 1;
			var intVar = 1;

			consoleLog("Dentro del bloque:");
			consoleLog(`extLet: ${extLet}`);
			consoleLog(`extVar: ${extVar}`);
			consoleLog(`intLet: ${intLet}`);
			consoleLog(`intVar: ${intVar}`);
		}
		consoleLog("\nFuera del bloque:");
		consoleLog(`extLet: ${extLet}`);
		consoleLog(`extVar: ${extVar}`);
		consoleLog(`intVar: ${intVar}`);
		try {
			// Sabemos que esto dará error pero lo atrapamos para mostrarlo como ejemplo educativo
			// eslint-disable-next-line no-undef
			consoleLog(`intLet: ${intLet}`);
		} catch (error) {
			consoleLog(`Error: ${error.message} (intLet no es accesible fuera del bloque)`);
		}
		// Constantes
		consoleLog("\n=== Constantes con const ===");
		const PI = 3.14159;
		consoleLog(`PI = ${PI}`);

		try {
			consoleLog("Intentando cambiar el valor de PI:");
			// Sabemos que esto dará error pero lo atrapamos para mostrarlo como ejemplo educativo
			// eslint-disable-next-line no-const-assign
			PI = 3;
		} catch (error) {
			consoleLog(`Error: ${error.message} (No se puede cambiar el valor de una constante)`);
		}
	};

	/**
	 * @function ejecutarTipos
	 * @description Ejecuta el ejemplo de tipos de datos
	 */
	const ejecutarTipos = () => {
		limpiarConsola();

		consoleLog("=== Tipos de datos en JavaScript ===");

		// undefined
		let variableNoInicializada;
		consoleLog(`\n1. undefined:`);
		consoleLog(`   variableNoInicializada = ${variableNoInicializada}`);
		consoleLog(`   typeof variableNoInicializada = ${typeof variableNoInicializada}`);

		// boolean
		let booleanoVerdadero = true;
		let booleanoFalso = false;
		consoleLog(`\n2. boolean:`);
		consoleLog(`   booleanoVerdadero = ${booleanoVerdadero}`);
		consoleLog(`   booleanoFalso = ${booleanoFalso}`);
		consoleLog(`   typeof booleanoVerdadero = ${typeof booleanoVerdadero}`);

		// number
		let entero = 42;
		let decimal = 3.14;
		let negativo = -10;
		let cientifico = 2.5e3;
		let infinito = Infinity;
		let noEsNumero = NaN;

		consoleLog(`\n3. number:`);
		consoleLog(`   entero = ${entero}`);
		consoleLog(`   decimal = ${decimal}`);
		consoleLog(`   negativo = ${negativo}`);
		consoleLog(`   cientifico = ${cientifico} (2.5e3 = 2500)`);
		consoleLog(`   infinito = ${infinito}`);
		consoleLog(`   noEsNumero = ${noEsNumero}`);
		consoleLog(`   typeof entero = ${typeof entero}`);

		// string
		let cadena1 = "Texto con comillas simples";
		let cadena2 = "Texto con comillas dobles";
		let cadena3 = `Plantilla: ${entero} es un número`;

		consoleLog(`\n4. string:`);
		consoleLog(`   cadena1 = ${cadena1}`);
		consoleLog(`   cadena2 = ${cadena2}`);
		consoleLog(`   cadena3 = ${cadena3}`);
		consoleLog(`   typeof cadena1 = ${typeof cadena1}`);

		// bigint
		let numeroGrande = 9007199254740991n;
		let otroBigInt = BigInt(9007199254740991);

		consoleLog(`\n5. bigint:`);
		consoleLog(`   numeroGrande = ${numeroGrande}`);
		consoleLog(`   otroBigInt = ${otroBigInt}`);
		consoleLog(`   typeof numeroGrande = ${typeof numeroGrande}`);

		// symbol
		let simbolo = Symbol("descripcion");
		let otroSimbolo = Symbol("descripcion");

		consoleLog(`\n6. symbol:`);
		consoleLog(`   simbolo = ${simbolo.toString()}`);
		consoleLog(`   otroSimbolo = ${otroSimbolo.toString()}`);
		consoleLog(`   simbolo === otroSimbolo = ${simbolo === otroSimbolo}`);
		consoleLog(`   typeof simbolo = ${typeof simbolo}`);

		// null
		let nulo = null;
		consoleLog(`\n7. null:`);
		consoleLog(`   nulo = ${nulo}`);
		consoleLog(`   typeof nulo = ${typeof nulo} (¡Curiosidad de JavaScript!)`);

		// object
		let objeto = { nombre: "Juan", edad: 30 };
		let array = [1, 2, 3, 4];
		let fecha = new Date();

		consoleLog(`\n8. object:`);
		consoleLog(`   objeto = ${JSON.stringify(objeto)}`);
		consoleLog(`   array = ${JSON.stringify(array)}`);
		consoleLog(`   fecha = ${fecha}`);
		consoleLog(`   typeof objeto = ${typeof objeto}`);
		consoleLog(`   typeof array = ${typeof array} (¡Los arrays son objetos en JavaScript!)`);
		consoleLog(`   typeof fecha = ${typeof fecha}`);
	};

	/**
	 * @function ejecutarConversion
	 * @description Ejecuta el ejemplo de conversión de tipos
	 */
	const ejecutarConversion = () => {
		limpiarConsola();

		consoleLog("=== Conversión de Tipos en JavaScript ===");

		let cadena = "3.1415";
		let nombre = "42";
		let nom = "Joan";
		let aprobado = true;

		// Conversiones a booleano
		consoleLog("\n=== Conversiones a booleano ===");
		consoleLog(`Boolean(cadena) = ${Boolean(cadena)}`);
		consoleLog(`Boolean(0) = ${Boolean(0)}`);
		consoleLog(`Boolean("") = ${Boolean("")}`);
		consoleLog(`Boolean(null) = ${Boolean(null)}`);
		consoleLog(`Boolean(undefined) = ${Boolean(undefined)}`);

		// Conversiones a cadena
		consoleLog("\n=== Conversiones a cadena ===");
		consoleLog(`String(nombre) = ${String(nombre)}`);
		consoleLog(`String(nombre) + nombre = ${String(nombre) + nombre}`);
		consoleLog(`String(aprobado) = ${String(aprobado)}`);
		consoleLog(`"" + 42 = ${"" + 42}`);

		// Conversiones a número
		consoleLog("\n=== Conversiones a número ===");
		consoleLog(`Number(nom) = ${Number(nom)}`);
		consoleLog(`Number(cadena) = ${Number(cadena)}`);
		consoleLog(`Number(cadena) * 2 = ${Number(cadena) * 2}`);
		consoleLog(`Number(aprobado) = ${Number(aprobado)}`);
		consoleLog(`Number(false) = ${Number(false)}`);
		consoleLog(`parseInt(cadena) = ${parseInt(cadena)}`);
		consoleLog(`parseFloat(cadena) = ${parseFloat(cadena)}`);

		// Conversiones implícitas
		consoleLog("\n=== Conversiones implícitas ===");

		let animal = "Águila";
		let numPatas = 2;

		consoleLog(`animal + numPatas = ${animal + numPatas}`);
		consoleLog(`numPatas + numPatas + animal = ${numPatas + numPatas + animal}`);
		consoleLog(`animal + numPatas + numPatas = ${animal + numPatas + numPatas}`);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2 className="ejercicio-title">Ejercicio 2: Variables y Tipos de Datos en JavaScript</h2>
			<p className="ejercicio-description">
				Este ejercicio demuestra cómo trabajar con variables y los diferentes tipos de datos en JavaScript, así
				como la conversión entre tipos.
			</p>

			<div className="ejercicio-tabs">
				<button
					className={activeTab === "declaracion" ? "tab-active" : ""}
					onClick={() => setActiveTab("declaracion")}>
					Declaración de Variables
				</button>
				<button
					className={activeTab === "tipos" ? "tab-active" : ""}
					onClick={() => setActiveTab("tipos")}>
					Tipos de Datos
				</button>
				<button
					className={activeTab === "conversion" ? "tab-active" : ""}
					onClick={() => setActiveTab("conversion")}>
					Conversión de Tipos
				</button>
			</div>

			<div className="ejercicio-content">
				{activeTab === "declaracion" && (
					<div className="seccion">
						<h3>2.3 Variables y Ámbito</h3>
						<p>
							En JavaScript, las variables pueden declararse usando las palabras clave <code>var</code>,{" "}
							<code>let</code> o <code>const</code>. Cada una tiene diferentes reglas de ámbito y
							comportamiento.
						</p>

						<div className="subseccion">
							<h4>Declaración con var</h4>
							<p>
								Las variables declaradas con <code>var</code> tienen ámbito de función o global, pero no
								de bloque. Pueden ser redeclaradas y su valor puede ser cambiado.
							</p>
							<pre>{`var numero1;
var numero2, numero3;
var numero4 = 8;
var numero5 = 3, numero6 = 6;

numero1 = 24;
numero2 = 42;`}</pre>
						</div>

						<div className="subseccion">
							<h4>Declaración con let</h4>
							<p>
								Las variables declaradas con <code>let</code> tienen ámbito de bloque. No pueden ser
								redeclaradas en el mismo ámbito, pero su valor puede ser cambiado.
							</p>
							<pre>{`let extLet = 1;
var extVar = 1;

if (true) {
  let intLet = 1; // Solo accesible dentro del bloque if
  var intVar = 1; // Accesible fuera del bloque if
  
  console.log(extLet); // 1
  console.log(intLet); // 1
}

console.log(extLet); // 1
console.log(intVar); // 1
console.log(intLet); // Error: intLet is not defined`}</pre>
						</div>

						<div className="subseccion">
							<h4>Declaración con const</h4>
							<p>
								Las constantes declaradas con <code>const</code> tienen ámbito de bloque como{" "}
								<code>let</code>, pero su valor no puede ser cambiado una vez asignado.
							</p>
							<pre>{`const PI = 3.14159;
PI = 3; // Error: Assignment to constant variable`}</pre>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarDeclaracion}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "tipos" && (
					<div className="seccion">
						<h3>Tipos de Datos en JavaScript</h3>
						<p>JavaScript tiene 8 tipos de datos según ECMAScript:</p>

						<div className="tipos-grid">
							<div className="tipo-card">
								<h4>undefined</h4>
								<p>Variable a la que no se le ha asignado valor o no declarada.</p>
								<pre>{`let variableNoInicializada;
console.log(variableNoInicializada); // undefined`}</pre>
							</div>

							<div className="tipo-card">
								<h4>boolean</h4>
								<p>Representa un valor lógico: verdadero o falso.</p>
								<pre>{`let verdadero = true;
let falso = false;`}</pre>
							</div>

							<div className="tipo-card">
								<h4>number</h4>
								<p>Representa números enteros o de punto flotante.</p>
								<pre>{`let entero = 42;
let decimal = 3.14;
let cientifico = 2.5e3; // 2500
let infinito = Infinity;
let noEsNumero = NaN;`}</pre>
							</div>

							<div className="tipo-card">
								<h4>string</h4>
								<p>Representa texto.</p>
								<pre>{`let simple = 'Texto con comillas simples';
let doble = "Texto con comillas dobles";
let template = \`Valor: \${entero}\`;`}</pre>
							</div>

							<div className="tipo-card">
								<h4>bigint</h4>
								<p>Permite trabajar con números enteros de tamaño arbitrario.</p>
								<pre>{`let numeroGrande = 9007199254740991n;
let otroBigInt = BigInt(9007199254740991);`}</pre>
							</div>

							<div className="tipo-card">
								<h4>symbol</h4>
								<p>
									Valor único y no modificable, usado como identificador para propiedades de objetos.
								</p>
								<pre>{`let simbolo = Symbol('descripcion');
let otroSimbolo = Symbol('descripcion');
// simbolo !== otroSimbolo (siempre son únicos)`}</pre>
							</div>

							<div className="tipo-card">
								<h4>null</h4>
								<p>Representa la ausencia intencional de un valor.</p>
								<pre>{`let nulo = null;
typeof nulo; // "object" (peculiaridad de JS)`}</pre>
							</div>

							<div className="tipo-card">
								<h4>object</h4>
								<p>Tipo para colecciones de datos y entidades más complejas.</p>
								<pre>{`let objeto = { nombre: 'Juan', edad: 30 };
let array = [1, 2, 3, 4]; // los arrays son objetos
let fecha = new Date();`}</pre>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarTipos}>
							Ejecutar Ejemplo
						</button>
					</div>
				)}

				{activeTab === "conversion" && (
					<div className="seccion">
						<h3>2.4 Conversión de Tipos</h3>
						<p>
							JavaScript permite convertir valores de un tipo a otro, tanto de manera explícita como
							implícita.
						</p>

						<div className="subseccion">
							<h4>Conversión a Booleano</h4>
							<p>Convierte valores a true o false.</p>
							<pre>{`Boolean(cadena);  // true para cadenas no vacías
Boolean(0);       // false
Boolean("");      // false
Boolean(null);    // false
Boolean(undefined); // false`}</pre>
						</div>

						<div className="subseccion">
							<h4>Conversión a Cadena</h4>
							<p>Convierte valores a texto.</p>
							<pre>{`String(42);       // "42"
String(true);     // "true"
"" + 42;          // "42" (concatenación)`}</pre>
						</div>

						<div className="subseccion">
							<h4>Conversión a Número</h4>
							<p>Convierte valores a números.</p>
							<pre>{`Number("3.14");     // 3.14
Number("Juan");     // NaN (Not a Number)
Number(true);       // 1
Number(false);      // 0
parseInt("3.14");   // 3 (solo la parte entera)
parseFloat("3.14"); // 3.14`}</pre>
						</div>

						<div className="subseccion">
							<h4>Conversión Implícita</h4>
							<p>JavaScript realiza conversiones automáticas en ciertas operaciones.</p>
							<pre>{`let animal = "Águila";
let numPatas = 2;

animal + numPatas;    // "Águila2" (numPatas se convierte a string)
numPatas + numPatas + animal;  // "4Águila" (suma primero, luego concatena)
animal + numPatas + numPatas;  // "Águila22" (concatena todo como strings)`}</pre>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarConversion}>
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
						Las variables en JavaScript pueden declararse con <code>var</code>, <code>let</code> o{" "}
						<code>const</code>
					</li>
					<li>
						<code>var</code> tiene ámbito de función, mientras que <code>let</code> y <code>const</code>{" "}
						tienen ámbito de bloque
					</li>
					<li>
						JavaScript tiene 8 tipos de datos: undefined, boolean, number, string, bigint, symbol, null y
						object
					</li>
					<li>
						JavaScript es un lenguaje de tipado dinámico, lo que significa que una variable puede cambiar de
						tipo durante la ejecución
					</li>
					<li>
						Las conversiones implícitas pueden causar comportamientos inesperados en operaciones con
						diferentes tipos
					</li>
					<li>
						Para asegurar el tipo esperado, es mejor usar conversiones explícitas como{" "}
						<code>Boolean()</code>, <code>String()</code>, <code>Number()</code>, <code>parseInt()</code> o{" "}
						<code>parseFloat()</code>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej02_Variables_Tipos;
