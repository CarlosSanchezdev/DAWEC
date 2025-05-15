/**
 * @fileoverview Componente principal de la aplicación MaderAvilés
 * @ejercicio Simulacro 7 - MaderAvilés (Ejemplo examen 1ª evaluación)
 * @tema UT2, UT3, UT4, UT5
 * @fecha 14/05/2025
 */

import { useState } from "react";
import GestionPedidos from "./components/GestionPedidos";
import GestionPiezas from "./components/GestionPiezas";
import DetallePedido from "./components/DetallePedido";
import "./MaderAvilesApp.css";

/**
 * @function MaderAvilesApp
 * @description Componente principal que contiene toda la aplicación MaderAvilés
 * @returns {JSX.Element} Componente principal de la aplicación
 */
function MaderAvilesApp() {
	const [vistaActual, setVistaActual] = useState("pedidos");

	return (
		<div className="maderaviles-app">
			<header className="app-header">
				<h1>MaderAvilés</h1>
				<div className="app-description">Sistema de Gestión de Carpintería</div>
				<nav className="app-nav">
					<button
						className={vistaActual === "pedidos" ? "active" : ""}
						onClick={() => setVistaActual("pedidos")}>
						Gestión de Pedidos
					</button>
					<button
						className={vistaActual === "piezas" ? "active" : ""}
						onClick={() => setVistaActual("piezas")}>
						Gestión de Piezas
					</button>
					<button
						className={vistaActual === "detalle" ? "active" : ""}
						onClick={() => setVistaActual("detalle")}>
						Detalle de Pedido
					</button>
				</nav>
			</header>

			<main className="app-content">
				{vistaActual === "pedidos" && <GestionPedidos />}
				{vistaActual === "piezas" && <GestionPiezas />}
				{vistaActual === "detalle" && <DetallePedido />}
			</main>

			<footer className="app-footer">
				<p>MaderAvilés &copy; 2025 - Ejemplo de examen 1ª evaluación DWEC</p>
			</footer>
		</div>
	);
}

export default MaderAvilesApp;
