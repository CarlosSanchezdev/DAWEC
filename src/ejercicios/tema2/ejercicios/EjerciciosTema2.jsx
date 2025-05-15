/**
 * @fileoverview Ejercicios del Tema 2: JavaScript Sintaxis Básica
 * @version 1.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import Ej01_HolaMundo from "./Ej01_HolaMundo/Ej01_HolaMundo";
import Ej02_ScriptExterno from "./Ej02_ScriptExterno/Ej02_ScriptExterno";
import Ej03_ConsoleLog from "./Ej03_ConsoleLog/Ej03_ConsoleLog";
import Ej04_Comentarios from "./Ej04_Comentarios/Ej04_Comentarios";
import Ej05_Variables from "./Ej05_Variables/Ej05_Variables";
import Ej06_TiposDatos from "./Ej06_TiposDatos/Ej06_TiposDatos";
import Ej07_ConversionTipos from "./Ej07_ConversionTipos/Ej07_ConversionTipos";
import Ej08_Constantes from "./Ej08_Constantes/Ej08_Constantes";
import Ej09_AmbitoVariables from "./Ej09_AmbitoVariables/Ej09_AmbitoVariables";
import Ej10_OperadoresAritmeticos from "./Ej10_OperadoresAritmeticos/Ej10_OperadoresAritmeticos";
import Ej11_OperadoresComparacion from "./Ej11_OperadoresComparacion/Ej11_OperadoresComparacion";
import Ej12_OperadoresLogicos from "./Ej12_OperadoresLogicos/Ej12_OperadoresLogicos";
import Ej13_Arrays from "./Ej13_Arrays/Ej13_Arrays";
import Ej14_Objetos from "./Ej14_Objetos/Ej14_Objetos";
import Ej15_Desestructuracion from "./Ej15_Desestructuracion/Ej15_Desestructuracion";
import Ej16_FuncionesFlecha from "./Ej16_FuncionesFlecha/Ej16_FuncionesFlecha";
import Ej17_Promesas from "./Ej17_Promesas/Ej17_Promesas";
import Ej18_MapSet from "./Ej18_MapSet/Ej18_MapSet";
import Ej19_TemplateLiterals from "./Ej19_TemplateLiterals/Ej19_TemplateLiterals";
import Ej20_SpreadRest from "./Ej20_SpreadRest/Ej20_SpreadRest";
import Ej21_IfElse from "./Ej21_IfElse/Ej21_IfElse";
import Ej22_Switch from "./Ej22_Switch/Ej22_Switch";
import Ej23_BucleFor from "./Ej23_BucleFor/Ej23_BucleFor";
import Ej24_WhileDoWhile from "./Ej24_WhileDoWhile/Ej24_WhileDoWhile";
import Ej25_TryCatch from "./Ej25_TryCatch/Ej25_TryCatch";
import Ej26_EventosCallbacks from "./Ej26_EventosCallbacks/Ej26_EventosCallbacks";
import Ej27_ExpresionesRegulares from "./Ej27_ExpresionesRegulares/Ej27_ExpresionesRegulares";
import Ej28_Generadores from "./Ej28_Generadores/Ej28_Generadores";
import Ej29_Modulos from "./Ej29_Modulos/Ej29_Modulos";
import Ej30_Depuracion from "./Ej30_Depuracion/Ej30_Depuracion";
import "./ejercicios.css";

const ejercicios = [
	{
		id: "2.1",
		titulo: "Hola Mundo JS",
		componente: Ej01_HolaMundo,
		enunciado: "Mostrar el mensaje 'Hola mundo JS' en una ventana.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["alert()"],
	},
	{
		id: "2.2",
		titulo: "Script Externo",
		componente: Ej02_ScriptExterno,
		enunciado: "Realizar el mismo ejercicio, pero haciendo una llamada a un archivo .js externo.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["script externo", "vinculación de archivos"],
	},
	{
		id: "2.3",
		titulo: "Console.log",
		componente: Ej03_ConsoleLog,
		enunciado: "Explorar diferentes formas de usar console.log y otros métodos de la consola para debugging.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["console.log", "debugging", "console.table", "console.error", "console.warn"],
	},
	{
		id: "2.4",
		titulo: "Comentarios",
		componente: Ej04_Comentarios,
		enunciado: "Explorar los diferentes tipos de comentarios disponibles en JavaScript y sus usos.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["comentarios", "documentación", "JSDoc"],
	},
	{
		id: "2.5",
		titulo: "Variables",
		componente: Ej05_Variables,
		enunciado: "Explorar las diferentes formas de declarar variables en JavaScript: var, let y const.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["var", "let", "const", "scope", "hoisting"],
	},
	{
		id: "2.6",
		titulo: "Tipos de Datos",
		componente: Ej06_TiposDatos,
		enunciado: "Explorar los diferentes tipos de datos disponibles en JavaScript y cómo verificarlos.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["tipos de datos", "typeof", "Array.isArray", "instanceof"],
	},
	{
		id: "2.7",
		titulo: "Conversión de Tipos",
		componente: Ej07_ConversionTipos,
		enunciado: "Explorar las diferentes formas de convertir entre tipos de datos en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["type casting", "coerción", "conversión implícita", "conversión explícita"],
	},
	{
		id: "2.8",
		titulo: "Constantes",
		componente: Ej08_Constantes,
		enunciado: "Explorar el uso de constantes en JavaScript y la inmutabilidad.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["const", "inmutabilidad", "Object.freeze", "mutabilidad de objetos"],
	},
	{
		id: "2.9",
		titulo: "Ámbito de Variables",
		componente: Ej09_AmbitoVariables,
		enunciado: "Explorar los diferentes ámbitos de variables en JavaScript y conceptos relacionados.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["scope", "closure", "hoisting", "var vs let vs const", "ámbito global", "ámbito local"],
	},
	{
		id: "2.10",
		titulo: "Operadores Aritméticos",
		componente: Ej10_OperadoresAritmeticos,
		enunciado: "Explorar los diferentes operadores aritméticos disponibles en JavaScript.",
		estado: "completado",
		dificultad: "básica",
		conceptos: [
			"operadores aritméticos",
			"incremento/decremento",
			"asignación",
			"precedencia",
			"números especiales",
		],
	},
	{
		id: "2.11",
		titulo: "Operadores de Comparación",
		componente: Ej11_OperadoresComparacion,
		enunciado: "Explorar los diferentes operadores de comparación en JavaScript y sus peculiaridades.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["operadores de comparación", "igualdad estricta", "coerción", "comparación de objetos"],
	},
	{
		id: "2.12",
		titulo: "Operadores Lógicos",
		componente: Ej12_OperadoresLogicos,
		enunciado: "Explorar los operadores lógicos en JavaScript y su uso en expresiones booleanas.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["operadores lógicos", "AND", "OR", "NOT", "cortocircuito"],
	},
	{
		id: "2.13",
		titulo: "Arrays",
		componente: Ej13_Arrays,
		enunciado: "Introducción a los arrays en JavaScript: creación, acceso y métodos básicos.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["arrays", "length", "push", "pop", "shift", "unshift", "indexOf"],
	},
	{
		id: "2.14",
		titulo: "Objetos",
		componente: Ej14_Objetos,
		enunciado: "Introducción a los objetos en JavaScript: creación, acceso y métodos básicos.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["objetos", "propiedades", "métodos", "this", "JSON"],
	},
	{
		id: "2.15",
		titulo: "Desestructuración",
		componente: Ej15_Desestructuracion,
		enunciado: "Explorar la desestructuración de arrays y objetos en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["desestructuración", "spread operator", "rest operator", "asignación múltiple"],
	},
	{
		id: "2.16",
		titulo: "Funciones Flecha",
		componente: Ej16_FuncionesFlecha,
		enunciado: "Explorar las funciones flecha (arrow functions) y sus características.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["funciones flecha", "sintaxis corta", "this léxico"],
	},
	{
		id: "2.17",
		titulo: "Promesas",
		componente: Ej17_Promesas,
		enunciado: "Introducción a las promesas en JavaScript: creación y manejo básico.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["promesas", "then", "catch", "finally", "encadenamiento"],
	},
	{
		id: "2.18",
		titulo: "Map y Set",
		componente: Ej18_MapSet,
		enunciado: "Explorar las estructuras de datos Map y Set en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["Map", "Set", "métodos de Map", "métodos de Set", "iteración"],
	},
	{
		id: "2.19",
		titulo: "Template Literals",
		componente: Ej19_TemplateLiterals,
		enunciado: "Explorar los template literals y su uso en la interpolación de cadenas.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["template literals", "backticks", "expresiones embebidas"],
	},
	{
		id: "2.20",
		titulo: "Spread y Rest",
		componente: Ej20_SpreadRest,
		enunciado: "Explorar los operadores spread y rest en JavaScript.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["spread operator", "rest operator", "parámetros variables", "copiar y combinar arrays/objetos"],
	},
	{
		id: "2.21",
		titulo: "If/Else",
		componente: Ej21_IfElse,
		enunciado: "Explorar las estructuras condicionales if/else en JavaScript.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["if", "else", "else if", "operadores de comparación", "condiciones múltiples"],
	},
	{
		id: "2.22",
		titulo: "Switch",
		componente: Ej22_Switch,
		enunciado: "Explorar la estructura de control switch en JavaScript.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["switch", "case", "break", "default", "fall-through"],
	},
	{
		id: "2.23",
		titulo: "Bucle For",
		componente: Ej23_BucleFor,
		enunciado: "Explorar los diferentes tipos de bucles for en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["for", "for...in", "for...of", "forEach", "iteración"],
	},
	{
		id: "2.24",
		titulo: "While y Do...While",
		componente: Ej24_WhileDoWhile,
		enunciado: "Explorar los bucles while y do...while en JavaScript.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["while", "do...while", "break", "continue", "condición de salida"],
	},
	{
		id: "2.25",
		titulo: "Try/Catch",
		componente: Ej25_TryCatch,
		enunciado: "Explorar el manejo de errores en JavaScript con try/catch.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["try", "catch", "finally", "throw", "Error", "tipos de errores"],
	},
	{
		id: "2.26",
		titulo: "Eventos y Callbacks",
		componente: Ej26_EventosCallbacks,
		enunciado: "Explorar el manejo de eventos y callbacks en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["eventos", "callbacks", "addEventListener", "removeEventListener", "event object"],
	},
	{
		id: "2.27",
		titulo: "Expresiones Regulares",
		componente: Ej27_ExpresionesRegulares,
		enunciado: "Explorar el uso de expresiones regulares en JavaScript.",
		estado: "completado",
		dificultad: "avanzada",
		conceptos: ["regex", "patrones", "match", "test", "replace", "grupos", "metacaracteres"],
	},
	{
		id: "2.28",
		titulo: "Generadores e Iteradores",
		componente: Ej28_Generadores,
		enunciado: "Explorar generadores e iteradores en JavaScript.",
		estado: "completado",
		dificultad: "avanzada",
		conceptos: ["generators", "iterators", "yield", "Symbol.iterator", "for...of"],
	},
	{
		id: "2.29",
		titulo: "Módulos",
		componente: Ej29_Modulos,
		enunciado: "Explorar el sistema de módulos en JavaScript.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["import", "export", "modules", "default export", "named exports"],
	},
	{
		id: "2.30",
		titulo: "Depuración y Herramientas",
		componente: Ej30_Depuracion,
		enunciado: "Explorar las técnicas de depuración y herramientas de desarrollo en JavaScript.",
		estado: "completado",
		dificultad: "avanzada",
		conceptos: ["debugging", "console", "devtools", "errores", "stack trace", "breakpoints"],
	},
];

// Agrupación de ejercicios por secciones
const secciones = {
	"Sintaxis Básica": ejercicios.slice(0, 4), // Ej01-Ej04
	"Variables y Tipos": ejercicios.slice(4, 9), // Ej05-Ej09
	Operadores: ejercicios.slice(9, 13), // Ej10-Ej13
	"Objetos y Arrays": ejercicios.slice(13, 15), // Ej14-Ej15
	"Funciones Avanzadas": ejercicios.slice(15, 17), // Ej16-Ej17
	"Estructuras de Control": ejercicios.slice(20, 25), // Ej21-Ej25
	"Eventos y Patrones": ejercicios.slice(25, 27), // Ej26-Ej27
	"Características ES6+": ejercicios.slice(17, 20).concat(ejercicios.slice(27, 29)), // Ej18-Ej20, Ej28-Ej29
	"Depuración y Desarrollo": ejercicios.slice(29), // Ej30
};

// Contadores y estadísticas
const estadisticas = {
	total: ejercicios.length,
	completados: ejercicios.filter((ej) => ej.estado === "completado").length,
	porSeccion: Object.entries(secciones).reduce(
		(acc, [seccion, ejercicios]) => ({
			...acc,
			[seccion]: {
				total: ejercicios.length,
				completados: ejercicios.filter((ej) => ej.estado === "completado").length,
			},
		}),
		{}
	),
};

/**
 * @function EjerciciosTema2
 * @description Componente que muestra todos los ejercicios del Tema 2
 * @param {Object} props Props del componente
 * @param {boolean} props.mostrarEjerciciosBasicos Si es true, muestra los ejercicios básicos 2.0 (2.1-2.55)
 */
