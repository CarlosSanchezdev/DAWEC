/**
 * @fileoverview Componentes para el Gestor de Tareas
 * @ejercicio Ej05_Context_Reducers
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 20/05/2025
 */

import { useContext, useState } from "react";
import { TareaContext, ACTIONS } from "./TareaContext";

/**
 * @function FormularioTarea
 * @description Componente para agregar nuevas tareas
 * @returns {JSX.Element} Formulario para añadir tareas
 */
export function FormularioTarea() {
	const { dispatch } = useContext(TareaContext);
	const [texto, setTexto] = useState("");
	const [prioridad, setPrioridad] = useState("normal");

	/**
	 * @function agregarTarea
	 * @description Maneja la creación de una nueva tarea
	 * @param {React.FormEvent} e - Evento de submit del formulario
	 */
	const agregarTarea = (e) => {
		e.preventDefault();
		if (texto.trim() === "") return;

		dispatch({
			type: ACTIONS.AGREGAR_TAREA,
			payload: { texto, prioridad },
		});

		setTexto("");
		setPrioridad("normal");
	};

	return (
		<form
			className="tarea-form"
			onSubmit={agregarTarea}>
			<input
				type="text"
				value={texto}
				onChange={(e) => setTexto(e.target.value)}
				placeholder="Escribe una nueva tarea..."
				className="tarea-input"
			/>

			<select
				value={prioridad}
				onChange={(e) => setPrioridad(e.target.value)}
				className="tarea-select">
				<option value="baja">Baja</option>
				<option value="normal">Normal</option>
				<option value="alta">Alta</option>
			</select>

			<button
				type="submit"
				className="tarea-btn">
				Agregar
			</button>
		</form>
	);
}

/**
 * @function Tarea
 * @description Componente para representar una tarea individual
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.tarea - Datos de la tarea
 * @returns {JSX.Element} Componente de tarea
 */
export function Tarea({ tarea }) {
	const { dispatch } = useContext(TareaContext);
	const [editando, setEditando] = useState(false);
	const [textoEditado, setTextoEditado] = useState(tarea.texto);

	/**
	 * @function handleCompletarTarea
	 * @description Maneja el cambio de estado completado/pendiente
	 */
	const handleCompletarTarea = () => {
		dispatch({
			type: ACTIONS.COMPLETAR_TAREA,
			payload: { id: tarea.id },
		});
	};

	/**
	 * @function handleEliminarTarea
	 * @description Maneja la eliminación de una tarea
	 */
	const handleEliminarTarea = () => {
		dispatch({
			type: ACTIONS.ELIMINAR_TAREA,
			payload: { id: tarea.id },
		});
	};

	/**
	 * @function handleGuardarEdicion
	 * @description Guarda los cambios realizados en la edición
	 */
	const handleGuardarEdicion = () => {
		if (textoEditado.trim() === "") return;

		dispatch({
			type: ACTIONS.ACTUALIZAR_TAREA,
			payload: {
				id: tarea.id,
				cambios: { texto: textoEditado },
			},
		});

		setEditando(false);
	};

	// Clases condicionales según estado y prioridad
	const tareaClase = `tarea-item ${tarea.completada ? "completada" : ""} prioridad-${tarea.prioridad}`;

	return (
		<div className={tareaClase}>
			{editando ? (
				<div className="tarea-edicion">
					<input
						type="text"
						value={textoEditado}
						onChange={(e) => setTextoEditado(e.target.value)}
						className="tarea-input-edicion"
					/>
					<button
						onClick={handleGuardarEdicion}
						className="tarea-btn-guardar">
						Guardar
					</button>
					<button
						onClick={() => setEditando(false)}
						className="tarea-btn-cancelar">
						Cancelar
					</button>
				</div>
			) : (
				<>
					<div className="tarea-contenido">
						<input
							type="checkbox"
							checked={tarea.completada}
							onChange={handleCompletarTarea}
							className="tarea-checkbox"
						/>
						<span className="tarea-texto">{tarea.texto}</span>
						<span className="tarea-prioridad">
							{tarea.prioridad === "alta" ? "⚠️ Alta" : tarea.prioridad === "baja" ? "🔽 Baja" : "Normal"}
						</span>
					</div>

					<div className="tarea-acciones">
						<button
							onClick={() => setEditando(true)}
							className="tarea-btn-editar">
							Editar
						</button>
						<button
							onClick={handleEliminarTarea}
							className="tarea-btn-eliminar">
							Eliminar
						</button>
					</div>
				</>
			)}
		</div>
	);
}

/**
 * @function FiltroTareas
 * @description Componente para filtrar tareas por estado
 * @returns {JSX.Element} Filtros de tareas
 */
