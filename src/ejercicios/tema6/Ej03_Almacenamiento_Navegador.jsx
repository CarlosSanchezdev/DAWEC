/**
 * @fileoverview Ejercicio sobre Almacenamiento en el Navegador
 * @ejercicio Ej03_Almacenamiento_Navegador
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ej03_Almacenamiento_Navegador.css";

/**
 * @function Ej03_Almacenamiento_Navegador
 * @description Componente principal que demuestra el uso de mecanismos de almacenamiento del navegador
 * @returns {JSX.Element} Componente de demostración de almacenamiento
 * @example
 *   <Ej03_Almacenamiento_Navegador />
 */
function Ej03_Almacenamiento_Navegador() {
	// ===== HOOKS =====
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
	const [cookieExpiration, setCookieExpiration] = useState("1"); // días
	const [cookies, setCookies] = useState([]);

	// Estado para el tema de preferencia (ejemplo de uso de localStorage)
	const [theme, setTheme] = useState(() => {
		// Recuperar tema guardado o usar "light" por defecto
		return localStorage.getItem("preferredTheme") || "light";
	});

	// Estados para la nota guardada (ejemplo de uso práctico)
	const [note, setNote] = useState(() => {
		return localStorage.getItem("userNote") || "";
	});
	const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => {
		return localStorage.getItem("autoSaveEnabled") === "true";
	});
	const [lastSaved, setLastSaved] = useState(null);

	// ===== EFECTOS =====
	// Cargar datos de localStorage al iniciar
	useEffect(() => {
		updateLocalStorageItems();
	}, []);

	// Cargar datos de sessionStorage al iniciar
	useEffect(() => {
		updateSessionStorageItems();
	}, []);

	// Cargar cookies al iniciar
	useEffect(() => {
		updateCookieItems();
	}, []);

	// Efecto para auto-guardar la nota
	useEffect(() => {
		let timerId;
		if (autoSaveEnabled && note) {
			timerId = setTimeout(() => {
				localStorage.setItem("userNote", note);
				setLastSaved(new Date());
			}, 2000); // Auto-guardar después de 2 segundos de inactividad
		}

		return () => {
			if (timerId) clearTimeout(timerId);
		};
	}, [note, autoSaveEnabled]);

	// Efecto para guardar la preferencia de auto-guardado
	useEffect(() => {
		localStorage.setItem("autoSaveEnabled", autoSaveEnabled.toString());
	}, [autoSaveEnabled]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function updateLocalStorageItems
	 * @description Actualiza la lista de elementos en localStorage
	 */
	const updateLocalStorageItems = () => {
		const items = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			const value = localStorage.getItem(key);
			items.push({ key, value });
		}
		setLocalStorageItems(items);
	};

	/**
	 * @function updateSessionStorageItems
	 * @description Actualiza la lista de elementos en sessionStorage
	 */
	const updateSessionStorageItems = () => {
		const items = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			const value = sessionStorage.getItem(key);
			items.push({ key, value });
		}
		setSessionStorageItems(items);
	};

	/**
	 * @function updateCookieItems
	 * @description Actualiza la lista de cookies
	 */
	const updateCookieItems = () => {
		const cookieArr = document.cookie
			.split(";")
			.map((cookie) => {
				const [name, value] = cookie.trim().split("=");
				return { name, value: decodeURIComponent(value || "") };
			})
			.filter((cookie) => cookie.name); // Filtrar cookies vacías

		setCookies(cookieArr);
	};

	/**
	 * @function handleSaveToLocalStorage
	 * @description Guarda un par clave-valor en localStorage
	 */
	const handleSaveToLocalStorage = () => {
		if (localStorageKey.trim() === "") return;

		localStorage.setItem(localStorageKey, localStorageValue);
		setLocalStorageKey("");
		setLocalStorageValue("");
		updateLocalStorageItems();
	};

	/**
	 * @function handleRemoveFromLocalStorage
	 * @description Elimina un elemento de localStorage
	 * @param {string} key - Clave a eliminar
	 */
	const handleRemoveFromLocalStorage = (key) => {
		localStorage.removeItem(key);
		updateLocalStorageItems();
	};

	/**
	 * @function handleClearLocalStorage
	 * @description Limpia todo el localStorage
	 */
	const handleClearLocalStorage = () => {
		if (window.confirm("¿Estás seguro de que quieres borrar todos los datos de localStorage?")) {
			localStorage.clear();
			updateLocalStorageItems();
		}
	};

	/**
	 * @function handleSaveToSessionStorage
	 * @description Guarda un par clave-valor en sessionStorage
	 */
	const handleSaveToSessionStorage = () => {
		if (sessionStorageKey.trim() === "") return;

		sessionStorage.setItem(sessionStorageKey, sessionStorageValue);
		setSessionStorageKey("");
		setSessionStorageValue("");
		updateSessionStorageItems();
	};

	/**
	 * @function handleRemoveFromSessionStorage
	 * @description Elimina un elemento de sessionStorage
	 * @param {string} key - Clave a eliminar
	 */
	const handleRemoveFromSessionStorage = (key) => {
		sessionStorage.removeItem(key);
		updateSessionStorageItems();
	};

	/**
	 * @function handleClearSessionStorage
	 * @description Limpia todo el sessionStorage
	 */
	const handleClearSessionStorage = () => {
		if (window.confirm("¿Estás seguro de que quieres borrar todos los datos de sessionStorage?")) {
			sessionStorage.clear();
			updateSessionStorageItems();
		}
	};

	/**
	 * @function handleSetCookie
	 * @description Establece una cookie
	 */
	const handleSetCookie = () => {
		if (cookieName.trim() === "") return;

		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + parseInt(cookieExpiration, 10));

		document.cookie = `${cookieName}=${encodeURIComponent(
			cookieValue
		)}; expires=${expirationDate.toUTCString()}; path=/`;

		setCookieName("");
		setCookieValue("");
		updateCookieItems();
	};

	/**
	 * @function handleDeleteCookie
	 * @description Elimina una cookie
	 * @param {string} name - Nombre de la cookie a eliminar
	 */
	const handleDeleteCookie = (name) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		updateCookieItems();
	};

	/**
	 * @function handleThemeChange
	 * @description Cambia el tema y lo guarda en localStorage
	 */
	const handleThemeChange = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("preferredTheme", newTheme);
	};

	/**
	 * @function handleSaveNote
	 * @description Guarda la nota manualmente
	 */
	const handleSaveNote = () => {
		localStorage.setItem("userNote", note);
		setLastSaved(new Date());
	};

	/**
	 * @function handleClearNote
	 * @description Borra la nota
	 */
	const handleClearNote = () => {
		if (window.confirm("¿Estás seguro de que quieres borrar la nota?")) {
			setNote("");
			localStorage.removeItem("userNote");
			setLastSaved(null);
		}
	};

	/**
	 * @function handleAutoSaveToggle
	 * @description Activa/desactiva el auto-guardado
	 */
	const handleAutoSaveToggle = () => {
		setAutoSaveEnabled(!autoSaveEnabled);
	};

	// ===== RENDER =====
	return (
		<div className={`ejercicio-container ${theme === "dark" ? "dark-theme" : ""}`}>
			<div className="ejercicio-header">
				<h3>Ejercicio 3: Almacenamiento en el Navegador</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra los diferentes mecanismos para almacenar datos en el navegador:
					localStorage, sessionStorage y cookies.
				</p>
				<div className="theme-toggle">
					<button
						onClick={handleThemeChange}
						className="theme-button">
						{theme === "light" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
					</button>
					<p className="theme-info">(Tu preferencia se guarda en localStorage)</p>
				</div>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>Ejemplo práctico: Bloc de notas con auto-guardado</h4>
					<div className="note-app">
						<div className="note-controls">
							<label className="auto-save-toggle">
								<input
									type="checkbox"
									checked={autoSaveEnabled}
									onChange={handleAutoSaveToggle}
								/>
								Auto-guardar
							</label>
							<div className="note-buttons">
								<button onClick={handleSaveNote}>Guardar</button>
								<button onClick={handleClearNote}>Borrar</button>
							</div>
						</div>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Escribe tus notas aquí..."
							className="note-textarea"
						/>
						{lastSaved && <p className="last-saved">Último guardado: {lastSaved.toLocaleTimeString()}</p>}
					</div>
				</section>

				<section className="concepto-section">
					<h4>1. LocalStorage</h4>
					<p>
						localStorage permite almacenar datos en el navegador sin fecha de expiración. Los datos
						persisten incluso cuando el navegador se cierra.
					</p>

					<div className="storage-demo">
						<div className="storage-form">
							<div className="form-row">
								<label>
									Clave:
									<input
										type="text"
										value={localStorageKey}
										onChange={(e) => setLocalStorageKey(e.target.value)}
										placeholder="Nombre de la clave"
									/>
								</label>
							</div>
							<div className="form-row">
								<label>
									Valor:
									<input
										type="text"
										value={localStorageValue}
										onChange={(e) => setLocalStorageValue(e.target.value)}
										placeholder="Valor a guardar"
									/>
								</label>
							</div>
							<div className="form-actions">
								<button onClick={handleSaveToLocalStorage}>Guardar</button>
								<button onClick={handleClearLocalStorage}>Borrar todo</button>
							</div>
						</div>

						<div className="storage-items">
							<h5>Elementos guardados:</h5>
							{localStorageItems.length === 0 ? (
								<p className="empty-message">No hay elementos en localStorage</p>
							) : (
								<table className="storage-table">
									<thead>
										<tr>
											<th>Clave</th>
											<th>Valor</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										{localStorageItems.map((item) => (
											<tr key={item.key}>
												<td>{item.key}</td>
												<td className="value-cell">{item.value}</td>
												<td>
													<button
														onClick={() => handleRemoveFromLocalStorage(item.key)}
														className="remove-button">
														Eliminar
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>

						<div className="code-example">
							<pre>
								{`// Guardar datos en localStorage
localStorage.setItem('username', 'estudiante');
localStorage.setItem('theme', 'dark');

// Obtener datos de localStorage
const username = localStorage.getItem('username');
const theme = localStorage.getItem('theme');

// Eliminar un elemento
localStorage.removeItem('username');

// Limpiar todo el localStorage
localStorage.clear();

// Guardar objetos JSON (hay que serializarlos)
const user = { id: 1, name: 'Juan', role: 'admin' };
localStorage.setItem('user', JSON.stringify(user));

// Recuperar objetos JSON
const storedUser = JSON.parse(localStorage.getItem('user'));`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. SessionStorage</h4>
					<p>
						sessionStorage guarda datos solo para la sesión actual. Los datos se eliminan cuando se cierra
						la pestaña o ventana.
					</p>

					<div className="storage-demo">
						<div className="storage-form">
							<div className="form-row">
								<label>
									Clave:
									<input
										type="text"
										value={sessionStorageKey}
										onChange={(e) => setSessionStorageKey(e.target.value)}
										placeholder="Nombre de la clave"
									/>
								</label>
							</div>
							<div className="form-row">
								<label>
									Valor:
									<input
										type="text"
										value={sessionStorageValue}
										onChange={(e) => setSessionStorageValue(e.target.value)}
										placeholder="Valor a guardar"
									/>
								</label>
							</div>
							<div className="form-actions">
								<button onClick={handleSaveToSessionStorage}>Guardar</button>
								<button onClick={handleClearSessionStorage}>Borrar todo</button>
							</div>
						</div>

						<div className="storage-items">
							<h5>Elementos guardados:</h5>
							{sessionStorageItems.length === 0 ? (
								<p className="empty-message">No hay elementos en sessionStorage</p>
							) : (
								<table className="storage-table">
									<thead>
										<tr>
											<th>Clave</th>
											<th>Valor</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										{sessionStorageItems.map((item) => (
											<tr key={item.key}>
												<td>{item.key}</td>
												<td className="value-cell">{item.value}</td>
												<td>
													<button
														onClick={() => handleRemoveFromSessionStorage(item.key)}
														className="remove-button">
														Eliminar
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>

						<div className="code-example">
							<pre>
								{`// sessionStorage funciona igual que localStorage
// pero sus datos expiran al cerrar la ventana o pestaña

// Guardar datos en sessionStorage
sessionStorage.setItem('sessionId', 'abc123');
sessionStorage.setItem('lastPage', '/perfil');

// Obtener datos
const sessionId = sessionStorage.getItem('sessionId');

// Eliminar un elemento
sessionStorage.removeItem('lastPage');

// Limpiar todo el sessionStorage
sessionStorage.clear();`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. Cookies</h4>
					<p>
						Las cookies son pequeños archivos de texto que se guardan en el navegador del usuario. Se pueden
						establecer con fecha de expiración y se envían al servidor con cada petición.
					</p>

					<div className="storage-demo">
						<div className="storage-form">
							<div className="form-row">
								<label>
									Nombre:
									<input
										type="text"
										value={cookieName}
										onChange={(e) => setCookieName(e.target.value)}
										placeholder="Nombre de la cookie"
									/>
								</label>
							</div>
							<div className="form-row">
								<label>
									Valor:
									<input
										type="text"
										value={cookieValue}
										onChange={(e) => setCookieValue(e.target.value)}
										placeholder="Valor de la cookie"
									/>
								</label>
							</div>
							<div className="form-row">
								<label>
									Expiración (días):
									<input
										type="number"
										min="1"
										value={cookieExpiration}
										onChange={(e) => setCookieExpiration(e.target.value)}
									/>
								</label>
							</div>
							<div className="form-actions">
								<button onClick={handleSetCookie}>Guardar Cookie</button>
							</div>
						</div>

						<div className="storage-items">
							<h5>Cookies guardadas:</h5>
							{cookies.length === 0 ? (
								<p className="empty-message">No hay cookies guardadas</p>
							) : (
								<table className="storage-table">
									<thead>
										<tr>
											<th>Nombre</th>
											<th>Valor</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										{cookies.map((cookie, index) => (
											<tr key={index}>
												<td>{cookie.name}</td>
												<td className="value-cell">{cookie.value}</td>
												<td>
													<button
														onClick={() => handleDeleteCookie(cookie.name)}
														className="remove-button">
														Eliminar
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>

						<div className="code-example">
							<pre>
								{`// Crear una cookie que expira en 7 días
document.cookie = "username=estudiante; expires=" + 
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() + 
  "; path=/";

// Crear una cookie de sesión (expira al cerrar el navegador)
document.cookie = "sessionCookie=abc123; path=/";

// Leer todas las cookies
const allCookies = document.cookie;  // Devuelve string con todas las cookies

// Función para obtener una cookie específica
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Borrar una cookie (estableciendo fecha de expiración en el pasado)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>Comparación de mecanismos de almacenamiento</h4>
					<div className="comparison-table-container">
						<table className="comparison-table">
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
									<td>Persistencia</td>
									<td>Permanente (hasta que se borre)</td>
									<td>Sesión actual (se borra al cerrar la pestaña)</td>
									<td>Configurable (puede expirar)</td>
								</tr>
								<tr>
									<td>Capacidad</td>
									<td>~5MB</td>
									<td>~5MB</td>
									<td>~4KB</td>
								</tr>
								<tr>
									<td>Envío al servidor</td>
									<td>No</td>
									<td>No</td>
									<td>Sí, con cada petición HTTP</td>
								</tr>
								<tr>
									<td>Accesibilidad</td>
									<td>Cualquier ventana/pestaña (mismo origen)</td>
									<td>Solo la pestaña actual</td>
									<td>Cualquier ventana/pestaña (mismo origen)</td>
								</tr>
								<tr>
									<td>Expiración</td>
									<td>No expira</td>
									<td>Al cerrar la pestaña</td>
									<td>Configurable</td>
								</tr>
								<tr>
									<td>API</td>
									<td>Simple (getItem, setItem, etc.)</td>
									<td>Simple (getItem, setItem, etc.)</td>
									<td>Complicada (string con todas las cookies)</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>localStorage mantiene los datos de forma permanente hasta que se borren explícitamente</li>
					<li>
						sessionStorage mantiene los datos solo durante la sesión actual (se borran al cerrar la pestaña)
					</li>
					<li>
						Las cookies pueden configurarse con fecha de expiración y se envían al servidor con cada
						petición
					</li>
					<li>Para guardar objetos en localStorage/sessionStorage, hay que usar JSON.stringify() primero</li>
					<li>Para recuperar objetos, usar JSON.parse() en el valor obtenido</li>
					<li>Las cookies tienen un límite de tamaño de aproximadamente 4KB</li>
					<li>localStorage y sessionStorage tienen un límite de aproximadamente 5MB</li>
					<li>Todos estos mecanismos son específicos por dominio (mismo origen)</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03_Almacenamiento_Navegador;
