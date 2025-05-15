/**
 * @fileoverview Ejercicio sobre la Fetch API
 * @ejercicio Ej04_Fetch_API
 * @tema Tema 8: Comunicación Asíncrona
 * @fecha 11/05/2025
 */

import { useState, useEffect, useRef } from "react";
import "./Ej04_Fetch_API.css";

/**
 * @function Ej04_Fetch_API
 * @description Componente que demuestra el uso de la Fetch API
 * @returns {JSX.Element} Componente con ejemplos de Fetch API
 */
function Ej04_Fetch_API() {
	// ===== HOOKS =====
	// Estado para la URL de la solicitud
	const [requestUrl, setRequestUrl] = useState("https://jsonplaceholder.typicode.com/users");

	// Estado para el método HTTP
	const [httpMethod, setHttpMethod] = useState("GET");

	// Estado para los headers
	const [headers, setHeaders] = useState([{ id: 1, name: "Content-Type", value: "application/json", enabled: true }]);

	// Estado para el cuerpo de la solicitud
	const [requestBody, setRequestBody] = useState("");

	// Estado para opciones adicionales
	const [options, setOptions] = useState({
		mode: "cors",
		cache: "default",
		credentials: "same-origin",
		redirect: "follow",
	});

	// Estado para los resultados
	const [results, setResults] = useState({
		isLoading: false,
		response: null,
		data: null,
		error: null,
		logs: [],
	});

	// Estado para pestañas de resultados
	const [activeTab, setActiveTab] = useState("response");

	// Estado para mostrar interfaz avanzada
	const [showAdvanced, setShowAdvanced] = useState(false);

	// Referencia para el log
	const logRef = useRef(null);

	// Referencia para el formulario
	const formRef = useRef(null);

	// ===== EFECTOS =====
	// Scroll automático de log
	useEffect(() => {
		if (logRef.current) {
			logRef.current.scrollTop = logRef.current.scrollHeight;
		}
	}, [results.logs]);

	// Actualizar cuerpo de solicitud según método
	useEffect(() => {
		if (httpMethod === "GET" || httpMethod === "HEAD") {
			setRequestBody("");
		} else if (requestBody === "" && (httpMethod === "POST" || httpMethod === "PUT")) {
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
	}, [httpMethod, requestBody]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function addLog
	 * @description Agrega un mensaje al log
	 * @param {string} message - Mensaje para agregar
	 * @param {string} type - Tipo de mensaje (info, success, error, warning)
	 */
	const addLog = (message, type = "info") => {
		setResults((prev) => ({
			...prev,
			logs: [
				...prev.logs,
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
	 * @description Limpia el log
	 */
	const clearLog = () => {
		setResults((prev) => ({
			...prev,
			logs: [],
		}));
	};

	/**
	 * @function resetResults
	 * @description Restablece los resultados
	 */
	const resetResults = () => {
		setResults((prev) => ({
			...prev,
			isLoading: false,
			response: null,
			data: null,
			error: null,
		}));
	};

	/**
	 * @function addHeader
	 * @description Agrega un nuevo header
	 */
	const addHeader = () => {
		setHeaders((prev) => [...prev, { id: Date.now(), name: "", value: "", enabled: true }]);
	};

	/**
	 * @function removeHeader
	 * @description Elimina un header
	 * @param {number} id - ID del header a eliminar
	 */
	const removeHeader = (id) => {
		setHeaders((prev) => prev.filter((header) => header.id !== id));
	};

	/**
	 * @function updateHeader
	 * @description Actualiza un header
	 * @param {number} id - ID del header a actualizar
	 * @param {string} field - Campo a actualizar (name, value, enabled)
	 * @param {any} value - Nuevo valor
	 */
	const updateHeader = (id, field, value) => {
		setHeaders((prev) => prev.map((header) => (header.id === id ? { ...header, [field]: value } : header)));
	};

	/**
	 * @function updateOption
	 * @description Actualiza una opción de fetch
	 * @param {string} option - Opción a actualizar
	 * @param {string} value - Nuevo valor
	 */
	const updateOption = (option, value) => {
		setOptions((prev) => ({
			...prev,
			[option]: value,
		}));
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario y realiza la solicitud fetch
	 * @param {Event} e - Evento de formulario
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Limpiar resultados anteriores
		resetResults();

		// Establecer estado de carga
		setResults((prev) => ({
			...prev,
			isLoading: true,
		}));

		addLog(`Iniciando solicitud ${httpMethod} a ${requestUrl}`, "info");

		// Preparar headers
		const headerObject = {};
		headers.forEach((header) => {
			if (header.enabled && header.name && header.value) {
				headerObject[header.name] = header.value;
				addLog(`Header: ${header.name}: ${header.value}`, "info");
			}
		});

		// Preparar opciones de fetch
		const fetchOptions = {
			method: httpMethod,
			headers: headerObject,
			...options,
		};

		// Agregar cuerpo si es necesario
		if (httpMethod !== "GET" && httpMethod !== "HEAD" && requestBody) {
			fetchOptions.body = requestBody;
			addLog(`Enviando cuerpo: ${requestBody}`, "info");
		}

		addLog(`Configuración fetch: ${JSON.stringify(fetchOptions, null, 2)}`, "info");

		try {
			// Registrar tiempo de inicio
			const startTime = Date.now();

			// Realizar la solicitud fetch
			addLog("Ejecutando fetch...", "info");
			const response = await fetch(requestUrl, fetchOptions);

			// Registrar tiempo de respuesta
			const responseTime = Date.now() - startTime;
			addLog(`Respuesta recibida en ${responseTime}ms`, "info");

			// Registrar detalles de la respuesta
			addLog(`Status: ${response.status} ${response.statusText}`, response.ok ? "success" : "error");

			// Registrar headers de respuesta
			addLog("Headers de respuesta:", "info");
			response.headers.forEach((value, key) => {
				addLog(`${key}: ${value}`, "info");
			});

			// Clonar la respuesta para usar el cuerpo múltiples veces
			const clonedResponse = response.clone();

			// Intentar obtener el cuerpo de la respuesta como diferentes tipos
			let responseData;
			try {
				const contentType = response.headers.get("content-type");

				if (contentType && contentType.includes("application/json")) {
					responseData = await response.json();
					addLog("Respuesta procesada como JSON", "success");
				} else if (contentType && contentType.includes("text/")) {
					responseData = await response.text();
					addLog("Respuesta procesada como texto", "success");
				} else {
					// Intentar como texto de todos modos
					responseData = await response.text();
					addLog("Respuesta procesada como texto (tipo no determinado)", "warning");
				}

				// Actualizar estado con la respuesta
				setResults((prev) => ({
					...prev,
					isLoading: false,
					response: {
						status: clonedResponse.status,
						statusText: clonedResponse.statusText,
						headers: Object.fromEntries(clonedResponse.headers.entries()),
						url: clonedResponse.url,
						redirected: clonedResponse.redirected,
						type: clonedResponse.type,
						ok: clonedResponse.ok,
						bodyUsed: clonedResponse.bodyUsed,
						responseTime,
					},
					data: responseData,
				}));
			} catch (bodyError) {
				addLog(`Error al procesar el cuerpo de la respuesta: ${bodyError.message}`, "error");

				setResults((prev) => ({
					...prev,
					isLoading: false,
					response: {
						status: clonedResponse.status,
						statusText: clonedResponse.statusText,
						headers: Object.fromEntries(clonedResponse.headers.entries()),
						url: clonedResponse.url,
						redirected: clonedResponse.redirected,
						type: clonedResponse.type,
						ok: clonedResponse.ok,
						bodyUsed: clonedResponse.bodyUsed,
						responseTime,
					},
					error: `Error al procesar el cuerpo: ${bodyError.message}`,
				}));
			}
		} catch (error) {
			addLog(`Error en la solicitud fetch: ${error.message}`, "error");

			setResults((prev) => ({
				...prev,
				isLoading: false,
				error: error.message,
			}));
		}
	};

	/**
	 * @function formatResponse
	 * @description Formatea una respuesta para visualización
	 * @param {any} data - Datos a formatear
	 * @returns {string} Datos formateados
	 */
	const formatResponse = (data) => {
		if (!data) return "";

		try {
			if (typeof data === "object") {
				return JSON.stringify(data, null, 2);
			} else {
				// Intentar analizar como JSON si parece serlo
				try {
					if (typeof data === "string" && (data.startsWith("{") || data.startsWith("["))) {
						const parsed = JSON.parse(data);
						return JSON.stringify(parsed, null, 2);
					}
				} catch {
					// Si no es JSON, devolver como está
				}
				return String(data);
			}
		} catch (error) {
			return `Error al formatear datos: ${error.message}`;
		}
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>8.4 Fetch API</h4>
				<p>
					La Fetch API proporciona una interfaz moderna para realizar solicitudes HTTP en el navegador. Es una
					alternativa más poderosa y flexible a XMLHttpRequest, basada en Promesas, lo que facilita el
					encadenamiento de operaciones y el manejo de errores.
				</p>

				<div className="fetch-demo dark-theme">
					<h5>Cliente Fetch API</h5>

					<div className="fetch-container dark-theme">
						<div className="fetch-form-container dark-theme">
							<form
								ref={formRef}
								onSubmit={handleSubmit}
								className="fetch-form dark-theme">
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
											<option value="PATCH">PATCH</option>
											<option value="HEAD">HEAD</option>
											<option value="OPTIONS">OPTIONS</option>
										</select>
									</div>

									<div className="form-group dark-theme">
										<button
											type="button"
											className="toggle-btn dark-theme"
											onClick={() => setShowAdvanced(!showAdvanced)}>
											{showAdvanced ? "Básico" : "Avanzado"}
										</button>
									</div>
								</div>

								<div className="headers-section dark-theme">
									<h6>Headers</h6>

									{headers.map((header) => (
										<div
											key={header.id}
											className="header-row dark-theme">
											<div className="header-enabled dark-theme">
												<input
													type="checkbox"
													checked={header.enabled}
													onChange={(e) =>
														updateHeader(header.id, "enabled", e.target.checked)
													}
												/>
											</div>

											<input
												type="text"
												value={header.name}
												onChange={(e) => updateHeader(header.id, "name", e.target.value)}
												placeholder="Nombre del header"
												className="dark-theme"
											/>

											<input
												type="text"
												value={header.value}
												onChange={(e) => updateHeader(header.id, "value", e.target.value)}
												placeholder="Valor del header"
												className="dark-theme"
											/>

											<button
												type="button"
												className="remove-header-btn dark-theme"
												onClick={() => removeHeader(header.id)}>
												✕
											</button>
										</div>
									))}

									<button
										type="button"
										className="add-header-btn dark-theme"
										onClick={addHeader}>
										+ Añadir Header
									</button>
								</div>

								{showAdvanced && (
									<div className="advanced-options dark-theme">
										<h6>Opciones Avanzadas</h6>

										<div className="form-row dark-theme">
											<div className="form-group dark-theme">
												<label htmlFor="mode">Mode</label>
												<select
													id="mode"
													value={options.mode}
													onChange={(e) => updateOption("mode", e.target.value)}
													className="dark-theme">
													<option value="cors">cors</option>
													<option value="no-cors">no-cors</option>
													<option value="same-origin">same-origin</option>
												</select>
											</div>

											<div className="form-group dark-theme">
												<label htmlFor="cache">Cache</label>
												<select
													id="cache"
													value={options.cache}
													onChange={(e) => updateOption("cache", e.target.value)}
													className="dark-theme">
													<option value="default">default</option>
													<option value="no-store">no-store</option>
													<option value="reload">reload</option>
													<option value="no-cache">no-cache</option>
													<option value="force-cache">force-cache</option>
													<option value="only-if-cached">only-if-cached</option>
												</select>
											</div>
										</div>

										<div className="form-row dark-theme">
											<div className="form-group dark-theme">
												<label htmlFor="credentials">Credentials</label>
												<select
													id="credentials"
													value={options.credentials}
													onChange={(e) => updateOption("credentials", e.target.value)}
													className="dark-theme">
													<option value="same-origin">same-origin</option>
													<option value="include">include</option>
													<option value="omit">omit</option>
												</select>
											</div>

											<div className="form-group dark-theme">
												<label htmlFor="redirect">Redirect</label>
												<select
													id="redirect"
													value={options.redirect}
													onChange={(e) => updateOption("redirect", e.target.value)}
													className="dark-theme">
													<option value="follow">follow</option>
													<option value="error">error</option>
													<option value="manual">manual</option>
												</select>
											</div>
										</div>

										<div className="option-description dark-theme">
											<p>
												<strong>mode:</strong> Controla si las solicitudes cross-origin pueden
												exponer la respuesta.
											</p>
											<p>
												<strong>cache:</strong> Controla cómo interactúa la solicitud con la
												caché del navegador.
											</p>
											<p>
												<strong>credentials:</strong> Controla si las cookies y los encabezados
												de autenticación se envían con la solicitud.
											</p>
											<p>
												<strong>redirect:</strong> Controla cómo se manejan las redirecciones.
											</p>
										</div>
									</div>
								)}

								{httpMethod !== "GET" && httpMethod !== "HEAD" && (
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
										disabled={results.isLoading}
										className="send-btn dark-theme">
										{results.isLoading ? "Enviando..." : "Enviar Solicitud"}
									</button>

									<button
										type="button"
										className="clear-log-btn dark-theme"
										onClick={clearLog}>
										Limpiar Log
									</button>
								</div>
							</form>
						</div>

						<div className="fetch-results dark-theme">
							<div className="tabs dark-theme">
								<button
									className={`tab-btn ${activeTab === "response" ? "active" : ""} dark-theme`}
									onClick={() => setActiveTab("response")}>
									Respuesta
								</button>

								<button
									className={`tab-btn ${activeTab === "log" ? "active" : ""} dark-theme`}
									onClick={() => setActiveTab("log")}>
									Log
								</button>
							</div>

							<div className="tab-content dark-theme">
								{activeTab === "response" && (
									<div className="response-tab dark-theme">
										{results.isLoading ? (
											<div className="loading-indicator dark-theme">
												<div className="spinner dark-theme"></div>
												<p>Enviando solicitud...</p>
											</div>
										) : results.error ? (
											<div className="error-container dark-theme">
												<h6>Error:</h6>
												<p>{results.error}</p>
											</div>
										) : results.response ? (
											<div className="response-details dark-theme">
												<div className="response-meta dark-theme">
													<div
														className={`status ${
															results.response.ok ? "success" : "error"
														} dark-theme`}>
														<span className="status-code">{results.response.status}</span>
														<span className="status-text">
															{results.response.statusText}
														</span>
													</div>
													<div className="response-time dark-theme">
														{results.response.responseTime} ms
													</div>
												</div>

												<div className="response-headers dark-theme">
													<h6>Headers</h6>
													<pre className="dark-theme">
														{formatResponse(results.response.headers)}
													</pre>
												</div>

												<div className="response-body dark-theme">
													<h6>Cuerpo</h6>
													<pre className="dark-theme">{formatResponse(results.data)}</pre>
												</div>
											</div>
										) : (
											<div className="empty-response dark-theme">
												<p>Sin datos de respuesta. Envíe una solicitud para ver resultados.</p>
											</div>
										)}
									</div>
								)}

								{activeTab === "log" && (
									<div
										className="log-tab dark-theme"
										ref={logRef}>
										{results.logs.length === 0 ? (
											<div className="empty-log dark-theme">
												Configure y envíe una solicitud para ver el log
											</div>
										) : (
											<ul className="log-entries dark-theme">
												{results.logs.map((log) => (
													<li
														key={log.id}
														className={`log-entry ${log.type} dark-theme`}>
														<span className="log-timestamp dark-theme">
															{log.timestamp}
														</span>
														<span className="log-message dark-theme">{log.message}</span>
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Ejemplos de Código con Fetch API</h5>

					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>Solicitudes Básicas</h6>
							<pre className="code-snippet dark-theme">
								{`// Solicitud GET básica
fetch('https://api.example.com/data')
  .then(response => {
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    return response.json(); // Extraer cuerpo como JSON
  })
  .then(data => {
    console.log('Datos recibidos:', data);
  })
  .catch(error => {
    console.error('Error en fetch:', error);
  });

// Solicitud POST con datos JSON
fetch('https://api.example.com/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Nuevo elemento',
    body: 'Contenido del elemento',
    userId: 1
  })
})
  .then(response => response.json())
  .then(data => console.log('Creado:', data))`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>Opciones Avanzadas</h6>
							<pre className="code-snippet dark-theme">
								{`// Solicitud con todas las opciones
fetch('https://api.example.com/data', {
  method: 'GET',              // *GET, POST, PUT, DELETE, etc.
  mode: 'cors',               // no-cors, *cors, same-origin
  cache: 'no-cache',          // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN123'
  },
  redirect: 'follow',         // manual, *follow, error
  referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, etc.
  body: JSON.stringify(data)  // solo necesario para POST, PUT, etc.
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));

// Solicitud con timeout usando AbortController
const controller = new AbortController();
const signal = controller.signal;

// Cancelar después de 5 segundos
const timeoutId = setTimeout(() => controller.abort(), 5000);

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => {
    clearTimeout(timeoutId); // Limpiar el timeout
    console.log('Datos:', data);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Solicitud cancelada por timeout');
    } else {
      console.error('Error:', error);
    }
  });`}
							</pre>
						</div>
					</div>

					<div className="code-extra dark-theme">
						<h6>Manejo de Diferentes Tipos de Respuesta</h6>
						<pre className="code-snippet dark-theme">
							{`// Texto
fetch('/api/text')
  .then(response => response.text())
  .then(text => console.log(text));

// JSON
fetch('/api/json')
  .then(response => response.json())
  .then(data => console.log(data));

// Blob (imágenes, archivos)
fetch('/api/image.jpg')
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    document.body.appendChild(imgElement);
  });

// ArrayBuffer (datos binarios)
fetch('/api/binary')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // Procesar datos binarios
    const view = new Uint8Array(buffer);
    console.log(view);
  });

// FormData
fetch('/api/form', {
  method: 'POST',
  body: new FormData(document.getElementById('myForm'))
})
  .then(response => response.json())
  .then(result => console.log('Enviado:', result));`}
						</pre>
					</div>
				</div>

				<div className="fetch-explanation dark-theme">
					<h5>¿Qué es la Fetch API?</h5>
					<p>
						La Fetch API es una interfaz moderna para realizar solicitudes HTTP en el navegador,
						proporcionando una forma más potente y flexible que XMLHttpRequest. Está basada en Promesas, lo
						que la hace más fácil de usar en operaciones asíncronas.
					</p>

					<h6>Características principales:</h6>
					<ul className="dark-theme">
						<li>
							<strong>Basada en Promesas:</strong> Facilita el encadenamiento de operaciones y el manejo
							de errores.
						</li>
						<li>
							<strong>Interfaz simple:</strong> API más limpia y fácil de usar que XMLHttpRequest.
						</li>
						<li>
							<strong>Múltiples formatos:</strong> Soporta múltiples formatos de respuesta (JSON, texto,
							Blob, FormData, etc.).
						</li>
						<li>
							<strong>Control de solicitud:</strong> Opciones avanzadas para controlar el comportamiento
							de la solicitud.
						</li>
						<li>
							<strong>Streams:</strong> Soporte para lecturas y escrituras de streams para un mejor manejo
							de datos grandes.
						</li>
					</ul>

					<h6>Objeto Response</h6>
					<p>
						El objeto Response representa la respuesta a una solicitud fetch y proporciona varias
						propiedades y métodos:
					</p>
					<ul className="dark-theme">
						<li>
							<strong>response.status:</strong> Código de estado HTTP (200, 404, etc.)
						</li>
						<li>
							<strong>response.statusText:</strong> Texto del estado HTTP ("OK", "Not Found", etc.)
						</li>
						<li>
							<strong>response.ok:</strong> Boolean que indica si status está en el rango 200-299
						</li>
						<li>
							<strong>response.headers:</strong> Objeto Headers con los encabezados de respuesta
						</li>
						<li>
							<strong>response.url:</strong> URL de la respuesta
						</li>
						<li>
							<strong>response.type:</strong> Tipo de respuesta (basic, cors, opaque, etc.)
						</li>
						<li>
							<strong>response.redirected:</strong> Indica si la respuesta es resultado de una redirección
						</li>
					</ul>

					<h6>Métodos para leer el cuerpo de la respuesta:</h6>
					<ul className="dark-theme">
						<li>
							<strong>response.json():</strong> Lee y devuelve una Promesa que se resuelve en un objeto
							JSON
						</li>
						<li>
							<strong>response.text():</strong> Lee y devuelve una Promesa que se resuelve en texto
						</li>
						<li>
							<strong>response.blob():</strong> Lee y devuelve una Promesa que se resuelve en un Blob
						</li>
						<li>
							<strong>response.arrayBuffer():</strong> Lee y devuelve una Promesa que se resuelve en un
							ArrayBuffer
						</li>
						<li>
							<strong>response.formData():</strong> Lee y devuelve una Promesa que se resuelve en un
							objeto FormData
						</li>
					</ul>

					<div className="note dark-theme">
						<strong>IMPORTANTE:</strong> El cuerpo de una respuesta solo puede leerse una vez. Si necesitas
						leer el cuerpo múltiples veces, debes clonar la respuesta con <code>response.clone()</code>{" "}
						antes de leerla.
					</div>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>La Fetch API es una interfaz moderna basada en Promesas para realizar solicitudes HTTP</li>
					<li>
						El método <code>fetch()</code> devuelve una Promesa que se resuelve en un objeto Response
					</li>
					<li>
						El objeto Response incluye métodos como <code>json()</code>, <code>text()</code>,{" "}
						<code>blob()</code> que devuelven Promesas
					</li>
					<li>
						La propiedad <code>response.ok</code> indica si la respuesta fue exitosa (código 200-299)
					</li>
					<li>Fetch no rechaza automáticamente la promesa en caso de errores HTTP (como 404 o 500)</li>
					<li>Los errores de red (como problemas de conexión) sí provocan el rechazo de la promesa</li>
					<li>
						El cuerpo de una respuesta solo puede leerse una vez; use <code>response.clone()</code> si
						necesita múltiples lecturas
					</li>
					<li>
						Fetch admite opciones avanzadas como <code>mode</code>, <code>cache</code>,{" "}
						<code>credentials</code> y <code>redirect</code>
					</li>
					<li>Se puede establecer un timeout utilizando AbortController y AbortSignal</li>
					<li>
						Fetch es compatible con características modernas como Streams para el manejo eficiente de datos
						grandes
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej04_Fetch_API;
