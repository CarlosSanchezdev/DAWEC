/**
 * @fileoverview Punto de entrada principal de la aplicación
 * @fecha 11/05/2025
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./components/temas/Temas.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);

