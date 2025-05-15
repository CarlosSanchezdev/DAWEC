/**
 * @fileoverview Ejercicio sobre Props y Estado en React
 * @ejercicio Ej03_Props_Estado
 * @tema Tema 5: Bibliotecas y Frameworks - React
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej03_Props_Estado.css";

/**
 * @function Ej03_Props_Estado
 * @description Componente principal que demuestra el uso de props y estado en React
 * @returns {JSX.Element} Componente de demostración de props y estado
 * @example
 *   <Ej03_Props_Estado />
 */
function Ej03_Props_Estado() {
	// ===== HOOKS =====
	const [usuario, setUsuario] = useState({
		nombre: "Juan Diego",
		edad: 28,
		color: "Verde",
	});

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function saludarFn
	 * @description Función que muestra un saludo con el nombre proporcionado
	 * @param {string} nombre - Nombre de la persona a saludar
	 */
	const saludarFn = (nombre) => {
		alert(`¡Hola, ${nombre}! Gusto en saludarte.`);
	};

	/**
	 * @function cambiarUsuario
	 * @description Función que cambia los datos del usuario
	 */
	const cambiarUsuario = () => {
		setUsuario({
			nombre: "Carmen",
			edad: 24,
			color: "Azul",
		});
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 3: Props y Estado</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra cómo usar props para pasar datos a componentes hijos y cómo manejar el
					estado con useState.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Props Básicas</h4>
					<p>
						Las props son la forma de pasar datos de un componente padre a un componente hijo. Son de solo
						lectura (inmutables).
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Componente padre
<Saludar nombre="Juan Diego" edad="28" />

// Componente hijo
function Saludar(props) {
  return <h2>Hola, {props.nombre}, tienes {props.edad} años</h2>;
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<Saludar
							nombre="Juan Diego"
							edad="28"
						/>
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. Desestructuración de Props</h4>
					<p>Una práctica común es desestructurar las props para acceder directamente a sus valores.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Componente con desestructuración
function SaludarDesestructurado({ nombre, edad }) {
  return <h2>Hola, {nombre}, tienes {edad} años</h2>;
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<SaludarDesestructurado
							nombre="María"
							edad="32"
						/>
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. Pasar Objetos como Props</h4>
					<p>Podemos pasar objetos completos como props y acceder a sus propiedades.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Definir objeto usuario
const usuario = {
  nombre: "Juan Diego",
  edad: 28,
  color: "Verde"
};

// Pasar objeto como prop
<SaludarObjeto userInfo={usuario} />

// Componente que recibe objeto
function SaludarObjeto(props) {
  const { userInfo } = props;
  return (
    <h2>
      Hola, {userInfo.nombre}, tienes {userInfo.edad} años y 
      tu color favorito es el {userInfo.color}
    </h2>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<SaludarObjeto userInfo={usuario} />
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Pasar Funciones como Props</h4>
					<p>
						Las funciones también pueden pasarse como props, permitiendo que el hijo invoque funciones
						definidas en el padre.
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Definir función
const saludarFn = (nombre) => {
  alert(\`¡Hola, \${nombre}! Gusto en saludarte.\`);
};

// Pasar función y objeto como props
<BotonSaludo userInfo={usuario} saludarFn={saludarFn} />

// Componente que utiliza la función
function BotonSaludo({ userInfo, saludarFn }) {
  return (
    <button onClick={() => saludarFn(userInfo.nombre)}>
      Saludar a {userInfo.nombre}
    </button>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<BotonSaludo
							userInfo={usuario}
							saludarFn={saludarFn}
						/>
					</div>
				</section>

				<section className="concepto-section">
					<h4>5. Estado con useState</h4>
					<p>
						El estado permite que los componentes almacenen y actualicen datos que afectan a su renderizado.
						useState es el hook básico para manejar estado en componentes funcionales.
					</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
function ContadorEstado() {
  // Declaración del estado y función para actualizarlo
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      <button onClick={() => setContador(contador - 1)}>Decrementar</button>
      <button onClick={() => setContador(0)}>Reiniciar</button>
    </div>
  );
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<ContadorEstado />
					</div>
				</section>

				<section className="concepto-section">
					<h4>6. Estado con Objetos</h4>
					<p>El estado puede contener objetos complejos, pero hay que tener cuidado al actualizarlos.</p>

					<div className="code-example">
						<h5>Código:</h5>
						<pre>
							{`
// Estado que contiene un objeto
const [usuario, setUsuario] = useState({
  nombre: "Juan Diego",
  edad: 28,
  color: "Verde"
});

// Función para actualizar el estado
const cambiarUsuario = () => {
  setUsuario({
    nombre: "Carmen",
    edad: 24,
    color: "Azul"
  });
};

// Mostrar y actualizar el usuario
return (
  <div>
    <SaludarObjeto userInfo={usuario} />
    <button onClick={cambiarUsuario}>Cambiar a Carmen</button>
  </div>
);
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<div className="estado-objeto-demo">
							<SaludarObjeto userInfo={usuario} />
							<button onClick={cambiarUsuario}>Cambiar a Carmen</button>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>Las props son inmutables (no se pueden modificar en el componente hijo)</li>
					<li>Las props fluyen de padre a hijo (comunicación unidireccional)</li>
					<li>Las funciones pueden pasarse como props para permitir la comunicación hijo a padre</li>
					<li>El estado es local al componente y se puede modificar</li>
					<li>Cuando el estado cambia, el componente se vuelve a renderizar</li>
					<li>Las actualizaciones de estado pueden ser asíncronas</li>
					<li>
						Para actualizar el estado basado en estado previo, usar la forma funcional:{" "}
						<code>setContador(prevContador ={">"} prevContador + 1)</code>
					</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function Saludar
 * @description Componente que muestra un saludo básico usando props
 * @param {Object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre de la persona
 * @param {string} props.edad - Edad de la persona
 * @returns {JSX.Element} Componente de saludo
 */
function Saludar(props) {
	return (
		<h2 className="saludo">
			Hola, {props.nombre}, tienes {props.edad} años
		</h2>
	);
}

/**
 * @function SaludarDesestructurado
 * @description Componente que muestra un saludo usando props desestructuradas
 * @param {Object} props - Propiedades desestructuradas
 * @param {string} props.nombre - Nombre de la persona
 * @param {string} props.edad - Edad de la persona
 * @returns {JSX.Element} Componente de saludo
 */
function SaludarDesestructurado({ nombre, edad }) {
	return (
		<h2 className="saludo">
			Hola, {nombre}, tienes {edad} años
		</h2>
	);
}

/**
 * @function SaludarObjeto
 * @description Componente que muestra un saludo usando un objeto como prop
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.userInfo - Información del usuario
 * @param {string} props.userInfo.nombre - Nombre del usuario
 * @param {number} props.userInfo.edad - Edad del usuario
 * @param {string} props.userInfo.color - Color favorito del usuario
 * @returns {JSX.Element} Componente de saludo
 */
function SaludarObjeto(props) {
	const { userInfo } = props;
	return (
		<h2 className="saludo">
			Hola, {userInfo.nombre}, tienes {userInfo.edad} años y tu color favorito es el {userInfo.color}
		</h2>
	);
}

/**
 * @function BotonSaludo
 * @description Componente que muestra un botón que ejecuta una función recibida como prop
 * @param {Object} props - Propiedades desestructuradas
 * @param {Object} props.userInfo - Información del usuario
 * @param {Function} props.saludarFn - Función para ejecutar al hacer clic
 * @returns {JSX.Element} Componente de botón
 */
function BotonSaludo({ userInfo, saludarFn }) {
	return (
		<button
			className="boton-saludo"
			onClick={() => saludarFn(userInfo.nombre)}>
			Saludar a {userInfo.nombre}
		</button>
	);
}

/**
 * @function ContadorEstado
 * @description Componente que demuestra el uso básico del estado
 * @returns {JSX.Element} Componente de contador
 */
function ContadorEstado() {
	// IMPORTANTE: Declaración del estado y función para actualizarlo
	const [contador, setContador] = useState(0);

	return (
		<div className="contador-estado">
			<p className="contador-valor">Contador: {contador}</p>
			<div className="contador-botones">
				<button onClick={() => setContador(contador + 1)}>Incrementar</button>
				<button onClick={() => setContador(contador - 1)}>Decrementar</button>
				<button onClick={() => setContador(0)}>Reiniciar</button>
			</div>
		</div>
	);
}

export default Ej03_Props_Estado;
