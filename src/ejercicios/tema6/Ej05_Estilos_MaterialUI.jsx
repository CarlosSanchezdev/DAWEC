/**
 * @fileoverview Ejercicio sobre gestión de apariencia, estilos en React y Material-UI
 * @ejercicio Ej05_Estilos_MaterialUI
 * @tema Tema 6: Componentes y Objetos Predefinidos
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej05_Estilos_MaterialUI.css";

/**
 * @function Ej05_Estilos_MaterialUI
 * @description Componente que demuestra la gestión de apariencia, estilos en React y Material-UI
 * @returns {JSX.Element} Componente de demostración
 */
function Ej05_Estilos_MaterialUI() {
	return (
		<div className="ejercicio-container">
			<div className="ejercicio-header">
				<h3>Ejercicio 5: Estilos y Material-UI</h3>
				<p className="ejercicio-descripcion">
					Este ejercicio demuestra cómo gestionar la apariencia de los componentes en React utilizando
					diferentes métodos de estilización, incluyendo Material-UI.
				</p>
			</div>

			<div className="ejercicio-content">
				<section className="concepto-section">
					<h4>6.5.1 Apariencia de las ventanas</h4>
					<p>
						JavaScript permite controlar diversos aspectos visuales de las ventanas, como su tamaño,
						posición y estilo. El método <code>window.open()</code> proporciona propiedades específicas para
						configurar estas características.
					</p>

					<div className="demo-container">
						<h5>Propiedades de apariencia en window.open()</h5>
						<div className="properties-table">
							<table>
								<thead>
									<tr>
										<th>Propiedad</th>
										<th>Descripción</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>height</td>
										<td>Altura de la ventana en píxeles</td>
									</tr>
									<tr>
										<td>width</td>
										<td>Anchura de la ventana en píxeles</td>
									</tr>
									<tr>
										<td>left</td>
										<td>Distancia desde la izquierda de la pantalla</td>
									</tr>
									<tr>
										<td>top</td>
										<td>Distancia desde la parte superior de la pantalla</td>
									</tr>
									<tr>
										<td>menubar</td>
										<td>Mostrar la barra de menú (yes/no o 1/0)</td>
									</tr>
									<tr>
										<td>toolbar</td>
										<td>Mostrar la barra de herramientas (yes/no o 1/0)</td>
									</tr>
									<tr>
										<td>location</td>
										<td>Mostrar la barra de dirección (yes/no o 1/0)</td>
									</tr>
									<tr>
										<td>status</td>
										<td>Mostrar la barra de estado (yes/no o 1/0)</td>
									</tr>
									<tr>
										<td>resizable</td>
										<td>Permitir redimensionar la ventana (yes/no o 1/0)</td>
									</tr>
									<tr>
										<td>scrollbars</td>
										<td>Mostrar barras de desplazamiento (yes/no o 1/0)</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="window-demo">
							<button onClick={openCustomWindow}>Abrir ventana con propiedades personalizadas</button>
						</div>

						<div className="code-explanation">
							<h5>Ejemplo de código: Propiedades de ventana</h5>
							<pre className="code-snippet">
								{`window.open(
  'https://www.example.com',
  'customWindow',
  'width=400,height=300,top=100,left=100,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes'
);`}
							</pre>
							<p>
								<strong>NOTA:</strong> Por seguridad, no es posible mover una ventana fuera de la
								pantalla ni darle un tamaño menor de 100x100 píxeles.
							</p>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.5.2 Estilos en React</h4>
					<p>
						En React, hay varias formas de aplicar estilos a los componentes. Cada enfoque tiene sus
						ventajas y casos de uso particulares.
					</p>

					<div className="demo-container">
						<h5>1. Estilos en línea</h5>
						<p>
							Aplicados directamente como un objeto JavaScript a través del atributo <code>style</code>.
							Las propiedades CSS se escriben en camelCase.
						</p>

						<div className="style-demo">
							<InlineStylesDemo />
						</div>

						<div className="code-explanation">
							<pre className="code-snippet">
								{`function MiComponente() {
  return (
    <div style={{ 
      backgroundColor: "lightblue", 
      padding: "20px", 
      borderRadius: "5px",
    }}>
      <p style={{ color: "white", fontSize: "18px" }}>
        Esto es un párrafo con estilos en línea
      </p>
    </div>
  );
}
`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>2. CSS Modules</h5>
						<p>
							Permiten escribir CSS normal pero con ámbito local para evitar colisiones de nombres. Los
							nombres de clase se generan de forma única.
						</p>

						<div className="style-demo">
							<CSSModuleDemo />
						</div>

						<div className="code-explanation">
							<h6>Archivo CSS Module (MiEstilo.module.css):</h6>
							<pre className="code-snippet">
								{`.contenedor {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.textoResaltado {
  color: #e74c3c;
  font-weight: bold;
}
`}
							</pre>

							<h6>Componente React:</h6>
							<pre className="code-snippet">
								{`import estilos from './MiEstilo.module.css';

function MiComponente() {
  return (
    <div className={estilos.contenedor}>
      <p className={estilos.textoResaltado}>
        Este texto está estilizado con CSS Modules
      </p>
    </div>
  );
}
`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>3. Styled Components</h5>
						<p>
							Esta biblioteca permite definir componentes de React con estilos encapsulados utilizando
							template literals de ES6.
						</p>

						<div className="style-demo">
							<StyledComponentsDemo />
						</div>

						<div className="code-explanation">
							<pre className="code-snippet">
								{`import styled from 'styled-components';

// Crear un componente con estilos
const Contenedor = styled.div\`
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;
\`;

const Boton = styled.button\`
  background-color: white;
  color: #3498db;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f4f4f4;
  }
\`;

function MiComponente() {
  return (
    <Contenedor>
      <h3>Componente con Styled Components</h3>
      <p>Este contenedor y sus elementos tienen estilos encapsulados</p>
      <Boton>Click Me</Boton>
    </Contenedor>
  );
}
`}
							</pre>
						</div>
					</div>

					<div className="demo-container">
						<h5>4. Alternancia de clases CSS basada en estado</h5>
						<p>
							Los componentes pueden cambiar de apariencia en función de su estado, añadiendo o quitando
							clases CSS.
						</p>

						<div className="style-demo">
							<ToggleClassDemo />
						</div>

						<div className="code-explanation">
							<h6>CSS:</h6>
							<pre className="code-snippet">
								{`.mensaje {
  padding: 15px;
  margin-top: 10px;
  border-radius: 4px;
  transition: opacity 0.3s ease;
}

.visible {
  opacity: 1;
}

.oculto {
  opacity: 0;
  pointer-events: none;
}
`}
							</pre>

							<h6>Componente React:</h6>
							<pre className="code-snippet">
								{`import { useState } from 'react';
import './AlternaMensaje.css';

function AlternaMensaje() {
  const [esVisible, setEsVisible] = useState(true);
  
  const alternaVisibilidad = () => {
    setEsVisible(!esVisible);
  };
  
  return (
    <div>
      <h2>Alterna Mensaje</h2>
      <button onClick={alternaVisibilidad}>
        {esVisible ? "Esconde mensaje" : "Muestra mensaje"}
      </button>
      
      <div className={\`mensaje \${esVisible ? 'visible' : 'oculto'}\`}>
        Este es un mensaje que se puede ocultar
      </div>
    </div>
  );
}
`}
							</pre>
						</div>
					</div>
				</section>

				<section className="concepto-section">
					<h4>6.5.3 Frameworks de Estilos en React: Material-UI</h4>
					<p>
						Material-UI es una biblioteca de componentes populares para React que implementa el diseño
						Material Design de Google. Proporciona componentes prediseñados y personalizables.
					</p>

					<div className="demo-container">
						<h5>Demostración de Material-UI (Simulada)</h5>
						<p>
							A continuación, se muestra una simulación de cómo se vería Material-UI. En un proyecto real,
							deberías instalar las dependencias:
						</p>
						<pre className="code-snippet">
							{`npm i --save @mui/material @mui/icons-material @emotion/react @emotion/styled`}
						</pre>

						<div className="material-ui-demo">
							<MaterialUIDemo />
						</div>

						<div className="code-explanation">
							<h6>Ejemplo de uso de Material-UI:</h6>
							<pre className="code-snippet">
								{`import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';

function MaterialUIApp() {
  const [tabVisible, setTabVisible] = useState(0);
  
  const manejador = (evento, indice) => {
    setTabVisible(indice);
  };
  
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabVisible} 
          onChange={manejador} 
          aria-label='Ejemplo básico de tabs'
        >
          <Tab label='Tab 1' />
          <Tab label='Tab 2' />
          <Tab label='Tab 3' />
        </Tabs>
      </Box>
      
      {tabVisible === 0 && <div>Contenido del Tab 1</div>}
      {tabVisible === 1 && <div>Contenido del Tab 2</div>}
      {tabVisible === 2 && <div>Contenido del Tab 3</div>}
      
      <Box 
        component='form' 
        noValidate 
        autoComplete='off'
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      >
        <div>
          <TextField 
            required 
            id='outlined-required' 
            label="Required" 
            defaultValue="Hola, mundo" 
          />
        </div>
        <Button variant='contained'>
          Inicio <HomeIcon fontSize='small' />
        </Button>
      </Box>
    </div>
  );
}
`}
							</pre>
						</div>
					</div>
				</section>
			</div>

			<div className="ejercicio-footer">
				<h4>Conceptos clave para el examen:</h4>
				<ul>
					<li>
						La apariencia de las ventanas creadas con <code>window.open()</code> puede personalizarse con
						diversas propiedades
					</li>
					<li>
						En React existen múltiples enfoques para aplicar estilos: inline, CSS Modules,
						styled-components, etc.
					</li>
					<li>
						Los estilos en línea se aplican a través del atributo <code>style</code> con un objeto
						JavaScript
					</li>
					<li>CSS Modules permite escribir CSS con ámbito local, evitando conflictos de nombres</li>
					<li>
						Styled Components permite crear componentes con estilos encapsulados usando template literals
					</li>
					<li>Material-UI proporciona componentes React que implementan Material Design</li>
					<li>Los estilos en React pueden ser dinámicos, cambiando en función del estado del componente</li>
				</ul>
			</div>
		</div>
	);
}

/**
 * @function openCustomWindow
 * @description Abre una ventana personalizada con propiedades específicas
 */
function openCustomWindow() {
	window.open(
		"https://mui.com/",
		"materialUIWindow",
		"width=600,height=400,top=100,left=100,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes"
	);
}

/**
 * @function InlineStylesDemo
 * @description Demostración de estilos en línea en React
 */
function InlineStylesDemo() {
	const containerStyle = {
		backgroundColor: "#e3f2fd",
		padding: "20px",
		borderRadius: "5px",
		boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
	};

	const titleStyle = {
		color: "#1976d2",
		marginTop: 0,
		marginBottom: "10px",
		fontSize: "18px",
	};

	const paragraphStyle = {
		color: "#333",
		lineHeight: "1.5",
	};

	return (
		<div style={containerStyle}>
			<h3 style={titleStyle}>Componente con estilos en línea</h3>
			<p style={paragraphStyle}>
				Este componente usa el atributo style de React para aplicar estilos directamente. Las propiedades CSS se
				escriben en camelCase y como un objeto JavaScript.
			</p>
		</div>
	);
}

/**
 * @function CSSModuleDemo
 * @description Simulación de CSS Modules en React
 */
function CSSModuleDemo() {
	// En un proyecto real, se importaría así:
	// import styles from './MiEstilo.module.css';

	// Simulación de clases CSS Module
	const styles = {
		container: "module_container__uniqueId",
		title: "module_title__uniqueId",
		text: "module_text__uniqueId",
	};

	return (
		<div className="css-module-simulation">
			<div className="module-container">
				<h3 className="module-title">Componente con CSS Modules (simulado)</h3>
				<p className="module-text">
					CSS Modules permite escribir CSS normal, pero con ámbito local. Las clases se generan de forma única
					para evitar colisiones.
				</p>
				<div className="module-code">
					<p>En el código real, se utilizaría:</p>
					<code>{"<div className={styles.container}>...</div>"}</code>
				</div>
			</div>
		</div>
	);
}

/**
 * @function StyledComponentsDemo
 * @description Simulación de Styled Components en React
 */
function StyledComponentsDemo() {
	return (
		<div className="styled-components-simulation">
			<div className="styled-container">
				<h3>Componente con Styled Components (simulado)</h3>
				<p>
					Styled Components permite definir estilos directamente en JavaScript usando template literals y
					crear componentes con esos estilos.
				</p>
				<button className="styled-button">Botón estilizado</button>
			</div>
		</div>
	);
}

/**
 * @function ToggleClassDemo
 * @description Demostración de alternancia de clases CSS basada en estado
 */
function ToggleClassDemo() {
	const [isVisible, setIsVisible] = useState(true);
	const [theme, setTheme] = useState("light");

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className={`toggle-demo ${theme}-theme`}>
			<div className="toggle-controls">
				<button onClick={toggleVisibility}>{isVisible ? "Ocultar mensaje" : "Mostrar mensaje"}</button>
				<button onClick={toggleTheme}>Cambiar a tema {theme === "light" ? "oscuro" : "claro"}</button>
			</div>

			<div className={`toggle-message ${isVisible ? "visible" : "hidden"}`}>
				Este mensaje puede ocultarse cambiando la clase CSS.
			</div>

			<p className="toggle-explanation">
				El tema actual es: <strong>{theme}</strong>
			</p>
		</div>
	);
}

/**
 * @function MaterialUIDemo
 * @description Simulación de componentes Material-UI
 */
function MaterialUIDemo() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="mui-simulation">
			<div className="mui-tabs">
				<div className="mui-tabs-header">
					<button
						className={`mui-tab ${activeTab === 0 ? "active" : ""}`}
						onClick={() => setActiveTab(0)}>
						Tab 1
					</button>
					<button
						className={`mui-tab ${activeTab === 1 ? "active" : ""}`}
						onClick={() => setActiveTab(1)}>
						Tab 2
					</button>
					<button
						className={`mui-tab ${activeTab === 2 ? "active" : ""}`}
						onClick={() => setActiveTab(2)}>
						Tab 3
					</button>
				</div>

				<div className="mui-tabs-content">
					{activeTab === 0 && (
						<div className="mui-tab-panel">
							<h4>Contenido del Tab 1</h4>
							<p>Este es el contenido del primer tab.</p>
						</div>
					)}
					{activeTab === 1 && (
						<div className="mui-tab-panel">
							<h4>Contenido del Tab 2</h4>
							<p>Este es el contenido del segundo tab.</p>
						</div>
					)}
					{activeTab === 2 && (
						<div className="mui-tab-panel">
							<h4>Contenido del Tab 3</h4>
							<p>Este es el contenido del tercer tab.</p>
						</div>
					)}
				</div>
			</div>

			<div className="mui-form">
				<div className="mui-textfield">
					<label>Campo requerido</label>
					<input
						type="text"
						defaultValue="Hola mundo"
					/>
				</div>

				<button className="mui-button">
					<span className="mui-button-text">Inicio</span>
					<span className="mui-icon">🏠</span>
				</button>
			</div>
		</div>
	);
}

export default Ej05_Estilos_MaterialUI;
