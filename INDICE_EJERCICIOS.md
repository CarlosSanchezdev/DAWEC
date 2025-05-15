# Índice de Ejercicios - Desarrollo Web en Entorno Cliente

Este documento sirve como índice y referencia rápida para todos los ejercicios realizados en preparación para el examen
de Desarrollo Web en Entorno Cliente.

## Estructura del índice

Para cada ejercicio se incluye:

-   Número e identificador del ejercicio
-   Ubicación del archivo
-   Conceptos clave cubiertos
-   Técnicas/patrones utilizados
-   Notas importantes para el examen

## Simulacros de Examen

Los simulacros son ejercicios integrales que combinan múltiples conceptos para preparar situaciones de examen reales.

### Simulacro 3: AVILESA

-   **Archivo**: `src/ejercicios/simulacros/sim3/AvilesaApp.jsx`
-   **Evaluación**: Ejemplo examen 1ª evaluación
-   **Conceptos**: Manipulación del DOM, Clases y objetos, Eventos y formularios, LocalStorage, Validación de datos
-   **Descripción**: Sistema de gestión de líneas y paradas de autobuses
-   **Estructura**:
    -   `components/FormLinea.jsx`: Componente para crear/editar líneas
    -   `components/FormParada.jsx`: Componente para añadir paradas
    -   `components/ListadoLineas.jsx`: Visualización de todas las líneas
    -   `components/DetalleLinea.jsx`: Vista detallada de una línea y sus paradas
-   **Notas**: Incluye implementación de patrón Singleton y persistencia en localStorage

### Simulacro 4: Calculadora IMC

-   **Archivo**: `src/ejercicios/simulacros/sim4/IMCApp.jsx`
-   **Evaluación**: Ejemplo examen 1ª evaluación
-   **Conceptos**: Componentes funcionales en React, Hooks (useState, useEffect), Clases y objetos, Gestión de
    formularios, LocalStorage, Patrón Singleton, Validación de datos
-   **Descripción**: Aplicación para calcular el Índice de Masa Corporal
-   **Estructura**:
    -   `components/FormPersona.jsx`: Formulario para introducir datos personales
    -   `components/ListadoPersonas.jsx`: Lista de todas las personas registradas
    -   `components/ResultadoIMC.jsx`: Muestra el resultado del cálculo de IMC
    -   `components/PersonasEnRiesgo.jsx`: Filtra y muestra personas con IMC fuera de rango normal
-   **Notas**: Combina conceptos de JavaScript vanilla con React básico

### Simulacro 5: SpotifEx

-   **Archivo**: `src/ejercicios/simulacros/sim5/SpotifEx.jsx`
-   **Evaluación**: Ejemplo examen 2ª evaluación
-   **Conceptos**: Componentes funcionales en React, Hooks (useState, useEffect, useMemo), Paso de props entre
    componentes, Fetch API y async/await, Gestión de formularios y eventos, Renderizado condicional, Manejo de listas y
    datos JSON
-   **Descripción**: Aplicación para consultar datos de canciones de Spotify que implementa el filtrado, visualización y
    análisis de datos
-   **Estructura**:
    -   `components/SpotiMain.jsx`: Componente principal que orquesta la aplicación
    -   `components/ListadoCanciones.jsx`: Visualización de todas las canciones en formato tabular
    -   `components/FiltradoCanciones.jsx`: Componente para filtrar canciones por artista
    -   `components/MasPopular.jsx`: Muestra la canción más popular usando useMemo
    -   `json/Spotify.json`: Datos de canciones para la aplicación
-   **Implementación de puntos del ejercicio**:
    -   **Apartado 1 (2 puntos)**: Componente SpotiMain que contiene y organiza todos los demás componentes
    -   **Apartado 2 (2 puntos)**: Función asíncrona cargarCanciones que obtiene los datos de un archivo JSON
    -   **Apartado 3 (2,5 puntos)**: Componente ListadoCanciones que muestra los datos en formato tabla (props
        desestructuradas)
    -   **Apartado 4 (2,5 puntos)**: Componente FiltradoCanciones que implementa búsqueda por artista con useState y
        useEffect
    -   **Apartado 5 (1 punto)**: Componente MasPopular que usa useMemo para calcular la canción más popular
