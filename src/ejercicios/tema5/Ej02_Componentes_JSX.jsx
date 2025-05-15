/**
 * @fileoverview Ejercicio sobre Componentes y JSX en React
 * @ejercicio Ej02_Componentes_JSX
 * @tema Tema 5: Bibliotecas y Frameworks - React
 * @fecha 11/05/2025
 */

import "./Ej02_Componentes_JSX.css";

/**
 * @function Ej02_Componentes_JSX
 * @description Componente principal que demuestra el uso de Componentes y JSX en React
 * @returns {JSX.Element} Componente de demostración de JSX y componentes
 * @example
 *   <Ej02_Componentes_JSX />
 */
function Ej02_Componentes_JSX() {
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 2: Componentes y JSX</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio muestra cómo crear y estructurar componentes en React, junto con la sintaxis y
					características de JSX.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Creación de Componentes</h4>
					<p>
						Los componentes en React pueden ser funcionales (usando funciones) o de clase (extendiendo de
						React.Component). Los componentes funcionales son la forma recomendada actualmente.
					</p>

					<div className="code-example">
						<h5>Componente Funcional:</h5>
						<pre>
							{`
function MiComponente(props) {
  return <div>Hola, {props.nombre}</div>;
}
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado:</h5>
						<ComponenteDemo nombre="Estudiante" />
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. Variables en JSX</h4>
					<p>JSX permite insertar variables y expresiones JavaScript utilizando llaves {"{}"}.</p>

					<VariablesJSXDemo />
				</section>

				<section className="concepto-section">
					<h4>3. Comentarios en JSX</h4>
					<p>Existen diferentes formas de agregar comentarios en los componentes React:</p>

					<div className="code-example">
						<h5>Comentarios en JSX:</h5>
						<pre>
							{`
// Comentario de una línea fuera del JSX

function MiComponente() {
  /* 
   * Comentario multilínea
   * fuera del JSX
   */
  return (
    <div>
      {/* Comentario dentro del JSX */}
      <p>Contenido</p>
      {/* 
        Comentario multilínea 
        dentro del JSX 
      */}
    </div>
  );
}
              `}
						</pre>
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Bucles en JSX</h4>
					<p>
						En React, podemos usar funciones como map() para generar listas de elementos. Es importante
						proporcionar una prop 'key' única para cada elemento de la lista.
					</p>

					<BuclesJSXDemo />
				</section>

				<section className="concepto-section">
					<h4>5. Fragmentos</h4>
					<p>Los fragmentos permiten agrupar elementos sin añadir nodos adicionales al DOM.</p>

					<div className="code-example">
						<h5>Uso de Fragmentos:</h5>
						<pre>
							{`
// Sintaxis de fragmento explícita
<React.Fragment>
  <h2>Título</h2>
  <p>Párrafo</p>
</React.Fragment>

// Sintaxis abreviada
<>
  <h2>Título</h2>
  <p>Párrafo</p>
</>
              `}
						</pre>
					</div>

					<div className="demo-result">
						<h5>Resultado con fragmentos:</h5>
						<FragmentDemo />
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>JSX debe devolver un solo elemento raíz (o usar fragmentos)</li>
					<li>Las etiquetas JSX deben cerrarse siempre (incluso las auto-cerradas como {"<img />"}) </li>
					<li>Se usa className en lugar de class para las clases CSS en JSX</li>
					<li>Los atributos en JSX usan camelCase (ej: onClick en lugar de onclick)</li>
					<li>Cada elemento en una lista necesita una prop key única</li>
					<li>Las expresiones JavaScript se incluyen en llaves {"{}"} dentro de JSX</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function ComponenteDemo
 * @description Componente simple que muestra un mensaje de saludo
 * @param {Object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre para el saludo
 * @returns {JSX.Element} Componente de demostración
 */
function ComponenteDemo({ nombre }) {
	return (
		<div className="componente-demo">
			<p>Hola, {nombre}!</p>
		</div>
	);
}

/**
 * @function VariablesJSXDemo
 * @description Demuestra el uso de variables en JSX
 * @returns {JSX.Element} Componente de demostración
 */
function VariablesJSXDemo() {
	// Definición de variables y expresiones que se pueden usar en JSX
	const titulo = "Uso de Variables en JSX";
	const contador = 42;
	const estaActivo = true;
	const estiloPersonalizado = { color: "blue", fontWeight: "bold" };

	// Definir elementos JSX en variables
	const encabezado = (
		<div className="encabezado-demo">
			<h5>{titulo}</h5>
		</div>
	);

	return (
		<div className="variables-jsx-demo">
			<div className="code-example">
				<h5>Código:</h5>
				<pre>
					{`
const titulo = "Uso de Variables en JSX";
const contador = 42;
const estaActivo = true;
const estiloPersonalizado = { color: "blue", fontWeight: "bold" };

return (
  <>
    <h5>{titulo}</h5>
    <p>Contador: {contador}</p>
    <p>Estado: {estaActivo ? 'Activo' : 'Inactivo'}</p>
    <p style={estiloPersonalizado}>Texto con estilo personalizado</p>
  </>
);
          `}
				</pre>
			</div>

			<div className="demo-result">
				<h5>Resultado:</h5>
				<div className="variables-result">
					{encabezado}
					<p>Contador: {contador}</p>
					<p>Estado: {estaActivo ? "Activo" : "Inactivo"}</p>
					<p style={estiloPersonalizado}>Texto con estilo personalizado</p>
				</div>
			</div>
		</div>
	);
}

/**
 * @function BuclesJSXDemo
 * @description Demuestra el uso de bucles en JSX para generar listas
 * @returns {JSX.Element} Componente de demostración
 */
function BuclesJSXDemo() {
	// Array de datos para la demostración
	const estudiantes = [
		{ id: 1, nombre: "Ana", edad: 22 },
		{ id: 2, nombre: "Carlos", edad: 25 },
		{ id: 3, nombre: "Elena", edad: 21 },
		{ id: 4, nombre: "Pablo", edad: 24 },
	];

	return (
		<div className="bucles-jsx-demo">
			<div className="code-example">
				<h5>Código:</h5>
				<pre>
					{`
const estudiantes = [
  { id: 1, nombre: "Ana", edad: 22 },
  { id: 2, nombre: "Carlos", edad: 25 },
  { id: 3, nombre: "Elena", edad: 21 },
  { id: 4, nombre: "Pablo", edad: 24 }
];

return (
  <ul>
    {estudiantes.map(estudiante => (
      <li key={estudiante.id}>
        <b>{estudiante.nombre}</b>: {estudiante.edad} años
      </li>
    ))}
  </ul>
);
          `}
				</pre>
			</div>

			<div className="demo-result">
				<h5>Resultado:</h5>
				<div className="bucles-result">
					<ul>
						{estudiantes.map((estudiante) => (
							<li key={estudiante.id}>
								<b>{estudiante.nombre}</b>: {estudiante.edad} años
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

/**
 * @function FragmentDemo
 * @description Demuestra el uso de fragmentos en React
 * @returns {JSX.Element} Componente de demostración
 */
function FragmentDemo() {
	return (
		<>
			<h5>Título dentro de un fragmento</h5>
			<p>Este párrafo está junto al título sin un div contenedor</p>
		</>
	);
}

export default Ej02_Componentes_JSX;
