/**
 * @fileoverview Ejercicio sobre gestión de estado con reducers y uso de React Context
 * @ejercicio Ej06_Reducers_Context
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState, useReducer, createContext, useContext } from "react";
import "./Ej06_Reducers_Context.css";

// Crear contexto para el tema
const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

// Crear contexto para el contador
const CounterContext = createContext(null);

/**
 * @function Ej06_Reducers_Context
 * @description Componente que demuestra la gestión de estado con reducers y uso de React Context
 * @returns {JSX.Element} Componente de demostración
 */
function Ej06_Reducers_Context() {
	// Estado para el tema
	const [theme, setTheme] = useState("light");

	// Función para alternar el tema
	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	// Definir reducer para tareas
	const initialTodos = [
		{ id: 1, text: "Aprender React Context", completed: true },
		{ id: 2, text: "Aprender useReducer", completed: false },
		{ id: 3, text: "Combinar Context con Reducer", completed: false },
	];

	// Crear reducer para el contador
	const initialCounterState = { count: 0 };

	const counterReducer = (state, action) => {
		switch (action.type) {
			case "increment":
				return { count: state.count + 1 };
			case "decrement":
				return { count: state.count - 1 };
			case "reset":
				return { count: 0 };
			case "set":
				return { count: action.payload };
			default:
				return state;
		}
	};

	const [counterState, counterDispatch] = useReducer(counterReducer, initialCounterState);

	return (
		<div className={`ejercicio-container ${theme}`}>
			<div className="ejercicio-header">
				<h3>Ejercicio 6: Reducers y Context</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra cómo gestionar el estado de la aplicación usando reducers y compartir datos
					entre componentes mediante React Context.
				</p>
				<div className="theme-toggle">
					<button onClick={toggleTheme}>Cambiar a tema {theme === "light" ? "oscuro" : "claro"}</button>
				</div>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.6 Interacción con el usuario mediante Reducers</h4>
					<p>
						Los reducers son funciones puras que toman el estado actual y una acción, y devuelven un nuevo
						estado. El hook <code>useReducer</code> es una alternativa a <code>useState</code> cuando se
						necesita una lógica de estado más compleja.
					</p>

					<div className="demo-container">
						<h5>Ejemplo Básico de useReducer</h5>

						<BasicReducerDemo />

						<div className="code-explanation">
							<h5>Implementación de useReducer</h5>
							<pre className="code-snippet">
								{`import { useReducer } from 'react';

// Estado inicial
const initialState = { count: 0 };

// Función reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error('Acción desconocida');
  }
}

function Counter() {
  // Inicializar useReducer con el reducer y el estado inicial
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Resetear</button>
      <button onClick={() => dispatch({ 
        type: 'set', 
        payload: 10 
      })}>Establecer a 10</button>
    </div>
  );
}`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>Patrón de Reducer para Lista de Tareas</h5>

						<TodosReducerDemo initialTodos={initialTodos} />

						<div className="code-explanation">
							<h5>Reducer para lista de tareas</h5>
							<pre className="code-snippet">
								{`// Estado inicial
const initialTodos = [
  { id: 1, text: 'Aprender React', completed: false },
  { id: 2, text: 'Aprender Redux', completed: false }
];

// Función reducer
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }];
    case 'toggle':
      return state.map(todo => 
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed } 
          : todo
      );
    case 'delete':
      return state.filter(todo => todo.id !== action.payload);
    case 'clear_completed':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [text, setText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'add', payload: text });
    setText('');
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
        <button type="submit">Añadir</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ 
                type: 'toggle', 
                payload: todo.id 
              })}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ 
              type: 'delete', 
              payload: todo.id 
            })}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => dispatch({ type: 'clear_completed' })}>
        Limpiar completadas
      </button>
    </div>
  );
}`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>Esquema de funcionamiento de un reducer</h5>
						<div className="reducer-schema">
							<img
								src="/reducer-schema.png"
								alt="Esquema de funcionamiento de un reducer"
								className="schema-image"
							/>
							<div className="schema-description">
								<p>El patrón Reducer sigue un flujo unidireccional:</p>
								<ol>
									<li>
										<strong>Estado:</strong> Representa los datos en un momento determinado
									</li>
									<li>
										<strong>Acción:</strong> Describe qué cambio se quiere realizar
									</li>
									<li>
										<strong>Reducer:</strong> Función pura que toma el estado actual y la acción, y
										produce un nuevo estado
									</li>
									<li>
										<strong>Dispatch:</strong> Método para enviar acciones al reducer
									</li>
								</ol>
								<p>Este patrón garantiza que los cambios de estado sean predecibles y trazables.</p>
							</div>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.7.3 React Context</h4>
					<p>
						React Context proporciona una forma de pasar datos a través del árbol de componentes sin tener
						que pasar props manualmente en cada nivel. Es especialmente útil para compartir datos
						considerados "globales" para un árbol de componentes.
					</p>

					<div className="demo-container">
						<h5>Ejemplo básico de Context API</h5>

						<ThemeContext.Provider value={{ theme, toggleTheme }}>
							<BasicContextDemo />
						</ThemeContext.Provider>

						<div className="code-explanation">
							<h5>Implementación de React Context</h5>
							<pre className="code-snippet">
								{`import { createContext, useContext, useState } from 'react';

// Crear un contexto con un valor predeterminado
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Componente proveedor
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Proporcionar el valor del contexto a los componentes hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Componente que consume el contexto
function ThemedButton() {
  // Usar el contexto en un componente
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: '1px solid',
        padding: '8px 16px'
      }}
    >
      Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  );
}

// Uso en la aplicación
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Aplicación con Tema</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>Combinando Context y Reducer</h5>

						<CounterContext.Provider value={{ state: counterState, dispatch: counterDispatch }}>
							<CounterWithContext />
						</CounterContext.Provider>

						<div className="code-explanation">
							<h5>Implementación de Context con Reducer</h5>
							<pre className="code-snippet">
								{`import { createContext, useContext, useReducer } from 'react';

// Crear un contexto para el contador
const CounterContext = createContext(null);

// Definir el reducer
const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

// Componente proveedor
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// Hook personalizado para usar el contador
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter debe usarse dentro de un CounterProvider');
  }
  return context;
}

// Componente contador
function Counter() {
  const { state, dispatch } = useCounter();
  
  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Resetear</button>
    </div>
  );
}

// Componente que muestra el valor (podría estar en otro lugar del árbol)
function CounterDisplay() {
  const { state } = useCounter();
  
  return (
    <div>
      <p>El valor actual es: {state.count}</p>
    </div>
  );
}

// Uso en la aplicación
function App() {
  return (
    <CounterProvider>
      <div>
        <h1>Aplicación con Contador</h1>
        <Counter />
        <CounterDisplay />
      </div>
    </CounterProvider>
  );
}`}
							</pre>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>
						Los reducers son funciones puras que toman el estado actual y una acción, y devuelven un nuevo
						estado
					</li>
					<li>
						El hook <code>useReducer</code> es útil para manejar estados complejos o cuando el próximo
						estado depende del anterior
					</li>
					<li>
						Las acciones en un reducer tienen típicamente una propiedad <code>type</code> y opcionalmente un{" "}
						<code>payload</code>
					</li>
					<li>
						React Context proporciona una forma de compartir valores entre componentes sin pasar props en
						cada nivel
					</li>
					<li>
						Se crea un contexto con <code>createContext</code>, se proporciona un valor con{" "}
						<code>Provider</code> y se consume con <code>useContext</code>
					</li>
					<li>
						La combinación de Context y Reducer ofrece una solución poderosa para la gestión de estado
						global
					</li>
					<li>
						Context es ideal para datos que cambian con poca frecuencia, como tema de la interfaz,
						autenticación, preferencias, etc.
					</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function BasicReducerDemo
 * @description Demostración básica de useReducer
 */
function BasicReducerDemo() {
	// Definir el reducer
	const initialState = { count: 0 };

	const reducer = (state, action) => {
		switch (action.type) {
			case "increment":
				return { count: state.count + 1 };
			case "decrement":
				return { count: state.count - 1 };
			case "reset":
				return { count: 0 };
			case "set":
				return { count: action.payload };
			default:
				return state;
		}
	};

	// Utilizar useReducer
	const [state, dispatch] = useReducer(reducer, initialState);
	const [inputValue, setInputValue] = useState("");

	const handleSetCount = () => {
		const value = parseInt(inputValue, 10);
		if (!isNaN(value)) {
			dispatch({ type: "set", payload: value });
			setInputValue("");
		}
	};

	return (
		<div className="basic-reducer-demo">
			<h3>Contador con useReducer</h3>
			<p className="counter-value">
				Valor: <span>{state.count}</span>
			</p>

			<div className="counter-controls">
				<button onClick={() => dispatch({ type: "decrement" })}>-</button>
				<button onClick={() => dispatch({ type: "increment" })}>+</button>
				<button onClick={() => dispatch({ type: "reset" })}>Resetear</button>
			</div>

			<div className="counter-set">
				<input
					type="number"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Introduce un valor"
				/>
				<button onClick={handleSetCount}>Establecer</button>
			</div>

			<div className="reducer-explanation">
				<p>
					Este contador utiliza <code>useReducer</code> para gestionar su estado. Cada acción se despacha con
					un <code>type</code> y opcionalmente un <code>payload</code>, y el reducer determina cómo actualizar
					el estado basado en estos valores.
				</p>
			</div>
		</div>
	);
}

/**
 * @function TodosReducerDemo
 * @description Demostración de reducer para lista de tareas
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.initialTodos - Estado inicial de tareas
 */
function TodosReducerDemo({ initialTodos }) {
	// Definir el reducer para tareas
	const todosReducer = (state, action) => {
		switch (action.type) {
			case "add":
				return [
					...state,
					{
						id: Date.now(),
						text: action.payload,
						completed: false,
					},
				];
			case "toggle":
				return state.map((todo) =>
					todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
				);
			case "delete":
				return state.filter((todo) => todo.id !== action.payload);
			case "clear_completed":
				return state.filter((todo) => !todo.completed);
			default:
				return state;
		}
	};

	// Utilizar useReducer
	const [todos, dispatch] = useReducer(todosReducer, initialTodos);
	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		dispatch({ type: "add", payload: text });
		setText("");
	};

	return (
		<div className="todos-reducer-demo">
			<h3>Lista de Tareas con useReducer</h3>

			<form
				onSubmit={handleSubmit}
				className="todo-form">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Añadir nueva tarea..."
				/>
				<button type="submit">Añadir</button>
			</form>

			<ul className="todo-list">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className={todo.completed ? "completed" : ""}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => dispatch({ type: "toggle", payload: todo.id })}
						/>
						<span>{todo.text}</span>
						<button
							className="delete-btn"
							onClick={() => dispatch({ type: "delete", payload: todo.id })}>
							×
						</button>
					</li>
				))}
			</ul>

			{todos.some((todo) => todo.completed) && (
				<button
					className="clear-btn"
					onClick={() => dispatch({ type: "clear_completed" })}>
					Limpiar completadas
				</button>
			)}

			<div className="todo-stats">
				<p>Total: {todos.length} tareas</p>
				<p>Completadas: {todos.filter((todo) => todo.completed).length} tareas</p>
				<p>Pendientes: {todos.filter((todo) => !todo.completed).length} tareas</p>
			</div>
		</div>
	);
}

/**
 * @function BasicContextDemo
 * @description Demostración básica de React Context
 */
function BasicContextDemo() {
	// Usar el contexto de tema
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div className={`context-demo ${theme}`}>
			<div className="context-header">
				<h3>Demostración de React Context</h3>
				<button
					onClick={toggleTheme}
					className="theme-button">
					Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
				</button>
			</div>

			<div className="context-content">
				<p>
					Este componente está utilizando el tema "<strong>{theme}</strong>" del Context.
				</p>
				<p>Cualquier componente anidado puede acceder al mismo valor sin prop drilling.</p>

				<div className="nested-component">
					<h4>Componente anidado</h4>
					<NestedThemeComponent />
				</div>
			</div>
		</div>
	);
}

/**
 * @function NestedThemeComponent
 * @description Componente anidado que consume el contexto
 */
function NestedThemeComponent() {
	// Usar el contexto de tema
	const { theme } = useContext(ThemeContext);

	return (
		<div className="nested-component-content">
			<p>Este es un componente profundamente anidado.</p>
			<p>
				Tema actual: <strong>{theme}</strong>
			</p>
			<p>Accedo al tema directamente sin recibir props.</p>
		</div>
	);
}

/**
 * @function CounterWithContext
 * @description Demostración de Context con Reducer
 */
function CounterWithContext() {
	return (
		<div className="counter-context-demo">
			<h3>Context + Reducer</h3>
			<p>Estos componentes comparten estado a través del Context API:</p>

			<div className="counter-components">
				<div className="counter-component">
					<h4>Componente A</h4>
					<CounterControlsComponent />
				</div>

				<div className="counter-component">
					<h4>Componente B</h4>
					<CounterDisplayComponent />
				</div>
			</div>

			<div className="counter-explanation">
				<p>
					Aunque los controles y la visualización están en componentes separados, comparten el mismo estado a
					través del Context, sin necesidad de pasar props entre ellos.
				</p>
			</div>
		</div>
	);
}

/**
 * @function CounterControlsComponent
 * @description Componente que muestra los controles del contador
 */
function CounterControlsComponent() {
	// Usar el contexto del contador
	const { dispatch } = useContext(CounterContext);

	return (
		<div className="counter-controls">
			<p>Controles:</p>
			<button onClick={() => dispatch({ type: "decrement" })}>-</button>
			<button onClick={() => dispatch({ type: "increment" })}>+</button>
			<button onClick={() => dispatch({ type: "reset" })}>Resetear</button>
		</div>
	);
}

/**
 * @function CounterDisplayComponent
 * @description Componente que muestra el valor del contador
 */
function CounterDisplayComponent() {
	// Usar el contexto del contador
	const { state } = useContext(CounterContext);

	return (
		<div className="counter-display">
			<p>Visualización:</p>
			<div className="counter-value">
				<span>{state.count}</span>
			</div>
		</div>
	);
}

export default Ej06_Reducers_Context;
