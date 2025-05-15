/**
 * @fileoverview Clase para gestionar pedidos de madera
 * @ejercicio Simulacro 7 - MaderAvilés
 */

/**
 * @class Pedido
 * @description Clase que representa un pedido de madera
 */
class Pedido {
    /**
     * @constructor
     * @param {number} numeroPedido - Número único que identifica al pedido
     * @param {string} cliente - Nombre y apellidos del cliente (máx. 50 caracteres)
     * @param {Date} fechaPedido - Fecha de realización del pedido
     */
    constructor(numeroPedido, cliente, fechaPedido) {
        this.numeroPedido = numeroPedido;
        this.cliente = cliente;
        this.fechaPedido = fechaPedido;
        this.procesado = false;
        this.servido = false;
    }

    /**
     * @method validar
     * @description Valida los datos del pedido
     * @returns {Object} Objeto con el resultado de la validación
     */
    validar() {
        const errores = [];

        // Validar número de pedido
        if (!Number.isInteger(this.numeroPedido) || this.numeroPedido < 1) {
            errores.push("El número de pedido debe ser un entero mayor o igual que 1");
        }

        // Validar nombre del cliente
        if (!this.cliente || this.cliente.trim().length === 0) {
            errores.push("El nombre del cliente es obligatorio");
        }
        if (this.cliente && this.cliente.length > 50) {
            errores.push("El nombre del cliente no puede superar los 50 caracteres");
        }

        // Validar fecha
        if (!(this.fechaPedido instanceof Date) || isNaN(this.fechaPedido)) {
            errores.push("La fecha del pedido no es válida");
        }
        if (this.fechaPedido > new Date()) {
            errores.push("La fecha del pedido no puede ser posterior a hoy");
        }

        return {
            esValido: errores.length === 0,
            errores
        };
    }

    /**
     * @method toJSON
     * @description Convierte el pedido a formato JSON para almacenamiento
     * @returns {Object} Representación JSON del pedido
     */
    toJSON() {
        return {
            numeroPedido: this.numeroPedido,
            cliente: this.cliente,
            fechaPedido: this.fechaPedido.toISOString(),
            procesado: this.procesado,
            servido: this.servido
        };
    }

    /**
     * @static fromJSON
     * @description Crea una instancia de Pedido desde un objeto JSON
     * @param {Object} json - Objeto con los datos del pedido
     * @returns {Pedido} Nueva instancia de Pedido
     */
    static fromJSON(json) {
        const pedido = new Pedido(
            json.numeroPedido,
            json.cliente,
            new Date(json.fechaPedido)
        );
        pedido.procesado = json.procesado;
        pedido.servido = json.servido;
        return pedido;
    }
}

export default Pedido;
