/**
 * @fileoverview Servicio de gestión AVILESA para el simulacro de examen
 * @ejercicio Simulacro 3 - AVILESA
 * @tema UT2, UT3, UT4
 * @fecha 14/05/2025
 */

import Linea from './Linea';
import Parada from './Parada';

/**
 * @class AvilesaService
 * @description Servicio para gestionar las líneas y paradas de autobuses de AVILESA
 * 
 * IMPORTANTE: Este servicio implementa el patrón Singleton para asegurar
 * una única instancia de gestión de datos en toda la aplicación.
 * 
 * NOTA: Se utiliza localStorage para persistir los datos entre sesiones del navegador.
 */
class AvilesaService {
    /**
     * @constructor
     * @description Inicializa el servicio y carga los datos almacenados
     * 
     * @example
     * // Obtener instancia del servicio
     * const avilesaService = AvilesaService.getInstance();
     */
    constructor() {
        // Inicializa colecciones vacías
        this.lineas = [];
        this.paradas = [];

        // Carga datos de localStorage si existen
        this._cargarDatos();
    }

    /**
     * @static
     * @function getInstance
     * @description Implementa el patrón Singleton para obtener la instancia única
     * @returns {AvilesaService} La instancia única del servicio
     */
    static getInstance() {
        if (!AvilesaService.instance) {
            AvilesaService.instance = new AvilesaService();
        }
        return AvilesaService.instance;
    }

    // ===== MÉTODOS PARA LÍNEAS =====

    /**
     * @function obtenerLineas
     * @description Obtiene todas las líneas disponibles
     * @returns {Array<Linea>} Array de objetos Linea
     */
    obtenerLineas() {
        return [...this.lineas];
    }

    /**
     * @function obtenerLineaPorNumero
     * @description Busca y devuelve una línea por su número
     * @param {number} numero - Número de línea a buscar
     * @returns {Linea|null} La línea encontrada o null si no existe
     */
    obtenerLineaPorNumero(numero) {
        return this.lineas.find(linea => linea.numero === numero) || null;
    }

    /**
     * @function agregarLinea
     * @description Agrega una nueva línea al sistema
     * @param {Object} datosLinea - Datos de la línea a agregar
     * @returns {Linea} La línea creada
     * @throws {Error} Si el número de línea ya existe
     */
    agregarLinea(datosLinea) {
        // Verifica si ya existe una línea con ese número
        if (this.obtenerLineaPorNumero(datosLinea.numero)) {
            throw new Error(`Ya existe una línea con el número ${datosLinea.numero}`);
        }

        // Crea la nueva línea (esto validará los datos internamente)
        const nuevaLinea = new Linea(datosLinea);

        // Agrega la línea a la colección
        this.lineas.push(nuevaLinea);

        // Guarda los cambios
        this._guardarDatos();

        return nuevaLinea;
    }

    /**
     * @function actualizarLinea
     * @description Actualiza una línea existente
     * @param {number} numero - Número de la línea a actualizar
     * @param {Object} datosLinea - Nuevos datos de la línea
     * @returns {Linea} La línea actualizada
     * @throws {Error} Si la línea no existe
     */
    actualizarLinea(numero, datosLinea) {
        // Busca la línea por número
        const indice = this.lineas.findIndex(linea => linea.numero === numero);

        if (indice === -1) {
            throw new Error(`No existe una línea con el número ${numero}`);
        }

        // Si se está cambiando el número, verifica que no exista ya
        if (datosLinea.numero !== numero && this.obtenerLineaPorNumero(datosLinea.numero)) {
            throw new Error(`Ya existe una línea con el número ${datosLinea.numero}`);
        }

        // Actualiza la línea (esto validará los datos internamente)
        const lineaActualizada = new Linea(datosLinea);

        // Reemplaza la línea en la colección
        this.lineas[indice] = lineaActualizada;

        // Actualiza también las referencias en las paradas si cambió el número
        if (datosLinea.numero !== numero) {
            this.paradas
                .filter(parada => parada.numeroLinea === numero)
                .forEach(parada => {
                    parada.numeroLinea = datosLinea.numero;
                });
        }

        // Guarda los cambios
        this._guardarDatos();

        return lineaActualizada;
    }

