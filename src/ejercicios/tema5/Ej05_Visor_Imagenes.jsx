/**
 * @fileoverview Ejercicio de Visor de Imágenes con React
 * @ejercicio Ej05_Visor_Imagenes
 * @tema Tema 5: Bibliotecas y Frameworks - React
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej05_Visor_Imagenes.css";

// Imágenes de ejemplo para el visor
const imagenes = [
	{
		id: 1,
		titulo: "Amanecer en la montaña",
		url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format",
		descripcion: "Hermoso amanecer visto desde la cima de una montaña.",
	},
	{
		id: 2,
		titulo: "Playa tropical",
		url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format",
		descripcion: "Arena blanca y aguas cristalinas en una playa paradisíaca.",
	},
	{
		id: 3,
		titulo: "Bosque en otoño",
		url: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&auto=format",
		descripcion: "Coloridos árboles durante la temporada de otoño en un bosque.",
	},
	{
		id: 4,
		titulo: "Ciudad al atardecer",
		url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format",
		descripcion: "Silueta de edificios de una ciudad moderna durante el atardecer.",
	},
	{
		id: 5,
		titulo: "Lago de montaña",
		url: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&auto=format",
		descripcion: "Tranquilo lago rodeado de montañas con nieve.",
	},
];

/**
 * @function Ej05_Visor_Imagenes
 * @description Componente principal que implementa un visor de imágenes con React
 * @returns {JSX.Element} Componente de visor de imágenes
 * @example
 *   <Ej05_Visor_Imagenes />
 */
