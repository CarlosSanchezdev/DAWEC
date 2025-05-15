/**
 * @fileoverview Clase Persona para la aplicación de IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

/**
 * @class Persona
 * @description Clase que representa a una persona con sus datos básicos
 */
class Persona {
    /**
     * @constructor
     * @param {string} nombre - Nombre de la persona
     * @param {number} peso - Peso en kilogramos
     * @param {number} altura - Altura en metros
     */
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
    }

    /**
     * @method toJSON
     * @description Convierte la persona a un objeto JSON
     * @returns {Object} Representación JSON de la persona
     */
    toJSON() {
        return {
            nombre: this.nombre,
            peso: this.peso,
            altura: this.altura
        };
    }

    /**
     * @static
     * @method fromJSON
     * @description Crea una instancia de Persona a partir de un objeto JSON
     * @param {Object} json - Objeto JSON con los datos de la persona
     * @returns {Persona} Nueva instancia de Persona
     */
    static fromJSON(json) {
        return new Persona(
            json.nombre,
            json.peso,
            json.altura
        );
    }
}

export default Persona;
