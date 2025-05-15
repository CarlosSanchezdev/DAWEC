/**
 * @fileoverview Ejercicio 2.22 - Estructura Switch
 * @ejercicio 2.22
 * @tema Estructuras de Control
 * @fecha 14/05/2025
 */

import { useState } from "react";
import "../ejercicio.css";

/**
 * @function demostrarSwitch
 * @description Ejemplifica diferentes usos de la estructura switch en JavaScript
 * @returns {string[]} Array con los resultados de las operaciones
 */
const demostrarSwitch = () => {
    const resultados = [];

    // Switch básico
    const dia = new Date().getDay();
    resultados.push("// Switch básico con días de la semana:");
    switch (dia) {
        case 0:
            resultados.push("Domingo");
            break;
        case 1:
            resultados.push("Lunes");
            break;
        case 2:
            resultados.push("Martes");
            break;
        case 3:
            resultados.push("Miércoles");
            break;
        case 4:
            resultados.push("Jueves");
            break;
        case 5:
            resultados.push("Viernes");
            break;
        case 6:
            resultados.push("Sábado");
            break;
        default:
            resultados.push("Día inválido");
    }

    // Switch con casos agrupados
    const mes = new Date().getMonth();
    resultados.push("\n// Switch con casos agrupados (estaciones):");
    switch (mes) {
        case 11:
        case 0:
        case 1:
            resultados.push("Invierno");
            break;
        case 2:
        case 3:
        case 4:
            resultados.push("Primavera");
            break;
        case 5:
        case 6:
        case 7:
            resultados.push("Verano");
            break;
        case 8:
        case 9:
        case 10:
            resultados.push("Otoño");
            break;
        default:
            resultados.push("Mes inválido");
    }

    // Switch con strings
    const tipo = "admin";
    resultados.push("\n// Switch con strings:");
    switch (tipo.toLowerCase()) {
        case "admin":
            resultados.push("Acceso total");
            break;
        case "editor":
            resultados.push("Puede editar contenido");
            break;
        case "usuario":
            resultados.push("Acceso básico");
            break;
        default:
            resultados.push("Sin acceso");
    }

    // Switch sin break (fall-through)
    const nivel = 2;
    resultados.push("\n// Switch sin break (acumulativo):");
    switch (nivel) {
        case 3:
            resultados.push("Acceso a configuración avanzada");
        // falls through
        case 2:
            resultados.push("Acceso a herramientas especiales");
        // falls through
        case 1:
            resultados.push("Acceso básico");
            break;
        default:
            resultados.push("Sin acceso");
    }

    // Switch con expresiones
    const puntuacion = 85;
    resultados.push("\n// Switch con expresiones:");
    switch (true) {
        case puntuacion >= 90:
            resultados.push("Sobresaliente");
            break;
        case puntuacion >= 70:
            resultados.push("Notable");
            break;
        case puntuacion >= 50:
            resultados.push("Aprobado");
            break;
        default:
            resultados.push("Suspenso");
    }

    return resultados;
};

/**
 * @function Ej22
 * @description Componente que demuestra el uso de switch en JavaScript
 */
function Ej22() {
    const [output, setOutput] = useState("");

    const ejecutarEjemplos = () => {
        const resultados = demostrarSwitch();
        setOutput(resultados.join("\n"));
    };

    return (
        <div className="ejercicio-container">
            <div className="ejercicio-header">
                <h2>Ejercicio 2.22: Estructura Switch</h2>
                <p className="enunciado">
                    Exploración de la estructura switch en JavaScript: casos simples,
                    agrupados y técnicas avanzadas.
                </p>
            </div>

            <div className="codigo-ejemplo">
                <pre>
                    <code>{`// Switch básico
switch (dia) {
    case 0:
        console.log("Domingo");
        break;
    case 1:
        console.log("Lunes");
        break;
    default:
        console.log("Otro día");
}

// Casos agrupados
switch (mes) {
    case 11:
    case 0:
    case 1:
        console.log("Invierno");
        break;
    // ... más casos
}

// Switch con strings
switch (tipo.toLowerCase()) {
    case "admin":
        console.log("Acceso total");
        break;
    default:
        console.log("Sin acceso");
}

// Fall-through (sin break)
switch (nivel) {
    case 3:
        console.log("Nivel 3");
        // falls through
    case 2:
        console.log("Nivel 2");
        // falls through
    case 1:
        console.log("Nivel 1");
        break;
}

// Switch con expresiones
switch (true) {
    case puntuacion >= 90:
        console.log("Sobresaliente");
        break;
    // ... más casos
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
                    <li>Estructura switch básica</li>
                    <li>Break y comportamiento fall-through</li>
                    <li>Casos agrupados</li>
                    <li>Switch con strings</li>
                    <li>Switch con expresiones</li>
                    <li>Default case</li>
                </ul>
            </div>
        </div>
    );
}

export default Ej22;