-   **Unidades relacionadas**: UT5 (Mecanismos de comunicación asíncrona), UT6 (Interfaces de usuario), UT7 (Manejo de
    formularios), UT8 (Componentes y hooks)
-   **Notas**: Incluye un componente ExplicacionSpotifEx.jsx que detalla todos los apartados técnicos con ejemplos de
    código

### Simulacro 6: TaskMaster

-   **Archivo**: `src/ejercicios/simulacros/sim6/TaskMaster.jsx`
-   **Evaluación**: Ejemplo examen 3ª evaluación
-   **Conceptos**: Context API y patrón Reducer, Hooks personalizados avanzados, Almacenamiento persistente con
    localStorage, Optimización de rendimiento con useMemo, Formularios con validación, Filtrado y ordenación de datos,
    CSS modular y responsive design
-   **Descripción**: Sistema de gestión de proyectos y tareas con equipo de trabajo
-   **Estructura**:
    -   `components/Navigation.jsx`: Barra de navegación y filtros
    -   `components/ProjectsList.jsx`: Listado de proyectos con tareas
    -   `components/ProjectForm.jsx`: Formulario para crear/editar proyectos
    -   `components/Statistics.jsx`: Visualización de estadísticas
    -   `context/TaskMasterContext.jsx`: Context API para estado global
    -   `hooks/`: Hooks personalizados (useForm, useDataFilter)
    -   `data/`: Datos iniciales
-   **Notas**: Ejemplo avanzado de aplicación React con todas las técnicas modernas

### Simulacro 7: MaderAvilés

-   **Archivo**: `src/ejercicios/simulacros/sim7/MaderAvilesApp.jsx`
-   **Evaluación**: Ejemplo examen 1ª evaluación
-   **Conceptos**: JavaScript vanilla, DOM, LocalStorage, Validación de formularios, CRUD, Clases y objetos, Manejo de
    eventos
-   **Descripción**: Sistema de gestión para una carpintería que permite registrar pedidos y piezas de madera con sus
    medidas
-   **Estructura**:
    -   `components/GestionPedidos.jsx`: CRUD y validación de pedidos
    -   `components/GestionPiezas.jsx`: CRUD y validación de piezas de madera
    -   `components/DetallePedido.jsx`: Visualización de piezas por pedido con cálculos
    -   `models/Pedido.js`: Clase para la gestión de pedidos
    -   `models/Pieza.js`: Clase para la gestión de piezas
    -   `utils/Storage.js`: Gestión de persistencia con LocalStorage
    -   `utils/Validacion.js`: Funciones de validación reutilizables
-   **Implementación de puntos del ejercicio**:
    -   **Tipos de datos (5%)**:
        -   Clases `Pedido` y `Pieza` con tipado adecuado
        -   Validación de tipos en todos los campos
    -   **CRUD en Pedidos (25%)**:
        -   Alta, baja, modificación y consulta de pedidos
        -   Interfaz con formularios y listado
        -   Persistencia en LocalStorage
    -   **Validación en Pedidos (10%)**:
        -   Validación de número único y formato
        -   Validación de fecha no posterior
        -   Validación de tipos de datos
    -   **CRUD en Piezas (25%)**:
        -   Alta, baja, modificación y consulta de piezas
        -   Interfaz con formularios y listado
        -   Relación con pedidos existentes
    -   **Validación en Piezas (10%)**:
        -   Validación de número único
        -   Validación de medidas positivas
        -   Validación de pedido existente
    -   **Detalle de pedido (15%)**:
        -   Listado de piezas por pedido
        -   Cálculo de superficie y volumen
        -   Tabla con todos los detalles
    -   **Diseño (10%)**:
        -   Separación en componentes
        -   Código modular en archivos .js
        -   Interfaz con desplegables y validación visual
-   **Unidades relacionadas**:
    -   UT2: Sintaxis del lenguaje
    -   UT3: Arrays, funciones y objetos
    -   UT4: Modelo de objetos del documento (DOM)
    -   UT5: Manipulación de datos y validación
