/**
 * @fileoverview Ejercicio sobre generación de texto y elementos HTML desde código
 * @ejercicio Ej03_Generacion_Elementos
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ej03_Generacion_Elementos.css";

/**
 * @function Ej03_Generacion_Elementos
 * @description Componente que demuestra la generación de elementos HTML desde código JavaScript y listas en React
 * @returns {JSX.Element} Componente de demostración
 */
function Ej03_Generacion_Elementos() {
	// ===== HOOKS =====
	const [textoGenerado, setTextoGenerado] = useState("");
	const [etiquetaGenerada, setEtiquetaGenerada] = useState("");
	const [etiquetaPersonalizada, setEtiquetaPersonalizada] = useState("");
	const [contenidoPersonalizado, setContenidoPersonalizado] = useState("");
	const [etiquetaTipo, setEtiquetaTipo] = useState("p");

	// Estados para listas en React
	const [elementos, setElementos] = useState([
		{ id: 1, nombre: "React", descripcion: "Biblioteca para interfaces de usuario" },
		{ id: 2, nombre: "Vue", descripcion: "Framework progresivo para UI" },
		{ id: 3, nombre: "Angular", descripcion: "Framework completo para aplicaciones web" },
	]);
	const [nuevoElemento, setNuevoElemento] = useState("");
	const [nuevaDescripcion, setNuevaDescripcion] = useState("");
	const [personasFiltradas, setPersonasFiltradas] = useState([]);
	const [edadMinima, setEdadMinima] = useState(0);

	// Datos para ejemplo de filtrado
	const personas = [
		{ id: 1, nombre: "Ana", edad: 25 },
		{ id: 2, nombre: "Juan", edad: 17 },
		{ id: 3, nombre: "María", edad: 32 },
		{ id: 4, nombre: "Carlos", edad: 22 },
		{ id: 5, nombre: "Lucía", edad: 16 },
		{ id: 6, nombre: "Pedro", edad: 41 },
	];

	// ===== EFECTOS =====
	// Filtrar personas cuando cambia la edad mínima
	useEffect(() => {
		setPersonasFiltradas(personas.filter((persona) => persona.edad >= edadMinima));
	}, [edadMinima]);

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function generarTexto
	 * @description Genera texto dinámico usando document.write (simulado)
	 */
	const generarTexto = () => {
		const idioma = navigator.language || navigator.userLanguage;
		const texto = `<h3>El idioma del navegador utilizado es: ${idioma}</h3>`;
		setTextoGenerado(texto);
	};

	/**
	 * @function generarEtiqueta
	 * @description Genera elementos HTML dinámicamente
	 */
	const generarEtiqueta = () => {
		const fecha = new Date();
		const hora = fecha.toLocaleTimeString();
		const etiqueta = `<div class="etiqueta-hora">
      <p>La hora actual es: <strong>${hora}</strong></p>
      <small>Esta etiqueta fue generada dinámicamente</small>
    </div>`;
		setEtiquetaGenerada(etiqueta);
	};

	/**
	 * @function generarEtiquetaPersonalizada
	 * @description Genera una etiqueta HTML con el tipo y contenido indicados
	 */
	const generarEtiquetaPersonalizada = () => {
		if (!contenidoPersonalizado) return;

		const etiqueta = `<${etiquetaTipo} class="etiqueta-personalizada">
      ${contenidoPersonalizado}
    </${etiquetaTipo}>`;

		setEtiquetaPersonalizada(etiqueta);
	};

	/**
	 * @function agregarElemento
	 * @description Agrega un nuevo elemento a la lista de frameworks
	 */
	const agregarElemento = () => {
		if (!nuevoElemento) return;

		const nuevoId = elementos.length > 0 ? Math.max(...elementos.map((el) => el.id)) + 1 : 1;

		setElementos([
			...elementos,
			{
				id: nuevoId,
				nombre: nuevoElemento,
				descripcion: nuevaDescripcion || "Sin descripción",
			},
		]);

		setNuevoElemento("");
		setNuevaDescripcion("");
	};

	/**
	 * @function eliminarElemento
	 * @description Elimina un elemento de la lista
	 * @param {number} id - ID del elemento a eliminar
	 */
	const eliminarElemento = (id) => {
		setElementos(elementos.filter((elemento) => elemento.id !== id));
	};

	/**
	 * @function manejarCambioEdad
	 * @description Actualiza la edad mínima para filtrar personas
	 * @param {Event} e - Evento del input de edad
	 */
	const manejarCambioEdad = (e) => {
		const valor = parseInt(e.target.value) || 0;
		setEdadMinima(valor);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 3: Generación de Texto y Elementos HTML</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra cómo generar texto y elementos HTML dinámicamente desde código JavaScript,
					así como trabajar con listas en React.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.3.1 Generación de elementos HTML desde código JavaScript</h4>
					<p>
						Uno de los principales objetivos de JavaScript es convertir un documento HTML estático en una
						aplicación web dinámica. JavaScript permite manipular los objetos que representan el contenido
						de una página para crear documentos dinámicos.
					</p>

					<div className="demo-container">
						<div className="control-panel">
							<button onClick={generarTexto}>Generar texto con document.write (simulado)</button>
							<button onClick={generarEtiqueta}>Generar elemento HTML</button>
						</div>

						<div className="result-panel">
							<h5>Resultado:</h5>
							{textoGenerado && (
								<div className="text-output">
									<p>Texto generado (simulando document.write):</p>
									<div dangerouslySetInnerHTML={{ __html: textoGenerado }} />
								</div>
							)}

							{etiquetaGenerada && (
								<div className="text-output">
									<p>Elemento HTML generado:</p>
									<div dangerouslySetInnerHTML={{ __html: etiquetaGenerada }} />
								</div>
							)}
						</div>

						<div className="code-explanation">
							<h5>En JavaScript tradicional:</h5>
							<pre className="code-snippet">
								{`// Generar texto con document.write
let lang = navigator.language;
document.write("<h1>El idioma del navegador utilizado es: " + lang + "</h1>");

// Generar elementos HTML dinámicamente
let hora = new Date().toLocaleTimeString();
let contenedor = document.getElementById("contenedor");
contenedor.innerHTML = \`
  <div class="etiqueta-hora">
    <p>La hora actual es: <strong>\${hora}</strong></p>
    <small>Esta etiqueta fue generada dinámicamente</small>
  </div>\`;`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>Generador de etiquetas personalizado</h5>
						<div className="control-panel">
							<div className="input-group">
								<label htmlFor="etiqueta-tipo">Tipo de etiqueta:</label>
								<select
									id="etiqueta-tipo"
									value={etiquetaTipo}
									onChange={(e) => setEtiquetaTipo(e.target.value)}>
									<option value="p">Párrafo (p)</option>
									<option value="h1">Encabezado 1 (h1)</option>
									<option value="h2">Encabezado 2 (h2)</option>
									<option value="div">Div</option>
									<option value="span">Span</option>
									<option value="button">Botón</option>
								</select>
							</div>

							<div className="input-group">
								<label htmlFor="contenido">Contenido:</label>
								<input
									type="text"
									id="contenido"
									value={contenidoPersonalizado}
									onChange={(e) => setContenidoPersonalizado(e.target.value)}
									placeholder="Escribe el contenido..."
								/>
							</div>

							<button onClick={generarEtiquetaPersonalizada}>Generar etiqueta</button>
						</div>

						<div className="result-panel">
							{etiquetaPersonalizada && (
								<div className="text-output">
									<p>HTML generado:</p>
									<pre>{etiquetaPersonalizada}</pre>
									<p>Vista previa:</p>
									<div dangerouslySetInnerHTML={{ __html: etiquetaPersonalizada }} />
								</div>
							)}
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.3.2 Listas en React</h4>
					<p>
						React proporciona una manera elegante de generar listas de elementos utilizando el método
						<code>map()</code> de los arrays. Esto permite transformar un array de datos en un conjunto de
						elementos JSX, cada uno con sus propias propiedades y comportamientos.
					</p>

					<div className="demo-container">
						<div className="demo-row">
							<div className="demo-column">
								<h5>Lista simple de frameworks</h5>
								<div className="lists-demo">
									<div className="simple-list-demo">
										<div className="list-controls">
											<input
												type="text"
												value={nuevoElemento}
												onChange={(e) => setNuevoElemento(e.target.value)}
												placeholder="Nombre del framework"
											/>
											<input
												type="text"
												value={nuevaDescripcion}
												onChange={(e) => setNuevaDescripcion(e.target.value)}
												placeholder="Descripción"
											/>
											<button onClick={agregarElemento}>Agregar</button>
										</div>

										<div className="list-container">
											{elementos.length > 0 ? (
												<ul className="frameworks-list">
													{elementos.map((elemento) => (
														<li key={elemento.id}>
															<span>
																<strong>{elemento.nombre}</strong>:{" "}
																{elemento.descripcion}
															</span>
															<button
																className="delete-btn"
																onClick={() => eliminarElemento(elemento.id)}>
																×
															</button>
														</li>
													))}
												</ul>
											) : (
												<div className="empty-message">No hay elementos en la lista</div>
											)}
										</div>

										<div className="list-info">
											<p>Total de frameworks: {elementos.length}</p>
										</div>
									</div>
								</div>
							</div>

							<div className="demo-column">
								<h5>Filtrado de listas</h5>
								<div className="complex-list-demo">
									<div className="filter-controls">
										<label htmlFor="edad-minima">Edad mínima:</label>
										<input
											type="number"
											id="edad-minima"
											value={edadMinima}
											onChange={manejarCambioEdad}
											min="0"
											max="100"
										/>
									</div>

									<div className="list-container">
										<table className="people-table">
											<thead>
												<tr>
													<th>ID</th>
													<th>Nombre</th>
													<th>Edad</th>
												</tr>
											</thead>
											<tbody>
												{personasFiltradas.map((persona) => (
													<tr key={persona.id}>
														<td>{persona.id}</td>
														<td>{persona.nombre}</td>
														<td>{persona.edad}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									<div className="list-info">
										<p>
											Mostrando {personasFiltradas.length} de {personas.length} personas
											{edadMinima > 0 ? ` (edad ≥ ${edadMinima})` : ""}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="code-explanation">
							<h5>Código de ejemplo: Renderizado de listas en React</h5>
							<pre className="code-snippet">
								{`// Componente Galeria.js que muestra una lista de fotos
import Ficha from "./Ficha";

function Galeria(props) {
  const fotos = props.fotos;
  return (
    <div className="galeria">
      {fotos.map((foto) => (
        <Ficha key={foto.id} foto={foto} />
      ))}
    </div>
  );
}

// Componente Ficha.js que renderiza cada item
function Ficha(props) {
  const foto = props.foto;
  return (
    <div className="ficha" id={foto.id}>
      <h2>{foto.titulo}</h2>
      <p>{foto.descripcion}</p>
      <figure className="elemento-foto">
        <img src={\`/images/\${foto.url}\`} alt={foto.alt} />
      </figure>
    </div>
  );
}`}
							</pre>
							<p>
								<strong>IMPORTANTE:</strong> Siempre se debe proporcionar una propiedad <code>key</code>{" "}
								única cuando se renderizan listas en React. Esto ayuda a React a identificar qué
								elementos han cambiado, se han añadido o eliminado, mejorando significativamente el
								rendimiento.
							</p>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>
						JavaScript puede generar contenido HTML dinámicamente usando <code>document.write</code> o
						manipulando el DOM
					</li>
					<li>En React, los elementos se generan de forma declarativa usando JSX</li>
					<li>
						Para renderizar listas en React se usa el método <code>map()</code> de los arrays
					</li>
					<li>
						Cada elemento de una lista en React debe tener una prop <code>key</code> única
					</li>
					<li>
						Se pueden filtrar listas usando métodos como <code>filter()</code> y mostrar el resultado de
						forma dinámica
					</li>
					<li>
						El uso de <code>dangerouslySetInnerHTML</code> permite insertar HTML directamente en React, pero
						debe usarse con precaución
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03_Generacion_Elementos;
