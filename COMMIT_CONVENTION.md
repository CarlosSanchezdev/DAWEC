# Convenciones de Commits

Este proyecto sigue las convenciones de [Conventional Commits](https://www.conventionalcommits.org/) para mantener un
historial de commits limpio y generar automáticamente changelogs.

## Formato de mensajes de commit

Cada mensaje de commit consiste en un **encabezado**, un **cuerpo** y un **pie**. El encabezado tiene un formato
especial que incluye un **tipo**, un **ámbito** opcional y una **descripción**:

```
<tipo>(<ámbito>): <descripción>

<cuerpo>

<pie>
```

El **encabezado** es obligatorio, pero el **ámbito** del encabezado es opcional.

### Tipos

-   **feat**: Una nueva característica
-   **fix**: Una corrección de bug
-   **docs**: Cambios en documentación
-   **style**: Cambios que no afectan el significado del código (espacios en blanco, formato, punto y coma faltantes,
    etc.)
-   **refactor**: Un cambio de código que no corrige un bug ni añade una característica
-   **perf**: Un cambio de código que mejora el rendimiento
-   **test**: Añadir pruebas faltantes o corregir pruebas existentes
-   **chore**: Cambios en el proceso de build o herramientas auxiliares y librerías
-   **ci**: Cambios en los archivos y scripts de configuración de CI

### Ámbitos

El ámbito debe ser el nombre del componente, servicio o área del código que se ve afectada por el cambio:

-   **auth**: Autenticación y autorización
-   **ui**: Componentes de interfaz de usuario
-   **api**: Comunicación con backend
-   **router**: Navegación y enrutamiento
-   **store**: Estado global
-   **utils**: Utilidades y helpers
-   **config**: Configuración del proyecto

### Descripción

La descripción es un resumen breve de los cambios:

-   Usar el imperativo, presente: "cambiar" no "cambiado" ni "cambios"
-   No capitalizar la primera letra
-   No usar punto (.) al final

### Cuerpo

El cuerpo debe incluir la motivación para el cambio y contrastar con el comportamiento anterior.

### Pie

El pie debe contener información sobre "Breaking Changes" (cambios incompatibles) y también es el lugar para referenciar
issues que este commit cierra.

## Ejemplos

```
feat(auth): implementar página de login

Agregar formulario de login con validación y redirección a dashboard.

Closes #123
```

```
fix(navbar): corregir estilo en dispositivos móviles

La barra de navegación no se adaptaba correctamente en dispositivos
con pantallas pequeñas.

Fixes #456
```

```
refactor(api): simplificar funciones de llamada a endpoints

BREAKING CHANGE: La función fetchData ahora requiere un objeto de configuración
en lugar de parámetros separados.
```
