/**
 * @fileoverview Componente para mostrar la tabla de vehículos
 */

import { useVehiculos } from "../context/VehiculosContext";

function TablaVehiculos({ vehiculos, onEditar }) {
	const { deleteVehiculo } = useVehiculos();

	const handleEliminar = async (id) => {
		if (window.confirm("¿Está seguro de eliminar este vehículo?")) {
			await deleteVehiculo(id);
		}
	};

	if (!vehiculos.length) {
		return <p>No hay vehículos registrados</p>;
	}

	return (
		<div className="tabla-container">
			<table className="tabla-vehiculos">
				<thead>
					<tr>
						<th>Nº Chasis</th>
						<th>Marca</th>
						<th>Modelo</th>
						<th>Color</th>
						<th>Potencia (CV)</th>
						<th>Fecha Fab.</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{vehiculos.map((vehiculo) => (
						<tr key={vehiculo.id}>
							{" "}
							<td>{vehiculo.numChasis}</td>
							<td>{vehiculo.marca}</td>
							<td>{vehiculo.modelo}</td>
							<td>{vehiculo.color}</td>
							<td>{vehiculo.potencia}</td>
							<td>{new Date(vehiculo.fechaFabricacion).toLocaleDateString()}</td>
							<td className="acciones">
								<button
									onClick={() => onEditar(vehiculo)}
									className="btn-editar">
									Editar
								</button>
								<button
									onClick={() => handleEliminar(vehiculo.id)}
									className="btn-eliminar">
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TablaVehiculos;
