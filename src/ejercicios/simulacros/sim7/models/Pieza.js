/**
 * @fileoverview Clase para gestionar piezas de madera
 * @ejercicio Simulacro 7 - MaderAvilés
 */

/**
 * @class Pieza
 * @description Clase que representa una pieza de madera
 */
class Pieza {
    /**
     * @constructor
     * @param {number} numeroPieza - Número único que identifica la pieza
     * @param {number} numeroPedido - Número del pedido al que pertenece la pieza
     * @param {number} largo - Largo de la pieza en centímetros
     * @param {number} ancho - Ancho de la pieza en centímetros
     * @param {number} grosor - Grosor de la pieza en centímetros
     * @param {string} color - Color del chapeado ("Natural" si no lleva)
     * @param {boolean} ambasCaras - Si deben estar chapeadas las dos caras
     */
    constructor(numeroPieza, numeroPedido, largo, ancho, grosor, color = "Natural", ambasCaras = false) {
        this.numeroPieza = numeroPieza;
        this.numeroPedido = numeroPedido;
        this.largo = largo;
        this.ancho = ancho;
        this.grosor = grosor;
        this.color = color;
        this.ambasCaras = ambasCaras;
        this.cortada = false;
    }

    /**
     * @method validar
     * @description Valida los datos de la pieza
     * @returns {Object} Objeto con el resultado de la validación
     */
    validar() {
        const errores = [];

        // Validar número de pieza
        if (!Number.isInteger(this.numeroPieza) || this.numeroPieza < 1) {
            errores.push("El número de pieza debe ser un entero mayor o igual que 1");
        }

        // Validar número de pedido
        if (!Number.isInteger(this.numeroPedido) || this.numeroPedido < 1) {
            errores.push("El número de pedido debe ser un entero mayor o igual que 1");
        }

        // Validar dimensiones
        if (this.largo <= 0) errores.push("El largo debe ser mayor que 0");
        if (this.ancho <= 0) errores.push("El ancho debe ser mayor que 0");
        if (this.grosor <= 0) errores.push("El grosor debe ser mayor que 0");

        // Validar color
        if (!this.color || this.color.trim().length === 0) {
            errores.push("El color es obligatorio");
        }

        return {
            esValido: errores.length === 0,
            errores
        };
    }

    /**
     * @method calcularSuperficie
     * @description Calcula la superficie de la pieza
     * @returns {number} Superficie en centímetros cuadrados
     */
    calcularSuperficie() {
        return this.largo * this.ancho;
    }

    /**
     * @method calcularVolumen
     * @description Calcula el volumen de la pieza
     * @returns {number} Volumen en centímetros cúbicos
     */
    calcularVolumen() {
        return this.largo * this.ancho * this.grosor;
    }

    /**
     * @method toJSON
     * @description Convierte la pieza a formato JSON para almacenamiento
     * @returns {Object} Representación JSON de la pieza
     */
    toJSON() {
        return {
            numeroPieza: this.numeroPieza,
            numeroPedido: this.numeroPedido,
            largo: this.largo,
            ancho: this.ancho,
            grosor: this.grosor,
            color: this.color,
            ambasCaras: this.ambasCaras,
            cortada: this.cortada
        };
    }

    /**
     * @static fromJSON
     * @description Crea una instancia de Pieza desde un objeto JSON
     * @param {Object} json - Objeto con los datos de la pieza
     * @returns {Pieza} Nueva instancia de Pieza
     */
    static fromJSON(json) {
        const pieza = new Pieza(
            json.numeroPieza,
            json.numeroPedido,
            json.largo,
            json.ancho,
            json.grosor,
            json.color,
            json.ambasCaras
        );
        pieza.cortada = json.cortada;
        return pieza;
    }
}

export default Pieza;
