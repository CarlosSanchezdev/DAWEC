/**
 * @fileoverview Contexto para las validaciones del concesionario
 */

import { createContext, useContext } from "react";

const ValidacionContext = createContext();

export const validaciones = {
	// Número de chasis: 8 dígitos
	REGEX_CHASIS: /^\d{8}$/,
	// Solo texto para marca y color
	REGEX_TEXTO: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
	// Validaciones numéricas
	MIN_POTENCIA: 50,
	// Fecha máxima (hoy)
	MAX_FECHA: new Date().toISOString().split("T")[0],
};

export function ValidacionProvider({ children }) {
	return <ValidacionContext.Provider value={validaciones}>{children}</ValidacionContext.Provider>;
}

export function useValidacion() {
	const context = useContext(ValidacionContext);
	if (!context) {
		throw new Error("useValidacion debe usarse dentro de un ValidacionProvider");
	}
	return context;
}
