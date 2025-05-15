# Configuración del proyecto React con Vite y estandarización de Commits

## Estructura del proyecto React con Vite

El proyecto utiliza React con Vite como bundler para desarrollo rápido. La estructura básica del proyecto es:

```
COMMIT_CONVENTION.md
commitlint.config.js
eslint.config.js
index.html
package.json
README.md
vite.config.js
public/
	vite.svg
src/
	App.css
	App.jsx
	index.css
	main.jsx
	assets/
		react.svg
```

## Archivos de código principales

### main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

### App.jsx

```jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a
					href="https://vite.dev"
					target="_blank">
					<img
						src={viteLogo}
						className="logo"
						alt="Vite logo"
					/>
				</a>
				<a
					href="https://react.dev"
					target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link
			rel="icon"
			type="image/svg+xml"
			href="/vite.svg" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0" />
		<title>Vite + React</title>
	</head>
	<body>
		<div id="root"></div>
		<script
			type="module"
			src="/src/main.jsx"></script>
	</body>
</html>
```

### package.json

```json
{
	"name": "ejercicios",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build": "vite build",
		"lint": "eslint .",
		"preview": "vite preview"
	},
	"dependencies": {
		"react": "^19.1.0",
		"react-dom": "^19.1.0"
	},
	"devDependencies": {
		"@eslint/js": "^9.25.0",
		"@types/react": "^19.1.2",
		"@types/react-dom": "^19.1.2",
		"@vitejs/plugin-react": "^4.4.1",
		"eslint": "^9.25.0",
		"eslint-plugin-react-hooks": "^5.2.0",
		"eslint-plugin-react-refresh": "^0.4.19",
		"globals": "^16.0.0",
		"vite": "^6.3.5"
	}
}
```

## Instrucciones para GitHub Copilot

Se creó un archivo de instrucciones específicas para GitHub Copilot en `.github/copilot-instructions.md` para ayudar a
mantener buenas prácticas y convenciones en el código:

```markdown
# Instrucciones para GitHub Copilot

## Proyecto React con Vite

Este es un proyecto de React creado con Vite. Aquí hay algunas pautas y convenciones a seguir:

### Convenciones de código

-   Utilizar funciones de componente (React Hooks) en lugar de componentes de clase
-   Seguir las convenciones de nomenclatura de React:
    -   Nombres de componentes en PascalCase (ej. `MiComponente.jsx`)
    -   Nombres de hooks con el prefijo "use" (ej. `useNombreHook`)
    -   Nombres de archivos de utilidad en camelCase
-   Utilizar destructuring para props
-   Utilizar CSS Modules para los estilos específicos de componentes
-   Preferir estados inmutables (usar spread operator o funciones como map, filter, etc.)

### Estructura de archivos

-   Componentes en la carpeta `/src/components`
-   Hooks personalizados en `/src/hooks`
-   Páginas o vistas en `/src/pages`
-   Utilidades en `/src/utils`
-   Assets estáticos en `/src/assets`

### Dependencias preferidas

-   React Router para navegación
-   Axios para solicitudes HTTP
-   React Query para gestión de estado del servidor
-   Context API o Redux para gestión de estado global (según complejidad)

### Patrones a seguir

-   Separación de preocupaciones (separar lógica de UI)
-   Composición sobre herencia
-   Componentización (dividir UI en componentes pequeños y reutilizables)
-   Manejo adecuado de efectos secundarios usando useEffect

### Scripts disponibles

-   `npm run dev` - Inicia el servidor de desarrollo
-   `npm run build` - Construye la aplicación para producción
-   `npm run preview` - Vista previa de la versión de producción localmente

### Optimizaciones

-   Usar React.memo para componentes que no cambian con frecuencia
-   Implementar lazy loading para componentes grandes cuando sea apropiado
-   Evitar renders innecesarios

### Testing

-   Usar Jest y React Testing Library para pruebas unitarias y de integración
-   Seguir la metodología "Testing Library Way" (testar comportamiento, no implementación)
-   Escribir tests para los componentes críticos y la lógica de negocio
-   Utilizar mocks para servicios externos y APIs

### Gestión de errores

-   Implementar Error Boundaries para capturar errores en componentes
-   Usar try/catch para operaciones asíncronas
-   Proporcionar feedback visual al usuario cuando ocurran errores
-   Mantener logs de errores para depuración

### Accesibilidad (a11y)

-   Seguir las pautas WCAG 2.1
-   Usar etiquetas semánticas HTML5
-   Asegurar navegación por teclado
-   Proporcionar textos alternativos para imágenes
-   Mantener suficiente contraste de color

### Convenciones de Git

-   Usar commits pequeños y específicos
-   Seguir el formato de Conventional Commits:
    -   `feat:` para nuevas características
    -   `fix:` para correcciones de bugs
    -   `docs:` para documentación
    -   `style:` para cambios de formato sin afectar código
    -   `refactor:` para refactorizaciones
    -   `test:` para tests
    -   `chore:` para tareas de mantenimiento
-   Crear ramas temáticas para cada característica o corrección
```

