/**
 * @fileoverview Ejercicio sobre Renderizado Condicional en React
 * @ejercicio Ej04_Renderizado_Condicional
 * @tema Tema 5: Bibliotecas y Frameworks - React
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej04_Renderizado_Condicional.css";

/**
 * @function Ej04_Renderizado_Condicional
 * @description Componente principal que demuestra técnicas de renderizado condicional
 * @returns {JSX.Element} Componente de demostración de renderizado condicional
 * @example
 *   <Ej04_Renderizado_Condicional />
 */
function Ej04_Renderizado_Condicional() {
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 4: Renderizado Condicional</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra diferentes técnicas para realizar renderizado condicional en React,
					permitiendo mostrar diferentes componentes o elementos según condiciones específicas.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Operador Ternario</h4>
					<p>
						Podemos usar el operador ternario para elegir entre dos elementos diferentes basándonos en una
						condición.
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function OperadorTernario() {
  const [estaLogueado, setEstaLogueado] = useState(false);

  return (
    <div>
      <h5>Estado: {estaLogueado ? 'Logueado' : 'No logueado'}</h5>
      <button onClick={() => setEstaLogueado(!estaLogueado)}>
        {estaLogueado ? 'Cerrar sesión' : 'Iniciar sesión'}
      </button>
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<OperadorTernario />
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. Operador && (AND)</h4>
					<p>
						Podemos usar el operador && para mostrar un elemento solo si la condición es verdadera. Si la
						condición es falsa, no se renderiza nada.
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function OperadorAnd() {
  const [tienesMensajes, setTienesMensajes] = useState(false);

  return (
    <div>
      <h5>Bandeja de entrada</h5>
      <button onClick={() => setTienesMensajes(!tienesMensajes)}>
        {tienesMensajes ? 'Limpiar mensajes' : 'Recibir mensajes'}
      </button>
      
      {tienesMensajes && (
        <div className="mensaje-alerta">
          ¡Tienes mensajes nuevos!
        </div>
      )}
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<OperadorAnd />
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. Variables para Almacenar Elementos JSX</h4>
					<p>Podemos usar variables para almacenar elementos JSX y luego utilizarlos en el return.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function VariableCondicional() {
  const [estadoPedido, setEstadoPedido] = useState('pendiente');

  // Variable para almacenar el elemento JSX
  let estadoElement;

  if (estadoPedido === 'pendiente') {
    estadoElement = <span className="estado pendiente">Pendiente</span>;
  } else if (estadoPedido === 'enviado') {
    estadoElement = <span className="estado enviado">Enviado</span>;
  } else if (estadoPedido === 'entregado') {
    estadoElement = <span className="estado entregado">Entregado</span>;
  }

  return (
    <div>
      <h5>Estado del pedido: {estadoElement}</h5>
      <div>
        <button onClick={() => setEstadoPedido('pendiente')}>Pendiente</button>
        <button onClick={() => setEstadoPedido('enviado')}>Enviado</button>
        <button onClick={() => setEstadoPedido('entregado')}>Entregado</button>
      </div>
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<VariableCondicional />
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Componentes Condicionales</h4>
					<p>Podemos crear componentes separados y renderizarlos condicionalmente.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Componentes separados
function Login() {
  return <div className="login-form">Formulario de login</div>;
}

function Dashboard() {
  return <div className="dashboard">Panel de control de usuario</div>;
}

function ComponentesCondicionales() {
  const [autenticado, setAutenticado] = useState(false);

  return (
    <div>
      <h5>Sistema de Usuario</h5>
      <button onClick={() => setAutenticado(!autenticado)}>
        {autenticado ? 'Cerrar Sesión' : 'Iniciar Sesión'}
      </button>
      
      {autenticado ? <Dashboard /> : <Login />}
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<ComponentesCondicionales />
					</div>
				</section>

				<section className="concepto-section">
					<h4>5. IIFE (Expresión de Función Inmediatamente Invocada)</h4>
					<p>
						Para lógica condicional más compleja, podemos usar una IIFE para ejecutar código JavaScript
						arbitrario y retornar JSX.
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function RenderizadoIIFE() {
  const [puntuacion, setPuntuacion] = useState(0);

  return (
    <div>
      <h5>Puntuación: {puntuacion}</h5>
      <button onClick={() => setPuntuacion(puntuacion + 10)}>+10</button>
      <button onClick={() => setPuntuacion(puntuacion - 5)}>-5</button>
      <button onClick={() => setPuntuacion(0)}>Reset</button>
      
      {/* IIFE para lógica condicional compleja */}
      {(() => {
        if (puntuacion <= 0) {
          return <div className="nivel principiante">Nivel: Principiante</div>;
        } else if (puntuacion > 0 && puntuacion < 50) {
          return <div className="nivel intermedio">Nivel: Intermedio</div>;
        } else {
          return <div className="nivel experto">Nivel: Experto</div>;
        }
      })()}
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<RenderizadoIIFE />
					</div>
				</section>

				<section className="concepto-section">
					<h4>6. Renderizado de Listas Condicionalmente</h4>
					<p>Podemos combinar el renderizado condicional con la renderización de listas.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function ListaCondicional() {
  const [mostrarCompletados, setMostrarCompletados] = useState(true);
  
  const tareas = [
    { id: 1, texto: 'Aprender React', completada: true },
    { id: 2, texto: 'Estudiar hooks', completada: false },
    { id: 3, texto: 'Practicar JSX', completada: true },
    { id: 4, texto: 'Crear componentes', completada: false }
  ];

  // Filtrar las tareas según el estado del toggle
  const tareasFiltradas = mostrarCompletados 
    ? tareas 
    : tareas.filter(tarea => !tarea.completada);

  return (
    <div>
      <h5>Lista de Tareas</h5>
      <label>
        <input 
          type="checkbox" 
          checked={mostrarCompletados}
          onChange={() => setMostrarCompletados(!mostrarCompletados)}
        />
        Mostrar tareas completadas
      </label>
      
      <ul className="lista-tareas">
        {tareasFiltradas.map(tarea => (
          <li 
            key={tarea.id}
            className={tarea.completada ? 'completada' : ''}
          >
            {tarea.texto}
            {tarea.completada && ' ✓'}
          </li>
        ))}
      </ul>
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<ListaCondicional />
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>El renderizado condicional permite mostrar diferentes componentes según las condiciones</li>
					<li>
						El operador ternario (<code>condicion ? verdadero : falso</code>) es útil para elegir entre dos
						opciones
					</li>
					<li>El operador && es útil cuando solo necesitas mostrar algo si la condición es verdadera</li>
					<li>Puedes almacenar elementos JSX en variables y usarlos en el return</li>
					<li>Para lógica más compleja, puedes usar IIFEs o extraer la lógica a componentes separados</li>
					<li>
						Recuerda que en JSX, <code>false</code>, <code>null</code>, <code>undefined</code>, y{" "}
						<code>true</code> no generan salida visible
					</li>
					<li>Evita patrones complicados que dificulten la lectura del código</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function OperadorTernario
 * @description Demuestra el uso del operador ternario para renderizado condicional
 * @returns {JSX.Element} Componente de demostración
 */
function OperadorTernario() {
	const [estaLogueado, setEstaLogueado] = useState(false);

	return (
		<div className="demo-operador-ternario">
			<h5 className="estado-usuario">Estado: {estaLogueado ? "Logueado" : "No logueado"}</h5>
			<button onClick={() => setEstaLogueado(!estaLogueado)}>
				{estaLogueado ? "Cerrar sesión" : "Iniciar sesión"}
			</button>
		</div>
	);
}

/**
 * @function OperadorAnd
 * @description Demuestra el uso del operador && para renderizado condicional
 * @returns {JSX.Element} Componente de demostración
 */
function OperadorAnd() {
	const [tienesMensajes, setTienesMensajes] = useState(false);

	return (
		<div className="demo-operador-and">
			<h5>Bandeja de entrada</h5>
			<button onClick={() => setTienesMensajes(!tienesMensajes)}>
				{tienesMensajes ? "Limpiar mensajes" : "Recibir mensajes"}
			</button>

			{tienesMensajes && <div className="mensaje-alerta">¡Tienes mensajes nuevos!</div>}
		</div>
	);
}

/**
 * @function VariableCondicional
 * @description Demuestra el uso de variables para almacenar elementos JSX condicionales
 * @returns {JSX.Element} Componente de demostración
 */
function VariableCondicional() {
	const [estadoPedido, setEstadoPedido] = useState("pendiente");

	// Variable para almacenar el elemento JSX
	let estadoElement;

	if (estadoPedido === "pendiente") {
		estadoElement = <span className="estado pendiente">Pendiente</span>;
	} else if (estadoPedido === "enviado") {
		estadoElement = <span className="estado enviado">Enviado</span>;
	} else if (estadoPedido === "entregado") {
		estadoElement = <span className="estado entregado">Entregado</span>;
	}

	return (
		<div className="demo-variable-condicional">
			<h5>Estado del pedido: {estadoElement}</h5>
			<div className="botones-estado">
				<button onClick={() => setEstadoPedido("pendiente")}>Pendiente</button>
				<button onClick={() => setEstadoPedido("enviado")}>Enviado</button>
				<button onClick={() => setEstadoPedido("entregado")}>Entregado</button>
			</div>
		</div>
	);
}

/**
 * @function ComponentesCondicionales
 * @description Demuestra el uso de componentes separados para renderizado condicional
 * @returns {JSX.Element} Componente de demostración
 */
function ComponentesCondicionales() {
	const [autenticado, setAutenticado] = useState(false);

	return (
		<div className="demo-componentes-condicionales">
			<h5>Sistema de Usuario</h5>
			<button onClick={() => setAutenticado(!autenticado)}>
				{autenticado ? "Cerrar Sesión" : "Iniciar Sesión"}
			</button>

			{autenticado ? <Dashboard /> : <Login />}
		</div>
	);
}

/**
 * @function Login
 * @description Componente de formulario de login
 * @returns {JSX.Element} Componente de login
 */
function Login() {
	return <div className="login-form">Formulario de login</div>;
}

/**
 * @function Dashboard
 * @description Componente de panel de control
 * @returns {JSX.Element} Componente de dashboard
 */
function Dashboard() {
	return <div className="dashboard">Panel de control de usuario</div>;
}

/**
 * @function RenderizadoIIFE
 * @description Demuestra el uso de IIFE para lógica condicional compleja
 * @returns {JSX.Element} Componente de demostración
 */
function RenderizadoIIFE() {
	const [puntuacion, setPuntuacion] = useState(0);

	return (
		<div className="demo-iife">
			<h5>Puntuación: {puntuacion}</h5>
			<div className="botones-puntuacion">
				<button onClick={() => setPuntuacion(puntuacion + 10)}>+10</button>
				<button onClick={() => setPuntuacion(puntuacion - 5)}>-5</button>
				<button onClick={() => setPuntuacion(0)}>Reset</button>
			</div>

			{/* IIFE para lógica condicional compleja */}
			{(() => {
				if (puntuacion <= 0) {
					return <div className="nivel principiante">Nivel: Principiante</div>;
				} else if (puntuacion > 0 && puntuacion < 50) {
					return <div className="nivel intermedio">Nivel: Intermedio</div>;
				} else {
					return <div className="nivel experto">Nivel: Experto</div>;
				}
			})()}
		</div>
	);
}

/**
 * @function ListaCondicional
 * @description Demuestra el renderizado condicional de listas
 * @returns {JSX.Element} Componente de demostración
 */
function ListaCondicional() {
	const [mostrarCompletados, setMostrarCompletados] = useState(true);

	const tareas = [
		{ id: 1, texto: "Aprender React", completada: true },
		{ id: 2, texto: "Estudiar hooks", completada: false },
		{ id: 3, texto: "Practicar JSX", completada: true },
		{ id: 4, texto: "Crear componentes", completada: false },
	];

	// Filtrar las tareas según el estado del toggle
	const tareasFiltradas = mostrarCompletados ? tareas : tareas.filter((tarea) => !tarea.completada);

	return (
		<div className="demo-lista-condicional">
			<h5>Lista de Tareas</h5>
			<label className="checkbox-label">
				<input
					type="checkbox"
					checked={mostrarCompletados}
					onChange={() => setMostrarCompletados(!mostrarCompletados)}
				/>
				Mostrar tareas completadas
			</label>

			<ul className="lista-tareas">
				{tareasFiltradas.map((tarea) => (
					<li
						key={tarea.id}
						className={tarea.completada ? "completada" : ""}>
						{tarea.texto}
						{tarea.completada && " ✓"}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Ej04_Renderizado_Condicional;
