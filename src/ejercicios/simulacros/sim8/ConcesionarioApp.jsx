/**
 * @fileoverview Aplicación principal del concesionario
 * @ejercicio Simulacro 8 - Concesionario
 * @tema Evaluación 2 - React, Componentes, Eventos, API REST
 */

import { VehiculosProvider } from "./context/VehiculosContext";
import { ValidacionProvider } from "./context/ValidacionContext";
import GestionVehiculos from "./components/GestionVehiculos";
import EstadisticasVehiculos from "./components/EstadisticasVehiculos";
import "./ConcesionarioApp.css";

function ConcesionarioApp() {
	return (
		<ValidacionProvider>
			<VehiculosProvider>
				<div className="concesionario-container">
					<h1>Gestión de Concesionario</h1>

					<div className="main-content">
						<GestionVehiculos />
						<EstadisticasVehiculos />
					</div>
				</div>
			</VehiculosProvider>
		</ValidacionProvider>
	);
}

export default ConcesionarioApp;
