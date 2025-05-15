/**
 * @fileoverview Componente que gestiona los ejercicios básicos 2.0 del Tema 2
 * @fecha 14/05/2025
 * @ejercicio Ejercicios 2.1-2.55
 * @tema Tema 2: JavaScript Sintaxis Básica
 */

import { useState } from "react";
import "./EjerciciosBasicos.css";

// Importamos los componentes de los ejercicios
import Ej2_1_HolaMundo from "./soluciones/Ej01_Intro_JavaScript/Ej2_1_HolaMundo";
import Ej2_2_ArchivoExterno from "./soluciones/Ej01_Intro_JavaScript/Ej2_2_ArchivoExterno";
import Ej2_3_Division from "./soluciones/Ej01_Intro_JavaScript/Ej2_3_Division";
import Ej2_4_DiasVividos from "./soluciones/Ej01_Intro_JavaScript/Ej2_4_DiasVividos";
import Ej2_5_Multiplos from "./soluciones/Ej01_Intro_JavaScript/Ej2_5_Multiplos";
import Ej2_6_Correccion from "./soluciones/Ej01_Intro_JavaScript/Ej2_6_Correccion";
import Ej2_7_Circulo from "./soluciones/Ej01_Intro_JavaScript/Ej2_7_Circulo";
import Ej2_8_DatosPersonales from "./soluciones/Ej01_Intro_JavaScript/Ej2_8_DatosPersonales";
import Ej2_9_Referencias from "./soluciones/Ej01_Intro_JavaScript/Ej2_9_Referencias";
import Ej2_10_CuentaAtras from "./soluciones/Ej01_Intro_JavaScript/Ej2_10_CuentaAtras";
import Ej2_11_CuentaAtrasFor from "./soluciones/Ej01_Intro_JavaScript/Ej2_11_CuentaAtrasFor";
import Ej2_12_CuadradoAsteriscos from "./soluciones/Ej01_Intro_JavaScript/Ej2_12_CuadradoAsteriscos";
import Ej2_13_CalculadoraIVA from "./soluciones/Ej01_Intro_JavaScript/Ej2_13_CalculadoraIVA";
import Ej2_14_AdivinaNumero from "./soluciones/Ej01_Intro_JavaScript/Ej2_14_AdivinaNumero";
import Ej2_15_NotasSwitch from "./soluciones/Ej01_Intro_JavaScript/Ej2_15_NotasSwitch";
import Ej2_16_ManipulacionStrings from "./soluciones/Ej01_Intro_JavaScript/Ej2_16_ManipulacionStrings";
import Ej2_17_IncrementosDecrementos from "./soluciones/Ej01_Intro_JavaScript/Ej2_17_IncrementosDecrementos";
import Ej2_18_ColumnasNumericas from "./soluciones/Ej01_Intro_JavaScript/Ej2_18_ColumnasNumericas";
import Ej2_19_ConversorTemperatura from "./soluciones/Ej01_Intro_JavaScript/Ej2_19_ConversorTemperatura";
import Ej2_20_MenuMatematico from "./soluciones/Ej01_Intro_JavaScript/Ej2_20_MenuMatematico";
import Ej2_21_PorcentajeGenero from "./soluciones/Ej01_Intro_JavaScript/Ej2_21_PorcentajeGenero";
import Ej2_22_MediaAritmetica from "./soluciones/Ej01_Intro_JavaScript/Ej2_22_MediaAritmetica";
import Ej2_23_NumerosPares from "./soluciones/Ej01_Intro_JavaScript/Ej2_23_NumerosPares";
import Ej2_24_DiasMes from "./soluciones/Ej01_Intro_JavaScript/Ej2_24_DiasMes";
import Ej2_25_DobleNada from "./soluciones/Ej01_Intro_JavaScript/Ej2_25_DobleNada";
import Ej2_26_OrdenarNumeros from "./soluciones/Ej01_Intro_JavaScript/Ej2_26_OrdenarNumeros";
import Ej2_27_ValidarFecha from "./soluciones/Ej01_Intro_JavaScript/Ej2_27_ValidarFecha";
import Ej2_28_CondicionesVariables from "./soluciones/Ej01_Intro_JavaScript/Ej2_28_CondicionesVariables";
import Ej2_29_SumaSerie from "./soluciones/Ej01_Intro_JavaScript/Ej2_29_SumaSerie";
import Ej2_30_MasterMind from "./soluciones/Ej01_Intro_JavaScript/Ej2_30_MasterMind";

