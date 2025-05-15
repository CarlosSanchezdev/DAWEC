/**
 * @fileoverview Ejercicio 2.37 - Calculadora de Restaurante
 * @ejercicio 2.37
 * @tema Cálculos Comerciales
 * @fecha 15/05/2025
 */

import { useState } from "react";
import styles from "./Ej2_37_CalculadoraRestaurante.module.css";

/**
 * @typedef {Object} ItemPedido
 * @property {string} nombre - Nombre del plato o bebida
 * @property {number} precio - Precio unitario
 * @property {number} cantidad - Cantidad pedida
 */

/**
 * @typedef {Object} ResultadoCuenta
 * @property {number} subtotal - Total sin IVA ni propina
 * @property {number} iva - Monto del IVA
 * @property {number} propina - Monto de la propina
 * @property {number} total - Total incluyendo IVA y propina
 * @property {number} totalPorPersona - Total dividido entre comensales
 */

const IVA = 0.21; // 21% de IVA

/**
 * @function formatearMoneda
 * @description Formatea un número como moneda en euros
 * @param {number} monto - Monto a formatear
 * @returns {string} Monto formateado
 */
const formatearMoneda = (monto) => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(monto);
};

/**
 * @function calcularCuenta
 * @description Calcula los totales de la cuenta
 * @param {ItemPedido[]} items - Items del pedido
 * @param {number} porcentajePropina - Porcentaje de propina
 * @param {number} numeroPersonas - Número de comensales
 * @returns {ResultadoCuenta} Resultado del cálculo
 */
const calcularCuenta = (items, porcentajePropina, numeroPersonas) => {
	const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
	const iva = subtotal * IVA;
	const baseParaPropina = subtotal + iva;
	const propina = baseParaPropina * (porcentajePropina / 100);
	const total = baseParaPropina + propina;

	return {
		subtotal,
		iva,
		propina,
		total,
		totalPorPersona: total / numeroPersonas,
	};
};

/**
 * @function Ej2_37_CalculadoraRestaurante
 * @description Componente para calcular cuentas de restaurante
 * @returns {JSX.Element} Componente React
 */
