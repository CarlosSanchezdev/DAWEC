/**
 * @fileoverview Componente principal de la aplicación AVILESA
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect, useCallback } from "react";
import "./AvilesaApp.css";
import AvilesaService from "./models/AvilesaService";
import ListadoLineas from "./components/ListadoLineas";
import FormLinea from "./components/FormLinea";
import FormParada from "./components/FormParada";
import DetalleLinea from "./components/DetalleLinea";

/**
 * @function AvilesaApp
 * @description Componente principal que gestiona la aplicación de AVILESA
 * @returns {JSX.Element} Componente principal de la aplicación
 *
 * IMPORTANTE: Este componente controla la navegación entre las diferentes vistas de la aplicación
 * utilizando un sistema de estado interno en lugar de un enrutador completo.
 */
function AvilesaApp() {
	// ===== HOOKS =====
	const [vista, setVista] = useState("inicio");
	const [lineas, setLineas] = useState([]);
	const [lineaSeleccionada, setLineaSeleccionada] = useState(null);
	const [paradaSeleccionada, setParadaSeleccionada] = useState(null);
	const [mensajeExito, setMensajeExito] = useState("");
	const [mensajeError, setMensajeError] = useState("");

	// Servicio de gestión de AVILESA
	const avilesaService = AvilesaService.getInstance();
	// ===== EFECTOS =====
	/**
	 * Efecto para cargar las líneas al iniciar
	 */
	useEffect(() => {
		// Definir una función para cargar las líneas dentro del useEffect
		// para evitar el ciclo de dependencias
		const cargarLineasInicial = () => {
			cargarLineas();
		};

		cargarLineasInicial();
	}, []);

	/**
	 * Efecto para mostrar mensajes temporales (3 segundos)
	 */
	useEffect(() => {
		if (mensajeExito || mensajeError) {
			const timer = setTimeout(() => {
				setMensajeExito("");
				setMensajeError("");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [mensajeExito, mensajeError]);

	// ===== FUNCIONES AUXILIARES =====	/**
	/**
	 * @function cargarLineas
	 * @description Carga las líneas desde el servicio
	 */
	const cargarLineas = useCallback(() => {
		try {
			const lineasCargadas = avilesaService.obtenerLineas();
			setLineas(lineasCargadas);
		} catch (error) {
			mostrarError(`Error al cargar líneas: ${error.message}`);
		}
	}, [avilesaService]);

	/**
	 * @function mostrarExito
	 * @description Muestra un mensaje de éxito temporal
	 * @param {string} mensaje - Mensaje a mostrar
	 */
	const mostrarExito = (mensaje) => {
		setMensajeExito(mensaje);
		setMensajeError("");
	};

	/**
	 * @function mostrarError
	 * @description Muestra un mensaje de error temporal
	 * @param {string} mensaje - Mensaje a mostrar
	 */
	const mostrarError = (mensaje) => {
		setMensajeError(mensaje);
		setMensajeExito("");
	};

	/**
	 * @function navegarA
	 * @description Cambia la vista actual
	 * @param {string} nuevaVista - Vista a mostrar
	 * @param {Object} [parametros] - Parámetros adicionales
	 */
	const navegarA = (nuevaVista, parametros = {}) => {
		setVista(nuevaVista);

		if (parametros.linea !== undefined) {
			setLineaSeleccionada(parametros.linea);
		}

		if (parametros.parada !== undefined) {
			setParadaSeleccionada(parametros.parada);
		}
	};

	/**
	 * @function crearLinea
	 * @description Crea una nueva línea
	 * @param {Object} datosLinea - Datos de la línea a crear
	 */
	const crearLinea = (datosLinea) => {
		try {
			avilesaService.agregarLinea(datosLinea);
			cargarLineas();
			mostrarExito(`Línea ${datosLinea.numero} creada correctamente`);
			navegarA("listado");
		} catch (error) {
			mostrarError(`Error al crear línea: ${error.message}`);
		}
	};

	/**
	 * @function actualizarLinea
	 * @description Actualiza una línea existente
	 * @param {Object} datosLinea - Datos actualizados de la línea
	 */
	const actualizarLinea = (datosLinea) => {
		try {
			avilesaService.actualizarLinea(lineaSeleccionada.numero, datosLinea);
			cargarLineas();
			mostrarExito(`Línea ${datosLinea.numero} actualizada correctamente`);
			navegarA("listado");
		} catch (error) {
			mostrarError(`Error al actualizar línea: ${error.message}`);
		}
	};

	/**
	 * @function eliminarLinea
	 * @description Elimina una línea
	 * @param {number} numeroLinea - Número de la línea a eliminar
	 */
	const eliminarLinea = (numeroLinea) => {
		if (window.confirm(`¿Está seguro de eliminar la línea ${numeroLinea} y todas sus paradas?`)) {
			try {
				avilesaService.eliminarLinea(numeroLinea);
				cargarLineas();
				mostrarExito(`Línea ${numeroLinea} eliminada correctamente`);
				navegarA("listado");
			} catch (error) {
				mostrarError(`Error al eliminar línea: ${error.message}`);
			}
		}
	};

	/**
	 * @function crearParada
	 * @description Crea una nueva parada
	 * @param {Object} datosParada - Datos de la parada a crear
	 */
	const crearParada = (datosParada) => {
		try {
			avilesaService.agregarParada(datosParada);
			mostrarExito(`Parada ${datosParada.numero} creada correctamente`);
			navegarA("detalle", { linea: lineaSeleccionada });
		} catch (error) {
			mostrarError(`Error al crear parada: ${error.message}`);
		}
	};

	/**
	 * @function actualizarParada
	 * @description Actualiza una parada existente
	 * @param {Object} datosParada - Datos actualizados de la parada
	 */
	const actualizarParada = (datosParada) => {
		try {
			avilesaService.actualizarParada(paradaSeleccionada.numero, paradaSeleccionada.numeroLinea, datosParada);
			mostrarExito(`Parada ${datosParada.numero} actualizada correctamente`);
			navegarA("detalle", { linea: lineaSeleccionada });
		} catch (error) {
			mostrarError(`Error al actualizar parada: ${error.message}`);
		}
	};

	/**
	 * @function eliminarParada
	 * @description Elimina una parada
	 * @param {number} numeroParada - Número de la parada a eliminar
	 * @param {number} numeroLinea - Número de la línea de la parada
	 */
	const eliminarParada = (numeroParada, numeroLinea) => {
		if (window.confirm(`¿Está seguro de eliminar la parada ${numeroParada}?`)) {
			try {
				avilesaService.eliminarParada(numeroParada, numeroLinea);
				mostrarExito(`Parada ${numeroParada} eliminada correctamente`);
				navegarA("detalle", { linea: lineaSeleccionada });
			} catch (error) {
				mostrarError(`Error al eliminar parada: ${error.message}`);
			}
		}
	};

	/**
	 * @function cargarDatosDePrueba
	 * @description Carga datos de prueba en la aplicación
	 */
	const cargarDatosDePrueba = () => {
		if (window.confirm("¿Está seguro de cargar los datos de prueba? Se borrarán todos los datos actuales.")) {
			try {
				avilesaService.cargarDatosDePrueba();
				cargarLineas();
				mostrarExito("Datos de prueba cargados correctamente");
			} catch (error) {
				mostrarError(`Error al cargar datos de prueba: ${error.message}`);
			}
		}
	};

	// ===== RENDER =====

	/**
	 * @function renderizarContenido
	 * @description Renderiza el contenido según la vista actual
	 * @returns {JSX.Element} Contenido a mostrar
	 */
	const renderizarContenido = () => {
		switch (vista) {
			case "inicio":
				return (
					<div className="pagina-inicio">
						<h2>Bienvenido al Sistema de Gestión de AVILESA</h2>
						<p>Seleccione una de las siguientes opciones:</p>

						<div className="opciones-menu">
							<div
								className="opcion-menu"
								onClick={() => navegarA("listado")}>
								<div className="opcion-icono">🚌</div>
								<h3>Gestión de Líneas</h3>
								<p>Crear, editar, eliminar y consultar líneas de autobús</p>
							</div>

							<div
								className="opcion-menu"
								onClick={() => navegarA("paradas")}>
								<div className="opcion-icono">🚏</div>
								<h3>Gestión de Paradas</h3>
								<p>Administrar las paradas de todas las líneas</p>
							</div>

							<div
								className="opcion-menu"
								onClick={() => navegarA("detallesLineas")}>
								<div className="opcion-icono">📋</div>
								<h3>Detalle de Líneas</h3>
								<p>Consultar el detalle y paradas de cada línea</p>
							</div>
						</div>
					</div>
				);

			case "paradas":
				return (
					<div className="gestion-paradas">
						<div className="acciones-detalle">
							<button
								className="btn-cancelar"
								onClick={() => navegarA("inicio")}>
								Volver al Inicio
							</button>
						</div>
						<h2>Gestión de Paradas</h2>

						<div className="selector-linea">
							<h3>Seleccione una línea para gestionar sus paradas:</h3>
							<div className="lista-lineas-selector">
								{lineas.length > 0 ? (
									lineas.map((linea) => (
										<div
											key={linea.numero}
											className="linea-item"
											onClick={() => navegarA("detalle", { linea })}>
											<h4>Línea {linea.numero}</h4>
											<p>
												{linea.origen} → {linea.destino}
											</p>
										</div>
									))
								) : (
									<p className="no-lineas">No hay líneas disponibles. Cree una línea primero.</p>
								)}
							</div>
						</div>
					</div>
				);

			case "detallesLineas":
				return (
					<div className="detalles-lineas">
						<div className="acciones-detalle">
							<button
								className="btn-cancelar"
								onClick={() => navegarA("inicio")}>
								Volver al Inicio
							</button>
						</div>
						<h2>Consulta de Detalles de Líneas</h2>

						<div className="selector-linea">
							<h3>Seleccione una línea para ver su detalle:</h3>
							<div className="lista-lineas-selector">
								{lineas.length > 0 ? (
									lineas.map((linea) => (
										<div
											key={linea.numero}
											className="linea-item"
											onClick={() => navegarA("detalle", { linea })}>
											<h4>Línea {linea.numero}</h4>
											<p>
												{linea.origen} → {linea.destino}
											</p>
											<p className="horario">
												Salida: {linea.horaSalida} | Intervalo: {linea.intervalo}
											</p>
										</div>
									))
								) : (
									<p className="no-lineas">No hay líneas disponibles. Cree una línea primero.</p>
								)}
							</div>
						</div>
					</div>
				);

			case "listado":
				return (
					<>
						<div className="acciones-detalle">
							<button
								className="btn-cancelar"
								onClick={() => navegarA("inicio")}>
								Volver al Inicio
							</button>
						</div>
						<ListadoLineas
							lineas={lineas}
							onVerDetalle={(linea) => navegarA("detalle", { linea })}
							onEditar={(linea) => navegarA("editarLinea", { linea })}
							onEliminar={eliminarLinea}
							onNuevaLinea={() => navegarA("nuevaLinea")}
						/>
					</>
				);

			case "nuevaLinea":
				return (
					<FormLinea
						onGuardar={crearLinea}
						onCancelar={() => navegarA("listado")}
					/>
				);

			case "editarLinea":
				return (
					<FormLinea
						linea={lineaSeleccionada}
						onGuardar={actualizarLinea}
						onCancelar={() => navegarA("listado")}
					/>
				);

			case "detalle":
				return (
					<DetalleLinea
						linea={lineaSeleccionada}
						obtenerParadas={() =>
							avilesaService.obtenerParadasOrdenadasPorIntervalo(lineaSeleccionada.numero)
						}
						onNuevaParada={() => navegarA("nuevaParada", { linea: lineaSeleccionada })}
						onEditarParada={(parada) => navegarA("editarParada", { linea: lineaSeleccionada, parada })}
						onEliminarParada={eliminarParada}
						onVolver={() => navegarA("listado")}
					/>
				);

			case "nuevaParada":
				return (
					<FormParada
						numeroLinea={lineaSeleccionada.numero}
						onGuardar={crearParada}
						onCancelar={() => navegarA("detalle", { linea: lineaSeleccionada })}
					/>
				);

			case "editarParada":
				return (
					<FormParada
						parada={paradaSeleccionada}
						numeroLinea={lineaSeleccionada.numero}
						onGuardar={actualizarParada}
						onCancelar={() => navegarA("detalle", { linea: lineaSeleccionada })}
					/>
				);

			default:
				return <div>Vista no encontrada</div>;
		}
	};

	return (
		<div className="avilesa-app">
			<header className="app-header">
				<h1>AVILESA - Gestión de Líneas de Autobuses</h1>
				<nav className="app-nav">
					<button onClick={() => navegarA("inicio")}>Inicio</button>
					<button onClick={() => navegarA("listado")}>Gestión de Líneas</button>
					<button onClick={() => navegarA("paradas")}>Gestión de Paradas</button>
					<button onClick={() => navegarA("detallesLineas")}>Detalle de Líneas</button>
					<button onClick={cargarDatosDePrueba}>Cargar Datos de Prueba</button>
				</nav>
			</header>

			{(mensajeExito || mensajeError) && (
				<div className={`mensaje ${mensajeExito ? "exito" : "error"}`}>{mensajeExito || mensajeError}</div>
			)}

			<main className="app-content">{renderizarContenido()}</main>

			<footer className="app-footer">
				<p>AVILESA &copy; 2025 - Simulacro para examen DWEC</p>
			</footer>
		</div>
	);
}

export default AvilesaApp;
