/**
 * @fileoverview Ejercicio 2.25 - Try/Catch y Manejo de Errores
 * @ejercicio 2.25
 * @tema Manejo de Errores
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarManejoErrores
 * @description Ejemplifica el manejo de errores en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarManejoErrores = () => {
	const resultados = [];

	// Try/Catch básico
	resultados.push("// Try/Catch básico:");
	try {
		const resultado = 10 / 0;
		resultados.push(`Resultado: ${resultado}`);
	} catch (error) {
		resultados.push(`Error capturado: ${error.message}`);
	}

	// Try/Catch/Finally
	resultados.push("\n// Try/Catch/Finally:");
	try {
		throw new Error("Error personalizado");
	} catch (error) {
		resultados.push(`Error: ${error.message}`);
	} finally {
		resultados.push("Este código siempre se ejecuta");
	}

	// Error personalizado
	resultados.push("\n// Error personalizado:");
	class ValidacionError extends Error {
		constructor(mensaje) {
			super(mensaje);
			this.name = "ValidacionError";
		}
	}

	try {
		throw new ValidacionError("El dato no es válido");
	} catch (error) {
		resultados.push(`${error.name}: ${error.message}`);
	}

	// Múltiples catch
	resultados.push("\n// Múltiples catch:");
	try {
		const obj = null;
		obj.metodo();
	} catch (error) {
		if (error instanceof TypeError) {
			resultados.push("Error de tipo");
		} else if (error instanceof ReferenceError) {
			resultados.push("Error de referencia");
		} else {
			resultados.push("Otro tipo de error");
		}
	}

	// Try anidado
	resultados.push("\n// Try anidado:");
	try {
		try {
			throw new Error("Error interno");
		} catch (errorInterno) {
			resultados.push("Manejo de error interno");
			throw errorInterno;
		}
	} catch (errorExterno) {
		resultados.push(`Manejo de error externo: ${errorExterno.message}`);
	}

	// Promesa con error
	resultados.push("\n// Promesa con error:");
	const promesaConError = async () => {
		try {
			await Promise.reject(new Error("Error en promesa"));
		} catch (error) {
			resultados.push(`Error async/await: ${error.message}`);
		}
	};
	promesaConError();

	return resultados;
};

/**
 * @function Ej25
 * @description Componente que demuestra el manejo de errores en JavaScript
 */
function Ej25() {
	const [output, setOutput] = useState("");

	const ejecutarEjemplos = () => {
		const resultados = demostrarManejoErrores();
		setOutput(resultados.join("\n"));
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h2>Ejercicio 2.25: Try/Catch y Manejo de Errores</h2>
				<p className="enunciado">
					Exploración del manejo de errores en JavaScript usando try/catch, errores personalizados y manejo
					asíncrono.
				</p>
			</div>

			<div className="codigo-ejemplo">
				<pre>
					<code>{`// Try/Catch básico
try {
    const resultado = 10 / 0;
} catch (error) {
    console.error(error.message);
}

// Try/Catch/Finally
try {
    throw new Error("Error");
} catch (error) {
    console.log(error);
} finally {
    console.log("Siempre ejecuta");
}

// Error personalizado
class MiError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "MiError";
    }
}

// Múltiples catch
try {
    // código
} catch (error) {
    if (error instanceof TypeError) {
        // manejo específico
    } else {
        // otro manejo
    }
}

// Async/Await
try {
    await operacionAsincrona();
} catch (error) {
    console.error(error);
}`}</code>
				</pre>
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
					<li>Try/Catch básico</li>
					<li>Finally</li>
					<li>Errores personalizados</li>
					<li>Tipos de errores</li>
					<li>Try anidados</li>
					<li>Manejo de errores asíncronos</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej25;
