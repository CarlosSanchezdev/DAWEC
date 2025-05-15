/**
 * @fileoverview Ejercicio sobre Promesas en JavaScript
 * @ejercicio Ej03_Promesas
 * @tema Tema 8: Comunicación Asíncrona
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej03_Promesas.css";

/**
 * @function Ej03_Promesas
 * @description Componente que demuestra el uso de Promesas en JavaScript
 * @returns {JSX.Element} Componente con ejemplos de Promesas
 */
function Ej03_Promesas() {
	// ===== HOOKS =====
	// Estado para la visualización de promesas
	const [promiseState, setPromiseState] = useState({
		status: "idle", // 'idle', 'pending', 'fulfilled', 'rejected'
		result: null,
		error: null,
		executionLog: [],
		allPromisesResolved: false,
		showAdvanced: false,
	});

	// Referencia a la consola de registro
	const logRef = useRef(null);

	// ===== EFECTOS =====
	// Scroll al final del log cuando cambia
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [promiseState.executionLog]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function addLog
	 * @description Agrega una entrada al registro de ejecución
	 * @param {string} message - Mensaje a registrar
	 * @param {string} type - Tipo de mensaje ('info', 'success', 'error', 'warning', 'system')
	 */
	const addLog = (message, type = "info") => {
		setPromiseState((prev) => ({
			...prev,
			executionLog: [
				...prev.executionLog,
				{
					id: Date.now() + Math.random(),
					message,
					type,
					timestamp: new Date().toISOString().substring(11, 23),
				},
			],
		}));
	};

	/**
	 * @function clearLog
	 * @description Limpia el registro de ejecución
	 */
	const clearLog = () => {
		setPromiseState((prev) => ({
			...prev,
			executionLog: [],
		}));
	};

	/**
	 * @function resetPromiseState
	 * @description Restablece el estado de las promesas
	 */
	const resetPromiseState = () => {
		setPromiseState((prev) => ({
			...prev,
			status: "idle",
			result: null,
			error: null,
			allPromisesResolved: false,
		}));
	};

	/**
	 * @function simulateBasicPromise
	 * @description Simula una promesa básica que se resuelve o rechaza
	 * @param {boolean} shouldResolve - Si la promesa debe resolverse o rechazarse
	 */
	const simulateBasicPromise = async (shouldResolve = true) => {
		resetPromiseState();
		clearLog();

		addLog("Iniciando simulación de promesa básica...", "system");

		setPromiseState((prev) => ({
			...prev,
			status: "pending",
		}));

		addLog("Estado de la promesa: PENDIENTE", "info");
		addLog("Creando nueva promesa...", "info");

		const promise = new Promise((resolve, reject) => {
			addLog("Ejecutor de la promesa iniciado", "info");
			addLog("El ejecutor de la promesa se ejecuta inmediatamente cuando se crea la promesa", "info");

			addLog("Simulando operación asíncrona (2 segundos)...", "info");

			setTimeout(() => {
				if (shouldResolve) {
					addLog("La operación asíncrona fue exitosa", "success");
					addLog('Llamando a resolve() con resultado "Datos obtenidos"', "success");
					resolve("Datos obtenidos");
				} else {
					addLog("La operación asíncrona falló", "error");
					addLog('Llamando a reject() con error "Error en la operación"', "error");
					reject(new Error("Error en la operación"));
				}
			}, 2000);
		});

		addLog("Promesa creada. Añadiendo manejadores then() y catch()...", "info");

		try {
			const _result = await promise
				.then((data) => {
					addLog(`Manejador then() ejecutado con: ${data}`, "success");
					addLog("Estado de la promesa: CUMPLIDA", "success");

					setPromiseState((prev) => ({
						...prev,
						status: "fulfilled",
						result: data,
					}));

					return data;
				})
				.catch((error) => {
					addLog(`Manejador catch() ejecutado con error: ${error.message}`, "error");
					addLog("Estado de la promesa: RECHAZADA", "error");

					setPromiseState((prev) => ({
						...prev,
						status: "rejected",
						error: error.message,
					}));

					throw error;
				});

			addLog("Simulación completada", "system");
		} catch {
			addLog("Simulación completada (con error)", "system");
		}
	};

	/**
	 * @function simulatePromiseChaining
	 * @description Simula el encadenamiento de promesas
	 */
	const simulatePromiseChaining = async () => {
		resetPromiseState();
		clearLog();

		addLog("Iniciando simulación de encadenamiento de promesas...", "system");

		setPromiseState((prev) => ({
			...prev,
			status: "pending",
		}));

		// Paso 1: Primera promesa
		addLog("Paso 1: Creando primera promesa (obtener datos)...", "info");

		const promise1 = new Promise((resolve) => {
			setTimeout(() => {
				const rawData = { id: 1, text: "datos sin procesar" };
				addLog(`Paso 1: Datos obtenidos: ${JSON.stringify(rawData)}`, "success");
				resolve(rawData);
			}, 1500);
		});

		try {
			// Paso 2: Encadenamos la primera transformación
			addLog("Paso 2: Encadenando promesa para procesar datos...", "info");

			const result1 = await promise1.then((data) => {
				addLog("Paso 2: Transformando datos...", "info");

				// Simular procesamiento
				const processedData = {
					...data,
					text: data.text.toUpperCase(),
					processed: true,
				};

				addLog(`Paso 2: Datos procesados: ${JSON.stringify(processedData)}`, "success");
				return processedData; // Este valor se pasa al siguiente .then()
			});

			// Paso 3: Encadenamos la segunda transformación
			addLog("Paso 3: Encadenando promesa para enriquecer datos...", "info");

			const result2 = await Promise.resolve(result1).then((data) => {
				addLog("Paso 3: Enriqueciendo datos...", "info");

				// Simular enriquecimiento
				const enrichedData = {
					...data,
					timestamp: new Date().toISOString(),
					enriched: true,
				};

				addLog(`Paso 3: Datos enriquecidos: ${JSON.stringify(enrichedData)}`, "success");
				return enrichedData; // Este valor se pasa al siguiente .then()
			});

			// Paso 4: Encadenamos una tercera transformación con error
			addLog("Paso 4: Encadenando promesa para validar datos...", "info");

			try {
				await Promise.resolve(result2).then((data) => {
					addLog("Paso 4: Validando datos...", "info");

					// Simular validación con error
					if (data.enriched) {
						addLog("Paso 4: Error en validación de datos", "error");
						throw new Error("Datos demasiado enriquecidos");
					}

					return data;
				});
			} catch (error) {
				// Paso 5: Manejo del error y recuperación
				addLog(`Paso 4: Error capturado: ${error.message}`, "error");
				addLog("Paso 5: Recuperando del error...", "warning");

				const recoveredData = {
					...result2,
					enriched: false,
					recovered: true,
				};

				addLog(`Paso 5: Datos recuperados: ${JSON.stringify(recoveredData)}`, "success");

				// Establecer resultado final
				setPromiseState((prev) => ({
					...prev,
					status: "fulfilled",
					result: recoveredData,
				}));
			}

			addLog("Simulación de encadenamiento completada", "system");
		} catch (error) {
			addLog(`Error no manejado: ${error.message}`, "error");

			setPromiseState((prev) => ({
				...prev,
				status: "rejected",
				error: error.message,
			}));
		}
	};

	/**
	 * @function simulatePromiseAll
	 * @description Simula el uso de Promise.all
	 */
	const simulatePromiseAll = async () => {
		resetPromiseState();
		clearLog();

		addLog("Iniciando simulación de Promise.all...", "system");

		setPromiseState((prev) => ({
			...prev,
			status: "pending",
		}));

		// Crear múltiples promesas
		addLog("Creando múltiples promesas para ejecutar en paralelo", "info");

		const promise1 = new Promise((resolve) => {
			const time = 1500;
			addLog(`Promesa 1: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				addLog("Promesa 1: Completada", "success");
				resolve("Resultado 1");
			}, time);
		});

		const promise2 = new Promise((resolve) => {
			const time = 800;
			addLog(`Promesa 2: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				addLog("Promesa 2: Completada", "success");
				resolve("Resultado 2");
			}, time);
		});

		const promise3 = new Promise((resolve, reject) => {
			const time = 2000;
			const shouldFail = false; // Cambiar a true para simular un error

			addLog(`Promesa 3: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				if (shouldFail) {
					addLog("Promesa 3: Error", "error");
					reject(new Error("Error en Promesa 3"));
				} else {
					addLog("Promesa 3: Completada", "success");
					resolve("Resultado 3");
				}
			}, time);
		});

		addLog("Ejecutando Promise.all con las tres promesas", "info");
		addLog("Promise.all espera a que TODAS las promesas se resuelvan", "info");
		addLog("Si cualquier promesa falla, Promise.all es rechazado inmediatamente", "warning");

		try {
			const results = await Promise.all([promise1, promise2, promise3]);

			addLog("Promise.all completado exitosamente", "success");
			addLog(`Resultados: ${JSON.stringify(results)}`, "success");

			setPromiseState((prev) => ({
				...prev,
				status: "fulfilled",
				result: results,
				allPromisesResolved: true,
			}));
		} catch (error) {
			addLog(`Promise.all falló: ${error.message}`, "error");
			addLog("Cuando cualquier promesa falla, las demás promesas siguen ejecutándose", "warning");
			addLog("Pero Promise.all es rechazado inmediatamente con el primer error", "warning");

			setPromiseState((prev) => ({
				...prev,
				status: "rejected",
				error: error.message,
			}));
		}

		addLog("Simulación de Promise.all completada", "system");
	};

	/**
	 * @function simulatePromiseRace
	 * @description Simula el uso de Promise.race
	 */
	const simulatePromiseRace = async () => {
		resetPromiseState();
		clearLog();

		addLog("Iniciando simulación de Promise.race...", "system");

		setPromiseState((prev) => ({
			...prev,
			status: "pending",
		}));

		// Crear múltiples promesas
		addLog("Creando múltiples promesas para competir", "info");

		const promise1 = new Promise((resolve) => {
			const time = 1500;
			addLog(`Promesa 1: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				addLog("Promesa 1: Completada", "success");
				resolve("Ganador: Promesa 1");
			}, time);
		});

		const promise2 = new Promise((resolve) => {
			const time = 800; // Esta terminará primero
			addLog(`Promesa 2: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				addLog("Promesa 2: Completada", "success");
				resolve("Ganador: Promesa 2");
			}, time);
		});

		const promise3 = new Promise((resolve, reject) => {
			const time = 1200;
			const shouldFail = false; // Cambiar a true para simular un error

			addLog(`Promesa 3: Iniciando (durará ${time}ms)`, "info");

			setTimeout(() => {
				if (shouldFail) {
					addLog("Promesa 3: Error", "error");
					reject(new Error("Error en Promesa 3"));
				} else {
					addLog("Promesa 3: Completada", "success");
					resolve("Ganador: Promesa 3");
				}
			}, time);
		});

		addLog("Ejecutando Promise.race con las tres promesas", "info");
		addLog("Promise.race retorna la primera promesa que se resuelva o rechace", "info");

		try {
			const result = await Promise.race([promise1, promise2, promise3]);

			addLog(`Promise.race completado: ${result}`, "success");
			addLog("Las demás promesas siguen ejecutándose, pero su resultado se ignora", "warning");

			setPromiseState((prev) => ({
				...prev,
				status: "fulfilled",
				result: result,
			}));
		} catch (error) {
			addLog(`Promise.race falló: ${error.message}`, "error");

			setPromiseState((prev) => ({
				...prev,
				status: "rejected",
				error: error.message,
			}));
		}

		// Esperar a que las demás promesas terminen
		setTimeout(() => {
			addLog("NOTA: Todas las promesas han terminado ahora", "system");
			addLog("Simulación de Promise.race completada", "system");
		}, 2000);
	};

	/**
	 * @function simulatePromiseFinally
	 * @description Simula el uso de .finally() en promesas
	 */
	const simulatePromiseFinally = async () => {
		resetPromiseState();
		clearLog();

		addLog("Iniciando simulación de finally() en promesas...", "system");

		setPromiseState((prev) => ({
			...prev,
			status: "pending",
		}));

		const shouldResolve = Math.random() > 0.5; // 50% de probabilidad de éxito/error

		addLog(`Esta promesa ${shouldResolve ? "se resolverá" : "será rechazada"} (aleatoriamente)`, "info");

		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldResolve) {
					addLog("Promesa resuelta correctamente", "success");
					resolve("Datos procesados");
				} else {
					addLog("Promesa rechazada con error", "error");
					reject(new Error("Error en el procesamiento"));
				}
			}, 1500);
		});

		addLog("Encadenando then(), catch() y finally()...", "info");

		try {
			const _result = await promise
				.then((result) => {
					addLog(`Manejador then() ejecutado: ${result}`, "success");
					return result;
				})
				.catch((error) => {
					addLog(`Manejador catch() ejecutado: ${error.message}`, "error");
					throw error; // Re-lanzar para mantener el estado de rechazo
				})
				.finally(() => {
					// finally se ejecuta siempre, sin importar si la promesa se resolvió o rechazó
					addLog("Manejador finally() ejecutado", "info");
					addLog("finally() siempre se ejecuta, independientemente del resultado", "info");
					addLog("Uso común: limpiar recursos, ocultar indicadores de carga, etc.", "info");
				});

			// Si llegamos aquí, la promesa se resolvió
			setPromiseState((prev) => ({
				...prev,
				status: "fulfilled",
				result: _result,
			}));
		} catch (error) {
			// Si llegamos aquí, la promesa fue rechazada
			setPromiseState((prev) => ({
				...prev,
				status: "rejected",
				error: error.message,
			}));
		}

		addLog("Simulación de finally() completada", "system");
	};

	/**
	 * @function toggleAdvancedUsage
	 * @description Alterna la visualización de usos avanzados
	 */
	const toggleAdvancedUsage = () => {
		setPromiseState((prev) => ({
			...prev,
			showAdvanced: !prev.showAdvanced,
		}));
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>8.3 Promesas</h4>
				<p>
					Las Promesas son objetos que representan el resultado eventual de una operación asíncrona. Una
					promesa puede estar en uno de tres estados: pendiente, resuelta o rechazada. Las promesas
					proporcionan una forma más elegante de manejar operaciones asíncronas que los callbacks
					tradicionales.
				</p>

				<div className="promise-demo dark-theme">
					<h5>Demostración de Promesas</h5>

					<div className="control-panel dark-theme">
						<h6>Simulaciones:</h6>
						<div className="control-buttons dark-theme">
							<button
								className="sim-btn dark-theme"
								onClick={() => simulateBasicPromise(true)}
								disabled={promiseState.status === "pending"}>
								Promesa Básica (Exitosa)
							</button>

							<button
								className="sim-btn error dark-theme"
								onClick={() => simulateBasicPromise(false)}
								disabled={promiseState.status === "pending"}>
								Promesa Básica (Error)
							</button>

							<button
								className="sim-btn dark-theme"
								onClick={simulatePromiseChaining}
								disabled={promiseState.status === "pending"}>
								Encadenamiento de Promesas
							</button>

							<button
								className="sim-btn dark-theme"
								onClick={simulatePromiseAll}
								disabled={promiseState.status === "pending"}>
								Promise.all
							</button>

							<button
								className="sim-btn dark-theme"
								onClick={simulatePromiseRace}
								disabled={promiseState.status === "pending"}>
								Promise.race
							</button>

							<button
								className="sim-btn dark-theme"
								onClick={simulatePromiseFinally}
								disabled={promiseState.status === "pending"}>
								Promesa con finally()
							</button>
						</div>
					</div>

					<div className="simulation-container dark-theme">
						<div
							className="execution-log dark-theme"
							ref={logRef}>
							<h6>Registro de Ejecución</h6>

							{promiseState.executionLog.length === 0 ? (
								<div className="empty-log dark-theme">Selecciona una simulación para comenzar</div>
							) : (
								<ul className="log-entries dark-theme">
									{promiseState.executionLog.map((entry) => (
										<li
											key={entry.id}
											className={`log-entry ${entry.type} dark-theme`}>
											<span className="log-timestamp dark-theme">{entry.timestamp}</span>
											<span className="log-message dark-theme">{entry.message}</span>
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="results-display dark-theme">
							<h6>Estado de la Promesa</h6>

							<div className="promise-state-container dark-theme">
								{promiseState.status === "idle" && (
									<div className="state-idle dark-theme">
										<p>No hay promesa en ejecución</p>
										<p>Selecciona una simulación para comenzar</p>
									</div>
								)}

								{promiseState.status === "pending" && (
									<div className="state-pending dark-theme">
										<div className="spinner dark-theme"></div>
										<p>Promesa en ejecución...</p>
									</div>
								)}

								{promiseState.status === "fulfilled" && (
									<div className="state-fulfilled dark-theme">
										<h6>Promesa Resuelta ✓</h6>
										<div className="result-value dark-theme">
											<h6>Valor Retornado:</h6>
											<pre>
												{typeof promiseState.result === "object"
													? JSON.stringify(promiseState.result, null, 2)
													: promiseState.result}
											</pre>
										</div>

										{promiseState.allPromisesResolved && (
											<div className="note dark-theme">
												<strong>Nota:</strong> Todas las promesas se han resuelto correctamente.
											</div>
										)}
									</div>
								)}

								{promiseState.status === "rejected" && (
									<div className="state-rejected dark-theme">
										<h6>Promesa Rechazada ✗</h6>
										<div className="error-value dark-theme">
											<h6>Error:</h6>
											<pre>{promiseState.error}</pre>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="promise-theory dark-theme">
					<h5>Conceptos Fundamentales de Promesas</h5>

					<div className="promise-concepts dark-theme">
						<div className="concept-item dark-theme">
							<h6>Estados de una Promesa</h6>
							<ul className="dark-theme">
								<li>
									<strong>Pending (Pendiente):</strong> Estado inicial, ni cumplida ni rechazada.
								</li>
								<li>
									<strong>Fulfilled (Cumplida):</strong> La operación se completó con éxito.
								</li>
								<li>
									<strong>Rejected (Rechazada):</strong> La operación falló.
								</li>
							</ul>
						</div>

						<div className="concept-item dark-theme">
							<h6>Métodos de Instancia</h6>
							<ul className="dark-theme">
								<li>
									<strong>.then(onFulfilled, onRejected):</strong> Añade manejadores para cuando la
									promesa se resuelve.
								</li>
								<li>
									<strong>.catch(onRejected):</strong> Añade un manejador para cuando la promesa es
									rechazada.
								</li>
								<li>
									<strong>.finally(onFinally):</strong> Añade un manejador que se ejecuta cuando la
									promesa se resuelve o rechaza.
								</li>
							</ul>
						</div>

						<div className="concept-item dark-theme">
							<h6>Métodos Estáticos</h6>
							<ul className="dark-theme">
								<li>
									<strong>Promise.resolve(value):</strong> Crea una promesa resuelta con el valor
									dado.
								</li>
								<li>
									<strong>Promise.reject(reason):</strong> Crea una promesa rechazada con la razón
									dada.
								</li>
								<li>
									<strong>Promise.all(iterable):</strong> Espera a que todas las promesas se resuelvan
									o una se rechace.
								</li>
								<li>
									<strong>Promise.race(iterable):</strong> Se resuelve/rechaza tan pronto como una
									promesa se resuelve/rechaza.
								</li>
								<li>
									<strong>Promise.allSettled(iterable):</strong> Espera a que todas las promesas se
									resuelvan o rechacen.
								</li>
								<li>
									<strong>Promise.any(iterable):</strong> Se resuelve tan pronto como una promesa se
									resuelve, o se rechaza si todas son rechazadas.
								</li>
							</ul>
						</div>
					</div>

					<button
						className="toggle-advanced-btn dark-theme"
						onClick={toggleAdvancedUsage}>
						{promiseState.showAdvanced ? "Ocultar Usos Avanzados" : "Mostrar Usos Avanzados"}
					</button>

					{promiseState.showAdvanced && (
						<div className="advanced-usage dark-theme">
							<h6>Patrones Avanzados con Promesas</h6>

							<div className="advanced-examples dark-theme">
								<div className="advanced-example dark-theme">
									<h6>1. Promisificación</h6>
									<p>Convertir una función basada en callbacks a una que devuelva una promesa:</p>
									<pre className="code-snippet dark-theme">
										{`// Función basada en callbacks
function getUser(id, callback) {
  setTimeout(() => {
    if (id < 0) {
      callback(new Error('ID inválido'));
    } else {
      callback(null, { id, name: 'Usuario ' + id });
    }
  }, 1000);
}

// Versión promisificada
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    getUser(id, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

// Uso
getUserPromise(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));`}
									</pre>
								</div>

								<div className="advanced-example dark-theme">
									<h6>2. Ejecución Secuencial vs Paralela</h6>
									<pre className="code-snippet dark-theme">
										{`// Ejecución en paralelo (todas a la vez)
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
.then(responses => Promise.all(responses.map(r => r.json())))
.then(([users, posts, comments]) => {
  // Todos los datos están disponibles aquí
});

// Ejecución secuencial (una tras otra)
async function fetchSequential() {
  const users = await (await fetch('/api/users')).json();
  const posts = await (await fetch('/api/posts')).json();
  const comments = await (await fetch('/api/comments')).json();
  return { users, posts, comments };
}`}
									</pre>
								</div>

								<div className="advanced-example dark-theme">
									<h6>3. Control de Concurrencia</h6>
									<p>Limitar el número de promesas que se ejecutan simultáneamente:</p>
									<pre className="code-snippet dark-theme">
										{`async function processInBatches(items, batchSize, processFn) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    // Procesar lote en paralelo
    const batchResults = await Promise.all(
      batch.map(item => processFn(item))
    );
    
    results.push(...batchResults);
  }
  
  return results;
}

// Uso
const urls = [/* muchas URLs */];
processInBatches(urls, 5, url => fetch(url))
  .then(responses => console.log(\`Procesadas \${responses.length} URLs\`));`}
									</pre>
								</div>

								<div className="advanced-example dark-theme">
									<h6>4. Timeout para Promesas</h6>
									<p>Agregar un tiempo límite a cualquier promesa:</p>
									<pre className="code-snippet dark-theme">
										{`function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(\`Operación cancelada por timeout (\${timeoutMs}ms)\`));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// Uso
withTimeout(fetch('https://api.example.com/data'), 5000)
  .then(response => response.json())
  .catch(error => console.error(\`Error: \${error.message}\`));`}
									</pre>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="code-example dark-theme">
					<h5>Ejemplos de Código con Promesas</h5>

					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>Creación y Uso Básico</h6>
							<pre className="code-snippet dark-theme">
								{`// Crear una promesa
const myPromise = new Promise((resolve, reject) => {
  // Simular operación asíncrona
  setTimeout(() => {
    const success = Math.random() > 0.3;
    
    if (success) {
      resolve('Operación exitosa');
    } else {
      reject(new Error('Algo salió mal'));
    }
  }, 1000);
});

// Usar la promesa
myPromise
  .then(result => {
    console.log('Éxito:', result);
    return 'Valor procesado';
  })
  .then(processedValue => {
    console.log('Procesado:', processedValue);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Finalizado (éxito o error)');
  });`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>Métodos Estáticos de Promise</h6>
							<pre className="code-snippet dark-theme">
								{`// Promise.resolve
const resolvedPromise = Promise.resolve('Valor inmediato');
resolvedPromise.then(value => console.log(value));

// Promise.reject
const rejectedPromise = Promise.reject(new Error('Error inmediato'));
rejectedPromise.catch(error => console.error(error.message));

// Promise.all
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(responses => {
    console.log('Todas las peticiones completadas');
    return Promise.all(responses.map(r => r.json()));
  })
  .then(data => console.log('Datos:', data))
  .catch(error => console.error('Una petición falló:', error));

// Promise.race
const racePromises = [
  new Promise(resolve => setTimeout(() => resolve('Rápido'), 500)),
  new Promise(resolve => setTimeout(() => resolve('Medio'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('Lento'), 1500))
];

Promise.race(racePromises)
  .then(winner => console.log('Ganador:', winner));`}
							</pre>
						</div>
					</div>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>Una Promesa es un objeto que representa el resultado eventual de una operación asíncrona</li>
					<li>Las Promesas pueden estar en uno de tres estados: pendiente, resuelta o rechazada</li>
					<li>
						El método <code>.then()</code> se utiliza para manejar el caso de éxito y puede encadenarse
					</li>
					<li>
						El método <code>.catch()</code> se utiliza para manejar errores en cualquier parte de la cadena
					</li>
					<li>
						El método <code>.finally()</code> se ejecuta siempre, independientemente del éxito o fracaso
					</li>
					<li>
						<code>Promise.all()</code> espera a que todas las promesas se resuelvan o a que una falle
					</li>
					<li>
						<code>Promise.race()</code> retorna la primera promesa que se resuelva o rechace
					</li>
					<li>
						El encadenamiento de promesas permite realizar operaciones secuenciales y transformaciones de
						datos
					</li>
					<li>Las promesas solucionan el problema del "callback hell" o "pirámide de la perdición"</li>
					<li>Los errores no manejados en promesas pueden causar problemas difíciles de depurar</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03_Promesas;
