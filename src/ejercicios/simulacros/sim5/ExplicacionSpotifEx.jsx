/**
 * @fileoverview Explicación detallada del simulacro SpotifEx
 * @ejercicio Simulacro 5 - SpotifEx (Ejemplo examen 2ª evaluación)
 * @tema UT5, UT6, UT7, UT8
 * @fecha 14/05/2025
 */

import React from "react";
import "./ExplicacionSpotifEx.css";

/**
 * @function ExplicacionSpotifEx
 * @description Componente que explica los detalles técnicos del simulacro SpotifEx
 * @returns {JSX.Element} Explicación detallada de los apartados del ejercicio
 */
function ExplicacionSpotifEx() {
	return (
		<div className="explicacion-container">
			<h1 className="explicacion-titulo">Explicación SpotifEx - Simulacro 5</h1>
			<p className="explicacion-intro">
				Este simulacro implementa una aplicación para visualizar y filtrar canciones de Spotify utilizando React
				y varias técnicas de programación frontend.
			</p>

			<div className="explicacion-apartados">
				<div className="apartado">
					<h2>Apartado 1: Componente SpotiMain (2 puntos) UNIDAD 5</h2>
					<div className="apartado-contenido">
						<div className="apartado-descripcion">
							<p>
								Componente principal que contiene y organiza todos los demás componentes de la
								aplicación. Este componente es el que se visualiza al abrir la aplicación desde
								SpotifEx.jsx.
							</p>
						</div>
						<div className="apartado-codigo">
							<pre>
								<code>
									{`// En SpotifEx.jsx
import SpotiMain from "./components/SpotiMain";

function SpotifEx() {
  return (
    <div className="spotifex-app">
      <header className="app-header">
        <h1>SpotifEx</h1>
        <div className="app-description">Explorador de canciones de Spotify</div>
      </header>

      <main className="app-content">
        {/* Componente principal que contiene toda la aplicación */}
        <SpotiMain />
      </main>

      <footer className="app-footer">
        <p>SpotifEx &copy; 2025 - Ejemplo de examen 2ª evaluación DWEC</p>
      </footer>
    </div>
  );
}`}
								</code>
							</pre>
						</div>
					</div>
				</div>

				<div className="apartado">
					<h2>Apartado 2: Función Asíncrona para Obtener Canciones (2 puntos) UNIDAD 8</h2>
					<div className="apartado-contenido">
						<div className="apartado-descripcion">
							<p>
								Dentro de SpotiMain se ha implementado una función asíncrona que permite obtener todas
								las canciones del archivo JSON incluido en el proyecto. Se utiliza async/await para
								manejar la operación de forma asíncrona.
							</p>
						</div>
						<div className="apartado-codigo">
							<pre>
								<code>
									{`// En SpotiMain.jsx
import spotifyData from "../json/Spotify.json";

// Estado para almacenar las canciones
const [canciones, setCanciones] = useState([]);

// Efecto para cargar las canciones al montar el componente
useEffect(() => {
  cargarCanciones();
}, []);

/**
 * Función asíncrona para obtener las canciones del archivo JSON
 */
const cargarCanciones = async () => {
  try {
    setCargando(true);
    
    // Cargamos los datos desde el JSON importado
    setCanciones(spotifyData.canciones);
    console.log("Canciones cargadas:", spotifyData.canciones);
  } catch (error) {
    console.error("Error al cargar canciones:", error);
    setError(error.message);
  } finally {
    setCargando(false);
  }
};`}
								</code>
							</pre>
						</div>
					</div>
				</div>

				<div className="apartado">
					<h2>Apartado 3: Componente ListadoCanciones (2,5 puntos) UNADES 5 y 6</h2>
					<div className="apartado-contenido">
						<div className="apartado-descripcion">
							<p>
								Se ha creado un componente que muestra la lista completa de canciones en formato
								tabular. Incluye los campos: ID de pista, nombre, artista, nombre del álbum y duración
								en segundos. La lista de canciones se pasa como prop desestructurada.
							</p>
						</div>
						<div className="apartado-codigo">
							<pre>
								<code>
									{`// En ListadoCanciones.jsx
function ListadoCanciones({ canciones }) {
  // Función auxiliar para formatear la duración
  const formatearDuracion = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segsRestantes = segundos % 60;
    return \`\${minutos}:\${segsRestantes.toString().padStart(2, "0")}\`;
  };

  return (
    <div className="listado-canciones">
      <table className="tabla-canciones">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Duración</th>
            <th>Duración (seg)</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map((cancion) => (
            <tr key={cancion.id}>
              <td>{cancion.id}</td>
              <td>{cancion.nombre}</td>
              <td>{cancion.artista}</td>
              <td>{cancion.album}</td>
              <td>{formatearDuracion(cancion.duracion)}</td>
              <td>{cancion.duracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`}
								</code>
							</pre>
						</div>
					</div>
				</div>

				<div className="apartado">
					<h2>Apartado 4: Componente FiltradoCanciones (2,5 puntos) UNIDAD 7</h2>
					<div className="apartado-contenido">
						<div className="apartado-descripcion">
							<p>
								Componente que contiene un cuadro de texto para filtrar canciones por nombre de artista.
								A medida que el usuario escribe, se actualiza la lista mostrando solo las canciones del
								artista que coincide con el texto introducido.
							</p>
						</div>
						<div className="apartado-codigo">
							<pre>
								<code>
									{`// En FiltradoCanciones.jsx
function FiltradoCanciones({ canciones }) {
  // Estado para el filtro de artista
  const [filtroArtista, setFiltroArtista] = useState("");
  
  // Estado para las canciones filtradas
  const [cancionesFiltradas, setCancionesFiltradas] = useState([]);

  // Efecto para filtrar las canciones cuando cambia el filtro
  useEffect(() => {
    if (!filtroArtista.trim()) {
      setCancionesFiltradas([]);
      return;
    }

    // Filtramos las canciones cuyo artista coincida con el filtro
    const filtradas = canciones.filter((cancion) =>
      cancion.artista.toLowerCase().includes(filtroArtista.toLowerCase())
    );

    setCancionesFiltradas(filtradas);
  }, [filtroArtista, canciones]);

  return (
    <div className="filtrado-canciones">
      <div className="filtro-container">
        <input
          type="text"
          placeholder="Introduce nombre de artista..."
          value={filtroArtista}
          onChange={(e) => setFiltroArtista(e.target.value)}
        />
      </div>

      <div className="resultados-filtro">
        {filtroArtista && (
          <div>
            <h3>Canciones de {filtroArtista}:</h3>
            <ul className="lista-canciones-filtradas">
              {cancionesFiltradas.map((cancion) => (
                <li key={cancion.id}>
                  {cancion.nombre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}`}
								</code>
							</pre>
						</div>
					</div>
				</div>

				<div className="apartado">
					<h2>Apartado 5: Componente MasPopular (1 punto) UNIDADES 5 y 6</h2>
					<div className="apartado-contenido">
						<div className="apartado-descripcion">
							<p>
								Componente que muestra la canción más popular de la lista basándose en el campo de
								popularidad. Utiliza useMemo para optimizar el cálculo, evitando recalcular
								innecesariamente cuando el componente se vuelve a renderizar.
							</p>
						</div>
						<div className="apartado-codigo">
							<pre>
								<code>
									{`// En MasPopular.jsx
function MasPopular({ canciones }) {
  // useMemo para calcular la canción más popular
  const cancionMasPopular = useMemo(() => {
    if (!canciones || canciones.length === 0) {
      return null;
    }

    // Encontramos la canción con mayor popularidad
    return canciones.reduce((masPopular, cancionActual) => {
      return cancionActual.popularidad > masPopular.popularidad
        ? cancionActual
        : masPopular;
    }, canciones[0]);
  }, [canciones]);

  if (!cancionMasPopular) {
    return <div className="sin-datos">No hay canciones disponibles</div>;
  }

  return (
    <div className="mas-popular">
      <div className="tarjeta-cancion">
        <div className="badge-popularidad">
          <span>{cancionMasPopular.popularidad}</span>
          <small>/100</small>
        </div>

        <h3 className="nombre-cancion">{cancionMasPopular.nombre}</h3>
        <p className="datos-cancion">
          <span className="artista">{cancionMasPopular.artista}</span> -
          <span className="album"> {cancionMasPopular.album}</span>
        </p>
      </div>
    </div>
  );
}`}
								</code>
							</pre>
						</div>
					</div>
				</div>
			</div>

			<div className="explicacion-estructura">
				<h2>Estructura del Proyecto</h2>
				<pre>
					<code>
						{`src/ejercicios/simulacros/sim5/
├── SpotifEx.jsx           # Componente principal que carga SpotiMain
├── SpotifEx.css           # Estilos globales de la aplicación
├── components/
│   ├── SpotiMain.jsx      # Contenedor principal, gestiona estado y carga de datos
│   ├── ListadoCanciones.jsx # Muestra tabla con todas las canciones
│   ├── FiltradoCanciones.jsx # Filtrado de canciones por artista
│   └── MasPopular.jsx     # Muestra la canción con mayor popularidad
└── json/
    └── Spotify.json       # Archivo con datos de canciones`}
					</code>
				</pre>
			</div>

			<div className="explicacion-conclusion">
				<h2>Conclusión</h2>
				<p>Este simulacro demuestra la aplicación de conceptos clave de React como:</p>
				<ul>
					<li>Componentes funcionales y composición de componentes</li>
					<li>Manejo de estado con useState y efectos con useEffect</li>
					<li>Optimización de rendimiento con useMemo</li>
					<li>Comunicación entre componentes usando props</li>
					<li>Renderizado condicional y manejo de listas</li>
					<li>Operaciones asíncronas y manejo de datos externos</li>
					<li>Eventos y formularios controlados</li>
				</ul>
			</div>
		</div>
	);
}

export default ExplicacionSpotifEx;
