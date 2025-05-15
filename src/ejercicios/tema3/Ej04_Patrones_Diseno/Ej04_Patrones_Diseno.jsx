/**
 * @fileoverview Ejercicio sobre Patrones de Diseño en JavaScript
 * @ejercicio EJ04
 * @tema Tema 3 - JavaScript Arrays, Funciones y Objetos
 * @fecha ${new Date().toLocaleDateString()}
 */

import { useState } from "react";
import "./Ej04_Patrones_Diseno.css";

/**
 * @function Ej04_Patrones_Diseno
 * @description Componente que demuestra diferentes patrones de diseño en JavaScript
 * @returns {JSX.Element} Componente con ejemplos de Singleton, Factory, Strategy e Iterator
 */
function Ej04_Patrones_Diseno() {
	// ===== ESTADOS =====
	const [activeTab, setActiveTab] = useState("singleton");
	const [consoleOutput, setConsoleOutput] = useState([]);

	// ===== FUNCIONES AUXILIARES =====
	const addToConsole = (output) => {
		setConsoleOutput((prev) => [...prev, output]);
	};

	const clearConsole = () => {
		setConsoleOutput([]);
	};

	// ===== EJEMPLOS Y DEMOSTRACIONES =====
	const ejemploSingleton = () => {
		clearConsole();

		// Ejemplo de Singleton
		addToConsole("// Implementación del patrón Singleton:");
		addToConsole(`
class ConfiguracionApp {
    constructor() {
        if (ConfiguracionApp.instance) {
            return ConfiguracionApp.instance;
        }
        
        this.config = {
            tema: 'claro',
            idioma: 'es'
        };
        
        ConfiguracionApp.instance = this;
    }

    getConfig() {
        return this.config;
    }

    setConfig(key, value) {
        this.config[key] = value;
    }
}`);

		addToConsole("\n// Uso del Singleton:");
		addToConsole(`
const config1 = new ConfiguracionApp();
const config2 = new ConfiguracionApp();

console.log(config1 === config2); // true - misma instancia`);
	};

	const ejemploFactory = () => {
		clearConsole();

		// Ejemplo de Factory
		addToConsole("// Implementación del patrón Factory:");
		addToConsole(`
class Vehiculo {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }
}

class Coche extends Vehiculo {
    getTipo() {
        return 'Coche';
    }
}

class Moto extends Vehiculo {
    getTipo() {
        return 'Moto';
    }
}

class VehiculoFactory {
    crearVehiculo(tipo, marca, modelo) {
        switch(tipo) {
            case 'coche':
                return new Coche(marca, modelo);
            case 'moto':
                return new Moto(marca, modelo);
            default:
                throw new Error('Tipo de vehículo no válido');
        }
    }
}`);

		addToConsole("\n// Uso del Factory:");
		addToConsole(`
const factory = new VehiculoFactory();
const miCoche = factory.crearVehiculo('coche', 'Toyota', 'Corolla');
console.log(miCoche.getTipo()); // 'Coche'`);
	};

	const ejemploStrategy = () => {
		clearConsole();

		// Ejemplo de Strategy
		addToConsole("// Implementación del patrón Strategy:");
		addToConsole(`
// Estrategias de pago
class EstrategiaPagoPayPal {
    pagar(cantidad) {
        return \`Pagando \${cantidad}€ con PayPal\`;
    }
}

class EstrategiaPagoTarjeta {
    pagar(cantidad) {
        return \`Pagando \${cantidad}€ con tarjeta de crédito\`;
    }
}

// Contexto
class Compra {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    setEstrategia(estrategia) {
        this.estrategia = estrategia;
    }

    realizarPago(cantidad) {
        return this.estrategia.pagar(cantidad);
    }
}`);

		addToConsole("\n// Uso del Strategy:");
		addToConsole(`
const compra = new Compra(new EstrategiaPagoPayPal());
console.log(compra.realizarPago(100)); // 'Pagando 100€ con PayPal'

compra.setEstrategia(new EstrategiaPagoTarjeta());
console.log(compra.realizarPago(100)); // 'Pagando 100€ con tarjeta de crédito'`);
	};

	const ejemploIterator = () => {
		clearConsole();

		// Ejemplo de Iterator
		addToConsole("// Implementación del patrón Iterator:");
		addToConsole(`
class Matriz {
    constructor(ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
        this.contenido = new Array(ancho * alto).fill(0);
    }

    get(x, y) {
        return this.contenido[y * this.ancho + x];
    }

    set(x, y, valor) {
        this.contenido[y * this.ancho + x] = valor;
    }

    [Symbol.iterator]() {
        let x = 0;
        let y = 0;
        const matriz = this;

        return {
            next() {
                if (y === matriz.alto) {
                    return { done: true };
                }

                const value = {
                    x: x,
                    y: y,
                    valor: matriz.get(x, y)
                };

                x++;
                if (x === matriz.ancho) {
                    x = 0;
                    y++;
                }

                return { value, done: false };
            }
        };
    }
}`);

		addToConsole("\n// Uso del Iterator:");
		addToConsole(`
const matriz = new Matriz(2, 2);
matriz.set(0, 0, 1);
matriz.set(1, 0, 2);
matriz.set(0, 1, 3);
matriz.set(1, 1, 4);

for (const celda of matriz) {
    console.log(\`Posición (\${celda.x},\${celda.y}): \${celda.valor}\`);
}`);
	};

	return (
		<div className="ejercicio-container">
			<h2>Ejercicio 4: Patrones de Diseño</h2>

			<div className="tabs">
				<button
					className={activeTab === "singleton" ? "active" : ""}
					onClick={() => {
						setActiveTab("singleton");
						ejemploSingleton();
					}}>
					Singleton
				</button>
				<button
					className={activeTab === "factory" ? "active" : ""}
					onClick={() => {
						setActiveTab("factory");
						ejemploFactory();
					}}>
					Factory
				</button>
				<button
					className={activeTab === "strategy" ? "active" : ""}
					onClick={() => {
						setActiveTab("strategy");
						ejemploStrategy();
					}}>
					Strategy
				</button>
				<button
					className={activeTab === "iterator" ? "active" : ""}
					onClick={() => {
						setActiveTab("iterator");
						ejemploIterator();
					}}>
					Iterator
				</button>
			</div>

			<div className="content-section">
				{activeTab === "singleton" && (
					<div className="tab-content">
						<h3>Patrón Singleton</h3>
						<p>
							El patrón Singleton garantiza que una clase tenga una única instancia y proporciona un punto
							de acceso global a ella:
						</p>
						<ul>
							<li>Una única instancia compartida</li>
							<li>Acceso global controlado</li>
							<li>Inicialización diferida</li>
							<li>Útil para configuraciones y recursos compartidos</li>
						</ul>
					</div>
				)}

				{activeTab === "factory" && (
					<div className="tab-content">
						<h3>Patrón Factory</h3>
						<p>
							El patrón Factory proporciona una interfaz para crear objetos en una superclase, permitiendo
							que las subclases alteren el tipo de objetos creados:
						</p>
						<ul>
							<li>Creación de objetos sin exponer la lógica</li>
							<li>Referencias a objetos a través de una interfaz común</li>
							<li>Desacoplamiento entre la creación y el uso de objetos</li>
							<li>Extensibilidad del código</li>
						</ul>
					</div>
				)}

				{activeTab === "strategy" && (
					<div className="tab-content">
						<h3>Patrón Strategy</h3>
						<p>
							El patrón Strategy permite definir una familia de algoritmos, encapsular cada uno y hacerlos
							intercambiables:
						</p>
						<ul>
							<li>Intercambio de algoritmos en tiempo de ejecución</li>
							<li>Encapsulación de algoritmos</li>
							<li>Eliminación de condicionales complejos</li>
							<li>Flexibilidad en la elección de comportamientos</li>
						</ul>
					</div>
				)}

				{activeTab === "iterator" && (
					<div className="tab-content">
						<h3>Patrón Iterator</h3>
						<p>
							El patrón Iterator proporciona una forma de acceder secuencialmente a los elementos de una
							colección sin exponer su representación subyacente:
						</p>
						<ul>
							<li>Recorrido uniforme de colecciones</li>
							<li>Abstracción de la implementación</li>
							<li>Múltiples iteradores concurrentes</li>
							<li>Simplificación del código cliente</li>
						</ul>
					</div>
				)}
			</div>

			<div className="console-section">
				<h3>Consola:</h3>
				<div className="console">
					{consoleOutput.map((output, index) => (
						<div
							key={index}
							className="console-line">
							{output}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Ej04_Patrones_Diseno;
