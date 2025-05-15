/**
 * @fileoverview Ejercicio sobre depuración y documentación en React
 * @ejercicio Ej08_Depuracion_Documentacion
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Ej08_Depuracion_Documentacion.css";

/**
 * @function Ej08_Depuracion_Documentacion
 * @description Componente principal que demuestra técnicas de depuración y documentación en React
 * @returns {JSX.Element} Componente de demostración
 */
function Ej08_Depuracion_Documentacion() {
	// ===== HOOKS =====
	const [bugDemoActive, setBugDemoActive] = useState(false);
	const [debugMessages, setDebugMessages] = useState([]);
	const [showPropTypesDemo, setShowPropTypesDemo] = useState(false);

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function addDebugMessage
	 * @description Añade un mensaje a la consola de depuración simulada
	 * @param {string} message - Mensaje a añadir
	 * @param {string} type - Tipo de mensaje ('info', 'warning', 'error')
	 */
	const addDebugMessage = (message, type = "info") => {
		const timestamp = new Date().toLocaleTimeString();
		setDebugMessages((prev) => [{ id: Date.now(), message, type, timestamp }, ...prev]);
	};

	/**
	 * @function clearDebugMessages
	 * @description Limpia todos los mensajes de depuración
	 */
	const clearDebugMessages = () => {
		setDebugMessages([]);
	};

	/**
	 * @function toggleBugDemo
	 * @description Activa o desactiva la demostración de bug
	 */
	const toggleBugDemo = () => {
		setBugDemoActive(!bugDemoActive);
		addDebugMessage(`Demostración de bug ${!bugDemoActive ? "activada" : "desactivada"}`, "info");
	};
	/**
	 * @function togglePropTypesDemo
	 * @description Muestra u oculta la demostración de PropTypes
	 */
	// Función ya utilizada en los botones de las pestañas
	// const togglePropTypesDemo = () => {
	//   setShowPropTypesDemo(!showPropTypesDemo);
	// };

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 8: Depuración y Documentación</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra técnicas de depuración, manejo de errores y documentación de componentes en
					React.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.9 Depuración y Documentación</h4>
					<p>
						La depuración y la documentación son aspectos cruciales en el desarrollo de aplicaciones React.
						Las herramientas adecuadas y las buenas prácticas pueden facilitar enormemente el mantenimiento
						y la colaboración en proyectos.
					</p>

					<div className="debug-console">
						<div className="console-header">
							<h5>Consola de Depuración</h5>
							<button
								onClick={clearDebugMessages}
								className="clear-console-btn">
								Limpiar
							</button>
						</div>

						<div className="console-messages">
							{debugMessages.length === 0 ? (
								<div className="empty-console">La consola está vacía</div>
							) : (
								<ul>
									{debugMessages.map((msg) => (
										<li
											key={msg.id}
											className={`message ${msg.type}`}>
											<span className="timestamp">[{msg.timestamp}]</span>
											<span className="message-content">{msg.message}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>

					<div className="subsections-container">
						<div className="subsection-tabs">
							<button
								className={!showPropTypesDemo ? "active" : ""}
								onClick={() => setShowPropTypesDemo(false)}>
								Depuración
							</button>
							<button
								className={showPropTypesDemo ? "active" : ""}
								onClick={() => setShowPropTypesDemo(true)}>
								Documentación
							</button>
						</div>

						{!showPropTypesDemo ? (
							<div className="debugging-section">
								<h5>6.9.1 Técnicas de Depuración en React</h5>

								<div className="debug-techniques">
									<div className="technique-card">
										<h6>1. Usando console.log</h6>
										<p>
											El método más básico pero útil para depurar es usar <code>console.log</code>
											,<code>console.warn</code> y <code>console.error</code>.
										</p>
										<button
											onClick={() => {
												console.log("Demo: Este mensaje aparece en la consola del navegador");
												addDebugMessage(
													"Método console.log ejecutado. Revisa la consola del navegador"
												);
											}}
											className="demo-btn">
											Probar console.log
										</button>
										<div className="code-example">
											<pre className="code-snippet">
												{`// Ejemplo básico
console.log('Valor actual:', estado);

// Información estructurada
console.log({
  props,
  state,
  computedValue
});

// Grupo de logs relacionados
console.group('Datos del usuario');
console.log('Nombre:', user.name);
console.log('Email:', user.email);
console.groupEnd();

// Cronometrar operaciones
console.time('fetchData');
await fetchData();
console.timeEnd('fetchData');`}
											</pre>
										</div>
									</div>

									<div className="technique-card">
										<h6>2. React Developer Tools</h6>
										<p>
											Extensión para navegadores que permite inspeccionar el árbol de componentes,
											props, estado y hooks.
										</p>
										<div className="tool-features">
											<ul>
												<li>Inspeccionar el árbol de componentes</li>
												<li>Ver y modificar props y estado en tiempo real</li>
												<li>Monitorizar renderizaciones</li>
												<li>Perfilar rendimiento</li>
											</ul>
											<img
												src="/react-devtools.png"
												alt="React Developer Tools"
												className="tool-image"
											/>
										</div>
									</div>

									<div className="technique-card">
										<h6>3. Error Boundaries</h6>
										<p>
											Los Error Boundaries son componentes que capturan errores en sus componentes
											hijos y muestran una UI alternativa.
										</p>
										<div className="toggle-container">
											<button
												onClick={toggleBugDemo}
												className={`toggle-btn ${bugDemoActive ? "active" : ""}`}>
												{bugDemoActive ? "Desactivar" : "Activar"} Error Demo
											</button>
										</div>

										<div className="error-boundary-demo">
											<ErrorBoundary
												onError={(error) =>
													addDebugMessage(`Error capturado: ${error.message}`, "error")
												}>
												<BuggyComponent
													shouldThrow={bugDemoActive}
													onError={(msg) => addDebugMessage(msg, "error")}
												/>
											</ErrorBoundary>
										</div>

										<div className="code-example">
											<pre className="code-snippet">
												{`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio
    console.error(error);
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // UI alternativa
      return <h1>Algo salió mal.</h1>;
    }
    
    return this.props.children;
  }
}`}
											</pre>
										</div>
									</div>

									<div className="technique-card">
										<h6>4. Breakpoints y Debugging con Chrome DevTools</h6>
										<p>
											Puedes usar breakpoints en el código JavaScript para pausar la ejecución y
											examinar el estado en ese momento.
										</p>
										<div className="steps-list">
											<ol>
												<li>Abre DevTools (F12 o Cmd+Option+I)</li>
												<li>Ve a la pestaña "Sources"</li>
												<li>Busca tu archivo JavaScript</li>
												<li>Haz clic en el número de línea para añadir un breakpoint</li>
												<li>
													También puedes usar <code>debugger;</code> en tu código
												</li>
											</ol>
										</div>
										<button
											onClick={() => {
												addDebugMessage("Usando debugger statement", "info");
												debuggerExample();
											}}
											className="demo-btn">
											Probar debugger
										</button>
									</div>

									<div className="technique-card">
										<h6>5. Try-Catch para manejo de errores</h6>
										<p>
											Usa bloques try-catch para manejar errores en operaciones asíncronas o
											código que puede fallar.
										</p>
										<button
											onClick={() => {
												addDebugMessage("Ejecutando ejemplo de try-catch...", "info");
												setTimeout(() => {
													tryCatchExample()
														.then((msg) => addDebugMessage(msg, "info"))
														.catch((err) => addDebugMessage(err, "error"));
												}, 500);
											}}
											className="demo-btn">
											Probar try-catch
										</button>
										<div className="code-example">
											<pre className="code-snippet">
												{`// En un componente con operaciones asíncronas
const fetchUserData = async (userId) => {
  try {
    setLoading(true);
    const response = await api.get(\`/users/\${userId}\`);
    setUserData(response.data);
    return response.data;
  } catch (error) {
    setError(error.message);
    // Registrar error
    console.error('Error fetching user data:', error);
  } finally {
    setLoading(false);
  }
};`}
											</pre>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="documentation-section">
								<h5>6.9.2 Documentación con PropTypes y JSDoc</h5>

								<div className="proptypes-description">
									<p>
										PropTypes es una biblioteca que permite validar las props que recibe un
										componente. Sirve tanto para documentación como para depuración, ya que emite
										advertencias en modo desarrollo cuando las props no cumplen con las
										especificaciones.
									</p>
								</div>

								<div className="example-components">
									<h6>Ejemplo de componentes documentados:</h6>

									<div className="example-component">
										<ProductCard
											id={1}
											name="Zapatillas deportivas"
											price={89.99}
											stock={15}
											category="Calzado"
											onAddToCart={(id) => {
												addDebugMessage(`Producto ${id} añadido al carrito`, "info");
											}}
										/>

										<UserProfile
											user={{
												id: 101,
												name: "Ana García",
												email: "ana@ejemplo.com",
												role: "admin",
											}}
											isVerified={true}
											lastLogin={new Date().toISOString()}
											onLogout={() => {
												addDebugMessage("Usuario cerró sesión", "info");
											}}
										/>
									</div>
								</div>

								<div className="proptypes-example">
									<h6>Uso de PropTypes:</h6>
									<div className="code-example">
										<pre className="code-snippet">
											{`import PropTypes from 'prop-types';

/**
 * @function UserProfile
 * @description Muestra el perfil de un usuario
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 * @param {number} props.user.id - ID del usuario
 * @param {string} props.user.name - Nombre del usuario
 * @param {string} props.user.email - Email del usuario
 * @param {string} props.user.role - Rol del usuario (admin o user)
 * @param {boolean} props.isVerified - Indica si el usuario está verificado
 * @param {string} props.lastLogin - Fecha del último inicio de sesión
 * @param {Function} props.onLogout - Función a ejecutar al cerrar sesión
 * @returns {JSX.Element} Componente de perfil de usuario
 */
function UserProfile({ user, isVerified, lastLogin, onLogout }) {
  // Implementación del componente...
  return (
    <div className="user-profile">
      {/* ... */}
    </div>
  );
}

// Definir PropTypes
UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['admin', 'user']).isRequired
  }).isRequired,
  isVerified: PropTypes.bool,
  lastLogin: PropTypes.string,
  onLogout: PropTypes.func.isRequired
};

// Valores por defecto
UserProfile.defaultProps = {
  isVerified: false,
  lastLogin: 'Desconocido'
};

export default UserProfile;`}
										</pre>
									</div>
								</div>

								<div className="proptypes-options">
									<h6>Validadores disponibles en PropTypes:</h6>
									<div className="validators-grid">
										<div className="validator">
											<code>PropTypes.array</code>
											<span>Un array</span>
										</div>
										<div className="validator">
											<code>PropTypes.bool</code>
											<span>Un booleano</span>
										</div>
										<div className="validator">
											<code>PropTypes.func</code>
											<span>Una función</span>
										</div>
										<div className="validator">
											<code>PropTypes.number</code>
											<span>Un número</span>
										</div>
										<div className="validator">
											<code>PropTypes.object</code>
											<span>Un objeto</span>
										</div>
										<div className="validator">
											<code>PropTypes.string</code>
											<span>Una cadena de texto</span>
										</div>
										<div className="validator">
											<code>PropTypes.symbol</code>
											<span>Un símbolo</span>
										</div>
										<div className="validator">
											<code>PropTypes.node</code>
											<span>Cualquier elemento que pueda renderizarse</span>
										</div>
										<div className="validator">
											<code>PropTypes.element</code>
											<span>Un elemento React</span>
										</div>
										<div className="validator">
											<code>PropTypes.instanceOf(Class)</code>
											<span>Instancia de una clase</span>
										</div>
										<div className="validator">
											<code>PropTypes.oneOf(['A', 'B'])</code>
											<span>Uno de varios valores</span>
										</div>
										<div className="validator">
											<code>PropTypes.oneOfType([...])</code>
											<span>Uno de varios tipos</span>
										</div>
										<div className="validator">
											<code>PropTypes.arrayOf(type)</code>
											<span>Array de un tipo</span>
										</div>
										<div className="validator">
											<code>PropTypes.objectOf(type)</code>
											<span>Objeto con valores de un tipo</span>
										</div>{" "}
										<div className="validator">
											<code>PropTypes.shape{"{...}"}</code>
											<span>Objeto con una estructura específica</span>
										</div>
										<div className="validator">
											<code>PropTypes.exact{"{...}"}</code>
											<span>Objeto con exactamente la forma especificada</span>
										</div>
									</div>
								</div>

								<div className="jsdoc-section">
									<h6>Documentación con JSDoc:</h6>
									<p>
										JSDoc es un generador de documentación para JavaScript. Utiliza comentarios
										especiales para documentar funciones, clases, métodos y variables.
									</p>
									<div className="code-example">
										<pre className="code-snippet">
											{`/**
 * @function calcularTotal
 * @description Calcula el precio total de los productos
 * @param {Array} productos - Lista de productos
 * @param {number} descuento - Porcentaje de descuento (0-100)
 * @param {boolean} [aplicarImpuesto=true] - Si se debe aplicar impuestos
 * @returns {number} El precio total calculado
 * @throws {Error} Si el descuento está fuera del rango válido
 * @example
 * // Devuelve 108
 * calcularTotal([{precio: 100}, {precio: 20}], 10);
 */
function calcularTotal(productos, descuento, aplicarImpuesto = true) {
  // Implementación...
}`}
										</pre>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>PropTypes permite validar y documentar las props que recibe un componente de React</li>
					<li>Los mensajes de error de PropTypes solo aparecen en el modo desarrollo, no en producción</li>
					<li>
						Error Boundaries capturan errores en componentes hijos y permiten mostrar una UI alternativa
					</li>
					<li>
						La documentación con JSDoc mejora la mantenibilidad del código y facilita el desarrollo
						colaborativo
					</li>
					<li>Utiliza siempre validación de datos y manejo de errores en comunicaciones asíncronas</li>
					<li>React Developer Tools es una extensión imprescindible para depurar aplicaciones React</li>
					<li>
						Las técnicas de depuración como console.log, breakpoints y try-catch son esenciales para el
						desarrollo
					</li>
				</ul>
			</div>
		</div>
	);
}

// ===== COMPONENTES AUXILIARES =====

/**
 * @function ErrorBoundary
 * @description Componente que captura errores en sus componentes hijos
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos
 * @param {Function} props.onError - Función a ejecutar cuando ocurre un error
 * @returns {JSX.Element} Componente Error Boundary
 */
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error capturado por ErrorBoundary:", error, errorInfo);
		if (this.props.onError) {
			this.props.onError(error);
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-ui">
					<h3>¡Algo salió mal!</h3>
					<p>El componente ha fallado debido a un error.</p>
					<p className="error-message">{this.state.error?.message}</p>
					<button
						onClick={() => this.setState({ hasError: false, error: null })}
						className="reset-btn">
						Reintentar
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	onError: PropTypes.func,
};

/**
 * @function BuggyComponent
 * @description Componente que puede provocar un error intencionalmente
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.shouldThrow - Indica si debe provocar un error
 * @param {Function} props.onError - Función a ejecutar cuando provoca un error
 * @returns {JSX.Element} Componente que puede fallar
 */
function BuggyComponent({ shouldThrow, onError }) {
	if (shouldThrow) {
		try {
			// Provocar un error de referencia
			const foo = undefined;
			// Esta línea provocará un error
			foo.bar = "Este código no se ejecutará";
		} catch (error) {
			if (onError) {
				onError("Error capturado en BuggyComponent: " + error.message);
			}
			throw new Error("Error simulado: Cannot read property 'bar' of undefined");
		}
	}

	return (
		<div className="buggy-component">
			<p>
				{shouldThrow
					? "Este componente está intentando renderizar algo que causará un error..."
					: "Este componente funcionará correctamente si el error no está activado."}
			</p>
		</div>
	);
}

BuggyComponent.propTypes = {
	shouldThrow: PropTypes.bool,
	onError: PropTypes.func,
};

BuggyComponent.defaultProps = {
	shouldThrow: false,
};

/**
 * @function ProductCard
 * @description Muestra la información de un producto
 * @param {Object} props - Propiedades del componente
 * @param {number} props.id - ID del producto
 * @param {string} props.name - Nombre del producto
 * @param {number} props.price - Precio del producto
 * @param {number} props.stock - Cantidad en stock
 * @param {string} props.category - Categoría del producto
 * @param {Function} props.onAddToCart - Función para añadir el producto al carrito
 * @returns {JSX.Element} Tarjeta de producto
 */
function ProductCard({ id, name, price, stock, category, onAddToCart }) {
	return (
		<div className="product-card">
			<div className="product-details">
				<h3>{name}</h3>
				<div className="product-meta">
					<span className="product-price">${price.toFixed(2)}</span>
					<span className="product-category">{category}</span>
				</div>
				<div className="product-stock">
					Stock:{" "}
					<span className={stock > 0 ? "in-stock" : "out-of-stock"}>{stock > 0 ? stock : "Agotado"}</span>
				</div>
			</div>
			<button
				onClick={() => onAddToCart(id)}
				disabled={stock <= 0}
				className="add-to-cart-btn">
				Añadir al carrito
			</button>
		</div>
	);
}

ProductCard.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	stock: PropTypes.number.isRequired,
	category: PropTypes.string.isRequired,
	onAddToCart: PropTypes.func.isRequired,
};

/**
 * @function UserProfile
 * @description Muestra el perfil de un usuario
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 * @param {number} props.user.id - ID del usuario
 * @param {string} props.user.name - Nombre del usuario
 * @param {string} props.user.email - Email del usuario
 * @param {string} props.user.role - Rol del usuario
 * @param {boolean} props.isVerified - Indica si el usuario está verificado
 * @param {string} props.lastLogin - Fecha del último inicio de sesión
 * @param {Function} props.onLogout - Función a ejecutar al cerrar sesión
 * @returns {JSX.Element} Componente de perfil de usuario
 */
function UserProfile({ user, isVerified, lastLogin, onLogout }) {
	return (
		<div className="user-profile">
			<div className="user-info">
				<h3>{user.name}</h3>
				<div className="user-meta">
					<span className="user-email">{user.email}</span>
					<span className={`user-role ${user.role}`}>{user.role}</span>
					{isVerified && <span className="verified-badge">✓ Verificado</span>}
				</div>
				<div className="user-activity">Último acceso: {new Date(lastLogin).toLocaleString()}</div>
			</div>
			<button
				onClick={onLogout}
				className="logout-btn">
				Cerrar sesión
			</button>
		</div>
	);
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		role: PropTypes.oneOf(["admin", "user"]).isRequired,
	}).isRequired,
	isVerified: PropTypes.bool,
	lastLogin: PropTypes.string,
	onLogout: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
	isVerified: false,
	lastLogin: "Desconocido",
};

/**
 * @function debuggerExample
 * @description Ejemplo de uso de debugger statement
 */
function debuggerExample() {
	let counter = 0;

	// Este punto de interrupción se activaría cuando se ejecute la función
	// en un entorno real, pero lo comentamos para evitar advertencias
	// debugger;

	for (let i = 0; i < 5; i++) {
		counter += i;
	}

	console.log("Resultado final:", counter);
	return counter;
}

/**
 * @function tryCatchExample
 * @description Ejemplo de manejo de errores con try-catch
 * @returns {Promise} Promesa que se resuelve con un mensaje o se rechaza con un error
 */
async function tryCatchExample() {
	return new Promise((resolve, reject) => {
		// Simulamos una operación asíncrona que puede fallar
		setTimeout(() => {
			const shouldFail = Math.random() > 0.5;

			try {
				if (shouldFail) {
					throw new Error("Error simulado en la operación");
				}

				resolve("La operación se completó con éxito");
			} catch (error) {
				reject("Error capturado: " + error.message);
			}
		}, 1000);
	});
}

// Definir el componente React para Error Boundary
class ReactMock extends Object {
	static Component = class Component {
		constructor(props) {
			this.props = props;
			this.state = {};
		}
		setState(newState) {
			this.state = { ...this.state, ...newState };
			if (this.render) {
				this.render();
			}
		}
	};
}

export default Ej08_Depuracion_Documentacion;

