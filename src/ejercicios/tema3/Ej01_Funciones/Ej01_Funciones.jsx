/**
 * @fileoverview Ejercicio sobre funciones en JavaScript
 * @ejercicio Ej01_Funciones
 * @tema Tema 3: JavaScript Arrays, Funciones y Objetos
 * @fecha 12/05/2025
 */

import React, { useState, useRef } from "react";
import "./Ej01_Funciones.css";

/**
 * @function Ej01_Funciones
 * @description Componente que demuestra los diferentes tipos de funciones en JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej01_Funciones() {
	// ===== HOOKS =====
	const [activeTab, setActiveTab] = useState("declaracion");
	const [consolaOutput, setConsolaOutput] = useState([]);
	const consolaRef = useRef(null);

	// Estado para funciones del usuario
	const [funcionUsuario, setFuncionUsuario] = useState(`function sumar(a, b) {\n  return a + b;\n}`);
	const [parametro1, setParametro1] = useState("5");
	const [parametro2, setParametro2] = useState("3");

	// Estado para parámetros opcionales
	const [textoSaludo, setTextoSaludo] = useState("Hola");
	const [nombreSaludo, setNombreSaludo] = useState("");

	// Estado para funciones flecha
	const [funcionFlecha, setFuncionFlecha] = useState(`(x, y) => x * y`);
	const [valorX, setValorX] = useState("4");
	const [valorY, setValorY] = useState("6");

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

		// Scroll al final de la consola
		setTimeout(() => {
			if (consolaRef.current) {
				consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
			}
		}, 100);
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
	 * @description Demuestra los diferentes tipos de declaración de funciones
	 */
	const ejecutarDeclaracion = () => {
		limpiarConsola();

		// Función declarada
		consoleLog("=== Función Declarada ===");
		consoleLog("// Declaración");
		consoleLog("function saludar(nombre) {");
		consoleLog("  return 'Hola, ' + nombre + '!';");
		consoleLog("}");

		function saludar(nombre) {
			return "Hola, " + nombre + "!";
		}

		consoleLog("\n// Llamada a la función");
		consoleLog("saludar('María') → ", saludar("María"));

		// Expresión de función
		consoleLog("\n=== Expresión de Función ===");
		consoleLog("// Declaración");
		consoleLog("const despedir = function(nombre) {");
		consoleLog("  return 'Adiós, ' + nombre + '!';");
		consoleLog("};");

		const despedir = function (nombre) {
			return "Adiós, " + nombre + "!";
		};

		consoleLog("\n// Llamada a la función");
		consoleLog("despedir('Carlos') → ", despedir("Carlos"));

		// Función flecha
		consoleLog("\n=== Función Flecha ===");
		consoleLog("// Declaración");
		consoleLog("const multiplicar = (a, b) => a * b;");

		const multiplicar = (a, b) => a * b;

		consoleLog("\n// Llamada a la función");
		consoleLog("multiplicar(4, 5) → ", multiplicar(4, 5));

		// Función constructora
		consoleLog("\n=== Función Constructora ===");
		consoleLog("// Declaración");
		consoleLog("const sumar = new Function('a', 'b', 'return a + b;');");

		// eslint-disable-next-line no-new-func
		const sumar = new Function("a", "b", "return a + b;");

		consoleLog("\n// Llamada a la función");
		consoleLog("sumar(10, 20) → ", sumar(10, 20));

		// IIFE (Función Auto-ejecutable)
		consoleLog("\n=== Función Auto-ejecutable (IIFE) ===");
		consoleLog("// Declaración y ejecución inmediata");
		consoleLog("(function() {");
		consoleLog("  const mensaje = 'Ejecutada inmediatamente';");
		consoleLog("  console.log(mensaje);");
		consoleLog("})();");

		(function () {
			const mensaje = "Ejecutada inmediatamente";
			consoleLog("// Resultado: " + mensaje);
		})();
	};

	/**
	 * @function ejecutarPredefinidas
	 * @description Demuestra el uso de funciones predefinidas en JavaScript
	 */
	const ejecutarPredefinidas = () => {
		limpiarConsola();

		// Funciones de conversión
		consoleLog("=== Funciones de Conversión ===");

		consoleLog("parseInt('42') → ", parseInt("42"));
		consoleLog("parseInt('42px') → ", parseInt("42px"));
		consoleLog("parseInt('42.5') → ", parseInt("42.5"));
		consoleLog("parseFloat('42.5') → ", parseFloat("42.5"));
		consoleLog("Number('42.5') → ", Number("42.5"));
		consoleLog("Number('Hola') → ", Number("Hola"));
		consoleLog("String(42) → ", String(42));
		consoleLog("Boolean(0) → ", Boolean(0));
		consoleLog("Boolean(1) → ", Boolean(1));

		// Funciones matemáticas
		consoleLog("\n=== Funciones Matemáticas ===");

		consoleLog("Math.round(4.7) → ", Math.round(4.7));
		consoleLog("Math.floor(4.7) → ", Math.floor(4.7));
		consoleLog("Math.ceil(4.3) → ", Math.ceil(4.3));
		consoleLog("Math.abs(-5) → ", Math.abs(-5));
		consoleLog("Math.max(1, 3, 2) → ", Math.max(1, 3, 2));
		consoleLog("Math.min(1, 3, 2) → ", Math.min(1, 3, 2));
		consoleLog("Math.random() → ", Math.random());
		consoleLog("Math.pow(2, 3) → ", Math.pow(2, 3));
		consoleLog("Math.sqrt(16) → ", Math.sqrt(16));

		// Funciones de cadenas
		consoleLog("\n=== Funciones de Cadenas ===");

		consoleLog("'Hola Mundo'.length → ", "Hola Mundo".length);
		consoleLog("'Hola Mundo'.toUpperCase() → ", "Hola Mundo".toUpperCase());
		consoleLog("'Hola Mundo'.toLowerCase() → ", "Hola Mundo".toLowerCase());
		consoleLog("'Hola Mundo'.charAt(0) → ", "Hola Mundo".charAt(0));
		consoleLog("'Hola Mundo'.indexOf('Mundo') → ", "Hola Mundo".indexOf("Mundo"));
		consoleLog("'Hola Mundo'.slice(0, 4) → ", "Hola Mundo".slice(0, 4));
		consoleLog("'Hola,Mundo'.split(',') → ", JSON.stringify("Hola,Mundo".split(",")));
		consoleLog("'   Hola   '.trim() → ", "'   Hola   '.trim() →", "Hola");

		// Funciones de fecha
		consoleLog("\n=== Funciones de Fecha ===");

		const fecha = new Date();
		consoleLog("new Date() → ", fecha.toString());
		consoleLog("fecha.getFullYear() → ", fecha.getFullYear());
		consoleLog("fecha.getMonth() + 1 → ", fecha.getMonth() + 1); // Meses 0-11
		consoleLog("fecha.getDate() → ", fecha.getDate());
		consoleLog("fecha.getHours() → ", fecha.getHours());
		consoleLog("fecha.getMinutes() → ", fecha.getMinutes());
		consoleLog("fecha.getSeconds() → ", fecha.getSeconds());

		// Funciones globales
		consoleLog("\n=== Funciones Globales ===");

		consoleLog("isNaN('Hola') → ", isNaN("Hola"));
		consoleLog("isNaN('123') → ", isNaN("123"));
		consoleLog("isFinite(42) → ", isFinite(42));
		consoleLog("isFinite(Infinity) → ", isFinite(Infinity));
		consoleLog("encodeURIComponent('Hola Mundo') → ", encodeURIComponent("Hola Mundo"));
		consoleLog("decodeURIComponent('Hola%20Mundo') → ", decodeURIComponent("Hola%20Mundo"));
	};

	/**
	 * @function ejecutarUsuario
	 * @description Ejecuta una función definida por el usuario desde un campo de texto
	 */
	const ejecutarUsuario = () => {
		limpiarConsola();

		try {
			// Comprobamos que hay una función para evaluar
			if (!funcionUsuario.trim()) {
				consoleLog("Error: Debes introducir una función");
				return;
			}

			// Convertir los parámetros a sus posibles tipos
			let param1, param2;

			// Intentamos convertir a número si es posible
			if (!isNaN(parametro1)) {
				param1 = Number(parametro1);
			} else {
				param1 = parametro1;
			}

			if (!isNaN(parametro2)) {
				param2 = Number(parametro2);
			} else {
				param2 = parametro2;
			}

			// Creamos y evaluamos la función
			consoleLog("=== Definición de la función ===");
			consoleLog(funcionUsuario);

			// Evaluamos la definición de la función
			// eslint-disable-next-line no-eval
			const funcionEvaluada = eval(`(${funcionUsuario})`);

			consoleLog("\n=== Ejecución de la función ===");
			consoleLog(`Parámetros: ${JSON.stringify(param1)}, ${JSON.stringify(param2)}`);

			// Ejecutamos la función con los parámetros proporcionados
			const resultado = funcionEvaluada(param1, param2);

			consoleLog("\n=== Resultado ===");
			consoleLog(`Tipo de retorno: ${typeof resultado}`);
			consoleLog(`Valor: ${resultado}`);
		} catch (error) {
			consoleLog(`Error: ${error.message}`);
		}
	};

	/**
	 * @function ejecutarParametros
	 * @description Demuestra cómo funcionan los parámetros en JavaScript
	 */
	const ejecutarParametros = () => {
		limpiarConsola();

		// Parámetros por defecto
		consoleLog("=== Parámetros por Defecto ===");
		consoleLog("function saludar(mensaje = 'Hola', nombre = 'Invitado') {");
		consoleLog("  return `${mensaje}, ${nombre}!`;");
		consoleLog("}");

		function saludar(mensaje = "Hola", nombre = "Invitado") {
			return `${mensaje}, ${nombre}!`;
		}

		consoleLog("\n// Ejemplos de llamadas");
		consoleLog(`saludar() → ${saludar()}`);
		consoleLog(`saludar('${textoSaludo}') → ${saludar(textoSaludo)}`);
		consoleLog(
			`saludar('${textoSaludo}', '${nombreSaludo || "Invitado"}') → ${saludar(
				textoSaludo,
				nombreSaludo || "Invitado"
			)}`
		);

		// Parámetros rest
		consoleLog("\n=== Parámetros Rest ===");
		consoleLog("function sumar(...numeros) {");
		consoleLog("  return numeros.reduce((total, num) => total + num, 0);");
		consoleLog("}");

		function sumar(...numeros) {
			return numeros.reduce((total, num) => total + num, 0);
		}

		consoleLog("\n// Ejemplos de llamadas");
		consoleLog(`sumar(1, 2) → ${sumar(1, 2)}`);
		consoleLog(`sumar(1, 2, 3, 4, 5) → ${sumar(1, 2, 3, 4, 5)}`);

		// Objeto arguments
		consoleLog("\n=== Objeto Arguments ===");
		consoleLog("function mostrarArgumentos() {");
		consoleLog("  console.log(arguments);");
		consoleLog("  for (let i = 0; i < arguments.length; i++) {");
		consoleLog("    console.log(`Argumento ${i}: ${arguments[i]}`);");
		consoleLog("  }");
		consoleLog("}");

		function mostrarArgumentos() {
			consoleLog(`arguments.length: ${arguments.length}`);
			for (let i = 0; i < arguments.length; i++) {
				consoleLog(`Argumento ${i}: ${arguments[i]}`);
			}
			return arguments;
		}

		consoleLog("\n// Llamada a la función");
		consoleLog("mostrarArgumentos('a', 'b', 'c')");
		mostrarArgumentos("a", "b", "c");

		// Desestructuración de parámetros
		consoleLog("\n=== Desestructuración de Parámetros ===");
		consoleLog("function mostrarPersona({ nombre, edad = 'desconocida', ciudad = 'desconocida' }) {");
		consoleLog("  return `${nombre} tiene ${edad} años y vive en ${ciudad}`;");
		consoleLog("}");

		function mostrarPersona({ nombre, edad = "desconocida", ciudad = "desconocida" }) {
			return `${nombre} tiene ${edad} años y vive en ${ciudad}`;
		}

		consoleLog("\n// Ejemplos de llamadas");
		consoleLog("mostrarPersona({ nombre: 'Ana', edad: 28, ciudad: 'Madrid' })");
		consoleLog(mostrarPersona({ nombre: "Ana", edad: 28, ciudad: "Madrid" }));

		consoleLog("\nmostrarPersona({ nombre: 'Carlos' })");
		consoleLog(mostrarPersona({ nombre: "Carlos" }));
	};

	/**
	 * @function ejecutarAvanzadas
	 * @description Demuestra características avanzadas de funciones en JavaScript
	 */
	const ejecutarAvanzadas = () => {
		limpiarConsola();

		// Funciones flecha
		consoleLog("=== Funciones Flecha ===");

		try {
			const xVal = Number(valorX);
			const yVal = Number(valorY);

			consoleLog("// Definición de la función flecha");
			consoleLog(`const operacion = ${funcionFlecha};`);

			// eslint-disable-next-line no-eval
			const operacion = eval(funcionFlecha);

			consoleLog("\n// Llamada a la función");
			consoleLog(`operacion(${xVal}, ${yVal}) → ${operacion(xVal, yVal)}`);

			// Ejemplos de funciones flecha
			consoleLog("\n// Diferentes sintaxis de funciones flecha");

			consoleLog("// Sin parámetros");
			consoleLog("() => 42");

			consoleLog("\n// Un solo parámetro (paréntesis opcionales)");
			consoleLog("x => x * 2");

			consoleLog("\n// Múltiples parámetros");
			consoleLog("(x, y) => x + y");

			consoleLog("\n// Cuerpo de múltiples líneas");
			consoleLog("(x, y) => {");
			consoleLog("  const suma = x + y;");
			consoleLog("  return suma * 2;");
			consoleLog("}");

			consoleLog("\n// Retorno de un objeto (requiere paréntesis)");
			consoleLog("id => ({ id: id, value: id * 2 })");
		} catch (error) {
			consoleLog(`Error: ${error.message}`);
		}

		// Closures
		consoleLog("\n=== Closures ===");
		consoleLog("// Definición de una función que devuelve otra función");
		consoleLog("function crearContador() {");
		consoleLog("  let contador = 0;");
		consoleLog("  return function() {");
		consoleLog("    return ++contador;");
		consoleLog("  };");
		consoleLog("}");

		function crearContador() {
			let contador = 0;
			return function () {
				return ++contador;
			};
		}

		const contador = crearContador();

		consoleLog("\n// Uso del closure");
		consoleLog(`contador() → ${contador()}`);
		consoleLog(`contador() → ${contador()}`);
		consoleLog(`contador() → ${contador()}`);

		// Currying
		consoleLog("\n=== Currying ===");
		consoleLog("// Función normal");
		consoleLog("function multiplicar(a, b) {");
		consoleLog("  return a * b;");
		consoleLog("}");

		consoleLog("\n// Función con currying");
		consoleLog("function multiplicarPor(a) {");
		consoleLog("  return function(b) {");
		consoleLog("    return a * b;");
		consoleLog("  };");
		consoleLog("}");

		function multiplicarPor(a) {
			return function (b) {
				return a * b;
			};
		}

		const duplicar = multiplicarPor(2);
		const triplicar = multiplicarPor(3);

		consoleLog("\n// Uso del currying");
		consoleLog(`multiplicarPor(2)(3) → ${multiplicarPor(2)(3)}`);
		consoleLog(`duplicar(4) → ${duplicar(4)}`);
		consoleLog(`triplicar(4) → ${triplicar(4)}`);
	};

	/**
	 * @function ejecutarContexto
	 * @description Demuestra el contexto (this) en funciones
	 */
	const ejecutarContexto = () => {
		limpiarConsola();

		// Contexto en funciones normales
		consoleLog("=== Contexto en Funciones Normales vs Arrow ===");

		consoleLog("// Objeto con métodos");
		consoleLog("const persona = {");
		consoleLog("  nombre: 'Juan',");
		consoleLog("  saludarNormal: function() {");
		consoleLog("    return 'Hola, soy ' + this.nombre;");
		consoleLog("  },");
		consoleLog("  saludarFlecha: () => {");
		consoleLog("    return 'Hola, soy ' + this.nombre;");
		consoleLog("  }");
		consoleLog("};");

		const persona = {
			nombre: "Juan",
			saludarNormal: function () {
				return "Hola, soy " + this.nombre;
			},
			saludarFlecha: () => {
				// Aquí this no hace referencia a persona
				return "Hola, soy " + (this.nombre || "undefined");
			},
		};

		consoleLog("\n// Llamadas a los métodos");
		consoleLog(`persona.saludarNormal() → ${persona.saludarNormal()}`);
		consoleLog(`persona.saludarFlecha() → ${persona.saludarFlecha()}`);

		// Métodos para manipular this
		consoleLog("\n=== Métodos call, apply y bind ===");

		const saludar = function (prefijo, sufijo) {
			return `${prefijo} ${this.nombre} ${sufijo}`;
		};

		const persona1 = { nombre: "Ana" };
		const persona2 = { nombre: "Carlos" };

		consoleLog("// Función y objetos");
		consoleLog("const saludar = function(prefijo, sufijo) {");
		consoleLog("  return `${prefijo} ${this.nombre} ${sufijo}`;");
		consoleLog("};");
		consoleLog("const persona1 = { nombre: 'Ana' };");
		consoleLog("const persona2 = { nombre: 'Carlos' };");

		consoleLog("\n// Método call");
		consoleLog("saludar.call(persona1, 'Hola', '!')");
		consoleLog(saludar.call(persona1, "Hola", "!"));

		consoleLog("\n// Método apply");
		consoleLog("saludar.apply(persona2, ['Buen día', 'señor'])");
		consoleLog(saludar.apply(persona2, ["Buen día", "señor"]));

		consoleLog("\n// Método bind");
		consoleLog("const saludarAna = saludar.bind(persona1);");
		consoleLog("saludarAna('Buenos días', 'estimada')");

		const saludarAna = saludar.bind(persona1);
		consoleLog(saludarAna("Buenos días", "estimada"));

		// Ejemplo avanzado de contexto
		consoleLog("\n=== Ejemplo Avanzado: Pérdida de Contexto ===");

		consoleLog("// Objeto con método y callback");
		consoleLog("const contador = {");
		consoleLog("  valor: 0,");
		consoleLog("  incrementar: function() {");
		consoleLog("    this.valor++;");
		consoleLog("  },");
		consoleLog("  incrementarAsync: function() {");
		consoleLog("    // Esto perderá el contexto:");
		consoleLog("    setTimeout(function() {");
		consoleLog("      this.incrementar();");
		consoleLog("      console.log(this.valor);");
		consoleLog("    }, 100);");
		consoleLog("  },");
		consoleLog("  incrementarAsyncFixed: function() {");
		consoleLog("    // Solución 1: guardar referencia a this");
		consoleLog("    const self = this;");
		consoleLog("    setTimeout(function() {");
		consoleLog("      self.incrementar();");
		consoleLog("      console.log(self.valor);");
		consoleLog("    }, 100);");
		consoleLog("  },");
		consoleLog("  incrementarAsyncArrow: function() {");
		consoleLog("    // Solución 2: usar arrow function");
		consoleLog("    setTimeout(() => {");
		consoleLog("      this.incrementar();");
		consoleLog("      console.log(this.valor);");
		consoleLog("    }, 100);");
		consoleLog("  }");
		consoleLog("};");

		consoleLog("\n// Sin simulación asíncrona, mostramos los conceptos:");

		const contadorDemo = {
			valor: 0,
			incrementar: function () {
				this.valor++;
				return this.valor;
			},
		};

		// Pérdida de contexto
		const fnSuelta = contadorDemo.incrementar;

		consoleLog("// Incremento normal");
		consoleLog(`contadorDemo.incrementar() → ${contadorDemo.incrementar()}`);

		consoleLog("\n// Pérdida de contexto");
		consoleLog("const fnSuelta = contadorDemo.incrementar;");
		try {
			consoleLog(`fnSuelta() → ${fnSuelta()}`);
		} catch (error) {
			consoleLog(`Error: ${error.message}`);
		}

		consoleLog("\n// Solución con bind");
		const fnConContexto = contadorDemo.incrementar.bind(contadorDemo);
		consoleLog(`fnConContexto() → ${fnConContexto()}`);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<h2 className="ejercicio-title">Funciones en JavaScript</h2>
			<p className="ejercicio-description">
				Este ejercicio demuestra los distintos tipos y características de las funciones en JavaScript,
				incluyendo declaración, parámetros, contexto y funciones avanzadas.
			</p>

			<div className="ejercicio-tabs">
				<button
					className={activeTab === "declaracion" ? "tab-active" : ""}
					onClick={() => setActiveTab("declaracion")}>
					Declaración
				</button>
				<button
					className={activeTab === "predefinidas" ? "tab-active" : ""}
					onClick={() => setActiveTab("predefinidas")}>
					Funciones Predefinidas
				</button>
				<button
					className={activeTab === "usuario" ? "tab-active" : ""}
					onClick={() => setActiveTab("usuario")}>
					Funciones del Usuario
				</button>
				<button
					className={activeTab === "parametros" ? "tab-active" : ""}
					onClick={() => setActiveTab("parametros")}>
					Parámetros
				</button>
				<button
					className={activeTab === "avanzadas" ? "tab-active" : ""}
					onClick={() => setActiveTab("avanzadas")}>
					Funciones Avanzadas
				</button>
				<button
					className={activeTab === "contexto" ? "tab-active" : ""}
					onClick={() => setActiveTab("contexto")}>
					Contexto (this)
				</button>
			</div>

			<div className="ejercicio-content">
				{activeTab === "declaracion" && (
					<div className="seccion">
						<h3>3.1.2-3 Definición de Funciones</h3>
						<p>
							En JavaScript existen varias formas de definir funciones. Cada forma tiene sus propias
							características y casos de uso.
						</p>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>Declaración de Función</h4>
								<pre>{`function nombreFuncion(parametro1, parametro2) {
  // Cuerpo de la función
  return resultado;
}`}</pre>
								<p>
									Las funciones declaradas se benefician del "hoisting" (elevación), lo que significa
									que pueden ser llamadas antes de su declaración en el código.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Expresión de Función</h4>
								<pre>{`const nombreFuncion = function(parametro1, parametro2) {
  // Cuerpo de la función
  return resultado;
};`}</pre>
								<p>
									Las expresiones de función no tienen hoisting, por lo que deben ser definidas antes
									de ser utilizadas.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Función Flecha (ES6)</h4>
								<pre>{`const nombreFuncion = (parametro1, parametro2) => {
  // Cuerpo de la función
  return resultado;
};

// Versión corta para retornos simples
const suma = (a, b) => a + b;`}</pre>
								<p>
									Las funciones flecha tienen una sintaxis más concisa y no tienen su propio 'this'.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Función Constructora</h4>
								<pre>{`const nombreFuncion = new Function(
  'parametro1',
  'parametro2',
  'return parametro1 + parametro2'
);`}</pre>
								<p>Menos común y menos eficiente. Útil para crear funciones dinámicamente.</p>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarDeclaracion}>
							Ejecutar Ejemplos
						</button>
					</div>
				)}

				{activeTab === "predefinidas" && (
					<div className="seccion">
						<h3>3.1.1 Funciones Predefinidas del Lenguaje</h3>
						<p>
							JavaScript proporciona un conjunto de funciones integradas que puedes utilizar directamente.
							Estas funciones son parte del lenguaje y del entorno de ejecución.
						</p>

						<div className="subseccion">
							<h4>Categorías principales de funciones predefinidas:</h4>
							<ul>
								<li>
									<strong>Funciones globales:</strong> Como <code>parseInt</code>,{" "}
									<code>parseFloat</code>, <code>isNaN</code>
								</li>
								<li>
									<strong>Funciones de objetos:</strong> Métodos de objetos como String, Array, Math,
									Date, etc.
								</li>
								<li>
									<strong>Funciones del navegador:</strong> Como <code>alert</code>,{" "}
									<code>console.log</code>, <code>setTimeout</code>
								</li>
							</ul>
						</div>

						<div className="nota-importante">
							<h4>IMPORTANTE</h4>
							<p>
								Las funciones predefinidas facilitan operaciones comunes y proporcionan un
								comportamiento consistente en diferentes entornos. Es recomendable utilizarlas cuando
								sea posible en lugar de reinventar soluciones a problemas comunes.
							</p>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarPredefinidas}>
							Ejecutar Ejemplos
						</button>
					</div>
				)}

				{activeTab === "usuario" && (
					<div className="seccion">
						<h3>3.1.2 Funciones del Usuario y Valores de Retorno</h3>
						<p>
							Las funciones definidas por el usuario permiten encapsular código reutilizable. Toda función
							en JavaScript devuelve un valor, ya sea explícitamente con <code>return</code> o
							implícitamente (<code>undefined</code>).
						</p>

						<div className="input-controls">
							<div className="input-group input-group-wide">
								<label htmlFor="funcionUsuario">Define una función:</label>
								<textarea
									id="funcionUsuario"
									value={funcionUsuario}
									onChange={(e) => setFuncionUsuario(e.target.value)}
									rows="5"></textarea>
							</div>

							<div className="input-group">
								<label htmlFor="parametro1">Primer parámetro:</label>
								<input
									id="parametro1"
									type="text"
									value={parametro1}
									onChange={(e) => setParametro1(e.target.value)}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="parametro2">Segundo parámetro:</label>
								<input
									id="parametro2"
									type="text"
									value={parametro2}
									onChange={(e) => setParametro2(e.target.value)}
								/>
							</div>
						</div>

						<div className="nota-importante">
							<h4>Nota sobre Valores de Retorno</h4>
							<p>Toda función en JavaScript devuelve un valor:</p>
							<ul>
								<li>
									Explícitamente mediante la sentencia <code>return</code>
								</li>
								<li>
									Si no hay <code>return</code> o está vacío (<code>return;</code>), la función
									devuelve <code>undefined</code>
								</li>
								<li>
									Los constructores devuelven la instancia creada si no hay un <code>return</code>{" "}
									explícito
								</li>
							</ul>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarUsuario}>
							Probar Función
						</button>
					</div>
				)}

				{activeTab === "parametros" && (
					<div className="seccion">
						<h3>3.1.3-4 Parámetros y Valores por Defecto</h3>
						<p>
							Los parámetros permiten pasar información a las funciones. JavaScript ofrece flexibilidad en
							cómo se definen y utilizan los parámetros.
						</p>

						<div className="input-controls">
							<div className="input-group">
								<label htmlFor="textoSaludo">Mensaje de saludo:</label>
								<input
									id="textoSaludo"
									type="text"
									value={textoSaludo}
									onChange={(e) => setTextoSaludo(e.target.value)}
									placeholder="Hola"
								/>
							</div>

							<div className="input-group">
								<label htmlFor="nombreSaludo">Nombre (opcional):</label>
								<input
									id="nombreSaludo"
									type="text"
									value={nombreSaludo}
									onChange={(e) => setNombreSaludo(e.target.value)}
									placeholder="Deja vacío para usar valor por defecto"
								/>
							</div>
						</div>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>Parámetros por Defecto (ES6)</h4>
								<pre>{`function saludar(nombre = 'Invitado') {
  return 'Hola, ' + nombre;
}

saludar(); // 'Hola, Invitado'
saludar('María'); // 'Hola, María'`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Parámetros Rest (ES6)</h4>
								<pre>{`function sumar(...numeros) {
  return numeros.reduce(
    (total, n) => total + n, 0
  );
}

sumar(1, 2); // 3
sumar(1, 2, 3, 4); // 10`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Objeto Arguments</h4>
								<pre>{`function mostrarTodos() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

mostrarTodos('a', 'b', 'c');`}</pre>
								<p>
									El objeto <code>arguments</code> está obsoleto. Mejor usar parámetros rest.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Desestructuración de Parámetros</h4>
								<pre>{`function procesarUsuario({ 
  nombre, 
  edad = 'desconocida' 
}) {
  console.log(\`\${nombre}: \${edad} años\`);
}

procesarUsuario({ nombre: 'Juan', edad: 30 });
procesarUsuario({ nombre: 'Ana' });`}</pre>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarParametros}>
							Ejecutar Ejemplos
						</button>
					</div>
				)}

				{activeTab === "avanzadas" && (
					<div className="seccion">
						<h3>Funciones Avanzadas</h3>
						<p>
							JavaScript ofrece características avanzadas que permiten patrones de programación funcional
							y soluciones elegantes a problemas complejos.
						</p>

						<div className="input-controls">
							<div className="input-group input-group-wide">
								<label htmlFor="funcionFlecha">Define una función flecha:</label>
								<input
									id="funcionFlecha"
									type="text"
									value={funcionFlecha}
									onChange={(e) => setFuncionFlecha(e.target.value)}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="valorX">Valor x:</label>
								<input
									id="valorX"
									type="text"
									value={valorX}
									onChange={(e) => setValorX(e.target.value)}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="valorY">Valor y:</label>
								<input
									id="valorY"
									type="text"
									value={valorY}
									onChange={(e) => setValorY(e.target.value)}
								/>
							</div>
						</div>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>Closures (Clausuras)</h4>
								<p>
									Una clausura ocurre cuando una función interna tiene acceso al ámbito de una función
									externa, incluso después de que la función externa haya terminado de ejecutarse.
								</p>
								<pre>{`function crearContador() {
  let contador = 0;
  return function() {
    return ++contador;
  };
}

const contar = crearContador();
contar(); // 1
contar(); // 2`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Currying</h4>
								<p>
									Técnica de transformar una función con múltiples argumentos en una secuencia de
									funciones con un solo argumento.
								</p>
								<pre>{`// Normal
function multiplicar(a, b) {
  return a * b;
}

// Con currying
const multiplicarPor = a => b => a * b;
const duplicar = multiplicarPor(2);
duplicar(3); // 6`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Funciones de Orden Superior</h4>
								<p>Funciones que toman otras funciones como argumentos o que devuelven funciones.</p>
								<pre>{`// Función que toma otra función
function aplicarOperacion(a, b, operacion) {
  return operacion(a, b);
}

// Uso
aplicarOperacion(2, 3, (x, y) => x + y); // 5
aplicarOperacion(2, 3, (x, y) => x * y); // 6`}</pre>
							</div>

							<div className="ejemplo-card">
								<h4>Funciones Puras</h4>
								<p>
									Funciones que, dados los mismos inputs, siempre producen el mismo output y no tienen
									efectos secundarios.
								</p>
								<pre>{`// Función pura
function sumar(a, b) {
  return a + b;
}

// Función impura (depende estado externo)
let total = 0;
function sumarATotal(valor) {
  total += valor; // Efecto secundario
  return total;
}`}</pre>
							</div>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarAvanzadas}>
							Ejecutar Ejemplos
						</button>
					</div>
				)}

				{activeTab === "contexto" && (
					<div className="seccion">
						<h3>3.1.5 Contexto (this) y Llamadas a Funciones</h3>
						<p>
							El valor de <code>this</code> dentro de una función depende de cómo se llama la función, no
							de dónde se define. Este comportamiento es fundamental para entender cómo trabajan las
							funciones en JavaScript.
						</p>

						<div className="grid-layout">
							<div className="ejemplo-card">
								<h4>Funciones Regular vs Arrow</h4>
								<pre>{`const objeto = {
  valor: 42,
  metodoRegular: function() {
    return this.valor; // 'this' es el objeto
  },
  metodoFlecha: () => {
    return this.valor; // 'this' no es el objeto
  }
};`}</pre>
								<p>
									<strong>Importante:</strong> Las funciones flecha no tienen su propio{" "}
									<code>this</code>. Heredan <code>this</code> del contexto circundante.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Método call()</h4>
								<pre>{`function saludar() {
  console.log('Hola, ' + this.nombre);
}

const persona = { nombre: 'María' };

// Llamar la función con 'this' específico
saludar.call(persona); // 'Hola, María'`}</pre>
								<p>
									<code>call()</code> permite llamar una función con un valor <code>this</code>{" "}
									específico y argumentos pasados individualmente.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Método apply()</h4>
								<pre>{`function introducir(saludo, despedida) {
  console.log(saludo + this.nombre + despedida);
}

const persona = { nombre: 'Carlos' };

// Similar a call pero con array de argumentos
introducir.apply(persona, 
  ['Hola, ', '!']);`}</pre>
								<p>
									<code>apply()</code> es similar a <code>call()</code>, pero los argumentos se pasan
									como un array.
								</p>
							</div>

							<div className="ejemplo-card">
								<h4>Método bind()</h4>
								<pre>{`function saludar() {
  return 'Hola, ' + this.nombre;
}

const persona = { nombre: 'Juan' };

// Crea una nueva función con 'this' fijo
const saludarJuan = saludar.bind(persona);
saludarJuan(); // 'Hola, Juan'`}</pre>
								<p>
									<code>bind()</code> crea una nueva función con el valor <code>this</code>{" "}
									permanentemente vinculado.
								</p>
							</div>
						</div>

						<div className="nota-importante">
							<h4>Patrones Comunes de Pérdida de Contexto</h4>
							<p>
								Es fácil perder el contexto <code>this</code> en situaciones como:
							</p>
							<ul>
								<li>Pasar métodos como callbacks</li>
								<li>Funciones asíncronas</li>
								<li>Asignar métodos a variables</li>
							</ul>
							<p>
								Soluciones: usar <code>bind()</code>, guardar el contexto en una variable (
								<code>const self = this;</code>) o usar funciones flecha.
							</p>
						</div>

						<button
							className="ejecutar-btn"
							onClick={ejecutarContexto}>
							Ejecutar Ejemplos
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
				<div
					className="consola-contenido"
					ref={consolaRef}>
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
						Las funciones en JavaScript son objetos de primera clase que pueden ser asignados, pasados como
						argumentos y devueltos por otras funciones.
					</li>
					<li>
						Existen varias formas de declarar funciones: declaración de función, expresión de función,
						función flecha y constructor Function.
					</li>
					<li>
						El valor de <code>this</code> depende de cómo se llama la función, no de dónde se define.
					</li>
					<li>
						Las funciones flecha no tienen su propio <code>this</code>, lo heredan del contexto circundante.
					</li>
					<li>
						Los métodos <code>call()</code>, <code>apply()</code> y <code>bind()</code> permiten controlar
						el valor de <code>this</code> en una función.
					</li>
					<li>
						Los parámetros por defecto, los parámetros rest y la desestructuración de parámetros son
						características modernas que facilitan el trabajo con funciones.
					</li>
					<li>
						Los closures permiten a una función acceder a variables de su ámbito léxico incluso después de
						que la función externa haya terminado.
					</li>
					<li>
						JavaScript proporciona un conjunto de funciones predefinidas para operaciones comunes como
						conversiones de tipo, manipulación de cadenas y operaciones matemáticas.
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej01_Funciones;