    /**
     * @function eliminarLinea
     * @description Elimina una línea y todas sus paradas asociadas
     * @param {number} numero - Número de la línea a eliminar
     * @returns {boolean} true si se eliminó correctamente
     * @throws {Error} Si la línea no existe
     */
    eliminarLinea(numero) {
        // Busca la línea por número
        const indice = this.lineas.findIndex(linea => linea.numero === numero);

        if (indice === -1) {
            throw new Error(`No existe una línea con el número ${numero}`);
        }

        // Elimina la línea
        this.lineas.splice(indice, 1);

        // Elimina todas las paradas asociadas a esta línea
        this.paradas = this.paradas.filter(parada => parada.numeroLinea !== numero);

        // Guarda los cambios
        this._guardarDatos();

        return true;
    }

    // ===== MÉTODOS PARA PARADAS =====

    /**
     * @function obtenerParadas
     * @description Obtiene todas las paradas o filtra por línea
     * @param {number} [numeroLinea] - Número de línea para filtrar (opcional)
     * @returns {Array<Parada>} Array de objetos Parada
     */
    obtenerParadas(numeroLinea) {
        if (numeroLinea) {
            return this.paradas.filter(parada => parada.numeroLinea === numeroLinea);
        }
        return [...this.paradas];
    }

    /**
     * @function obtenerParadasOrdenadasPorIntervalo
     * @description Obtiene las paradas de una línea ordenadas por intervalo
     * @param {number} numeroLinea - Número de línea para filtrar
     * @returns {Array<Parada>} Array de objetos Parada ordenados
     */
    obtenerParadasOrdenadasPorIntervalo(numeroLinea) {
        return this.obtenerParadas(numeroLinea).sort((a, b) => {
            // Convierte los intervalos a minutos para compararlos
            const minutosA = this._convertirHoraAMinutos(a.intervalo);
            const minutosB = this._convertirHoraAMinutos(b.intervalo);
            return minutosA - minutosB;
        });
    }

    /**
     * @function obtenerParadaPorNumero
     * @description Busca y devuelve una parada por su número
     * @param {number} numero - Número de parada a buscar
     * @param {number} numeroLinea - Número de línea a la que pertenece
     * @returns {Parada|null} La parada encontrada o null si no existe
     */
    obtenerParadaPorNumero(numero, numeroLinea) {
        return this.paradas.find(
            parada => parada.numero === numero && parada.numeroLinea === numeroLinea
        ) || null;
    }

    /**
     * @function agregarParada
     * @description Agrega una nueva parada al sistema
     * @param {Object} datosParada - Datos de la parada a agregar
     * @returns {Parada} La parada creada
     * @throws {Error} Si el número de parada ya existe o la línea no existe
     */
    agregarParada(datosParada) {
        // Verifica que exista la línea
        const linea = this.obtenerLineaPorNumero(datosParada.numeroLinea);
        if (!linea) {
            throw new Error(`No existe la línea ${datosParada.numeroLinea}`);
        }

        // Verifica si ya existe una parada con ese número en esa línea
        if (this.obtenerParadaPorNumero(datosParada.numero, datosParada.numeroLinea)) {
            throw new Error(`Ya existe una parada con el número ${datosParada.numero} en la línea ${datosParada.numeroLinea}`);
        }

        // Verifica validaciones adicionales
        this._validacionesParada(datosParada, linea);

        // Crea la nueva parada (esto validará los datos básicos internamente)
        const nuevaParada = new Parada(datosParada);

        // Agrega la parada a la colección
        this.paradas.push(nuevaParada);

        // Guarda los cambios
        this._guardarDatos();

        return nuevaParada;
    }