-   **Notas**: Implementa persistencia con LocalStorage y carga inicial de datos de ejemplo. Sigue el patrón MVC con
    separación clara de responsabilidades.

## Ejercicios por Temas

### Tema 1: Fundamentos de JavaScript

#### Ejercicio 1: Sintaxis Básica

-   **Archivo**: `src/ejercicios/tema1/Ej01_Sintaxis_Basica.jsx`
-   **Conceptos**: Variables, tipos de datos, operadores, estructura básica
-   **Técnicas**: Declaración de variables, operaciones, output
-   **Notas**: Fundamentos necesarios para JavaScript en el navegador

#### Ejercicio 2: Control de Flujo

-   **Archivo**: `src/ejercicios/tema1/Ej02_Control_Flujo.jsx`
-   **Conceptos**: Condicionales, bucles, switch
-   **Técnicas**: Estructuras de control, manejo de casos
-   **Notas**: Patrones comunes de control de flujo en JS

### Tema 2: DOM y Eventos

#### Ejercicio 1: Manipulación del DOM

-   **Archivo**: `src/ejercicios/tema2/Ej01_DOM.jsx`
-   **Conceptos**: Selección de elementos, modificación, creación
-   **Técnicas**: querySelector, createElement, appendChild, textContent
-   **Notas**: Interacción básica con el árbol DOM

#### Ejercicio 2: Eventos

-   **Archivo**: `src/ejercicios/tema2/Ej02_Eventos.jsx`
-   **Conceptos**: Manejo de eventos, event bubbling, delegación
-   **Técnicas**: addEventListener, event object, preventDefault
-   **Notas**: Implementación de interactividad mediante eventos

### Tema 3: Características Avanzadas de JS

#### Ejercicio 1: Funciones

-   **Archivo**: `src/ejercicios/tema3/Ej01_Funciones.jsx`
-   **Conceptos**: Funciones arrow, callbacks, closures
-   **Técnicas**: Manejo avanzado de funciones en JavaScript
-   **Notas**: Patrones funcionales modernos

#### Ejercicio 2: Arrays

-   **Archivo**: `src/ejercicios/tema3/Ej02_Arrays.jsx`
-   **Conceptos**: Métodos de array, map, filter, reduce
-   **Técnicas**: Transformación y manipulación de arrays
-   **Notas**: Programación funcional con arrays

#### Ejercicio 3: Programación Orientada a Objetos

-   **Archivo**: `src/ejercicios/tema3/Ej03_POO.jsx`
-   **Conceptos**: Clases, herencia, encapsulación
-   **Técnicas**: Implementación de patrones OOP en JS
-   **Notas**: Uso de clases ES6 y prototipos

#### Ejercicio 4: Patrones de Diseño

-   **Archivo**: `src/ejercicios/tema3/Ej04_Patrones_Diseno.jsx`
-   **Conceptos**: Singleton, Factory, Module, Observer
-   **Técnicas**: Implementación de patrones de diseño comunes
-   **Notas**: Uso de patrones para organizar código

#### Ejercicio 5: Enrutamiento con React Router

-   **Archivo**: `src/ejercicios/tema3/Ej05_Enrutamiento.jsx`
-   **Conceptos**: BrowserRouter, Routes, Route, Link, useNavigate
-   **Técnicas**: Navegación programática, rutas anidadas, parámetros de URL
-   **Notas**: Implementación de navegación entre páginas en SPA

#### Ejercicio 6: Navegación con parámetros

-   **Archivo**: `src/ejercicios/tema3/Ej06_Parametros_URL.jsx`
-   **Conceptos**: useParams, useSearchParams, useLocation
-   **Técnicas**: Extracción de parámetros, navegación dinámica
-   **Notas**: Ejemplo de página de detalles y filtrado con parámetros

### Tema 4: Formularios y Validación

#### Ejercicio 1: Formularios Básicos

-   **Archivo**: `src/ejercicios/tema4/Ej01_Formularios_Basicos.jsx`
-   **Conceptos**: Elementos de formulario, eventos, valores
-   **Técnicas**: Captura de datos, onSubmit, preventDefault
-   **Notas**: Manejo básico de formularios en React

#### Ejercicio 2: Validación de Datos

