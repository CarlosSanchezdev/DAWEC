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

### Documentación y comentarios para examen

-   Incluir un comentario de cabecera en cada archivo con:
    ```javascript
    /**
     * @fileoverview [Breve descripción del archivo]
     * @ejercicio [Número/identificador del ejercicio]
     * @tema [Tema del examen al que corresponde]
     * @fecha [Fecha de creación/modificación]
     */
    ```
-   Documentar todas las funciones con comentarios JSDoc:
    ```javascript
    /**
     * @function [Nombre de la función]
     * @description [Descripción de lo que hace la función]
     * @param {[tipo]} [nombre] - [Descripción del parámetro]
     * @returns {[tipo]} [Descripción del valor de retorno]
     * @example [Ejemplo de uso]
     */
    ```
-   Incluir comentarios de sección para organizar código extenso:

    ```javascript
    // ===== HOOKS =====

    // ===== EFECTOS =====

    // ===== FUNCIONES AUXILIARES =====

    // ===== RENDER =====
    ```

-   Marcar partes importantes con comentarios destacados:

    ```javascript
    // IMPORTANTE: [Explicación de algo crucial para el examen]

    // NOTA: [Información adicional relevante]

    // TODO: [Pendientes o mejoras futuras]
    ```

### Estructura de archivos

-   Componentes en la carpeta `/src/components`
-   Hooks personalizados en `/src/hooks`
-   Páginas o vistas en `/src/pages`
-   Utilidades en `/src/utils`
-   Assets estáticos en `/src/assets`
-   Ejercicios de examen en `/src/ejercicios` organizados por temas

### Organización de ejercicios para el examen

-   Crear un archivo `INDICE_EJERCICIOS.md` en la raíz con:
    -   Lista de todos los ejercicios realizados
    -   Referencia a los archivos donde se encuentran
    -   Conceptos clave cubiertos en cada uno
    -   Técnicas o patrones utilizados
-   Nombrar archivos de ejercicios de forma descriptiva:
    -   `EjXX_Tema_Concepto.jsx` (ej: `Ej01_Hooks_useState.jsx`)
-   Mantener versiones incrementales de los ejercicios importantes:
    -   `Ej01_v1_inicial.jsx`
    -   `Ej01_v2_mejorado.jsx`
    -   `Ej01_v3_final.jsx`

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
