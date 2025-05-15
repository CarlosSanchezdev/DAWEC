/**
 * @fileoverview Ejercicio sobre creación de ventanas y navegación con React Router
 * @ejercicio Ej04_Ventanas_Router
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import React, { useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import "./Ej04_Ventanas_Router.css";

/**
 * @function Ej04_Ventanas_Router
 * @description Componente principal que demuestra la creación de ventanas en JS y navegación con React Router
 * @returns {JSX.Element} Componente de demostración
 */
function Ej04_Ventanas_Router() {
	// Obtenemos la función de navegación
	const navigate = useNavigate();

	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 4: Ventanas y React Router</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra cómo crear y gestionar ventanas en JavaScript tradicional, así como
					implementar navegación entre componentes usando React Router.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.4.1 Gestión de ventanas en JavaScript</h4>
					<p>
						JavaScript permite gestionar diferentes aspectos relacionados con las ventanas, como abrir
						nuevas ventanas al presionar un botón. Cada una de estas ventanas puede tener un tamaño,
						posición y estilo diferente, y suelen tener un contenido dinámico.
					</p>

					<div className="demo-container">
						<h5>Creación de ventanas emergentes</h5>
						<div className="control-panel">
							<button onClick={openBasicWindow}>Abrir ventana simple</button>
							<button onClick={openCustomWindow}>Abrir ventana personalizada</button>
							<button onClick={openModalDialog}>Mostrar diálogo modal</button>
						</div>

						<div className="code-explanation">
							<h5>Código de ejemplo: Gestión de ventanas en JavaScript</h5>
							<pre className="code-snippet">
								{`// Abrir una ventana básica
function openBasicWindow() {
  window.open('https://www.example.com', '_blank');
}

// Abrir una ventana con características personalizadas
function openCustomWindow() {
  window.open(
    'https://www.example.com',
    'customWindow',
    'width=400,height=300,top=100,left=100,menubar=no,toolbar=no,location=no'
  );
}

// Diálogos modales
function showAlert() {
  window.alert('Este es un mensaje de alerta');
}

function getConfirmation() {
  const result = window.confirm('¿Está seguro de que desea continuar?');
  if (result) {
    console.log('El usuario confirmó');
  } else {
    console.log('El usuario canceló');
  }
}

function getUserInput() {
  const name = window.prompt('Por favor, introduzca su nombre:', 'Usuario');
  if (name) {
    console.log('El usuario se llama: ' + name);
  } else {
    console.log('El usuario canceló la entrada');
  }
}`}
							</pre>
							<p>
								<strong>NOTA:</strong> Los navegadores modernos tienen restricciones para prevenir el
								abuso de ventanas emergentes. La mayoría bloquean automáticamente las ventanas no
								solicitadas o que no son activadas por un evento de usuario directo.
							</p>
						</div>
					</div>

					<div className="demo-container">
						<h5>Ejemplos de diálogos nativos</h5>
						<p>Hay 3 métodos del objeto window que permiten mostrar diálogos con el usuario:</p>
						<div className="dialogs-row">
							<div className="dialog-example">
								<h6>alert()</h6>
								<p>Muestra un diálogo con el mensaje indicado y un botón de 'Aceptar'</p>
								<button onClick={() => window.alert("Este es un mensaje de alerta")}>
									Mostrar alert
								</button>
							</div>

							<div className="dialog-example">
								<h6>confirm()</h6>
								<p>Muestra un diálogo con el mensaje y botones 'Aceptar' y 'Cancelar'</p>
								<button onClick={handleConfirm}>Mostrar confirm</button>
							</div>

							<div className="dialog-example">
								<h6>prompt()</h6>
								<p>Diálogo con mensaje, campo de entrada y botones 'Aceptar' y 'Cancelar'</p>
								<button onClick={handlePrompt}>Mostrar prompt</button>
							</div>
						</div>
					</div>

					<div className="demo-container">
						<h5>Comunicación entre ventanas</h5>
						<p>
							Una ventana puede acceder y controlar otras ventanas a través de las referencias obtenidas
							al crearlas. También es posible acceder a la ventana padre desde una ventana hija.
						</p>
						<div className="code-explanation">
							<pre className="code-snippet">
								{`// Abrir ventana y mantener referencia
const newWindow = window.open('child.html', 'childWindow', 'width=500,height=400');

// Comunicarse con la ventana hija
if (newWindow) {
  newWindow.document.write('<h1>Esto es contenido escrito desde la ventana padre</h1>');
  
  // Acceder a variables o funciones de la ventana hija
  const childVariable = newWindow.myVariable;
  
  // Llamar a función en ventana hija
  newWindow.myFunction();
  
  // Cerrar ventana hija
  newWindow.close();
}

// En la ventana hija, acceder a la ventana padre
window.opener.document.body.style.backgroundColor = 'lightblue';`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.4.2 React Router</h4>
					<p>
						React Router es una biblioteca estándar para la navegación en aplicaciones React. Permite
						definir rutas y renderizar componentes específicos cuando la URL coincide con el patrón de ruta.
					</p>

					<div className="demo-container">
						<h5>Ejemplo de Navegación con React Router</h5>
						<div className="router-demo">
							<MiniApp />
						</div>

						<div className="code-explanation">
							<h5>Implementación de React Router</h5>
							<pre className="code-snippet">
								{`// Estructura básica de React Router
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca de</Link>
        <Link to="/products">Productos</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente que usa parámetros de URL
function ProductDetail() {
  const { id } = useParams();
  return <h2>Detalle del producto {id}</h2>;
}`}
							</pre>
							<p>
								<strong>IMPORTANTE:</strong> React Router v6 introdujo cambios significativos en la API
								respecto a versiones anteriores. Por ejemplo, el componente <code>Switch</code> fue
								reemplazado por <code>Routes</code>, y la manera de definir rutas con parámetros cambió.
							</p>
						</div>
					</div>

					<div className="demo-container">
						<h5>Hooks de React Router</h5>
						<div className="hooks-grid">
							<div className="hook-card">
								<h6>useParams</h6>
								<p>Accede a los parámetros de la URL actual.</p>
								<code>const {"{ id }"} = useParams();</code>
							</div>

							<div className="hook-card">
								<h6>useNavigate</h6>
								<p>Permite la navegación programática.</p>
								<code>const navigate = useNavigate();</code>
								<code>navigate('/ruta/nueva');</code>
							</div>

							<div className="hook-card">
								<h6>useLocation</h6>
								<p>Obtiene información sobre la ubicación actual.</p>
								<code>const location = useLocation();</code>
							</div>

							<div className="hook-card">
								<h6>useSearchParams</h6>
								<p>Accede a parámetros de consulta en la URL.</p>
								<code>const [searchParams, setSearchParams] = useSearchParams();</code>
							</div>
						</div>
					</div>

					<div className="demo-container">
						<h5>Navegación con Parámetros</h5>
						<div className="router-demo">
							<h6>Productos:</h6>
							<div className="product-list">
								{[1, 2, 3, 4].map((id) => (
									<div
										key={id}
										className="product-item">
										<span>Producto {id}</span>
										<button
											onClick={() => navigate(`producto/${id}`)}
											className="view-button">
											Ver detalles
										</button>
									</div>
								))}
							</div>

							<div className="product-routes">
								<Routes>
									<Route
										path="producto/:id"
										element={<ProductDetail />}
									/>
								</Routes>
							</div>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.4.3 Entendiendo el Renderizado en React</h4>
					<p>
						Uno de los temas centrales en React es entender cómo y cuándo se renderizan los componentes. La
						memorización (memoization) y las matrices de dependencias son conceptos clave para la
						optimización.
					</p>

					<div className="demo-container">
						<h5>Ejemplo de Re-renderizado</h5>
						<RenderDemo />

						<div className="code-explanation">
							<h5>Optimización de renderizado con React.memo</h5>
							<pre className="code-snippet">
								{`// Componente sin memoization
function RegularComponent({ value }) {
  console.log('RegularComponent renderizado');
  return <div>{value}</div>;
}

// Componente con memoization
const MemoizedComponent = React.memo(function MemoizedComponent({ value }) {
  console.log('MemoizedComponent renderizado');
  return <div>{value}</div>;
});

// Uso en componente padre
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hola');
  
  // Este valor se recrea en cada render
  const regularObject = { key: 'value' };
  
  // Este valor se memoriza
  const memoizedObject = useMemo(() => ({ key: 'value' }), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Incrementar {count}</button>
      <input value={text} onChange={e => setText(e.target.value)} />
      
      {/* Se renderiza en cada cambio del padre */}
      <RegularComponent value={count} object={regularObject} />
      
      {/* Solo se renderiza cuando cambia count */}
      <MemoizedComponent value={count} object={memoizedObject} />
    </div>
  );
}`}
							</pre>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>
						JavaScript puede crear y manipular ventanas emergentes con el método <code>window.open()</code>
					</li>
					<li>
						Los diálogos nativos (<code>alert</code>, <code>confirm</code>, <code>prompt</code>) permiten
						interacción simple con el usuario
					</li>
					<li>React Router permite implementar navegación en aplicaciones React sin recargar la página</li>
					<li>
						Los hooks como <code>useParams</code>, <code>useNavigate</code> y <code>useLocation</code>{" "}
						facilitan la navegación en React Router
					</li>
					<li>
						Las rutas dinámicas con parámetros permiten crear páginas para recursos específicos (ej:{" "}
						<code>/producto/:id</code>)
					</li>
					<li>React.memo y useMemo pueden optimizar el rendimiento evitando renderizados innecesarios</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function openBasicWindow
 * @description Abre una ventana básica
 */
function openBasicWindow() {
	window.open("https://developer.mozilla.org/es/docs/Web/API/Window/open", "_blank");
}

/**
 * @function openCustomWindow
 * @description Abre una ventana personalizada con características específicas
 */
function openCustomWindow() {
	window.open(
		"https://developer.mozilla.org/es/docs/Web/API/Window/open",
		"customWindow",
		"width=600,height=400,top=100,left=100,menubar=no,toolbar=no,location=no,status=yes"
	);
}

/**
 * @function openModalDialog
 * @description Muestra un diálogo modal usando window.alert
 */
function openModalDialog() {
	window.alert("Este es un diálogo modal usando window.alert()");
}

/**
 * @function handleConfirm
 * @description Maneja la interacción con un diálogo de confirmación
 */
function handleConfirm() {
	const result = window.confirm("¿Desea continuar con esta acción?");
	if (result) {
		alert("Has confirmado la acción");
	} else {
		alert("Has cancelado la acción");
	}
}

/**
 * @function handlePrompt
 * @description Maneja la interacción con un diálogo de entrada de texto
 */
function handlePrompt() {
	const name = window.prompt("Por favor, introduce tu nombre:", "Usuario");
	if (name) {
		alert(`Hola, ${name}! Gracias por tu respuesta.`);
	} else {
		alert("Has cancelado la entrada de datos.");
	}
}

/**
 * @function MiniApp
 * @description Mini aplicación de ejemplo que utiliza React Router
 * @returns {JSX.Element} Componente de ejemplo con rutas
 */
function MiniApp() {
	// Usamos useNavigate para obtener la función de navegación
	const navigate = useNavigate();

	// Crear rutas relativas basadas en la ubicación actual
	const goToHome = () => navigate(""); // Ruta relativa a la ubicación actual
	const goToAbout = () => navigate("about");
	const goToContact = () => navigate("contact");

	return (
		<div className="mini-app">
			<nav className="mini-app-nav">
				<button
					onClick={goToHome}
					className="nav-link">
					Inicio
				</button>
				<button
					onClick={goToAbout}
					className="nav-link">
					Acerca de
				</button>
				<button
					onClick={goToContact}
					className="nav-link">
					Contacto
				</button>
			</nav>

			<div className="mini-app-content">
				<Routes>
					<Route
						index
						element={<MiniHome />}
					/>
					<Route
						path="about"
						element={<MiniAbout />}
					/>
					<Route
						path="contact"
						element={<MiniContact />}
					/>
				</Routes>
			</div>
		</div>
	);
}

/**
 * @function MiniHome
 * @description Componente de inicio para la mini aplicación
 * @returns {JSX.Element} Componente de inicio
 */
function MiniHome() {
	return (
		<div className="mini-page">
			<h3>Página de Inicio</h3>
			<p>Bienvenido a nuestra mini aplicación de ejemplo con React Router.</p>
		</div>
	);
}

/**
 * @function MiniAbout
 * @description Componente de "Acerca de" para la mini aplicación
 * @returns {JSX.Element} Componente de about
 */
function MiniAbout() {
	return (
		<div className="mini-page">
			<h3>Acerca de</h3>
			<p>Esta es una demostración simple de React Router para mostrar navegación entre componentes.</p>
		</div>
	);
}

/**
 * @function MiniContact
 * @description Componente de contacto para la mini aplicación
 * @returns {JSX.Element} Componente de contacto
 */
function MiniContact() {
	return (
		<div className="mini-page">
			<h3>Contacto</h3>
			<p>Puedes contactarnos en: ejemplo@correo.com</p>
		</div>
	);
}

/**
 * @function ProductDetail
 * @description Componente que muestra detalles de un producto utilizando parámetros de URL
 * @returns {JSX.Element} Componente de detalle
 */
function ProductDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate("");
	};

	return (
		<div className="product-detail">
			<h3>Detalles del Producto {id}</h3>
			<p>
				Has seleccionado el producto con ID: <strong>{id}</strong>
			</p>
			<p>Esta página muestra cómo se pueden usar parámetros dinámicos en las rutas.</p>
			<button
				onClick={goBack}
				className="back-button">
				Volver
			</button>
		</div>
	);
}