function Ej05_Visor_Imagenes() {
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 5: Visor de Imágenes</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio implementa un visor de imágenes interactivo utilizando React. Muestra un carrusel de
					imágenes con navegación y vista detallada.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>Implementación</h4>
					<p>El visor de imágenes combina varias técnicas de React:</p>
					<ul>
						<li>Uso de props para pasar información entre componentes</li>
						<li>Estado para controlar la imagen actualmente seleccionada</li>
						<li>Renderizado condicional para la vista detallada</li>
						<li>Manejo de eventos para la navegación</li>
						<li>Estilizado de componentes para una interfaz de usuario atractiva</li>
					</ul>
				</section>

				<section className="visor-section">
					<h4>Visor de Imágenes</h4>
					<VisorImagenes imagenes={imagenes} />
				</section>

				<section className="concepto-section">
					<h4>Explicación del Código</h4>
					<div className="code-example">
						<h5>Componente Principal - VisorImagenes:</h5>
						<pre>
							{`
function VisorImagenes({ imagenes }) {
  // Estado para la imagen actualmente seleccionada
  const [indiceActual, setIndiceActual] = useState(0);
  // Estado para controlar si se muestra la vista detallada
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  // Imagen actual basada en el índice
  const imagenActual = imagenes[indiceActual];

  // Funciones de navegación
  const irAnterior = () => {
    setIndiceActual((indice) => 
      indice === 0 ? imagenes.length - 1 : indice - 1
    );
  };

  const irSiguiente = () => {
    setIndiceActual((indice) => 
      indice === imagenes.length - 1 ? 0 : indice + 1
    );
  };

  return (
    <div className="visor-container">
      {/* Vista principal del visor */}
      <div className="visor-principal">
        <button 
          className="nav-button prev" 
          onClick={irAnterior}
        >
          &lt;
        </button>
        
        <div 
          className="imagen-container"
          onClick={() => setMostrarDetalle(true)}
        >
          <img 
            src={imagenActual.url} 
            alt={imagenActual.titulo} 
            className="imagen-actual"
          />
          <div className="imagen-info">
            <h3>{imagenActual.titulo}</h3>
          </div>
        </div>
        
        <button 
          className="nav-button next" 
          onClick={irSiguiente}
        >
          &gt;
        </button>
      </div>

      {/* Miniaturas de navegación */}
      <div className="miniaturas-container">
        {imagenes.map((imagen, indice) => (
          <div 
            key={imagen.id}
            className={\`miniatura \${indice === indiceActual ? 'activa' : ''}\`}
            onClick={() => setIndiceActual(indice)}
          >
            <img src={imagen.url} alt={imagen.titulo} />
          </div>
        ))}
      </div>

      {/* Vista detallada (modal) */}
      {mostrarDetalle && (
        <VistaDetallada 
          imagen={imagenActual}
          onClose={() => setMostrarDetalle(false)}
          onNext={irSiguiente}
          onPrev={irAnterior}
        />
      )}
    </div>
  );
}
              `}
						</pre>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>Un visor de imágenes es un ejemplo práctico que integra varios conceptos de React</li>
					<li>Se utilizan props para pasar datos de imágenes entre componentes</li>
					<li>
						El estado (useState) permite controlar la imagen seleccionada y la visualización de detalles
					</li>
					<li>El renderizado condicional muestra u oculta la vista detallada</li>
					<li>Los eventos de clic permiten la navegación entre imágenes</li>
					<li>
						La composición de componentes (VisorImagenes y VistaDetallada) muestra la modularidad de React
					</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function VisorImagenes
 * @description Componente que implementa un visor interactivo de imágenes
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.imagenes - Array de objetos de imágenes para mostrar
 * @returns {JSX.Element} Componente de visor de imágenes
 */
function VisorImagenes({ imagenes }) {
	// ===== HOOKS =====
	// Estado para la imagen actualmente seleccionada
	const [indiceActual, setIndiceActual] = useState(0);
	// Estado para controlar si se muestra la vista detallada
	const [mostrarDetalle, setMostrarDetalle] = useState(false);

	// ===== VARIABLES =====
	// Imagen actual basada en el índice
	const imagenActual = imagenes[indiceActual];

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function irAnterior
	 * @description Navega a la imagen anterior
	 */
	const irAnterior = () => {
		setIndiceActual((indice) => (indice === 0 ? imagenes.length - 1 : indice - 1));
	};

	/**
	 * @function irSiguiente
	 * @description Navega a la imagen siguiente
	 */
	const irSiguiente = () => {
		setIndiceActual((indice) => (indice === imagenes.length - 1 ? 0 : indice + 1));
	};

	// ===== RENDER =====
	return (
		<div className="visor-container">
			{/* Vista principal del visor */}
			<div className="visor-principal">
				<button
					className="nav-button prev"
					onClick={irAnterior}
					aria-label="Imagen anterior">
					&lt;
				</button>

				<div
					className="imagen-container"
					onClick={() => setMostrarDetalle(true)}>
					<img
						src={imagenActual.url}
						alt={imagenActual.titulo}
						className="imagen-actual"
					/>
					<div className="imagen-info">
						<h3>{imagenActual.titulo}</h3>
					</div>
				</div>

				<button
					className="nav-button next"
					onClick={irSiguiente}
					aria-label="Imagen siguiente">
					&gt;
				</button>
			</div>

			{/* Miniaturas de navegación */}
			<div className="miniaturas-container">
				{imagenes.map((imagen, indice) => (
					<div
						key={imagen.id}
						className={`miniatura ${indice === indiceActual ? "activa" : ""}`}
						onClick={() => setIndiceActual(indice)}>
						<img
							src={imagen.url}
							alt={imagen.titulo}
						/>
					</div>
				))}
			</div>

			{/* Vista detallada (modal) */}
			{mostrarDetalle && (
				<VistaDetallada
					imagen={imagenActual}
					onClose={() => setMostrarDetalle(false)}
					onNext={irSiguiente}
					onPrev={irAnterior}
				/>
			)}
		</div>
	);
}

/**
 * @function VistaDetallada
 * @description Componente que muestra una vista detallada de una imagen
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.imagen - Información de la imagen a mostrar
 * @param {Function} props.onClose - Función para cerrar la vista detallada
 * @param {Function} props.onNext - Función para ir a la siguiente imagen
 * @param {Function} props.onPrev - Función para ir a la imagen anterior
 * @returns {JSX.Element} Componente de vista detallada
 */
function VistaDetallada({ imagen, onClose, onNext, onPrev }) {
	return (
		<div className="vista-detallada-overlay">
			<div className="vista-detallada">
				<button
					className="cerrar-button"
					onClick={onClose}
					aria-label="Cerrar vista detallada">
					&times;
				</button>

				<div className="detalle-contenido">
					<button
						className="nav-button prev"
						onClick={onPrev}
						aria-label="Imagen anterior">
						&lt;
					</button>

					<div className="detalle-imagen-container">
						<img
							src={imagen.url}
							alt={imagen.titulo}
							className="detalle-imagen"
						/>
						<div className="detalle-info">
							<h2>{imagen.titulo}</h2>
							<p>{imagen.descripcion}</p>
						</div>
					</div>

					<button
						className="nav-button next"
						onClick={onNext}
						aria-label="Imagen siguiente">
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
}

export default Ej05_Visor_Imagenes;