// Array con todos los ejercicios disponibles
const EJERCICIOS = [
	{
		id: "2.1",
		titulo: "Hola Mundo JS",
		componente: Ej2_1_HolaMundo,
		enunciado: 'Programa que muestra en una ventana el mensaje "Hola mundo JS".',
		estado: "completado",
		dificultad: "básica",
		conceptos: ["alert", "mensajes", "eventos", "funciones"],
	},
	{
		id: "2.2",
		titulo: "Archivo JS Externo",
		componente: Ej2_2_ArchivoExterno,
		enunciado: "Programa que utiliza un archivo JavaScript externo.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["script src", "archivo externo"],
	},
	{
		id: "2.3",
		titulo: "División",
		componente: Ej2_3_Division,
		enunciado: "Programa para dividir dos números, probar casos especiales.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["operaciones matemáticas", "validación", "división por cero"],
	},
	{
		id: "2.4",
		titulo: "Días Vividos",
		componente: Ej2_4_DiasVividos,
		enunciado: "Programa que calcula los días vividos basado en nombre y edad.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["operaciones matemáticas", "formularios", "validación", "eventos", "estados"],
	},
	{
		id: "2.5",
		titulo: "Múltiplos",
		componente: Ej2_5_Multiplos,
		enunciado: "Calcular el doble, el triple y el cuádruple de un número.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["operaciones matemáticas", "múltiplos", "validación"],
	},
	{
		id: "2.6",
		titulo: "Corrección de Programa",
		componente: Ej2_6_Correccion,
		enunciado: "Corregir errores en un programa que calcula el área de un triángulo.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["depuración", "sintaxis", "operaciones matemáticas"],
	},
	{
		id: "2.7",
		titulo: "Círculo y Circunferencia",
		componente: Ej2_7_Circulo,
		enunciado: "Calcular la longitud de una circunferencia y el área del círculo correspondiente.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["matemáticas", "constantes", "fórmulas geométricas"],
	},
	{
		id: "2.8",
		titulo: "Datos Personales",
		componente: Ej2_8_DatosPersonales,
		enunciado: "Programa que solicita nombre, apellido y población, presentando un mensaje formateado.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["entrada de datos", "concatenación", "formato de texto"],
	},
	{
		id: "2.9",
		titulo: "Referencias de Variables",
		componente: Ej2_9_Referencias,
		enunciado: "Ejercicio sobre el comportamiento de referencias entre variables tipo string.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["variables", "referencias", "tipos primitivos"],
	},
	{
		id: "2.10",
		titulo: "Cuenta Atrás While",
		componente: Ej2_10_CuentaAtras,
		enunciado: "Cuenta atrás desde un número dado usando bucle while.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["bucles", "while", "decrementos"],
	},
	{
		id: "2.11",
		titulo: "Cuenta Atrás For",
		componente: Ej2_11_CuentaAtrasFor,
		enunciado: "Misma cuenta atrás usando bucle for.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["bucles", "for", "decrementos"],
	},
	{
		id: "2.12",
		titulo: "Cuadrado de Asteriscos",
		componente: Ej2_12_CuadradoAsteriscos,
		enunciado: "Crear un cuadrado de asteriscos según tamaño ingresado.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["bucles anidados", "patrones", "salida formateada"],
	},
	{
		id: "2.13",
		titulo: "Calculadora de IVA",
		componente: Ej2_13_CalculadoraIVA,
		enunciado: "Calcular precio total con IVA según precio base e IVA ingresados.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["operaciones", "porcentajes", "entrada de datos"],
	},
	{
		id: "2.14",
		titulo: "Adivina el Número",
		componente: Ej2_14_AdivinaNumero,
		enunciado: "Juego para adivinar un número con 5 intentos, usando break.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["bucles", "break", "condicionales"],
	},
	{
		id: "2.15",
		titulo: "Notas con Switch",
		componente: Ej2_15_NotasSwitch,
		enunciado: "Convertir nota numérica a texto usando switch.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["switch", "condicionales", "conversión de tipos"],
	},
	{
		id: "2.16",
		titulo: "Manipulación de Strings",
		componente: Ej2_16_ManipulacionStrings,
		enunciado: "Mostrar longitud y formateo de una cadena con diferentes estilos.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["String", "HTML", "estilos", "propiedades de cadenas"],
	},
	{
		id: "2.17",
		titulo: "Incrementos y Decrementos",
		componente: Ej2_17_IncrementosDecrementos,
		enunciado: "Programa con incrementos de 5 y decrementos de 2 hasta cruce de valores.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["bucles", "incrementos", "condiciones de parada"],
	},
	{
		id: "2.18",
		titulo: "Columnas Numéricas",
		componente: Ej2_18_ColumnasNumericas,
		enunciado: "Mostrar dos columnas numéricas con un solo bucle.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["bucles", "formato de salida", "arrays"],
	},
	{
		id: "2.19",
		titulo: "Conversor de Temperatura",
		componente: Ej2_19_ConversorTemperatura,
		enunciado: "Convertir grados Fahrenheit a Centígrados.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["fórmulas", "conversión", "operaciones matemáticas"],
	},
	{
		id: "2.20",
		titulo: "Menú Matemático",
		componente: Ej2_20_MenuMatematico,
		enunciado: "Menú interactivo para calcular sumatorio o factorial.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["menús", "recursividad", "bucles", "funciones matemáticas"],
	},
	{
		id: "2.21",
		titulo: "Porcentaje de Género",
		componente: Ej2_21_PorcentajeGenero,
		enunciado: "Calcular porcentaje de hombres y mujeres en un salón de clases.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["bucles", "contadores", "porcentajes", "entrada de datos"],
	},
	{
		id: "2.22",
		titulo: "Media Aritmética",
		componente: Ej2_22_MediaAritmetica,
		enunciado: "Calcular la media de una serie de números introducidos por teclado.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["bucles", "acumuladores", "operaciones matemáticas"],
	},
	{
		id: "2.23",
		titulo: "Números Pares",
		componente: Ej2_23_NumerosPares,
		enunciado: "Calcular cuantos números pares hay entre dos números introducidos.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["bucles", "condicionales", "operador módulo"],
	},
	{
		id: "2.24",
		titulo: "Días del Mes",
		componente: Ej2_24_DiasMes,
		enunciado: "Identificar cuantos días tiene el mes.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["switch", "condicionales", "fechas"],
	},
	{
		id: "2.25",
		titulo: "Doble o Nada",
		componente: Ej2_25_DobleNada,
		enunciado: "Juego de apuestas con moneda aleatoria.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["Math.random", "condicionales", "juegos"],
	},
	{
		id: "2.26",
		titulo: "Ordenar Números",
		componente: Ej2_26_OrdenarNumeros,
		enunciado: "Leer tres números y escribirlos en orden decreciente.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["arrays", "ordenación", "comparación"],
	},
	{
		id: "2.27",
		titulo: "Validar Fecha",
		enunciado: "Verificar si una fecha es correcta, incluyendo años bisiestos.",
		estado: "pendiente",
		dificultad: "avanzada",
		conceptos: ["fechas", "validación", "años bisiestos"],
	},
	{
		id: "2.28",
		titulo: "Condiciones Variables",
		componente: Ej2_28_CondicionesVariables,
		enunciado: "Escribir condiciones para diferentes relaciones entre variables.",
		estado: "completado",
		dificultad: "intermedia",
		conceptos: ["operadores lógicos", "comparaciones", "expresiones booleanas"],
	},
	{
		id: "2.29",
		titulo: "Suma Serie",
		componente: Ej2_29_SumaSerie,
		enunciado: "Calcular la suma de números del 1 hasta n.",
		estado: "completado",
		dificultad: "básica",
		conceptos: ["bucles", "suma", "secuencias"],
	},
	{
		id: "2.30",
		titulo: "Master Mind",
		componente: Ej2_30_MasterMind,
		enunciado: "Juego de adivinanza de combinación numérica con pistas.",
		estado: "completado",
		dificultad: "avanzada",
		conceptos: ["arrays", "comparación", "bucles", "juegos"],
	},
	{
		id: "2.31",
		titulo: "Cálculos Esféricos",
		enunciado: "Calcular el volumen y el área de una esfera usando fórmulas matemáticas.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["Math", "fórmulas geométricas", "constantes"],
	},
	{
		id: "2.32",
		titulo: "Jubilación Condicional",
		enunciado: "Usar operador ternario para determinar estado de jubilación según edad.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["operador ternario", "condicionales", "comparación"],
	},
	{
		id: "2.33",
		titulo: "Operaciones Múltiples",
		enunciado: "Realizar varias operaciones matemáticas con un número y mostrar resultados.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["operaciones matemáticas", "variables", "formato"],
	},
	{
		id: "2.34",
		titulo: "Calculadora de Propinas",
		enunciado: "Calcular diferentes porcentajes de propina sobre el costo de una cena.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["porcentajes", "operaciones", "formato"],
	},
	{
		id: "2.35",
		titulo: "Multiplicación por Sumas",
		enunciado: "Realizar multiplicación mediante sumas sucesivas.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "sumas", "algoritmos"],
	},
	{
		id: "2.36",
		titulo: "División por Restas",
		enunciado: "Realizar división mediante restas sucesivas, mostrando cociente y resto.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "restas", "división entera"],
	},
	{
		id: "2.37",
		titulo: "Calculadora de Restaurante",
		enunciado: "Calcular total de cena según menú seleccionado y propina.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["prompt", "confirm", "cálculos", "menús"],
	},
	{
		id: "2.38",
		titulo: "Bucle For con Formato",
		enunciado: "Escribir números del 1 al 25 de 3 en 3, con formato de 4 por línea.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles for", "formato de salida", "incrementos"],
	},
	{
		id: "2.39",
		titulo: "Repetición con While",
		enunciado: "Repetir palabra 'Feliz' N veces usando bucle while.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["bucle while", "concatenación", "contador"],
	},
	{
		id: "2.40",
		titulo: "Bucle Do-While con Formato",
		enunciado: "Escribir números del 1 al 25 de 3 en 3 usando do-while.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucle do-while", "formato de salida", "incrementos"],
	},
	{
		id: "2.41",
		titulo: "Múltiplos y Suma",
		enunciado: "Visualizar múltiplos de 11 menores de 300 y calcular su suma.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "múltiplos", "acumuladores"],
	},
	{
		id: "2.42",
		titulo: "Factorial con For",
		enunciado: "Calcular el factorial de un número usando bucle for.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["factorial", "bucle for", "multiplicación"],
	},
	{
		id: "2.43",
		titulo: "Múltiplos y Suma con For",
		enunciado: "Visualizar y sumar los 10 primeros múltiplos de un número.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "múltiplos", "acumuladores"],
	},
	{
		id: "2.44",
		titulo: "Suma Naturales Do-While",
		enunciado: "Calcular suma de primeros 10 números naturales con do-while.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["bucle do-while", "suma", "números naturales"],
	},
	{
		id: "2.45",
		titulo: "Serie de Números",
		enunciado: "Leer y contar números hasta introducir cero.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["bucles", "contadores", "condición de parada"],
	},
	{
		id: "2.46",
		titulo: "Serie Aritmética",
		enunciado: "Visualizar y sumar la serie 3, 6, 9, ..., 99.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["bucles", "series", "incrementos"],
	},
	{
		id: "2.47",
		titulo: "Número Primo",
		enunciado: "Determinar si un número es primo.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "divisibilidad", "números primos"],
	},
	{
		id: "2.48",
		titulo: "Potencias de 2",
		enunciado: "Calcular y mostrar potencias de 2 de 0 a 10.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["bucles", "potencias", "Math.pow"],
	},
	{
		id: "2.49",
		titulo: "Suma Pares e Impares",
		enunciado: "Calcular suma de pares e impares entre 1 y 200.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["bucles", "operador módulo", "acumuladores"],
	},
	{
		id: "2.50",
		titulo: "Conversión Base 16",
		enunciado: "Convertir número decimal a base 16.",
		estado: "pendiente",
		dificultad: "avanzada",
		conceptos: ["conversión de bases", "toString", "sistemas numéricos"],
	},
	{
		id: "2.51",
		titulo: "Conversión Múltiple",
		enunciado: "Convertir número en base 8 a decimal y base 2.",
		estado: "pendiente",
		dificultad: "avanzada",
		conceptos: ["conversión de bases", "parseInt", "sistemas numéricos"],
	},
	{
		id: "2.52",
		titulo: "Conversor Universal",
		enunciado: "Convertir número a base específica mediante función.",
		estado: "pendiente",
		dificultad: "avanzada",
		conceptos: ["funciones", "conversión de bases", "sistemas numéricos"],
	},
	{
		id: "2.53",
		titulo: "Límites Number",
		enunciado: "Mostrar valores mínimo y máximo del tipo number.",
		estado: "pendiente",
		dificultad: "básica",
		conceptos: ["Number", "constantes", "tipos de datos"],
	},
	{
		id: "2.54",
		titulo: "Evaluación parseInt",
		enunciado: "Evaluar expresiones usando parseInt.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["parseInt", "conversión de tipos", "evaluación"],
	},
	{
		id: "2.55",
		titulo: "Evaluación parseFloat",
		enunciado: "Evaluar expresiones usando parseFloat.",
		estado: "pendiente",
		dificultad: "intermedia",
		conceptos: ["parseFloat", "conversión de tipos", "evaluación"],
	},
];

