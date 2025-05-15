/**
 * @fileoverview Clase Parada para el simulacro AVILESA
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

/**
 * @class Parada
 * @description Clase que representa una parada en una línea de autobús en el sistema AVILESA
 * 
 * IMPORTANTE: Esta clase implementa validaciones para todos los campos según los requisitos:
 * - Validación de número de parada (entero positivo)
 * - Validación de número de línea existente
 * - Validación de formato de tiempo para intervalo
 * 
 * NOTA: Se utiliza programación orientada a objetos de ES6 con validación
 * de datos en el constructor y métodos de clase.
 */
class Parada {
    /**
     * @constructor
     * @description Crea una nueva instancia de una parada de autobús
     * @param {Object} datos - Objeto con los datos de la parada
     * @param {number} datos.numero - Número de parada (entero ≥ 1)
     * @param {number} datos.numeroLinea - Número de línea a la que pertenece
     * @param {string} datos.localidad - Nombre de la localidad
     * @param {string} datos.intervalo - Intervalo desde la salida en formato HH:MM
     * @throws {Error} Si algún dato no es válido
     * 
     * @example
     * // Crear una nueva parada
     * const parada1 = new Parada({
     *   numero: 1,
     *   numeroLinea: 1,
     *   localidad: "Gijón",
     *   intervalo: "00:45"
     * });
     */
    constructor(datos) {
        // Validación del número de parada
        if (!datos.numero || !Number.isInteger(datos.numero) || datos.numero < 1) {
            throw new Error("El número de parada debe ser un entero mayor o igual a 1");
        }

        // Validación del número de línea
        if (!datos.numeroLinea || !Number.isInteger(datos.numeroLinea) || datos.numeroLinea < 1) {
            throw new Error("El número de línea debe ser un entero mayor o igual a 1");
        }

        // Validación de la localidad
        if (!datos.localidad || typeof datos.localidad !== 'string' || datos.localidad.trim() === '') {
            throw new Error("La localidad debe ser un texto no vacío");
        }

        // Validación del formato de intervalo
        if (!datos.intervalo || !Parada.validarFormatoHora(datos.intervalo)) {
            throw new Error("El intervalo debe tener formato HH:MM");
        }

        // Asignación de propiedades
        this.numero = datos.numero;
        this.numeroLinea = datos.numeroLinea;
        this.localidad = datos.localidad.trim();
        this.intervalo = datos.intervalo;
    }

    /**
     * @static
     * @function validarFormatoHora
     * @description Valida que una cadena tenga formato HH:MM
     * @param {string} hora - Cadena a validar
     * @returns {boolean} true si el formato es válido, false en caso contrario
     * 
     * IMPORTANTE: Utiliza expresiones regulares para validar formatos de tiempo
     */
    static validarFormatoHora(hora) {
        // Expresión regular para formato HH:MM
        const regex = /^([0-9][0-9]):([0-5][0-9])$/;
        return regex.test(hora);
    }

    /**
     * @method toJSON
     * @description Convierte la instancia a un objeto plano para serialización
     * @returns {Object} Objeto con las propiedades de la parada
     * 
     * NOTA: Método usado para la conversión a JSON cuando se guarda en localStorage
     */
    toJSON() {
        return {
            numero: this.numero,
            numeroLinea: this.numeroLinea,
            localidad: this.localidad,
            intervalo: this.intervalo
        };
    }

    /**
     * @static
     * @function fromJSON
     * @description Crea una instancia de Parada a partir de un objeto JSON
     * @param {Object} json - Objeto JSON con datos de parada
     * @returns {Parada} Nueva instancia de Parada
     * 
     * NOTA: Método estático usado para convertir objetos JSON en instancias de clase
     */
    static fromJSON(json) {
        return new Parada(json);
    }
}

export default Parada;