    /**
     * @function actualizarParada
     * @description Actualiza una parada existente
     * @param {number} numero - Número de la parada a actualizar
     * @param {number} numeroLinea - Número de la línea de la parada
     * @param {Object} datosParada - Nuevos datos de la parada
     * @returns {Parada} La parada actualizada
     * @throws {Error} Si la parada no existe o hay problemas de validación
     */
    actualizarParada(numero, numeroLinea, datosParada) {
        // Busca la parada
        const indice = this.paradas.findIndex(
            parada => parada.numero === numero && parada.numeroLinea === numeroLinea
        );

        if (indice === -1) {
            throw new Error(`No existe la parada ${numero} en la línea ${numeroLinea}`);
        }

        // Verifica que exista la línea (podría estar cambiando de línea)
        const linea = this.obtenerLineaPorNumero(datosParada.numeroLinea);
        if (!linea) {
            throw new Error(`No existe la línea ${datosParada.numeroLinea}`);
        }

        // Si está cambiando de número, verifica que no exista ya
        if ((datosParada.numero !== numero || datosParada.numeroLinea !== numeroLinea) &&
            this.obtenerParadaPorNumero(datosParada.numero, datosParada.numeroLinea)) {
            throw new Error(`Ya existe una parada con el número ${datosParada.numero} en la línea ${datosParada.numeroLinea}`);
        }

        // Verifica validaciones adicionales
        this._validacionesParada(datosParada, linea);

        // Actualiza la parada (esto validará los datos básicos internamente)
        const paradaActualizada = new Parada(datosParada);

        // Reemplaza la parada en la colección
        this.paradas[indice] = paradaActualizada;

        // Guarda los cambios
        this._guardarDatos();

        return paradaActualizada;
    }

    /**
     * @function eliminarParada
     * @description Elimina una parada del sistema
     * @param {number} numero - Número de la parada a eliminar
     * @param {number} numeroLinea - Número de línea de la parada
     * @returns {boolean} true si se eliminó correctamente
     * @throws {Error} Si la parada no existe
     */
    eliminarParada(numero, numeroLinea) {
        // Busca la parada
        const indice = this.paradas.findIndex(
            parada => parada.numero === numero && parada.numeroLinea === numeroLinea
        );

        if (indice === -1) {
            throw new Error(`No existe la parada ${numero} en la línea ${numeroLinea}`);
        }

        // Elimina la parada
        this.paradas.splice(indice, 1);

        // Guarda los cambios
        this._guardarDatos();

        return true;
    }

    /**
     * @function cargarDatosDePrueba
     * @description Carga datos de ejemplo en el sistema
     * @returns {boolean} true si se cargaron correctamente
     */
    cargarDatosDePrueba() {
        // Limpia los datos actuales
        this.lineas = [];
        this.paradas = [];

        // Crea líneas de ejemplo
        try {
            this.agregarLinea({
                numero: 1,
                origen: "Avilés",
                destino: "Oviedo",
                horaSalida: "07:30",
                intervalo: "00:30"
            });

            this.agregarLinea({
                numero: 2,
                origen: "Avilés",
                destino: "Gijón",
                horaSalida: "08:00",
                intervalo: "00:45"
            });

            // Crea paradas para la línea 1
            this.agregarParada({
                numero: 1,
                numeroLinea: 1,
                localidad: "Avilés",
                intervalo: "00:00"
            });

            this.agregarParada({
                numero: 2,
                numeroLinea: 1,
                localidad: "Posada",
                intervalo: "00:15"
            });

            this.agregarParada({
                numero: 3,
                numeroLinea: 1,
                localidad: "Villalbañe",
                intervalo: "00:30"
            });

            this.agregarParada({
                numero: 4,
                numeroLinea: 1,
                localidad: "Lugones",
                intervalo: "00:45"
            });

            this.agregarParada({
                numero: 5,
                numeroLinea: 1,
                localidad: "Oviedo",
                intervalo: "01:00"
            });

            // Crea paradas para la línea 2
            this.agregarParada({
                numero: 1,
                numeroLinea: 2,
                localidad: "Avilés",
                intervalo: "00:00"
            });

            this.agregarParada({
                numero: 2,
                numeroLinea: 2,
                localidad: "Vegarrozadas",
                intervalo: "00:20"
            });

            this.agregarParada({
                numero: 3,
                numeroLinea: 2,
                localidad: "Candás",
                intervalo: "00:40"
            });

            this.agregarParada({
                numero: 4,
                numeroLinea: 2,
                localidad: "Gijón",
                intervalo: "01:10"
            });

            // Guarda los cambios
            this._guardarDatos();

            return true;
        } catch (error) {
            console.error("Error al cargar datos de prueba:", error);
            return false;
        }
    }

