/**
 * @fileoverview Servicio de gestión para la aplicación de IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import Persona from "./Persona";
import Calculo from "./Calculo";

/**
 * @class IMCService
 * @description Servicio para gestionar las personas y cálculos de IMC
 * 
 * IMPORTANTE: Este servicio implementa el patrón Singleton para asegurar
 * una única instancia de gestión de datos en toda la aplicación.
 * 
 * NOTA: Se utiliza localStorage para persistir los datos entre sesiones del navegador.
 */
class IMCService {
    /**
     * @constructor
     * @description Inicializa el servicio y carga los datos almacenados
     * 
     * @example
     * // Obtener instancia del servicio
     * const imcService = IMCService.getInstance();
     */
    constructor() {
        // Inicializa colecciones vacías
        this.personas = [];
        this.calculosRiesgo = [];

        // Carga datos de localStorage si existen
        this._cargarDatos();
    }

    /**
     * @static
     * @function getInstance
     * @description Implementa el patrón Singleton para obtener la instancia única
     * @returns {IMCService} La instancia única del servicio
     */
    static getInstance() {
        if (!IMCService.instance) {
            IMCService.instance = new IMCService();
        }
        return IMCService.instance;
    }

    // ===== MÉTODOS PARA GESTIÓN DE PERSONAS =====

    /**
     * @function obtenerPersonas
     * @description Obtiene la lista de todas las personas
     * @returns {Array<Persona>} Lista de personas
     */
    obtenerPersonas() {
        return [...this.personas];
    }

    /**
     * @function obtenerPersonaPorNombre
     * @description Busca una persona por su nombre
     * @param {string} nombre - Nombre de la persona a buscar
     * @returns {Persona|null} La persona encontrada o null si no existe
     */
    obtenerPersonaPorNombre(nombre) {
        return this.personas.find(
            (persona) => persona.nombre.toLowerCase() === nombre.toLowerCase()
        ) || null;
    }

    /**
     * @function agregarPersona
     * @description Agrega una nueva persona
     * @param {Object} datosPersona - Datos de la persona a agregar
     * @throws {Error} Si ya existe una persona con el mismo nombre o datos inválidos
     */
    agregarPersona(datosPersona) {
        // Validar datos
        this._validarDatosPersona(datosPersona);

        // Verificar que no exista otra persona con el mismo nombre
        if (this.obtenerPersonaPorNombre(datosPersona.nombre)) {
            throw new Error(`Ya existe una persona con el nombre '${datosPersona.nombre}'`);
        }

        // Crear y agregar la persona
        const nuevaPersona = new Persona(
            datosPersona.nombre,
            parseFloat(datosPersona.peso),
            parseFloat(datosPersona.altura)
        );

        this.personas.push(nuevaPersona);
        this._guardarDatos();

        return nuevaPersona;
    }