// Secciones para organizar los ejercicios
const SECCIONES = {
	"1. Introducción a JavaScript": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return num >= 1 && num <= 2;
	}),
	"2. Operaciones y Variables Básicas": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return num >= 3 && num <= 9;
	}),
	"3. Estructuras de Control": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return (num >= 10 && num <= 15) || [32].includes(num);
	}),
	"4. Manipulación de Strings y Formato": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return [8, 16].includes(num);
	}),
	"5. Bucles y Ciclos": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return (num >= 17 && num <= 18) || (num >= 38 && num <= 40) || [10, 11, 12].includes(num);
	}),
	"6. Cálculos y Algoritmos": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return (num >= 19 && num <= 23) || [31, 33, 34, 35, 36].includes(num);
	}),
	"7. Juegos y Aplicaciones": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return [14, 25, 30, 37].includes(num);
	}),
	"8. Bucles Avanzados": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return num >= 41 && num <= 49 && ![45].includes(num);
	}),
	"9. Conversiones y Tipos": EJERCICIOS.filter((e) => {
		const num = Number(e.id.split(".")[1]);
		return num >= 50 && num <= 55;
	}),
};

/**
 * @function EjerciciosBasicos
 * @description Componente principal que muestra y gestiona los ejercicios básicos 2.0
 * @returns {JSX.Element} Interfaz de usuario para los ejercicios
 */