    // ===== MÉTODOS PRIVADOS =====

    /**
     * @private
     * @function _cargarDatos
     * @description Carga los datos desde localStorage
     */
    _cargarDatos() {
        try {
            // Recupera líneas
            const lineasJSON = localStorage.getItem('avilesa_lineas');
            if (lineasJSON) {
                const lineasData = JSON.parse(lineasJSON);
                this.lineas = lineasData.map(lineaData => Linea.fromJSON(lineaData));
            }

            // Recupera paradas
            const paradasJSON = localStorage.getItem('avilesa_paradas');
            if (paradasJSON) {
                const paradasData = JSON.parse(paradasJSON);
                this.paradas = paradasData.map(paradaData => Parada.fromJSON(paradaData));
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
            // En caso de error, inicializa con colecciones vacías
            this.lineas = [];
            this.paradas = [];
        }
    }

    /**
     * @private
     * @function _guardarDatos
     * @description Guarda los datos en localStorage
     */
    _guardarDatos() {
        try {
            // Guarda líneas
            localStorage.setItem('avilesa_lineas', JSON.stringify(this.lineas));

            // Guarda paradas
            localStorage.setItem('avilesa_paradas', JSON.stringify(this.paradas));
        } catch (error) {
            console.error("Error al guardar datos:", error);
        }
    }

    /**
     * @private
     * @function _validacionesParada
     * @description Realiza validaciones adicionales para una parada
     * @param {Object} datosParada - Datos de la parada a validar
     * @param {Linea} linea - Línea a la que pertenece la parada
     * @throws {Error} Si no cumple con las validaciones
     * 
     * IMPORTANTE: Validaciones específicas según requisitos:
     * 1. Si es origen, debe tener intervalo 00:00
     * 2. Si es destino, debe tener el intervalo mayor
     * 3. La localidad de origen debe coincidir con la línea
     * 4. La localidad de destino debe coincidir con la línea
     */
    _validacionesParada(datosParada, linea) {
        // Validación: Si la localidad es el origen de la línea, el intervalo debe ser 00:00
        if (datosParada.localidad.trim().toLowerCase() === linea.origen.toLowerCase()) {
            if (datosParada.intervalo !== "00:00") {
                throw new Error(`La parada de origen ${linea.origen} debe tener intervalo 00:00`);
            }
        }

        // Validación: Si la localidad es el destino de la línea, debe ser la de mayor intervalo
        if (datosParada.localidad.trim().toLowerCase() === linea.destino.toLowerCase()) {
            // Obtener todas las paradas de esa línea
            const paradasLinea = this.obtenerParadas(linea.numero);

            // Filtrar la parada actual si está actualizando
            const otrasParadas = paradasLinea.filter(
                p => !(p.numero === datosParada.numero && p.numeroLinea === datosParada.numeroLinea)
            );

            // Comprobar que el intervalo de la parada destino es mayor que las demás
            for (const parada of otrasParadas) {
                const minutosParada = this._convertirHoraAMinutos(parada.intervalo);
                const minutosNueva = this._convertirHoraAMinutos(datosParada.intervalo);

                if (minutosNueva <= minutosParada) {
                    throw new Error(`La parada destino ${linea.destino} debe tener el mayor intervalo`);
                }
            }
        }
    }

    /**
     * @private
     * @function _convertirHoraAMinutos
     * @description Convierte una hora en formato HH:MM a minutos
     * @param {string} hora - Hora en formato HH:MM
     * @returns {number} Minutos totales
     */
    _convertirHoraAMinutos(hora) {
        const [horas, minutos] = hora.split(':').map(Number);
        return horas * 60 + minutos;
    }
}

export default AvilesaService;
