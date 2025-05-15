/**
 * @fileoverview Ejercicio sobre AJAX y XMLHttpRequest
 * @ejercicio Ej02_AJAX_XMLHttpRequest
 * @tema Tema 8: Comunicación Asíncrona
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej02_AJAX_XMLHttpRequest.css";

/**
 * @function Ej02_AJAX_XMLHttpRequest
 * @description Componente que demuestra el uso de AJAX y XMLHttpRequest
 * @returns {JSX.Element} Componente con ejemplos de AJAX y XMLHttpRequest
 */
function Ej02_AJAX_XMLHttpRequest() {
	// ===== HOOKS =====
	// Estado para rastrear la actividad de la solicitud
	const [requestStatus, setRequestStatus] = useState({
		isLoading: false,
		success: null,
		error: null,
		data: null,
		responseTime: null,
		logs: [],
	});

	// Estado para la URL de la solicitud
	const [requestUrl, setRequestUrl] = useState("https://jsonplaceholder.typicode.com/users");

	// Estado para el método HTTP
	const [httpMethod, setHttpMethod] = useState("GET");

	// Estado para el cuerpo de la solicitud
	const [requestBody, setRequestBody] = useState("");

	// Estado para el tipo de respuesta
	const [responseType, setResponseType] = useState("json");

	// Estado para la configuración del timeout
	const [timeout, setTimeout] = useState(0);

	// Estado para mostrar u ocultar headers
	const [showHeaders, setShowHeaders] = useState(false);

	// Estado para los headers personalizados
	const [customHeaders, setCustomHeaders] = useState([
		{ id: 1, name: "Content-Type", value: "application/json", enabled: true },
	]);

	// Ref para el formulario
	const formRef = useRef(null);

	// Ref para el log
	const logRef = useRef(null);

	// ===== EFECTOS =====
	// Desplazamiento automático al final del log cuando cambia
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [requestStatus.logs]);

	// Actualizar el cuerpo de la solicitud según el método
	useEffect(() => {
		if (httpMethod === "POST" || httpMethod === "PUT") {
			if (requestBody === "") {
				setRequestBody(
					JSON.stringify(
						{
							title: "foo",
							body: "bar",
							userId: 1,
						},
						null,
						2
					)
				);
			}
		} else {
			setRequestBody("");
		}
	}, [httpMethod, requestBody]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function addLog
	 * @description Agrega un mensaje al log de la solicitud
	 * @param {string} message - Mensaje para agregar al log
	 * @param {string} type - Tipo de mensaje (info, success, error, warning)
	 */
	const addLog = (message, type = "info") => {
		setRequestStatus((prev) => ({
			...prev,
			logs: [
				...prev.logs,
				{
					id: Date.now(),
					message,
					type,
					timestamp: new Date().toISOString().substring(11, 23),
				},
			],
		}));
	};

	/**
	 * @function clearLogs
	 * @description Limpia el log de la solicitud
	 */
	const clearLogs = () => {
		setRequestStatus((prev) => ({
			...prev,
			logs: [],
		}));
	};

	/**
	 * @function addHeaderField
	 * @description Agrega un nuevo campo de header
	 */
	const addHeaderField = () => {
		setCustomHeaders((prev) => [
			...prev,
			{
				id: Date.now(),
				name: "",
				value: "",
				enabled: true,
			},
		]);
	};

	/**
	 * @function updateHeaderField
	 * @description Actualiza un campo de header
	 * @param {number} id - ID del header a actualizar
	 * @param {string} field - Campo a actualizar (name, value, enabled)
	 * @param {any} value - Nuevo valor para el campo
	 */
	const updateHeaderField = (id, field, value) => {
		setCustomHeaders((prev) => prev.map((header) => (header.id === id ? { ...header, [field]: value } : header)));
	};

	/**
	 * @function removeHeaderField
	 * @description Elimina un campo de header
	 * @param {number} id - ID del header a eliminar
	 */
	const removeHeaderField = (id) => {
		setCustomHeaders((prev) => prev.filter((header) => header.id !== id));
	};

	/**
	 * @function formatResponse
	 * @description Formatea la respuesta para mostrarla
	 * @param {any} data - Datos de respuesta
	 * @returns {string} Respuesta formateada
	 */
	const formatResponse = (data) => {
		if (!data) return "";

		try {
			if (typeof data === "object") {
				return JSON.stringify(data, null, 2);
			} else if (typeof data === "string") {
				// Intentar analizar como JSON si parece JSON
				try {
					const parsedData = JSON.parse(data);
					return JSON.stringify(parsedData, null, 2);
				} catch {
					return data;
				}
			}
			return String(data);
		} catch (error) {
			return `Error al formatear respuesta: ${error.message}`;
		}
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario y realiza la solicitud AJAX
	 * @param {Event} e - Evento de envío del formulario
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		// Restablecer el estado
		setRequestStatus({
			isLoading: true,
			success: null,
			error: null,
			data: null,
			responseTime: null,
			logs: requestStatus.logs,
		});

		// Tiempo de inicio para calcular el tiempo de respuesta
		const startTime = Date.now();

		// Crear XMLHttpRequest
		const xhr = new XMLHttpRequest();

		// Establecer el tiempo de espera (si está configurado)
		if (timeout > 0) {
			xhr.timeout = timeout;
		}

		// Registrar en el log el inicio de la solicitud
		addLog(`Iniciando solicitud ${httpMethod} a ${requestUrl}`, "info");

		// Configurar la solicitud
		xhr.open(httpMethod, requestUrl, true);

		// Establecer responseType
		xhr.responseType = responseType;

		// Añadir headers personalizados
		customHeaders.forEach((header) => {
			if (header.enabled && header.name && header.value) {
				xhr.setRequestHeader(header.name, header.value);
				addLog(`Header: ${header.name}: ${header.value}`, "info");
			}
		});

		// Evento onreadystatechange
		xhr.onreadystatechange = function () {
			const stateLabels = {
				0: "UNSENT",
				1: "OPENED",
				2: "HEADERS_RECEIVED",
				3: "LOADING",
				4: "DONE",
			};

			addLog(`Estado cambiado a: ${stateLabels[xhr.readyState]} (${xhr.readyState})`, "info");

			if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
				addLog(`Recibidos headers de respuesta:`, "info");
				addLog(`Status: ${xhr.status} ${xhr.statusText}`, "info");
			}

			if (xhr.readyState === XMLHttpRequest.DONE) {
				const responseTime = Date.now() - startTime;

				if (xhr.status >= 200 && xhr.status < 300) {
					addLog(`Solicitud completada: ${xhr.status} ${xhr.statusText}`, "success");
					addLog(`Tiempo de respuesta: ${responseTime}ms`, "info");

					// Procesar la respuesta según el tipo
					let responseData;
					try {
						responseData = xhr.response;
						if (xhr.responseType === "" || xhr.responseType === "text") {
							try {
								responseData = JSON.parse(xhr.responseText);
							} catch {
								responseData = xhr.responseText;
							}
						}

						setRequestStatus({
							isLoading: false,
							success: true,
							error: null,
							data: responseData,
							responseTime,
							logs: requestStatus.logs,
						});
					} catch (error) {
						addLog(`Error al procesar respuesta: ${error.message}`, "error");
						setRequestStatus({
							isLoading: false,
							success: false,
							error: error.message,
							data: null,
							responseTime,
							logs: requestStatus.logs,
						});
					}
				} else {
					addLog(`Error en solicitud: ${xhr.status} ${xhr.statusText}`, "error");
					setRequestStatus({
						isLoading: false,
						success: false,
						error: `${xhr.status} ${xhr.statusText}`,
						data: null,
						responseTime,
						logs: requestStatus.logs,
					});
				}
			}
		};

		// Manejar errores de red
		xhr.onerror = function () {
			const responseTime = Date.now() - startTime;
			addLog(`Error de red en la solicitud`, "error");
			setRequestStatus({
				isLoading: false,
				success: false,
				error: "Error de red",
				data: null,
				responseTime,
				logs: requestStatus.logs,
			});
		};

		// Manejar timeout
		xhr.ontimeout = function () {
			addLog(`La solicitud superó el tiempo de espera (${timeout}ms)`, "error");
			setRequestStatus({
				isLoading: false,
				success: false,
				error: `Timeout después de ${timeout}ms`,
				data: null,
				responseTime: timeout,
				logs: requestStatus.logs,
			});
		};

		// Manejar progreso de carga
		xhr.onprogress = function (event) {
			if (event.lengthComputable) {
				const percentComplete = Math.round((event.loaded / event.total) * 100);
				addLog(`Progreso de descarga: ${percentComplete}% (${event.loaded}/${event.total} bytes)`, "info");
			} else {
				addLog(`Descargados ${event.loaded} bytes`, "info");
			}
		};

		// Manejar progreso de carga (upload)
		if (xhr.upload) {
			xhr.upload.onprogress = function (event) {
				if (event.lengthComputable) {
					const percentComplete = Math.round((event.loaded / event.total) * 100);
					addLog(`Progreso de carga: ${percentComplete}% (${event.loaded}/${event.total} bytes)`, "info");
				} else {
					addLog(`Cargados ${event.loaded} bytes`, "info");
				}
			};
		}

		// Enviar la solicitud
		try {
			if (httpMethod === "POST" || httpMethod === "PUT") {
				xhr.send(requestBody);
				addLog(`Enviando datos: ${requestBody}`, "info");
			} else {
				xhr.send();
				addLog(`Enviando solicitud sin cuerpo`, "info");
			}
		} catch (error) {
			addLog(`Error al enviar solicitud: ${error.message}`, "error");
			setRequestStatus({
				isLoading: false,
				success: false,
				error: error.message,
				data: null,
				responseTime: Date.now() - startTime,
				logs: requestStatus.logs,
			});
		}
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>8.2 AJAX y XMLHttpRequest</h4>
				<p>
					AJAX (Asynchronous JavaScript and XML) es una técnica que permite actualizar partes de una página
					web sin necesidad de recargarla completamente. El objeto XMLHttpRequest es la base histórica de
					AJAX, permitiendo realizar solicitudes HTTP asíncronas al servidor.
				</p>

				<div className="ajax-demo dark-theme">
					<h5>Demostración de AJAX con XMLHttpRequest</h5>

					<div className="ajax-container dark-theme">
						<div className="request-form-container dark-theme">
							<h6>Configuración de la Solicitud</h6>

							<form
								ref={formRef}
								onSubmit={handleSubmit}
								className="request-form dark-theme">
								<div className="form-group dark-theme">
									<label htmlFor="url">URL</label>
									<input
										type="text"
										id="url"
										value={requestUrl}
										onChange={(e) => setRequestUrl(e.target.value)}
										placeholder="https://api.example.com/data"
										className="dark-theme"
										required
									/>
								</div>

								<div className="form-row dark-theme">
									<div className="form-group dark-theme">
										<label htmlFor="method">Método HTTP</label>
										<select
											id="method"
											value={httpMethod}
											onChange={(e) => setHttpMethod(e.target.value)}
											className="dark-theme">
											<option value="GET">GET</option>
											<option value="POST">POST</option>
											<option value="PUT">PUT</option>
											<option value="DELETE">DELETE</option>
										</select>
									</div>

									<div className="form-group dark-theme">
										<label htmlFor="responseType">Tipo de Respuesta</label>
										<select
											id="responseType"
											value={responseType}
											onChange={(e) => setResponseType(e.target.value)}
											className="dark-theme">
											<option value="json">json</option>
											<option value="text">text</option>
											<option value="document">document</option>
											<option value="arraybuffer">arraybuffer</option>
											<option value="blob">blob</option>
										</select>
									</div>

									<div className="form-group dark-theme">
										<label htmlFor="timeout">Timeout (ms)</label>
										<input
											type="number"
											id="timeout"
											value={timeout}
											onChange={(e) => setTimeout(parseInt(e.target.value) || 0)}
											min="0"
											step="1000"
											placeholder="0 (sin timeout)"
											className="dark-theme"
										/>
									</div>
								</div>

								<div className="form-group dark-theme">
									<div className="header-toggle dark-theme">
										<button
											type="button"
											className="toggle-btn dark-theme"
											onClick={() => setShowHeaders(!showHeaders)}>
											{showHeaders ? "Ocultar Headers" : "Mostrar Headers"}
										</button>
									</div>

									{showHeaders && (
										<div className="headers-section dark-theme">
											<h6>Headers</h6>

											{customHeaders.map((header) => (
												<div
													key={header.id}
													className="header-row dark-theme">
													<div className="header-enabled dark-theme">
														<input
															type="checkbox"
															checked={header.enabled}
															onChange={(e) =>
																updateHeaderField(
																	header.id,
																	"enabled",
																	e.target.checked
																)
															}
														/>
													</div>

													<input
														type="text"
														value={header.name}
														onChange={(e) =>
															updateHeaderField(header.id, "name", e.target.value)
														}
														placeholder="Nombre del header"
														className="dark-theme"
													/>

													<input
														type="text"
														value={header.value}
														onChange={(e) =>
															updateHeaderField(header.id, "value", e.target.value)
														}
														placeholder="Valor del header"
														className="dark-theme"
													/>

													<button
														type="button"
														className="remove-header-btn dark-theme"
														onClick={() => removeHeaderField(header.id)}>
														✕
													</button>
												</div>
											))}

											<button
												type="button"
												className="add-header-btn dark-theme"
												onClick={addHeaderField}>
												+ Añadir Header
											</button>
										</div>
									)}
								</div>

								{(httpMethod === "POST" || httpMethod === "PUT") && (
									<div className="form-group dark-theme">
										<label htmlFor="requestBody">Cuerpo de la Solicitud</label>
										<textarea
											id="requestBody"
											value={requestBody}
											onChange={(e) => setRequestBody(e.target.value)}
											placeholder="Datos a enviar"
											className="dark-theme"
											rows="4"
										/>
									</div>
								)}

								<div className="form-buttons dark-theme">
									<button
										type="submit"
										disabled={requestStatus.isLoading}
										className="send-btn dark-theme">
										{requestStatus.isLoading ? "Enviando..." : "Enviar Solicitud"}
									</button>

									<button
										type="button"
										className="clear-log-btn dark-theme"
										onClick={clearLogs}>
										Limpiar Log
									</button>
								</div>
							</form>
						</div>

						<div className="request-result-container dark-theme">
							<div
								className="request-log dark-theme"
								ref={logRef}>
								<h6>Log de la Solicitud</h6>

								{requestStatus.logs.length === 0 ? (
									<div className="empty-log dark-theme">
										Configure y envíe una solicitud para ver el log
									</div>
								) : (
									<ul className="log-entries dark-theme">
										{requestStatus.logs.map((log) => (
											<li
												key={log.id}
												className={`log-entry ${log.type} dark-theme`}>
												<span className="log-timestamp dark-theme">{log.timestamp}</span>
												<span className="log-message dark-theme">{log.message}</span>
											</li>
										))}
									</ul>
								)}
							</div>

							<div className="request-response dark-theme">
								<h6>Respuesta</h6>

								{requestStatus.isLoading ? (
									<div className="loading-indicator dark-theme">
										<div className="spinner dark-theme"></div>
										<p>Enviando solicitud...</p>
									</div>
								) : requestStatus.error ? (
									<div className="error-container dark-theme">
										<h6>Error:</h6>
										<p>{requestStatus.error}</p>
									</div>
								) : requestStatus.data ? (
									<div className="response-container dark-theme">
										<div className="response-meta dark-theme">
											<span className="status success dark-theme">Solicitud Exitosa</span>
											{requestStatus.responseTime && (
												<span className="response-time dark-theme">
													{requestStatus.responseTime} ms
												</span>
											)}
										</div>

										<pre className="response-data dark-theme">
											{formatResponse(requestStatus.data)}
										</pre>
									</div>
								) : (
									<div className="empty-response dark-theme">
										Sin datos de respuesta. Envíe una solicitud para ver resultados.
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Ejemplos de Código XMLHttpRequest</h5>

					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>Solicitud GET Básica</h6>
							<pre className="code-snippet dark-theme">
								{`// Crear una nueva instancia de XMLHttpRequest
const xhr = new XMLHttpRequest();

// Configurar para solicitud GET asíncrona
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

// Establecer el tipo de respuesta esperada
xhr.responseType = 'json';

// Configurar el manejador para cuando la solicitud completa
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Éxito - procesar los datos
    console.log('Datos recibidos:', xhr.response);
  } else {
    // Error - manejar según el código de estado
    console.error('Error:', xhr.status, xhr.statusText);
  }
};

// Manejar errores de red
xhr.onerror = function() {
  console.error('Error de red');
};

// Enviar la solicitud
xhr.send();`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>Solicitud POST con Datos</h6>
							<pre className="code-snippet dark-theme">
								{`// Crear una nueva instancia de XMLHttpRequest
const xhr = new XMLHttpRequest();

// Configurar para solicitud POST asíncrona
xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

// Establecer encabezados para enviar JSON
xhr.setRequestHeader('Content-Type', 'application/json');

// Configurar tipo de respuesta
xhr.responseType = 'json';

// Manejar cambios de estado
xhr.onreadystatechange = function() {
  // Estados:
  // 0: UNSENT - no se ha llamado a open()
  // 1: OPENED - se ha llamado a open()
  // 2: HEADERS_RECEIVED - se recibieron los headers
  // 3: LOADING - la respuesta se está recibiendo
  // 4: DONE - la operación está completa
  
  if (xhr.readyState === 4) {
    if (xhr.status === 201) {
      console.log('Post creado:', xhr.response);
    } else {
      console.error('Error:', xhr.status);
    }
  }
};

// Datos a enviar
const data = {
  title: 'foo',
  body: 'bar',
  userId: 1
};

// Enviar la solicitud con los datos
xhr.send(JSON.stringify(data));`}
							</pre>
						</div>
					</div>

					<div className="code-extra dark-theme">
						<h6>Seguimiento de Progreso</h6>
						<pre className="code-snippet dark-theme">
							{`const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ejemplo.com/archivo-grande.jpg', true);
xhr.responseType = 'blob';

// Seguimiento del progreso de descarga
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log(\`Progreso: \${percentComplete.toFixed(2)}%\`);
  }
};

// Seguimiento del progreso de carga (para POST/PUT)
xhr.upload.onprogress = function(event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log(\`Progreso de carga: \${percentComplete.toFixed(2)}%\`);
  }
};

xhr.onload = function() {
  if (xhr.status === 200) {
    const blob = xhr.response;
    // Hacer algo con el blob recibido
  }
};

xhr.send();`}
						</pre>
					</div>
				</div>

				<div className="ajax-explanation dark-theme">
					<h5>¿Qué es AJAX y cómo funciona?</h5>
					<p>
						AJAX (Asynchronous JavaScript And XML) es un conjunto de técnicas que permiten que las
						aplicaciones web se comuniquen con un servidor en segundo plano, sin interferir con la
						visualización y el comportamiento de la página existente.
					</p>

					<h6>Características principales:</h6>
					<ul className="dark-theme">
						<li>
							<strong>Asincronía:</strong> Las solicitudes AJAX se ejecutan en segundo plano, sin bloquear
							la interfaz.
						</li>
						<li>
							<strong>Parcialidad:</strong> Permite actualizar solo partes específicas de una página, no
							toda la página.
						</li>
						<li>
							<strong>Comunicación con el servidor:</strong> Establece un canal de comunicación
							bidireccional entre el cliente y el servidor.
						</li>
					</ul>

					<h6>Proceso de una solicitud AJAX:</h6>
					<ol className="dark-theme">
						<li>El navegador crea un objeto XMLHttpRequest</li>
						<li>El objeto XMLHttpRequest establece una conexión con el servidor</li>
						<li>El objeto XMLHttpRequest envía la solicitud al servidor</li>
						<li>El servidor procesa la solicitud</li>
						<li>El servidor envía una respuesta al navegador</li>
						<li>El objeto XMLHttpRequest procesa la respuesta</li>
						<li>JavaScript actualiza el contenido de la página según sea necesario</li>
					</ol>

					<h6>Ventajas de AJAX:</h6>
					<ul className="dark-theme">
						<li>Mejora la experiencia del usuario al reducir los tiempos de espera</li>
						<li>Reduce el tráfico de red al descargar solo los datos necesarios</li>
						<li>Permite crear aplicaciones web más interactivas</li>
						<li>Elimina la necesidad de recargar la página completa para actualizaciones pequeñas</li>
					</ul>

					<h6>Limitaciones de AJAX:</h6>
					<ul className="dark-theme">
						<li>Problemas de compatibilidad con navegadores antiguos</li>
						<li>Problemas de accesibilidad si no se implementa correctamente</li>
						<li>Problemas de seguridad si no se validan los datos adecuadamente</li>
						<li>Limitaciones de seguridad debido a la política del mismo origen (same-origin policy)</li>
					</ul>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>XMLHttpRequest es el objeto nativo de JavaScript para realizar peticiones HTTP asíncronas</li>
					<li>AJAX permite actualizar partes de una página web sin necesidad de recargarla completamente</li>
					<li>
						El método <code>open()</code> configura la solicitud pero no la envía
					</li>
					<li>
						El método <code>send()</code> envía la solicitud al servidor
					</li>
					<li>
						El manejo de la respuesta se realiza mediante eventos como <code>onload</code>,{" "}
						<code>onerror</code>, etc.
					</li>
					<li>
						La propiedad <code>readyState</code> indica el estado actual de la solicitud (0-4)
					</li>
					<li>
						Las solicitudes AJAX están sujetas a la política del mismo origen (same-origin policy) por
						razones de seguridad
					</li>
					<li>
						Para hacer solicitudes cross-origin, el servidor debe implementar CORS (Cross-Origin Resource
						Sharing)
					</li>
					<li>
						XMLHttpRequest fue la primera implementación para AJAX, pero ahora existen alternativas más
						modernas como Fetch API
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej02_AJAX_XMLHttpRequest;