-   **Archivo**: `src/ejercicios/tema4/Ej02_Validacion_Datos.jsx`
-   **Conceptos**: Validación de entrada, regex, feedback visual
-   **Técnicas**: Validación en tiempo real, mensajes de error
-   **Notas**: Garantizar integridad de datos en formularios

#### Ejercicio 3: Formularios Avanzados

-   **Archivo**: `src/ejercicios/tema4/Ej03_Formularios_Avanzados.jsx`
-   **Conceptos**: Formularios dinámicos, múltiples pasos
-   **Técnicas**: Wizard forms, validación por etapas
-   **Notas**: Patrones para formularios complejos

#### Ejercicio 7: Formularios Controlados

-   **Archivo**: `src/ejercicios/tema4/Ej07_Formularios_Controlados.jsx`
-   **Conceptos**: Estado para formularios, eventos onChange/onSubmit
-   **Técnicas**: Validación en tiempo real, manejo de errores
-   **Notas**: Implementación de formulario de registro con validación

#### Ejercicio 8: Formularios con React Hook Form

-   **Archivo**: `src/ejercicios/tema4/Ej08_React_Hook_Form.jsx`
-   **Conceptos**: useForm, validación con Yup/Zod, errores de formulario
-   **Técnicas**: Validación de esquemas, campos dinámicos
-   **Notas**: Formulario avanzado con validaciones complejas

### Tema 5: Fundamentos de React

#### Ejercicio 1: Introducción a React

-   **Archivo**: `src/ejercicios/tema5/Ej01_Introduccion_React.jsx`
-   **Conceptos**: Componentes, Virtual DOM, JSX, Hooks básicos
-   **Técnicas**: Renderizado, estructura de componentes
-   **Notas**: Conceptos fundamentales de React y su funcionamiento

#### Ejercicio 2: Componentes y JSX

-   **Archivo**: `src/ejercicios/tema5/Ej02_Componentes_JSX.jsx`
-   **Conceptos**: Sintaxis JSX, componentes, variables, bucles en React
-   **Técnicas**: Uso de expresiones en JSX, fragmentos, comentarios
-   **Notas**: Sintaxis y características especiales de JSX

#### Ejercicio 3: Props y Estado

-   **Archivo**: `src/ejercicios/tema5/Ej03_Props_Estado.jsx`
-   **Conceptos**: Props, useState, comunicación entre componentes
-   **Técnicas**: Paso de datos, desestructuración, actualizaciones de estado
-   **Notas**: Cómo los componentes se comunican y mantienen su estado

#### Ejercicio 4: Renderizado Condicional

-   **Archivo**: `src/ejercicios/tema5/Ej04_Renderizado_Condicional.jsx`
-   **Conceptos**: Técnicas de renderizado condicional
-   **Técnicas**: Operador ternario, AND lógico, IIFE, variables condicionales
-   **Notas**: Diferentes formas de mostrar elementos según condiciones

#### Ejercicio 5: Visor de Imágenes

-   **Archivo**: `src/ejercicios/tema5/Ej05_Visor_Imagenes.jsx`
-   **Conceptos**: Composición de componentes, estado, eventos
-   **Técnicas**: Carrusel, modal, miniaturas, navegación
-   **Notas**: Aplicación práctica que integra múltiples conceptos de React

### Tema 6: React Avanzado y Objetos del Navegador

#### Ejercicio 1: Objetos Nativos

-   **Archivo**: `src/ejercicios/tema6/Ej01_Objetos_Nativos.jsx`
-   **Conceptos**: String, Number, Math, Date, Array
-   **Técnicas**: Métodos y propiedades de objetos nativos
-   **Notas**: Uso efectivo de objetos integrados de JavaScript

#### Ejercicio 2: Objetos del Navegador

-   **Archivo**: `src/ejercicios/tema6/Ej02_Objetos_Navegador.jsx`
-   **Conceptos**: Window, Document, Navigator, Location
-   **Técnicas**: Interacción con el navegador, BOM
-   **Notas**: Acceso a características específicas del navegador

#### Ejercicio 3: Almacenamiento en el Navegador

