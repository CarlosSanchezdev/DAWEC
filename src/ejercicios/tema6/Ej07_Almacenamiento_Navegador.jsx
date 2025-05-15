/**
 * @fileoverview Ejercicio sobre almacenamiento en navegador (cookies, localStorage y sessionStorage)
 * @ejercicio Ej07_Almacenamiento_Navegador
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ej07_Almacenamiento_Navegador.css";

/**
 * @function Ej07_Almacenamiento_Navegador
 * @description Componente que demuestra los diferentes métodos de almacenamiento en el navegador
 * @returns {JSX.Element} Componente de demostración
 */
function Ej07_Almacenamiento_Navegador() {
	// ===== ESTADO PARA DEMOS =====
	const [activeTab, setActiveTab] = useState("localStorage");
	const [notification, setNotification] = useState(null);

	// Estados para localStorage
	const [localStorageKey, setLocalStorageKey] = useState("");
	const [localStorageValue, setLocalStorageValue] = useState("");
	const [localStorageItems, setLocalStorageItems] = useState([]);

	// Estados para sessionStorage
	const [sessionStorageKey, setSessionStorageKey] = useState("");
	const [sessionStorageValue, setSessionStorageValue] = useState("");
	const [sessionStorageItems, setSessionStorageItems] = useState([]);

	// Estados para cookies
	const [cookieName, setCookieName] = useState("");
	const [cookieValue, setCookieValue] = useState("");
	const [cookieExpires, setCookieExpires] = useState("");
	const [cookieItems, setCookieItems] = useState([]);

	// ===== EFECTOS =====
	// Cargar datos al iniciar
	useEffect(() => {
		refreshLocalStorage();
		refreshSessionStorage();
		refreshCookies();
	}, []);

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function showNotification
	 * @description Muestra una notificación temporal
	 * @param {string} message - Mensaje a mostrar
	 * @param {string} type - Tipo de notificación ('success', 'error')
	 */
	const showNotification = (message, type = "success") => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	// ===== FUNCIONES PARA LOCALSTORAGE =====

	/**
	 * @function refreshLocalStorage
	 * @description Actualiza la lista de elementos en localStorage
	 */
	const refreshLocalStorage = () => {
		const items = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			items.push({
				key: key,
				value: localStorage.getItem(key),
			});
		}
		setLocalStorageItems(items);
	};

	/**
	 * @function handleLocalStorageSave
	 * @description Guarda un elemento en localStorage
	 */
	const handleLocalStorageSave = () => {
		if (!localStorageKey.trim()) {
			showNotification("La clave no puede estar vacía", "error");
			return;
		}

		try {
			localStorage.setItem(localStorageKey, localStorageValue);
			showNotification(`Item guardado en localStorage: ${localStorageKey}`);
			setLocalStorageKey("");
			setLocalStorageValue("");
			refreshLocalStorage();
		} catch (error) {
			showNotification(`Error al guardar en localStorage: ${error.message}`, "error");
		}
	};

	/**
	 * @function handleLocalStorageDelete
	 * @description Elimina un elemento de localStorage
	 * @param {string} key - Clave a eliminar
	 */
	const handleLocalStorageDelete = (key) => {
		localStorage.removeItem(key);
		showNotification(`Item eliminado de localStorage: ${key}`);
		refreshLocalStorage();
	};

	/**
	 * @function handleLocalStorageClear
	 * @description Limpia todos los elementos de localStorage
	 */
	const handleLocalStorageClear = () => {
		if (window.confirm("¿Seguro que deseas eliminar todos los elementos de localStorage?")) {
			localStorage.clear();
			showNotification("Se han eliminado todos los elementos de localStorage");
			refreshLocalStorage();
		}
	};

	// ===== FUNCIONES PARA SESSIONSTORAGE =====

	/**
	 * @function refreshSessionStorage
	 * @description Actualiza la lista de elementos en sessionStorage
	 */
	const refreshSessionStorage = () => {
		const items = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			items.push({
				key: key,
				value: sessionStorage.getItem(key),
			});
		}
		setSessionStorageItems(items);
	};

	/**
	 * @function handleSessionStorageSave
	 * @description Guarda un elemento en sessionStorage
	 */
	const handleSessionStorageSave = () => {
		if (!sessionStorageKey.trim()) {
			showNotification("La clave no puede estar vacía", "error");
			return;
		}

		try {
			sessionStorage.setItem(sessionStorageKey, sessionStorageValue);
			showNotification(`Item guardado en sessionStorage: ${sessionStorageKey}`);
			setSessionStorageKey("");
			setSessionStorageValue("");
			refreshSessionStorage();
		} catch (error) {
			showNotification(`Error al guardar en sessionStorage: ${error.message}`, "error");
		}
	};

	/**
	 * @function handleSessionStorageDelete
	 * @description Elimina un elemento de sessionStorage
	 * @param {string} key - Clave a eliminar
	 */
	const handleSessionStorageDelete = (key) => {
		sessionStorage.removeItem(key);
		showNotification(`Item eliminado de sessionStorage: ${key}`);
		refreshSessionStorage();
	};

	/**
	 * @function handleSessionStorageClear
	 * @description Limpia todos los elementos de sessionStorage
	 */
	const handleSessionStorageClear = () => {
		if (window.confirm("¿Seguro que deseas eliminar todos los elementos de sessionStorage?")) {
			sessionStorage.clear();
			showNotification("Se han eliminado todos los elementos de sessionStorage");
			refreshSessionStorage();
		}
	};

	// ===== FUNCIONES PARA COOKIES =====

	/**
	 * @function refreshCookies
	 * @description Actualiza la lista de cookies
	 */
	const refreshCookies = () => {
		const cookies = document.cookie
			.split(";")
			.map((cookie) => {
				const [key, value] = cookie.trim().split("=");
				return { key, value: decodeURIComponent(value || "") };
			})
			.filter((cookie) => cookie.key !== "");

		setCookieItems(cookies);
	};

	/**
	 * @function handleCookieSave
	 * @description Guarda una cookie
	 */
	const handleCookieSave = () => {
		if (!cookieName.trim()) {
			showNotification("El nombre de la cookie no puede estar vacío", "error");
			return;
		}

		try {
			let cookieStr = `${cookieName}=${encodeURIComponent(cookieValue)}`;

			if (cookieExpires) {
				const expiryDate = new Date();
				expiryDate.setTime(expiryDate.getTime() + parseInt(cookieExpires) * 24 * 60 * 60 * 1000);
				cookieStr += `; expires=${expiryDate.toUTCString()}`;
			}

			cookieStr += "; path=/";

			document.cookie = cookieStr;
			showNotification(`Cookie guardada: ${cookieName}`);
			setCookieName("");
			setCookieValue("");
			setCookieExpires("");
			refreshCookies();
		} catch (error) {
			showNotification(`Error al guardar la cookie: ${error.message}`, "error");
		}
	};

	/**
	 * @function handleCookieDelete
	 * @description Elimina una cookie
	 * @param {string} name - Nombre de la cookie a eliminar
	 */
	const handleCookieDelete = (name) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		showNotification(`Cookie eliminada: ${name}`);
		refreshCookies();
	};

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 7: Almacenamiento en Navegador</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra los diferentes métodos de almacenamiento de datos en el navegador:
					localStorage, sessionStorage y cookies.
				</p>
			</div>

			{notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.8 Almacenamiento en el Navegador</h4>
					<p>Los navegadores web ofrecen diferentes mecanismos para almacenar datos en el cliente:</p>

					<div className="storage-tabs">
						<button
							className={activeTab === "localStorage" ? "active" : ""}
							onClick={() => setActiveTab("localStorage")}>
							localStorage
						</button>
						<button
							className={activeTab === "sessionStorage" ? "active" : ""}
							onClick={() => setActiveTab("sessionStorage")}>
							sessionStorage
						</button>
						<button
							className={activeTab === "cookies" ? "active" : ""}
							onClick={() => setActiveTab("cookies")}>
							Cookies
						</button>
					</div>

					{/* localStorage Tab */}
					{activeTab === "localStorage" && (
						<div className="storage-container">
							<div className="storage-info">
								<h5>Local Storage</h5>
								<p>
									<code>localStorage</code> permite almacenar datos en el navegador sin fecha de
									expiración. Los datos persisten incluso después de cerrar el navegador y no se
									eliminan automáticamente.
								</p>
								<div className="storage-limits">
									<strong>Características principales:</strong>
									<ul>
										<li>Capacidad: ~5MB por dominio</li>
										<li>Persistencia: Permanente hasta que se borre explícitamente</li>
										<li>Alcance: Disponible para todas las ventanas/pestañas del mismo origen</li>
										<li>API: Sencilla y sincrónica</li>
										<li>Formato: Solo almacena strings (usar JSON para objetos)</li>
									</ul>
								</div>
							</div>

							<div className="storage-demo">
								<div className="storage-form">
									<div className="form-group">
										<label>Clave:</label>
										<input
											type="text"
											value={localStorageKey}
											onChange={(e) => setLocalStorageKey(e.target.value)}
											placeholder="Nombre de la clave"
										/>
									</div>
									<div className="form-group">
										<label>Valor:</label>
										<input
											type="text"
											value={localStorageValue}
											onChange={(e) => setLocalStorageValue(e.target.value)}
											placeholder="Valor a almacenar"
										/>
									</div>
									<div className="form-actions">
										<button
											onClick={handleLocalStorageSave}
											className="save-btn">
											Guardar
										</button>
										<button
											onClick={handleLocalStorageClear}
											className="clear-btn">
											Limpiar Todo
										</button>
									</div>
								</div>

								<div className="storage-items">
									<h6>Elementos almacenados:</h6>
									{localStorageItems.length === 0 ? (
										<p className="empty-message">No hay elementos en localStorage</p>
									) : (
										<ul className="items-list">
											{localStorageItems.map((item, index) => (
												<li
													key={index}
													className="item">
													<div className="item-info">
														<span className="item-key">{item.key}:</span>
														<span className="item-value">{item.value}</span>
													</div>
													<button
														onClick={() => handleLocalStorageDelete(item.key)}
														className="delete-btn">
														×
													</button>
												</li>
											))}
										</ul>
									)}
								</div>

								<div className="code-example">
									<h6>Ejemplo de código:</h6>
									<pre className="code-snippet">
										{`// Guardar un item
localStorage.setItem('usuario', 'Juan');

// Obtener un item
const usuario = localStorage.getItem('usuario');

// Eliminar un item
localStorage.removeItem('usuario');

// Limpiar todo localStorage
localStorage.clear();

// Almacenar objeto (convertido a JSON)
const usuarioObj = { id: 1, nombre: 'Juan' };
localStorage.setItem('usuario', JSON.stringify(usuarioObj));

// Recuperar objeto
const usuarioRecuperado = JSON.parse(localStorage.getItem('usuario'));`}
									</pre>
								</div>
							</div>
						</div>
					)}

					{/* sessionStorage Tab */}
					{activeTab === "sessionStorage" && (
						<div className="storage-container">
							<div className="storage-info">
								<h5>Session Storage</h5>
								<p>
									<code>sessionStorage</code> es similar a localStorage, pero los datos solo persisten
									durante la sesión actual del navegador (mientras la pestaña/ventana esté abierta).
								</p>
								<div className="storage-limits">
									<strong>Características principales:</strong>
									<ul>
										<li>Capacidad: ~5MB por dominio</li>
										<li>Persistencia: Solo durante la sesión de navegación actual</li>
										<li>Alcance: Limitado a la ventana/pestaña que lo creó</li>
										<li>API: Idéntica a localStorage</li>
										<li>Formato: Solo almacena strings (usar JSON para objetos)</li>
									</ul>
								</div>
							</div>

							<div className="storage-demo">
								<div className="storage-form">
									<div className="form-group">
										<label>Clave:</label>
										<input
											type="text"
											value={sessionStorageKey}
											onChange={(e) => setSessionStorageKey(e.target.value)}
											placeholder="Nombre de la clave"
										/>
									</div>
									<div className="form-group">
										<label>Valor:</label>
										<input
											type="text"
											value={sessionStorageValue}
											onChange={(e) => setSessionStorageValue(e.target.value)}
											placeholder="Valor a almacenar"
										/>
									</div>
									<div className="form-actions">
										<button
											onClick={handleSessionStorageSave}
											className="save-btn">
											Guardar
										</button>
										<button
											onClick={handleSessionStorageClear}
											className="clear-btn">
											Limpiar Todo
										</button>
									</div>
								</div>

								<div className="storage-items">
									<h6>Elementos almacenados:</h6>
									{sessionStorageItems.length === 0 ? (
										<p className="empty-message">No hay elementos en sessionStorage</p>
									) : (
										<ul className="items-list">
											{sessionStorageItems.map((item, index) => (
												<li
													key={index}
													className="item">
													<div className="item-info">
														<span className="item-key">{item.key}:</span>
														<span className="item-value">{item.value}</span>
													</div>
													<button
														onClick={() => handleSessionStorageDelete(item.key)}
														className="delete-btn">
														×
													</button>
												</li>
											))}
										</ul>
									)}
								</div>

								<div className="info-alert">
									<strong>Nota:</strong> Los datos de sessionStorage se eliminarán cuando cierres esta
									pestaña o ventana.
								</div>

								<div className="code-example">
									<h6>Ejemplo de código:</h6>
									<pre className="code-snippet">
										{`// El uso de sessionStorage es idéntico a localStorage
sessionStorage.setItem('id_sesion', '12345');

// Obtener un item
const sesionId = sessionStorage.getItem('id_sesion');

// Comprobar si existe un elemento
if (sessionStorage.getItem('id_sesion')) {
  console.log('Sesión activa');
}

// Número de elementos almacenados
const numItems = sessionStorage.length;

// Obtener clave por índice
const keyName = sessionStorage.key(0); // Primera clave`}
									</pre>
								</div>
							</div>
						</div>
					)}

					{/* Cookies Tab */}
					{activeTab === "cookies" && (
						<div className="storage-container">
							<div className="storage-info">
								<h5>Cookies</h5>
								<p>
									Las cookies son pequeños fragmentos de datos que se envían desde un sitio web y se
									almacenan en el navegador del usuario. A diferencia de localStorage y
									sessionStorage, las cookies se envían al servidor con cada solicitud HTTP.
								</p>
								<div className="storage-limits">
									<strong>Características principales:</strong>
									<ul>
										<li>Capacidad: ~4KB por cookie, máximo ~50 cookies por dominio</li>
										<li>Persistencia: Configurable (de sesión o con fecha de expiración)</li>
										<li>Alcance: Configurable (dominio y ruta)</li>
										<li>API: Más compleja y menos intuitiva</li>
										<li>Transmisión: Se envían automáticamente al servidor con cada petición</li>
									</ul>
								</div>
							</div>

							<div className="storage-demo">
								<div className="storage-form">
									<div className="form-group">
										<label>Nombre:</label>
										<input
											type="text"
											value={cookieName}
											onChange={(e) => setCookieName(e.target.value)}
											placeholder="Nombre de la cookie"
										/>
									</div>
									<div className="form-group">
										<label>Valor:</label>
										<input
											type="text"
											value={cookieValue}
											onChange={(e) => setCookieValue(e.target.value)}
											placeholder="Valor de la cookie"
										/>
									</div>
									<div className="form-group">
										<label>Expiración (días):</label>
										<input
											type="number"
											value={cookieExpires}
											onChange={(e) => setCookieExpires(e.target.value)}
											placeholder="Días hasta expiración (vacío = sesión)"
										/>
									</div>
									<div className="form-actions">
										<button
											onClick={handleCookieSave}
											className="save-btn">
											Guardar Cookie
										</button>
									</div>
								</div>

								<div className="storage-items">
									<h6>Cookies almacenadas:</h6>
									{cookieItems.length === 0 ? (
										<p className="empty-message">No hay cookies almacenadas</p>
									) : (
										<ul className="items-list">
											{cookieItems.map((item, index) => (
												<li
													key={index}
													className="item">
													<div className="item-info">
														<span className="item-key">{item.key}:</span>
														<span className="item-value">{item.value}</span>
													</div>
													<button
														onClick={() => handleCookieDelete(item.key)}
														className="delete-btn">
														×
													</button>
												</li>
											))}
										</ul>
									)}
								</div>

								<div className="code-example">
									<h6>Ejemplo de código:</h6>
									<pre className="code-snippet">
										{`// Crear una cookie que expire en 7 días
document.cookie = "username=Juan; expires=" + 
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() + 
  "; path=/";

// Crear una cookie de sesión (expira al cerrar el navegador)
document.cookie = "sesion=activa; path=/";

// Leer todas las cookies
const allCookies = document.cookie;
// Devuelve string con formato: "cookie1=valor1; cookie2=valor2"

// Eliminar una cookie (estableciendo fecha pasada)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// Función para obtener una cookie específica
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}`}
									</pre>
								</div>
							</div>
						</div>
					)}

					<div className="comparison-table">
						<h5>Comparativa de métodos de almacenamiento</h5>
						<table>
							<thead>
								<tr>
									<th>Característica</th>
									<th>localStorage</th>
									<th>sessionStorage</th>
									<th>Cookies</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Capacidad</td>
									<td>~5MB</td>
									<td>~5MB</td>
									<td>~4KB por cookie</td>
								</tr>
								<tr>
									<td>Persistencia</td>
									<td>Permanente</td>
									<td>Sesión actual</td>
									<td>Configurable</td>
								</tr>
								<tr>
									<td>Envío al servidor</td>
									<td>No</td>
									<td>No</td>
									<td>Sí, con cada petición</td>
								</tr>
								<tr>
									<td>Acceso desde JavaScript</td>
									<td>Sí, sencillo</td>
									<td>Sí, sencillo</td>
									<td>Sí, más complejo</td>
								</tr>
								<tr>
									<td>Compatibilidad con navegadores</td>
									<td>IE8+, todos los modernos</td>
									<td>IE8+, todos los modernos</td>
									<td>Todos</td>
								</tr>
								<tr>
									<td>Bloqueado por navegador</td>
									<td>En modo incógnito o configuración</td>
									<td>En modo incógnito o configuración</td>
									<td>Puede ser bloqueado por usuario</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>
						<code>localStorage</code> almacena datos persistentes sin fecha de expiración, incluso si se
						cierra el navegador
					</li>
					<li>
						<code>sessionStorage</code> mantiene datos solo durante la sesión actual, mientras la pestaña
						está abierta
					</li>
					<li>
						Las cookies se pueden configurar con tiempo de expiración y se envían al servidor con cada
						petición HTTP
					</li>
					<li>
						localStorage y sessionStorage solo almacenan strings, hay que usar <code>JSON.stringify()</code>{" "}
						y <code>JSON.parse()</code> para objetos
					</li>
					<li>Las cookies tienen mayor compatibilidad pero menor capacidad (~4KB vs ~5MB)</li>
					<li>Todos estos mecanismos son específicos del dominio (origen) por motivos de seguridad</li>
					<li>
						Las cookies pueden tener atributos adicionales como HttpOnly, Secure y SameSite para mejorar la
						seguridad
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej07_Almacenamiento_Navegador;
