/**
 * @fileoverview Componente de formulario para crear/editar vehículos
 */

import { useState, useEffect } from "react";
import { useVehiculos } from "../context/VehiculosContext";
import { useValidacion } from "../context/ValidacionContext";

function FormularioVehiculo({ vehiculo = null, onCancel }) {
	const { createVehiculo, updateVehiculo, verificarChasis } = useVehiculos();
	const validaciones = useValidacion();
	const [formData, setFormData] = useState({
		numChasis: "",
		marca: "",
		modelo: "",
		color: "",
		potencia: "",
		fechaFabricacion: "",
	});

	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (vehiculo) {
			setFormData({
				numChasis: vehiculo.numChasis,
				marca: vehiculo.marca,
				modelo: vehiculo.modelo,
				color: vehiculo.color,
				potencia: vehiculo.potencia,
				fechaFabricacion: vehiculo.fechaFabricacion,
			});
		}
	}, [vehiculo]);

	const validarFormulario = async () => {
		const errores = {};
		// Validar número de chasis
		if (!formData.numChasis) {
			errores.numChasis = "El número de chasis es requerido";
		} else if (!validaciones.REGEX_CHASIS.test(formData.numChasis)) {
			errores.numChasis = "El número de chasis debe tener 8 dígitos";
		} else {
			// Verificar duplicados
			const existeChasis = await verificarChasis(formData.numChasis, vehiculo?.id);
			if (existeChasis) {
				errores.numChasis = "Este número de chasis ya existe";
			}
		}

		// Validar marca
		if (!formData.marca) {
			errores.marca = "La marca es requerida";
		} else if (!validaciones.REGEX_TEXTO.test(formData.marca)) {
			errores.marca = "La marca solo debe contener texto";
		}

		// Validar modelo
		if (!formData.modelo) {
			errores.modelo = "El modelo es requerido";
		}

		// Validar color
		if (!formData.color) {
			errores.color = "El color es requerido";
		} else if (!validaciones.REGEX_TEXTO.test(formData.color)) {
			errores.color = "El color solo debe contener texto";
		}

		// Validar potencia
		if (!formData.potencia) {
			errores.potencia = "La potencia es requerida";
		} else if (parseInt(formData.potencia) <= validaciones.MIN_POTENCIA) {
			errores.potencia = `La potencia debe ser mayor a ${validaciones.MIN_POTENCIA}CV`;
		}

		// Validar fecha
		if (!formData.fechaFabricacion) {
			errores.fechaFabricacion = "La fecha es requerida";
		} else if (formData.fechaFabricacion > validaciones.MAX_FECHA) {
			errores.fechaFabricacion = "La fecha no puede ser futura";
		}

		return errores;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const errores = await validarFormulario();
		if (Object.keys(errores).length > 0) {
			setErrors(errores);
			setSubmitting(false);
			return;
		}

		try {
			if (vehiculo) {
				await updateVehiculo({ ...formData, id: vehiculo.id });
			} else {
				await createVehiculo(formData);
			}
			onCancel();
		} catch (err) {
			setErrors({ submit: err.message });
		} finally {
			setSubmitting(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Limpiar error del campo cuando cambia
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="formulario-vehiculo">
			<h3>{vehiculo ? "Editar Vehículo" : "Nuevo Vehículo"}</h3>

			<div className="form-group">
				{" "}
				<label htmlFor="numChasis">Número de Chasis:</label>
				<input
					type="text"
					id="numChasis"
					name="numChasis"
					value={formData.numChasis}
					onChange={handleChange}
					disabled={submitting}
				/>
				{errors.numChasis && <span className="error">{errors.numChasis}</span>}
			</div>

			<div className="form-group">
				<label htmlFor="marca">Marca:</label>
				<input
					type="text"
					id="marca"
					name="marca"
					value={formData.marca}
					onChange={handleChange}
					disabled={submitting}
				/>
				{errors.marca && <span className="error">{errors.marca}</span>}
			</div>

			<div className="form-group">
				<label htmlFor="modelo">Modelo:</label>
				<input
					type="text"
					id="modelo"
					name="modelo"
					value={formData.modelo}
					onChange={handleChange}
					disabled={submitting}
				/>
				{errors.modelo && <span className="error">{errors.modelo}</span>}
			</div>

			<div className="form-group">
				<label htmlFor="color">Color:</label>
				<input
					type="text"
					id="color"
					name="color"
					value={formData.color}
					onChange={handleChange}
					disabled={submitting}
				/>
				{errors.color && <span className="error">{errors.color}</span>}
			</div>

			<div className="form-group">
				<label htmlFor="potencia">Potencia (CV):</label>
				<input
					type="number"
					id="potencia"
					name="potencia"
					value={formData.potencia}
					onChange={handleChange}
					disabled={submitting}
				/>
				{errors.potencia && <span className="error">{errors.potencia}</span>}
			</div>

			<div className="form-group">
				<label htmlFor="fechaFabricacion">Fecha de Fabricación:</label>
				<input
					type="date"
					id="fechaFabricacion"
					name="fechaFabricacion"
					value={formData.fechaFabricacion}
					onChange={handleChange}
					max={validaciones.MAX_FECHA}
					disabled={submitting}
				/>
				{errors.fechaFabricacion && <span className="error">{errors.fechaFabricacion}</span>}
			</div>

			{errors.submit && <div className="error">{errors.submit}</div>}

			<div className="form-actions">
				<button
					type="submit"
					disabled={submitting}
					className="btn-submit">
					{submitting ? "Guardando..." : "Guardar"}
				</button>
				<button
					type="button"
					onClick={onCancel}
					disabled={submitting}
					className="btn-cancel">
					Cancelar
				</button>
			</div>
		</form>
	);
}

export default FormularioVehiculo;
