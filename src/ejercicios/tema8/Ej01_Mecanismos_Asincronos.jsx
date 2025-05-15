/**
 * @fileoverview Ejercicio sobre Mecanismos Asíncronos en JavaScript
 * @ejercicio Ej01_Mecanismos_Asincronos
 * @tema Tema 8: Comunicación Asíncrona
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej01_Mecanismos_Asincronos.css";

/**
 * @function Ej01_Mecanismos_Asincronos
 * @description Componente que demuestra los mecanismos de asincronía en JavaScript
 * @returns {JSX.Element} Componente con ejemplos de asincronía
 */
function Ej01_Mecanismos_Asincronos() {
	// ===== HOOKS =====
	// Estado para el log de operaciones
	const [log, setLog] = useState([]);

	// Estado para controlar si estamos simulando operaciones
	const [isSimulating, setIsSimulating] = useState(false);

	// Estado para elegir tipo de visualización
	const [visualizationType, setVisualizationType] = useState("timeline");

	// Referencias para eventos de animación
	const callStackRef = useRef(null);
	const taskQueueRef = useRef(null);
	const webAPIRef = useRef(null);
	const logRef = useRef(null);

	// ===== EFECTOS =====
	// Scroll automático del log cuando se agregan nuevos mensajes
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [log]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function addToLog
	 * @description Agrega un mensaje al log
	 * @param {string} message - Mensaje a agregar
	 * @param {string} type - Tipo de mensaje ('main', 'setTimeout', 'promise', 'microtask', etc.)
	 */
	const addToLog = (message, type = "main") => {
		setLog((prev) => [
			...prev,
			{
				id: Date.now() + Math.random(),
				message,
				type,
				timestamp: new Date().toISOString().split("T")[1].substring(0, 12),
			},
		]);
	};

	/**
	 * @function clearLog
	 * @description Limpia el log de operaciones
	 */
	const clearLog = () => {
		setLog([]);
	};

	/**
	 * @function simulateSyncOperations
	 * @description Simula operaciones síncronas
	 */
	const simulateSyncOperations = () => {
		clearLog();
		addToLog("Iniciando operaciones síncronas...", "main");

		// Simular una operación costosa que bloquea el hilo principal
		addToLog("Tarea 1: Inicio de operación costosa (bloquea el hilo)", "main");

		const startTime = Date.now();
		while (Date.now() - startTime < 1000) {
			// Bucle ocupado simulando trabajo que bloquea el hilo principal
		}

		addToLog("Tarea 1: Fin de operación costosa después de 1 segundo", "main");
		addToLog("Tarea 2: Operación rápida ejecutada", "main");
		addToLog("Tarea 3: Otra operación rápida ejecutada", "main");

		addToLog("Operaciones síncronas completadas", "main");
	};

	/**
	 * @function simulateAsyncOperations
	 * @description Simula operaciones asíncronas con setTimeout, Promise y microtareas
	 */
	const simulateAsyncOperations = async () => {
		clearLog();
		setIsSimulating(true);

		try {
			addToLog("Iniciando operaciones asíncronas...", "main");

			// Operación principal
			addToLog("Tarea principal: Iniciando flujo de operaciones", "main");

			// setTimeout (Macrotarea)
			addToLog("Añadiendo setTimeout (1000ms) a la cola de tareas", "main");
			setTimeout(() => {
				addToLog("Ejecutando callback de setTimeout después de 1 segundo", "setTimeout");

				// setTimeout anidado
				addToLog("Añadiendo otro setTimeout (500ms) dentro del callback", "setTimeout");
				setTimeout(() => {
					addToLog("Ejecutando callback anidado de setTimeout", "setTimeout");
				}, 500);
			}, 1000);

			// Promesa (Microtarea)
			addToLog("Creando una Promise y añadiendo a la cola de microtareas", "main");
			const promise = new Promise((resolve) => {
				addToLog("Dentro del ejecutor de Promise", "promise");

				// Simulando operación asíncrona dentro de la promesa
				setTimeout(() => {
					addToLog("Resolviendo Promise después de 750ms", "promise");
					resolve("Datos de la promesa");
				}, 750);
			});

			// Then de la promesa (otra microtarea)
			promise
				.then((data) => {
					addToLog(`Promise resuelta con: ${data}`, "microtask");

					// Encadenando otra promesa
					return new Promise((resolve) => {
						addToLog("Procesando datos en Promise encadenada", "microtask");
						resolve("Datos procesados");
					});
				})
				.then((processedData) => {
					addToLog(`Segunda Promise resuelta: ${processedData}`, "microtask");
				});

			// Operación síncrona después de configurar operaciones asíncronas
			addToLog("Tarea principal: Continuando con la ejecución síncrona", "main");

			// Zero-delay timeout (se ejecutará después de todas las microtareas pendientes)
			setTimeout(() => {
				addToLog("Ejecutando zero-delay timeout (se ejecuta después de microtareas)", "setTimeout");
			}, 0);

			// Creando una microtarea con queueMicrotask
			addToLog("Añadiendo tarea a la cola de microtareas con queueMicrotask", "main");
			queueMicrotask(() => {
				addToLog("Ejecutando microtarea (alta prioridad)", "microtask");
			});

			// Simular finalización del script principal
			addToLog("Tarea principal: Fin del script principal", "main");

			// Mostrar mensaje final después de que se completen todas las operaciones
			setTimeout(() => {
				addToLog("Todas las operaciones asíncronas han sido completadas", "main");
				addToLog("Nota: El bucle de eventos continúa esperando nuevas tareas", "main");
				setIsSimulating(false);
			}, 3000);
		} catch (error) {
			addToLog(`Error: ${error.message}`, "error");
			setIsSimulating(false);
		}
	};

	/**
	 * @function simulateEventLoop
	 * @description Simula el funcionamiento del bucle de eventos
	 */
	const simulateEventLoop = () => {
		clearLog();
		setIsSimulating(true);

		// Registro de tareas en consola
		console.log("Simulando bucle de eventos...");

		addToLog("Iniciando simulación del bucle de eventos...", "main");

		// Tarea 1: Tarea síncrona
		addToLog("Ejecutando script principal (Call Stack)", "main");

		// Tarea 2: Timer API (setTimeout)
		addToLog("Registrando setTimeout de 2 segundos (Web API)", "main");

		// Animar el movimiento desde el Call Stack a Web API
		animateToWebAPI("setTimeout(callback, 2000)");

		setTimeout(() => {
			// Animar el movimiento desde Web API a Task Queue
			animateToTaskQueue("callback de setTimeout");

			addToLog("setTimeout completado, callback añadido a la cola de tareas", "setTimeout");

			// Animar el movimiento desde Task Queue a Call Stack
			setTimeout(() => {
				animateToCallStack("callback de setTimeout");
				addToLog("Ejecutando callback de setTimeout (Call Stack)", "setTimeout");
				addToLog("Callback de setTimeout completado", "setTimeout");

				// Simulación completada
				setTimeout(() => {
					addToLog("Simulación del bucle de eventos completada", "main");
					setIsSimulating(false);
				}, 1000);
			}, 1000);
		}, 2000);

		// Tarea 3: Promise (microtarea)
		addToLog("Creando una Promise (Call Stack)", "main");

		// Animar la creación de una promesa
		animateToWebAPI("Promise.resolve()");

		Promise.resolve().then(() => {
			// Las microtareas tienen prioridad sobre las macrotareas
			addToLog("Microtarea de Promise lista para ejecutarse", "microtask");

			// Animar la microtarea
			animateToCallStack("microtarea de Promise");

			addToLog("Ejecutando microtarea de Promise (Call Stack)", "microtask");
			addToLog("Microtarea completada", "microtask");
		});

		// Tarea 4: Final del script
		addToLog("Script principal completado", "main");
	};

	// ===== FUNCIONES DE ANIMACIÓN =====
	/**
	 * @function animateToWebAPI
	 * @description Anima el movimiento de una tarea al Web API
	 * @param {string} taskName - Nombre de la tarea
	 */
	const animateToWebAPI = (taskName) => {
		if (!webAPIRef.current) return;

		const taskElement = document.createElement("div");
		taskElement.className = "event-task web-api-task";
		taskElement.textContent = taskName;

		webAPIRef.current.appendChild(taskElement);

		// Efecto de aparición
		setTimeout(() => {
			taskElement.style.opacity = "1";
			taskElement.style.transform = "translateY(0)";
		}, 100);

		// Eliminación después de un tiempo
		setTimeout(() => {
			if (webAPIRef.current?.contains(taskElement)) {
				taskElement.style.opacity = "0";
				setTimeout(() => {
					webAPIRef.current?.removeChild(taskElement);
				}, 500);
			}
		}, 1500);
	};

	/**
	 * @function animateToTaskQueue
	 * @description Anima el movimiento de una tarea a la cola de tareas
	 * @param {string} taskName - Nombre de la tarea
	 */
	const animateToTaskQueue = (taskName) => {
		if (!taskQueueRef.current) return;

		const taskElement = document.createElement("div");
		taskElement.className = "event-task task-queue-task";
		taskElement.textContent = taskName;

		taskQueueRef.current.appendChild(taskElement);

		// Efecto de aparición
		setTimeout(() => {
			taskElement.style.opacity = "1";
			taskElement.style.transform = "translateY(0)";
		}, 100);

		// Eliminación después de un tiempo
		setTimeout(() => {
			if (taskQueueRef.current?.contains(taskElement)) {
				taskElement.style.opacity = "0";
				setTimeout(() => {
					taskQueueRef.current?.removeChild(taskElement);
				}, 500);
			}
		}, 1500);
	};

	/**
	 * @function animateToCallStack
	 * @description Anima el movimiento de una tarea a la pila de llamadas
	 * @param {string} taskName - Nombre de la tarea
	 */
	const animateToCallStack = (taskName) => {
		if (!callStackRef.current) return;

		const taskElement = document.createElement("div");
		taskElement.className = "event-task call-stack-task";
		taskElement.textContent = taskName;

		// Añadir al principio de la pila (arriba)
		callStackRef.current.prepend(taskElement);

		// Efecto de aparición
		setTimeout(() => {
			taskElement.style.opacity = "1";
			taskElement.style.transform = "translateY(0)";
		}, 100);

		// Eliminación después de un tiempo
		setTimeout(() => {
			if (callStackRef.current?.contains(taskElement)) {
				taskElement.style.opacity = "0";
				setTimeout(() => {
					callStackRef.current?.removeChild(taskElement);
				}, 500);
			}
		}, 1500);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>8.1 Mecanismos de Comunicación Asíncrona</h4>
				<p>
					JavaScript es un lenguaje de un solo hilo (single-threaded), lo que significa que solo puede
					ejecutar una operación a la vez. Sin embargo, gracias a sus mecanismos asíncronos, puede realizar
					operaciones sin bloquear el hilo principal, lo que permite crear aplicaciones responsivas.
				</p>

				<div className="visualization-controls dark-theme">
					<h5>Visualización de Asincronía</h5>
					<div className="visualization-type-selector dark-theme">
						<label>
							<input
								type="radio"
								name="visualizationType"
								value="timeline"
								checked={visualizationType === "timeline"}
								onChange={() => setVisualizationType("timeline")}
							/>
							<span>Línea de Tiempo</span>
						</label>

						<label>
							<input
								type="radio"
								name="visualizationType"
								value="eventloop"
								checked={visualizationType === "eventloop"}
								onChange={() => setVisualizationType("eventloop")}
							/>
							<span>Bucle de Eventos</span>
						</label>
					</div>

					<div className="simulation-buttons dark-theme">
						{visualizationType === "timeline" ? (
							<>
								<button
									className="sim-btn dark-theme"
									onClick={simulateSyncOperations}
									disabled={isSimulating}>
									Simular Operaciones Síncronas
								</button>

								<button
									className="sim-btn dark-theme"
									onClick={simulateAsyncOperations}
									disabled={isSimulating}>
									Simular Operaciones Asíncronas
								</button>
							</>
						) : (
							<button
								className="sim-btn dark-theme"
								onClick={simulateEventLoop}
								disabled={isSimulating}>
								Simular Bucle de Eventos
							</button>
						)}

						<button
							className="clear-btn dark-theme"
							onClick={clearLog}
							disabled={isSimulating}>
							Limpiar Registro
						</button>
					</div>
				</div>

				{visualizationType === "timeline" ? (
					// Visualización de línea de tiempo
					<div className="timeline-visualization dark-theme">
						<div
							className="operation-log dark-theme"
							ref={logRef}>
							{log.length === 0 ? (
								<div className="empty-log dark-theme">
									Haz clic en uno de los botones para simular operaciones
								</div>
							) : (
								<ul className="log-list dark-theme">
									{log.map((entry) => (
										<li
											key={entry.id}
											className={`log-entry ${entry.type} dark-theme`}>
											<span className="log-time dark-theme">{entry.timestamp}</span>
											<span className="log-message dark-theme">{entry.message}</span>
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="timeline-diagram dark-theme">
							<h6>Tipos de Tareas:</h6>
							<div className="task-types dark-theme">
								<div className="task-type main dark-theme">
									<div className="task-type-icon main"></div>
									<span>Tarea Principal (Síncrono)</span>
								</div>

								<div className="task-type setTimeout dark-theme">
									<div className="task-type-icon setTimeout"></div>
									<span>Macrotareas (setTimeout, setInterval)</span>
								</div>

								<div className="task-type microtask dark-theme">
									<div className="task-type-icon microtask"></div>
									<span>Microtareas (Promise, queueMicrotask)</span>
								</div>

								<div className="task-type promise dark-theme">
									<div className="task-type-icon promise"></div>
									<span>Operaciones de Promesas</span>
								</div>

								<div className="task-type error dark-theme">
									<div className="task-type-icon error"></div>
									<span>Errores</span>
								</div>
							</div>
						</div>
					</div>
				) : (
					// Visualización del bucle de eventos
					<div className="eventloop-visualization dark-theme">
						<div className="eventloop-diagram dark-theme">
							<div className="eventloop-container dark-theme">
								<div className="call-stack-container dark-theme">
									<h6>Call Stack</h6>
									<div
										className="call-stack dark-theme"
										ref={callStackRef}></div>
								</div>

								<div className="event-loop-container dark-theme">
									<h6>Event Loop</h6>
									<div className="event-loop dark-theme">
										<div className="event-loop-circle dark-theme"></div>
									</div>
								</div>

								<div className="apis-container dark-theme">
									<h6>Web APIs</h6>
									<div
										className="web-apis dark-theme"
										ref={webAPIRef}></div>
								</div>

								<div className="queues-container dark-theme">
									<h6>Task Queue</h6>
									<div
										className="task-queue dark-theme"
										ref={taskQueueRef}></div>
								</div>
							</div>
						</div>

						<div
							className="operation-log small dark-theme"
							ref={logRef}>
							{log.length === 0 ? (
								<div className="empty-log dark-theme">
									Haz clic en "Simular Bucle de Eventos" para ver la animación
								</div>
							) : (
								<ul className="log-list dark-theme">
									{log.map((entry) => (
										<li
											key={entry.id}
											className={`log-entry ${entry.type} dark-theme`}>
											<span className="log-time dark-theme">{entry.timestamp}</span>
											<span className="log-message dark-theme">{entry.message}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				)}

				<div className="code-example dark-theme">
					<h5>Ejemplos de Código Asíncrono</h5>

					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>Operaciones con Callbacks</h6>
							<pre className="code-snippet dark-theme">
								{`// Ejemplo de callback con setTimeout
console.log('Inicio');

setTimeout(() => {
  console.log('Callback de setTimeout ejecutado');
}, 1000);

console.log('Fin');
// Salida:
// Inicio
// Fin
// Callback de setTimeout ejecutado (después de 1s)

// Callback Hell (problema de anidamiento)
asyncOperation1(function(result1) {
  asyncOperation2(result1, function(result2) {
    asyncOperation3(result2, function(result3) {
      // Código profundamente anidado
    }, errorCallback);
  }, errorCallback);
}, errorCallback);`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>Event Loop y Orden de Ejecución</h6>
							<pre className="code-snippet dark-theme">
								{`console.log('1 - Inicio del script');

setTimeout(() => {
  console.log('2 - Timeout 0ms');
}, 0);

Promise.resolve()
  .then(() => console.log('3 - Promise (microtarea)'));

console.log('4 - Fin del script');

// Salida:
// 1 - Inicio del script
// 4 - Fin del script
// 3 - Promise (microtarea)
// 2 - Timeout 0ms

// Las microtareas se ejecutan antes que las macrotareas,
// incluso si las macrotareas están listas antes.`}
							</pre>
						</div>
					</div>
				</div>

				<div className="event-loop-explanation dark-theme">
					<h5>¿Cómo funciona el Bucle de Eventos (Event Loop)?</h5>
					<ol className="dark-theme">
						<li>
							<strong>Call Stack:</strong> La pila de ejecución donde se colocan las funciones cuando se
							llaman y se retiran cuando terminan.
						</li>
						<li>
							<strong>Heap:</strong> Región de memoria donde se almacenan los objetos.
						</li>
						<li>
							<strong>Web APIs:</strong> Funcionalidades proporcionadas por el navegador para operaciones
							como temporizadores, solicitudes HTTP, etc.
						</li>
						<li>
							<strong>Callback Queue:</strong> Cola donde se colocan los callbacks cuando están listos
							para ejecutarse.
						</li>
						<li>
							<strong>Microtask Queue:</strong> Cola de alta prioridad para tareas como Promesas, que se
							procesan antes que la Callback Queue.
						</li>
						<li>
							<strong>Event Loop:</strong> Mecanismo que verifica constantemente si la pila de llamadas
							está vacía y, en ese caso, mueve tareas de las colas a la pila.
						</li>
					</ol>

					<p>
						<strong>Regla importante:</strong> El Event Loop ejecuta todas las microtareas pendientes antes
						de ejecutar la siguiente macrotarea.
					</p>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>
						JavaScript es un lenguaje de un solo hilo (single-threaded) que utiliza la asincronía para
						gestionar operaciones concurrentes
					</li>
					<li>
						El bucle de eventos (Event Loop) es el mecanismo central que coordina la ejecución asíncrona
					</li>
					<li>
						Hay dos tipos principales de tareas asíncronas: macrotareas (setTimeout, eventos) y microtareas
						(Promise, queueMicrotask)
					</li>
					<li>Las microtareas tienen mayor prioridad y se ejecutan antes que las macrotareas</li>
					<li>
						El código síncrono siempre se ejecuta completamente antes de que cualquier código asíncrono
						comience
					</li>
					<li>
						Las operaciones asíncronas permiten ejecutar código que podría bloquearse (como peticiones de
						red) sin congelar la interfaz de usuario
					</li>
					<li>
						Los callbacks son la forma más básica de manejar asincronía, pero pueden llevar al "callback
						hell"
					</li>
					<li>
						Entender el funcionamiento del Event Loop es crucial para predecir el orden de ejecución del
						código asíncrono
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej01_Mecanismos_Asincronos;