-   **Archivo**: `src/ejercicios/tema6/Ej03_Almacenamiento_Navegador.jsx`
-   **Conceptos**: localStorage, sessionStorage, cookies
-   **Técnicas**: Persistencia de datos, expiración
-   **Notas**: Opciones para almacenar datos en el cliente

#### Ejercicio 3: Generación de Elementos

-   **Archivo**: `src/ejercicios/tema6/Ej03_Generacion_Elementos.jsx`
-   **Conceptos**: Generación dinámica de componentes, keys
-   **Técnicas**: map, renderizado de listas
-   **Notas**: Patrones para generar UI de forma dinámica

#### Ejercicio 4: Eventos del DOM

-   **Archivo**: `src/ejercicios/tema6/Ej04_DOM_Eventos.jsx`
-   **Conceptos**: Eventos nativos, SyntheticEvent en React
-   **Técnicas**: Manejo de eventos, event pooling
-   **Notas**: Comparación entre eventos nativos y en React

#### Ejercicio 4: Ventanas y Router

-   **Archivo**: `src/ejercicios/tema6/Ej04_Ventanas_Router.jsx`
-   **Conceptos**: Manejo de ventanas, navegación
-   **Técnicas**: window.open, React Router
-   **Notas**: Navegación moderna vs. tradicional

#### Ejercicio 5: Context y Reducers

-   **Archivo**: `src/ejercicios/tema6/Ej05_Context_Reducers.jsx`
-   **Conceptos**: Context API, useReducer, estado global
-   **Técnicas**: Patrón Flux/Redux, providers
-   **Notas**: Gestión avanzada de estado en React

#### Ejercicio 5: Estilos y Material UI

-   **Archivo**: `src/ejercicios/tema6/Ej05_Estilos_MaterialUI.jsx`
-   **Conceptos**: CSS-in-JS, bibliotecas de UI
-   **Técnicas**: Styled components, Material UI
-   **Notas**: Enfoques modernos para estilizar componentes

#### Ejercicio 6: Reducers y Context

-   **Archivo**: `src/ejercicios/tema6/Ej06_Reducers_Context.jsx`
-   **Conceptos**: useReducer, Context API avanzado
-   **Técnicas**: Gestión de estado complejo, acciones
-   **Notas**: Implementación de patrones tipo Redux

#### Ejercicio 7: Almacenamiento en Navegador

-   **Archivo**: `src/ejercicios/tema6/Ej07_Almacenamiento_Navegador.jsx`
-   **Conceptos**: localStorage, sessionStorage, cookies
-   **Técnicas**: Persistencia de estado, sincronización
-   **Notas**: Patrones para persistir estado de aplicación

#### Ejercicio 8: Depuración y Documentación

-   **Archivo**: `src/ejercicios/tema6/Ej08_Depuracion_Documentacion.jsx`
-   **Conceptos**: Error boundaries, PropTypes, JSDoc
-   **Técnicas**: Gestión de errores, documentación
-   **Notas**: Buenas prácticas para código mantenible

### Tema 7: Interacción con el Usuario, Eventos y Formularios

#### Ejercicio 1: Modelo de Eventos

-   **Archivo**: `src/ejercicios/tema7/Ej01_Modelo_Eventos.jsx`
-   **Conceptos**: Event bubbling, capturing, delegation
-   **Técnicas**: Manejo avanzado de eventos
-   **Notas**: Implementación eficiente de listeners

#### Ejercicio 2: Eventos en React

-   **Archivo**: `src/ejercicios/tema7/Ej02_Eventos_React.jsx`
-   **Conceptos**: SyntheticEvent, handlers, eventos personalizados
-   **Técnicas**: Optimización de eventos, custom events
-   **Notas**: Patrones específicos de eventos en React

#### Ejercicio 3: Formularios Básicos

-   **Archivo**: `src/ejercicios/tema7/Ej03_Formularios_Basicos.jsx`
-   **Conceptos**: Formularios controlados, inputs
-   **Técnicas**: onChange, onSubmit, estado de formulario
-   **Notas**: Fundamentos de formularios en React

#### Ejercicio 4: Formularios Avanzados