function EjerciciosBasicos() {
	const [busqueda, setBusqueda] = useState("");
	const [filtro, setFiltro] = useState("todos");
	const [ejercicioActual, setEjercicioActual] = useState(null);

	/**
	 * @function filtrarEjercicios
	 * @description Filtra los ejercicios según búsqueda y filtro seleccionado
	 * @param {Array} ejercicios Lista de ejercicios a filtrar
	 * @returns {Array} Ejercicios filtrados
	 */
	const filtrarEjercicios = (ejercicios) => {
		return ejercicios.filter((ejercicio) => {
			const coincideBusqueda =
				ejercicio.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
				ejercicio.enunciado.toLowerCase().includes(busqueda.toLowerCase());

			if (filtro === "todos") return coincideBusqueda;
			return coincideBusqueda && ejercicio.dificultad === filtro;
		});
	};
	// Si hay un ejercicio seleccionado, mostrar su vista detallada
	if (ejercicioActual) {
		const Componente = ejercicioActual.componente;

		return (
			<div className="ejercicio-detalle">
				<button
					className="volver-btn"
					onClick={() => setEjercicioActual(null)}>
					← Volver al listado
				</button>
				<div className="ejercicio-header">
					<h2>Ejercicio {ejercicioActual.id}</h2>
					<span className={`dificultad ${ejercicioActual.dificultad}`}>{ejercicioActual.dificultad}</span>
				</div>
				<div className="ejercicio-contenido">
					<h3>{ejercicioActual.titulo}</h3>
					<p>{ejercicioActual.enunciado}</p>
					<div className="conceptos">
						{ejercicioActual.conceptos.map((concepto, index) => (
							<span
								key={index}
								className="concepto-tag">
								{concepto}
							</span>
						))}
					</div>
					{Componente && <Componente />}
				</div>
			</div>
		);
	}

	// Vista principal con listado de ejercicios
	return (
		<div className="ejercicios-basicos">
			<div className="controles">
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
					<option value="todos">Todos los niveles</option>
					<option value="básica">Nivel Básico</option>
					<option value="intermedia">Nivel Intermedio</option>
					<option value="avanzada">Nivel Avanzado</option>
				</select>
			</div>

			<div className="secciones">
				{Object.entries(SECCIONES).map(([nombre, ejercicios]) => {
					const ejerciciosFiltrados = filtrarEjercicios(ejercicios);
					if (ejerciciosFiltrados.length === 0) return null;

					return (
						<section
							key={nombre}
							className="seccion">
							<h2>{nombre}</h2>
							<div className="ejercicios-grid">
								{ejerciciosFiltrados.map((ejercicio) => (
									<div
										key={ejercicio.id}
										className={`ejercicio-card ${ejercicio.estado}`}
										onClick={() => setEjercicioActual(ejercicio)}>
										<div className="ejercicio-header">
											<span className="ejercicio-id">{ejercicio.id}</span>
											<span className={`estado ${ejercicio.estado}`}>{ejercicio.estado}</span>
										</div>
										<h3>{ejercicio.titulo}</h3>
										<p>{ejercicio.enunciado}</p>
										<div className="conceptos">
											{ejercicio.conceptos.map((concepto, index) => (
												<span
													key={index}
													className="concepto-tag">
													{concepto}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
}

export default EjerciciosBasicos;
