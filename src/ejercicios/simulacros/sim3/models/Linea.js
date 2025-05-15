/**
 * @fileoverview Clase Linea para el simulacro AVILESA
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

/**
 * @class Linea
 * @description Clase que representa una línea de autobús en el sistema AVILESA
 * 
 * IMPORTANTE: Esta clase implementa validaciones para todos los campos según los requisitos:
 * - Validación de número de línea (entero positivo)
 * - Validación de origen y destino (diferentes entre sí)
 * - Validación de formatos de hora y tiempo
 * 
 * NOTA: Se utiliza programación orientada a objetos de ES6 con validación
 * de datos en el constructor y métodos de clase.
 */
class Linea {
    /**
     * @constructor
     * @description Crea una nueva instancia de una línea de autobús
     * @param {Object} datos - Objeto con los datos de la línea
     * @param {number} datos.numero - Número de línea (entero ≥ 1)
     * @param {string} datos.origen - Localidad de origen
     * @param {string} datos.destino - Localidad de destino
     * @param {string} datos.horaSalida - Hora de salida en formato HH:MM
     * @param {string} datos.intervalo - Intervalo entre buses en formato HH:MM
     * @throws {Error} Si algún dato no es válido
     * 
     * @example
     * // Crear una nueva línea
     * const linea1 = new Linea({
     *   numero: 1,
     *   origen: "Avilés",
     *   destino: "Oviedo",
     *   horaSalida: "08:00",
     *   intervalo: "00:30"
     * });
     */
    constructor(datos) {
        // Validación del número de línea
        if (!datos.numero || !Number.isInteger(datos.numero) || datos.numero < 1) {
            throw new Error("El número de línea debe ser un entero mayor o igual a 1");
        }

        // Validación de origen y destino
        if (!datos.origen || typeof datos.origen !== 'string' || datos.origen.trim() === '') {
            throw new Error("El origen debe ser un texto no vacío");
        }

        if (!datos.destino || typeof datos.destino !== 'string' || datos.destino.trim() === '') {
            throw new Error("El destino debe ser un texto no vacío");
        }

        if (datos.origen.trim().toLowerCase() === datos.destino.trim().toLowerCase()) {
            throw new Error("El origen y el destino no pueden ser iguales");
        }

        // Validación del formato de hora
        if (!datos.horaSalida || !Linea.validarFormatoHora(datos.horaSalida)) {
            throw new Error("La hora de salida debe tener formato HH:MM");
        }

        // Validación del formato de intervalo
        if (!datos.intervalo || !Linea.validarFormatoHora(datos.intervalo)) {
            throw new Error("El intervalo debe tener formato HH:MM");
        }

        // Asignación de propiedades
        this.numero = datos.numero;
        this.origen = datos.origen.trim();
        this.destino = datos.destino.trim();
        this.horaSalida = datos.horaSalida;
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
        // Expresión regular para formato HH:MM (00:00 a 23:59)
        const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        return regex.test(hora);
    }

    /**
     * @method toJSON
     * @description Convierte la instancia a un objeto plano para serialización
     * @returns {Object} Objeto con las propiedades de la línea
     * 
     * NOTA: Método usado para la conversión a JSON cuando se guarda en localStorage
     */
    toJSON() {
        return {
            numero: this.numero,
            origen: this.origen,
            destino: this.destino,
            horaSalida: this.horaSalida,
            intervalo: this.intervalo
        };
    }

    /**
     * @static
     * @function fromJSON
     * @description Crea una instancia de Linea a partir de un objeto JSON
     * @param {Object} json - Objeto JSON con datos de línea
     * @returns {Linea} Nueva instancia de Linea
     * 
     * NOTA: Método estático usado para convertir objetos JSON en instancias de clase
     */
    static fromJSON(json) {
        return new Linea(json);
    }
}

export default Linea;