-   **Archivo**: `src/ejercicios/tema7/Ej04_Formularios_Avanzados.jsx`
-   **Conceptos**: Formularios no controlados, refs, upload
-   **Técnicas**: useRef, FormData, archivos
-   **Notas**: Técnicas avanzadas para formularios complejos

#### Ejercicio 5: Validación de Formularios

-   **Archivo**: `src/ejercicios/tema7/Ej05_Validacion_Formularios.jsx`
-   **Conceptos**: Validación de datos, patrones, feedback
-   **Técnicas**: Regex, validación en tiempo real
-   **Notas**: Estrategias completas de validación

### Tema 8: Comunicación Asíncrona

#### Ejercicio 1: Mecanismos Asíncronos

-   **Archivo**: `src/ejercicios/tema8/Ej01_Mecanismos_Asincronos.jsx`
-   **Conceptos**: Event loop, callbacks, programación asíncrona
-   **Técnicas**: setTimeout, callbacks, flow
-   **Notas**: Fundamentos de asincronía en JavaScript

#### Ejercicio 2: AJAX y XMLHttpRequest

-   **Archivo**: `src/ejercicios/tema8/Ej02_AJAX_XMLHttpRequest.jsx`
-   **Conceptos**: AJAX, objeto XMLHttpRequest, estados
-   **Técnicas**: Peticiones HTTP tradicionales
-   **Notas**: Fundamentos de comunicación cliente-servidor

#### Ejercicio 3: Promesas

-   **Archivo**: `src/ejercicios/tema8/Ej03_Promesas.jsx`
-   **Conceptos**: Promesas, estados, encadenamiento
-   **Técnicas**: then/catch, Promise.all, Promise.race
-   **Notas**: Manejo moderno de operaciones asíncronas

#### Ejercicio 4: Fetch API

-   **Archivo**: `src/ejercicios/tema8/Ej04_Fetch_API.jsx`
-   **Conceptos**: Fetch API, Request/Response
-   **Técnicas**: GET, POST, Headers, CORS
-   **Notas**: API moderna para comunicación HTTP

#### Ejercicio 5: Async/Await

-   **Archivo**: `src/ejercicios/tema8/Ej05_Async_Await.jsx`
-   **Conceptos**: async/await, manejo de errores
-   **Técnicas**: try/catch, operaciones paralelas
-   **Notas**: Sintaxis moderna para código asíncrono legible

## Ejercicios de Examen (Simulacros)

### Simulacro 1: Aplicación de Lista de Tareas

-   **Archivos**: `src/ejercicios/simulacros/sim1/`
-   **Conceptos**: Combinación de hooks, estado, efectos, contexto
-   **Técnicas**: CRUD completo, persistencia en localStorage
-   **Notas**: Implementación completa de aplicación

### Simulacro 2: Dashboard de Datos

-   **Archivos**: `src/ejercicios/simulacros/sim2/`
-   **Conceptos**: Fetching de datos, visualización, filtrado
-   **Técnicas**: Gráficos, tablas, búsqueda y filtros
-   **Notas**: Ejemplo de dashboard con múltiples vistas

## Notas para el Examen

-   Presta especial atención a los simulacros, ya que integran múltiples conceptos
-   El simulacro 6 (TaskMaster) es el más completo y representa el nivel esperado para la 3ª evaluación
-   Revisa los ejercicios de hooks (useState, useEffect, useMemo, useContext) que son fundamentales
-   Practica la implementación de patrones como Context API, formularios controlados y optimización de rendimiento

## Recursos Adicionales

### Documentación y Referencias

-   [React Docs](https://reactjs.org/docs/getting-started.html) - Documentación oficial de React
-   [MDN Web Docs](https://developer.mozilla.org/es/docs/Web) - Referencia completa de JavaScript y APIs web

### Patrones y Mejores Prácticas

-   **Componentes Reutilizables** - Crear componentes modulares y reutilizables
-   **Custom Hooks** - Extraer lógica común en hooks personalizados
-   **Optimización de Rendimiento** - UseMemo, useCallback, React.memo

## Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de versión de producción
npm run preview
```

---

**Nota**: Este índice se actualizará a medida que se completen más ejercicios. Asegúrate de consultar la versión más
reciente antes del examen.
