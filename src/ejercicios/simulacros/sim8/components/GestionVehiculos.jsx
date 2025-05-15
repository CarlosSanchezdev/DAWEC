/**
 * @fileoverview Componente para la gestión CRUD de vehículos
 */

import { useState, useEffect } from "react";
import { useVehiculos } from "../context/VehiculosContext";
import FormularioVehiculo from "./FormularioVehiculo";
import TablaVehiculos from "./TablaVehiculos";

function GestionVehiculos() {
	const { vehiculos, loading, error, fetchVehiculos } = useVehiculos();
	const [vehiculoEditar, setVehiculoEditar] = useState(null);
	const [mostrarFormulario, setMostrarFormulario] = useState(false);

	useEffect(() => {
		fetchVehiculos();
	}, [fetchVehiculos]);

	const handleNuevoVehiculo = () => {
		setVehiculoEditar(null);
		setMostrarFormulario(true);
	};

	const handleEditar = (vehiculo) => {
		setVehiculoEditar(vehiculo);
		setMostrarFormulario(true);
	};

	const handleCancelarEdicion = () => {
		setVehiculoEditar(null);
		setMostrarFormulario(false);
	};

	if (loading) return <div>Cargando vehículos...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="gestion-vehiculos">
			<h2>Gestión de Vehículos</h2>

			<button
				onClick={handleNuevoVehiculo}
				className="btn-nuevo">
				Nuevo Vehículo
			</button>

			{mostrarFormulario && (
				<FormularioVehiculo
					vehiculo={vehiculoEditar}
					onCancel={handleCancelarEdicion}
				/>
			)}

			<TablaVehiculos
				vehiculos={vehiculos}
				onEditar={handleEditar}
			/>
		</div>
	);
}

export default GestionVehiculos;
