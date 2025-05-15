/**
 * @fileoverview Componente para la gestión de pedidos
 * @ejercicio Simulacro 7 - MaderAvilés
 */

import { useState, useEffect } from "react";
import Storage from "../utils/Storage";
import Pedido from "../models/Pedido";
import * as Validacion from "../utils/Validacion";

/**
 * @function GestionPedidos
 * @description Componente para gestionar los pedidos de la carpintería
 */
function GestionPedidos() {
	// Estados
	const [pedidos, setPedidos] = useState([]);
	const [pedidoActual, setPedidoActual] = useState(null);
	const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

	// Cargar pedidos al montar el componente
	useEffect(() => {
		const pedidosGuardados = Storage.obtenerPedidos();
		setPedidos(pedidosGuardados);
	}, []);

	// Manejadores de eventos
	const handleSubmit = (e) => {
		e.preventDefault();

		// Crear nuevo pedido desde el formulario
		const formData = new FormData(e.target);
		const nuevoPedido = new Pedido(
			parseInt(formData.get("numeroPedido")),
			formData.get("cliente"),
			new Date(formData.get("fechaPedido"))
		);

		// Validar pedido
		const { esValido, errores } = nuevoPedido.validar();

		if (!esValido) {
			setMensaje({
				tipo: "error",
				texto: errores.join(". "),
			});
			return;
		}

		// Verificar si ya existe el número de pedido
		if (pedidoActual === null && pedidos.some((p) => p.numeroPedido === nuevoPedido.numeroPedido)) {
			setMensaje({
				tipo: "error",
				texto: "Ya existe un pedido con ese número",
			});
			return;
		}

		// Actualizar o agregar pedido
		if (pedidoActual !== null) {
			const pedidosActualizados = pedidos.map((p) =>
				p.numeroPedido === pedidoActual.numeroPedido ? nuevoPedido : p
			);
			setPedidos(pedidosActualizados);
			Storage.guardarPedidos(pedidosActualizados);
			setMensaje({
				tipo: "exito",
				texto: "Pedido actualizado correctamente",
			});
		} else {
			setPedidos([...pedidos, nuevoPedido]);
			Storage.guardarPedidos([...pedidos, nuevoPedido]);
			setMensaje({
				tipo: "exito",
				texto: "Pedido creado correctamente",
			});
		}

		// Limpiar formulario y estado
		e.target.reset();
		setPedidoActual(null);
	};

	const handleEditar = (pedido) => {
		setPedidoActual(pedido);
		setMensaje({ tipo: "", texto: "" });
	};

	const handleEliminar = (numeroPedido) => {
		const pedidosActualizados = pedidos.filter((p) => p.numeroPedido !== numeroPedido);
		setPedidos(pedidosActualizados);
		Storage.guardarPedidos(pedidosActualizados);
		setMensaje({
			tipo: "exito",
			texto: "Pedido eliminado correctamente",
		});
	};

	return (
		<div className="gestion-pedidos">
			<h2>Gestión de Pedidos</h2>

			{/* Formulario de pedidos */}
			<form
				className="form-container"
				onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="numeroPedido">Número de Pedido:</label>
					<input
						type="number"
						id="numeroPedido"
						name="numeroPedido"
						required
						min="1"
						step="1"
						defaultValue={pedidoActual?.numeroPedido}
						readOnly={pedidoActual !== null}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="cliente">Cliente:</label>
					<input
						type="text"
						id="cliente"
						name="cliente"
						required
						maxLength="50"
						defaultValue={pedidoActual?.cliente}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="fechaPedido">Fecha de Pedido:</label>
					<input
						type="date"
						id="fechaPedido"
						name="fechaPedido"
						required
						defaultValue={pedidoActual ? pedidoActual.fechaPedido.toISOString().split("T")[0] : ""}
						max={new Date().toISOString().split("T")[0]}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary">
					{pedidoActual ? "Actualizar Pedido" : "Crear Pedido"}
				</button>

				{pedidoActual && (
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => setPedidoActual(null)}>
						Cancelar Edición
					</button>
				)}
			</form>

			{/* Mensajes de estado */}
			{mensaje.texto && <div className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</div>}

			{/* Tabla de pedidos */}
			<div className="tabla-container">
				<table className="tabla-datos">
					<thead>
						<tr>
							<th>Nº Pedido</th>
							<th>Cliente</th>
							<th>Fecha</th>
							<th>Procesado</th>
							<th>Servido</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{pedidos.map((pedido) => (
							<tr key={pedido.numeroPedido}>
								<td>{pedido.numeroPedido}</td>
								<td>{pedido.cliente}</td>
								<td>{Validacion.formatearFecha(pedido.fechaPedido)}</td>
								<td>{pedido.procesado ? "Sí" : "No"}</td>
								<td>{pedido.servido ? "Sí" : "No"}</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() => handleEditar(pedido)}>
										Editar
									</button>
									<button
										className="btn btn-danger"
										onClick={() => handleEliminar(pedido.numeroPedido)}>
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

export default GestionPedidos;
