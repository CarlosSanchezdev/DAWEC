/**
 * @fileoverview Ejercicio 2.26 - Eventos y Callbacks
 * @ejercicio 2.26
 * @tema Eventos
 * @fecha 14/05/2025
 */

import { useState, useEffect } from "react";
import "../ejercicio.css";

/**
 * @function demostrarEventosCallbacks
 * @description Ejemplifica el uso de eventos y callbacks en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarEventosCallbacks = (onEventos) => {
	const resultados = [];

	// Callback simple
	const saludar = (nombre, callback) => {
		callback(`Hola ${nombre}`);
	};

	saludar("Juan", (mensaje) => {
		resultados.push("// Callback simple:");
		resultados.push(mensaje);
	});

	// Callback con manejo de errores
	const dividir = (a, b, callback) => {
		if (b === 0) {
			callback(new Error("No se puede dividir por cero"), null);
		} else {
			callback(null, a / b);
		}
	};

	resultados.push("\n// Callback con manejo de errores:");
	dividir(10, 2, (error, resultado) => {
		if (error) {
			resultados.push(`Error: ${error.message}`);
		} else {
			resultados.push(`Resultado: ${resultado}`);
		}
	});

	dividir(10, 0, (error, resultado) => {
		if (error) {
			resultados.push(`Error: ${error.message}`);
		} else {
			resultados.push(`Resultado: ${resultado}`);
		}
	});

	// Callbacks anidados
	resultados.push("\n// Callbacks anidados:");
	const paso1 = (callback) => {
		setTimeout(() => {
			callback("Paso 1 completado");
		}, 1000);
	};

	const paso2 = (datos, callback) => {
		setTimeout(() => {
			callback(`${datos} -> Paso 2 completado`);
		}, 500);
	};

	paso1((resultado1) => {
		resultados.push(resultado1);
		paso2(resultado1, (resultado2) => {
			resultados.push(resultado2);
			onEventos([...resultados]);
		});
	});

	return resultados;
};

/**
 * @function Ej26
 * @description Componente que demuestra el uso de eventos y callbacks en JavaScript
 */
function Ej26() {
	const [output, setOutput] = useState("");
	const [eventos, setEventos] = useState([]);
	const [contador, setContador] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setContador((c) => c + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Manejadores de eventos
	const handleClick = () => {
		setEventos((prev) => [...prev, `Click detectado - ${new Date().toLocaleTimeString()}`]);
	};

	const handleMouseMove = (event) => {
		const { clientX, clientY } = event;
		setEventos((prev) => [...prev, `Mouse en (${clientX}, ${clientY})`]);
	};

	const handleKeyPress = (event) => {
		setEventos((prev) => [...prev, `Tecla presionada: ${event.key}`]);
	};

	const ejecutarEjemplos = () => {
		setEventos([]);
		const resultados = demostrarEventosCallbacks(setEventos);
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.26: Eventos y Callbacks</h2>
				<p className="enunciado">
					Exploración de eventos y callbacks en JavaScript, incluyendo eventos del DOM y patrones asíncronos.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Callback simple
const saludar = (nombre, callback) => {
    callback(\`Hola \${nombre}\`);
};

// Callback con manejo de errores
const dividir = (a, b, callback) => {
    if (b === 0) {
        callback(new Error("Error"), null);
    } else {
        callback(null, a / b);
    }
};

// Eventos del DOM
elemento.addEventListener('click', (e) => {
    console.log('Click');
});

// Callbacks anidados
paso1((resultado1) => {
    paso2(resultado1, (resultado2) => {
        paso3(resultado2, (resultado3) => {
            console.log('Completado');
        });
    });
});`}</code>
				</pre>
			</div>

			<div className="ejercicio-buttons">
				<button
					onClick={ejecutarEjemplos}
					className="ejecutar-btn">
					Ejecutar ejemplos
				</button>
			</div>

			<div
				className="eventos-demo"
				onClick={handleClick}
				onMouseMove={handleMouseMove}
				onKeyPress={handleKeyPress}
				tabIndex="0"
				style={{
					padding: "20px",
					border: "1px solid #ccc",
					margin: "20px 0",
					backgroundColor: "#f5f5f5",
				}}>
				<p>Área de demostración de eventos</p>
				<p>Contador: {contador}</p>
				<p>Haz clic, mueve el mouse o presiona teclas aquí</p>
			</div>

			{eventos.length > 0 && (
				<div className="codigo-output">
					<h3>Eventos registrados:</h3>
					<pre>{eventos.join("\n")}</pre>
				</div>
			)}

			{output && (
				<div className="codigo-output">
					<h3>Resultados callbacks:</h3>
					<pre>{output}</pre>
				</div>
			)}

			<div className="ejercicio-info">
				<h3>Conceptos clave:</h3>
				<ul>
					<li>Callbacks básicos</li>
					<li>Manejo de errores en callbacks</li>
					<li>Eventos del DOM</li>
					<li>Event listeners</li>
					<li>Callback hell</li>
					<li>Asincronía básica</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej26;