function Ej2_37_CalculadoraRestaurante() {
	const [items, setItems] = useState([{ nombre: "", precio: "", cantidad: 1 }]);
	const [porcentajePropina, setPorcentajePropina] = useState(10);
	const [numeroPersonas, setNumeroPersonas] = useState(1);
	const [resultado, setResultado] = useState(null);
	const [error, setError] = useState("");
	const [propinaPersonalizada, setPropinaPersonalizada] = useState(false);

	const porcentajesPredefinidos = [0, 5, 10, 15, 20];

	/**
	 * @function agregarItem
	 * @description Agrega un nuevo ítem a la cuenta
	 */
	const agregarItem = () => {
		setItems([...items, { nombre: "", precio: "", cantidad: 1 }]);
	};

	/**
	 * @function actualizarItem
	 * @description Actualiza un ítem específico
	 * @param {number} index - Índice del ítem
	 * @param {string} campo - Campo a actualizar
	 * @param {string|number} valor - Nuevo valor
	 */
	const actualizarItem = (index, campo, valor) => {
		const nuevosItems = [...items];
		nuevosItems[index] = {
			...nuevosItems[index],
			[campo]: valor,
		};
		setItems(nuevosItems);
	};

	/**
	 * @function eliminarItem
	 * @description Elimina un ítem de la cuenta
	 * @param {number} index - Índice del ítem a eliminar
	 */
	const eliminarItem = (index) => {
		if (items.length > 1) {
			setItems(items.filter((_, i) => i !== index));
		}
	};

	/**
	 * @function validarEntrada
	 * @description Valida los datos ingresados
	 * @returns {boolean} true si los datos son válidos
	 */
	const validarEntrada = () => {
		// Validar items
		for (const item of items) {
			if (!item.nombre.trim()) {
				setError("Por favor, complete el nombre de todos los platos");
				return false;
			}
			if (!item.precio || isNaN(item.precio) || parseFloat(item.precio) <= 0) {
				setError("Por favor, ingrese precios válidos para todos los platos");
				return false;
			}
			if (!item.cantidad || isNaN(item.cantidad) || parseInt(item.cantidad) <= 0) {
				setError("Las cantidades deben ser números positivos");
				return false;
			}
		}

		if (porcentajePropina < 0) {
			setError("El porcentaje de propina no puede ser negativo");
			return false;
		}

		if (numeroPersonas < 1) {
			setError("Debe haber al menos una persona");
			return false;
		}

		return true;
	};

	/**
	 * @function calcular
	 * @description Calcula la cuenta total
	 * @param {Event} e - Evento del formulario
	 */
	const calcular = (e) => {
		e.preventDefault();
		setError("");

		if (validarEntrada()) {
			const itemsValidos = items.map((item) => ({
				...item,
				precio: parseFloat(item.precio),
				cantidad: parseInt(item.cantidad),
			}));

			const resultadoCalculo = calcularCuenta(itemsValidos, porcentajePropina, numeroPersonas);

			setResultado(resultadoCalculo);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.titulo}>Calculadora de Restaurante</h2>

			<form
				onSubmit={calcular}
				className={styles.formulario}>
				<div className={styles.itemsContainer}>
					<h3>Platos y Bebidas</h3>
					{items.map((item, index) => (
						<div
							key={index}
							className={styles.itemGrupo}>
							<input
								type="text"
								placeholder="Nombre del plato"
								value={item.nombre}
								onChange={(e) => actualizarItem(index, "nombre", e.target.value)}
								className={styles.nombreInput}
							/>
							<div className={styles.precioGrupo}>
								<span className={styles.moneda}>€</span>
								<input
									type="number"
									placeholder="Precio"
									value={item.precio}
									onChange={(e) => actualizarItem(index, "precio", e.target.value)}
									step="0.01"
									min="0"
									className={styles.precioInput}
								/>
							</div>
							<input
								type="number"
								placeholder="Cant."
								value={item.cantidad}
								onChange={(e) => actualizarItem(index, "cantidad", e.target.value)}
								min="1"
								className={styles.cantidadInput}
							/>
							{items.length > 1 && (
								<button
									type="button"
									onClick={() => eliminarItem(index)}
									className={styles.eliminarBtn}>
									×
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={agregarItem}
						className={styles.agregarBtn}>
						+ Agregar plato
					</button>
				</div>

				<div className={styles.propinaGrupo}>
					<label>Propina:</label>
					<div className={styles.botonesGrupo}>
						{porcentajesPredefinidos.map((porcentaje) => (
							<button
								key={porcentaje}
								type="button"
								className={`${styles.botonPropina} ${
									porcentajePropina === porcentaje && !propinaPersonalizada ? styles.activo : ""
								}`}
								onClick={() => {
									setPorcentajePropina(porcentaje);
									setPropinaPersonalizada(false);
								}}>
								{porcentaje}%
							</button>
						))}
						<button
							type="button"
							className={`${styles.botonPropina} ${propinaPersonalizada ? styles.activo : ""}`}
							onClick={() => setPropinaPersonalizada(true)}>
							Otro
						</button>
					</div>
					{propinaPersonalizada && (
						<input
							type="number"
							value={porcentajePropina}
							onChange={(e) => setPorcentajePropina(parseFloat(e.target.value) || 0)}
							placeholder="Porcentaje personalizado"
							className={styles.inputPersonalizado}
							min="0"
							step="0.1"
						/>
					)}
				</div>

				<div className={styles.personasGrupo}>
					<label htmlFor="personas">Número de personas:</label>
					<input
						type="number"
						id="personas"
						value={numeroPersonas}
						onChange={(e) => setNumeroPersonas(parseInt(e.target.value) || 1)}
						min="1"
					/>
				</div>

				<button
					type="submit"
					className={styles.calcularBtn}>
					Calcular Cuenta
				</button>
			</form>

			{error && <p className={styles.error}>{error}</p>}

			{resultado && (
				<div className={styles.resultado}>
					<h3>Resumen de la Cuenta</h3>

					<div className={styles.detalleItems}>
						{items.map((item, index) => (
							<div
								key={index}
								className={styles.itemDetalle}>
								<span className={styles.itemNombre}>
									{item.cantidad}x {item.nombre}
								</span>
								<span className={styles.itemTotal}>{formatearMoneda(item.precio * item.cantidad)}</span>
							</div>
						))}
					</div>

					<div className={styles.resumenCuenta}>
						<div className={styles.filaCuenta}>
							<span>Subtotal:</span>
							<span>{formatearMoneda(resultado.subtotal)}</span>
						</div>
						<div className={styles.filaCuenta}>
							<span>IVA (21%):</span>
							<span>{formatearMoneda(resultado.iva)}</span>
						</div>
						<div className={styles.filaCuenta}>
							<span>Propina ({porcentajePropina}%):</span>
							<span>{formatearMoneda(resultado.propina)}</span>
						</div>
						<div className={`${styles.filaCuenta} ${styles.total}`}>
							<span>Total:</span>
							<span>{formatearMoneda(resultado.total)}</span>
						</div>
					</div>

					{numeroPersonas > 1 && (
						<div className={styles.totalPorPersona}>
							<span>Total por persona:</span>
							<span>{formatearMoneda(resultado.totalPorPersona)}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Ej2_37_CalculadoraRestaurante;
