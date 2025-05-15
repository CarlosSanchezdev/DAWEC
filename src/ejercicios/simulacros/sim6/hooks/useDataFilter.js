/**
 * @fileoverview Hook personalizado para filtrar y ordenar datos
 * @ejercicio Simulacro 6 - TaskMaster
 * @tema UT5, UT6, UT7, UT8
 * @fecha 15/05/2025
 */

import { useMemo } from 'react';

/**
 * @function useDataFilter
 * @description Hook personalizado para filtrar y ordenar datos de manera optimizada
 * @param {Array} data - Datos a filtrar y ordenar
 * @param {string} searchTerm - Término de búsqueda
 * @param {Function} searchFilterFn - Función de filtrado por búsqueda
 * @param {Function} [additionalFilterFn] - Función adicional de filtrado (opcional)
 * @param {Function} [sortFn] - Función de ordenación (opcional)
 * @returns {Object} Datos filtrados y ordenados
 * @example
 * const { filteredData } = useDataFilter(
 *   projects,
 *   searchTerm,
 *   item => item.name.toLowerCase().includes(searchTerm.toLowerCase()),
 *   status !== 'all' ? item => item.status === status : null,
 *   (a, b) => a.name.localeCompare(b.name)
 * );
 */
function useDataFilter(
    data,
    searchTerm,
    searchFilterFn,
    additionalFilterFn = null,
    sortFn = null
) {
    // ===== DATOS FILTRADOS =====
    /**
     * Calcula los datos filtrados utilizando useMemo para optimización
     */
    const filteredData = useMemo(() => {
        // Si no hay datos, devolver array vacío
        if (!data || data.length === 0) {
            return [];
        }

        // Aplicar filtros
        let result = [...data];

        // Filtro por término de búsqueda
        if (searchTerm && searchFilterFn) {
            result = result.filter(searchFilterFn);
        }

        // Filtro adicional (si existe)
        if (additionalFilterFn) {
            result = result.filter(additionalFilterFn);
        }

        // Aplicar ordenación (si existe)
        if (sortFn) {
            result.sort(sortFn);
        }

        return result;
    }, [data, searchTerm, searchFilterFn, additionalFilterFn, sortFn]);

    // ===== ESTADÍSTICAS =====
    /**
     * Calcula estadísticas sobre los datos filtrados
     */
    const stats = useMemo(() => {
        // Si no hay datos, devolver estadísticas vacías
        if (!data || data.length === 0) {
            return {
                total: 0,
                filtered: 0,
                percentage: 0
            };
        }

        // Calcular estadísticas
        const total = data.length;
        const filtered = filteredData.length;
        const percentage = total > 0 ? Math.round((filtered / total) * 100) : 0;

        return {
            total,
            filtered,
            percentage
        };
    }, [data, filteredData]);

    return {
        filteredData,
        stats
    };
}

export default useDataFilter;
