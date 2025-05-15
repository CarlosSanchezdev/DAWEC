/**
 * @fileoverview Ejercicio 2.23 - Bucle For y sus variantes
 * @ejercicio 2.23
 * @tema Bucles
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarBuclesFor
 * @description Ejemplifica diferentes tipos de bucles for en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarBuclesFor = () => {
    const resultados = [];

    // For clásico
    resultados.push("// For clásico:");
    for (let i = 0; i < 5; i++) {
        resultados.push(`Iteración ${i}`);
    }

    // For con múltiples variables
    resultados.push("\n// For con múltiples variables:");
    for (let i = 0, j = 10; i < 5; i++, j--) {
        resultados.push(`i: ${i}, j: ${j}`);
    }

    // For...in con objeto
    resultados.push("\n// For...in con objeto:");
    const persona = {
        nombre: "Ana",
        edad: 25,
        ciudad: "Madrid"
    };
    for (const propiedad in persona) {
        resultados.push(`${propiedad}: ${persona[propiedad]}`);
    }

    // For...of con array
    resultados.push("\n// For...of con array:");
    const colores = ["rojo", "verde", "azul"];
    for (const color of colores) {
        resultados.push(color);
    }

    // For...of con string
    resultados.push("\n// For...of con string:");
    const palabra = "Hola";
    for (const letra of palabra) {
        resultados.push(letra);
    }

    // For anidado
    resultados.push("\n// For anidado (tabla de multiplicar):");
    for (let i = 1; i <= 3; i++) {
        let fila = [];
        for (let j = 1; j <= 3; j++) {
            fila.push(i * j);
        }
        resultados.push(fila.join("\t"));
    }

    // For con break
    resultados.push("\n// For con break:");
    for (let i = 0; i < 10; i++) {
        if (i === 5) break;
        resultados.push(`Valor: ${i}`);
    }

    // For con continue
    resultados.push("\n// For con continue:");
    for (let i = 0; i < 5; i++) {
        if (i === 2) continue;
        resultados.push(`Número: ${i}`);
    }

    return resultados;
};

/**
 * @function Ej23
 * @description Componente que demuestra el uso de bucles for en JavaScript
 */
function Ej23() {
    const [output, setOutput] = useState("");

    const ejecutarEjemplos = () => {
        const resultados = demostrarBuclesFor();
        setOutput(resultados.join("\n"));
    };

    return (
        <div className="ejercicio-container">
            <div className="ejercicio-header">
                <h2>Ejercicio 2.23: Bucle For y sus variantes</h2>
                <p className="enunciado">
                    Exploración de los diferentes tipos de bucles for en JavaScript:
                    for clásico, for...in, for...of y variantes.
                </p>
            </div>

            <div className="codigo-ejemplo">
                <pre>
                    <code>{`// For clásico
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For con múltiples variables
for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(i, j);
}

// For...in (objetos)
const obj = { a: 1, b: 2 };
for (const prop in obj) {
    console.log(prop, obj[prop]);
}

// For...of (iterables)
const array = [1, 2, 3];
for (const elemento of array) {
    console.log(elemento);
}

// Break y continue
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    if (i === 2) continue;
    console.log(i);
}`}</code>
                </pre>
            </div>

            <div className="ejercicio-buttons">
                <button onClick={ejecutarEjemplos} className="ejecutar-btn">
                    Ejecutar ejemplos
                </button>
            </div>

            {output && (
                <div className="codigo-output">
                    <h3>Resultados:</h3>
                    <pre>{output}</pre>
                </div>
            )}

            <div className="ejercicio-info">
                <h3>Conceptos clave:</h3>
                <ul>
                    <li>Bucle for clásico</li>
                    <li>For con múltiples variables</li>
                    <li>For...in para objetos</li>
                    <li>For...of para iterables</li>
                    <li>Break y continue</li>
                    <li>Bucles anidados</li>
                </ul>
            </div>
        </div>
    );
}

export default Ej23;
