# ÍNDICE DE EJERCICIOS - Simulacro 6 (TaskMaster)

## Información General

-   **Nombre del Simulacro**: TaskMaster
-   **Versión**: 1.0
-   **Fecha**: 15/05/2025
-   **Tipo**: Simulacro para 3ª Evaluación
-   **Autor**: Estudiante DAWEC

## Descripción

TaskMaster es una aplicación de gestión de proyectos desarrollada con React que demuestra conceptos avanzados para la 3ª
evaluación. La aplicación permite gestionar proyectos, tareas y equipos, así como visualizar estadísticas relevantes del
progreso.

## Conceptos Demostrados

1. **Context API y Gestión de Estado Global**

    - Implementación de `TaskMasterContext.js` para manejo centralizado del estado
    - Patrón Reducer para operaciones de estado
    - Estado persistente con `localStorage`

2. **Hooks Personalizados Avanzados**

    - `useForm.js`: Validación y gestión de formularios
    - `useDataFilter.js`: Filtrado y ordenación de datos optimizados

3. **Optimización de Rendimiento**

    - Uso de `useMemo` para cálculos complejos
    - Renderizado condicional eficiente
    - Fragmentación de componentes para mejor rendimiento

4. **Patrones de Diseño**

    - Composición de componentes
    - Separación de lógica y presentación
    - Validación de formularios centralizada

5. **Técnicas Modernas de React**
    - Lazy loading con `React.lazy`
    - Manejo avanzado de efectos secundarios
    - Destructuración de props y estado

## Estructura de Archivos

```
src/ejercicios/simulacros/sim6/
├── components/
│   ├── Navigation.jsx        # Barra de navegación lateral
│   ├── Navigation.css
│   ├── ProjectForm.jsx       # Formulario para añadir/editar proyectos
│   ├── ProjectForm.css
│   ├── ProjectsList.jsx      # Lista de proyectos con filtros
│   ├── ProjectsList.css
│   ├── Statistics.jsx        # Visualización de estadísticas
│   └── Statistics.css
├── context/
│   └── TaskMasterContext.js  # Contexto global y reducer
├── data/
│   └── initialData.js        # Datos iniciales de ejemplo
├── hooks/
│   ├── useDataFilter.js      # Hook para filtrar y ordenar datos
│   └── useForm.js            # Hook para gestión de formularios
├── index.js                  # Punto de entrada
├── TaskMaster.jsx            # Componente principal
└── TaskMaster.css            # Estilos globales
```

## Implementaciones Destacadas

### 1. Context API con Patrón Reducer

```jsx
// TaskMasterContext.js
const taskMasterReducer = (state, action) => {
	switch (action.type) {
		case "ADD_PROJECT":
			return {
				...state,
				projects: [...state.projects, action.payload],
			};
		// ...más casos
	}
};

export const TaskMasterProvider = ({ children }) => {
	const [state, dispatch] = useReducer(taskMasterReducer, loadFromLocalStorage());

	// Persistencia en localStorage
	useEffect(() => {
		localStorage.setItem("taskMasterData", JSON.stringify(state));
	}, [state]);

	return <TaskMasterContext.Provider value={{ state, dispatch }}>{children}</TaskMasterContext.Provider>;
};
```

### 2. Hook Personalizado para Formularios

```jsx
// useForm.js
function useForm(initialValues, validate, onSubmit) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	// Validación en tiempo real
	useEffect(() => {
		if (Object.keys(touched).length > 0) {
			const validationErrors = validate(values);
			setErrors(validationErrors);
		}
	}, [values, touched, validate]);

	// Manejo de cambios en campos
	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}, []);

	// ...más funcionalidad

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		// ...más retornos
	};
}
```

### 3. Filtrado y Ordenación de Datos Optimizados

```jsx
// useDataFilter.js
function useDataFilter(data, searchTerm, searchFilterFn, additionalFilterFn, sortFn) {
	const filteredData = useMemo(() => {
		let result = [...data];

		if (searchTerm && searchFilterFn) {
			result = result.filter(searchFilterFn);
		}

		if (additionalFilterFn) {
			result = result.filter(additionalFilterFn);
		}

		if (sortFn) {
			result.sort(sortFn);
		}

		return result;
	}, [data, searchTerm, searchFilterFn, additionalFilterFn, sortFn]);

	return { filteredData };
}
```

### 4. Renderizado Condicional Avanzado

```jsx
// TaskMaster.jsx
const renderContent = () => {
	switch (activeSection) {
		case "dashboard":
			return <DashboardContent />;
		case "projects":
			return <ProjectsList />;
		case "tasks":
			return <TasksContent />;
		// ...más casos
	}
};

return (
	<TaskMasterProvider>
		<div className="taskmaster-app">
			<Navigation
				onNavigate={setActiveSection}
				activeSection={activeSection}
			/>
			<main className="app-content">
				{/* ... */}
				<div className="content-container">{renderContent()}</div>
			</main>
		</div>
	</TaskMasterProvider>
);
```

## Guía de Aprendizaje

Para entender este simulacro, se recomienda estudiar los siguientes conceptos en orden:

1. Estructura y flujo de datos con Context API
2. Implementación de reducers para manejo de estado
3. Creación y uso de hooks personalizados
4. Técnicas de optimización de rendimiento
5. Manejo avanzado de formularios
6. Filtrado y ordenación de datos
7. Persistencia de datos con localStorage

## Posibles Mejoras

-   Implementar autenticación de usuarios
-   Añadir sistema de notificaciones
-   Incorporar gráficos avanzados para estadísticas
-   Implementar drag & drop para tareas
-   Añadir funcionalidad de exportación/importación de datos

---

Este simulacro sirve como demostración integral de conceptos avanzados de React necesarios para la 3ª evaluación, con
énfasis en patrones de diseño, gestión de estado y optimización.
