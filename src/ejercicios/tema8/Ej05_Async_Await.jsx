/**
 * @fileoverview Ejercicio sobre Async/Await en JavaScript
 * @ejercicio Ej05_Async_Await
 * @tema Tema 8 - Comunicación Asíncrona
 * @fecha 24/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej05_Async_Await.css";

/**
 * @function Ej05_Async_Await
 * @description Componente que demuestra el uso de Async/Await en JavaScript
 * @returns {JSX.Element} Componente de demostración
 */
function Ej05_Async_Await() {
	// ===== HOOKS =====
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const [codeTab, setCodeTab] = useState("basic");
	const [demoType, setDemoType] = useState("sequential");
	const [executionLog, setExecutionLog] = useState([]);
	const [delay, setDelay] = useState(1000);
	const [errorChance, setErrorChance] = useState(20);
	const abortControllerRef = useRef(null);

	// ===== EFECTOS =====
	useEffect(() => {
		// Limpiar controlador de aborto cuando se desmonta el componente
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function logEvent
	 * @description Agrega un evento al registro de ejecución
	 * @param {string} type - Tipo de evento (info, success, error)
	 * @param {string} message - Mensaje del evento
	 */
	const logEvent = (type, message) => {
		const timestamp = new Date().toLocaleTimeString();
		setExecutionLog((prev) => [...prev, { type, message, timestamp }]);
	};

	/**
	 * @function clearLog
	 * @description Limpia el registro de ejecución
	 */
	const clearLog = () => {
		setExecutionLog([]);
	};

	/**
	 * @function simulateAsyncOperation
	 * @description Simula una operación asíncrona
	 * @param {string} operationName - Nombre de la operación
	 * @param {number} delayMs - Retraso en milisegundos
	 * @param {number} errorPct - Probabilidad de error en porcentaje
	 * @returns {Promise} Promesa que se resuelve con un mensaje o se rechaza con un error
	 */
	const simulateAsyncOperation = (operationName, delayMs = delay, errorPct = errorChance) => {
		return new Promise((resolve, reject) => {
			logEvent("info", `Iniciando ${operationName}...`);

			setTimeout(() => {
				if (Math.random() * 100 < errorPct) {
					logEvent("error", `Error en ${operationName}`);
					reject(new Error(`Error en ${operationName}`));
				} else {
					logEvent("success", `${operationName} completada exitosamente`);
					resolve(`Resultado de ${operationName}`);
				}
			}, delayMs);
		});
	};

	/**
	 * @function runBasicAsyncAwait
	 * @description Ejecuta un ejemplo básico de async/await
	 */
	const runBasicAsyncAwait = async () => {
		clearLog();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			logEvent("info", "Iniciando función async...");

			// Primera operación asíncrona
			const result1 = await simulateAsyncOperation("Operación 1");

			// Segunda operación asíncrona
			const result2 = await simulateAsyncOperation("Operación 2");

			// Combinar resultados
			const finalResult = `${result1} y ${result2}`;
			logEvent("success", `Operación completada: ${finalResult}`);

			setResult(finalResult);
		} catch (err) {
			setError(err.message);
			logEvent("error", `Error capturado: ${err.message}`);
		} finally {
			setLoading(false);
			logEvent("info", "Función async finalizada");
		}
	};

	/**
	 * @function runParallelAsyncAwait
	 * @description Ejecuta operaciones en paralelo usando Promise.all con async/await
	 */
	const runParallelAsyncAwait = async () => {
		clearLog();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			logEvent("info", "Iniciando operaciones en paralelo...");

			// Ejecutar operaciones en paralelo
			const results = await Promise.all([
				simulateAsyncOperation("Operación A", delay, errorChance),
				simulateAsyncOperation("Operación B", delay * 1.5, errorChance),
				simulateAsyncOperation("Operación C", delay * 0.7, errorChance),
			]);

			const finalResult = `Resultados combinados: ${results.join(" + ")}`;
			logEvent("success", finalResult);

			setResult(finalResult);
		} catch (err) {
			setError(err.message);
			logEvent("error", `Error en operaciones paralelas: ${err.message}`);
		} finally {
			setLoading(false);
			logEvent("info", "Operaciones paralelas finalizadas");
		}
	};

	/**
	 * @function runErrorHandlingDemo
	 * @description Demuestra el manejo de errores con async/await
	 */
	const runErrorHandlingDemo = async () => {
		clearLog();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			logEvent("info", "Iniciando demostración de manejo de errores...");

			try {
				// Primera operación con alta probabilidad de error
				await simulateAsyncOperation("Operación Riesgosa", delay, 80);
			} catch (innerError) {
				logEvent("info", `Error controlado en operación riesgosa: ${innerError.message}`);
				logEvent("info", "Ejecutando plan alternativo...");

				// Plan alternativo
				const backupResult = await simulateAsyncOperation("Operación de Respaldo", delay, 10);
				logEvent("success", `Plan alternativo exitoso: ${backupResult}`);
				setResult(`Recuperación exitosa: ${backupResult}`);
			}
		} catch (err) {
			setError(err.message);
			logEvent("error", `Error crítico: ${err.message}`);
		} finally {
			setLoading(false);
			logEvent("info", "Demostración de manejo de errores finalizada");
		}
	};

	/**
	 * @function runFetchWithAbort
	 * @description Demuestra una petición fetch con capacidad de cancelación
	 */
	const runFetchWithAbort = async () => {
		clearLog();
		setLoading(true);
		setError(null);
		setResult(null);

		// Crear un nuevo AbortController
		abortControllerRef.current = new AbortController();
		const signal = abortControllerRef.current.signal;

		try {
			logEvent("info", "Iniciando petición con 5 segundos de espera...");

			// Simular una petición larga
			const fetchPromise = new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					resolve("Datos recibidos correctamente");
				}, 5000);

				// Si la señal de aborto se activa, rechazar la promesa
				signal.addEventListener("abort", () => {
					clearTimeout(timeoutId);
					reject(new Error("Petición cancelada por el usuario"));
				});
			});

			const result = await fetchPromise;
			logEvent("success", result);
			setResult(result);
		} catch (err) {
			if (err.name === "AbortError" || err.message === "Petición cancelada por el usuario") {
				logEvent("info", "Petición cancelada");
				setError("Petición cancelada por el usuario");
			} else {
				logEvent("error", `Error en la petición: ${err.message}`);
				setError(err.message);
			}
		} finally {
			setLoading(false);
			logEvent("info", "Operación de fetch finalizada");
			abortControllerRef.current = null;
		}
	};

	/**
	 * @function cancelFetch
	 * @description Cancela la petición fetch en curso
	 */
	const cancelFetch = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			logEvent("info", "Señal de cancelación enviada");
		}
	};

	/**
	 * @function runSelectedDemo
	 * @description Ejecuta la demostración seleccionada
	 */
	const runSelectedDemo = () => {
		switch (demoType) {
			case "sequential":
				runBasicAsyncAwait();
				break;
			case "parallel":
				runParallelAsyncAwait();
				break;
			case "errorHandling":
				runErrorHandlingDemo();
				break;
			case "abort":
				runFetchWithAbort();
				break;
			default:
				runBasicAsyncAwait();
		}
	};

	// ===== RENDERIZADO =====
	return (
		<div className="async-await-exercise">
			<section className="intro-section">
				<h2>Async/Await en JavaScript</h2>
				<p>
					Async/await es una sintaxis que facilita el trabajo con promesas, haciendo que el código asíncrono
					parezca código sincrónico. Es una forma más legible y fácil de entender para manejar operaciones
					asíncronas en JavaScript.
				</p>
				<div className="key-concepts">
					<h3>Conceptos Clave</h3>
					<ul>
						<li>
							<strong>async:</strong> Palabra clave que se coloca antes de una función para indicar que
							devuelve una promesa
						</li>
						<li>
							<strong>await:</strong> Palabra clave que pausa la ejecución hasta que una promesa se
							resuelva
						</li>
						<li>
							<strong>try/catch:</strong> Bloques utilizados para manejar errores en código asíncrono
						</li>
						<li>
							<strong>Promise.all:</strong> Puede usarse con await para ejecutar operaciones en paralelo
						</li>
						<li>
							<strong>AbortController:</strong> API para cancelar operaciones asíncronas como fetch
						</li>
					</ul>
				</div>
			</section>

			<section className="demo-section">
				<h3>Demostración de Async/Await</h3>

				<div className="demo-controls">
					<div className="control-group">
						<label htmlFor="demo-type">Tipo de demostración:</label>
						<select
							id="demo-type"
							value={demoType}
							onChange={(e) => setDemoType(e.target.value)}>
							<option value="sequential">Operaciones Secuenciales</option>
							<option value="parallel">Operaciones Paralelas</option>
							<option value="errorHandling">Manejo de Errores</option>
							<option value="abort">Cancelación de Operaciones</option>
						</select>
					</div>
					<div className="control-group">
						<label>
							Retraso:
							<input
								type="range"
								min="500"
								max="3000"
								step="100"
								value={delay}
								onChange={(e) => setDelay(parseInt(e.target.value))}
							/>
							<span>{delay}ms</span>
						</label>
					</div>
					<div className="control-group">
						<label>
							Probabilidad de error:
							<input
								type="range"
								min="0"
								max="80"
								step="5"
								value={errorChance}
								onChange={(e) => setErrorChance(parseInt(e.target.value))}
							/>
							<span>{errorChance}%</span>
						</label>
					</div>
				</div>

				<div className="demo-buttons">
					<button
						onClick={runSelectedDemo}
						disabled={loading}
						className="run-button">
						{loading ? "Ejecutando..." : "Ejecutar Demostración"}
					</button>

					{demoType === "abort" && loading && (
						<button
							onClick={cancelFetch}
							className="cancel-button">
							Cancelar Petición
						</button>
					)}

					<button
						onClick={clearLog}
						className="clear-button">
						Limpiar Registro
					</button>
				</div>

				<div className="execution-status">
					{loading && (
						<div className="loading-indicator">
							<div className="spinner"></div>
							<span>Ejecutando operación asíncrona...</span>
						</div>
					)}

					{error && (
						<div className="error-message">
							<span>❌ Error: {error}</span>
						</div>
					)}

					{result && (
						<div className="result-message">
							<span>✅ Resultado: {result}</span>
						</div>
					)}
				</div>

				<div className="execution-log">
					<h4>Registro de Ejecución</h4>
					<div className="log-entries">
						{executionLog.length === 0 && (
							<div className="empty-log">
								El registro está vacío. Ejecute una demostración para ver el flujo.
							</div>
						)}

						{executionLog.map((entry, index) => (
							<div
								key={index}
								className={`log-entry ${entry.type}`}>
								<span className="log-time">[{entry.timestamp}]</span>
								<span className="log-message">{entry.message}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="code-section">
				<h3>Ejemplos de Código</h3>

				<div className="code-tabs">
					<div className="tab-buttons">
						<button
							className={codeTab === "basic" ? "active" : ""}
							onClick={() => setCodeTab("basic")}>
							Básico
						</button>
						<button
							className={codeTab === "error" ? "active" : ""}
							onClick={() => setCodeTab("error")}>
							Manejo de Errores
						</button>
						<button
							className={codeTab === "parallel" ? "active" : ""}
							onClick={() => setCodeTab("parallel")}>
							Operaciones Paralelas
						</button>
						<button
							className={codeTab === "fetch" ? "active" : ""}
							onClick={() => setCodeTab("fetch")}>
							Uso con Fetch
						</button>
					</div>

					<div className="tab-content">
						{codeTab === "basic" && (
							<pre className="code-example">
								{`// Función asíncrona básica
async function obtenerDatos() {
  console.log("Iniciando obtención de datos...");
  
  // Simular una petición a un servidor
  const respuesta = await fetch('https://api.ejemplo.com/datos');
  
  // Esperar a que se complete la conversión a JSON
  const datos = await respuesta.json();
  
  console.log("Datos obtenidos:", datos);
  return datos;
}

// Llamar a la función asíncrona
obtenerDatos()
  .then(resultado => {
    console.log("Resultado final:", resultado);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Otra forma de llamar la función asíncrona
async function iniciar() {
  try {
    const datos = await obtenerDatos();
    console.log("Procesando datos:", datos);
  } catch (error) {
    console.error("Error en iniciar:", error);
  }
}

iniciar();`}
							</pre>
						)}

						{codeTab === "error" && (
							<pre className="code-example">
								{`// Manejo de errores con async/await
async function procesarDatos() {
  try {
    // Intentar operación principal
    const datos = await obtenerDatos();
    return procesarResultado(datos);
  } catch (error) {
    // Manejar el error
    console.error("Error al obtener datos:", error);
    
    // Podemos intentar una estrategia alternativa
    try {
      const datosDeRespaldo = await obtenerDatosDeRespaldo();
      console.log("Usando datos de respaldo");
      return procesarResultado(datosDeRespaldo);
    } catch (errorRespaldo) {
      // Si todo falla, registrar y relanzar
      console.error("Error en respaldo:", errorRespaldo);
      throw new Error("No se pudieron procesar los datos");
    }
  } finally {
    // Código que se ejecuta siempre
    console.log("Finalizado el intento de procesamiento");
  }
}

// Uso
async function main() {
  try {
    const resultado = await procesarDatos();
    mostrarEnUI(resultado);
  } catch (error) {
    mostrarErrorEnUI(error.message);
  }
}`}
							</pre>
						)}

						{codeTab === "parallel" && (
							<pre className="code-example">
								{`// Ejecutar operaciones en paralelo con async/await

async function obtenerTodosLosDatos() {
  try {
    console.log("Iniciando múltiples peticiones en paralelo...");
    
    // Iniciar todas las promesas a la vez
    const promesaUsuarios = fetch('https://api.ejemplo.com/usuarios');
    const promesaProductos = fetch('https://api.ejemplo.com/productos');
    const promesaPedidos = fetch('https://api.ejemplo.com/pedidos');
    
    // Esperar a que todas se completen
    const [respUsuarios, respProductos, respPedidos] = await Promise.all([
      promesaUsuarios,
      promesaProductos,
      promesaPedidos
    ]);
    
    // Procesar los resultados (también en paralelo)
    const [usuarios, productos, pedidos] = await Promise.all([
      respUsuarios.json(),
      respProductos.json(),
      respPedidos.json()
    ]);
    
    return {
      usuarios,
      productos,
      pedidos
    };
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}`}
							</pre>
						)}

						{codeTab === "fetch" && (
							<pre className="code-example">
								{`// Uso avanzado con Fetch API y cancelación

async function buscarDatosConTimeout(url, tiempoEsperaMs = 5000) {
  // Crear un controlador para abortar la operación
  const controller = new AbortController();
  const signal = controller.signal;
  
  // Configurar timeout
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, tiempoEsperaMs);
  
  try {
    // Pasar signal a fetch para permitir cancelación
    const respuesta = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: signal
    });
    
    // Limpiar timeout si la petición fue exitosa
    clearTimeout(timeoutId);
    
    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }
    
    return await respuesta.json();
  } catch (error) {
    // Limpiar timeout en caso de error
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('La petición fue cancelada por timeout');
    }
    
    throw error;
  }
}

// Uso
async function cargarDatos() {
  try {
    const datos = await buscarDatosConTimeout('https://api.ejemplo.com/datos', 3000);
    console.log('Datos recibidos:', datos);
  } catch (error) {
    console.error('Error:', error.message);
  }
}`}
							</pre>
						)}
					</div>
				</div>
			</section>

			<section className="comparison-section">
				<h3>Comparación: Promesas vs. Async/Await</h3>

				<div className="comparison-table">
					<table>
						<thead>
							<tr>
								<th>Característica</th>
								<th>Promesas</th>
								<th>Async/Await</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Sintaxis</td>
								<td>
									Encadenamiento con <code>.then()</code> y <code>.catch()</code>
								</td>
								<td>
									Parece código sincrónico con palabras clave <code>async</code> y <code>await</code>
								</td>
							</tr>
							<tr>
								<td>Manejo de errores</td>
								<td>
									Con métodos <code>.catch()</code> específicos
								</td>
								<td>
									Con bloques <code>try/catch</code> estándar
								</td>
							</tr>
							<tr>
								<td>Legibilidad</td>
								<td>Puede ser complejo con múltiples niveles</td>
								<td>Más limpio y fácil de leer con operaciones secuenciales</td>
							</tr>
							<tr>
								<td>Depuración</td>
								<td>Más difícil, errores en callbacks</td>
								<td>Más fácil, errores contextuales con stack traces claros</td>
							</tr>
							<tr>
								<td>Valor de retorno</td>
								<td>Siempre devuelve una promesa</td>
								<td>Siempre devuelve una promesa (implícitamente)</td>
							</tr>
							<tr>
								<td>Operaciones paralelas</td>
								<td>
									Directo con <code>Promise.all</code>
								</td>
								<td>
									<code>Promise.all</code> con <code>await</code>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="advanced-section">
				<h3>Patrones Avanzados</h3>

				<div className="pattern-cards">
					<div className="pattern-card">
						<h4>Funciones Autoejecutables (IIFE)</h4>
						<pre className="code-snippet">
							{`(async function() {
  try {
    const resultado = await operacionAsincrona();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
})();`}
						</pre>
						<p>
							Útil para ejecutar código asíncrono de forma inmediata sin crear una función nombrada
							adicional.
						</p>
					</div>

					<div className="pattern-card">
						<h4>Procesamiento Secuencial de Arrays</h4>
						<pre className="code-snippet">
							{`async function procesarSecuencial(items) {
  const resultados = [];
  
  for (const item of items) {
    // Esperar cada item secuencialmente
    const resultado = await procesarItem(item);
    resultados.push(resultado);
  }
  
  return resultados;
}`}
						</pre>
						<p>Procesa cada elemento del array uno tras otro, esperando a que cada promesa se resuelva.</p>
					</div>

					<div className="pattern-card">
						<h4>Procesamiento Paralelo Limitado</h4>
						<pre className="code-snippet">
							{`async function procesarConLimite(items, limite = 3) {
  const resultados = [];
  const pendientes = [];
  
  for (const item of items) {
    // Crear y guardar la promesa
    const promesa = procesarItem(item);
    
    const promesaConIndex = promesa
      .then(r => resultados.push(r))
      .catch(e => console.error(e));
      
    pendientes.push(promesaConIndex);
    
    // Si alcanzamos el límite, esperar a que una termine
    if (pendientes.length >= limite) {
      await Promise.race(pendientes);
    }
  }
  
  // Esperar las restantes
  await Promise.all(pendientes);
  return resultados;
}`}
						</pre>
						<p>Ejecuta promesas en paralelo pero limita el número máximo de operaciones concurrentes.</p>
					</div>
				</div>
			</section>

			<section className="exam-tips">
				<h3>🎯 Puntos Clave para el Examen</h3>
				<ul>
					<li>
						La palabra clave <code>async</code> convierte una función normal en una que devuelve una promesa
					</li>
					<li>
						La palabra clave <code>await</code> solo se puede usar dentro de funciones <code>async</code>
					</li>
					<li>
						Las funciones <code>async</code> pueden contener código sincrónico y asincrónico mezclados
					</li>
					<li>
						Las excepciones en funciones <code>async</code> automáticamente rechazan la promesa devuelta
					</li>
					<li>
						El manejo de errores se puede realizar con estructuras <code>try/catch</code> estándar
					</li>
					<li>
						Para ejecutar operaciones en paralelo, usar <code>Promise.all</code> con <code>await</code>
					</li>
					<li>
						Para obtener el primer resultado (éxito o fallo) usar <code>Promise.race</code> con{" "}
						<code>await</code>
					</li>
					<li>
						El flujo de control dentro de una función <code>async</code> se pausa en cada <code>await</code>{" "}
						hasta que la promesa se resuelva
					</li>
					<li>
						El <code>AbortController</code> puede usarse para cancelar operaciones asíncronas como{" "}
						<code>fetch</code>
					</li>
				</ul>

				<div className="important-note">
					<h4>IMPORTANTE: Fundamentos de promesas</h4>
					<p>
						Aunque async/await simplifica el trabajo con promesas, es crucial entender cómo funcionan las
						promesas subyacentes. Async/await es "azúcar sintáctico" sobre promesas, no reemplaza la
						necesidad de comprender los fundamentos de las promesas para resolver problemas complejos.
					</p>
				</div>
			</section>
		</div>
	);
}

export default Ej05_Async_Await;
