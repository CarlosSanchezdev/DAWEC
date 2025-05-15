/**
 * @fileoverview Clase Calculo para almacenar resultados de IMC
 * @ejercicio Simulacro 4 - Calculadora de IMC
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

/**
 * @class Calculo
 * @description Clase que representa un cálculo de IMC con su resultado
 */
class Calculo {
    /**
     * @constructor
     * @param {string} nombre - Nombre de la persona
     * @param {number} imc - Valor del IMC calculado
     * @param {string} categoria - Categoría del IMC (delgado, normal, obeso)
     */
    constructor(nombre, imc, categoria) {
        this.nombre = nombre;
        this.imc = imc;
        this.categoria = categoria;
    }

    /**
     * @method toJSON
     * @description Convierte el cálculo a un objeto JSON
     * @returns {Object} Representación JSON del cálculo
     */
    toJSON() {
        return {
            nombre: this.nombre,
            imc: this.imc,
            categoria: this.categoria
        };
    }

    /**
     * @static
     * @method fromJSON
     * @description Crea una instancia de Calculo a partir de un objeto JSON
     * @param {Object} json - Objeto JSON con los datos del cálculo
     * @returns {Calculo} Nueva instancia de Calculo
     */
    static fromJSON(json) {
        return new Calculo(
            json.nombre,
            json.imc,
            json.categoria
        );
    }

    /**
     * @static
     * @method obtenerCategoria
     * @description Determina la categoría del IMC según su valor
     * @param {number} imc - Valor del IMC calculado
     * @returns {string} Categoría del IMC (delgado, normal, obeso)
     */
    static obtenerCategoria(imc) {
        if (imc < 18.49) {
            return "delgado";
        } else if (imc <= 24.99) {
            return "normal";
        } else {
            return "obeso";
        }
    }

    /**
     * @static
     * @method obtenerDescripcionCategoria
     * @description Obtiene la descripción textual de la categoría del IMC
     * @param {string} categoria - Categoría del IMC (delgado, normal, obeso)
     * @returns {string} Descripción de la categoría
     */
    static obtenerDescripcionCategoria(categoria) {
        switch (categoria) {
            case "delgado":
                return "Demasiado delgado";
            case "normal":
                return "Peso normal";
            case "obeso":
                return "Demasiado obeso";
            default:
                return "Categoría desconocida";
        }
    }
}

export default Calculo;
