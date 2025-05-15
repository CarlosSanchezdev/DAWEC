/**
 * @fileoverview Contexto para la gestión de vehículos del concesionario
 */

import { createContext, useContext, useState, useCallback } from "react";

const VehiculosContext = createContext();

const API_URL = "http://localhost:8000/vehiculos.php";

export function VehiculosProvider({ children }) {
	const [vehiculos, setVehiculos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Obtener todos los vehículos
	const fetchVehiculos = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(API_URL);
			if (!response.ok) throw new Error("Error al obtener vehículos");
			const data = await response.json();
			setVehiculos(data);
			setError(null);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Obtener un vehículo por ID
	const getVehiculoById = useCallback(async (id) => {
		try {
			const response = await fetch(`${API_URL}?id=${id}`);
			if (!response.ok) throw new Error("Error al obtener vehículo");
			return await response.json();
		} catch (err) {
			setError(err.message);
			return null;
		}
	}, []);

	// Crear nuevo vehículo
	const createVehiculo = useCallback(
		async (vehiculo) => {
			try {
				const response = await fetch(API_URL, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(vehiculo),
				});
				if (!response.ok) throw new Error("Error al crear vehículo");
				await fetchVehiculos();
				return true;
			} catch (err) {
				setError(err.message);
				return false;
			}
		},
		[fetchVehiculos]
	);

	// Actualizar vehículo
	const updateVehiculo = useCallback(
		async (vehiculo) => {
			try {
				const response = await fetch(API_URL, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(vehiculo),
				});
				if (!response.ok) throw new Error("Error al actualizar vehículo");
				await fetchVehiculos();
				return true;
			} catch (err) {
				setError(err.message);
				return false;
			}
		},
		[fetchVehiculos]
	);

	// Eliminar vehículo
	const deleteVehiculo = useCallback(
		async (id) => {
			try {
				const response = await fetch(API_URL, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id }),
				});
				if (!response.ok) throw new Error("Error al eliminar vehículo");
				await fetchVehiculos();
				return true;
			} catch (err) {
				setError(err.message);
				return false;
			}
		},
		[fetchVehiculos]
	);

	// Verificar si existe número de chasis
	const verificarChasis = useCallback(
		async (chasis, idExcluir = null) => {
			try {
				const vehiculosActuales = await fetchVehiculos();
				return vehiculosActuales.some((v) => v.numChasis === chasis && (!idExcluir || v.id !== idExcluir));
			} catch (err) {
				setError(err.message);
				return false;
			}
		},
		[fetchVehiculos]
	);

	// Calcular estadísticas
	const calcularEstadisticas = useCallback(
		(marca = null) => {
			const vehiculosFiltrados = marca ? vehiculos.filter((v) => v.marca === marca) : vehiculos;

			if (vehiculosFiltrados.length === 0) {
				return { media: 0, minima: 0, maxima: 0 };
			}

			const potencias = vehiculosFiltrados.map((v) => v.potencia);
			return {
				media: potencias.reduce((a, b) => a + b, 0) / potencias.length,
				minima: Math.min(...potencias),
				maxima: Math.max(...potencias),
			};
		},
		[vehiculos]
	);

	const value = {
		vehiculos,
		loading,
		error,
		fetchVehiculos,
		getVehiculoById,
		createVehiculo,
		updateVehiculo,
		deleteVehiculo,
		verificarChasis,
		calcularEstadisticas,
	};

	return <VehiculosContext.Provider value={value}>{children}</VehiculosContext.Provider>;
}

export function useVehiculos() {
	const context = useContext(VehiculosContext);
	if (!context) {
		throw new Error("useVehiculos debe usarse dentro de un VehiculosProvider");
	}
	return context;
}