/**
 * @function RenderDemo
 * @description Demostración de renderizado y memoización en React
 * @returns {JSX.Element} Componente de demostración
 */
function RenderDemo() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("");

	// Componente regular sin memoización
	const RegularComponent = ({ value }) => {
		console.log("RegularComponent renderizado");
		return (
			<div className="demo-component">
				<div className="component-header">Componente Regular</div>
				<div className="component-body">Valor: {value}</div>
			</div>
		);
	};

	// Componente con memoización
	const MemoizedComponent = React.memo(({ value }) => {
		console.log("MemoizedComponent renderizado");
		return (
			<div className="demo-component memo">
				<div className="component-header">Componente Memorizado</div>
				<div className="component-body">Valor: {value}</div>
			</div>
		);
	});

	return (
		<div className="render-demo">
			<div className="demo-controls">
				<button onClick={() => setCount(count + 1)}>Contador: {count}</button>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Escribe algo..."
					className="demo-input"
				/>
			</div>

			<div className="components-container">
				<RegularComponent value={count} />
				<MemoizedComponent value={count} />
			</div>

			<div className="render-explanation">
				<p>
					<strong>¿Qué ocurre?</strong> Ambos componentes reciben el mismo prop <code>value</code> con el
					valor del contador. Cuando cambias el contador, ambos componentes se actualizan. Sin embargo, cuando
					escribes en el campo de texto (modificando el estado <code>text</code>):
				</p>
				<ul>
					<li>El componente regular se vuelve a renderizar aunque sus props no cambiaron</li>
					<li>El componente memorizado no se renderiza porque sus props son los mismos</li>
				</ul>
				<p>
					<strong>Resultado:</strong> React.memo evita renderizados innecesarios al memorizar el resultado del
					renderizado y reutilizarlo si las props no han cambiado.
				</p>
				<p>
					<strong>Consejo:</strong> Abre la consola para ver los mensajes de renderizado.
				</p>
			</div>
		</div>
	);
}

export default Ej04_Ventanas_Router;
