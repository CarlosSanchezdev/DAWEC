/**
 * @fileoverview Aplicación para el cálculo de IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import React, { useState, useEffect } from "react";
import "./IMCApp.css";
import IMCService from "./models/IMCService";
import ListadoPersonas from "./components/ListadoPersonas";
import FormPersona from "./components/FormPersona";
import ResultadoIMC from "./components/ResultadoIMC";
import PersonasEnRiesgo from "./components/PersonasEnRiesgo";

/**
 * @function IMCApp
 * @description Componente principal que gestiona la aplicación de cálculo de IMC
 * @returns {JSX.Element} Componente principal de la aplicación
 *
 * IMPORTANTE: Este componente controla la navegación entre las diferentes vistas de la aplicación
 * utilizando un sistema de estado interno en lugar de un enrutador completo.
 */
function IMCApp() {
	// ===== HOOKS =====
	const [vista, setVista] = useState("inicio");
	const [personas, setPersonas] = useState([]);
	const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
	const [resultadosIMC, setResultadosIMC] = useState([]);
	const [personasEnRiesgo, setPersonasEnRiesgo] = useState([]);
	const [mensajeExito, setMensajeExito] = useState("");
	const [mensajeError, setMensajeError] = useState("");

	// Servicio de gestión de IMC
	const imcService = IMCService.getInstance();

	// ===== EFECTOS =====
	/**
	 * Efecto para cargar las personas al iniciar
	 */
	useEffect(() => {
		cargarPersonas();
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

	// ===== FUNCIONES AUXILIARES =====

	/**
	 * @function cargarPersonas
	 * @description Carga las personas desde el servicio
	 */
	const cargarPersonas = () => {
		try {
			const personasCargadas = imcService.obtenerPersonas();
			setPersonas(personasCargadas);
		} catch (error) {
			mostrarError(`Error al cargar personas: ${error.message}`);
		}
	};

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

		if (parametros.persona !== undefined) {
			setPersonaSeleccionada(parametros.persona);
		}
	};

	/**
	 * @function agregarPersona
	 * @description Agrega una nueva persona
	 * @param {Object} datosPersona - Datos de la persona a agregar
	 */
	const agregarPersona = (datosPersona) => {
		try {
			imcService.agregarPersona(datosPersona);
			cargarPersonas();
			mostrarExito(`Persona ${datosPersona.nombre} agregada correctamente`);
			navegarA("listado");
		} catch (error) {
			mostrarError(`Error al agregar persona: ${error.message}`);
		}
	};

	/**
	 * @function modificarPersona
	 * @description Modifica una persona existente
	 * @param {Object} datosPersona - Datos actualizados de la persona
	 */
	const modificarPersona = (datosPersona) => {
		try {
			imcService.modificarPersona(datosPersona.nombre, datosPersona);
			cargarPersonas();
			mostrarExito(`Persona ${datosPersona.nombre} modificada correctamente`);
			navegarA("listado");
		} catch (error) {
			mostrarError(`Error al modificar persona: ${error.message}`);
		}
	};

	/**
	 * @function calcularIMC
	 * @description Calcula el IMC de todas las personas y clasifica quiénes tienen riesgo
	 */
	const calcularIMC = () => {
		try {
			const resultados = imcService.calcularIMCTodasPersonas();
			setResultadosIMC(resultados);

			// Filtrar personas con peso no normal
			const personasRiesgo = resultados.filter((r) => r.categoria !== "normal");
			setPersonasEnRiesgo(personasRiesgo);

			mostrarExito("IMC calculado correctamente para todas las personas");
			navegarA("resultados");
		} catch (error) {
			mostrarError(`Error al calcular IMC: ${error.message}`);
		}
	};

	/**
	 * @function cargarDatosDePrueba
	 * @description Carga datos de prueba en la aplicación
	 */
	const cargarDatosDePrueba = () => {
		if (window.confirm("¿Está seguro de cargar los datos de prueba? Se borrarán todos los datos actuales.")) {
			try {
				imcService.cargarDatosDePrueba();
				cargarPersonas();
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
						<h2>Bienvenido a la Calculadora de IMC</h2>
						<p>Seleccione una de las siguientes opciones:</p>

						<div className="opciones-menu">
							<div
								className="opcion-menu"
								onClick={() => navegarA("listado")}>
								<div className="opcion-icono">👤</div>
								<h3>Gestión de Personas</h3>
								<p>Añadir y modificar información de personas</p>
							</div>

							<div
								className="opcion-menu"
								onClick={() => navegarA("nuevaPersona")}>
								<div className="opcion-icono">➕</div>
								<h3>Añadir Persona</h3>
								<p>Registrar una nueva persona para calcular su IMC</p>
							</div>

							<div
								className="opcion-menu"
								onClick={() => calcularIMC()}>
								<div className="opcion-icono">📊</div>
								<h3>Calcular IMC</h3>
								<p>Calcular y ver resultados de IMC para todas las personas</p>
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
						<ListadoPersonas
							personas={personas}
							onEditar={(persona) => navegarA("editarPersona", { persona })}
							onNuevaPersona={() => navegarA("nuevaPersona")}
							onCalcularIMC={calcularIMC}
						/>
					</>
				);

			case "nuevaPersona":
				return (
					<FormPersona
						onGuardar={agregarPersona}
						onCancelar={() => navegarA("listado")}
						titulo="Añadir Nueva Persona"
					/>
				);

			case "editarPersona":
				return (
					<FormPersona
						persona={personaSeleccionada}
						onGuardar={modificarPersona}
						onCancelar={() => navegarA("listado")}
						titulo="Modificar Persona"
					/>
				);

			case "resultados":
				return (
					<div className="resultados-container">
						<div className="acciones-detalle">
							<button
								className="btn-cancelar"
								onClick={() => navegarA("inicio")}>
								Volver al Inicio
							</button>
						</div>
						<ResultadoIMC
							resultados={resultadosIMC}
							titulo="Resultados del IMC"
						/>

						{personasEnRiesgo.length > 0 && (
							<PersonasEnRiesgo
								personasRiesgo={personasEnRiesgo}
								titulo="Personas con Riesgo de Salud"
							/>
						)}
					</div>
				);

			default:
				return <div>Vista no encontrada</div>;
		}
	};

	return (
		<div className="imc-app">
			<header className="app-header">
				<h1>Calculadora de IMC</h1>
				<nav className="app-nav">
					<button onClick={() => navegarA("inicio")}>Inicio</button>
					<button onClick={() => navegarA("listado")}>Gestión de Personas</button>
					<button onClick={() => navegarA("nuevaPersona")}>Añadir Persona</button>
					<button onClick={calcularIMC}>Calcular IMC</button>
					<button onClick={cargarDatosDePrueba}>Cargar Datos de Prueba</button>
				</nav>
			</header>

			{(mensajeExito || mensajeError) && (
				<div className={`mensaje ${mensajeExito ? "exito" : "error"}`}>{mensajeExito || mensajeError}</div>
			)}

			<main className="app-content">{renderizarContenido()}</main>

			<footer className="app-footer">
				<p>Calculadora de IMC &copy; 2025 - Simulacro 4 para examen DWEC</p>
			</footer>
		</div>
	);
}

export default IMCApp;
