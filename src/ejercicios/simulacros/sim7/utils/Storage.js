/**
 * @fileoverview Utilidad para gestionar el almacenamiento local
 * @ejercicio Simulacro 7 - MaderAvilés
 */

import Pedido from "../models/Pedido";
import Pieza from "../models/Pieza";

/**
 * @class Storage
 * @description Clase para gestionar el almacenamiento de pedidos y piezas en localStorage
 */
class Storage {
    static KEYS = {
        PEDIDOS: "maderaviles_pedidos",
        PIEZAS: "maderaviles_piezas"
    };

    /**
     * @method guardarPedidos
     * @description Guarda la lista de pedidos en localStorage
     * @param {Pedido[]} pedidos - Array de pedidos a guardar
     */
    static guardarPedidos(pedidos) {
        const pedidosJSON = pedidos.map(pedido => pedido.toJSON());
        localStorage.setItem(this.KEYS.PEDIDOS, JSON.stringify(pedidosJSON));
    }

    /**
     * @method obtenerPedidos
     * @description Recupera la lista de pedidos de localStorage
     * @returns {Pedido[]} Array de pedidos
     */
    static obtenerPedidos() {
        const pedidosJSON = localStorage.getItem(this.KEYS.PEDIDOS);
        if (!pedidosJSON) return [];

        try {
            const pedidosData = JSON.parse(pedidosJSON);
            return pedidosData.map(data => Pedido.fromJSON(data));
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
            return [];
        }
    }

    /**
     * @method guardarPiezas
     * @description Guarda la lista de piezas en localStorage
     * @param {Pieza[]} piezas - Array de piezas a guardar
     */
    static guardarPiezas(piezas) {
        const piezasJSON = piezas.map(pieza => pieza.toJSON());
        localStorage.setItem(this.KEYS.PIEZAS, JSON.stringify(piezasJSON));
    }

    /**
     * @method obtenerPiezas
     * @description Recupera la lista de piezas de localStorage
     * @returns {Pieza[]} Array de piezas
     */
    static obtenerPiezas() {
        const piezasJSON = localStorage.getItem(this.KEYS.PIEZAS);
        if (!piezasJSON) return [];

        try {
            const piezasData = JSON.parse(piezasJSON);
            return piezasData.map(data => Pieza.fromJSON(data));
        } catch (error) {
            console.error("Error al obtener piezas:", error);
            return [];
        }
    }

    /**
     * @method cargarDatosEjemplo
     * @description Carga datos de ejemplo si no hay datos en localStorage
     */
    static cargarDatosEjemplo() {
        if (!localStorage.getItem(this.KEYS.PEDIDOS) && !localStorage.getItem(this.KEYS.PIEZAS)) {
            // Datos de ejemplo para pedidos
            const pedidosEjemplo = [
                new Pedido(1, "Juan Pérez", new Date("2025-05-10")),
                new Pedido(2, "María García", new Date("2025-05-12"))
            ];

            // Datos de ejemplo para piezas
            const piezasEjemplo = [
                new Pieza(1, 1, 100, 50, 2, "Natural"),
                new Pieza(2, 1, 200, 75, 3, "Roble", true),
                new Pieza(3, 2, 150, 60, 2.5, "Nogal")
            ];

            this.guardarPedidos(pedidosEjemplo);
            this.guardarPiezas(piezasEjemplo);
        }
    }
}

export default Storage;