export function FiltroTareas() {
	const { state, dispatch } = useContext(TareaContext);

	/**
	 * @function cambiarFiltro
	 * @description Actualiza el filtro de tareas
	 * @param {string} filtro - Nuevo valor de filtro
	 */
	const cambiarFiltro = (filtro) => {
		dispatch({
			type: ACTIONS.FILTRAR_TAREAS,
			payload: { filtro },
		});
	};

	return (
		<div className="filtro-contenedor">
			<button
				className={`filtro-btn ${state.filtro === "todas" ? "activo" : ""}`}
				onClick={() => cambiarFiltro("todas")}>
				Todas
			</button>
			<button
				className={`filtro-btn ${state.filtro === "pendientes" ? "activo" : ""}`}
				onClick={() => cambiarFiltro("pendientes")}>
				Pendientes
			</button>
			<button
				className={`filtro-btn ${state.filtro === "completadas" ? "activo" : ""}`}
				onClick={() => cambiarFiltro("completadas")}>
				Completadas
			</button>
		</div>
	);
}

/**
 * @function ListaTareas
 * @description Componente que muestra la lista de tareas filtradas
 * @returns {JSX.Element} Lista de tareas
 */
export function ListaTareas() {
	const { state } = useContext(TareaContext);

	// Filtrar tareas según el filtro seleccionado
	const tareasFiltradas = state.tareas.filter((tarea) => {
		if (state.filtro === "todas") return true;
		if (state.filtro === "completadas") return tarea.completada;
		if (state.filtro === "pendientes") return !tarea.completada;
		return true;
	});

	// Contar tareas
	const tareasCompletadas = state.tareas.filter((tarea) => tarea.completada).length;
	const tareasTotales = state.tareas.length;

	return (
		<div className="lista-tareas-contenedor">
			<div className="lista-tareas-estadisticas">
				<p>
					Completadas: {tareasCompletadas} de {tareasTotales}
				</p>
				<progress
					value={tareasTotales > 0 ? tareasCompletadas / tareasTotales : 0}
					max="1"></progress>
			</div>

			{tareasFiltradas.length > 0 ? (
				<div className="lista-tareas">
					{tareasFiltradas.map((tarea) => (
						<Tarea
							key={tarea.id}
							tarea={tarea}
						/>
					))}
				</div>
			) : (
				<p className="lista-tareas-vacia">No hay tareas {state.filtro !== "todas" && `${state.filtro}`}</p>
			)}
		</div>
	);
}

/**
 * @function EstadisticasTareas
 * @description Componente que muestra estadísticas de las tareas
 * @returns {JSX.Element} Estadísticas sobre tareas
 */
export function EstadisticasTareas() {
	const { state } = useContext(TareaContext);

	// Cálculo de estadísticas
	const tareasCompletadas = state.tareas.filter((tarea) => tarea.completada).length;
	const tareasPendientes = state.tareas.length - tareasCompletadas;

	// Cálculo por prioridades
	const tareasPrioridadAlta = state.tareas.filter((tarea) => tarea.prioridad === "alta").length;
	const tareasPrioridadNormal = state.tareas.filter((tarea) => tarea.prioridad === "normal").length;
	const tareasPrioridadBaja = state.tareas.filter((tarea) => tarea.prioridad === "baja").length;

	return (
		<div className="estadisticas-contenedor">
			<h4>Estadísticas</h4>

			<div className="estadisticas-grid">
				<div className="estadistica-item">
					<span className="estadistica-valor">{state.tareas.length}</span>
					<span className="estadistica-etiqueta">Total</span>
				</div>

				<div className="estadistica-item">
					<span className="estadistica-valor">{tareasCompletadas}</span>
					<span className="estadistica-etiqueta">Completadas</span>
				</div>

				<div className="estadistica-item">
					<span className="estadistica-valor">{tareasPendientes}</span>
					<span className="estadistica-etiqueta">Pendientes</span>
				</div>
			</div>

			<h5>Por prioridad</h5>
			<div className="estadisticas-prioridad">
				<div className="estadistica-barra">
					<div className="estadistica-etiqueta">Alta</div>
					<div className="barra-contenedor">
						<div
							className="barra barra-alta"
							style={{
								width: `${
									state.tareas.length ? (tareasPrioridadAlta / state.tareas.length) * 100 : 0
								}%`,
							}}>
							{tareasPrioridadAlta}
						</div>
					</div>
				</div>

				<div className="estadistica-barra">
					<div className="estadistica-etiqueta">Normal</div>
					<div className="barra-contenedor">
						<div
							className="barra barra-normal"
							style={{
								width: `${
									state.tareas.length ? (tareasPrioridadNormal / state.tareas.length) * 100 : 0
								}%`,
							}}>
							{tareasPrioridadNormal}
						</div>
					</div>
				</div>

				<div className="estadistica-barra">
					<div className="estadistica-etiqueta">Baja</div>
					<div className="barra-contenedor">
						<div
							className="barra barra-baja"
							style={{
								width: `${
									state.tareas.length ? (tareasPrioridadBaja / state.tareas.length) * 100 : 0
								}%`,
							}}>
							{tareasPrioridadBaja}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

/**
 * @function GestorTareas
 * @description Componente principal que integra todos los componentes de tareas
 * @returns {JSX.Element} Aplicación de gestión de tareas
 */
export function GestorTareas() {
	return (
		<div className="gestor-tareas">
			<div className="gestor-tareas-contenido">
				<div className="gestor-tareas-principal">
					<FormularioTarea />
					<FiltroTareas />
					<ListaTareas />
				</div>

				<div className="gestor-tareas-sidebar">
					<EstadisticasTareas />
				</div>
			</div>
		</div>
	);
}