function EjerciciosTema2({ mostrarEjerciciosBasicos }) {
	const [filtro, setFiltro] = useState("todos");
	const [busqueda, setBusqueda] = useState("");
	const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

	// Esta función se usa directamente en el filtrado de ejercicios por sección
	const filtrarEjercicio = (ejercicio) => {
		const coincideBusqueda =
			ejercicio.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
			ejercicio.enunciado.toLowerCase().includes(busqueda.toLowerCase());

		if (filtro === "todos") return coincideBusqueda;
		return coincideBusqueda && ejercicio.estado === filtro;
	};

	// Si estamos mostrando los ejercicios básicos 2.0, necesitamos importar y mostrar el contenido del archivo Tema2.jsx
	if (mostrarEjerciciosBasicos) {
		return (
			<div className="ejercicios-container">
				<div className="navegacion">
					<Link
						to="/tema/2"
						className="nav-link">
						Tema 2
					</Link>
					<span className="nav-separator">›</span>
					<span className="nav-current">Básicos 2.0: JavaScript Fundamentals</span>
				</div>

				<header className="ejercicios-header">
					<h1>Ejercicios JavaScript Básicos 2.0</h1>
					<div className="filtros">
						<input
							type="text"
							placeholder="Buscar ejercicio..."
							value={busqueda}
							onChange={(e) => setBusqueda(e.target.value)}
							className="busqueda-input"
						/>
						<select
							value={filtro}
							onChange={(e) => setFiltro(e.target.value)}
							className="filtro-select">
							<option value="todos">Todos los ejercicios</option>
							<option value="completado">Completados</option>
							<option value="pendiente">Pendientes</option>
						</select>
					</div>
				</header>

				<div className="ejercicios-grid">
					{ejercicios.filter(filtrarEjercicio).map((ejercicio) => (
						<div
							key={ejercicio.id}
							className={`ejercicio-card ${ejercicio.estado}`}>
							<div className="ejercicio-header">
								<h3>Ejercicio {ejercicio.id}</h3>
								<span className={`estado ${ejercicio.estado}`}>{ejercicio.estado}</span>
							</div>
							<h4>{ejercicio.titulo}</h4>
							<p>{ejercicio.enunciado}</p>
							<div className="ejercicio-footer">
								<div className="conceptos">
									{ejercicio.conceptos.map((concepto, index) => (
										<span
											key={index}
											className="concepto-tag">
											{concepto}
										</span>
									))}
								</div>
								<span className={`nivel nivel-${ejercicio.dificultad}`}>{ejercicio.dificultad}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// Renderizado condicional para ejercicio individual
	if (ejercicioSeleccionado) {
		const Componente = ejercicioSeleccionado.componente;
		return (
			<div className="ejercicio-vista">
				<div className="navegacion">
					<Link
						to="/tema/2"
						className="nav-link">
						Tema 2
					</Link>
					<span className="nav-separator">›</span>
					<Link
						to="/tema/2/ejercicios"
						className="nav-link">
						Ejercicios
					</Link>
					<span className="nav-separator">›</span>
					<span className="nav-current">{ejercicioSeleccionado.titulo}</span>
				</div>
				<button
					onClick={() => setEjercicioSeleccionado(null)}
					className="volver-btn">
					← Volver a la lista
				</button>
				<Componente />
			</div>
		);
	}

	// Vista principal de ejercicios originales
	return (
		<div className="ejercicios-container">
			<div className="navegacion">
				<Link
					to="/tema/2"
					className="nav-link">
					Tema 2
				</Link>
				<span className="nav-separator">›</span>
				<span className="nav-current">JavaScript Básico: 30 Ejercicios</span>
			</div>

			<header className="ejercicios-header">
				<h1>Ejercicios JavaScript Básico</h1>
				<div className="progreso-global">
					<div className="progreso-texto">
						Progreso total: {estadisticas.completados} / {estadisticas.total}
					</div>
					<div className="progreso-barra">
						<div
							className="progreso-completado"
							style={{
								width: `${(estadisticas.completados / estadisticas.total) * 100}%`,
							}}></div>
					</div>
				</div>
				<div className="filtros">
					<input
						type="text"
						placeholder="Buscar ejercicio..."
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						className="busqueda-input"
					/>
					<select
						value={filtro}
						onChange={(e) => setFiltro(e.target.value)}
						className="filtro-select">
						<option value="todos">Todos los ejercicios</option>
						<option value="completado">Completados</option>
						<option value="pendiente">Pendientes</option>
					</select>
				</div>
			</header>

			<div className="secciones">
				{Object.entries(secciones).map(([nombreSeccion, ejerciciosSeccion]) => (
					<div
						key={nombreSeccion}
						className="seccion">
						<div className="seccion-header">
							<h2>{nombreSeccion}</h2>
							<div className="seccion-progreso">
								{estadisticas.porSeccion[nombreSeccion].completados} /{" "}
								{estadisticas.porSeccion[nombreSeccion].total}
							</div>
						</div>
						<div className="ejercicios-grid">
							{ejerciciosSeccion.filter(filtrarEjercicio).map((ejercicio) => (
								<div
									key={ejercicio.id}
									className={`ejercicio-card ${ejercicio.estado}`}
									onClick={() => setEjercicioSeleccionado(ejercicio)}>
									<div className="ejercicio-header">
										<h3>Ejercicio {ejercicio.id}</h3>
										<span className={`estado ${ejercicio.estado}`}>{ejercicio.estado}</span>
									</div>
									<h4>{ejercicio.titulo}</h4>
									<p>{ejercicio.enunciado}</p>
									<div className="ejercicio-footer">
										<div className="conceptos">
											{ejercicio.conceptos.map((concepto, index) => (
												<span
													key={index}
													className="concepto-tag">
													{concepto}
												</span>
											))}
										</div>
										<button className="btn-ver">Ver ejercicio</button>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default EjerciciosTema2;
