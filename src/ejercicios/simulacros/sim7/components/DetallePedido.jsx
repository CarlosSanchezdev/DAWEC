/**
 * @fileoverview Componente para mostrar el detalle de un pedido
 * @ejercicio Simulacro 7 - MaderAvilés
 */

import { useState, useEffect } from "react";
import Storage from "../utils/Storage";
import * as Validacion from "../utils/Validacion";

/**
 * @function DetallePedido
 * @description Componente para visualizar el detalle de un pedido y sus piezas
 */
function DetallePedido() {
	// Estados
	const [pedidos, setPedidos] = useState([]);
	const [piezas, setPiezas] = useState([]);
	const [pedidoSeleccionado, setPedidoSeleccionado] = useState("");
	const [piezasPedido, setPiezasPedido] = useState([]);

	// Cargar datos al montar el componente
	useEffect(() => {
		const pedidosGuardados = Storage.obtenerPedidos();
		const piezasGuardadas = Storage.obtenerPiezas();
		setPedidos(pedidosGuardados);
		setPiezas(piezasGuardadas);
	}, []);

	// Filtrar piezas cuando cambia el pedido seleccionado
	useEffect(() => {
		if (pedidoSeleccionado) {
			const piezasFiltradas = piezas.filter((pieza) => pieza.numeroPedido === parseInt(pedidoSeleccionado));
			setPiezasPedido(piezasFiltradas);
		} else {
			setPiezasPedido([]);
		}
	}, [pedidoSeleccionado, piezas]);

	// Calcular totales
	const calcularTotales = () => {
		return piezasPedido.reduce(
			(totales, pieza) => ({
				superficie: totales.superficie + pieza.calcularSuperficie(),
				volumen: totales.volumen + pieza.calcularVolumen(),
			}),
			{ superficie: 0, volumen: 0 }
		);
	};

	return (
		<div className="detalle-pedido">
			<h2>Detalle de Pedido</h2>

			{/* Selector de pedido */}
			<div className="form-container">
				<div className="form-group">
					<label htmlFor="selectPedido">Seleccione un pedido:</label>
					<select
						id="selectPedido"
						value={pedidoSeleccionado}
						onChange={(e) => setPedidoSeleccionado(e.target.value)}>
						<option value="">Seleccione un pedido</option>
						{pedidos.map((pedido) => (
							<option
								key={pedido.numeroPedido}
								value={pedido.numeroPedido}>
								Pedido {pedido.numeroPedido} - {pedido.cliente}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Información del pedido */}
			{pedidoSeleccionado && (
				<div className="info-pedido">
					<h3>Detalles del Pedido {pedidoSeleccionado}</h3>
					{pedidos
						.filter((p) => p.numeroPedido === parseInt(pedidoSeleccionado))
						.map((pedido) => (
							<div
								key={pedido.numeroPedido}
								className="pedido-info">
								<p>
									<strong>Cliente:</strong> {pedido.cliente}
								</p>
								<p>
									<strong>Fecha:</strong> {Validacion.formatearFecha(pedido.fechaPedido)}
								</p>
								<p>
									<strong>Estado:</strong>{" "}
									{pedido.servido ? "Servido" : pedido.procesado ? "Procesado" : "Pendiente"}
								</p>
							</div>
						))}
				</div>
			)}

			{/* Tabla de piezas del pedido */}
			{piezasPedido.length > 0 && (
				<div className="tabla-container">
					<h3>Piezas del Pedido</h3>
					<table className="tabla-datos">
						<thead>
							<tr>
								<th>Nº Pieza</th>
								<th>Largo</th>
								<th>Ancho</th>
								<th>Grosor</th>
								<th>Color</th>
								<th>Superficie</th>
								<th>Volumen</th>
							</tr>
						</thead>
						<tbody>
							{piezasPedido.map((pieza) => (
								<tr key={pieza.numeroPieza}>
									<td>{pieza.numeroPieza}</td>
									<td>{Validacion.formatearMedida(pieza.largo)}</td>
									<td>{Validacion.formatearMedida(pieza.ancho)}</td>
									<td>{Validacion.formatearMedida(pieza.grosor)}</td>
									<td>{pieza.color}</td>
									<td>{Validacion.formatearSuperficie(pieza.calcularSuperficie())}</td>
									<td>{Validacion.formatearVolumen(pieza.calcularVolumen())}</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan="5">
									<strong>TOTALES</strong>
								</td>
								<td>
									<strong>{Validacion.formatearSuperficie(calcularTotales().superficie)}</strong>
								</td>
								<td>
									<strong>{Validacion.formatearVolumen(calcularTotales().volumen)}</strong>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			)}

			{/* Mensaje cuando no hay piezas */}
			{pedidoSeleccionado && piezasPedido.length === 0 && (
				<div className="mensaje mensaje-info">No hay piezas registradas para este pedido</div>
			)}
		</div>
	);
}

export default DetallePedido;