    /**
     * @function modificarPersona
     * @description Modifica una persona existente
     * @param {string} nombre - Nombre de la persona a modificar
     * @param {Object} datosPersona - Nuevos datos de la persona
     * @throws {Error} Si no existe la persona o si los datos son inválidos
     */
    modificarPersona(nombre, datosPersona) {
        // Validar datos
        this._validarDatosPersona(datosPersona);

        // Buscar la persona por nombre
        const personaIndex = this.personas.findIndex(
            (persona) => persona.nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (personaIndex === -1) {
            throw new Error(`No existe una persona con el nombre '${nombre}'`);
        }

        // Si el nombre ha cambiado, verificar que no exista otro con ese nombre
        if (
            datosPersona.nombre.toLowerCase() !== nombre.toLowerCase() &&
            this.obtenerPersonaPorNombre(datosPersona.nombre)
        ) {
            throw new Error(`Ya existe otra persona con el nombre '${datosPersona.nombre}'`);
        }

        // Actualizar la persona
        this.personas[personaIndex] = new Persona(
            datosPersona.nombre,
            parseFloat(datosPersona.peso),
            parseFloat(datosPersona.altura)
        );

        this._guardarDatos();

        return this.personas[personaIndex];
    }

    // ===== MÉTODOS PARA CÁLCULOS DE IMC =====

    /**
     * @function calcularIMC
     * @description Calcula el IMC de una persona
     * @param {Persona} persona - La persona para la que calcular el IMC
     * @returns {Calculo} Objeto con el resultado del cálculo
     */
    calcularIMC(persona) {
        // Validar que los datos sean números
        const peso = parseFloat(persona.peso);
        const altura = parseFloat(persona.altura);

        if (isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
            throw new Error("Datos de peso o altura inválidos para el cálculo");
        }

        // Calcular IMC: peso / altura^2
        const imc = peso / (altura * altura);

        // Redondear a 2 decimales
        const imcRedondeado = Math.round(imc * 100) / 100;

        // Determinar la categoría
        const categoria = Calculo.obtenerCategoria(imcRedondeado);

        // Crear objeto de cálculo
        return new Calculo(persona.nombre, imcRedondeado, categoria);
    }

    /**
     * @function calcularIMCTodasPersonas
     * @description Calcula el IMC para todas las personas y almacena las que están en riesgo
     * @returns {Array<Calculo>} Lista con todos los resultados de IMC
     */
    calcularIMCTodasPersonas() {
        if (this.personas.length === 0) {
            throw new Error("No hay personas registradas para calcular el IMC");
        }

        const resultados = this.personas.map(persona => this.calcularIMC(persona));

        // Filtrar personas no normales (con riesgo)
        this.calculosRiesgo = resultados.filter(calculo => calculo.categoria !== "normal");

        this._guardarDatos();

        return resultados;
    }

    /**
     * @function obtenerPersonasEnRiesgo
     * @description Obtiene la lista de personas con peso no normal
     * @returns {Array<Calculo>} Lista de cálculos de personas en riesgo
     */
    obtenerPersonasEnRiesgo() {
        return [...this.calculosRiesgo];
    }

    // ===== MÉTODOS PARA DATOS DE PRUEBA =====

    /**
     * @function cargarDatosDePrueba
     * @description Carga datos de prueba en la aplicación
     */
    cargarDatosDePrueba() {
        // Limpiar datos actuales
        this.personas = [];
        this.calculosRiesgo = [];

        // Agregar personas de prueba
        const datosPrueba = [
            new Persona("Ana García", 58, 1.65),
            new Persona("Carlos Rodríguez", 92, 1.78),
            new Persona("María López", 45, 1.58),
            new Persona("Juan Martínez", 75, 1.82),
            new Persona("Laura Sánchez", 62, 1.70)
        ];

        this.personas = datosPrueba;
        this._guardarDatos();
    }

    // ===== MÉTODOS PRIVADOS =====

    /**
     * @private
     * @function _validarDatosPersona
     * @description Valida los datos de una persona
     * @param {Object} datosPersona - Datos a validar
     * @throws {Error} Si los datos son inválidos
     */
    _validarDatosPersona(datosPersona) {
        if (!datosPersona.nombre || datosPersona.nombre.trim() === "") {
            throw new Error("El nombre es obligatorio");
        }

        if (!datosPersona.peso || isNaN(parseFloat(datosPersona.peso)) || parseFloat(datosPersona.peso) <= 0) {
            throw new Error("El peso debe ser un número positivo");
        }

        if (!datosPersona.altura || isNaN(parseFloat(datosPersona.altura)) || parseFloat(datosPersona.altura) <= 0) {
            throw new Error("La altura debe ser un número positivo");
        }
    }

    /**
     * @private
     * @function _cargarDatos
     * @description Carga los datos desde localStorage
     */
    _cargarDatos() {
        try {
            // Cargar personas
            const personasJSON = localStorage.getItem("imc_app_personas");
            if (personasJSON) {
                this.personas = JSON.parse(personasJSON).map(p => Persona.fromJSON(p));
            }

            // Cargar cálculos de riesgo
            const calculosJSON = localStorage.getItem("imc_app_calculos_riesgo");
            if (calculosJSON) {
                this.calculosRiesgo = JSON.parse(calculosJSON).map(c => Calculo.fromJSON(c));
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
            // Si hay error, inicializar con arrays vacíos
            this.personas = [];
            this.calculosRiesgo = [];
        }
    }

    /**
     * @private
     * @function _guardarDatos
     * @description Guarda los datos en localStorage
     */
    _guardarDatos() {
        try {
            localStorage.setItem(
                "imc_app_personas",
                JSON.stringify(this.personas.map(p => p.toJSON()))
            );

            localStorage.setItem(
                "imc_app_calculos_riesgo",
                JSON.stringify(this.calculosRiesgo.map(c => c.toJSON()))
            );
        } catch (error) {
            console.error("Error al guardar datos:", error);
        }
    }
}

export default IMCService;
