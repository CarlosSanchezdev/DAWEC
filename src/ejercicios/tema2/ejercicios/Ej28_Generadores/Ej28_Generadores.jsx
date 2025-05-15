/**
 * @fileoverview Ejercicio 2.28 - Generadores e Iteradores
 * @ejercicio 2.28
 * @tema Generadores
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function* contadorGenerator
 * @description Generador simple que cuenta hasta n
 */
function* contadorGenerator(n) {
	for (let i = 1; i <= n; i++) {
		yield i;
	}
}

/**
 * @function* fibonacci
 * @description Generador que produce números de Fibonacci
 */
function* fibonacci() {
	let prev = 0,
		curr = 1;
	yield prev;
	yield curr;

	while (true) {
		const next = prev + curr;
		yield next;
		prev = curr;
		curr = next;
	}
}

/**
 * @class RangoIterador
 * @description Clase que implementa el protocolo iterador
 */
class RangoIterador {
	constructor(inicio, fin) {
		this.actual = inicio;
		this.fin = fin;
	}

	[Symbol.iterator]() {
		return this;
	}

	next() {
		if (this.actual <= this.fin) {
			return {
				value: this.actual++,
				done: false,
			};
		}
		return { done: true };
	}
}

/**
 * @function demostrarGeneradores
 * @description Ejemplifica el uso de generadores e iteradores
 * @returns {string[]} Array con los resultados
 */
const demostrarGeneradores = () => {
	const resultados = [];

	// Generador básico
	resultados.push("// Generador básico (contador):");
	const contador = contadorGenerator(5);
	for (const valor of contador) {
		resultados.push(`Valor: ${valor}`);
	}

	// Fibonacci
	resultados.push("\n// Generador Fibonacci:");
	const fib = fibonacci();
	resultados.push("Primeros 8 números de Fibonacci:");
	for (let i = 0; i < 8; i++) {
		resultados.push(fib.next().value);
	}

	// Iterador personalizado
	resultados.push("\n// Iterador personalizado:");
	const rango = new RangoIterador(1, 5);
	for (const num of rango) {
		resultados.push(`Número: ${num}`);
	}

	// Generador con yield*
	function* generadorAnidado() {
		yield* [1, 2, 3];
		yield* "ABC";
	}
	resultados.push("\n// Generador con yield*:");
	const anidado = generadorAnidado();
	for (const valor of anidado) {
		resultados.push(`Valor: ${valor}`);
	}

	// Generador asíncrono
	resultados.push("\n// Generador asíncrono:");
	async function* generadorAsync() {
		for (let i = 1; i <= 3; i++) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			yield i;
		}
	}
	const async = generadorAsync();
	async.next().then(({ value }) => resultados.push(`Valor async: ${value}`));

	// Generador con return
	/**
	 * Generador que demuestra el uso de return
	 * Nota: Cualquier yield después del return nunca se alcanza
	 */
	function* generadorConReturn() {
		yield 1;
		return "fin";
	}
	resultados.push("\n// Generador con return:");
	const genReturn = generadorConReturn();
	resultados.push(`Primera llamada: ${JSON.stringify(genReturn.next())}`);
	resultados.push(`Segunda llamada: ${JSON.stringify(genReturn.next())}`);

	return resultados;
};

/**
 * @function Ej28
 * @description Componente que demuestra el uso de generadores e iteradores
 */
function Ej28() {
	const [output, setOutput] = useState("");
	const [fibonacciNums, setFibonacciNums] = useState([]);
	const [contador, setContador] = useState(0);

	const ejecutarEjemplos = () => {
		const resultados = demostrarGeneradores();
		setOutput(resultados.join("\n"));
	};

	const generarFibonacci = () => {
		const fib = fibonacci();
		const siguiente = fib.next().value;
		setFibonacciNums((prev) => [...prev, siguiente]);
	};

	const incrementarContador = () => {
		const gen = contadorGenerator(10);
		const actual = contador;
		let resultado = null;

		for (let i = 0; i <= actual; i++) {
			resultado = gen.next();
		}

		if (!resultado?.done) {
			setContador((prev) => prev + 1);
		}
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.28: Generadores e Iteradores</h2>
				<p className="enunciado">
					Exploración de generadores e iteradores en JavaScript, incluyendo ejemplos síncronos y asíncronos.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Generador básico
function* contador(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

// Fibonacci generador
function* fibonacci() {
    let prev = 0, curr = 1;
    yield prev;
    yield curr;
    while (true) {
        const next = prev + curr;
        yield next;
        prev = curr;
        curr = next;
    }
}

// Iterador personalizado
class RangoIterador {
    constructor(inicio, fin) {
        this.actual = inicio;
        this.fin = fin;
    }

    [Symbol.iterator]() {
        return this;
    }

    next() {
        if (this.actual <= this.fin) {
            return { 
                value: this.actual++, 
                done: false 
            };
        }
        return { done: true };
    }
}`}</code>
				</pre>
			</div>

			<div className="demo-section">
				<div className="demo-fibonacci">
					<h3>Demostración de Fibonacci</h3>
					<button onClick={generarFibonacci}>Generar siguiente número</button>
					<div className="numeros">
						{fibonacciNums.map((num, index) => (
							<span key={index}>{num} </span>
						))}
					</div>
				</div>

				<div className="demo-contador">
					<h3>Demostración de Contador</h3>
					<button onClick={incrementarContador}>Incrementar ({contador})</button>
				</div>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarEjemplos}
					className="ejecutar-btn">
					Ejecutar ejemplos
				</button>
			</div>

			{output && (
				<div className="codigo-output">
					<h3>Resultados:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Generadores básicos</li>
					<li>yield y yield*</li>
					<li>Iteradores personalizados</li>
					<li>Symbol.iterator</li>
					<li>Generadores asíncronos</li>
					<li>Protocolo de iteración</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej28;