## Configuración de estandarización de Git Commits

Se implementó un sistema de estandarización de commits siguiendo la convención de Conventional Commits con estos
componentes:

### 1. Plantilla de mensajes de commit (.gitmessage)

```
# <tipo>(<ámbito>): <título corto>
# |<---- Usar máximo 50 caracteres ---->|

# Explicación detallada, si es necesaria
# |<---- Intenta limitar cada línea a 72 caracteres ---->|

# --- TIPOS DE COMMIT ---
# feat:     Nueva característica
# fix:      Corrección de bug
# docs:     Documentación
# style:    Formato (no afecta al código)
# refactor: Refactorización del código
# perf:     Mejoras de rendimiento
# test:     Añadir tests
# chore:    Cambios en el proceso de build o herramientas
# ci:       Cambios en integración continua

# --- EJEMPLOS ---
# feat(auth): añadir página de login
# fix(navbar): solucionar problema de navegación en móviles
# docs(readme): actualizar instrucciones de instalación
# refactor(componentes): simplificar lógica de formularios
```

### 2. Configuración de commitlint (commitlint.config.js)

```javascript
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "ci", "revert"],
		],
		"scope-enum": [2, "always", ["auth", "ui", "api", "router", "store", "utils", "config", "deps"]],
		"subject-case": [2, "always", ["lower-case"]],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-full-stop": [2, "never", "."],
		"header-max-length": [2, "always", 72],
	},
};
```

### 3. Convenciones detalladas (COMMIT_CONVENTION.md)

Se creó un archivo de documentación detallada sobre las convenciones de commit para el equipo.

## Cómo usar las convenciones de commit desde la terminal

### Método 1: Con el editor predeterminado

```bash
# Añadir archivos al área de staging
git add .

# Hacer commit (abrirá el editor con la plantilla)
git commit
```

### Método 2: Con mensaje en línea

```bash
git commit -m "feat(auth): implementar página de login"
```

### Método 3: Usando un editor específico

```bash
git commit -e  # Usará el editor configurado en $EDITOR
```

### Ejemplos prácticos

```bash
# Nueva característica
git add src/components/LoginForm.jsx
git commit -m "feat(auth): añadir formulario de login con validación"

# Corrección de bug
git add src/components/Navbar.jsx
git commit -m "fix(ui): corregir alineación de menú en dispositivos móviles"

# Refactorización
git add src/utils/api.js
git commit -m "refactor(api): simplificar llamadas a endpoints"
```

### Validación manual de mensajes

```bash
echo "feat(auth): implementar login" | npx commitlint
```

## Iniciar el servidor de desarrollo React

Para ejecutar el servidor de desarrollo:

```bash
# Desde la terminal
npm run dev

# O desde VS Code usando la tarea configurada
# "Start React Development Server"
```

Esta configuración proporciona un sistema completo para desarrollar aplicaciones React siguiendo buenas prácticas y
convenciones estandarizadas.
