/**
 * @fileoverview Ejercicio sobre Context API y useReducer
 * @ejercicio Ej05_Context_Reducers
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 20/05/2025
 */

import React from "react";
import "./Ej05_Context_Reducers.css";
import { TareaProvider } from "./components/TareaContext";
import { GestorTareas } from "./components/GestorTareasComponentes";

/**
 * @function Ej05_Context_Reducers
 * @description Componente principal que demuestra el uso de Context API y useReducer
 * @returns {JSX.Element} Componente de demostración de Context y Reducers
 * @example
 *   <Ej05_Context_Reducers />
 */
function Ej05_Context_Reducers() {
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 5: Context API y useReducer</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra la gestión de estado global usando React Context API junto con useReducer.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>1. Context API - Compartir estado entre componentes</h4>
					<p>
						React Context proporciona una forma de compartir datos entre componentes sin necesidad de pasar
						props manualmente en cada nivel. Es útil para datos globales como temas, autenticación o
						preferencias de usuario.
					</p>

					<div className="code-example">
						<pre>
							{`// Creación de un contexto
const MiContexto = createContext(valorPorDefecto);

// Proveedor de contexto
<MiContexto.Provider value={valor}>
  <ComponenteHijo />
</MiContexto.Provider>

// Consumo en componentes hijos
function ComponenteHijo() {
  const valor = useContext(MiContexto);
  return <div>{valor}</div>;
}`}
						</pre>
					</div>
				</section>

				<section className="concepto-section">
					<h4>2. useReducer - Gestión de estado complejo</h4>
					<p>
						El hook useReducer es una alternativa a useState para manejar estados complejos y acciones
						relacionadas. Sigue el patrón de Redux con acciones y un reducer que determina cómo actualizar
						el estado.
					</p>

					<div className="code-example">
						<pre>
							{`// Definición del reducer
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return { contador: state.contador + 1 };
    case 'DECREMENTAR':
      return { contador: state.contador - 1 };
    default:
      return state;
  }
}

// Uso del reducer en un componente
function Contador() {
  const [state, dispatch] = useReducer(reducer, { contador: 0 });
  
  return (
    <>
      Contador: {state.contador}
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>-</button>
    </>
  );
}`}
						</pre>
					</div>
				</section>

				<section className="concepto-section">
					<h4>3. Combinando Context y useReducer</h4>
					<p>
						La combinación de Context y useReducer permite crear un sistema de gestión de estado global
						similar a Redux pero usando solo características nativas de React.
					</p>

					<div className="code-example">
						<pre>
							{`// 1. Crear el contexto
const EstadoContext = createContext();

// 2. Definir reducer
function estadoReducer(state, action) {
  switch (action.type) {
    case 'ACCION_1':
      return { ...state, /* cambios */ };
    // Más casos...
    default:
      return state;
  }
}

// 3. Crear proveedor que combine context y reducer
function EstadoProvider({ children }) {
  const [state, dispatch] = useReducer(estadoReducer, estadoInicial);
  
  return (
    <EstadoContext.Provider value={{ state, dispatch }}>
      {children}
    </EstadoContext.Provider>
  );
}

// 4. Consumir en cualquier componente
function ComponenteConsumidor() {
  const { state, dispatch } = useContext(EstadoContext);
  
  return (
    <button onClick={() => dispatch({ type: 'ACCION_1' })}>
      Hacer algo
    </button>
  );
}`}
						</pre>
					</div>
				</section>

				<section className="concepto-section">
					<h4>4. Aplicación práctica: Gestor de tareas</h4>
					<p>
						A continuación se muestra una implementación de un gestor de tareas utilizando Context API y
						useReducer para manejar el estado global.
					</p>

					<TareaProvider>
						<GestorTareas />
					</TareaProvider>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>Context API proporciona una forma de compartir datos entre componentes sin prop drilling</li>
					<li>Context tiene un Provider (que proporciona valores) y un Consumer (que los recibe)</li>
					<li>useReducer se usa para manejar lógica de estado compleja basada en acciones</li>
					<li>Un reducer es una función pura que recibe estado y acción, y devuelve un nuevo estado</li>
					<li>Combinar Context con useReducer permite crear una solución de gestión de estado global</li>
					<li>
						Las acciones son objetos que describen cómo debe cambiar el estado (generalmente tienen type y
						payload)
					</li>
					<li>El patrón de Context + useReducer es escalable para aplicaciones de cualquier tamaño</li>
					<li>
						El uso de reducers centraliza la lógica de manipulación de estado, mejorando la mantenibilidad
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej05_Context_Reducers;
