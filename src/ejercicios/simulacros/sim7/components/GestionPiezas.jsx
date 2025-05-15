/**
 * @fileoverview Componente para la gestión de piezas
 * @ejercicio Simulacro 7 - MaderAvilés
 */

import { useState, useEffect } from "react";
import Storage from "../utils/Storage";
import Pieza from "../models/Pieza";
import * as Validacion from "../utils/Validacion";

/**
 * @function GestionPiezas
 * @description Componente para gestionar las piezas de madera
 */
function GestionPiezas() {
	// Estados
	const [piezas, setPiezas] = useState([]);
	const [pedidos, setPedidos] = useState([]);
	const [piezaActual, setPiezaActual] = useState(null);
	const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

	// Cargar datos al montar el componente
	useEffect(() => {
		const piezasGuardadas = Storage.obtenerPiezas();
		const pedidosGuardados = Storage.obtenerPedidos();
		setPiezas(piezasGuardadas);
		setPedidos(pedidosGuardados);
	}, []);

	// Manejadores de eventos
	const handleSubmit = (e) => {
		e.preventDefault();

		// Crear nueva pieza desde el formulario
		const formData = new FormData(e.target);
		const nuevaPieza = new Pieza(
			parseInt(formData.get("numeroPieza")),
			parseInt(formData.get("numeroPedido")),
			parseFloat(formData.get("largo")),
			parseFloat(formData.get("ancho")),
			parseFloat(formData.get("grosor")),
			formData.get("color"),
			formData.get("ambasCaras") === "true"
		);

		// Validar pieza
		const { esValido, errores } = nuevaPieza.validar();

		if (!esValido) {
			setMensaje({
				tipo: "error",
				texto: errores.join(". "),
			});
			return;
		}

		// Verificar si existe el pedido
		if (!pedidos.some((p) => p.numeroPedido === nuevaPieza.numeroPedido)) {
			setMensaje({
				tipo: "error",
				texto: "El número de pedido no existe",
			});
			return;
		}

		// Verificar si ya existe el número de pieza
		if (piezaActual === null && piezas.some((p) => p.numeroPieza === nuevaPieza.numeroPieza)) {
			setMensaje({
				tipo: "error",
				texto: "Ya existe una pieza con ese número",
			});
			return;
		}

		// Actualizar o agregar pieza
		if (piezaActual !== null) {
			const piezasActualizadas = piezas.map((p) => (p.numeroPieza === piezaActual.numeroPieza ? nuevaPieza : p));
			setPiezas(piezasActualizadas);
			Storage.guardarPiezas(piezasActualizadas);
			setMensaje({
				tipo: "exito",
				texto: "Pieza actualizada correctamente",
			});
		} else {
			setPiezas([...piezas, nuevaPieza]);
			Storage.guardarPiezas([...piezas, nuevaPieza]);
			setMensaje({
				tipo: "exito",
				texto: "Pieza creada correctamente",
			});
		}

		// Limpiar formulario y estado
		e.target.reset();
		setPiezaActual(null);
	};

	const handleEditar = (pieza) => {
		setPiezaActual(pieza);
		setMensaje({ tipo: "", texto: "" });
	};

	const handleEliminar = (numeroPieza) => {
		const piezasActualizadas = piezas.filter((p) => p.numeroPieza !== numeroPieza);
		setPiezas(piezasActualizadas);
		Storage.guardarPiezas(piezasActualizadas);
		setMensaje({
			tipo: "exito",
			texto: "Pieza eliminada correctamente",
		});
	};

	return (
		<div className="gestion-piezas">
			<h2>Gestión de Piezas</h2>

			{/* Formulario de piezas */}
			<form
				className="form-container"
				onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="numeroPieza">Número de Pieza:</label>
					<input
						type="number"
						id="numeroPieza"
						name="numeroPieza"
						required
						min="1"
						step="1"
						defaultValue={piezaActual?.numeroPieza}
						readOnly={piezaActual !== null}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="numeroPedido">Número de Pedido:</label>
					<select
						id="numeroPedido"
						name="numeroPedido"
						required
						defaultValue={piezaActual?.numeroPedido}>
						<option value="">Seleccione un pedido</option>
						{pedidos.map((pedido) => (
							<option
								key={pedido.numeroPedido}
								value={pedido.numeroPedido}>
								{pedido.numeroPedido} - {pedido.cliente}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="largo">Largo (cm):</label>
					<input
						type="number"
						id="largo"
						name="largo"
						required
						min="0.1"
						step="0.1"
						defaultValue={piezaActual?.largo}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="ancho">Ancho (cm):</label>
					<input
						type="number"
						id="ancho"
						name="ancho"
						required
						min="0.1"
						step="0.1"
						defaultValue={piezaActual?.ancho}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="grosor">Grosor (cm):</label>
					<input
						type="number"
						id="grosor"
						name="grosor"
						required
						min="0.1"
						step="0.1"
						defaultValue={piezaActual?.grosor}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="color">Color:</label>
					<select
						id="color"
						name="color"
						required
						defaultValue={piezaActual?.color}>
						<option value="Natural">Natural (sin chapear)</option>
						<option value="Roble">Roble</option>
						<option value="Nogal">Nogal</option>
						<option value="Cerezo">Cerezo</option>
						<option value="Wengué">Wengué</option>
					</select>
				</div>

				<div className="form-group">
					<label>
						<input
							type="checkbox"
							name="ambasCaras"
							value="true"
							defaultChecked={piezaActual?.ambasCaras}
						/>
						Chapear ambas caras
					</label>
				</div>

				<button
					type="submit"
					className="btn btn-primary">
					{piezaActual ? "Actualizar Pieza" : "Crear Pieza"}
				</button>

				{piezaActual && (
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => setPiezaActual(null)}>
						Cancelar Edición
					</button>
				)}
			</form>

			{/* Mensajes de estado */}
			{mensaje.texto && <div className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</div>}

			{/* Tabla de piezas */}
			<div className="tabla-container">
				<table className="tabla-datos">
					<thead>
						<tr>
							<th>Nº Pieza</th>
							<th>Nº Pedido</th>
							<th>Largo</th>
							<th>Ancho</th>
							<th>Grosor</th>
							<th>Color</th>
							<th>Ambas Caras</th>
							<th>Cortada</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{piezas.map((pieza) => (
							<tr key={pieza.numeroPieza}>
								<td>{pieza.numeroPieza}</td>
								<td>{pieza.numeroPedido}</td>
								<td>{Validacion.formatearMedida(pieza.largo)}</td>
								<td>{Validacion.formatearMedida(pieza.ancho)}</td>
								<td>{Validacion.formatearMedida(pieza.grosor)}</td>
								<td>{pieza.color}</td>
								<td>{pieza.ambasCaras ? "Sí" : "No"}</td>
								<td>{pieza.cortada ? "Sí" : "No"}</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() => handleEditar(pieza)}>
										Editar
									</button>
									<button
										className="btn btn-danger"
										onClick={() => handleEliminar(pieza.numeroPieza)}>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default GestionPiezas;
