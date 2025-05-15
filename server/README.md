# Configuración del Servidor PHP

Este directorio contiene el backend PHP necesario para el simulacro del concesionario.

## Requisitos

1. PHP 7.4 o superior instalado en tu sistema
2. Acceso a la línea de comandos
3. Permisos de escritura en el directorio `db/`

## Instrucciones de Configuración

1. Abre una terminal en este directorio (`server/`)

2. Inicia el servidor PHP incorporado:

    ```bash
    php -S localhost:8000
    ```

3. El servidor estará disponible en:
    - URL base: http://localhost:8000
    - Endpoint vehículos: http://localhost:8000/vehiculos.php

## Estructura de Datos

Los vehículos se almacenan en `db/vehiculos.json` con el siguiente formato:

```json
[
	{
		"id": "unique_id",
		"chasis": "12345678",
		"marca": "Toyota",
		"modelo": "Corolla",
		"color": "Rojo",
		"potencia": 150,
		"fechaFabricacion": "2024-01-15"
	}
]
```

## Endpoints Disponibles

-   `GET /vehiculos.php` - Obtener todos los vehículos
-   `GET /vehiculos.php?id=X` - Obtener un vehículo por ID
-   `POST /vehiculos.php` - Crear nuevo vehículo
-   `PUT /vehiculos.php` - Actualizar vehículo existente
-   `DELETE /vehiculos.php` - Eliminar vehículo

## Validaciones

El servidor verifica:

1. Número de chasis único
2. Presencia de ID en actualizaciones y eliminaciones
3. Existencia del vehículo en operaciones de actualización/eliminación
