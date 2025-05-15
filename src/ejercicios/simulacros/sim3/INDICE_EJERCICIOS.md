# Simulacro 3 - AVILESA (Sistema de Gestión de Líneas de Autobuses)

## Descripción del Ejercicio

El simulacro AVILESA implementa un sistema de gestión de líneas de autobuses entre municipios, permitiendo almacenar
información sobre líneas, paradas e itinerarios. Esta implementación se basa en los requisitos proporcionados para las
unidades UT2, UT3 y UT4.

## Archivos del Proyecto

### Modelos de Datos

-   **Linea.js** - Clase para gestionar las líneas de autobús con validaciones
-   **Parada.js** - Clase para gestionar las paradas de autobús con validaciones
-   **AvilesaService.js** - Servicio singleton para manejar la lógica de negocio y persistencia

### Componentes React

-   **AvilesaApp.jsx** - Componente principal y controlador de la aplicación
-   **AvilesaApp.css** - Estilos CSS para toda la aplicación
-   **components/ListadoLineas.jsx** - Componente para mostrar el listado de líneas
-   **components/FormLinea.jsx** - Formulario para crear y editar líneas
-   **components/DetalleLinea.jsx** - Componente para mostrar el detalle de una línea y sus paradas
-   **components/FormParada.jsx** - Formulario para crear y editar paradas

## Conceptos Implementados

### Unidad 2: Sintaxis Básica de JavaScript

-   Variables, constantes y tipos de datos
-   Operadores y estructuras de control
-   Funciones y ámbito de variables
-   Validaciones usando expresiones regulares

### Unidad 3: Arrays, Funciones y Objetos

-   Programación orientada a objetos con ES6
-   Clases, constructores y métodos
-   Métodos estáticos para validación
-   Uso de arrays y sus métodos (map, filter, find)
-   Conversión JSON para persistencia

### Unidad 4: Modelo de Objetos del Documento (DOM)

-   Manipulación de elementos del DOM mediante React
-   Eventos del usuario (click, submit, change)
-   Formularios y validación interactiva
-   Renderizado condicional
-   Uso de localStorage para persistencia

## Funcionalidades Implementadas

1. **Gestión de Líneas:**

    - Listado de líneas
    - Creación, edición y eliminación de líneas
    - Validación de datos (número, origen/destino, formatos de hora)

2. **Gestión de Paradas:**

    - Listado de paradas por línea
    - Creación, edición y eliminación de paradas
    - Validación de datos específicos según requisitos

3. **Persistencia de Datos:**

    - Almacenamiento en localStorage
    - Carga de datos de prueba
    - Serialización/deserialización de objetos

4. **Validaciones Específicas:**
    - Formatos de tiempo (HH:MM)
    - Relación correcta entre origen/destino y paradas
    - Intervalo de tiempo coherente en paradas

## Patrones de Diseño y Buenas Prácticas

1. **Patrón Singleton:**

    - Implementado en AvilesaService para garantizar una única instancia

2. **Separación de Responsabilidades:**

    - Modelos para la lógica de negocio y validación
    - Componentes para la interfaz de usuario
    - Servicio para la gestión de datos y persistencia

3. **Documentación:**

    - Comentarios de cabecera en todos los archivos
    - Documentación JSDoc para clases y funciones
    - Notas importantes destacadas para el examen

4. **Validación de Datos:**
    - Validación en el modelo (servidor)
    - Validación en formularios (cliente)
    - Manejo de errores y mensajes informativos

## Notas para el Examen

-   La aplicación implementa todas las validaciones requeridas según el enunciado
-   Se ha utilizado localStorage para la persistencia, simulando un backend
-   Las clases Linea y Parada contienen validaciones internas en sus constructores
-   El servicio AvilesaService implementa validaciones adicionales específicas para las paradas
-   Los formularios tienen validación en tiempo real antes de enviar los datos
-   La interfaz de usuario es responsive y sigue patrones de diseño modernos
